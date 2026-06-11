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
  borderRadius: "12px",
  fontSize: "13px",
  fontWeight: 600,
  padding: "14px 20px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  color: "hsl(var(--foreground))",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  width: 180,
  textAlign: "center" as const,
};

const primaryStyle = {
  ...nodeStyle,
  background: "oklch(0.45 0.2 280)",
  color: "#fff",
  border: "1px solid oklch(0.5 0.22 280)",
  boxShadow: "0 4px 20px oklch(0.45 0.2 280 / 0.3)",
};

const darkStyle = {
  ...nodeStyle,
  background: "oklch(0.25 0.05 280)",
  color: "#fff",
  border: "1px solid oklch(0.35 0.1 280)",
};

const nodes: Node[] = [
  {
    id: "input",
    position: { x: 250, y: 0 },
    data: { label: "Enterprise Data" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: { ...nodeStyle, fontWeight: 700 },
  },
  {
    id: "structure",
    position: { x: 100, y: 120 },
    data: { label: "Structure" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: nodeStyle,
  },
  {
    id: "learn",
    position: { x: 400, y: 120 },
    data: { label: "Learn Baselines" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: nodeStyle,
  },
  {
    id: "detect",
    position: { x: 250, y: 260 },
    data: { label: "Detect Anomalies" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: primaryStyle,
  },
  {
    id: "notify",
    position: { x: 100, y: 400 },
    data: { label: "Notify via WebSocket" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: nodeStyle,
  },
  {
    id: "act",
    position: { x: 400, y: 400 },
    data: { label: "Act" },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    style: darkStyle,
  },
];

const edgeDefaults = {
  animated: true,
  style: { stroke: "oklch(0.45 0.2 280)", strokeWidth: 2 },
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
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            How It Works
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Structure. Detect. Notify. Act.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Four steps from chaotic data to actionable process intelligence.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto h-[520px] rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
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
            <Background color="hsl(var(--border))" gap={24} size={1} />
          </ReactFlow>
        </div>
      </div>
    </section>
  );
}
