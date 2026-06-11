"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Cpu, Code2, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Identify Data Sources",
    description:
      "We find high-value, unstructured data on the web — movie databases, healthcare directories, product catalogs, financial datasets — places where structured access doesn't exist yet.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Process Mining",
    description:
      "Our AI agents reverse-engineer how data is organized, detect patterns, handle edge cases, and build extraction models that adapt as sources change.",
  },
  {
    step: "03",
    icon: Code2,
    title: "Build the API",
    description:
      "Extracted data is cleaned, normalized, and served through fast REST APIs with documentation, versioning, rate limiting, and monitoring baked in.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Ship & Scale",
    description:
      "APIs go live on RapidAPI with flexible pricing tiers. Developers subscribe, integrate in minutes, and we keep the data pipeline running 24/7.",
  },
];

export function CodeShowcase() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How we build API products
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From unstructured web data to production-ready APIs — our AI-driven
            pipeline does the work.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {steps.map((item, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm"
              >
                <CardHeader className="flex flex-row items-start space-x-4 space-y-0">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-primary mb-1">STEP {item.step}</p>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
