"use client";

import { SectionHeader } from "@/components/SectionHeader";

const testimonials = [
  {
    quote:
      "Veloxiz caught a payment reconciliation anomaly that had been silently costing us $40K/month. We fixed it within hours of the first alert.",
    author: "Sarah Chen",
    title: "VP of Operations, FinServe Global",
    initials: "SC",
  },
  {
    quote:
      "The real-time WebSocket alerts are a game-changer. Our logistics team now responds to process drift in under 2 minutes instead of discovering it days later.",
    author: "Marcus Okafor",
    title: "CTO, ShipFast Logistics",
    initials: "MO",
  },
  {
    quote:
      "We integrated Veloxiz into our EHR data pipelines and immediately saw 3 process bottlenecks we didn't even know existed. Setup took one afternoon.",
    author: "Dr. Lena Hoffman",
    title: "Director of Digital Health, MediCore Systems",
    initials: "LH",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
        <SectionHeader
          eyebrow="Customer Stories"
          title="Trusted by operations teams worldwide"
          description="Enterprises use Veloxiz to surface issues before they become incidents."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card-hover flex flex-col rounded-2xl border border-border/60 bg-card p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="flex-1 text-base leading-relaxed text-foreground/80 italic mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
