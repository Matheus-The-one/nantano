import {
  BedrockRuntimeClient,
  ConverseStreamCommand,
  type Message,
} from "@aws-sdk/client-bedrock-runtime";
import { CONNECTORS, getConnector } from "@/lib/connectors/catalog";
import type { ConnectorRecord } from "@/lib/db/connectors";
import { memoryKindLabel, type Memory } from "@/lib/db/memory";
import type { ChatMessage } from "@/lib/db/conversations";

export const DEFAULT_MODEL_ID =
  "us.anthropic.claude-sonnet-4-5-20250929-v1:0";

let cached: BedrockRuntimeClient | undefined;

function getClient(): BedrockRuntimeClient {
  if (cached) return cached;

  cached = new BedrockRuntimeClient({
    region: process.env.AWS_REGION ?? "us-east-1",
    credentials:
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        : undefined,
  });

  return cached;
}

/**
 * The analyst persona. Deliberately strict about not inventing numbers: with no
 * connectors attached the model has no evidence, and a gap-intelligence product
 * that fabricates metrics is worse than one that says it cannot see yet.
 */
function buildSystemPrompt(
  connections: ConnectorRecord[],
  memories: Memory[]
): string {
  const connected = connections
    .map((record) => getConnector(record.connectorId)?.name)
    .filter((name): name is string => Boolean(name));

  const evidenceState =
    connected.length > 0
      ? `The user has connected: ${connected.join(", ")}. Ingestion for these sources is still pending, so you do not yet have their actual records - say so plainly when a question needs that data.`
      : "The user has not connected any data sources yet. You have no access to their actual business data.";

  const availableNames = CONNECTORS.filter(
    (connector) => connector.availability === "available"
  )
    .map((connector) => connector.name)
    .join(", ");

  // The knowledge base is what lets answers improve over time, so it is
  // injected on every turn.
  const knowledge =
    memories.length > 0
      ? `\n## What you know about this business\n${memories
          .map(
            (memory) =>
              `- [${memoryKindLabel(memory.kind)}] ${memory.content}`
          )
          .join("\n")}\n\nTreat these as established context. If a question contradicts them, flag the conflict rather than silently ignoring it.`
      : "\n## What you know about this business\nNothing recorded yet. When the user states a durable fact about their market, customers, or constraints, note that it is worth saving to their knowledge base.";

  return `You are Veloxiz, an AI business gap analyst.

Veloxiz finds the gaps a business cannot see: missed revenue, unmet demand, competitive whitespace, and strategic blind spots. You are not a general assistant and not a dashboard. Dashboards show what already happened; you surface what the team has not briefed yet.

## Current evidence state
${evidenceState}

Connectors available in the product: ${availableNames}.
${knowledge}

## Rules
1. Never invent metrics, revenue figures, percentages, customer names, or competitor data. If you do not have the data, say exactly what you would need and which connector supplies it.
2. When you lack connected evidence, you may still be genuinely useful: explain the analytical frame, the specific questions worth asking, the hypotheses worth testing, and which sources would confirm them.
3. When you do reason about a gap, structure it as: the gap, why it is plausible, the evidence that would confirm or kill it, and the estimated impact bracket with your assumptions stated.
4. Rank by impact. Lead with the single highest-leverage item rather than an exhaustive list.
5. Be concise and direct. Short paragraphs, plain markdown, no preamble like "Great question". Use headings only when the answer genuinely has multiple sections.
6. Veloxiz proposes; the team decides. Recommend, do not assert certainty you do not have.`;
}

/** Bedrock requires strictly alternating user/assistant turns starting with user. */
function toBedrockMessages(messages: ChatMessage[]): Message[] {
  const result: Message[] = [];

  for (const message of messages) {
    if (message.content.trim().length === 0) continue;

    const last = result[result.length - 1];

    if (last?.role === message.role) {
      // Merge consecutive same-role turns rather than letting Bedrock reject them.
      const block = last.content?.[last.content.length - 1];
      if (block && "text" in block) {
        block.text = `${block.text}\n\n${message.content}`;
        continue;
      }
    }

    result.push({
      role: message.role,
      content: [{ text: message.content }],
    });
  }

  // A conversation must open with a user turn.
  while (result.length > 0 && result[0].role !== "user") {
    result.shift();
  }

  return result;
}

export type BedrockFailureKind =
  | "not-authorized"
  | "model-access"
  | "throttled"
  | "unknown";

export class BedrockError extends Error {
  readonly kind: BedrockFailureKind;

  constructor(kind: BedrockFailureKind, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "BedrockError";
    this.kind = kind;
  }
}

export function classifyBedrockError(error: unknown): BedrockError {
  const name = (error as { name?: string } | null)?.name ?? "";
  const raw = error instanceof Error ? error.message : String(error);
  const lower = raw.toLowerCase();

  switch (name) {
    case "AccessDeniedException":
    case "UnrecognizedClientException": {
      // Distinguish a missing IAM action from un-enabled model access, since
      // the fixes live in different AWS consoles. Match on the IAM phrasing
      // rather than the word "model", which also appears in the action name
      // (bedrock:InvokeModel) of an IAM denial.
      const isIamDenial =
        lower.includes("not authorized to perform") ||
        lower.includes("identity-based policy") ||
        lower.includes("security token");

      if (isIamDenial) {
        return new BedrockError(
          "not-authorized",
          "The AWS credentials are not authorized for Amazon Bedrock. Add bedrock:InvokeModel and bedrock:InvokeModelWithResponseStream to the IAM user.",
          { cause: error }
        );
      }

      return new BedrockError(
        "model-access",
        "This AWS account does not have access to the configured Bedrock model. Enable it in Bedrock console > Model access.",
        { cause: error }
      );
    }

    case "ValidationException":
      return new BedrockError("model-access", raw, { cause: error });

    case "ThrottlingException":
    case "ServiceQuotaExceededException":
      return new BedrockError(
        "throttled",
        "Bedrock is rate limiting this request. Try again shortly.",
        { cause: error }
      );

    default:
      return new BedrockError("unknown", raw, { cause: error });
  }
}

export type StreamChatInput = {
  messages: ChatMessage[];
  connections: ConnectorRecord[];
  memories: Memory[];
};

/**
 * Yields assistant text deltas. Throws a BedrockError before the first chunk
 * when the request is rejected, so the caller can return a real HTTP status
 * instead of a half-open stream.
 */
export async function* streamChat(
  input: StreamChatInput
): AsyncGenerator<string> {
  const command = new ConverseStreamCommand({
    modelId: process.env.BEDROCK_MODEL_ID ?? DEFAULT_MODEL_ID,
    system: [{ text: buildSystemPrompt(input.connections, input.memories) }],
    messages: toBedrockMessages(input.messages),
    inferenceConfig: { maxTokens: 2048, temperature: 0.3 },
  });

  let response;
  try {
    response = await getClient().send(command);
  } catch (error) {
    throw classifyBedrockError(error);
  }

  if (!response.stream) return;

  try {
    for await (const event of response.stream) {
      const text = event.contentBlockDelta?.delta?.text;
      if (text) yield text;
    }
  } catch (error) {
    throw classifyBedrockError(error);
  }
}
