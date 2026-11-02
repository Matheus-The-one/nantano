"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Loader2, Search, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { groupByDate, relativeDate } from "@/lib/format/date";
import type {
  ConversationPage,
  ConversationSummary,
} from "@/lib/conversations/schema";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 25;

/**
 * Full chat history, paginated.
 *
 * The sidebar only shows the few most recent chats; this dialog loads the
 * rest a page at a time from `/api/conversations`, so a long history never
 * arrives in one oversized response.
 */
export function ChatHistoryDialog({
  open,
  onOpenChange,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Keeps the sidebar list in step when a row is deleted here. */
  onDelete: (conversationId: string) => void;
}) {
  const pathname = usePathname();
  const [items, setItems] = useState<ConversationSummary[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loadedOnce, setLoadedOnce] = useState(false);

  // Guards against two concurrent fetches appending the same page twice.
  const inFlight = useRef(false);

  const loadPage = useCallback(async (next: string | null) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError(null);

    try {
      const url = new URL("/api/conversations", window.location.origin);
      url.searchParams.set("limit", String(PAGE_SIZE));
      if (next) url.searchParams.set("cursor", next);

      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("Request failed.");

      const page = (await response.json()) as ConversationPage;

      setItems((previous) => {
        // De-dupe by id: a conversation touched mid-pagination can otherwise
        // show up on two different pages.
        const seen = new Set(previous.map((item) => item.conversationId));
        return [
          ...previous,
          ...page.items.filter((item) => !seen.has(item.conversationId)),
        ];
      });
      setCursor(page.cursor);
      setLoadedOnce(true);
    } catch {
      setError("Could not load chat history.");
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, []);

  // Load the first page on open, and reset on close so a reopen is fresh.
  useEffect(() => {
    if (!open) {
      setItems([]);
      setCursor(null);
      setQuery("");
      setLoadedOnce(false);
      setError(null);
      return;
    }

    void loadPage(null);
  }, [open, loadPage]);

  async function handleDelete(conversationId: string) {
    setItems((previous) =>
      previous.filter((item) => item.conversationId !== conversationId)
    );
    onDelete(conversationId);

    try {
      await fetch(`/api/conversations/${conversationId}`, { method: "DELETE" });
    } catch {
      setError("Could not delete that chat.");
    }
  }

  // Filtering applies to what has been loaded. Kept client-side because
  // Dynamo cannot do a substring match without a scan.
  const needle = query.trim().toLowerCase();
  const visible =
    needle.length > 0
      ? items.filter((item) => item.title.toLowerCase().includes(needle))
      : items;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(640px,85vh)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="shrink-0 border-b border-border px-5 py-4">
          <DialogTitle className="font-display text-base font-semibold">
            Chat history
          </DialogTitle>
        </DialogHeader>

        <div className="shrink-0 border-b border-border px-4 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-input/40 px-2.5 focus-within:border-primary/50">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                // Honest about scope: filtering is client-side over loaded
                // rows, since Dynamo cannot substring-match without a scan.
                cursor ? "Search loaded chats..." : "Search chats..."
              }
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {needle.length > 0 && cursor ? (
            <p className="px-1 pt-2 text-[11px] text-muted-foreground">
              Searching the {items.length} loaded chats. Load more to widen it.
            </p>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          {groupByDate(visible, (item) => item.updatedAt).map((group) => (
            <section key={group.label}>
              <p className="px-3 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                {group.label}
              </p>

              {group.items.map((item) => {
                const href = `/dashboard/c/${item.conversationId}`;
                const active = pathname === href;

                return (
                  <div
                    key={item.conversationId}
                    className="group relative flex items-center"
                  >
                    <Link
                      href={href}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        "min-w-0 flex-1 rounded-lg py-2.5 pl-3 pr-10 transition-colors",
                        active ? "bg-secondary" : "hover:bg-secondary/60"
                      )}
                    >
                      <span className="block truncate text-sm text-foreground">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {relativeDate(item.updatedAt)}
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => void handleDelete(item.conversationId)}
                      aria-label={`Delete ${item.title}`}
                      className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </section>
          ))}

          {error ? (
            <p className="flex items-center gap-2 px-3 py-3 text-xs text-destructive">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              {error}
            </p>
          ) : null}

          {loadedOnce && visible.length === 0 && !loading ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {needle.length > 0 ? "No matching chats." : "No chats yet."}
            </p>
          ) : null}

          {loading ? (
            <p className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading...
            </p>
          ) : null}

          {/* Explicit paging: predictable, and avoids a scroll observer
              fighting the search filter. */}
          {cursor && !loading ? (
            <button
              type="button"
              onClick={() => void loadPage(cursor)}
              className="mx-auto mt-1 mb-2 block rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Load more
            </button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
