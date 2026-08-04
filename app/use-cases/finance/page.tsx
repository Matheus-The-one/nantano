import { UseCaseDetail } from "../_components/UseCaseDetail";

export const metadata = {
  title: "Finance — Use Cases — Veloxiz",
  description: "How finance teams use Veloxiz to catch reconciliation drift and payment pipeline failures before they escalate.",
};

export default function FinancePage() {
  return (
    <UseCaseDetail uc={{
      industry:    "Finance",
      headline:    "Catch reconciliation drift before it becomes fraud",
      description: "Payment processing and reconciliation pipelines are among the most brittle in any enterprise. A mis-mapped account, an unexpected delay, or a shifted data schema can silently compound into millions in losses before anyone notices.",
      problem:     "Finance teams typically discover reconciliation failures days or weeks after the fact — buried in end-of-month reports. By the time the issue surfaces, the damage is already done.",
      solution:    "Veloxiz monitors every step of your payment and reconciliation pipelines, learns baseline latencies and event volumes, and fires a real-time alert the moment a deviation occurs — before it compounds.",
      metrics: [
        { label: "Average time to detection",  before: "8–14 days",            after: "< 2 seconds",      delta: "99.9% faster"   },
        { label: "False positive rate",        before: "High (manual review)",  after: "< 3%",             delta: "AI-filtered"    },
        { label: "Monthly loss prevention",    before: "$0 caught proactively", after: "$40K+ identified", delta: "per month"      },
      ],
      outcomes: [
        "Real-time monitoring of payment pipelines",
        "Anomaly detection on account mapping drift",
        "Instant alert when reconciliation logic fails",
        "Cross-process correlation across settlement systems",
      ],
      quote: {
        text:    "We found a payment reconciliation drift on a Tuesday morning. By noon it was resolved. Before Veloxiz, we'd have found it in the next audit cycle — weeks later.",
        author:  "VP of Operations",
        company: "Regional Bank",
      },
      next: { label: "Logistics", href: "/use-cases/logistics" },
    }} />
  );
}
