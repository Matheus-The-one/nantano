"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, GitBranch, Layers, Plug, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProcessGraphCanvas } from "@/components/dashboard/process/ProcessGraphCanvas";
import { EvidenceTree } from "@/components/dashboard/process/EvidenceTree";
import type { ConnectorRecord } from "@/lib/db/connectors";
import {
  formatDuration,
  healthLabel,
  type ProcessGraph,
} from "@/lib/process/types";
import { cn } from "@/lib/utils";

export function ProcessView({
  graphs,
  capableConnectorNames,
  hasAnyConnection,
  connections,
}: {
  graphs: ProcessGraph[];
  capableConnectorNames: string[];
  hasAnyConnection: boolean;
  connections: ConnectorRecord[];
}) {
  const [activeId, setActiveId] = useState(graphs[0]?.id ?? null);
  const active = graphs.find((graph) => graph.id === activeId) ?? graphs[0] ?? null;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        eyebrow="Diagnose"
        title="Root cause analysis"
        description="Veloxiz reconstructs how work actually flows through your business from connected event data, then traces where cases stall, split, or skip steps."
      />

      <div className="px-6 py-6 lg:px-8">
        {active === null ? (
          <div className="space-y-8">
            {/* The evidence tree is always shown: it maps the user's real
                connector topology even before any process is discovered. */}
            <section>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-semibold tracking-tight">
                    Your evidence graph
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    How your connected sources feed gap scoring. Solid amber is
                    live; dashed is not connected yet.
                  </p>
                </div>
                <Link
                  href="/dashboard/connectors"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                >
                  <Plug className="h-3.5 w-3.5 text-primary" />
                  Manage sources
                </Link>
              </div>

              <EvidenceTree connections={connections} />
            </section>

            <EmptyState
              capableConnectorNames={capableConnectorNames}
              hasAnyConnection={hasAnyConnection}
            />
          </div>
        ) : (
          <DiscoveredProcess
            graph={active}
            graphs={graphs}
            onSelect={setActiveId}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Two distinct states: nothing connected at all, versus connected sources that
 * cannot drive discovery yet because ingestion has not run.
 */
function EmptyState({
  capableConnectorNames,
  hasAnyConnection,
}: {
  capableConnectorNames: string[];
  hasAnyConnection: boolean;
}) {
  const waitingOnSync = capableConnectorNames.length > 0;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-border bg-card/40 px-6 py-10 text-center sm:px-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12">
          <GitBranch className="h-5 w-5 text-primary" />
        </span>

        <h2 className="mt-5 font-display text-xl font-bold tracking-tight">
          {waitingOnSync
            ? "Waiting on your first sync"
            : "Connect a source to discover your processes"}
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {waitingOnSync ? (
            <>
              {capableConnectorNames.join(", ")}{" "}
              {capableConnectorNames.length === 1 ? "is" : "are"} connected, but
              Veloxiz has not ingested event data from{" "}
              {capableConnectorNames.length === 1 ? "it" : "them"} yet. Discovery
              runs automatically once the first sync completes.
            </>
          ) : (
            <>
              Process discovery needs timestamped events - deal stage changes,
              ticket transitions, order states. Connect a source that emits them
              and Veloxiz will reconstruct the real flow, not the documented one.
            </>
          )}
        </p>

        {!waitingOnSync ? (
          <Link
            href="/dashboard/connectors"
            className="btn-ink mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            <Plug className="h-4 w-4" />
            {hasAnyConnection ? "Add a source" : "Connect your first source"}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function DiscoveredProcess({
  graph,
  graphs,
  onSelect,
}: {
  graph: ProcessGraph;
  graphs: ProcessGraph[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {graphs.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {graphs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                item.id === graph.id
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-secondary"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={Layers}
          label="Cases"
          value={graph.caseCount.toLocaleString()}
        />
        <Metric
          icon={Clock}
          label="Median duration"
          value={formatDuration(graph.medianDurationHours)}
        />
        <Metric
          icon={ShieldCheck}
          label="Conformance"
          value={`${graph.conformancePercent}%`}
        />
        <Metric
          icon={GitBranch}
          label="Variants"
          value={graph.variants.length.toLocaleString()}
        />
      </div>

      <ProcessGraphCanvas graph={graph} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Bottlenecks" subtitle="Activities holding cases the longest">
          <ul className="divide-y divide-border">
            {[...graph.activities]
              .sort((a, b) => b.medianHours - a.medianHours)
              .slice(0, 6)
              .map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{activity.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {activity.caseCount.toLocaleString()} cases
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2.5">
                    <span className="font-mono text-sm">
                      {formatDuration(activity.medianHours)}
                    </span>
                    <HealthBadge activity={activity} />
                  </span>
                </li>
              ))}
          </ul>
        </Panel>

        <Panel title="Variants" subtitle="How cases actually flow, by frequency">
          <ul className="divide-y divide-border">
            {[...graph.variants]
              .sort((a, b) => b.sharePercent - a.sharePercent)
              .slice(0, 6)
              .map((variant) => (
                <li key={variant.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm">
                      {variant.isHappyPath ? (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                          Happy path
                        </span>
                      ) : null}
                      <span className="text-muted-foreground">
                        {variant.path.length} steps
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-sm">
                      {variant.sharePercent}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary/70"
                      style={{ width: `${variant.sharePercent}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {variant.caseCount.toLocaleString()} cases, median{" "}
                    {formatDuration(variant.medianDurationHours)}
                  </p>
                </li>
              ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/40 px-4 py-3.5">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </p>
      <p className="mt-1.5 font-display text-xl font-bold tracking-tight">
        {value}
      </p>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card/30 p-5">
      <h3 className="font-display text-base font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function HealthBadge({
  activity,
}: {
  activity: ProcessGraph["activities"][number];
}) {
  const tone =
    activity.health === "bottleneck"
      ? "bg-destructive/15 text-destructive"
      : activity.health === "slow"
        ? "bg-chart-4/15 text-chart-4"
        : "bg-chart-2/15 text-chart-2";

  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        tone
      )}
    >
      {healthLabel(activity.health)}
    </span>
  );
}
