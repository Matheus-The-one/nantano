"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const pillars = [
  {
    eyebrow: "01",
    title: "Always market-aware",
    body: "Veloxiz watches competitors, pricing shifts, reviews, and demand signals continuously - so you never brief the same gap twice.",
    image: "/brand/panel-ui.png",
    alt: "Market awareness preview",
  },
  {
    eyebrow: "02",
    title: "Surfaces real opportunities",
    body: "Beyond dashboards. Veloxiz ranks whitespace by revenue impact - which segments are underserved, which offers are leaking, and where to move next.",
    image: "/brand/hero-ui.png",
    alt: "Opportunity ranking preview",
  },
  {
    eyebrow: "03",
    title: "Connects your evidence",
    body: "CRM, product analytics, support tickets, and public market data - one intelligence layer. One conversation updates the full opportunity map.",
    image: "/brand/integrations-ui.png",
    alt: "Connected data sources",
  },
  {
    eyebrow: "04",
    title: "Gets sharper over time",
    body: "Feedback on which gaps you pursue teaches Veloxiz your strategy. Today's deep dive becomes tomorrow's one-line brief.",
    image: "/brand/cta-ui.png",
    alt: "Learning system preview",
  },
];

const capabilities = [
  {
    title: "Natural language briefs",
    body: 'Ask like a strategist - "where are we losing mid-market SaaS deals?" or "what adjacent niches look open this quarter."',
  },
  {
    title: "Multi-source gap scoring",
    body: "Cross-checks market chatter, win/loss notes, funnel drop-offs, and competitor moves into a single ranked list.",
  },
  {
    title: "Human-in-the-loop control",
    body: "Approve which opportunities become initiatives. Veloxiz proposes; your team decides.",
  },
  {
    title: "Persistent company memory",
    body: "Remembers your ICP, constraints, and past bets - so every brief stays on-strategy.",
  },
];

export function Features() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % pillars.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Why Veloxiz */}
      <section className="py-20 sm:py-28">
        <div className="site-shell">
          <div className="max-w-4xl mb-14 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Why Veloxiz
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
              A real intelligence partner,
              <br className="hidden sm:block" />
              <span className="text-muted-foreground"> not another dashboard</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Most AI tools summarize what you already know. Veloxiz finds what
              you&apos;re missing - the gaps between customers, competitors, and your
              current roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-5 relative overflow-hidden rounded-[2rem] surface-panel grain min-h-[420px] sm:min-h-[520px]">
              <Image
                src={pillars[active].image}
                alt={pillars[active].alt}
                fill
                className="object-cover transition-opacity duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-xl">
                <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-primary mb-1">
                  Live insight
                </p>
                <p className="text-sm font-semibold text-[#251f19]">
                  {pillars[active].title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {pillars[active].body.slice(0, 90)}…
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center gap-2">
              {pillars.map((p, i) => (
                <button
                  key={p.eyebrow}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`text-left rounded-2xl px-5 py-5 transition-all duration-300 ${
                    active === i
                      ? "bg-[#0c0a08] text-white shadow-lg shadow-black/30 ring-1 ring-white/10"
                      : "hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-xs font-semibold tracking-widest mt-1 ${
                        active === i ? "text-primary" : "text-warm"
                      }`}
                    >
                      {p.eyebrow}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <p
                        className={`mt-1.5 text-sm leading-relaxed ${
                          active === i ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        {p.body}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent discovery */}
      <section className="pb-20 sm:pb-28">
        <div className="site-shell">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] surface-panel grain">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  Intelligent discovery
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
                  Tell Veloxiz once.
                  <br />
                  It maps the rest.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                  Describe a market question in plain language. Veloxiz breaks it into
                  signals, scores the gaps, and keeps you updated as the landscape moves.
                </p>

                <div className="mt-10 space-y-6">
                  {capabilities.map((c, i) => (
                    <div key={c.title} className="flex gap-4">
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-[15px]">{c.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[360px] lg:min-h-full p-6 sm:p-10 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <Image
                    src="/brand/panel-ui.png"
                    alt="Veloxiz opportunity brief"
                    width={772}
                    height={492}
                    className="w-full rounded-2xl shadow-[0_30px_80px_rgba(37,31,25,0.18)]"
                  />
                  <div className="absolute -left-3 bottom-6 sm:-left-6 rounded-2xl bg-white p-4 shadow-xl w-[200px] animate-float">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-warm mb-2">
                      Top gap this week
                    </p>
                    <p className="text-sm font-semibold text-[#251f19] leading-snug">
                      Mid-market onboarding friction vs. 3 competitors
                    </p>
                    <p className="mt-2 text-xs text-primary font-semibold">
                      Est. impact · $1.2M ARR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
