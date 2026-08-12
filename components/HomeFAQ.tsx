"use client";

import { FAQ } from "@/components/FAQ";
import { ArrowRight } from "lucide-react";

const homeFAQs = [
  {
    question: "How is Veloxiz different from ChatGPT or BI dashboards?",
    answer:
      "ChatGPT answers questions you already know to ask. Dashboards show metrics you already track. Veloxiz continuously scans market signals, customer evidence, and competitive moves to surface business gaps you haven't briefed yet - ranked by estimated impact.",
  },
  {
    question: "What kinds of gaps does Veloxiz find?",
    answer:
      "Revenue whitespace, underserved segments, pricing and packaging holes, churn-risk patterns, competitor openings, and operational drop-offs that block growth. Each brief includes the evidence trail and a suggested next move.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams connect their first sources and receive an initial opportunity brief within one business day. Pre-built connectors cover common CRMs, warehouses, and SaaS tools; custom sources plug in via API.",
  },
  {
    question: "Is our data safe?",
    answer:
      "Yes. Encryption in transit and at rest, role-based access, audit trails, and optional private-cloud or on-prem deployment for enterprise customers. We never train public models on your private data.",
  },
  {
    question: "What if a recommended gap is wrong?",
    answer:
      "Every brief is scored with confidence and evidence. You approve what becomes an initiative. Feedback on dismissals and wins sharpens future scoring for your ICP and strategy.",
  },
];

export function HomeFAQ() {
  return (
    <section className="py-20 sm:py-28">
      <div className="site-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              FAQ
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
              Questions
              <br />
              answered.
            </h2>
            <p className="mt-4 text-muted-foreground">Still curious?</p>
            <a
              href="mailto:contact@Veloxiz.ai"
              className="mt-4 btn-ink inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-white">
                <ArrowRight className="h-3 w-3" />
              </span>
              Chat with us
            </a>
            <p className="mt-6 text-sm text-muted-foreground">
              Email{" "}
              <a
                href="mailto:contact@Veloxiz.ai"
                className="text-foreground underline underline-offset-2"
              >
                contact@veloxiz.ai
              </a>
            </p>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={homeFAQs} />
          </div>
        </div>
      </div>
    </section>
  );
}
