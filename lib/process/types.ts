/**
 * Process discovery model.
 *
 * These types are the contract between the discovery backend and the UI. The
 * page renders whatever `ProcessGraph` it is handed; until ingestion is wired
 * up, no graph exists for any user and the page shows its gated empty state
 * rather than inventing a process.
 */

/** Health classification for a discovered activity. */
export type ActivityHealth = "healthy" | "slow" | "bottleneck";

export type ProcessActivity = {
  id: string;
  name: string;
  /** Cases that passed through this activity. */
  caseCount: number;
  /** Median time spent in this activity, in hours. */
  medianHours: number;
  health: ActivityHealth;
};

export type ProcessTransition = {
  from: string;
  to: string;
  caseCount: number;
  medianHours: number;
  /** True when this path is not part of the expected happy path. */
  deviation?: boolean;
};

export type ProcessVariant = {
  id: string;
  /** Activity ids in order. */
  path: string[];
  caseCount: number;
  sharePercent: number;
  medianDurationHours: number;
  isHappyPath: boolean;
};

export type ProcessGraph = {
  id: string;
  name: string;
  /** Connector ids the graph was discovered from. */
  sourceConnectorIds: string[];
  discoveredAt: string;
  caseCount: number;
  medianDurationHours: number;
  /** Share of cases that follow the expected path, 0-100. */
  conformancePercent: number;
  activities: ProcessActivity[];
  transitions: ProcessTransition[];
  variants: ProcessVariant[];
};

export function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 24) return `${Math.round(hours * 10) / 10}h`;
  return `${Math.round((hours / 24) * 10) / 10}d`;
}

export function healthLabel(health: ActivityHealth): string {
  switch (health) {
    case "healthy":
      return "Healthy";
    case "slow":
      return "Slow";
    case "bottleneck":
      return "Bottleneck";
    default: {
      // Exhaustiveness guard: new health states must be labelled here.
      const never: never = health;
      return never;
    }
  }
}
