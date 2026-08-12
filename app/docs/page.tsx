import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Documentation - Veloxiz",
  description:
    "Connect sources, score business gaps, and pull opportunity briefs from the Veloxiz API.",
};

const endpoints = [
  {
    method: "POST",
    path: "/v1/sources",
    description: "Connect a data source (CRM, warehouse, sheet)",
  },
  {
    method: "GET",
    path: "/v1/gaps",
    description: "List ranked business gaps for your workspace",
  },
  {
    method: "GET",
    path: "/v1/gaps/{id}",
    description: "Full brief - evidence, impact, next move",
  },
  {
    method: "POST",
    path: "/v1/briefs/ask",
    description: "Ask a natural-language market question",
  },
  {
    method: "POST",
    path: "/v1/gaps/{id}/feedback",
    description: "Approve or dismiss a gap (trains scoring)",
  },
  {
    method: "GET",
    path: "/v1/briefs/latest",
    description: "Fetch the latest weekly opportunity brief",
  },
];

const methodStyle: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-400",
  POST: "bg-primary/15 text-primary",
};

const quickStart = [
  { n: "01", title: "Get an API key", body: "Request access - we’ll issue a workspace key." },
  { n: "02", title: "Connect sources", body: "CRM, analytics, or upload a market sheet." },
  { n: "03", title: "Pull gaps", body: "GET /v1/gaps returns ranked opportunities." },
  { n: "04", title: "Act & feedback", body: "Approve or dismiss - scoring gets sharper." },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="site-shell">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Docs · API v1
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              Build on Veloxiz
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Connect sources, score business gaps, and pull opportunity briefs -
              via REST.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#quickstart"
                className="btn-ink inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-white">
                  <ArrowRight className="h-3 w-3" />
                </span>
                Quickstart
              </a>
              <a
                href="#api"
                className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
              >
                API reference
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section id="quickstart" className="pb-14 sm:pb-20">
        <div className="site-shell">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Quickstart
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStart.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border/60 bg-card/40 px-5 py-6"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary">
                  {s.n}
                </span>
                <h3 className="font-display text-lg font-semibold mt-2">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth snippet */}
      <section className="pb-14 sm:pb-20">
        <div className="site-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Authentication
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Pass your workspace key in the{" "}
                <code className="text-primary text-xs">Authorization</code> header.
                All requests use{" "}
                <code className="text-primary text-xs">https://api.veloxiz.ai</code>.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-[#0c0a08] p-5 sm:p-6 overflow-x-auto">
              <pre className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-foreground/85">
{`curl https://api.veloxiz.ai/v1/gaps \\
  -H "Authorization: Bearer vx_live_..." \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Example ask */}
      <section className="pb-14 sm:pb-20">
        <div className="site-shell">
          <div className="rounded-[1.75rem] surface-panel grain border border-border/40 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  Example
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  Ask for a gap brief
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Natural language in. Ranked opportunities out - with estimated impact.
                </p>
                <a
                  href="mailto:contact@Veloxiz.ai"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80"
                >
                  Request API access <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="bg-[#0c0a08] p-5 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border/40 overflow-x-auto">
                <pre className="font-mono text-[12px] sm:text-[13px] leading-relaxed text-foreground/85">
{`POST /v1/briefs/ask

{
  "query": "Where are we losing
            mid-market SaaS deals?",
  "limit": 5
}

→ gaps[] with impact, evidence,
  confidence, next_move`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API table */}
      <section id="api" className="pb-14 sm:pb-20">
        <div className="site-shell">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            API reference
          </h2>
          <div className="rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60">
            {endpoints.map((ep) => (
              <div
                key={ep.path + ep.method}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4 bg-card/30 hover:bg-card/60 transition-colors"
              >
                <span
                  className={`inline-flex w-fit shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide ${methodStyle[ep.method]}`}
                >
                  {ep.method}
                </span>
                <code className="font-mono text-sm text-foreground/90 shrink-0 sm:min-w-[200px]">
                  {ep.path}
                </code>
                <p className="text-sm text-muted-foreground sm:ml-auto sm:text-right">
                  {ep.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="site-shell">
          <div className="rounded-[1.75rem] border border-border/60 bg-card/40 px-6 py-10 sm:px-10 sm:py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                Need a workspace key?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                We’ll provision access and walk your first gap brief with you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:contact@Veloxiz.ai"
                className="btn-ink inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-white">
                  <ArrowRight className="h-3 w-3" />
                </span>
                Contact us
              </a>
              <Link
                href="/how-it-works"
                className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-secondary transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
