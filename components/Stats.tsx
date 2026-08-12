"use client";

import { AnimatedCounter } from "@/components/AnimatedCounter";

const stats = [
  {
    value: "2.4K+",
    label: "Gaps surfaced",
    description: "Across customer markets last quarter",
  },
  {
    value: "18M+",
    label: "Opportunity value mapped",
    description: "Ranked by estimated revenue impact ($)",
  },
  {
    value: "<1d",
    label: "Time to first brief",
    description: "From connect to actionable gaps",
  },
  {
    value: "94%",
    label: "Briefs acted on",
    description: "Teams that pursue at least one gap",
  },
];

export function Stats() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="site-shell">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 border-y border-border/80 py-12 sm:py-14">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground leading-snug max-w-[180px] mx-auto sm:mx-0">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
