import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    industry:   "Finance",
    title:      "Catch reconciliation drift before it becomes fraud",
    stat:       "$40K+",
    statLabel:  "monthly loss prevented",
    href:       "/use-cases/finance",
  },
  {
    industry:   "Logistics",
    title:      "Catch delivery pipeline bottlenecks in real-time",
    stat:       "↓74%",
    statLabel:  "SLA breach reduction",
    href:       "/use-cases/logistics",
  },
  {
    industry:   "Healthcare",
    title:      "Surface EHR workflow anomalies before patient impact",
    stat:       "↓67%",
    statLabel:  "missed handoffs",
    href:       "/use-cases/healthcare",
  },
  {
    industry:   "E-Commerce",
    title:      "Monitor order fulfillment at scale, zero blind spots",
    stat:       "99.7%",
    statLabel:  "fulfillment accuracy",
    href:       "/use-cases/ecommerce",
  },
];

export function UseCasesPreview() {
  return (
    <section className="py-24 sm:py-32 bg-muted/15">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
        <SectionHeader
          eyebrow="Use Cases"
          title="Built for every enterprise operation"
          description="Process Intelligence adapts to your industry and your workflows."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc) => (
            <Link
              key={uc.href}
              href={uc.href}
              className="group block rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:border-foreground/20 hover:shadow-md transition-all"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {uc.industry}
              </p>
              <h3 className="text-sm font-semibold leading-snug mb-6 text-foreground/80 group-hover:text-foreground transition-colors">
                {uc.title}
              </h3>
              <div className="border-t border-border/40 pt-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold tabular-nums">{uc.stat}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{uc.statLabel}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/use-cases">
              View All Use Cases <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
