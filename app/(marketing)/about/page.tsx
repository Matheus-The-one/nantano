import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Target,
  Eye,
  Zap,
  Users,
  Globe,
  Heart,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us - Veloxiz",
  description:
    "Learn about Veloxiz, our mission to bring AI-powered Process Intelligence to enterprises, and the team building it.",
  keywords: "Veloxiz about, process intelligence company, enterprise ai team",
};

const values = [
  {
    icon: Eye,
    title: "Radical Transparency",
    description:
      "Every alert comes with full context - what happened, where, and why. We believe visibility creates trust, both in our product and in your operations.",
  },
  {
    icon: Target,
    title: "Precision Over Noise",
    description:
      "We don't flood your team with false positives. Our AI is tuned to surface what matters, so every alert is worth your attention.",
  },
  {
    icon: Zap,
    title: "Speed is a Feature",
    description:
      "From data ingestion to alert delivery in under 2 seconds. In operations, the difference between 2s and 2 hours can cost millions.",
  },
  {
    icon: Heart,
    title: "Built for Humans",
    description:
      "We design for the operations manager who needs answers at 3am, not just the engineer who built the system. Clarity over complexity.",
  },
];

const milestones = [
  {
    year: "2022",
    title: "Founded",
    description: "Veloxiz was started after observing how enterprises were losing millions to process failures that went undetected for weeks.",
  },
  {
    year: "2023",
    title: "First Enterprise Customer",
    description: "Deployed for a Fortune 500 logistics company. Detected 3 critical pipeline bottlenecks in the first 48 hours.",
  },
  {
    year: "2024",
    title: "Series A",
    description: "Raised to expand the AI detection engine, add compliance features, and build out the enterprise integrations ecosystem.",
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Now serving customers across 12 countries, with data residency options in the US, EU, and Asia-Pacific regions.",
  },
  {
    year: "2026",
    title: "Today",
    description: "500+ process streams monitored daily. 12,000+ patterns detected monthly. Continuously improving the intelligence layer.",
  },
];

const team = [
  {
    name: "Matheus Fernandes",
    title: "Founder & CEO",
    bio: "Previously led data engineering at scale. Saw firsthand how invisible process failures cost enterprises millions - and decided to fix it.",
    initials: "MF",
  },
  {
    name: "Aisha Nwosu",
    title: "Head of AI",
    bio: "ML researcher and practitioner with a focus on time-series anomaly detection and adaptive learning systems.",
    initials: "AN",
  },
  {
    name: "Jonas Weber",
    title: "Head of Engineering",
    bio: "Distributed systems engineer. Built real-time data pipelines at scale before joining Veloxiz to architect the detection engine.",
    initials: "JW",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/8" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.05)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm mb-8">
              <Globe className="mr-2 h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-powered Process Intelligence</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
              We make enterprise operations{" "}
              <span className="gradient-text">transparent</span>
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              Veloxiz was built on a simple belief: every enterprise process failure
              sends signals before it becomes a crisis. Our job is to make sure
              someone&apos;s listening.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a href="mailto:contact@Veloxiz.ai">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Our Mission</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Turn enterprise chaos into operational clarity
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Most enterprise operations are flying blind. Data lives in silos,
                processes run without visibility, and failures only surface after
                they&apos;ve done damage. We fix this by bringing AI-powered
                structure and intelligence to the data your business already produces.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to give every operations team the same real-time
                awareness of their processes that elite engineering teams have of
                their infrastructure - and to do it without requiring a team of
                data scientists.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Customers", value: "50+" },
                { label: "Countries", value: "12" },
                { label: "Processes Monitored", value: "500+" },
                { label: "Patterns Detected", value: "12K+/mo" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Our Values</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What guides how we build
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Our Journey</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How we got here
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative flex gap-8 pb-12 last:pb-0">
                {i < milestones.length - 1 && (
                  <div className="absolute left-[19px] top-12 bottom-0 w-px bg-border" />
                )}
                <div className="relative flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{m.year.slice(2)}</span>
                  </div>
                </div>
                <div className="pt-1">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest">{m.year}</span>
                  <h3 className="text-lg font-semibold mt-0.5 mb-2">{m.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xl">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">The Team</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built by operators and engineers
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We&apos;ve all felt the pain of process failures at scale. That&apos;s why we built Veloxiz.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl border border-border/60 bg-card p-6 shadow-sm text-center"
              >
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-base">{member.name}</h3>
                <p className="text-sm text-primary font-medium mt-0.5 mb-3">{member.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Want to work together?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you&apos;re interested in our platform or want to join the team,
            we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="mailto:contact@Veloxiz.ai">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
