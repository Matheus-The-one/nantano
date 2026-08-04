import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Use Cases — Veloxiz",
  description:
    "See how Finance, Logistics, Healthcare, and E-Commerce enterprises use Veloxiz to detect process failures before they escalate.",
};

const industries = [
  {
    slug:        "finance",
    industry:    "Finance",
    headline:    "Catch reconciliation drift before it becomes fraud",
    description: "Monitor every step of payment and reconciliation pipelines. Get alerted in seconds — not weeks.",
    stats:       [{ value: "< 2 sec", label: "Time to detection" }, { value: "$40K+", label: "Monthly loss prevented" }, { value: "< 3%", label: "False positive rate" }],
  },
  {
    slug:        "logistics",
    industry:    "Logistics",
    headline:    "Catch delivery pipeline bottlenecks in real-time",
    description: "Map every handoff point from warehouse to last-mile. Spot latency anomalies before SLAs break.",
    stats:       [{ value: "< 5 min", label: "Incident response" }, { value: "↓74%", label: "SLA breach rate" }, { value: "73%", label: "Proactive resolutions" }],
  },
  {
    slug:        "healthcare",
    industry:    "Healthcare",
    headline:    "Surface EHR workflow anomalies before patient impact",
    description: "Monitor HL7/FHIR pipelines and care coordination workflows with near-zero error tolerance.",
    stats:       [{ value: "↓67%", label: "Missed handoffs" }, { value: "< 45 min", label: "Issue resolution" }, { value: "100%", label: "Audit trail coverage" }],
  },
  {
    slug:        "ecommerce",
    industry:    "E-Commerce",
    headline:    "Monitor order fulfillment at scale, zero blind spots",
    description: "Detect micro-failures across inventory, payment, and shipping before customers ever notice.",
    stats:       [{ value: "99.7%", label: "Fulfillment accuracy" }, { value: "↓41%", label: "Customer complaints" }, { value: "Seconds", label: "Failure detection" }],
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="py-24 sm:py-32 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Use Cases</p>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.08] mb-5">
              Process Intelligence<br />for every operation
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Enterprises across Finance, Logistics, Healthcare, and E-Commerce use
              Veloxiz to detect process failures before they escalate. Choose an
              industry below to see how.
            </p>
          </div>
        </div>
      </section>

      {/* Industry cards */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/use-cases/${ind.slug}`}
                className="group block rounded-2xl border border-border/60 bg-card p-8 shadow-sm hover:border-foreground/20 hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{ind.industry}</p>
                <h2 className="text-xl font-bold leading-snug mb-3 group-hover:text-foreground transition-colors">
                  {ind.headline}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">{ind.description}</p>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-border/40">
                  {ind.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-xl font-bold tabular-nums">{s.value}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                  Read the full case <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 border-t border-border/40">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-border/60 bg-card px-8 py-8">
            <div>
              <h2 className="text-xl font-bold mb-1">Don&apos;t see your industry?</h2>
              <p className="text-sm text-muted-foreground">Book a demo and we&apos;ll walk through your specific workflows.</p>
            </div>
            <a
              href="mailto:contact@Veloxiz.ai"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity shrink-0"
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
