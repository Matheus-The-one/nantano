import { randomUUID } from "node:crypto";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { getDocClient, TABLES } from "@/lib/db/client";
import type { VeloxizUIMessage } from "@/lib/ai/messages";

export { deriveTitle, messageText } from "@/lib/ai/messages";

/**
 * Conversations are stored in the AI SDK `UIMessage` format (role + typed
 * parts) rather than flat text, so tool calls, reasoning, and metadata survive
 * a reload exactly as they streamed.
 */
export type Conversation = {
  userId: string;
  conversationId: string;
  title: string;
  messages: VeloxizUIMessage[];
  createdAt: string;
  updatedAt: string;
};

/** Lightweight shape for the recent list, without message bodies. */
export type ConversationSummary = {
  conversationId: string;
  title: string;
  updatedAt: string;
};

/**
 * The pre-AI-SDK row shape: a single text body per message. Rows written
 * before the migration still have this, so reads normalise it on the way out.
 */
type LegacyChatMessage = {
  id?: string;
  role?: string;
  content?: string;
  createdAt?: string;
};

export function newConversationId(): string {
  return randomUUID();
}

function isUIMessage(value: unknown): value is VeloxizUIMessage {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { role?: unknown; parts?: unknown };
  return (
    typeof candidate.role === "string" && Array.isArray(candidate.parts)
  );
}

/**
 * Upgrades a legacy `{ role, content }` row into a single-text-part
 * `UIMessage`. Unknown roles (there should be none) are dropped rather than
 * trusted, since `role` feeds straight into the model prompt.
 */
function migrateLegacyMessage(
  value: LegacyChatMessage
): VeloxizUIMessage | null {
  const role = value.role;
  if (role !== "user" && role !== "assistant" && role !== "system") return null;

  const content = typeof value.content === "string" ? value.content : "";
  if (content.trim().length === 0) return null;

  return {
    id: value.id ?? randomUUID(),
    role,
    parts: [{ type: "text", text: content }],
    metadata: value.createdAt ? { createdAt: value.createdAt } : undefined,
  };
}

function normaliseMessages(value: unknown): VeloxizUIMessage[] {
  if (!Array.isArray(value)) return [];

  const messages: VeloxizUIMessage[] = [];

  for (const entry of value) {
    if (isUIMessage(entry)) {
      messages.push(entry);
      continue;
    }

    const migrated = migrateLegacyMessage(entry as LegacyChatMessage);
    if (migrated) messages.push(migrated);
  }

  return messages;
}

export async function listConversations(
  userId: string
): Promise<ConversationSummary[]> {
  const result = await getDocClient().send(
    new QueryCommand({
      TableName: TABLES.conversations,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
      ProjectionExpression: "conversationId, title, updatedAt",
    })
  );

  const items = (result.Items as ConversationSummary[] | undefined) ?? [];

  // Dynamo sorts by the sort key (a uuid), so order by recency here instead.
  return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getConversation(
  userId: string,
  conversationId: string
): Promise<Conversation | null> {
  const result = await getDocClient().send(
    new GetCommand({
      TableName: TABLES.conversations,
      Key: { userId, conversationId },
    })
  );

  if (!result.Item) return null;

  const item = result.Item as Omit<Conversation, "messages"> & {
    messages?: unknown;
  };

  return { ...item, messages: normaliseMessages(item.messages) };
}

export async function saveConversation(
  conversation: Conversation
): Promise<void> {
  await getDocClient().send(
    new PutCommand({
      TableName: TABLES.conversations,
      Item: conversation,
    })
  );
}

export async function deleteConversation(
  userId: string,
  conversationId: string
): Promise<void> {
  await getDocClient().send(
    new DeleteCommand({
      TableName: TABLES.conversations,
      Key: { userId, conversationId },
    })
  );
}
