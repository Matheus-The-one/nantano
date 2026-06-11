"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "How It Works", href: "/process-mining" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <p className="text-sm font-medium hover:text-primary transition-colors">
              {link.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden p-4 justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="justify-end" variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="text-left hidden">Menu</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-lg font-semibold">
                  {link.name}
                </Link>
              ))}
              <Link href="mailto:contact@nantano.ai" className="text-lg font-semibold text-primary">
                Contact Us
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
