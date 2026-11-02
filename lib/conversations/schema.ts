/**
 * Conversation shapes shared between server and client.
 *
 * Separate from `lib/db/conversations.ts` because that module constructs the
 * DynamoDB client: importing any *value* from it in a client component ships
 * the AWS SDK to the browser. Keeping these here means client code can import
 * them without that risk.
 */

/** Lightweight shape for the recent list, without message bodies. */
export type ConversationSummary = {
  conversationId: string;
  title: string;
  updatedAt: string;
};

/** One page of conversation summaries, newest first. */
export type ConversationPage = {
  items: ConversationSummary[];
  /**
   * Opaque cursor for the next page, or null at the end of the list. Encodes
   * a Dynamo `LastEvaluatedKey`; callers must pass it back verbatim.
   */
  cursor: string | null;
};
