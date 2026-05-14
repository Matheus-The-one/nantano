"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Search, Globe, Brain, RefreshCw, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    description:
      "Our agents crawl, analyze, and restructure your content around the clock — no manual intervention needed.",
  },
  {
    icon: Search,
    title: "LLM Discovery Optimization",
    description:
      "We optimize how ChatGPT, Claude, Perplexity, and other AI models find, understand, and recommend your brand.",
  },
  {
    icon: Brain,
    title: "Semantic Structuring",
    description:
      "Automatically restructure your content with schema, metadata, and semantic signals that LLMs prioritize.",
  },
  {
    icon: Globe,
    title: "Domain Authority for AI",
    description:
      "Build domain-level trust signals that make LLMs consistently reference and recommend your brand.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Optimization",
    description:
      "LLM ranking factors change weekly. Our agents adapt in real-time so you never fall behind.",
  },
  {
    icon: BarChart3,
    title: "AI Visibility Analytics",
    description:
      "Track exactly how often LLMs cite your brand, what queries trigger mentions, and where you rank vs. competitors.",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What our AI agents do for you
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Think of us as your always-on SEO team — but for the AI landscape.
            We make sure LLMs know who you are and recommend you.
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
