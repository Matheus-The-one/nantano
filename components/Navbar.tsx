"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, BookOpen, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Use Cases",    href: "/use-cases"    },
  { name: "Docs",         href: "/docs"         },
  { name: "Pricing",      href: "/pricing"      },
];

export function Navbar() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-1 mt-8">
              <Link href="/" className="rounded-lg px-3 py-2.5 text-base font-semibold hover:bg-muted transition-colors">
                Home
              </Link>
              <div className="h-px bg-border/50 my-2" />
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border/50 my-2" />
              <div className="px-3 pt-2">
                <Button className="w-full" asChild>
                  <a href="mailto:contact@Veloxiz.ai">Book a Demo</a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
