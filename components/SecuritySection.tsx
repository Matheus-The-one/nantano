"use client";

import { Lock, Key, Server, Eye } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const pillars = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data in transit and at rest is encrypted using AES-256. Your process data never leaves your control.",
  },
  {
    icon: Key,
    title: "Role-Based Access",
    description: "Fine-grained permission controls so each team member sees only what they need - with full audit trails on every action.",
  },
  {
    icon: Eye,
    title: "Full Audit Trails",
    description: "Every alert, acknowledgement, and configuration change is logged. Complete operational history on all plans.",
  },
  {
    icon: Server,
    title: "On-Premise Option",
    description: "Deploy within your own infrastructure for air-gapped or highly regulated environments. Full feature parity guaranteed.",
  },
];

export function SecuritySection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/20">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
        <SectionHeader
          eyebrow="Security"
          title="Enterprise security, built in from day one"
          description="We designed Veloxiz for organizations where data handling is non-negotiable."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="card-hover rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <pillar.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/[0.03] p-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            All customer data is processed within dedicated, isolated environments.{" "}
            <span className="text-foreground">No multi-tenant data mixing.</span>{" "}
            Role-based access control and full audit trails are included on all plans.
          </p>
        </div>
      </div>
    </section>
  );
}
