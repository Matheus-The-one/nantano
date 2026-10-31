import { DeleteCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getDocClient, TABLES } from "@/lib/db/client";

/**
 * `connected` means the user has saved a connection record. Outbound OAuth and
 * live database sockets are not wired up yet, so a connected source sits at
 * `pending` ingestion until the sync layer lands.
 */
export type ConnectionState = "connected" | "error";

export type IngestionState = "pending" | "syncing" | "synced" | "failed";

export type ConnectorRecord = {
  userId: string;
  connectorId: string;
  state: ConnectionState;
  ingestion: IngestionState;
  /** Non-secret config echoed back to the UI (host, database, subdomain, ...). */
  config: Record<string, string>;
  /** Keys that were supplied as secrets. Values are never stored in plaintext here. */
  secretKeys: string[];
  connectedAt: string;
  updatedAt: string;
};

export async function listConnections(userId: string): Promise<ConnectorRecord[]> {
  const result = await getDocClient().send(
    new QueryCommand({
      TableName: TABLES.connectors,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": userId },
    })
  );

  return (result.Items as ConnectorRecord[] | undefined) ?? [];
}

export type SaveConnectionInput = {
  userId: string;
  connectorId: string;
  config: Record<string, string>;
  secretKeys: string[];
};

export async function saveConnection(
  input: SaveConnectionInput
): Promise<ConnectorRecord> {
  const now = new Date().toISOString();

  const record: ConnectorRecord = {
    userId: input.userId,
    connectorId: input.connectorId,
    state: "connected",
    ingestion: "pending",
    config: input.config,
    secretKeys: input.secretKeys,
    connectedAt: now,
    updatedAt: now,
  };

  await getDocClient().send(
    new PutCommand({
      TableName: TABLES.connectors,
      Item: record,
    })
  );

  return record;
}

export async function removeConnection(
  userId: string,
  connectorId: string
): Promise<void> {
  await getDocClient().send(
    new DeleteCommand({
      TableName: TABLES.connectors,
      Key: { userId, connectorId },
    })
  );
}
