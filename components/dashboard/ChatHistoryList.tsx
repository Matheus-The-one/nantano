"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useChatHistory } from "@/components/dashboard/chat/ChatHistoryContext";
import { ChatHistoryDialog } from "@/components/dashboard/ChatHistoryDialog";
import { cn } from "@/lib/utils";

/** How many chats the sidebar shows before deferring to the dialog. */
const VISIBLE_COUNT = 5;

/**
 * Recent conversations in the sidebar.
 *
 * Deliberately capped: only the newest few are listed inline, and the rest
 * are reachable through the paginated "Show all" dialog so a long history
 * never has to be loaded to render the sidebar.
 */
export function ChatHistoryList({
  onNavigate,
}: {
  /** Closes the mobile drawer after picking a conversation. */
  onNavigate?: () => void;
}) {
  const { conversations, remove, hasMore } = useChatHistory();
  const pathname = usePathname();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleDelete(conversationId: string) {
    const wasOpen = pathname === `/dashboard/c/${conversationId}`;

    // Optimistic: the row disappears immediately, and the request is keyed by
    // userId server-side so it can only ever delete the caller's own chat.
    remove(conversationId);
    if (wasOpen) router.push("/dashboard");

    try {
      await fetch(`/api/conversations/${conversationId}`, { method: "DELETE" });
    } catch {
      router.refresh();
    }
  }

  const recent = conversations.slice(0, VISIBLE_COUNT);

  // "Show all" is worth offering as soon as there is anything hidden, either
  // locally or on the server.
  const showAll = hasMore || conversations.length > VISIBLE_COUNT;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2">
      {recent.length > 0 ? (
        <>
          <p className="px-3 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
            Recent
          </p>

          <ul className="flex flex-col gap-0.5">
            {recent.map((item) => {
              const href = `/dashboard/c/${item.conversationId}`;
              const active = pathname === href;

              return (
                <li key={item.conversationId} className="group relative">
                  <Link
                    href={href}
                    onClick={onNavigate}
                    title={item.title}
                    className={cn(
                      "block truncate rounded-lg py-2 pl-3 pr-8 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}
                  >
                    {item.title}
                  </Link>

                  <button
                    type="button"
                    onClick={() => void handleDelete(item.conversationId)}
                    aria-label={`Delete ${item.title}`}
                    className={cn(
                      "absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100",
                      active && "opacity-60"
                    )}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>

          {showAll ? (
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="mt-1 w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            >
              Show all
            </button>
          ) : null}
        </>
      ) : null}

      <ChatHistoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onDelete={remove}
      />
    </div>
  );
}
