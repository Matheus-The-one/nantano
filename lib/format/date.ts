/**
 * Date formatting for chat history.
 *
 * Pure functions with no DB or AWS imports, so client components can use them
 * freely.
 */

const MS_PER_DAY = 86_400_000;

/** Whole days between two dates, comparing local calendar days not elapsed ms. */
function daysApart(from: Date, to: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

/**
 * Short relative label for a timestamp: "Today", "Yesterday", a weekday
 * inside the last week, otherwise an absolute date.
 */
export function relativeDate(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const days = daysApart(date, now);

  if (days <= 0) {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  if (days === 1) return "Yesterday";
  if (days < 7) return date.toLocaleDateString(undefined, { weekday: "long" });

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    // Only show the year once it is not the current one.
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}

export type HistoryBucket =
  | "Today"
  | "Yesterday"
  | "Previous 7 days"
  | "Previous 30 days"
  | "Older";

/** Which section of the history list a timestamp belongs in. */
export function historyBucket(iso: string, now: Date = new Date()): HistoryBucket {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Older";

  const days = daysApart(date, now);

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return "Previous 7 days";
  if (days < 30) return "Previous 30 days";
  return "Older";
}

/**
 * Groups already-sorted (newest first) items into history buckets, preserving
 * order and skipping empty sections.
 */
export function groupByDate<T>(
  items: T[],
  getDate: (item: T) => string,
  now: Date = new Date()
): { label: HistoryBucket; items: T[] }[] {
  const groups: { label: HistoryBucket; items: T[] }[] = [];

  for (const item of items) {
    const label = historyBucket(getDate(item), now);
    const last = groups[groups.length - 1];

    if (last?.label === label) {
      last.items.push(item);
      continue;
    }

    groups.push({ label, items: [item] });
  }

  return groups;
}
