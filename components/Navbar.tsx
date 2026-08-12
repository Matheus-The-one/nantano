"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const navLinks = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Use Cases", href: "/use-cases" },
  { name: "Docs", href: "/docs" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Full-width sticky bar - no floating pill */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="site-shell">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="flex-shrink-0 font-display font-bold text-lg tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2.5"
              onClick={() => setOpen(false)}
            >
              <Logo className="w-8 h-6 text-primary" />
              <span>Veloxiz</span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href="mailto:contact@Veloxiz.ai"
              className="hidden md:inline-flex btn-ink items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-white">
                <ArrowRight className="h-3 w-3" />
              </span>
              Book a demo
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground hover:bg-secondary transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden border-t border-border/60 bg-background">
            <div className="site-shell py-4 pb-6">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-foreground/90 hover:bg-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <a
                href="mailto:contact@Veloxiz.ai"
                onClick={() => setOpen(false)}
                className="btn-ink mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary text-white">
                  <ArrowRight className="h-3 w-3" />
                </span>
                Book a demo
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
