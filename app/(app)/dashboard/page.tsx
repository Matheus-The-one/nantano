import { randomUUID } from "node:crypto";
import { requireSession } from "@/lib/auth/server";
import { isAccessDenied } from "@/lib/db/client";
import { listConnections } from "@/lib/db/connectors";
import { getConnector } from "@/lib/connectors/catalog";
import { ChatSession } from "@/components/dashboard/chat/ChatSession";

export default async function DashboardChatPage() {
  const session = await requireSession();

  // Connector names are optional context for the chat shell: if Dynamo is
  // misconfigured we still want a usable chat rather than an error page.
  let connectedNames: string[] = [];
  let storageError: string | null = null;

  try {
    const connections = await listConnections(session.userId);
    connectedNames = connections
      .map((record) => getConnector(record.connectorId)?.name)
      .filter((name): name is string => Boolean(name));
  } catch (error) {
    console.error("[dashboard] Could not load chat context", error);
    storageError = isAccessDenied(error)
      ? "DynamoDB access denied, so chat history will not be saved. Check the IAM policy for the VELOXIZ_ tables."
      : "Could not load your connectors.";
  }

  // The id for the chat the user is about to start. Generated server-side so
  // the first render is deterministic; the URL switches to /dashboard/c/<id>
  // once they send a message.
  const conversationId = randomUUID();

  return (
    <ChatSession
      key={conversationId}
      conversationId={conversationId}
      initialMessages={[]}
      title={null}
      connectedNames={connectedNames}
      storageError={storageError}
      isNew
    />
  );
}
