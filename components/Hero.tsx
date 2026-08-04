"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, X, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";

/* ── Sparkline (table) ───────────────────────────────────────────── */
function Sparkline({ points, color = "neutral" }: { points: number[]; color?: "neutral"|"warn"|"critical" }) {
  const w = 52, h = 18;
  const max = Math.max(...points), min = Math.min(...points), range = max - min || 1;
  const pts = points.map((v, i) => `${(i/(points.length-1))*w},${h-((v-min)/range)*(h-2)-1}`).join(" ");
  const cls = { neutral:"stroke-foreground/20", warn:"stroke-amber-400/80", critical:"stroke-red-400/80" }[color];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} />
    </svg>
  );
}

/* ── KPI micro sparkline ─────────────────────────────────────────── */
function MicroSpark({ points, up }: { points: number[]; up: boolean }) {
  const w = 44, h = 22;
  const max = Math.max(...points), min = Math.min(...points), range = max - min || 1;
  const pts = points.map((v, i) => `${(i/(points.length-1))*w},${h-((v-min)/range)*(h-3)-1.5}`).join(" ");
  const lastX = ((points.length-1)/(points.length-1))*w;
  const lastY = h-((points[points.length-1]-min)/range)*(h-3)-1.5;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        className={up ? "stroke-emerald-400/60" : "stroke-red-400/50"} />
      <circle cx={lastX} cy={lastY} r="2" className={up ? "fill-emerald-400/70" : "fill-red-400/60"} />
    </svg>
  );
}

/* ── Area chart for right panel ──────────────────────────────────── */
const chartInitial = [3.2, 4.1, 3.8, 5.2, 4.7, 3.9, 6.1, 4.8, 5.3, 3.7, 4.2, 2.8];
const chartLabels = ["S","O","N","D","J","F","M","A","M","J","J","A"];

