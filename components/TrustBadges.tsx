"use client";

import { Globe, Zap, Clock, Users } from "lucide-react";

const badges = [
  { icon: Globe, label: "99.9% Uptime SLA" },
  { icon: Zap, label: "Sub-2s Detection" },
  { icon: Clock, label: "Real-Time Alerts" },
  { icon: Users, label: "Enterprise Ready" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm"
        >
          <badge.icon className="h-3.5 w-3.5 text-primary" />
          {badge.label}
        </div>
      ))}
    </div>
  );
}
