import { requireSession } from "@/lib/auth/server";
import { listConnections } from "@/lib/db/connectors";
import {
  getConnector,
  PROCESS_CAPABLE_CONNECTORS,
} from "@/lib/connectors/catalog";
import type { ProcessGraph } from "@/lib/process/types";
import { ProcessView } from "@/components/dashboard/process/ProcessView";

/**
 * Discovery runs on ingested event data. Nothing is ingested yet, so this
 * always resolves to null today and the page renders its empty state. When the
 * sync layer lands, this is the only function that changes.
 */
async function discoverProcesses(
  _userId: string,
  _connectorIds: string[]
): Promise<ProcessGraph[]> {
  return [];
}

export default async function ProcessPage() {
  const session = await requireSession();

  let connectedIds: string[] = [];
  let connections: Awaited<ReturnType<typeof listConnections>> = [];
  try {
    connections = await listConnections(session.userId);
    connectedIds = connections.map((record) => record.connectorId);
  } catch (error) {
    console.error("[process] Could not load connections", error);
  }

  const capable = connectedIds.filter((id) =>
    (PROCESS_CAPABLE_CONNECTORS as readonly string[]).includes(id)
  );

  const graphs = capable.length > 0
    ? await discoverProcesses(session.userId, capable)
    : [];

  const capableNames = capable
    .map((id) => getConnector(id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <ProcessView
      graphs={graphs}
      capableConnectorNames={capableNames}
      hasAnyConnection={connectedIds.length > 0}
      connections={connections}
    />
  );
}
