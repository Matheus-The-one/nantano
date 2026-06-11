"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu, Database, Workflow, Globe, Layers, Rocket } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Process Mining",
    description:
      "Our AI agents crawl, analyze, and understand complex data sources — extracting structured information from unstructured web pages at scale.",
  },
  {
    icon: Database,
    title: "Structured Data Extraction",
    description:
      "Raw web data is transformed into clean, normalized, and validated datasets ready for consumption through RESTful endpoints.",
  },
  {
    icon: Workflow,
    title: "Automated Pipelines",
    description:
      "End-to-end automation from discovery to delivery. Our pipelines run 24/7 keeping data fresh without manual intervention.",
  },
  {
    icon: Globe,
    title: "Production-Ready APIs",
    description:
      "Every dataset ships as a fast, documented API on RapidAPI. Subscribe, integrate, and build — no scraping infrastructure needed.",
  },
  {
    icon: Layers,
    title: "Multi-Domain Coverage",
    description:
      "Entertainment, healthcare, e-commerce, finance, food — we mine and serve structured data across industries.",
  },
  {
    icon: Rocket,
    title: "SaaS-Grade Reliability",
    description:
      "99.9% uptime, rate limiting, versioning, and real-time monitoring. Built for production workloads from day one.",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What we build
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We use AI to mine data from complex sources and turn it into
            developer-ready API products — the full pipeline, automated.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
