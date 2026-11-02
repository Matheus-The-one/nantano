"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUp, Plus, Square } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared composer. Rendered inline inside the onboarding hero, and pinned to
 * the top of the pane once a conversation is underway.
 */
export function Composer({
  value,
  onChange,
  onSubmit,
  busy,
  onStop,
  connectedCount,
  autoFocus = false,
  highlighted = false,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  busy: boolean;
  onStop: () => void;
  connectedCount: number;
  autoFocus?: boolean;
  highlighted?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-grow up to a cap, then scroll internally.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, 200)}px`;
  }, [value]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div
        className={cn(
          "rounded-3xl border bg-card/70 px-1 transition-colors focus-within:border-primary/60",
          highlighted ? "border-primary/40" : "border-border"
        )}
      >
        <textarea
          ref={ref}
          autoFocus={autoFocus}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
          rows={1}
          placeholder="Ask about a gap in your business..."
          className="w-full resize-none bg-transparent px-3.5 pt-3 text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground"
        />

        <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5 pt-1">
          <Link
            href="/dashboard/connectors"
            className="inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            {connectedCount > 0
              ? `${connectedCount} source${connectedCount === 1 ? "" : "s"}`
              : "Add evidence"}
          </Link>

          {busy ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generating"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80"
            >
              <Square className="h-3 w-3 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={value.trim().length === 0}
              aria-label="Send message"
              className="btn-ink flex h-8 w-8 items-center justify-center rounded-full transition-opacity disabled:opacity-35"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
