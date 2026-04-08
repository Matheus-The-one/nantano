import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { CodeShowcase } from "@/components/CodeShowcase";
import { CTA } from "@/components/CTA";
import { CompanyCarousel } from "@/components/CompanyCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CompanyCarousel />
      <Features />
      <Stats />
      <CodeShowcase />
      <CTA />
    </div>
  );
}
