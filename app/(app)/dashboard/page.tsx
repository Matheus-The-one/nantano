import { requireSession } from "@/lib/auth/server";
import { isAccessDenied } from "@/lib/db/client";
import { listConnections } from "@/lib/db/connectors";
import { listConversations } from "@/lib/db/conversations";
import { getConnector } from "@/lib/connectors/catalog";
import { ChatView } from "@/components/dashboard/chat/ChatView";

export default async function DashboardChatPage() {
  const session = await requireSession();

  // Both reads are optional context for the chat shell: if Dynamo is
  // misconfigured we still want a usable chat rather than an error page.
  let conversations: Awaited<ReturnType<typeof listConversations>> = [];
  let connectedNames: string[] = [];
  let storageError: string | null = null;

  try {
    const [history, connections] = await Promise.all([
      listConversations(session.userId),
      listConnections(session.userId),
    ]);

    conversations = history;
    connectedNames = connections
      .map((record) => getConnector(record.connectorId)?.name)
      .filter((name): name is string => Boolean(name));
  } catch (error) {
    console.error("[dashboard] Could not load chat context", error);
    storageError = isAccessDenied(error)
      ? "DynamoDB access denied, so chat history will not be saved. Check the IAM policy for the VELOXIZ_ tables."
      : "Could not load your chat history.";
  }

  return (
    <ChatView
      userName={session.name}
      conversations={conversations}
      connectedNames={connectedNames}
      storageError={storageError}
    />
  );
}
