import { randomUUID } from "node:crypto";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { getDocClient, TABLES } from "@/lib/db/client";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type Conversation = {
  userId: string;
  conversationId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
};

/** Lightweight shape for the sidebar list, without message bodies. */
export type ConversationSummary = {
  conversationId: string;
  title: string;
  updatedAt: string;
};

export function newConversationId(): string {
  return randomUUID();
}

/** Derives a short title from the first user message. */
export function deriveTitle(firstMessage: string): string {
  const cleaned = firstMessage.replace(/\s+/g, " ").trim();
  if (cleaned.length === 0) return "New conversation";
  return cleaned.length > 60 ? `${cleaned.slice(0, 57)}...` : cleaned;
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

  return (result.Item as Conversation | undefined) ?? null;
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
