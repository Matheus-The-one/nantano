import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/server";
import { BedrockError, streamChat } from "@/lib/ai/bedrock";
import { listConnections } from "@/lib/db/connectors";
import { listMemories } from "@/lib/db/memory";
import {
  deriveTitle,
  getConversation,
  newConversationId,
  saveConversation,
  type ChatMessage,
  type Conversation,
} from "@/lib/db/conversations";

export const runtime = "nodejs";
/** Streaming responses must not be cached or statically evaluated. */
export const dynamic = "force-dynamic";

type ChatRequestBody = {
  message?: unknown;
  conversationId?: unknown;
};

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return badRequest("Expected a JSON body.");
  }

  if (typeof body.message !== "string" || body.message.trim().length === 0) {
    return badRequest("message is required.");
  }

  const prompt = body.message.trim();
  if (prompt.length > 8000) {
    return badRequest("Message is too long (8000 character limit).");
  }

  const requestedId =
    typeof body.conversationId === "string" ? body.conversationId : undefined;

  // Connector state and learned facts are loaded per request so the system
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

  const existing = requestedId
    ? await getConversation(session.userId, requestedId)
    : null;

  const now = new Date().toISOString();
  const userMessage: ChatMessage = {
    id: randomUUID(),
    role: "user",
    content: prompt,
    createdAt: now,
  };

  const conversation: Conversation = existing
    ? {
        ...existing,
        messages: [...existing.messages, userMessage],
        updatedAt: now,
      }
    : {
        userId: session.userId,
        conversationId: requestedId ?? newConversationId(),
        title: deriveTitle(prompt),
        messages: [userMessage],
        createdAt: now,
        updatedAt: now,
      };

  const encoder = new TextEncoder();

  // Newline-delimited JSON: simple to parse incrementally on the client and it
  // keeps the conversation id and error frames in the same channel as the text.
  function frame(payload: Record<string, unknown>): Uint8Array {
    return encoder.encode(`${JSON.stringify(payload)}\n`);
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        frame({
          type: "meta",
          conversationId: conversation.conversationId,
          title: conversation.title,
        })
      );

      let assistantText = "";

      try {
        for await (const delta of streamChat({
          messages: conversation.messages,
          connections,
          memories,
        })) {
          assistantText += delta;
          controller.enqueue(frame({ type: "delta", text: delta }));
        }
      } catch (error) {
        const bedrockError =
          error instanceof BedrockError
            ? error
            : new BedrockError("unknown", "Unexpected error while generating a reply.");

        console.error("[chat] Bedrock stream failed", error);

        controller.enqueue(
          frame({
            type: "error",
            kind: bedrockError.kind,
            message: bedrockError.message,
          })
        );
        controller.close();
        return;
      }

      if (assistantText.trim().length > 0) {
        conversation.messages.push({
          id: randomUUID(),
          role: "assistant",
          content: assistantText,
          createdAt: new Date().toISOString(),
        });
        conversation.updatedAt = new Date().toISOString();

        try {
          await saveConversation(conversation);
        } catch (error) {
          // The reply already streamed; losing history is not worth failing on.
          console.error("[chat] Could not persist conversation", error);
        }
      }

      controller.enqueue(frame({ type: "done" }));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
