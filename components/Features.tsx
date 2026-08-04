"use client";

import { SectionHeader } from "@/components/SectionHeader";

/* ──────────────── SVG Illustrations ──────────────── */

function WaveformIllustration() {
  const heights = [8, 14, 22, 30, 38, 44, 40, 34, 42, 48, 42, 36, 44, 40, 32, 44, 38, 30, 40, 34, 26, 34, 22, 16, 10, 6, 4];
  return (
    <svg viewBox="0 0 296 64" className="w-full" preserveAspectRatio="xMidYMid meet">
      {heights.map((h, i) => (
        <rect key={i} x={i * 11 + 2} y={(64 - h) / 2} width={7} height={h} rx={2}
          className={i >= 7 && i <= 16 ? "fill-foreground/55" : "fill-foreground/12"}
        />
      ))}
    </svg>
  );
}

function RadialIllustration() {
  const count = 8;
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28 mx-auto">
      {Array.from({ length: count }, (_, i) => {
        const a = (i * 360) / count;
        const r = (a * Math.PI) / 180;
        return (
          <line key={i} x1="60" y1="60"
            x2={60 + 48 * Math.cos(r)} y2={60 + 48 * Math.sin(r)}
            strokeWidth="2.5" strokeLinecap="round"
            className="stroke-foreground/70"
          />
        );
      })}
      <circle cx="60" cy="60" r="5" className="fill-foreground" />
    </svg>
  );
}

function ConcentricIllustration() {
  return (
    <svg viewBox="0 0 140 140" className="w-36 h-36 mx-auto">
      {[62, 50, 38, 26, 15, 6].map((r, i) => (
        <circle key={i} cx="70" cy="70" r={r} fill="none" strokeWidth="2"
          style={{ stroke: `oklch(0.5 0 0 / ${0.08 + i * 0.14})` }}
        />
      ))}
      <circle cx="70" cy="70" r="6" className="fill-foreground/80" />
    </svg>
  );
}

function PulseIllustration() {
  return (
    <svg viewBox="0 0 280 56" className="w-full" preserveAspectRatio="xMidYMid meet">
      <polyline
        points="0,28 48,28 64,8 80,48 96,28 128,28 144,4 160,52 176,28 208,28 224,18 240,38 280,28"
        fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="stroke-foreground/50"
      />
      <circle cx="144" cy="4"  r="3" className="fill-foreground/70" />
      <circle cx="160" cy="52" r="3" className="fill-foreground/40" />
    </svg>
  );
}

function DotGridIllustration() {
  const dots: { x: number; y: number; active: boolean }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 10; c++) {
      const active = r === 1 && c >= 3 && c <= 6;
      dots.push({ x: c * 26 + 13, y: r * 22 + 11, active });
    }
  }
  return (
    <svg viewBox="0 0 270 88" className="w-full" preserveAspectRatio="xMidYMid meet">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.active ? 4.5 : 3}
          className={d.active ? "fill-foreground/70" : "fill-foreground/12"}
        />
      ))}
    </svg>
  );
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 100 112" className="w-24 h-24 mx-auto">
      <path d="M50 6 L88 22 L88 56 C88 76 72 94 50 102 C28 94 12 76 12 56 L12 22 Z"
        fill="none" strokeWidth="2" strokeLinejoin="round" className="stroke-foreground/40"
      />
      <path d="M50 22 L74 33 L74 56 C74 68 63 79 50 84 C37 79 26 68 26 56 L26 33 Z"
        fill="none" strokeWidth="1.5" strokeLinejoin="round" className="stroke-foreground/20"
      />
      <polyline points="38,55 46,63 63,46" fill="none" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" className="stroke-foreground/65"
      />
    </svg>
  );
}

/* ──────────────── Feature cards ──────────────── */
/*
  Snake layout (3-col grid):
  Row 1:  [Data Structuring — 2col]      [Pattern Detection — 1col]
  Row 2:  [Anomaly — 1col]               [Real-Time Notifications — 2col]
  Row 3:  [Process Visualization — 2col] [Security — 1col]
*/

const features = [
  {
    visual: <WaveformIllustration />,
    visualClass: "flex items-center px-6 py-8",
    title: "Data Structuring",
    description: "Transform raw, unstructured enterprise data into clean organized structures that reveal what's actually happening in your operations.",
    span: "sm:col-span-2",
    align: "visual-wide",
  },
  {
    visual: <RadialIllustration />,
    visualClass: "flex items-center justify-center py-10",
    title: "Pattern Detection",
    description: "Our AI continuously scans structured processes to find recurring patterns, bottlenecks, and inefficiencies that humans miss.",
    span: "sm:col-span-1",
    align: "visual-center",
  },
  {
    visual: <ConcentricIllustration />,
    visualClass: "flex items-center justify-center py-10",
    title: "Anomaly Identification",
    description: "Detect deviations from expected behavior — broken workflows, unusual data footprints, or process drift that needs immediate attention.",
    span: "sm:col-span-1",
    align: "visual-center",
  },
  {
    visual: <PulseIllustration />,
    visualClass: "flex items-center px-6 py-8",
    title: "Real-Time Notifications",
    description: "Get instant alerts via WebSockets when our AI detects issues. No polling, no delay — your team knows the moment something changes.",
    span: "sm:col-span-2",
    align: "visual-wide",
  },
  {
    visual: <DotGridIllustration />,
    visualClass: "flex items-center px-6 py-8",
    title: "Process Visualization",
    description: "See your entire operation as a living flow. Understand how processes connect, where they slow down, and what drives outcomes.",
    span: "sm:col-span-2",
    align: "visual-wide",
  },
  {
    visual: <ShieldIllustration />,
    visualClass: "flex items-center justify-center py-10",
    title: "Enterprise Security",
    description: "End-to-end encryption, role-based access, audit trails, and compliance-ready infrastructure from day one.",
    span: "sm:col-span-1",
    align: "visual-center",
  },
];

export function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="From raw data to real-time intelligence"
          description="We structure your data, find what matters, and tell you about it before it becomes a problem."
        />

        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-black/5 ${f.span}`}
            >
              {/* Illustration zone — light muted background, no color */}
              <div className={`border-b border-border/40 bg-muted/15 min-h-[120px] ${f.visualClass}`}>
                {f.visual}
              </div>
              {/* Text */}
              <div className="p-5">
                <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
