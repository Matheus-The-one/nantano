"use client";

import { useMemo } from "react";
import {
  Background,
  Position,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  CONNECTOR_CATEGORIES,
  getConnector,
  PROCESS_CAPABLE_CONNECTORS,
  type ConnectorCategory,
} from "@/lib/connectors/catalog";
import type { ConnectorRecord } from "@/lib/db/connectors";

/**
 * Evidence tree.
 *
 * Renders the user's real connector topology as a left-to-right tree:
 *   sources -> category -> gap engine -> outputs
 *
 * Every source node reflects an actual VELOXIZ_CONNECTORS record, so this is a
 * picture of their data, not a sample. Downstream nodes are dimmed until the
 * branch feeding them is actually connected.
 */

const base = {
  borderRadius: "14px",
  fontSize: "12px",
  fontWeight: 600,
  padding: "10px 14px",
  width: 168,
  textAlign: "center" as const,
  border: "1px solid rgba(247,247,244,0.12)",
  background: "#1e1a16",
  color: "#f7f7f4",
  boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
};

/** Connected and feeding the engine. */
const liveStyle = {
  ...base,
  border: "1px solid rgba(245,158,46,0.55)",
  background: "#241c12",
};

/** Available but not connected. */
const idleStyle = {
  ...base,
  background: "#17140f",
  color: "rgba(247,247,244,0.45)",
  border: "1px dashed rgba(247,247,244,0.14)",
  boxShadow: "none",
};

const engineStyle = {
  ...base,
  width: 180,
  background: "#f59e2e",
  color: "#14110e",
  border: "1px solid #f59e2e",
  boxShadow: "0 8px 28px rgba(245,158,46,0.35)",
};

const outputStyle = {
  ...base,
  background: "#0c0a08",
  border: "1px solid rgba(247,247,244,0.15)",
};

const COLUMN = 232;
const ROW = 62;

function liveEdge(id: string, source: string, target: string): Edge {
  return {
    id,
    source,
    target,
    animated: true,
    style: { stroke: "#f59e2e", strokeWidth: 2 },
  };
}

function idleEdge(id: string, source: string, target: string): Edge {
  return {
    id,
    source,
    target,
    animated: false,
    style: {
      stroke: "rgba(247,247,244,0.13)",
      strokeWidth: 1.5,
      strokeDasharray: "4 4",
    },
  };
}

export function EvidenceTree({
  connections,
}: {
  connections: ConnectorRecord[];
}) {
  const { nodes, edges } = useMemo(() => {
    const connectedIds = new Set(connections.map((r) => r.connectorId));

    // Only show categories that can drive discovery, and within them only the
    // connectors the user has connected plus a couple of suggestions. A node
    // for all 24 connectors would be noise, not a visualisation.
    const categories = CONNECTOR_CATEGORIES.map((category) => {
      const inCategory = (PROCESS_CAPABLE_CONNECTORS as readonly string[])
        .map((id) => getConnector(id))
        .filter(
          (connector): connector is NonNullable<typeof connector> =>
            connector?.category === category.id
        );

      const connected = inCategory.filter((c) => connectedIds.has(c.id));
      const suggestions = inCategory
        .filter((c) => !connectedIds.has(c.id) && c.availability === "available")
        .slice(0, connected.length > 0 ? 1 : 2);

      return {
        category,
        connectors: [...connected, ...suggestions],
        liveCount: connected.length,
      };
    }).filter((group) => group.connectors.length > 0);

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Lay out source nodes stacked vertically, grouped by category.
    let row = 0;
    const categoryRow = new Map<ConnectorCategory, number>();

    for (const group of categories) {
      const first = row;

      for (const connector of group.connectors) {
        const live = connectedIds.has(connector.id);

        nodes.push({
          id: `src-${connector.id}`,
          position: { x: 0, y: row * ROW },
          data: { label: connector.name },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
          style: live ? liveStyle : idleStyle,
        });

        row += 1;
      }

      // Centre the category node against its children.
      const centre = (first + row - 1) / 2;
      categoryRow.set(group.category.id, centre);

      nodes.push({
        id: `cat-${group.category.id}`,
        position: { x: COLUMN, y: centre * ROW },
        data: {
          label:
            group.liveCount > 0
              ? `${group.category.label} (${group.liveCount})`
              : group.category.label,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: group.liveCount > 0 ? liveStyle : idleStyle,
      });

      for (const connector of group.connectors) {
        const live = connectedIds.has(connector.id);
        const id = `e-src-${connector.id}`;
        const from = `src-${connector.id}`;
        const to = `cat-${group.category.id}`;
        edges.push(live ? liveEdge(id, from, to) : idleEdge(id, from, to));
      }

      row += 0.6; // breathing room between category clusters
    }

    const totalRows = Math.max(row - 0.6, 1);
    const midpoint = ((totalRows - 1) / 2) * ROW;
    const anyLive = connectedIds.size > 0;

    // Engine
    nodes.push({
      id: "engine",
      position: { x: COLUMN * 2, y: midpoint },
      data: { label: "Gap scoring engine" },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: anyLive ? engineStyle : { ...engineStyle, opacity: 0.45 },
    });

    for (const group of categories) {
      const id = `e-cat-${group.category.id}`;
      const from = `cat-${group.category.id}`;
      edges.push(
        group.liveCount > 0
          ? liveEdge(id, from, "engine")
          : idleEdge(id, from, "engine")
      );
    }

    // Outputs
    const outputs = [
      { id: "processes", label: "Discovered processes" },
      { id: "bottlenecks", label: "Bottlenecks" },
      { id: "briefs", label: "Opportunity briefs" },
    ];

    outputs.forEach((output, index) => {
      const offset = (index - (outputs.length - 1) / 2) * ROW * 1.5;

      nodes.push({
        id: output.id,
        position: { x: COLUMN * 3, y: midpoint + offset },
        data: { label: output.label },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: anyLive ? outputStyle : { ...outputStyle, opacity: 0.45 },
      });

      const id = `e-out-${output.id}`;
      edges.push(
        anyLive
          ? liveEdge(id, "engine", output.id)
          : idleEdge(id, "engine", output.id)
      );
    });

    return { nodes, edges };
  }, [connections]);

  return (
    <div className="h-[440px] w-full overflow-hidden rounded-2xl border border-border surface-panel grain">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.14 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        preventScrolling={false}
      >
        <Background color="#3a3229" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