function AreaChart({ data }: { data: number[] }) {
  const cW = 168, cH = 80;
  const maxV = Math.max(...data) + 0.5;
  const minV = Math.min(...data) - 0.5;
  const range = maxV - minV;
  const toX = (i: number) => (i / (data.length - 1)) * cW;
  const toY = (v: number) => cH - ((v - minV) / range) * (cH - 6) - 3;

  const pts = data.map((v, i) => [toX(i), toY(v)] as [number, number]);
  let line = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i-1][0] + pts[i][0]) / 2;
    line += ` C ${cpx.toFixed(2)} ${pts[i-1][1].toFixed(2)} ${cpx.toFixed(2)} ${pts[i][1].toFixed(2)} ${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
  }
  const area = `${line} L ${pts[pts.length-1][0].toFixed(2)} ${cH} L 0 ${cH} Z`;

  return (
    <svg width={cW} height={cH} viewBox={`0 0 ${cW} ${cH}`} fill="none" className="overflow-visible">
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ag)" className="text-primary" style={{ transition: "d 0.6s ease" }} />
      <path
        d={line}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className="text-primary/70"
        style={{ transition: "d 0.6s ease" }}
      />
      <circle
        cx={pts[pts.length-1][0]}
        cy={pts[pts.length-1][1]}
        r="2.5"
        className="fill-primary"
        style={{ transition: "cx 0.6s ease, cy 0.6s ease" }}
      />
      {/* animated pulse on last point */}
      <circle
        cx={pts[pts.length-1][0]}
        cy={pts[pts.length-1][1]}
        r="4"
        className="fill-primary/20"
        style={{ animation: "pulse 2s ease infinite", transition: "cx 0.6s ease, cy 0.6s ease" }}
      />
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────────────── */
interface Notif { id:number; type:"warn"|"ok"|"info"|"critical"; title:string; detail:string; time:string; read:boolean }
const initNotifs: Notif[] = [
  { id:1, type:"critical", title:"SLA breach",       detail:"billing_pipeline → 8.4s P50",    time:"just now", read:false },
  { id:2, type:"warn",     title:"Latency spike",    detail:"payment_reconciliation → +340%",  time:"1m ago",   read:false },
  { id:3, type:"ok",       title:"Resolved",         detail:"inventory_sync resumed baseline", time:"4m ago",   read:false },
  { id:4, type:"info",     title:"Baseline updated", detail:"order_fulfillment model v2.1",    time:"12m ago",  read:true  },
];

type Filter = "all"|"anomaly"|"nominal";
type StreamStatus = "nominal"|"warn"|"critical";

const streams: { name:string; p50:string; events:string; status:StreamStatus; spark:number[] }[] = [
  { name:"order_fulfillment",      p50:"0.8s", events:"1,243", status:"nominal",  spark:[12,14,13,15,14,13,14,15,13,12] },
  { name:"billing_pipeline",       p50:"8.4s", events:"56",    status:"critical", spark:[10,11,10,12,14,20,32,48,60,72] },
  { name:"payment_reconciliation", p50:"4.2s", events:"89",    status:"warn",     spark:[12,12,13,12,14,18,24,32,38,42] },
  { name:"inventory_sync",         p50:"1.1s", events:"3,871", status:"nominal",  spark:[11,12,11,13,12,11,12,12,11,12] },
  { name:"customer_onboarding",    p50:"0.6s", events:"204",   status:"nominal",  spark:[6,7,6,7,6,6,7,6,6,7]          },
  { name:"fraud_detection",        p50:"0.3s", events:"512",   status:"nominal",  spark:[4,4,5,4,4,3,4,5,4,4]          },
];

const kpis = [
  { label:"Active Streams",   value:"24",   sub:"+3 this week",  up:true,  spark:[5,6,5,7,6,8,7,6,8,9,8,10] },
  { label:"Open Anomalies",   value:"2",    sub:"1 critical",    up:false, spark:[1,2,1,1,2,1,3,2,1,2,3,2]  },
  { label:"Avg. P50 Latency", value:"1.4s", sub:"Within SLA",   up:true,  spark:[5,4,5,4,4,5,4,4,5,4,4,4]  },
  { label:"Events / Hour",    value:"5.9K", sub:"All streams",  up:true,  spark:[4,5,5,6,5,6,7,6,7,8,7,8]  },
];

const statusStyle: Record<StreamStatus,{dot:string;text:string;label:string}> = {
  nominal:  { dot:"bg-muted-foreground/20", text:"text-muted-foreground/40", label:"nominal"  },
  warn:     { dot:"bg-amber-400",           text:"text-amber-400",           label:"degraded" },
  critical: { dot:"bg-red-400",             text:"text-red-400",             label:"critical" },
};
const sparkColor: Record<StreamStatus,"neutral"|"warn"|"critical"> = {
  nominal:"neutral", warn:"warn", critical:"critical",
};

export function Hero() {
  const [notifs, setNotifs]         = useState<Notif[]>(initNotifs);
  const [panelOpen, setPanelOpen]   = useState(false);
  const [selected, setSelected]     = useState<string|null>(null);
  const [filter, setFilter]         = useState<Filter>("all");
  const [flashRow, setFlashRow]     = useState<string|null>(null);
  const [flashKey, setFlashKey]     = useState(0);

  // ── Live animated state ──────────────────────────────────────────
  const [eventsCount, setEventsCount] = useState(0);          // counts up then ticks live
  const [activeStreams, setActiveStreams] = useState(0);       // count-up
  const [latency, setLatency] = useState(0);                  // count-up
  const [anomalyRate, setAnomalyRate] = useState(2.8);
  const [chartData, setChartData] = useState(chartInitial);
  const [sparkData, setSparkData] = useState(kpis.map(k => k.spark));
  const mountedRef = useRef(false);

  // Count-up on mount
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const dur = 1400;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setEventsCount(Math.round(e * 5900));
      setActiveStreams(Math.round(e * 24));
      setLatency(parseFloat((e * 1.4).toFixed(1)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  // Live events counter ticks up every 1.8 s
  useEffect(() => {
    const id = setInterval(() => {
      setEventsCount(c => c + Math.floor(Math.random() * 120 + 40));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  // Anomaly rate + chart slide every 3 s
  useEffect(() => {
    const id = setInterval(() => {
      setChartData(d => {
        const last = d[d.length - 1];
        const next = Math.max(1.5, Math.min(7.5, last + (Math.random() - 0.48) * 0.9));
        const updated = [...d.slice(1), parseFloat(next.toFixed(2))];
        setAnomalyRate(parseFloat(next.toFixed(1)));
        return updated;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // KPI sparklines update last point every 2 s
  useEffect(() => {
    const id = setInterval(() => {
      setSparkData(prev => prev.map(pts => {
        const last = pts[pts.length - 1];
        const next = Math.max(1, last + (Math.random() - 0.4) * 1.5);
        return [...pts.slice(1), parseFloat(next.toFixed(1))];
      }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  /* ── live row flash every ~2.5 s ── */
  useEffect(() => {
    const ids = setInterval(() => {
      const idx = Math.floor(Math.random() * streams.length);
      setFlashRow(streams[idx].name);
      setFlashKey(k => k + 1);
      setTimeout(() => setFlashRow(null), 900);
    }, 2500);
    return () => clearInterval(ids);
  }, []);

  const unread      = notifs.filter(n => !n.read).length;
  const dismiss     = useCallback((id:number, e:React.MouseEvent) => { e.stopPropagation(); setNotifs(p => p.filter(n => n.id !== id)); }, []);
  const markRead    = useCallback((id:number) => setNotifs(p => p.map(n => n.id === id ? {...n,read:true} : n)), []);
  const markAllRead = useCallback(() => setNotifs(p => p.map(n => ({...n,read:true}))), []);
  const sel = streams.find(s => s.name === selected);

  const visibleStreams = streams.filter(s =>
    filter === "all" ? true : filter === "anomaly" ? s.status !== "nominal" : s.status === "nominal"
  );

  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[360px] w-[800px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

      <div className="relative pt-20 pb-0 sm:pt-28">

        {/* Headline */}
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-[68px] leading-[1.06] text-foreground">
            Find hidden patterns.<br />
            <span className="text-foreground/45">Fix broken processes.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Veloxiz detects anomalies in your enterprise processes and delivers
            real-time alerts before issues escalate.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <Button size="lg" className="px-8" asChild>
              <Link href="/how-it-works">See How It Works <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <a href="mailto:contact@Veloxiz.ai">Book a Demo</a>
            </Button>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-14 px-6 sm:px-16 lg:px-32 xl:px-48">
          <div className="rounded-t-2xl border border-b-0 border-border/70 bg-card/95 backdrop-blur-sm shadow-[0_-8px_60px_-12px_oklch(0_0_0/0.25)] overflow-hidden">

            {/* Chrome bar */}
            <div className="flex items-center gap-3 px-4 h-9 border-b border-border/60 bg-muted/15 shrink-0">
              <div className="flex gap-1.5">
                {[0,1,2].map(i => <span key={i} className="h-2 w-2 rounded-full bg-border/60" />)}
              </div>
              <span className="flex-1 text-[10px] text-muted-foreground/35 font-mono select-none">app.veloxiz.ai / dashboard</span>
              <div className="flex items-center gap-2.5 shrink-0">
                <button onClick={() => setPanelOpen(v => !v)}
                  className="relative h-6 w-6 flex items-center justify-center rounded text-muted-foreground/50 hover:text-foreground hover:bg-muted/50 transition-colors">
                  <Bell className="h-3.5 w-3.5" />
                  {unread > 0 && <span className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-red-400" />}
                </button>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70 animate-pulse" />Live
                </span>
              </div>
            </div>

            {/* Body — two columns */}
            <div className="flex relative">

              {/* ── Left: main content ── */}
              <div className="flex-1 min-w-0 px-4 pt-3 pb-0 space-y-2.5">

                {/* KPI strip — animated values + live sparklines */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label:"Active Streams",   value: activeStreams.toString(),                          sub:"+3 this week", up:true,  si:0 },
                    { label:"Open Anomalies",   value: "2",                                               sub:"1 critical",   up:false, si:1 },
                    { label:"Avg. P50 Latency", value: latency > 0 ? `${latency.toFixed(1)}s` : "0.0s",  sub:"Within SLA",  up:true,  si:2 },
                    { label:"Events / Hour",    value: eventsCount >= 1000 ? `${(eventsCount/1000).toFixed(1)}K` : eventsCount.toString(), sub:"All streams", up:true, si:3 },
                  ].map((k, i) => (
                    <div key={k.label} className="rounded-lg border border-border/50 bg-background/50 px-3 py-2">
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/35 leading-none mb-1.5">{k.label}</p>
                      <div className="flex items-end justify-between gap-1">
                        <div>
                          <p className="text-lg font-bold tabular-nums leading-none" style={{ fontVariantNumeric:"tabular-nums" }}>{k.value}</p>
                          <p className="text-[9px] text-muted-foreground/40 mt-1">{k.sub}</p>
                        </div>
                        <MicroSpark points={sparkData[k.si]} up={k.up} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Alert log bar — minimal, no color backgrounds */}
                <div className="flex items-center gap-0 rounded-lg border border-border/40 bg-muted/8 divide-x divide-border/30 overflow-hidden">
                  {[
                    { dot:"bg-red-400",    label:"billing_pipeline",       msg:"SLA breach · P50 8.4s"          },
                    { dot:"bg-amber-400",  label:"payment_reconciliation",  msg:"Latency spike · +340% baseline" },
                    { dot:"bg-emerald-400",label:"inventory_sync",          msg:"Resolved · baseline resumed"    },
                  ].map(a => (
                    <div key={a.label} className="flex items-center gap-2 px-3 py-1.5 flex-1 min-w-0">
                      <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
                      <span className="font-mono text-[10px] text-foreground/50 truncate">
                        <span className="text-foreground/65 font-medium">{a.label}</span>
                        <span className="text-muted-foreground/35"> · {a.msg}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Filter + table */}
                <div className="rounded-lg border border-border/50 overflow-hidden">
                  <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border/40 bg-muted/10">
                    {(["all","anomaly","nominal"] as Filter[]).map(f => (
                      <button key={f} onClick={() => setFilter(f)}
                        className={`px-2.5 py-1 rounded text-[9px] font-semibold capitalize transition-colors ${
                          filter === f ? "bg-foreground/8 text-foreground" : "text-muted-foreground/35 hover:text-muted-foreground/60"
                        }`}>
                        {f==="all"?`All (${streams.length})`:f==="anomaly"?`Anomalies (${streams.filter(s=>s.status!=="nominal").length})`:`Nominal (${streams.filter(s=>s.status==="nominal").length})`}
                      </button>
                    ))}
                    <div className="flex-1" />
                    <span className="text-[8px] text-muted-foreground/25 font-mono">updated 2s ago</span>
                  </div>

                  <div className="grid grid-cols-[1fr_52px_68px_48px_72px] px-3 py-1.5 border-b border-border/30 bg-muted/8">
                    {["Stream","Trend","Events/hr","P50","Status"].map(h => (
                      <span key={h} className="text-[8px] font-semibold uppercase tracking-widest text-muted-foreground/25">{h}</span>
                    ))}
                  </div>

                  {visibleStreams.map(s => {
                    const st = statusStyle[s.status];
                    const isFlashing = flashRow === s.name;
                    const rowKey = isFlashing ? `${s.name}-${flashKey}` : s.name;
                    return (
                      <button key={rowKey}
                        onClick={() => setSelected(selected === s.name ? null : s.name)}
                        className={`w-full grid grid-cols-[1fr_52px_68px_48px_72px] items-center px-3 py-1.5 border-b border-border/20 last:border-0 text-left transition-colors duration-700 ${
                          selected === s.name ? "bg-muted/20" : "hover:bg-muted/10"
                        }`}
                        style={isFlashing ? { animation:"row-flash 0.9s ease forwards" } : undefined}
                      >
                        <span className="font-mono text-[10px] text-foreground/60 truncate flex items-center gap-1.5">
                          <ChevronRight className={`h-2.5 w-2.5 text-muted-foreground/20 flex-shrink-0 transition-transform duration-150 ${selected===s.name?"rotate-90":""}`} />
                          {s.name}
                        </span>
                        <span className="flex items-center"><Sparkline points={s.spark} color={sparkColor[s.status]} /></span>
                        <span className="font-mono text-[10px] text-muted-foreground/45 tabular-nums">{s.events}</span>
                        <span className={`font-mono text-[10px] font-semibold tabular-nums ${st.text}`}>{s.p50}</span>
                        <span className="flex items-center gap-1">
                          <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${st.dot}`} />
                          <span className={`text-[9px] font-semibold ${st.text}`}>{st.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Expanded detail */}
                {sel && (
                  <div className="rounded-lg border border-border/40 bg-background/40 px-3 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] font-semibold text-foreground/80">{sel.name}</span>
                      {sel.status !== "nominal" && (
                        <span className={`text-[9px] font-semibold uppercase tracking-widest border rounded px-1.5 py-0.5 ${
                          sel.status==="critical"?"text-red-400 border-red-400/20":"text-amber-400 border-amber-400/20"}`}>
                          {sel.status==="critical"?"SLA Breach":"Alert Active"}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-5 text-[10px] text-muted-foreground/45 font-mono">
                      <span>P50 <strong className={`font-semibold ${statusStyle[sel.status].text}`}>{sel.p50}</strong></span>
                      <span>Events/hr <strong className="text-foreground/70 font-semibold">{sel.events}</strong></span>
                      <span>State <strong className={`font-semibold ${statusStyle[sel.status].text}`}>{statusStyle[sel.status].label}</strong></span>
                    </div>
                  </div>
                )}

                <div className="h-3" />
              </div>

              {/* ── Right: anomaly rate chart panel ── */}
              <div className="hidden lg:flex flex-col w-52 border-l border-border/50 bg-background/30 px-4 pt-3 pb-4 shrink-0">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/35 mb-0.5">Anomaly Rate</p>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl font-bold tabular-nums" style={{ transition:"all 0.6s ease" }}>{anomalyRate.toFixed(1)}%</span>
                  <span className={`text-[10px] font-semibold ${anomalyRate < 4 ? "text-emerald-400" : "text-amber-400"}`}
                    style={{ transition:"color 0.6s ease" }}>
                    {anomalyRate < 4 ? "↓" : "↑"}{Math.abs(anomalyRate - 3.7).toFixed(1)}
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground/35 mb-4">Last 12 months</p>

                <AreaChart data={chartData} />

                {/* Month labels */}
                <div className="flex justify-between mt-1.5">
                  {chartLabels.filter((_,i) => i % 3 === 0).map(l => (
                    <span key={l} className="text-[8px] text-muted-foreground/25">{l}</span>
                  ))}
                </div>

                {/* Summary stats */}
                <div className="mt-4 pt-3 border-t border-border/30 space-y-2.5">
                  {[
                    { label:"Peak this month",  val:`${Math.max(...chartData).toFixed(1)}%` },
                    { label:"30d avg",          val:`${(chartData.reduce((a,b)=>a+b,0)/chartData.length).toFixed(1)}%` },
                    { label:"Anomalies fired",  val:"38" },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between">
                      <span className="text-[9px] text-muted-foreground/35">{r.label}</span>
                      <span className="text-[10px] font-semibold tabular-nums text-foreground/70"
                        style={{ transition:"all 0.6s ease" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification panel */}
              {panelOpen && (
                <div className="absolute right-0 top-0 bottom-0 w-52 border-l border-border/60 bg-card/95 flex flex-col z-20">
                  <div className="flex items-center justify-between px-3 h-9 border-b border-border/60">
                    <span className="text-[11px] font-semibold">Alerts</span>
                    <button onClick={() => setPanelOpen(false)} className="h-5 w-5 flex items-center justify-center rounded hover:bg-muted text-muted-foreground/50 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {notifs.length === 0 && <p className="p-4 text-center text-[11px] text-muted-foreground/40">All caught up</p>}
                    {notifs.map(n => {
                      const dot = n.type==="critical"?"bg-red-400":n.type==="warn"?"bg-amber-400":n.type==="ok"?"bg-emerald-500":"bg-primary/40";
                      return (
                        <button key={n.id} onClick={() => markRead(n.id)}
                          className={`w-full text-left px-3 py-2 border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors ${n.read?"opacity-40":""}`}>
                          <div className="flex items-start gap-2">
                            <span className={`mt-0.5 flex-shrink-0 h-1.5 w-1.5 rounded-full ${dot}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-semibold text-foreground/80">{n.title}</p>
                              <p className="text-[9px] text-muted-foreground/45 font-mono mt-0.5 truncate">{n.detail}</p>
                              <p className="text-[8px] text-muted-foreground/30 mt-0.5">{n.time}</p>
                            </div>
                            <button onClick={e => dismiss(n.id, e)} className="flex-shrink-0 h-4 w-4 flex items-center justify-center text-muted-foreground/20 hover:text-muted-foreground/60">
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {notifs.length > 0 && (
                    <div className="px-3 py-2 border-t border-border/60">
                      <button onClick={markAllRead} className="flex items-center gap-1 text-[9px] text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                        <Eye className="h-2.5 w-2.5" /> Mark all read
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
