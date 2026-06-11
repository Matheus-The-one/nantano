"use client";

import {
  Activity,
  Bell,
  Layers,
  Search,
  Shield,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Data Structuring",
    description:
      "We take your raw, unstructured enterprise data and transform it into clean, organized structures that reveal what's actually happening in your operations.",
  },
  {
    icon: Search,
    title: "Pattern Detection",
    description:
      "Our AI continuously scans structured processes to find recurring patterns, bottlenecks, and inefficiencies that humans miss.",
  },
  {
    icon: Activity,
    title: "Anomaly Identification",
    description:
      "Detect deviations from expected behavior — whether it's a broken workflow, unusual data footprint, or process drift that needs immediate attention.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Get instant alerts via WebSockets when our AI detects issues. No polling, no delay — your team knows the moment something changes.",
  },
  {
    icon: Workflow,
    title: "Process Visualization",
    description:
      "See your entire operation as a living flow. Understand how processes connect, where they slow down, and what drives outcomes.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Your data stays yours. End-to-end encryption, role-based access, audit trails, and compliance-ready infrastructure from day one.",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Capabilities
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From raw data to real-time intelligence
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We structure your data, find what matters, and tell you about it
            before it becomes a problem.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="rounded-lg bg-primary/10 p-2.5">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
