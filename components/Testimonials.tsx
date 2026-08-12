"use client";

import Image from "next/image";

const testimonials = [
  {
    quote:
      "Veloxiz found a mid-market packaging gap our sales team had argued about for a year. We shipped the offer in six weeks - it became our fastest-growing SKU.",
    author: "James R.",
    title: "CEO, CloudPlex",
    image: "/brand/texture-warm.jpg",
  },
  {
    quote:
      "I was skeptical of 'AI strategy' tools - then Veloxiz flagged a competitor whitespace in APAC we had completely ignored. Pipeline from that one brief paid for the year.",
    author: "Sophie K.",
    title: "VP Marketing, Tytotone",
    image: "/brand/texture-warm.jpg",
  },
  {
    quote:
      "The win/loss + market signal combo is unfair. We finally see where deals die for reasons nobody put in the CRM - and what to fix first.",
    author: "Daniel M.",
    title: "Head of Sales, Bloopglow",
    image: "/brand/texture-warm.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="site-shell">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            What people say
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
            Teams that find gaps
            <br />
            <span className="text-muted-foreground">with Veloxiz, not around it</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            From solo founders to enterprise strategy teams - here&apos;s what happens
            after Veloxiz becomes the weekly opportunity brief.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {testimonials.map((t) => (
            <article
              key={t.author}
              className="relative min-w-[85%] sm:min-w-0 snap-center overflow-hidden rounded-[1.75rem] min-h-[420px] flex flex-col justify-end"
            >
              <Image
                src={t.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 85vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
              <div className="relative z-10 p-7 sm:p-8">
                <p className="text-[15px] sm:text-base leading-relaxed text-white/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-5 border-t border-white/15">
                  <p className="font-display font-semibold text-white">{t.author}</p>
                  <p className="text-sm text-white/60 mt-0.5">{t.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
