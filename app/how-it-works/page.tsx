import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PipelineFlow } from "@/components/PipelineFlow";

export const metadata = {
  title: "How It Works - Veloxiz",
  description:
    "See how Veloxiz connects your market and customer data, scores business gaps with AI, and delivers ranked opportunity briefs your team can act on.",
  keywords:
    "business gap analysis, opportunity discovery, ai market intelligence, how veloxiz works",
};

const steps = [
  {
    step: "01",
    title: "Connect your evidence",
    description:
      "Plug in CRM, product analytics, support tickets, pricing sheets, and public market sources. Veloxiz maps what you already track into one intelligence layer.",
  },
  {
    step: "02",
    title: "Learn your strategy",
    description:
      "Tell Veloxiz your ICP, constraints, and past bets. It remembers - so every brief stays on-strategy instead of surfacing random market trivia.",
  },
  {
    step: "03",
    title: "Score the gaps",
    description:
      "AI cross-checks win/loss notes, competitor moves, demand signals, and funnel drop-offs - then ranks whitespace by estimated revenue impact.",
  },
  {
    step: "04",
    title: "Get the brief",
    description:
      "Each opportunity arrives with evidence, confidence, and a suggested next move. Approve what becomes an initiative; dismissals teach the model.",
  },
  {
    step: "05",
    title: "Keep watching",
    description:
      "Markets move. Veloxiz keeps scoring - so this week's open gap and next month's competitor opening both show up before the standup does.",
  },
];

const capabilities = [
  {
    title: "Natural language briefs",
    body: 'Ask like a strategist - "where are we losing mid-market deals?" or "what adjacent niches look open this quarter."',
  },
  {
    title: "Multi-source gap scoring",
    body: "Market chatter, CRM outcomes, and product usage scored together - not another siloed dashboard.",
  },
  {
    title: "Human-in-the-loop control",
    body: "Veloxiz proposes. Your team decides. Feedback sharpens the next round of briefs.",
  },
  {
    title: "Persistent company memory",
    body: "ICP, pricing rules, and past bets stick - so you never re-explain the strategy.",
  },
  {
    title: "Impact-ranked lists",
    body: "Every gap carries estimated ARR or leakage, so priorities are obvious.",
  },
  {
    title: "Evidence trails",
    body: "Click into the signals behind a recommendation - no black-box strategy theater.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-8 sm:pt-10 pb-16 sm:pb-20 overflow-hidden">
        <div className="site-shell">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] min-h-[420px] sm:min-h-[520px] flex items-end">
            <Image
              src="/brand/hero-ui.png"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
            <div className="absolute inset-0 grain" />

            <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                How it works
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                From raw signals
                <br />
                to ranked gaps
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
                Veloxiz turns market noise and customer evidence into opportunity
                briefs - so your team finds the whitespace before competitors do.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:contact@Veloxiz.ai"
                  className="btn-ink inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  Book a demo
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="pb-20 sm:pb-28">
        <div className="site-shell">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                System flow
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
                How data becomes an opportunity map
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Interactive view of the intelligence pipeline - from sources to a
              brief your team can act on.
            </p>
          </div>
          <PipelineFlow />
        </div>
      </section>

      {/* Problem */}
      <section className="pb-20 sm:pb-28">
        <div className="site-shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                The problem
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-5">
                Growth teams drown in data and still miss the gap
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                Dashboards show what already happened. Chat tools answer questions
                you already know to ask. The expensive misses - underserved segments,
                packaging holes, competitor openings - stay invisible.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Veloxiz is built to surface those gaps continuously, ranked by
                impact, with the evidence attached.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Blind competitive whitespace",
                  "Silent churn patterns",
                  "Underserved segments",
                  "Late strategy pivots",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="h-2 w-2 rounded-full bg-warm" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-warm">
                    Without Veloxiz
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="h-2.5 w-full rounded-full bg-muted" />
                  <div className="h-2.5 w-4/5 rounded-full bg-muted" />
                  <div className="h-2.5 w-3/4 rounded-full bg-muted" />
                  <div className="h-2.5 w-full rounded-full bg-muted" />
                  <div className="h-2.5 w-2/3 rounded-full bg-muted" />
                </div>
                <p className="text-xs text-muted-foreground mt-5">
                  Scattered metrics. No ranked opportunities.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-primary/25 bg-accent/40 p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    With Veloxiz
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between gap-3 p-2.5 rounded-xl bg-background/80">
                    <span className="truncate">mid_market.onboarding_gap</span>
                    <span className="text-primary font-semibold shrink-0">$1.2M</span>
                  </div>
                  <div className="flex justify-between gap-3 p-2.5 rounded-xl bg-background/80 border border-primary/20">
                    <span className="truncate">apac.competitor_whitespace</span>
                    <span className="text-primary font-semibold shrink-0">High</span>
                  </div>
                  <div className="flex justify-between gap-3 p-2.5 rounded-xl bg-background/80">
                    <span className="truncate">pricing.attach_rate_leak</span>
                    <span className="text-foreground font-semibold shrink-0">Watch</span>
                  </div>
                </div>
                <p className="text-xs text-primary mt-5 font-medium">
                  Structured, ranked, actionable
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps - vertical timeline, not tiny cards */}
      <section className="pb-20 sm:pb-28">
        <div className="site-shell">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              The path
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
              Five steps from connect to clarity
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From the first source you connect to the weekly brief your team
              actually uses - here&apos;s the full loop.
            </p>
          </div>

          <div className="relative max-w-3xl">
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border hidden sm:block" />
            <div className="space-y-0">
              {steps.map((item) => (
                <div key={item.step} className="relative flex gap-5 sm:gap-8 pb-10 last:pb-0">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background text-xs font-bold text-primary">
                    {item.step}
                  </div>
                  <div className="pt-1.5 pb-2">
                    <h3 className="font-display text-xl font-semibold tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-20 sm:pb-28">
        <div className="site-shell">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] surface-panel grain">
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="max-w-2xl mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  What you get
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
                  Built for how strategists actually work
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Not another dashboard dump - briefs your team can run with.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                {capabilities.map((item) => (
                  <div key={item.title}>
                    <div className="mb-3 h-px w-10 bg-primary" />
                    <h4 className="font-display text-lg font-semibold tracking-tight mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="site-shell">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] min-h-[360px] sm:min-h-[420px] flex items-end">
            <Image
              src="/brand/cta-ui.png"
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
            <div className="absolute inset-0 grain" />

            <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16 max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.08]">
                See the gaps in your market
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/75 leading-relaxed">
                Book a demo and we&apos;ll walk through an opportunity brief on a
                market that looks like yours - ranked gaps, evidence, next moves.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:contact@Veloxiz.ai"
                  className="btn-ink inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  Book a demo
                </a>
                <Link
                  href="/use-cases"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors"
                >
                  Browse use cases
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
