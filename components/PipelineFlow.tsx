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

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    borderRadius: "14px",
    fontSize: "13px",
    fontWeight: 600,
    padding: "12px 16px",
    border: "1px solid rgba(247,247,244,0.12)",
    background: "#1e1a16",
    color: "#f7f7f4",
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  },
};

const primaryStyle = {
  ...nodeDefaults.style,
  background: "#f59e2e",
  color: "#14110e",
  border: "1px solid #f59e2e",
  boxShadow: "0 8px 28px rgba(245,158,46,0.35)",
};

const darkStyle = {
  ...nodeDefaults.style,
  background: "#0c0a08",
  color: "#f7f7f4",
  border: "1px solid rgba(247,247,244,0.15)",
};

const nodes: Node[] = [
  {
    id: "source",
    position: { x: 0, y: 120 },
    data: { label: "Market + CRM data" },
    ...nodeDefaults,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "crawl",
    position: { x: 220, y: 40 },
    data: { label: "Normalize signals" },
    ...nodeDefaults,
  },
  {
    id: "analyze",
    position: { x: 220, y: 200 },
    data: { label: "Learn your ICP" },
    ...nodeDefaults,
  },
  {
    id: "process",
    position: { x: 460, y: 120 },
    data: { label: "Gap scoring engine" },
    ...nodeDefaults,
    style: primaryStyle,
  },
  {
    id: "validate",
    position: { x: 680, y: 40 },
    data: { label: "Rank opportunities" },
    ...nodeDefaults,
  },
  {
    id: "cache",
    position: { x: 680, y: 200 },
    data: { label: "Attach evidence" },
    ...nodeDefaults,
  },
  {
    id: "serve",
    position: { x: 900, y: 120 },
    data: { label: "Opportunity brief" },
    ...nodeDefaults,
    style: darkStyle,
  },
];

const edgeDefaults = {
  animated: true,
  style: { stroke: "#f59e2e", strokeWidth: 2 },
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
    <div className="w-full h-[420px] sm:h-[480px] rounded-[2rem] surface-panel grain overflow-hidden border border-border/40">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={onInit}
        fitView
        fitViewOptions={{ padding: 0.28 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      >
        <Background color="#3a3229" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
