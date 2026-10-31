"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Github, MapPin, Clock, ArrowRight } from "lucide-react";
import { FAQ } from "@/components/FAQ";

const contactFAQs = [
  {
    question: "How quickly do you respond to demo requests?",
    answer: "We respond to all demo requests within one business day. For enterprise inquiries, we aim to schedule an initial call within 48 hours.",
  },
  {
    question: "Can I get a free trial before committing?",
    answer: "Yes. Our Starter plan is free forever with no credit card required. For Pro and Enterprise features, we offer a 14-day free trial on request.",
  },
  {
    question: "Do you offer custom implementations for enterprise?",
    answer: "Absolutely. Our Enterprise plan includes dedicated engineering support, custom integrations, and an onboarding team that will work with your stack directly.",
  },
  {
    question: "What time zones do you support?",
    answer: "Our support team covers EST, CET, and AEST time zones. Enterprise customers get a dedicated account manager who matches your timezone.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:contact@Veloxiz.ai?subject=Inquiry from ${form.name} (${form.company})&body=${encodeURIComponent(form.message)}`;
    setSent(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/8" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              Let&apos;s talk
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you&apos;re evaluating Veloxiz, need enterprise pricing, or
              just want to see it in action - we&apos;re happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                <p className="text-muted-foreground text-sm mb-8">
                  We&apos;ll get back to you within one business day.
                </p>

                {sent ? (
                  <div className="rounded-xl bg-primary/10 border border-primary/20 p-6 text-center">
                    <p className="font-semibold text-primary text-lg mb-2">Message sent!</p>
                    <p className="text-sm text-muted-foreground">
                      Your email client has opened with a pre-filled message. We&apos;ll reply shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                          Full name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                          Work email <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="company">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your use case or what you'd like to see in a demo..."
                        className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email us directly</h3>
                    <a href="mailto:contact@Veloxiz.ai" className="text-sm text-primary hover:underline">
                      contact@Veloxiz.ai
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">For sales, partnerships, and support</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3 flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Response time</h3>
                    <p className="text-sm text-muted-foreground">
                      Within 1 business day for general inquiries. Same-day for enterprise and urgent support.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Remote-first</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team is distributed globally. We serve customers in 12+ countries with local support coverage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3 flex-shrink-0">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Open source</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Explore our public repositories and client SDKs on GitHub.
                    </p>
                    <a
                      href="https://github.com/Matheus-The-one"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      github.com/Matheus-The-one →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">FAQ</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Common questions
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Don&apos;t see your question? Email us at{" "}
                <a href="mailto:contact@Veloxiz.ai" className="text-primary hover:underline">
                  contact@Veloxiz.ai
                </a>
              </p>
            </div>
            <div className="lg:col-span-2">
              <FAQ items={contactFAQs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
