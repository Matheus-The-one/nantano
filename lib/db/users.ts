import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { getDocClient, TABLES } from "@/lib/db/client";

export type User = {
  userId: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: string;
  lastLoginAt: string;
};

export type UpsertUserInput = {
  userId: string;
  email: string;
  name: string;
  picture?: string;
};

/**
 * Creates the user on first sign-in, otherwise refreshes the profile fields
 * Google gave us and bumps lastLoginAt. createdAt is only written once via
 * if_not_exists so repeat logins never overwrite it.
 */
export async function upsertUser(input: UpsertUserInput): Promise<User> {
  const now = new Date().toISOString();

  const result = await getDocClient().send(
    new UpdateCommand({
      TableName: TABLES.users,
      Key: { userId: input.userId },
      UpdateExpression:
        "SET email = :email, #name = :name, picture = :picture, lastLoginAt = :now, createdAt = if_not_exists(createdAt, :now)",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: {
        ":email": input.email,
        ":name": input.name,
        ":picture": input.picture ?? null,
        ":now": now,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as User;
}

export async function getUser(userId: string): Promise<User | null> {
  const result = await getDocClient().send(
    new GetCommand({
      TableName: TABLES.users,
      Key: { userId },
    })
  );

  return (result.Item as User | undefined) ?? null;
}
