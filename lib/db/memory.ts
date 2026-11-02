import { randomUUID } from "node:crypto";
import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { getDocClient, TABLES } from "@/lib/db/client";
import type {
  Memory,
  MemoryKind,
  MemoryOrigin,
} from "@/lib/memory/schema";

/**
 * Knowledge base storage: the durable facts Veloxiz has learned about a
 * company. This is what makes gap scoring sharpen over time, so each entry
 * keeps the connector it came from as its evidence trail.
 *
 * Shapes and labels live in `lib/memory/schema.ts` so client components can
 * use them without pulling in the AWS SDK.
 */
export type { Memory, MemoryKind, MemoryOrigin } from "@/lib/memory/schema";
export { memoryKindLabel, MEMORY_KINDS } from "@/lib/memory/schema";

export async function listMemories(userId: string): Promise<Memory[]> {
  const result = await getDocClient().send(
    new QueryCommand({
      TableName: TABLES.memory,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
    })
  );

  const items = (result.Items as Memory[] | undefined) ?? [];

  // Sort key is a uuid, so order by recency here instead.
  return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export type SaveMemoryInput = {
  userId: string;
  kind: MemoryKind;
  content: string;
  origin: MemoryOrigin;
  sourceConnectorIds?: string[];
  confidence?: number;
};

export async function saveMemory(input: SaveMemoryInput): Promise<Memory> {
  const now = new Date().toISOString();

  const memory: Memory = {
    userId: input.userId,
    memoryId: randomUUID(),
    kind: input.kind,
    content: input.content,
    origin: input.origin,
    sourceConnectorIds: input.sourceConnectorIds ?? [],
    confidence: input.confidence,
    createdAt: now,
    updatedAt: now,
  };

  await getDocClient().send(
    new PutCommand({ TableName: TABLES.memory, Item: memory })
  );

  return memory;
}

export async function deleteMemory(
  userId: string,
  memoryId: string
): Promise<void> {
  await getDocClient().send(
    new DeleteCommand({
      TableName: TABLES.memory,
      Key: { userId, memoryId },
    })
  );
}
