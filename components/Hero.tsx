"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Announcement badge */}
          <div className="mx-auto max-w-4xl text-center mb-8">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1 text-sm">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                🚀 Currently in full development mode • APIs live on RapidAPI
              </span>
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Premium Domains &amp;
              <span className="block text-primary">APIs for LLMs</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-3xl mx-auto">
              Access premium domains and cutting-edge APIs tailored for Large Language Models. 
              Power the future of AI with scalable, robust infrastructure trusted by innovators.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto shadow-lg" asChild>
                <Link
                  href="https://rapidapi.com/user/matepapava123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore on RapidAPI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Live on RapidAPI • Trusted by 100+ paying customers
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-60">
                <div className="text-lg sm:text-xl font-bold">
                  20K+ API Calls
                </div>
                <div className="text-lg sm:text-xl font-bold">
                  100+ Customers
                </div>
                <div className="text-lg sm:text-xl font-bold">RapidAPI Hub</div>
                <div className="text-lg sm:text-xl font-bold">
                  Live Production
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards for visual interest */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute -top-8 left-1/4 transform -translate-x-1/2 rotate-6">
              <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-mono">
                    APIs Live on RapidAPI
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 right-1/4 transform translate-x-1/2 -rotate-6">
              <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono">100+ Customers</span>
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
