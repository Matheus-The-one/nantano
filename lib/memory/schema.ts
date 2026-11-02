/**
 * Pure knowledge-base shapes and labels.
 *
 * Kept separate from `lib/db/memory.ts` on purpose: that module constructs the
 * DynamoDB client, so importing a *value* from it in a client component ships
 * the whole AWS SDK to the browser.
 */

export type MemoryKind =
  | "icp"
  | "constraint"
  | "metric"
  | "competitor"
  | "preference"
  | "process";

/** Every kind, in display order. Used for filter chips and tool schemas. */
export const MEMORY_KINDS: readonly MemoryKind[] = [
  "icp",
  "constraint",
  "metric",
  "competitor",
  "preference",
  "process",
];

/**
 * Two origins:
 *  - `extracted` : derived from a connected source during ingestion.
 *  - `stated`    : told to Veloxiz directly by the user.
 */
export type MemoryOrigin = "extracted" | "stated";

export type Memory = {
  userId: string;
  memoryId: string;
  kind: MemoryKind;
  /** The learned fact, phrased as a single sentence. */
  content: string;
  origin: MemoryOrigin;
  /** Connector ids this was derived from. Empty for user-stated facts. */
  sourceConnectorIds: string[];
  /** Model confidence 0-1, only meaningful for extracted entries. */
  confidence?: number;
  createdAt: string;
  updatedAt: string;
};

export function memoryKindLabel(kind: MemoryKind): string {
  switch (kind) {
    case "icp":
      return "Ideal customer";
    case "constraint":
      return "Constraint";
    case "metric":
      return "Metric";
    case "competitor":
      return "Competitor";
    case "preference":
      return "Preference";
    case "process":
      return "Process";
    default: {
      // Exhaustiveness guard: new memory kinds must be labelled here.
      const never: never = kind;
      return never;
    }
  }
}
