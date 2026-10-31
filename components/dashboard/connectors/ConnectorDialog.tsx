"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, ShieldCheck, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConnectorLogo } from "@/components/dashboard/connectors/ConnectorsView";
import type { ConnectorDefinition } from "@/lib/connectors/catalog";
import type { ConnectorRecord } from "@/lib/db/connectors";

/** Human label for the auth mechanism, used in the dialog subtitle. */
function authLabel(connector: ConnectorDefinition): string {
  switch (connector.authKind) {
    case "oauth":
      return "OAuth";
    case "credentials":
      return "Direct connection";
    case "api-key":
      return "API key";
    default: {
      // Exhaustiveness guard: new auth kinds must be labelled here.
      const never: never = connector.authKind;
      return never;
    }
  }
}

export function ConnectorDialog({
  connector,
  connection,
  busy,
  onOpenChange,
  onConnect,
  onDisconnect,
}: {
  connector: ConnectorDefinition | null;
  connection: ConnectorRecord | null;
  busy: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (
    connector: ConnectorDefinition,
    values: Record<string, string>
  ) => Promise<void>;
  onDisconnect: (connectorId: string) => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  // Reset the form whenever a different connector is opened.
  useEffect(() => {
    setValues({});
  }, [connector?.id]);

  if (!connector) return null;

  const connected = connection !== null;
  const comingSoon = connector.availability === "coming-soon";

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-3.5">
            <ConnectorLogo connector={connector} size={44} />
            <div className="min-w-0 flex-1">
              <DialogTitle className="font-display text-lg tracking-tight">
                {connector.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs">
                {authLabel(connector)}
                {connected ? " - connected" : comingSoon ? " - coming soon" : ""}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {connector.summary}
        </p>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            Signals Veloxiz extracts
          </h3>
          <ul className="mt-3 space-y-2">
            {connector.signals.map((signal) => (
              <li key={signal} className="flex items-start gap-2.5 text-sm">
                <span
                  aria-hidden="true"
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                />
                <span className="text-foreground/80">{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        {connector.scopes && connector.scopes.length > 0 ? (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Scopes requested
            </h3>
            <ul className="mt-3 space-y-1.5">
              {connector.scopes.map((scope) => (
                <li
                  key={scope}
                  className="break-all rounded-lg bg-secondary/60 px-3 py-2 font-mono text-[11px] text-foreground/75"
                >
                  {scope}
                </li>
              ))}
            </ul>
            <p className="mt-2.5 flex items-start gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              Read-only. Veloxiz never writes to your source.
            </p>
          </div>
        ) : null}

        {connected ? (
          <ConnectedPanel connection={connection} />
        ) : connector.fields && connector.fields.length > 0 ? (
          <form
            id={`connect-${connector.id}`}
            onSubmit={(event) => {
              event.preventDefault();
              void onConnect(connector, values).catch(() => {
                // Error is surfaced by the parent banner.
              });
            }}
            className="space-y-3.5"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Connection details
            </h3>

            {connector.fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={`${connector.id}-${field.key}`}
                  className="block text-xs font-medium text-foreground/80"
                >
                  {field.label}
                  {field.optional ? (
                    <span className="ml-1.5 font-normal text-muted-foreground">
                      optional
                    </span>
                  ) : null}
                </label>

                {field.key === "serviceAccountJson" ? (
                  <textarea
                    id={`${connector.id}-${field.key}`}
                    rows={4}
                    value={values[field.key] ?? ""}
                    onChange={(event) =>
                      setValues((previous) => ({
                        ...previous,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="mt-1.5 w-full resize-none rounded-lg border border-border bg-card/60 px-3 py-2 font-mono text-xs outline-none transition-colors focus:border-primary/50"
                  />
                ) : (
                  <input
                    id={`${connector.id}-${field.key}`}
                    type={field.secret ? "password" : "text"}
                    autoComplete={field.secret ? "new-password" : "off"}
                    value={values[field.key] ?? ""}
                    onChange={(event) =>
                      setValues((previous) => ({
                        ...previous,
                        [field.key]: event.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="mt-1.5 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50"
                  />
                )}

                {field.helpText ? (
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                    {field.helpText}
                  </p>
                ) : null}
              </div>
            ))}

            <p className="rounded-lg border border-border bg-secondary/40 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
              Secrets are not stored in this build. Veloxiz records that the
              connection exists and which credentials it will need once sync is
              enabled.
            </p>
          </form>
        ) : null}

        <div className="flex gap-2.5 pt-1">
          {connected ? (
            <>
              <button
                type="button"
                onClick={() => void onDisconnect(connector.id)}
                disabled={busy}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-destructive/40 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Disconnect
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Close
              </button>
            </>
          ) : comingSoon ? (
            <button
              type="button"
              disabled
              className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground"
            >
              Coming soon
            </button>
          ) : (
            <button
              type={connector.fields?.length ? "submit" : "button"}
              form={connector.fields?.length ? `connect-${connector.id}` : undefined}
              onClick={
                connector.fields?.length
                  ? undefined
                  : () => {
                      void onConnect(connector, {}).catch(() => {});
                    }
              }
              disabled={busy}
              className="btn-ink inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Connect {connector.name}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ConnectedPanel({ connection }: { connection: ConnectorRecord }) {
  const entries = Object.entries(connection.config);

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/[0.05] px-4 py-3.5">
      <p className="flex items-center gap-2 text-sm font-medium text-primary">
        <Check className="h-4 w-4" />
        Connected{" "}
        {new Date(connection.connectedAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {entries.length > 0 ? (
        <dl className="mt-3 space-y-1.5">
          {entries.map(([key, value]) => (
            <div key={key} className="flex gap-2 text-xs">
              <dt className="shrink-0 text-muted-foreground">{key}</dt>
              <dd className="min-w-0 truncate font-mono text-foreground/80">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Ingestion status:{" "}
        <span className="font-medium text-foreground/80">
          {connection.ingestion}
        </span>
        . Veloxiz is not reading records from this source yet.
      </p>
    </div>
  );
}
