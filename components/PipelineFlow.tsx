"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
    padding: "12px 16px",
    border: "1px solid hsl(var(--border))",
    background: "hsl(var(--card))",
    color: "hsl(var(--foreground))",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
};

const primaryStyle = {
  ...nodeDefaults.style,
  background: "oklch(0.45 0.2 280)",
  color: "#fff",
  border: "1px solid oklch(0.45 0.2 280)",
};

const nodes: Node[] = [
  {
    id: "source",
    position: { x: 0, y: 120 },
    data: { label: "Data Sources" },
    ...nodeDefaults,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "crawl",
    position: { x: 220, y: 40 },
    data: { label: "Ingest & Structure" },
    ...nodeDefaults,
  },
  {
    id: "analyze",
    position: { x: 220, y: 200 },
    data: { label: "Learn Baselines" },
    ...nodeDefaults,
  },
  {
    id: "process",
    position: { x: 460, y: 120 },
    data: { label: "AI Pattern Engine" },
    ...nodeDefaults,
    style: primaryStyle,
  },
  {
    id: "validate",
    position: { x: 680, y: 40 },
    data: { label: "Detect Anomalies" },
    ...nodeDefaults,
  },
  {
    id: "cache",
    position: { x: 680, y: 200 },
    data: { label: "Correlate Events" },
    ...nodeDefaults,
  },
  {
    id: "serve",
    position: { x: 900, y: 120 },
    data: { label: "Real-Time Alerts" },
    ...nodeDefaults,
    style: {
      ...nodeDefaults.style,
      background: "oklch(0.25 0.05 280)",
      color: "#fff",
      border: "1px solid oklch(0.3 0.1 280)",
    },
  },
];

const edgeDefaults = {
  animated: true,
  style: { stroke: "oklch(0.45 0.2 280)", strokeWidth: 2 },
};

const edges: Edge[] = [
  { id: "e1", source: "source", target: "crawl", ...edgeDefaults },
  { id: "e2", source: "source", target: "analyze", ...edgeDefaults },
  { id: "e3", source: "crawl", target: "process", ...edgeDefaults },
  { id: "e4", source: "analyze", target: "process", ...edgeDefaults },
  { id: "e5", source: "process", target: "validate", ...edgeDefaults },
  { id: "e6", source: "process", target: "cache", ...edgeDefaults },
  { id: "e7", source: "validate", target: "serve", ...edgeDefaults },
  { id: "e8", source: "cache", target: "serve", ...edgeDefaults },
];

export function PipelineFlow() {
  const onInit = useCallback(() => {}, []);

  return (
    <div className="w-full h-[400px] sm:h-[450px] rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={onInit}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      >
        <Background color="hsl(var(--border))" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
