"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  Check,
  Database,
  Loader2,
  Plug,
  Search,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ConnectorDialog } from "@/components/dashboard/connectors/ConnectorDialog";
import {
  CONNECTORS,
  CONNECTOR_CATEGORIES,
  type ConnectorDefinition,
} from "@/lib/connectors/catalog";
import type { ConnectorRecord } from "@/lib/db/connectors";
import { cn } from "@/lib/utils";

export function ConnectorsView({
  connections: initialConnections,
  loadError,
}: {
  connections: ConnectorRecord[];
  loadError: string | null;
}) {
  const [connections, setConnections] = useState(initialConnections);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ConnectorDefinition | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectedIds = useMemo(
    () => new Set(connections.map((record) => record.connectorId)),
    [connections]
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length === 0) return CONNECTORS;

    return CONNECTORS.filter(
      (connector) =>
        connector.name.toLowerCase().includes(needle) ||
        connector.summary.toLowerCase().includes(needle)
    );
  }, [query]);

  async function connect(
    connector: ConnectorDefinition,
    values: Record<string, string>
  ) {
    setBusyId(connector.id);
    setError(null);

    try {
      const response = await fetch("/api/connectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connectorId: connector.id, values }),
      });

      const payload = (await response.json()) as {
        connection?: ConnectorRecord;
        error?: string;
      };

      if (!response.ok || !payload.connection) {
        throw new Error(payload.error ?? "Could not save this connection.");
      }

      const saved = payload.connection;
      setConnections((previous) => [
        ...previous.filter((record) => record.connectorId !== saved.connectorId),
        saved,
      ]);
      setActive(null);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not save this connection."
      );
      throw caught;
    } finally {
      setBusyId(null);
    }
  }

  async function disconnect(connectorId: string) {
    setBusyId(connectorId);
    setError(null);

    const snapshot = connections;
    setConnections((previous) =>
      previous.filter((record) => record.connectorId !== connectorId)
    );

    try {
      const response = await fetch(
        `/api/connectors?connectorId=${encodeURIComponent(connectorId)}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Could not disconnect.");
    } catch {
      setConnections(snapshot);
      setError("Could not disconnect that source.");
    } finally {
      setBusyId(null);
      setActive(null);
    }
  }

  const connectedCount = connectedIds.size;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        eyebrow="Connect evidence"
        title="Connectors"
        description="Veloxiz scores gaps against the data you connect. The more context it has - pipeline, product, support, email - the sharper the briefs."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <Plug className="h-3.5 w-3.5 text-primary" />
            {connectedCount} connected
          </span>
        }
      />

      <div className="px-6 py-6 lg:px-8">
        {loadError ? <Banner message={loadError} /> : null}
        {error ? <Banner message={error} /> : null}

        {/* Ingestion honesty note: connections are recorded, sync is not live. */}
        {connectedCount > 0 ? (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-border bg-card/50 px-4 py-3.5">
            <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                Sync is not live yet.
              </span>{" "}
              Your connections are saved, but Veloxiz is not pulling records from
              them yet, so chat and process discovery will tell you when they
              need data they cannot see.
            </p>
          </div>
        ) : null}

        <div className="relative mb-8 max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search connectors"
            className="w-full rounded-full border border-border bg-card/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-10">
          {CONNECTOR_CATEGORIES.map((category) => {
            const items = filtered.filter(
              (connector) => connector.category === category.id
            );
            if (items.length === 0) return null;

            return (
              <section key={category.id}>
                <h2 className="font-display text-base font-semibold tracking-tight">
                  {category.label}
                </h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((connector) => (
                    <ConnectorCard
                      key={connector.id}
                      connector={connector}
                      connected={connectedIds.has(connector.id)}
                      busy={busyId === connector.id}
                      onClick={() => setActive(connector)}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No connectors match &ldquo;{query}&rdquo;.
            </p>
          ) : null}
        </div>
      </div>

      <ConnectorDialog
        connector={active}
        connection={
          active
            ? connections.find((record) => record.connectorId === active.id) ?? null
            : null
        }
        busy={active ? busyId === active.id : false}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
        onConnect={connect}
        onDisconnect={disconnect}
      />
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

function ConnectorCard({
  connector,
  connected,
  busy,
  onClick,
}: {
  connector: ConnectorDefinition;
  connected: boolean;
  busy: boolean;
  onClick: () => void;
}) {
  const comingSoon = connector.availability === "coming-soon";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-start gap-3.5 rounded-xl border bg-card/40 p-4 text-left transition-colors",
        connected
          ? "border-primary/40 bg-primary/[0.04]"
          : "border-border hover:border-primary/35 hover:bg-card"
      )}
    >
      <ConnectorLogo connector={connector} />

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-medium">{connector.name}</span>

          {connected ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              {busy ? (
                <Loader2 className="h-2.5 w-2.5 animate-spin" />
              ) : (
                <Check className="h-2.5 w-2.5" />
              )}
              Connected
            </span>
          ) : comingSoon ? (
            <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Soon
            </span>
          ) : null}
        </span>

        <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
          {connector.summary}
        </span>
      </span>
    </button>
  );
}

/** Falls back to a glyph for connectors with no logo asset (Google Calendar). */
export function ConnectorLogo({
  connector,
  size = 36,
}: {
  connector: ConnectorDefinition;
  size?: number;
}) {
  if (!connector.logo) {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-lg bg-secondary"
        style={{ width: size, height: size }}
      >
        <Plug className="h-4 w-4 text-muted-foreground" />
      </span>
    );
  }

  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-lg bg-white/[0.06] p-1.5"
      style={{ width: size, height: size }}
    >
      <Image
        src={connector.logo}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain p-1"
      />
    </span>
  );
}
