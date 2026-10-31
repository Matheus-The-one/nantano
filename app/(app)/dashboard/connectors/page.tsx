import { requireSession } from "@/lib/auth/server";
import { isAccessDenied } from "@/lib/db/client";
import { listConnections } from "@/lib/db/connectors";
import { ConnectorsView } from "@/components/dashboard/connectors/ConnectorsView";

export default async function ConnectorsPage() {
  const session = await requireSession();

  let connections: Awaited<ReturnType<typeof listConnections>> = [];
  let loadError: string | null = null;

  try {
    connections = await listConnections(session.userId);
  } catch (error) {
    console.error("[connectors] Could not load connections", error);
    loadError = isAccessDenied(error)
      ? "DynamoDB access denied. The IAM user needs read and write access to VELOXIZ_CONNECTORS."
      : "Could not load your connections.";
  }

  return <ConnectorsView connections={connections} loadError={loadError} />;
}
