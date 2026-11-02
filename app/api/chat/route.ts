import { NextResponse, type NextRequest } from "next/server";
import {
  consumeStream,
  convertToModelMessages,
  createIdGenerator,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
  validateUIMessages,
} from "ai";
import { z } from "zod";
import { getSession } from "@/lib/auth/server";
import { classifyModelError, toClientErrorMessage } from "@/lib/ai/errors";
import type { VeloxizUIMessage } from "@/lib/ai/messages";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import { getChatModel } from "@/lib/ai/provider";
import { buildTools } from "@/lib/ai/tools";
import { listConnections } from "@/lib/db/connectors";
import { listMemories } from "@/lib/db/memory";
import {
  deriveTitle,
  getConversation,
  messageText,
  saveConversation,
  type Conversation,
} from "@/lib/db/conversations";

export const runtime = "nodejs";
/** Streaming responses must not be cached or statically evaluated. */
export const dynamic = "force-dynamic";
/** Multi-step tool runs can take a while; 60s is the Vercel Hobby ceiling. */
export const maxDuration = 60;

/**
 * The client sends only the newest message plus the chat id (see
 * `prepareSendMessagesRequest` in ChatView), so history is read server-side
 * and never trusted from the browser.
 */
const requestSchema = z.object({
  id: z.string().min(1).max(200),
  message: z.unknown().optional(),
  trigger: z
    .enum(["submit-message", "regenerate-message"])
    .default("submit-message"),
  messageId: z.string().max(200).optional(),
});

const metadataSchema = z
  .object({
    createdAt: z.string().optional(),
    totalTokens: z.number().optional(),
    errorMessage: z.string().optional(),
  })
  .optional();

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/**
 * Rewinds history so the model regenerates from the turn before the target
 * assistant message, instead of being asked to continue past its own reply.
 */
function rewindForRegenerate(
  messages: VeloxizUIMessage[],
  messageId: string | undefined
): VeloxizUIMessage[] {
  if (messageId) {
    const index = messages.findIndex((message) => message.id === messageId);
    if (index !== -1) return messages.slice(0, index);
  }

  const lastUser = messages.findLastIndex((message) => message.role === "user");
  return lastUser === -1 ? messages : messages.slice(0, lastUser + 1);
}

/** Bedrock rejects a prompt that does not open with a user turn. */
function dropLeadingAssistantTurns(
  messages: VeloxizUIMessage[]
): VeloxizUIMessage[] {
  const firstUser = messages.findIndex((message) => message.role === "user");
  return firstUser <= 0 ? messages : messages.slice(firstUser);
}

/**
 * True when a message carries something worth storing.
 *
 * A cancelled or failed generation ends with an assistant turn holding only a
 * `step-start` (and possibly an empty text) part. Persisting that would render
 * as a blank reply bubble on reload, so those are dropped and the trailing user
 * turn is kept instead - which is exactly what Retry regenerates from.
 */
function hasContent(message: VeloxizUIMessage): boolean {
  return message.parts.some((part) => {
    if (part.type === "step-start") return false;
    if (part.type === "text" || part.type === "reasoning") {
      return part.text.trim().length > 0;
    }
    return true;
  });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let parsed: z.infer<typeof requestSchema>;
  try {
    parsed = requestSchema.parse(await request.json());
  } catch {
    return badRequest("Expected a chat request body.");
  }

  const { id: conversationId, trigger, messageId } = parsed;

  const existing = await getConversation(session.userId, conversationId);

  // Build the history the model will see.
  let messages: VeloxizUIMessage[];

  if (trigger === "regenerate-message") {
    if (!existing) return badRequest("Nothing to regenerate.");
    messages = rewindForRegenerate(existing.messages, messageId);
  } else {
    if (!parsed.message) return badRequest("message is required.");
    messages = [...(existing?.messages ?? []), parsed.message as VeloxizUIMessage];
  }

  // Connector state and learned facts are read per request so the system
  // prompt always reflects current context. A failure here must not break chat.
  let connections: Awaited<ReturnType<typeof listConnections>> = [];
  let memories: Awaited<ReturnType<typeof listMemories>> = [];
  try {
    [connections, memories] = await Promise.all([
      listConnections(session.userId),
      listMemories(session.userId),
    ]);
  } catch (error) {
    console.error("[chat] Could not load context", error);
  }

  const tools = buildTools({ userId: session.userId, connections });

  // Validates tool parts and metadata against the current schemas, so a row
  // written by an older deploy cannot crash the request.
  let validated: VeloxizUIMessage[];
  try {
    validated = await validateUIMessages<VeloxizUIMessage>({
      messages,
      metadataSchema,
      tools,
    });
  } catch (error) {
    console.error("[chat] Stored messages failed validation", error);
    return badRequest("This conversation could not be read. Start a new chat.");
  }

  const prompt = dropLeadingAssistantTurns(validated);
  if (prompt.length === 0) return badRequest("message is required.");

  const now = new Date().toISOString();
  const firstUserText = messageText(
    prompt.find((message) => message.role === "user") ?? prompt[0]
  );

  const base: Omit<Conversation, "messages"> = {
    userId: session.userId,
    conversationId,
    title: existing?.title ?? deriveTitle(firstUserText),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  /**
   * Writes the conversation, dropping empty assistant turns left behind by a
   * cancelled or failed generation rather than storing a blank reply.
   */
  async function persist(messagesToSave: VeloxizUIMessage[]) {
    const persistable = messagesToSave.filter(hasContent);
    if (persistable.length === 0) return;

    try {
      await saveConversation({
        ...base,
        messages: persistable,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      // The reply already streamed; losing history is not worth failing on.
      console.error("[chat] Could not persist conversation", error);
    }
  }

  const result = streamText({
    model: getChatModel(),
    system: buildSystemPrompt({ connections, memories }),
    messages: await convertToModelMessages(prompt, { tools }),
    tools,
    // Lets the agent call a tool and then answer in the same turn. Without a
    // stop condition a tool call would end the generation with no reply.
    stopWhen: stepCountIs(5),
    temperature: 0.3,
    maxOutputTokens: 2048,
  });

  const uiStream = toUIMessageStream({
    stream: result.stream,
    tools,
    originalMessages: prompt,
    generateMessageId: createIdGenerator({ prefix: "msg", size: 16 }),
    messageMetadata: ({ part }) => {
      if (part.type === "start") return { createdAt: new Date().toISOString() };
      if (part.type === "finish") {
        return { totalTokens: part.totalUsage.totalTokens };
      }
      return undefined;
    },
    onError: (error) => {
      // Bedrock IAM and model-access failures are the common ones here, and
      // each needs a different fix, so surface the specific guidance.
      console.error("[chat] Generation failed", classifyModelError(error));
      return toClientErrorMessage(error);
    },
    onEnd: ({ messages: finalMessages }) => persist(finalMessages),
  });

  // Tee the stream so closing the browser tab does not cut the generation
  // short: a ReadableStream is only cancelled once *both* branches are, so
  // draining `keepAlive` server-side lets `onEnd` persist the complete reply
  // even though the response branch is gone.
  const [toClient, keepAlive] = uiStream.tee();
  void consumeStream({ stream: keepAlive });

  return createUIMessageStreamResponse({ stream: toClient });
}
