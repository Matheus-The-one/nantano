"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-8">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1 text-sm">
              <Bot className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Agentic AI that optimizes your content for LLMs
              </span>
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">SEO for the</span>
              <span className="block text-primary">AI era</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-3xl mx-auto">
              Traditional SEO gets you found on Google. We get you found by ChatGPT, Claude, Gemini, and every LLM that matters. Our agentic AI continuously optimizes your domains and content for AI discovery.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto shadow-lg" asChild>
                <Link href="mailto:contact@nantano.studio">
                  Get Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="#how-it-works">
                  See How It Works
                </Link>
              </Button>
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Making brands discoverable by AI agents worldwide
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-60">
                <div className="text-lg sm:text-xl font-bold">LLM-First</div>
                <div className="text-lg sm:text-xl font-bold">Agentic AI</div>
                <div className="text-lg sm:text-xl font-bold">Auto-Optimizing</div>
                <div className="text-lg sm:text-xl font-bold">Always Running</div>
              </div>
            </div>
          </div>

          <div className="relative mt-16 hidden lg:block">
            <div className="absolute -top-8 left-1/4 transform -translate-x-1/2 rotate-6">
              <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-mono">
                    Agent optimizing 24/7
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 right-1/4 transform translate-x-1/2 -rotate-6">
              <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono">+340% LLM visibility</span>
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
