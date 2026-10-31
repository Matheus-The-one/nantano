import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface Metric  { label: string; before: string; after: string; delta: string }
interface UseCase {
  industry:    string;
  headline:    string;
  description: string;
  problem:     string;
  solution:    string;
  metrics:     Metric[];
  outcomes:    string[];
  quote:       { text: string; author: string; company: string };
  next?:       { label: string; href: string };
}

export function UseCaseDetail({ uc }: { uc: UseCase }) {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Top breadcrumb bar ── */}
      <div className="border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6 h-12 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/use-cases" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Use Cases
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">{uc.industry}</span>
        </div>
      </div>

      {/* ── Page hero ── */}
      <section className="py-16 sm:py-24 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{uc.industry}</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.08] mb-5">{uc.headline}</h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">{uc.description}</p>
          </div>
        </div>
      </section>

      {/* ── Problem / Solution ── */}
      <section className="py-16 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
            <div className="bg-background p-8">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">The Problem</p>
              <p className="text-base leading-relaxed text-foreground/80">{uc.problem}</p>
            </div>
            <div className="bg-muted/20 p-8">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">The Solution</p>
              <p className="text-base leading-relaxed text-foreground/80">{uc.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="py-16 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">Before vs. After</h2>
          <div className="divide-y divide-border/40 border border-border/40 rounded-2xl overflow-hidden">
            {uc.metrics.map((m) => (
              <div key={m.label} className="grid grid-cols-[1fr_160px_160px_120px] items-center px-8 py-5 bg-background hover:bg-muted/10 transition-colors">
                <p className="text-sm font-medium text-foreground/70">{m.label}</p>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1">Before</p>
                  <p className="text-base font-semibold text-foreground/50 tabular-nums">{m.before}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1">After</p>
                  <p className="text-base font-bold text-foreground tabular-nums">{m.after}</p>
                </div>
                <div>
                  <span className="inline-block rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-semibold text-foreground/60">
                    {m.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes + Quote ── */}
      <section className="py-16 border-b border-border/40">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Outcomes */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-7">What you get</h2>
              <ul className="space-y-4">
                {uc.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-foreground/40 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80 leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote */}
            <div className="rounded-2xl border border-border/60 bg-card p-8">
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className="h-4 w-4 text-foreground/30" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-base leading-relaxed text-foreground/75 mb-6">
                &ldquo;{uc.quote.text}&rdquo;
              </blockquote>
              <div className="border-t border-border/40 pt-4">
                <p className="text-sm font-semibold">{uc.quote.author}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{uc.quote.company}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-border/60 bg-card px-8 py-7">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">{uc.industry}</p>
              <h3 className="text-xl font-bold">Ready to see it in your stack?</h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:contact@Veloxiz.ai"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </a>
              {uc.next && (
                <Link
                  href={uc.next.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Next: {uc.next.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
