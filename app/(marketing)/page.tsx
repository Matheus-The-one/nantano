import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { CodeShowcase } from "@/components/CodeShowcase";
import { CTA } from "@/components/CTA";
import { Testimonials } from "@/components/Testimonials";
import { UseCasesPreview } from "@/components/UseCasesPreview";
import { IntegrationsPreview } from "@/components/IntegrationsPreview";
import { HomeFAQ } from "@/components/HomeFAQ";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Stats />
      <UseCasesPreview />
      <CodeShowcase />
      <Testimonials />
      <IntegrationsPreview />
      <HomeFAQ />
      <CTA />
    </div>
  );
}
