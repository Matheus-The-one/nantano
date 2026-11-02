"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Loader2, Plus, Sparkles, Trash2, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { getConnector } from "@/lib/connectors/catalog";
import {
  memoryKindLabel,
  type Memory,
  type MemoryKind,
} from "@/lib/memory/schema";
import { cn } from "@/lib/utils";

const KINDS: MemoryKind[] = [
  "icp",
  "constraint",
  "metric",
  "competitor",
  "preference",
  "process",
];

export function KnowledgeView({
  memories: initial,
  connectedNames,
  loadError,
}: {
  memories: Memory[];
  connectedNames: string[];
  loadError: string | null;
}) {
  const [memories, setMemories] = useState(initial);
  const [filter, setFilter] = useState<MemoryKind | "all">("all");
  const [adding, setAdding] = useState(false);
  const [draftKind, setDraftKind] = useState<MemoryKind>("icp");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<MemoryKind, number>();
    for (const memory of memories) {
      map.set(memory.kind, (map.get(memory.kind) ?? 0) + 1);
    }
    return map;
  }, [memories]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? memories
        : memories.filter((memory) => memory.kind === filter),
    [memories, filter]
  );

  async function add() {
    if (draft.trim().length === 0) return;

    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: draftKind, content: draft }),
      });

      const payload = (await response.json()) as {
        memory?: Memory;
        error?: string;
      };

      if (!response.ok || !payload.memory) {
        throw new Error(payload.error ?? "Could not save that.");
      }

      setMemories((previous) => [payload.memory!, ...previous]);
      setDraft("");
      setAdding(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save that.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(memoryId: string) {
    const snapshot = memories;
    setMemories((previous) =>
      previous.filter((memory) => memory.memoryId !== memoryId)
    );

    try {
      const response = await fetch(
        `/api/memory?memoryId=${encodeURIComponent(memoryId)}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error();
    } catch {
      setMemories(snapshot);
      setError("Could not delete that entry.");
    }
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        eyebrow="Memory"
        title="Knowledge base"
        centered
        description="What Veloxiz has learned about your business. Facts gathered from connected sources, plus anything you tell it directly. This context is what makes gap scoring sharpen over time."
        actions={
          <button
            type="button"
            onClick={() => setAdding((value) => !value)}
            className="btn-ink inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
          >
            {adding ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {adding ? "Cancel" : "Add fact"}
          </button>
        }
      />

      <div className="mx-auto w-full max-w-[860px] px-5 py-6 sm:px-8">
        {loadError ? <Banner message={loadError} /> : null}
        {error ? <Banner message={error} /> : null}

        {adding ? (
          <div className="mb-6 rounded-2xl border border-primary/35 bg-card/50 p-4">
            <div className="flex flex-wrap gap-1.5">
              {KINDS.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setDraftKind(kind)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                    kind === draftKind
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {memoryKindLabel(kind)}
                </button>
              ))}
            </div>

            <textarea
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void add();
                }
              }}
              rows={2}
              placeholder="We sell to mid-market SaaS companies with 50-500 employees..."
              className="mt-3 w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm leading-relaxed outline-none transition-colors focus:border-primary/50 placeholder:text-muted-foreground"
            />

            <div className="mt-2.5 flex justify-end">
              <button
                type="button"
                onClick={() => void add()}
                disabled={busy || draft.trim().length === 0}
                className="btn-ink inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold disabled:opacity-50"
              >
                {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Save
              </button>
            </div>
          </div>
        ) : null}

        {memories.length === 0 ? (
          <EmptyState connectedNames={connectedNames} />
        ) : (
          <>
            <div className="mb-5 flex flex-wrap gap-1.5">
              <FilterChip
                label="All"
                count={memories.length}
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
              {KINDS.filter((kind) => counts.has(kind)).map((kind) => (
                <FilterChip
                  key={kind}
                  label={memoryKindLabel(kind)}
                  count={counts.get(kind) ?? 0}
                  active={filter === kind}
                  onClick={() => setFilter(kind)}
                />
              ))}
            </div>

            <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
              {visible.map((memory) => (
                <MemoryRow
                  key={memory.memoryId}
                  memory={memory}
                  onDelete={() => void remove(memory.memoryId)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function Banner({ message }: { message: string }) {
  return (
    <p className="mb-6 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary/50 bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:bg-secondary"
      )}
    >
      {label}
      <span className={active ? "text-primary/70" : "text-muted-foreground/70"}>
        {count}
      </span>
    </button>
  );
}

function MemoryRow({
  memory,
  onDelete,
}: {
  memory: Memory;
  onDelete: () => void;
}) {
  const sources = memory.sourceConnectorIds
    .map((id) => getConnector(id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <li className="group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-card/40">
      <span className="mt-0.5 shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {memoryKindLabel(memory.kind)}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm leading-relaxed text-foreground/90">
          {memory.content}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {memory.origin === "stated"
            ? "You told Veloxiz"
            : sources.length > 0
              ? `From ${sources.join(", ")}`
              : "Extracted"}
          {typeof memory.confidence === "number"
            ? ` · ${Math.round(memory.confidence * 100)}% confidence`
            : ""}
        </span>
      </span>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete entry"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </li>
  );
}

function EmptyState({ connectedNames }: { connectedNames: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card/30 px-6 py-12 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12">
        <Sparkles className="h-5 w-5 text-primary" />
      </span>

      <h2 className="mt-5 font-display text-lg font-bold tracking-tight">
        Nothing learned yet
      </h2>

      <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground">
        {connectedNames.length > 0
          ? `${connectedNames.join(", ")} ${connectedNames.length === 1 ? "is" : "are"} connected, but Veloxiz has not ingested from ${connectedNames.length === 1 ? "it" : "them"} yet. Facts will appear here after the first sync, or add one yourself.`
          : "Connect a source and Veloxiz will start extracting facts about your market, customers, and constraints. You can also add them yourself."}
      </p>

      {connectedNames.length === 0 ? (
        <Link
          href="/dashboard/connectors"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Connect a source
        </Link>
      ) : null}
    </div>
  );
}
