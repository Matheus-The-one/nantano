"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Zap, Shield, Globe, Database, Rocket } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Developer-First",
    description:
      "Built by developers, for developers. Clean SDKs, typed responses, and docs that actually make sense.",
  },
  {
    icon: Zap,
    title: "Stupid Fast",
    description:
      "Sub-50ms responses, globally distributed. Your LLMs won't be waiting around for data.",
  },
  {
    icon: Shield,
    title: "Production-Ready",
    description:
      "Battle-tested infrastructure with encryption, rate limiting, and monitoring baked in from day one.",
  },
  {
    icon: Globe,
    title: "Scales With You",
    description:
      "From your first API call to your millionth. Auto-scaling infrastructure that grows as you grow.",
  },
  {
    icon: Database,
    title: "Real-World Data",
    description:
      "Structured, fresh data from real sources — products, recipes, movies, professionals, and more.",
  },
  {
    icon: Rocket,
    title: "Ship in Minutes",
    description:
      "One API key. Three lines of code. You're live. No onboarding calls, no sales demos.",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for what&apos;s next
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We obsess over the details so you can focus on building. Here&apos;s
            what makes Nantano different.
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
