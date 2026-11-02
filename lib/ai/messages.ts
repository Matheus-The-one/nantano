import type { UIMessage } from "ai";
import type { VeloxizUITools } from "@/lib/ai/tools";

/**
 * Metadata we attach to assistant messages so the client can render timing and
 * token cost without a second request. Kept to primitives because every value
 * is persisted to DynamoDB and sent over the wire.
 */
export type VeloxizMessageMetadata = {
  createdAt?: string;
  totalTokens?: number;
  /** Set when generation failed, so a reload still shows what went wrong. */
  errorMessage?: string;
};

/** No custom data parts yet; the generic stays explicit for when we add them. */
export type VeloxizDataParts = Record<string, never>;

/**
 * The single message type shared by the route, the store, and the UI. Typing
 * the `UIMessage` generics means `message.parts` is exhaustively narrowable,
 * so a new tool cannot be rendered incorrectly without a type error.
 */
export type VeloxizUIMessage = UIMessage<
  VeloxizMessageMetadata,
  VeloxizDataParts,
  VeloxizUITools
>;

/** Concatenated text of a message, for titles and previews. */
export function messageText(message: VeloxizUIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim();
}

/**
 * Derives a short conversation title from the first user message. Lives here
 * rather than in the DynamoDB module so the client can use it too.
 */
export function deriveTitle(firstMessage: string): string {
  const cleaned = firstMessage.replace(/\s+/g, " ").trim();
  if (cleaned.length === 0) return "New conversation";
  return cleaned.length > 60 ? `${cleaned.slice(0, 57)}...` : cleaned;
}
