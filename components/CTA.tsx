"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-12 shadow-lg border border-border/50">
            <div className="mx-auto w-fit rounded-full bg-primary/10 p-3 mb-6">
              <Code className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to power your LLMs?
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Join 100+ paying customers who trust our API integrations. 
              Start building the future of AI today.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="https://rapidapi.com/user/matepapava123" target="_blank" rel="noopener noreferrer">
                  Start on RapidAPI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <a href="mailto:contact@nantano.studio">Contact Us</a>
              </Button>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              Live on RapidAPI • 20K+ calls • 100+ customers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
