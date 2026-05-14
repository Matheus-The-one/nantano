"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-12 shadow-lg border border-border/50">
            <div className="mx-auto w-fit rounded-full bg-primary/10 p-3 mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to be found by AI?
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              The brands that optimize for LLMs now will dominate the next decade.
              Let our agentic AI put you ahead of everyone else.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="mailto:contact@nantano.studio">
                  Get Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <a href="mailto:contact@nantano.studio">Book a Demo</a>
              </Button>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              Limited spots — We onboard 5 new brands per month
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
