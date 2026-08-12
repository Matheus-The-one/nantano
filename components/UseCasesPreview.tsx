import Link from "next/link";
import { ArrowRight } from "lucide-react";

const useCases = [
  {
    industry: "Finance",
    title: "Spot product whitespace before competitors price into it",
    stat: "$40K+",
    statLabel: "monthly leakage found",
    href: "/use-cases/finance",
  },
  {
    industry: "Logistics",
    title: "Find corridor gaps where demand outpaces your coverage",
    stat: "↓74%",
    statLabel: "missed bid rate",
    href: "/use-cases/logistics",
  },
  {
    industry: "Healthcare",
    title: "Surface care-journey drop-offs that block growth",
    stat: "↓67%",
    statLabel: "missed handoffs",
    href: "/use-cases/healthcare",
  },
  {
    industry: "E-Commerce",
    title: "Map assortment & pricing gaps across your category",
    stat: "+22%",
    statLabel: "attach-rate lift",
    href: "/use-cases/ecommerce",
  },
];

export function UseCasesPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="site-shell">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Use cases
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
              Built for every growth motion
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Gap intelligence that adapts to your industry - and the questions your
              team already asks in standups.
            </p>
          </div>
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            View all use cases <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {useCases.map((uc) => (
            <Link
              key={uc.href}
              href={uc.href}
              className="group grid grid-cols-1 sm:grid-cols-[140px_1fr_auto] gap-3 sm:gap-8 items-center py-7 sm:py-8 transition-colors hover:bg-secondary/40 -mx-2 px-2 rounded-xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-warm">
                {uc.industry}
              </p>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {uc.title}
              </h3>
              <div className="flex items-center gap-6 sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="font-display text-2xl font-bold tabular-nums">{uc.stat}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{uc.statLabel}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
