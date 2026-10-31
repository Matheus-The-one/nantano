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
import { formatDuration, type ProcessGraph } from "@/lib/process/types";

/** Node styling matched to components/PipelineFlow.tsx so the app feels like one product. */
const baseStyle = {
  borderRadius: "14px",
  fontSize: "12px",
  fontWeight: 600,
  padding: "10px 14px",
  width: 170,
  textAlign: "center" as const,
  border: "1px solid rgba(247,247,244,0.12)",
  background: "#1e1a16",
  color: "#f7f7f4",
  boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
};

const bottleneckStyle = {
  ...baseStyle,
  background: "#f59e2e",
  color: "#14110e",
  border: "1px solid #f59e2e",
  boxShadow: "0 8px 28px rgba(245,158,46,0.35)",
};

const slowStyle = {
  ...baseStyle,
  border: "1px solid rgba(245,158,46,0.45)",
};

/**
 * Lays activities out left to right in dependency order. Transitions define the
 * ordering, so a discovered graph of any shape gets a readable layout without
 * a heavyweight layout engine.
 */
function layout(graph: ProcessGraph): { nodes: Node[]; edges: Edge[] } {
  const depth = new Map<string, number>();

  for (const activity of graph.activities) depth.set(activity.id, 0);

  // Relax depths until stable, capped to avoid cycling on looping processes.
  for (let pass = 0; pass < graph.activities.length; pass += 1) {
    let changed = false;

    for (const transition of graph.transitions) {
      const from = depth.get(transition.from);
      const to = depth.get(transition.to);
      if (from === undefined || to === undefined) continue;

      if (to < from + 1) {
        depth.set(transition.to, from + 1);
        changed = true;
      }
    }

    if (!changed) break;
  }

  const columns = new Map<number, string[]>();
  for (const activity of graph.activities) {
    const column = depth.get(activity.id) ?? 0;
    columns.set(column, [...(columns.get(column) ?? []), activity.id]);
  }

  const nodes: Node[] = graph.activities.map((activity) => {
    const column = depth.get(activity.id) ?? 0;
    const siblings = columns.get(column) ?? [];
    const row = siblings.indexOf(activity.id);
    const offset = ((siblings.length - 1) * 110) / 2;

    return {
      id: activity.id,
      position: { x: column * 230, y: row * 110 - offset },
      data: {
        label: `${activity.name} · ${formatDuration(activity.medianHours)}`,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style:
        activity.health === "bottleneck"
          ? bottleneckStyle
          : activity.health === "slow"
            ? slowStyle
            : baseStyle,
    };
  });

  const edges: Edge[] = graph.transitions.map((transition, index) => ({
    id: `${transition.from}-${transition.to}-${index}`,
    source: transition.from,
    target: transition.to,
    animated: !transition.deviation,
    label: transition.caseCount.toLocaleString(),
    labelStyle: { fill: "#a89f94", fontSize: 10 },
    labelBgStyle: { fill: "#14110e" },
    style: transition.deviation
      ? { stroke: "rgba(239,107,107,0.65)", strokeWidth: 1.5, strokeDasharray: "4 4" }
      : { stroke: "#f59e2e", strokeWidth: 2 },
  }));

  return { nodes, edges };
}

export function ProcessGraphCanvas({ graph }: { graph: ProcessGraph }) {
  const { nodes, edges } = useMemo(() => layout(graph), [graph]);

  return (
    <div className="h-[460px] w-full overflow-hidden rounded-2xl border border-border surface-panel grain">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#3a3229" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
