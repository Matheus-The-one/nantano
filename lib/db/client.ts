import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Table names. Prefixed with VELOXIZ_ because the target AWS account already
 * hosts unrelated tables (auth, stamo, NIKE_PRODUCTS, ...).
 */
export const TABLES = {
  users: "VELOXIZ_USERS",
  conversations: "VELOXIZ_CONVERSATIONS",
  connectors: "VELOXIZ_CONNECTORS",
  memory: "VELOXIZ_MEMORY",
} as const;

/**
 * Recency index on VELOXIZ_CONVERSATIONS (userId + updatedAt).
 *
 * The base table sorts by `conversationId`, a uuid, so it cannot answer
 * "most recent N chats" without reading every row. Queries for the chat
 * history use this index instead.
 */
export const CONVERSATIONS_BY_UPDATED_AT = "byUpdatedAt";

export const AWS_REGION = process.env.AWS_REGION ?? "us-east-1";

function readCredentials() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  // Fall back to the default provider chain (instance role, SSO, shared config)
  // when explicit keys are not set, which is what we want in production.
  if (!accessKeyId || !secretAccessKey) return undefined;

  return { accessKeyId, secretAccessKey };
}

let cached: DynamoDBDocumentClient | undefined;

/**
 * Shared document client. Memoised so hot reloads and concurrent requests do
 * not open a new connection pool per call.
 */
export function getDocClient(): DynamoDBDocumentClient {
  if (cached) return cached;

  const base = new DynamoDBClient({
    region: AWS_REGION,
    credentials: readCredentials(),
  });

  cached = DynamoDBDocumentClient.from(base, {
    marshallOptions: {
      // Dynamo rejects undefined attribute values outright.
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
  });

  return cached;
}

/** True when a DynamoDB failure is an authorization problem rather than a bug. */
export function isAccessDenied(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const name = (error as { name?: string }).name ?? "";
  return name === "AccessDeniedException" || name === "UnrecognizedClientException";
}
