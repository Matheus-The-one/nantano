"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="site-shell">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] min-h-[420px] sm:min-h-[480px] flex items-end">
          <Image
            src="/brand/cta-ui.png"
            alt="Veloxiz opportunity workspace"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
          <div className="absolute inset-0 grain" />

          <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              Meet your gap-finding partner.
              <br />
              Built for real markets.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed max-w-lg">
              Join teams that use Veloxiz to spot missed revenue and strategic blind
              spots every week. Set up in days. Cancel anytime. Your first brief is on us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signin"
                className="btn-ink inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                Get started free
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
