"use client";

import { FAQ } from "@/components/FAQ";
import { SectionHeader } from "@/components/SectionHeader";

const homeFAQs = [
  {
    question: "How long does it take to integrate Veloxiz?",
    answer:
      "Most teams are ingesting data and seeing their first process map within one business day. We provide pre-built connectors for the most common data sources and a REST API for custom integrations. Our onboarding team guides you through setup.",
  },
  {
    question: "Does Veloxiz work with our existing data stack?",
    answer:
      "Yes. Veloxiz connects to databases (PostgreSQL, MongoDB, MySQL), cloud storage (S3, GCS, Azure Blob), streaming platforms (Kafka, Kinesis), and SaaS tools via webhooks. If your tool isn't listed, we can build a custom integration.",
  },
  {
    question: "How does the AI detect anomalies without false positives?",
    answer:
      "Our AI first learns your baseline — what normal looks like for each of your processes across time, seasonality, and load patterns. Deviations are scored by severity and context before an alert is sent. Over time, feedback you provide further reduces noise.",
  },
  {
    question: "Can we deploy on our own infrastructure?",
    answer:
      "Yes. Enterprise customers can deploy Veloxiz entirely within their own infrastructure — on-premise or in a private cloud. This is available on our Enterprise plan and is fully supported with dedicated engineering assistance.",
  },
  {
    question: "What does 'real-time' actually mean?",
    answer:
      "Our detection-to-alert pipeline operates in under 2 seconds end-to-end. Alerts are delivered via persistent WebSocket connections, so your team sees issues the moment they are detected — not in a scheduled digest or daily report.",
  },
];

export function HomeFAQ() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div>
            <SectionHeader
              eyebrow="FAQ"
              title="Common questions"
              description="Still have a question? Email us at contact@veloxiz.ai"
              centered={false}
            />
          </div>
          <div className="lg:col-span-2">
            <FAQ items={homeFAQs} />
          </div>
        </div>
      </div>
    </section>
  );
}
