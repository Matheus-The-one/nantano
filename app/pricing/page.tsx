import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing — Nantano AI",
  description:
    "Simple, transparent pricing for AI-powered process intelligence. Choose the plan that fits your team.",
};

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For teams exploring process intelligence",
    features: [
      "Up to 3 process streams",
      "Basic pattern detection",
      "Daily digest notifications",
      "7-day data retention",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing teams with active operations",
    features: [
      "Unlimited process streams",
      "Advanced AI pattern detection",
      "Real-time WebSocket alerts",
      "90-day data retention",
      "Priority support",
      "Custom alert rules",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with complex needs",
    features: [
      "Everything in Pro",
      "Unlimited data retention",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "On-premise deployment option",
      "SSO & advanced security",
      "Custom AI model training",
    ],
    cta: "Book a Demo",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Start free. Scale as your process intelligence needs grow.
              No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-primary bg-primary/[0.02] shadow-lg shadow-primary/5"
                    : "border-border/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <a href="mailto:contact@nantano.ai">
                    {plan.cta}
                    {plan.highlighted && <ArrowRight className="ml-2 h-4 w-4" />}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Demo CTA */}
      <section className="py-20 bg-muted/20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Not sure which plan fits?
          </h2>
          <p className="text-muted-foreground mb-8">
            Book a demo and we&apos;ll walk you through how Nantano AI can help
            your team find process issues before they escalate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="mailto:contact@nantano.ai">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/process-mining">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
