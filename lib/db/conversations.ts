import { randomUUID } from "node:crypto";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { getDocClient, TABLES, CONVERSATIONS_BY_UPDATED_AT } from "@/lib/db/client";
import type { VeloxizUIMessage } from "@/lib/ai/messages";
import type {
  ConversationPage,
  ConversationSummary,
} from "@/lib/conversations/schema";

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
export type {
  ConversationSummary,
  ConversationPage,
} from "@/lib/conversations/schema";

/** Hard ceiling on page size so a crafted request cannot ask for everything. */
const MAX_PAGE_SIZE = 50;

/**
 * Cursors cross a trust boundary (server -> browser -> server), so they are
 * validated on the way back in rather than handed to Dynamo as-is. Only a key
 * for this exact user is accepted, which stops a tampered cursor from being
 * used to page through somebody else's conversations.
 */
type PageKey = Record<string, unknown>;

function encodeCursor(key: PageKey | undefined): string | null {
  if (!key) return null;
  return Buffer.from(JSON.stringify(key), "utf8").toString("base64url");
}

function decodeCursor(
  cursor: string | null | undefined,
  userId: string
): PageKey | undefined {
  if (!cursor) return undefined;

  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(cursor, "base64url").toString("utf8")
    );

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return undefined;
    }

    const key = parsed as PageKey;

    // The key must belong to the caller, and carry exactly the attributes the
    // index uses. Anything else is treated as a bad cursor.
    if (key.userId !== userId) return undefined;
    if (typeof key.updatedAt !== "string") return undefined;
    if (typeof key.conversationId !== "string") return undefined;

    return {
      userId: key.userId,
      updatedAt: key.updatedAt,
      conversationId: key.conversationId,
    };
  } catch {
    // Malformed base64 or JSON: start from the beginning rather than throwing.
    return undefined;
  }
}

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

/**
 * One page of conversations, newest first.
 *
 * Reads the recency index so Dynamo does the ordering and the limit, rather
 * than fetching every conversation and sorting in memory.
 */
export async function listConversations(
  userId: string,
  options: { limit?: number; cursor?: string | null } = {}
): Promise<ConversationPage> {
  const limit = Math.min(Math.max(options.limit ?? 20, 1), MAX_PAGE_SIZE);

  const result = await getDocClient().send(
    new QueryCommand({
      TableName: TABLES.conversations,
      IndexName: CONVERSATIONS_BY_UPDATED_AT,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
      // Descending over updatedAt: newest first.
      ScanIndexForward: false,
      Limit: limit,
      ExclusiveStartKey: decodeCursor(options.cursor, userId),
    })
  );

  const items = (result.Items as ConversationSummary[] | undefined) ?? [];

  return {
    items,
    cursor: encodeCursor(result.LastEvaluatedKey),
  };
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
