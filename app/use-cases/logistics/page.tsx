import { UseCaseDetail } from "../_components/UseCaseDetail";

export const metadata = {
  title: "Logistics — Use Cases — Veloxiz",
  description: "How logistics teams use Veloxiz to catch delivery pipeline bottlenecks and missed handoffs in real-time.",
};

export default function LogisticsPage() {
  return (
    <UseCaseDetail uc={{
      industry:    "Logistics",
      headline:    "Catch delivery pipeline bottlenecks in real-time",
      description: "Logistics operations span hundreds of handoff points — from warehouse dispatch to last-mile delivery. Each handoff is a potential failure. Without process intelligence, bottlenecks accumulate silently until SLAs are breached.",
      problem:     "Logistics teams rely on delayed status updates and manual exception management. By the time an alert fires, the shipment is already late and the SLA is already breached.",
      solution:    "Veloxiz maps the full delivery pipeline and watches for latency anomalies, missed handoffs, and unusual routing patterns across every carrier and depot — flagging issues 30–40 minutes before they breach SLA.",
      metrics: [
        { label: "Incident response time",  before: "2–6 hours",         after: "< 5 minutes",               delta: "72× faster"     },
        { label: "SLA breach rate",         before: "12% of shipments",  after: "3.1% of shipments",         delta: "↓74% reduction" },
        { label: "Proactive resolutions",   before: "0%",                after: "73% of incidents caught",   delta: "before breach"  },
      ],
      outcomes: [
        "Full pipeline visibility across all carriers",
        "Latency anomaly detection per depot",
        "Missed handoff alerts in under 2 seconds",
        "Adaptive baseline learning per route and season",
      ],
      quote: {
        text:    "We went from firefighting to proactive rerouting. Veloxiz sees the bottleneck forming 40 minutes before it would break the SLA.",
        author:  "Head of Last-Mile Operations",
        company: "ShipFast Logistics",
      },
      next: { label: "Healthcare", href: "/use-cases/healthcare" },
    }} />
  );
}
