import { UseCaseDetail } from "../_components/UseCaseDetail";

export const metadata = {
  title: "E-Commerce - Use Cases - Veloxiz",
  description: "How e-commerce teams use Veloxiz to monitor order fulfillment at scale with zero blind spots.",
};

export default function EcommercePage() {
  return (
    <UseCaseDetail uc={{
      industry:    "E-Commerce",
      headline:    "Monitor order fulfillment at scale, zero blind spots",
      description: "High-volume e-commerce operations process thousands of orders per hour. Each order passes through inventory, payment, fulfillment, and shipping. A single broken step can cascade into mass customer dissatisfaction before dashboards show anything unusual.",
      problem:     "E-commerce platforms monitor aggregate metrics like GMV and order volume, but miss micro-failures in individual fulfillment steps until they've already affected hundreds of customers.",
      solution:    "Veloxiz monitors every step in the order processing pipeline, detects upstream anomalies before they affect customer-facing SLAs, and correlates events across inventory, payment, and shipping systems.",
      metrics: [
        { label: "Order fulfillment accuracy",    before: "96.2%",               after: "99.7%",    delta: "+3.5 pts"    },
        { label: "Time to detect failures",       before: "Hours (complaints)",  after: "Seconds",  delta: "AI-detected" },
        { label: "Customer complaint reduction",  before: "Baseline",            after: "↓41%",     delta: "in 60 days"  },
      ],
      outcomes: [
        "Real-time inventory sync anomaly detection",
        "Payment gateway failure pattern recognition",
        "Cross-system correlation: inventory ↔ fulfillment ↔ shipping",
        "Proactive alerts before customer-facing impact",
      ],
      quote: {
        text:    "Veloxiz detects inventory sync issues before a single order fails. We went from reactive to proactive in 3 weeks of deployment.",
        author:  "CTO",
        company: "D2C Fashion Brand",
      },
      next: { label: "Finance", href: "/use-cases/finance" },
    }} />
  );
}
