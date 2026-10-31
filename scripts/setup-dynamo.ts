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
  waitUntilTableExists,
  type CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";

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

async function tableExists(name: string): Promise<boolean> {
  try {
    await client.send(new DescribeTableCommand({ TableName: name }));
    return true;
  } catch (error) {
    if (error instanceof ResourceNotFoundException) return false;
    throw error;
  }
}

async function main() {
  console.log(`Region: ${REGION}\n`);

  for (const input of tables) {
    const name = input.TableName!;

    if (await tableExists(name)) {
      console.log(`  exists   ${name}`);
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
