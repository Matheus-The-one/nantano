"use client";

import { AnimatedCounter } from "@/components/AnimatedCounter";

const stats = [
  {
    value: "500+",
    label: "Processes Monitored",
    description: "Across all customer environments",
  },
  {
    value: "12K+",
    label: "Patterns Detected Monthly",
    description: "Surfaced automatically, no manual review",
  },
  {
    value: "<2s",
    label: "Avg. Detection-to-Alert",
    description: "End-to-end, via WebSocket",
  },
  {
    value: "99.9%",
    label: "Platform Uptime",
    description: "SLA-backed, globally distributed",
  },
];

export function Stats() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            By the numbers
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for enterprise operations
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Real-time process intelligence at scale. Always on, always watching.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px lg:grid-cols-4 rounded-2xl overflow-hidden border border-border/60 bg-border/30 shadow-sm">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-card px-6 py-10 text-center"
            >
              <div className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground leading-snug max-w-[140px]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
