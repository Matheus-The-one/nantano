"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-12 border border-border/50">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to see what your data is hiding?
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Book a demo and we&apos;ll show you how Nantano AI structures your
              processes, detects issues, and delivers real-time alerts your team
              can act on immediately.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="mailto:contact@nantano.ai">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/process-mining">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
