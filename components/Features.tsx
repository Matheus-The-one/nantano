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
      "Clean, intuitive APIs designed for modern development workflows with comprehensive documentation.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Ultra-low latency responses with global CDN distribution and edge computing for optimal performance.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with SOC 2 compliance, end-to-end encryption, and advanced threat protection.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Built to handle millions of requests with auto-scaling infrastructure across multiple regions.",
  },
  {
    icon: Database,
    title: "Real-time Data",
    description:
      "Live data synchronization with WebSocket support and event-driven architecture.",
  },
  {
    icon: Rocket,
    title: "Rapid Integration",
    description:
      "Get up and running in minutes with SDKs for all major programming languages and frameworks.",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to build
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Powerful APIs that scale with your business. From MVP to enterprise,
            we provide the infrastructure you need to succeed.
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
