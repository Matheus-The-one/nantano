"use client";

import { Github, Mail } from "lucide-react";

const footerLinks = {
  "API Services": [
    { name: "All Services", href: "/services" },
    { name: "Nike API", href: "/services/nike-api" },
    { name: "Cookpad API", href: "/services/cookpad-api" },
    { name: "Doctors API", href: "/services/doctors-api" },
    { name: "Investors Leads API", href: "/services/investors-leads-api" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "mailto:contact@nantano.studio" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/Matheus-The-one" },
  { name: "Email", icon: Mail, href: "mailto:contact@nantano.studio" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <svg viewBox="0 0 36 36" className="w-9 h-9 text-primary" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <polygon points="18 3 31 10.5 31 25.5 18 33 5 25.5 5 10.5" />
                <path d="M11 12V24" />
                <path d="M25 12V24" />
                <path d="M11 12L25 24" />
              </svg>
              <div className="font-bold text-2xl">Nantano Studio</div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
             APIs built specifically for Large Language Models.
              We provide the infrastructure and data access you need to build
              next-generation AI applications.
            </p>

            {/* Social links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
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
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Nantano Studio. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Built with ❤️ for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
