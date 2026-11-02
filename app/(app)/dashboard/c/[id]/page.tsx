import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/server";
import { isAccessDenied } from "@/lib/db/client";
import { listConnections } from "@/lib/db/connectors";
import { getConversation } from "@/lib/db/conversations";
import { getConnector } from "@/lib/connectors/catalog";
import { ChatSession } from "@/components/dashboard/chat/ChatSession";

/**
 * A single conversation at its own URL, so chats are linkable, survive a
 * reload, and work with browser back/forward.
 */
export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireSession();
  const { id } = await params;

  let connectedNames: string[] = [];
  let storageError: string | null = null;

  const conversation = await getConversation(session.userId, id).catch(
    (error) => {
      console.error("[dashboard] Could not load conversation", error);
      storageError = isAccessDenied(error)
        ? "DynamoDB access denied, so chat history will not be saved. Check the IAM policy for the VELOXIZ_ tables."
        : "Could not load this conversation.";
      return null;
    }
  );

  // Keyed by userId, so another user's id simply does not resolve.
  if (!conversation && !storageError) notFound();

  try {
    const connections = await listConnections(session.userId);
    connectedNames = connections
      .map((record) => getConnector(record.connectorId)?.name)
      .filter((name): name is string => Boolean(name));
  } catch (error) {
    console.error("[dashboard] Could not load connectors", error);
  }

  return (
    <ChatSession
      key={id}
      conversationId={id}
      initialMessages={conversation?.messages ?? []}
      title={conversation?.title ?? null}
      connectedNames={connectedNames}
      storageError={storageError}
    />
  );
}
