import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Key,
  Zap,
  Code2,
  Book,
  Terminal,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Documentation — Veloxiz",
  description:
    "API reference, getting started guides, and integration examples for Veloxiz Process Intelligence.",
  keywords: "veloxiz api docs, process intelligence api, anomaly detection api reference",
};

const endpoints = [
  {
    method: "POST",
    path: "/v1/streams",
    description: "Register a new process stream for monitoring",
    badge: "Streams",
  },
  {
    method: "GET",
    path: "/v1/streams/{id}",
    description: "Get details and current status of a stream",
    badge: "Streams",
  },
  {
    method: "POST",
    path: "/v1/streams/{id}/events",
    description: "Ingest one or more events into a stream",
    badge: "Events",
  },
  {
    method: "GET",
    path: "/v1/anomalies",
    description: "List detected anomalies with filtering options",
    badge: "Anomalies",
  },
  {
    method: "GET",
    path: "/v1/anomalies/{id}",
    description: "Get full context for a specific anomaly",
    badge: "Anomalies",
  },
  {
    method: "POST",
    path: "/v1/alerts/subscribe",
    description: "Subscribe to real-time WebSocket anomaly alerts",
    badge: "Alerts",
  },
  {
    method: "GET",
    path: "/v1/patterns",
    description: "Get learned patterns and baselines for a stream",
    badge: "Patterns",
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  POST: "bg-green-500/10 text-green-600 dark:text-green-400",
  PUT: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  DELETE: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const steps = [
  {
    step: "01",
    icon: Key,
    title: "Get your API key",
    description: "Sign up and retrieve your API key from the dashboard under Settings → API Keys.",
  },
  {
    step: "02",
    icon: Code2,
    title: "Register a stream",
    description: "Create a process stream with a name and schema. Veloxiz will start learning its baseline immediately.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Ingest events",
    description: "Send events to your stream via REST or our SDKs. Batch ingestion supported up to 1000 events/request.",
  },
  {
    step: "04",
    icon: Terminal,
    title: "Subscribe to alerts",
    description: "Connect via WebSocket to receive real-time anomaly alerts the moment they are detected.",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/8" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm">
              <Book className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">API v1</span>
            </div>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              Documentation
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Everything you need to connect your data sources, configure process
              streams, and receive real-time intelligence from Veloxiz.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <a href="#getting-started">
                  Getting Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#api-reference">API Reference</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Getting Started</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Up and running in 4 steps
            </h2>
            <p className="mt-6 text-muted-foreground">
              No complex setup. Connect your first process stream in under an hour.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={i}
                className="card-hover relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground/50">{step.step}</span>
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Authentication</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                API Key Authentication
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                All API requests must include your API key in the{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">Authorization</code>{" "}
                header. Keys are scoped to a workspace and can be rotated at any time.
              </p>
              <div className="space-y-3">
                {[
                  "Keys are workspace-scoped",
                  "Rotate at any time without downtime",
                  "Per-key rate limits configurable",
                  "Full audit log of key usage",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-muted/30">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">Authentication</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2"># Set your API key</p>
                  <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
                    <span className="text-primary">export</span>{" "}
                    <span className="text-foreground">VELOXIZ_API_KEY</span>
                    <span className="text-muted-foreground">=</span>
                    <span className="text-green-600 dark:text-green-400">&quot;vx_live_...&quot;</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2"># Make an authenticated request</p>
                  <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm space-y-1">
                    <div><span className="text-primary">curl</span> -X GET \</div>
                    <div className="pl-4"><span className="text-primary">-H</span> <span className="text-green-600 dark:text-green-400">&quot;Authorization: Bearer $VELOXIZ_API_KEY&quot;</span> \</div>
                    <div className="pl-4"><span className="text-green-600 dark:text-green-400">&quot;https://api.veloxiz.ai/v1/streams&quot;</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingesting Events */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm order-2 lg:order-1">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50 bg-muted/30">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">POST /v1/streams/&#123;id&#125;/events</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <p className="text-xs text-muted-foreground mb-3"># Request body</p>
                <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm space-y-1">
                  <div><span className="text-foreground">&#123;</span></div>
                  <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">&quot;events&quot;</span><span className="text-muted-foreground">: [</span></div>
                  <div className="pl-8"><span className="text-muted-foreground">&#123;</span></div>
                  <div className="pl-12"><span className="text-blue-600 dark:text-blue-400">&quot;timestamp&quot;</span><span className="text-muted-foreground">: </span><span className="text-green-600 dark:text-green-400">&quot;2026-08-04T12:00:00Z&quot;</span><span className="text-muted-foreground">,</span></div>
                  <div className="pl-12"><span className="text-blue-600 dark:text-blue-400">&quot;process&quot;</span><span className="text-muted-foreground">: </span><span className="text-green-600 dark:text-green-400">&quot;order_fulfillment&quot;</span><span className="text-muted-foreground">,</span></div>
                  <div className="pl-12"><span className="text-blue-600 dark:text-blue-400">&quot;duration_ms&quot;</span><span className="text-muted-foreground">: </span><span className="text-yellow-600 dark:text-yellow-400">823</span><span className="text-muted-foreground">,</span></div>
                  <div className="pl-12"><span className="text-blue-600 dark:text-blue-400">&quot;status&quot;</span><span className="text-muted-foreground">: </span><span className="text-green-600 dark:text-green-400">&quot;success&quot;</span></div>
                  <div className="pl-8"><span className="text-muted-foreground">&#125;</span></div>
                  <div className="pl-4"><span className="text-muted-foreground">]</span></div>
                  <div><span className="text-foreground">&#125;</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 mb-2"># Response</p>
                <div className="rounded-lg bg-green-500/5 border border-green-500/20 px-4 py-3 text-sm">
                  <div><span className="text-foreground">&#123;</span></div>
                  <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">&quot;ingested&quot;</span><span className="text-muted-foreground">: </span><span className="text-yellow-600 dark:text-yellow-400">1</span><span className="text-muted-foreground">,</span></div>
                  <div className="pl-4"><span className="text-blue-600 dark:text-blue-400">&quot;status&quot;</span><span className="text-muted-foreground">: </span><span className="text-green-600 dark:text-green-400">&quot;ok&quot;</span></div>
                  <div><span className="text-foreground">&#125;</span></div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Event Ingestion</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Send events from any source
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Events can be any structured record from your operations. Veloxiz
                ingests them, normalizes timing, and begins building a statistical
                model of what &quot;normal&quot; looks like for each process.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Batch size", value: "Up to 1,000 events per request" },
                  { label: "Max payload", value: "5 MB per request" },
                  { label: "Rate limit", value: "10,000 events/minute (Pro)" },
                  { label: "Retention", value: "90 days (Pro), unlimited (Enterprise)" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
                    <span className="text-sm font-medium">{row.label}</span>
                    <span className="text-sm text-muted-foreground font-mono">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-reference" className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">API Reference</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Available endpoints
            </h2>
            <p className="mt-6 text-muted-foreground">Base URL: <code className="rounded bg-muted px-2 py-1 text-sm font-mono">https://api.veloxiz.ai</code></p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm divide-y divide-border/40">
            {endpoints.map((ep) => (
              <div
                key={ep.path}
                className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
              >
                <span
                  className={`flex-shrink-0 rounded-md px-2.5 py-1 text-xs font-bold font-mono ${methodColors[ep.method]}`}
                >
                  {ep.method}
                </span>
                <code className="flex-shrink-0 text-sm font-mono text-foreground/80 hidden sm:block">
                  {ep.path}
                </code>
                <span className="text-sm text-muted-foreground flex-1 truncate hidden md:block">
                  {ep.description}
                </span>
                <span className="flex-shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {ep.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Need help integrating?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Our engineering team is happy to help with custom integrations, SDK questions, and onboarding.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="mailto:contact@Veloxiz.ai">
                Contact Engineering Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/Matheus-The-one" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
