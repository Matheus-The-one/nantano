import { requireSession } from "@/lib/auth/server";
import { isAccessDenied } from "@/lib/db/client";
import { listConnections } from "@/lib/db/connectors";
import { listMemories } from "@/lib/db/memory";
import { getConnector } from "@/lib/connectors/catalog";
import { KnowledgeView } from "@/components/dashboard/knowledge/KnowledgeView";

export default async function KnowledgePage() {
  const session = await requireSession();

  let memories: Awaited<ReturnType<typeof listMemories>> = [];
  let connectedNames: string[] = [];
  let loadError: string | null = null;

  try {
    const [entries, connections] = await Promise.all([
      listMemories(session.userId),
      listConnections(session.userId),
    ]);

    memories = entries;
    connectedNames = connections
      .map((record) => getConnector(record.connectorId)?.name)
      .filter((name): name is string => Boolean(name));
  } catch (error) {
    console.error("[knowledge] Could not load memories", error);
    loadError = isAccessDenied(error)
      ? "DynamoDB access denied. The IAM user needs read and write access to VELOXIZ_MEMORY."
      : "Could not load your knowledge base.";
  }

  return (
    <KnowledgeView
      memories={memories}
      connectedNames={connectedNames}
      loadError={loadError}
    />
  );
}
