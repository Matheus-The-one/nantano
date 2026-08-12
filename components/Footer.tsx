"use client";

import { useState } from "react";
import { Github, Mail, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const footerLinks = {
  Product: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/Matheus-The-one" },
  { name: "Email", icon: Mail, href: "mailto:contact@Veloxiz.ai" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0c0a08] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,141,22,0.08),transparent_55%)]" />

      <div className="relative site-shell py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div className="flex items-center space-x-2.5 mb-4">
              <Logo className="w-9 h-6 text-primary" />
              <div className="font-display font-bold text-2xl tracking-tight">Veloxiz</div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              AI that finds business gaps - missed revenue, unmet demand, and
              strategic blind spots.
            </p>

            <div className="mb-6 max-w-sm">
              <p className="text-sm font-semibold mb-3 text-white/90">Get product updates</p>
              {submitted ? (
                <p className="text-sm text-primary font-medium">Thanks - you&apos;re on the list.</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 min-w-0 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                  <button
                    type="submit"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-[#14110e] hover:bg-primary/90 transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 hover:text-white hover:border-primary/50 transition-colors"
                  aria-label={link.name}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="font-semibold text-white/90 mb-4 text-xs uppercase tracking-[0.18em]">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:contact@Veloxiz.ai"
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  Book a Demo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Veloxiz. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            AI-powered business gap intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
