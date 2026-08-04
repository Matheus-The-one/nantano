"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 sm:p-16 shadow-2xl shadow-primary/20">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 mb-8">
              <Calendar className="mr-2 h-3.5 w-3.5" />
              30-minute live demo, tailored to your stack
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to see what your data is hiding?
            </h2>

            <p className="mt-6 text-xl leading-8 text-white/75 max-w-2xl mx-auto">
              Book a demo and we&apos;ll show you how Veloxiz structures your
              processes, detects issues, and delivers real-time alerts your team
              can act on immediately.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-lg h-13 px-8 text-base font-semibold"
                asChild
              >
                <a href="mailto:contact@Veloxiz.ai">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/20 h-13 px-8 text-base"
                asChild
              >
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-white/50">
              No credit card required. Enterprise setup available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
