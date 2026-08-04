"use client";

import { useState } from "react";
import { Github, Mail, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Product: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Pricing", href: "/pricing" },
    { name: "Book a Demo", href: "mailto:contact@Veloxiz.ai" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "GitHub", href: "https://github.com/Matheus-The-one" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/Matheus-The-one" },
  { name: "Twitter / X", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
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
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-screen-xl px-6 py-20 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="w-10 h-7 text-primary" />
              <div className="font-bold text-2xl">Veloxiz</div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              AI-powered Process Intelligence. We structure your enterprise data,
              detect patterns and anomalies, and deliver real-time alerts when
              something needs attention.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Get product updates</p>
              {submitted ? (
                <p className="text-sm text-primary font-medium">Thanks — you&apos;re on the list.</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    required
                  />
                  <Button type="submit" size="sm" className="flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>

            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  aria-label={link.name}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Veloxiz. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>AI-powered Process Intelligence, shipped globally</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
