"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const gapPlan = [
  { label: "Mapped competitor whitespace", done: true },
  { label: "Flagged churn-risk segment", done: true },
  { label: "Scored unmet demand signals", done: true },
  { label: "Drafting go-to-market brief", done: false },
];

const logos = ["Northline", "HelixOps", "Parcelio", "Medora", "Ledgerly"];

export function Hero() {
  const [visibleSteps, setVisibleSteps] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setVisibleSteps((n) => (n >= gapPlan.length ? 1 : n + 1));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden pb-8 pt-4 sm:pt-5">
      <div className="site-shell">
        {/* Full-bleed cinematic hero - Parley composition */}
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] min-h-[640px] sm:min-h-[700px] flex flex-col justify-end">
          <Image
            src="/brand/hero-ui.png"
            alt="Veloxiz market landscape"
            fill
            priority
            className="object-cover object-center scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />
          <div className="absolute inset-0 grain" />

          {/* Floating gap-plan card */}
          <div className="absolute right-5 top-8 sm:right-10 sm:top-12 z-10 hidden md:block animate-float">
            <div className="w-[250px] rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[10px] font-semibold tracking-[0.18em] text-warm uppercase">
                  Veloxiz plan
                </span>
              </div>
              <div className="h-px border-t border-dashed border-border mb-3" />
              <ul className="space-y-2.5">
                {gapPlan.map((step, i) => {
                  const active = i < visibleSteps;
                  return (
                    <li key={step.label} className="flex items-center gap-2.5">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                          active
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-transparent text-transparent"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span
                        className={`text-[13px] font-medium transition-colors ${
                          active ? "text-[#251f19]" : "text-[#948b81]"
                        }`}
                      >
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative z-10 px-6 pb-8 pt-24 sm:px-12 sm:pb-10 sm:pt-28 text-center">
            <p className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
              Veloxiz
            </p>
            <h1 className="font-display text-[2.2rem] leading-[1.06] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] max-w-3xl mx-auto">
              Find the gaps{" "}
              <em className="italic font-medium text-primary">your business</em>{" "}
              can&apos;t see
            </h1>
            <p className="mt-3.5 mx-auto max-w-lg text-[15px] sm:text-base leading-relaxed text-white/80">
              AI that surfaces missed revenue, unmet demand, and strategic blind spots.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signin"
                className="btn-ink inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold shadow-lg shadow-black/25 transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                Get started free
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-12 sm:mt-14 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by 200+ growth and strategy teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((name) => (
              <span
                key={name}
                className="font-display text-lg sm:text-xl font-semibold tracking-tight text-foreground/25"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
