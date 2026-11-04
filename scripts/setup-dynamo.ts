/**
 * Creates the DynamoDB tables the dashboard needs. Idempotent: existing tables
 * are left untouched.
 *
 *   npx tsx scripts/setup-dynamo.ts
 */
import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  ResourceNotFoundException,
  UpdateTableCommand,
  waitUntilTableExists,
  type CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";
import { CONVERSATIONS_BY_UPDATED_AT } from "@/lib/db/client";

const REGION = process.env.AWS_REGION ?? "us-east-1";

const client = new DynamoDBClient({
  region: REGION,
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

const tables: CreateTableCommandInput[] = [
  {
    TableName: "VELOXIZ_USERS",
    BillingMode: "PAY_PER_REQUEST",
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
  },
  {
    TableName: "VELOXIZ_CONVERSATIONS",
    BillingMode: "PAY_PER_REQUEST",
    KeySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
      { AttributeName: "conversationId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "conversationId", AttributeType: "S" },
      { AttributeName: "updatedAt", AttributeType: "S" },
    ],
    // The table sort key is a uuid, so the base table cannot return rows in
    // recency order. This index does, which is what lets the chat history
    // paginate a page at a time instead of loading every conversation.
    GlobalSecondaryIndexes: [
      {
        IndexName: CONVERSATIONS_BY_UPDATED_AT,
        KeySchema: [
          { AttributeName: "userId", KeyType: "HASH" },
          { AttributeName: "updatedAt", KeyType: "RANGE" },
        ],
        // Only the recent-list fields, so the index stays small and a page
        // read never pulls message bodies.
        Projection: {
          ProjectionType: "INCLUDE",
          NonKeyAttributes: ["title"],
        },
      },
    ],
  },
  {
    TableName: "VELOXIZ_CONNECTORS",
    BillingMode: "PAY_PER_REQUEST",
    KeySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
      { AttributeName: "connectorId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "connectorId", AttributeType: "S" },
      { AttributeName: "createdAt", AttributeType: "S" },
    ],
  },
  {
    TableName: "VELOXIZ_MEMORY",
    BillingMode: "PAY_PER_REQUEST",
    KeySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
      { AttributeName: "memoryId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "memoryId", AttributeType: "S" },
    ],
  },
];

async function describe(name: string) {
  try {
    const result = await client.send(
      new DescribeTableCommand({ TableName: name })
    );
    return result.Table ?? null;
  } catch (error) {
    if (error instanceof ResourceNotFoundException) return null;
    throw error;
  }
}

/**
 * Waits for a secondary index to finish backfilling.
 *
 * `waitUntilTableExists` only waits for the *table* to go ACTIVE, which
 * happens while a new index is still being populated. Querying during that
 * window fails with "Cannot read from backfilling global secondary index",
 * so the index status has to be polled separately.
 */
async function waitForIndexActive(
  tableName: string,
  indexName: string,
  timeoutMs = 600_000
): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const table = await describe(tableName);
    const index = (table?.GlobalSecondaryIndexes ?? []).find(
      (candidate) => candidate.IndexName === indexName
    );

    if (index?.IndexStatus === "ACTIVE" && !index.Backfilling) return;

    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }

  throw new Error(
    `Index ${tableName}.${indexName} did not become ACTIVE within ${Math.round(timeoutMs / 1000)}s.`
  );
}

/**
 * Adds any missing global secondary index to a table that already exists.
 * Dynamo allows only one index to be added per request, and the table must be
 * ACTIVE in between, so this applies them one at a time.
 */
async function addMissingIndexes(
  input: CreateTableCommandInput,
  existingIndexNames: string[]
): Promise<void> {
  const name = input.TableName!;
  const wanted = input.GlobalSecondaryIndexes ?? [];

  for (const index of wanted) {
    const indexName = index.IndexName!;

    if (existingIndexNames.includes(indexName)) {
      // Present, but it may still be backfilling from an earlier run.
      await waitForIndexActive(name, indexName);
      console.log(`  index ok ${name}.${indexName}`);
      continue;
    }

    console.log(`  adding  ${name}.${indexName} ...`);
    await client.send(
      new UpdateTableCommand({
        TableName: name,
        AttributeDefinitions: input.AttributeDefinitions,
        GlobalSecondaryIndexUpdates: [
          {
            Create: {
              IndexName: indexName,
              KeySchema: index.KeySchema,
              Projection: index.Projection,
            },
          },
        ],
      })
    );

    // Backfill must finish before the index can be queried.
    await waitForIndexActive(name, indexName);
    console.log(`  added   ${name}.${indexName}`);
  }
}

async function main() {
  console.log(`Region: ${REGION}\n`);

  for (const input of tables) {
    const name = input.TableName!;
    const existing = await describe(name);

    if (existing) {
      console.log(`  exists   ${name}`);
      await addMissingIndexes(
        input,
        (existing.GlobalSecondaryIndexes ?? [])
          .map((index) => index.IndexName)
          .filter((indexName): indexName is string => Boolean(indexName))
      );
      continue;
    }

    await client.send(new CreateTableCommand(input));
    await waitUntilTableExists(
      { client, maxWaitTime: 120 },
      { TableName: name }
    );
    console.log(`  created  ${name}`);
  }

  console.log("\nDone.");
}

main().catch((error: unknown) => {
  const name = (error as { name?: string }).name;

  if (name === "AccessDeniedException") {
    console.error(
      "\nAccessDenied. The IAM user needs dynamodb:CreateTable, DescribeTable,\n" +
        "GetItem, PutItem, UpdateItem, DeleteItem and Query on the VELOXIZ_* tables."
    );
  }

  console.error(error);
  process.exit(1);
});
