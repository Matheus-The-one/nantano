import { randomUUID } from "node:crypto";
import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { getDocClient, TABLES } from "@/lib/db/client";

/**
 * Knowledge base: the durable facts Veloxiz has learned about a company.
 *
 * Two origins:
 *  - `extracted` : derived from a connected source during ingestion.
 *  - `stated`    : told to Veloxiz directly by the user.
 *
 * This is what makes gap scoring sharpen over time, so each entry keeps the
 * connector it came from as its evidence trail.
 */

export type MemoryKind =
  | "icp"
  | "constraint"
  | "metric"
  | "competitor"
  | "preference"
  | "process";

export type MemoryOrigin = "extracted" | "stated";

export type Memory = {
  userId: string;
  memoryId: string;
  kind: MemoryKind;
  /** The learned fact, phrased as a single sentence. */
  content: string;
  origin: MemoryOrigin;
  /** Connector ids this was derived from. Empty for user-stated facts. */
  sourceConnectorIds: string[];
  /** Model confidence 0-1, only meaningful for extracted entries. */
  confidence?: number;
  createdAt: string;
  updatedAt: string;
};

export function memoryKindLabel(kind: MemoryKind): string {
  switch (kind) {
    case "icp":
      return "Ideal customer";
    case "constraint":
      return "Constraint";
    case "metric":
      return "Metric";
    case "competitor":
      return "Competitor";
    case "preference":
      return "Preference";
    case "process":
      return "Process";
    default: {
      // Exhaustiveness guard: new memory kinds must be labelled here.
      const never: never = kind;
      return never;
    }
  }
}

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
