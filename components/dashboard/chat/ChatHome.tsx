"use client";

import Image from "next/image";
import Link from "next/link";
import {
  getConnector,
  type ConnectorDefinition,
} from "@/lib/connectors/catalog";

/** Short chip labels with the full prompt sent on click. */
const SUGGESTIONS = [
  {
    label: "Segment gaps",
    prompt:
      "Which customer segments are we underserving, and what would confirm it?",
  },
  {
    label: "Revenue drivers",
    prompt:
      "What are the biggest drivers of missed revenue in our business right now?",
  },
  {
    label: "Churn risk",
    prompt: "Where is churn risk concentrated, and what signals should we watch?",
  },
  {
    label: "Competitor whitespace",
    prompt: "Which competitor move should we respond to first, and why?",
  },
  {
    label: "Pipeline leaks",
    prompt: "Where are we losing mid-market SaaS deals?",
  },
];

/** Onboarding tile linking to the connectors page, showing real logos. */
function EvidenceTile({
  title,
  connectorIds,
}: {
  title: string;
  connectorIds: string[];
}) {
  const connectors = connectorIds
    .map((id) => getConnector(id))
    .filter((connector): connector is ConnectorDefinition => Boolean(connector));

  return (
    <Link
      href="/dashboard/connectors"
      className="group flex flex-col items-center gap-3.5 bg-background px-5 py-7 text-center transition-colors hover:bg-card/50"
    >
      <span className="text-sm text-foreground/80">{title}</span>

      <span className="flex items-center gap-2">
        {connectors.map((connector) =>
          connector.logo ? (
            <span
              key={connector.id}
              title={connector.name}
              className="relative h-7 w-7 overflow-hidden rounded-md bg-white/[0.06] p-1"
            >
              <Image
                src={connector.logo}
                alt={connector.name}
                fill
                sizes="28px"
                className="object-contain p-0.5"
              />
            </span>
          ) : null
        )}
        <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
          More
        </span>
      </span>
    </Link>
  );
}

/**
 * The empty state, centred in the pane above the docked composer: starting
 * questions and connector prompts. Past chats live in the sidebar.
 */
export function ChatHome({
  connectedNames,
  onSuggestion,
}: {
  connectedNames: string[];
  onSuggestion: (prompt: string) => void;
}) {
  return (
    <div className="relative flex min-h-full items-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-bg"
      />

      <div className="relative mx-auto w-full max-w-[760px] px-5 py-10 sm:px-8">
        <h2 className="text-center font-display text-[26px] font-bold leading-tight tracking-tight sm:text-[30px]">
          Start your first gap analysis
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
          Ask a question below, or connect a source so Veloxiz can reason over
          your own evidence.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => onSuggestion(suggestion.prompt)}
              className="rounded-lg border border-border bg-secondary/60 px-2.5 py-1.5 text-xs font-medium text-foreground/85 transition-colors hover:border-primary/40 hover:bg-secondary hover:text-foreground"
            >
              {suggestion.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          <EvidenceTile
            title="Connect your CRM"
            connectorIds={["salesforce", "hubspot"]}
          />
          <EvidenceTile
            title="Connect your database"
            connectorIds={["postgresql", "mysql", "snowflake"]}
          />
        </div>

        {connectedNames.length > 0 ? (
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Reading context from{" "}
            <span className="text-foreground/80">
              {connectedNames.join(", ")}
            </span>
            .
          </p>
        ) : null}
      </div>
    </div>
  );
}
