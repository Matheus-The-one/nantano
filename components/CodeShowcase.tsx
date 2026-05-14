"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Bot, BarChart3, Repeat } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Audit Your AI Presence",
    description:
      "We test how ChatGPT, Claude, Gemini, and Perplexity currently perceive your brand. Where are you mentioned? Where are you missing? What do they get wrong?",
  },
  {
    step: "02",
    icon: Bot,
    title: "Deploy AI Agents",
    description:
      "Our agentic system restructures your content, metadata, and domain signals based on what LLMs actually prioritize when generating answers.",
  },
  {
    step: "03",
    icon: Repeat,
    title: "Continuous Optimization",
    description:
      "Agents run 24/7. They monitor LLM outputs, track ranking changes, test new structures, and adapt as AI models evolve. You never fall behind.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Measure & Report",
    description:
      "See exactly how your AI visibility grows week over week. Track citations, recommendations, and competitive positioning across all major LLMs.",
  },
];

export function CodeShowcase() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From zero AI presence to being recommended by every major LLM.
            Here&apos;s our process.
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
