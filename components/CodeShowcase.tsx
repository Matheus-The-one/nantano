"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeStyle = {
  borderRadius: "14px",
  fontSize: "13px",
  fontWeight: 600,
  padding: "14px 20px",
  border: "1px solid rgba(247,247,244,0.12)",
  background: "#1e1a16",
  color: "#f7f7f4",
  boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  width: 180,
  textAlign: "center" as const,
};

const primaryStyle = {
  ...nodeStyle,
  background: "#f59e2e",
  color: "#14110e",
  border: "1px solid #f59e2e",
  boxShadow: "0 8px 28px rgba(245,158,46,0.35)",
};

const darkStyle = {
  ...nodeStyle,
  background: "#0c0a08",
  color: "#f7f7f4",
  border: "1px solid rgba(247,247,244,0.15)",
};

const nodes: Node[] = [
  {
    id: "input",
    position: { x: 250, y: 0 },
    data: { label: "Market + customer data" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: { ...nodeStyle, fontWeight: 700 },
  },
  {
    id: "structure",
    position: { x: 100, y: 120 },
    data: { label: "Normalize signals" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: nodeStyle,
  },
  {
    id: "learn",
    position: { x: 400, y: 120 },
    data: { label: "Learn your ICP" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: nodeStyle,
  },
  {
    id: "detect",
    position: { x: 250, y: 260 },
    data: { label: "Score business gaps" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: primaryStyle,
  },
  {
    id: "notify",
    position: { x: 100, y: 400 },
    data: { label: "Deliver opportunity brief" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: nodeStyle,
  },
  {
    id: "act",
    position: { x: 400, y: 400 },
    data: { label: "Prioritize & act" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: darkStyle,
  },
];

const edgeDefaults = {
  animated: true,
  style: { stroke: "#f59e2e", strokeWidth: 2 },
};

const edges: Edge[] = [
  { id: "e1", source: "input", target: "structure", ...edgeDefaults },
  { id: "e2", source: "input", target: "learn", ...edgeDefaults },
  { id: "e3", source: "structure", target: "detect", ...edgeDefaults },
  { id: "e4", source: "learn", target: "detect", ...edgeDefaults },
  { id: "e5", source: "detect", target: "notify", ...edgeDefaults },
  { id: "e6", source: "detect", target: "act", ...edgeDefaults },
];

export function CodeShowcase() {
  const onInit = useCallback(() => {}, []);

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="site-shell">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            From ask to opportunity map
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Connect sources once. Veloxiz scores gaps continuously and briefs your
            team on what to pursue next.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto h-[520px] rounded-[2rem] surface-panel grain overflow-hidden border border-border/40">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onInit={onInit}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            proOptions={{ hideAttribution: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
          >
            <Background color="#3a3229" gap={24} size={1} />
          </ReactFlow>
        </div>
      </div>
    </section>
  );
}
