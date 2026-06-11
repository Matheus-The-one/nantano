import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Activity,
  Bell,
  Layers,
  Search,
  Zap,
  RefreshCw,
  Shield,
  BarChart3,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { PipelineFlow } from "@/components/PipelineFlow";

export const metadata = {
  title: "How It Works — Nantano AI",
  description:
    "Learn how Nantano AI structures enterprise data, detects process patterns and anomalies with AI, and delivers real-time notifications when issues arise.",
  keywords:
    "process intelligence, ai pattern detection, anomaly detection, real-time alerts, enterprise process monitoring",
};

export default function ProcessMiningPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1 text-sm mb-8">
              <Brain className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Our core technology
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Process Intelligence
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
              We use AI to understand how your enterprise processes work —
              structuring raw data, detecting patterns and anomalies, and
              delivering real-time alerts the moment something needs attention.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Pipeline Flow */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              System Architecture
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How data flows through our system
            </h2>
            <p className="mt-4 text-muted-foreground">
              An interactive view of our intelligence pipeline — from raw input
              to structured alerts.
            </p>
          </div>
          <PipelineFlow />
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                The Problem
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Enterprise data is a mess
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Your operations generate massive amounts of data across dozens of
                systems. But without structure, you can&apos;t see what&apos;s
                happening — issues hide in noise, patterns go unnoticed, and
                problems only surface after they&apos;ve already done damage.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We fix this by bringing AI-powered structure and intelligence to
                your data — turning chaos into clarity, and silence into
                real-time awareness.
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {["Invisible bottlenecks", "Silent failures", "Undetected drift", "Delayed responses"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-destructive/60" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual: before/after */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <span className="text-sm font-medium text-muted-foreground">Without Nantano AI</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                  <div className="h-2.5 w-4/5 rounded bg-muted-foreground/10" />
                  <div className="h-2.5 w-3/4 rounded bg-muted-foreground/10" />
                  <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
                  <div className="h-2.5 w-2/3 rounded bg-muted-foreground/10" />
                </div>
                <p className="text-xs text-muted-foreground mt-3">Raw, unstructured, invisible</p>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/[0.02] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-sm font-medium">With Nantano AI</span>
                </div>
                <div className="space-y-2 font-mono text-xs text-foreground/70">
                  <div className="flex justify-between p-2 rounded bg-primary/5">
                    <span>process.order_fulfillment</span>
                    <span className="text-green-600">normal</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-destructive/5 border border-destructive/20">
                    <span>process.payment_reconciliation</span>
                    <span className="text-destructive">anomaly</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-primary/5">
                    <span>process.inventory_sync</span>
                    <span className="text-green-600">normal</span>
                  </div>
                </div>
                <p className="text-xs text-primary mt-3">Structured, monitored, actionable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — timeline */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Our Process
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Structure. Detect. Notify.
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: Layers,
                title: "Connect & Structure",
                description: "Plug in your data sources. Our AI automatically maps relationships, infers schemas, and builds a structured view of your processes.",
              },
              {
                step: "02",
                icon: Search,
                title: "Learn Patterns",
                description: "The system learns what normal looks like for your operations — baselines, rhythms, expected flows, and healthy ranges.",
              },
              {
                step: "03",
                icon: Activity,
                title: "Detect Anomalies",
                description: "When something deviates from the norm — a bottleneck, a data footprint that doesn't match, or a broken handoff — the AI flags it instantly.",
              },
              {
                step: "04",
                icon: Bell,
                title: "Notify in Real-Time",
                description: "Alerts arrive via WebSocket the moment an issue is detected. No batch delays, no email buried in noise. Your team knows immediately.",
              },
              {
                step: "05",
                icon: BarChart3,
                title: "Provide Context",
                description: "Every alert comes with full context — what happened, where in the process, what's affected, and suggested next steps.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative flex gap-8 pb-14 last:pb-0">
                {index < 4 && (
                  <div className="absolute left-[23px] top-14 bottom-0 w-px bg-border" />
                )}

                <div className="relative flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              AI Capabilities
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What our AI does differently
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-5xl mx-auto">
            {[
              {
                icon: Workflow,
                title: "Adaptive Learning",
                description: "The system continuously refines its understanding of your processes — catching subtler patterns over time.",
              },
              {
                icon: Brain,
                title: "Contextual Understanding",
                description: "Doesn't just flag numbers — understands what a deviation means in the context of your business operations.",
              },
              {
                icon: RefreshCw,
                title: "Self-Improving Models",
                description: "Every resolved alert teaches the system. False positives decrease, precision increases, automatically.",
              },
              {
                icon: Shield,
                title: "Noise Reduction",
                description: "Smart filtering ensures your team only sees what matters — not every fluctuation, only meaningful deviations.",
              },
              {
                icon: Zap,
                title: "Sub-Second Detection",
                description: "From data ingestion to alert delivery in under 2 seconds. Issues are surfaced before they cascade.",
              },
              {
                icon: Activity,
                title: "Cross-Process Correlation",
                description: "Identifies when an issue in one process is actually caused by — or affecting — another part of your operation.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            See it working on your data
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a demo and we&apos;ll show you what Nantano AI can detect in your
            processes — patterns you didn&apos;t know existed, issues you
            haven&apos;t caught yet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="mailto:contact@nantano.ai">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
