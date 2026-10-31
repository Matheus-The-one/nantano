"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUp,
  Loader2,
  Plus,
  Square,
  Trash2,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Markdown } from "@/components/dashboard/chat/Markdown";
import {
  getConnector,
  type ConnectorDefinition,
} from "@/lib/connectors/catalog";
import { cn } from "@/lib/utils";
import type {
  ChatMessage,
  ConversationSummary,
} from "@/lib/db/conversations";

/** Short chip labels with the full prompt sent on click. */
const SUGGESTIONS = [
  {
    label: "Segment gaps",
    prompt: "Which customer segments are we underserving, and what would confirm it?",
  },
  {
    label: "Revenue drivers",
    prompt: "What are the biggest drivers of missed revenue in our business right now?",
  },
  {
    label: "Churn risk",
    prompt: "Where is churn risk concentrated, and what signals should we watch?",
  },
  {
    label: "Competitor whitespace",
    prompt: "Which competitor move should we respond to first, and why?",
  },
  {
    label: "Pipeline leaks",
    prompt: "Where are we losing mid-market SaaS deals?",
  },
];

type StreamFrame =
  | { type: "meta"; conversationId: string; title: string }
  | { type: "delta"; text: string }
  | { type: "error"; kind: string; message: string }
  | { type: "done" };

function tempId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Compact relative timestamp for the recent list. */
function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";

  const minutes = Math.round((Date.now() - then) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function ChatView({
  userName,
  conversations: initialConversations,
  connectedNames,
  storageError,
}: {
  userName: string;
  conversations: ConversationSummary[];
  connectedNames: string[];
  storageError: string | null;
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasConversation = messages.length > 0 || streaming;

  // With the composer pinned at the top, the newest turn should appear just
  // below it rather than pushing the view to the bottom of the scroller. Only
  // follow the stream once content actually overflows the viewport.
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const overflowing = node.scrollHeight > node.clientHeight;
    if (!overflowing) return;

    node.scrollTop = node.scrollHeight;
  }, [messages, streamedText]);

  const send = useCallback(
    async (raw: string) => {
      const prompt = raw.trim();
      if (prompt.length === 0 || streaming) return;

      setError(null);
      setInput("");

      const optimistic: ChatMessage = {
        id: tempId(),
        role: "user",
        content: prompt,
        createdAt: new Date().toISOString(),
      };

      setMessages((previous) => [...previous, optimistic]);
      setStreaming(true);
      setStreamedText("");

      const controller = new AbortController();
      abortRef.current = controller;

      let assembled = "";
      let activeId = conversationId;
      let failed = false;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt, conversationId }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const payload = (await response
            .json()
            .catch(() => null)) as { error?: string } | null;
          throw new Error(payload?.error ?? "Chat request failed.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        // Newline-delimited JSON frames; the last line may be partial.
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (line.trim().length === 0) continue;

            let frame: StreamFrame;
            try {
              frame = JSON.parse(line) as StreamFrame;
            } catch {
              continue;
            }

            switch (frame.type) {
              case "meta":
                activeId = frame.conversationId;
                setConversationId(frame.conversationId);
                setConversations((previous) => {
                  const rest = previous.filter(
                    (item) => item.conversationId !== frame.conversationId
                  );
                  return [
                    {
                      conversationId: frame.conversationId,
                      title: frame.title,
                      updatedAt: new Date().toISOString(),
                    },
                    ...rest,
                  ];
                });
                break;

              case "delta":
                assembled += frame.text;
                setStreamedText(assembled);
                break;

              case "error":
                failed = true;
                setError(frame.message);
                break;

              case "done":
                break;

              default: {
                // Exhaustiveness guard for new frame types.
                const never: never = frame;
                void never;
              }
            }
          }
        }
      } catch (caught) {
        if ((caught as Error).name !== "AbortError") {
          failed = true;
          setError(
            caught instanceof Error ? caught.message : "Chat request failed."
          );
        }
      } finally {
        abortRef.current = null;
        setStreaming(false);
        setStreamedText("");

        if (assembled.trim().length > 0) {
          setMessages((previous) => [
            ...previous,
            {
              id: tempId(),
              role: "assistant",
              content: assembled,
              createdAt: new Date().toISOString(),
            },
          ]);
        } else if (failed) {
          // Drop the optimistic user turn so retrying does not duplicate it.
          setMessages((previous) =>
            previous.filter((message) => message.id !== optimistic.id)
          );
          setInput(prompt);
        }

        void activeId;
      }
    },
    [conversationId, streaming]
  );

  function stop() {
    abortRef.current?.abort();
  }

  function startNew() {
    stop();
    setConversationId(null);
    setMessages([]);
    setStreamedText("");
    setError(null);
  }

  async function openConversation(id: string) {
    stop();
    setError(null);

    try {
      const response = await fetch(`/api/conversations/${id}`);
      if (!response.ok) throw new Error("Could not load that conversation.");

      const payload = (await response.json()) as {
        conversation: { conversationId: string; messages: ChatMessage[] };
      };

      setConversationId(payload.conversation.conversationId);
      setMessages(payload.conversation.messages);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not load that conversation."
      );
    }
  }

  async function removeConversation(id: string) {
    setConversations((previous) =>
      previous.filter((item) => item.conversationId !== id)
    );

    if (id === conversationId) startNew();

    try {
      await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    } catch {
      setError("Could not delete that conversation.");
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="truncate font-display text-base font-semibold tracking-tight">
            {conversationId
              ? conversations.find((c) => c.conversationId === conversationId)?.title ??
                "Conversation"
              : "Home"}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {hasConversation ? (
            <button
              type="button"
              onClick={startNew}
              className="btn-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </button>
          ) : null}
        </div>
      </div>

      {storageError ? (
        <div className="shrink-0 border-b border-border bg-destructive/10 px-4 py-2.5 lg:px-6">
          <p className="flex items-start gap-2 text-xs text-destructive">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {storageError}
          </p>
        </div>
      ) : null}

      {/* Composer - pinned above the transcript once a conversation exists.
          In the onboarding state it renders inline instead, inside the
          centered hero below. */}
      {hasConversation ? (
        <div className="shrink-0 border-b border-border bg-background px-4 py-4 lg:px-6">
          <div className="mx-auto w-full max-w-[860px]">
            <Composer
              value={input}
              onChange={setInput}
              onSubmit={() => void send(input)}
              streaming={streaming}
              onStop={stop}
              connectedCount={connectedNames.length}
            />
          </div>
        </div>
      ) : null}

      {/* Transcript */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        {!hasConversation ? (
          <div className="relative min-h-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 grid-bg"
            />

            <div className="relative mx-auto flex w-full max-w-[860px] flex-col px-5 py-10 sm:px-8 sm:py-12">
              <h2 className="font-display text-[26px] font-bold leading-tight tracking-tight sm:text-[30px]">
                Start your first gap analysis
              </h2>

              {/* Starting points */}
              <p className="mt-7 text-sm text-foreground/70">
                Explore a starting question
              </p>

              <div className="mt-3 rounded-2xl border border-border bg-card/20 p-3">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion.label}
                      type="button"
                      onClick={() => void send(suggestion.prompt)}
                      className="rounded-lg border border-border bg-secondary/60 px-2.5 py-1.5 text-xs font-medium text-foreground/85 transition-colors hover:border-primary/40 hover:bg-secondary hover:text-foreground"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <Composer
                    value={input}
                    onChange={setInput}
                    onSubmit={() => void send(input)}
                    streaming={streaming}
                    onStop={stop}
                    connectedCount={connectedNames.length}
                    autoFocus
                    highlighted
                  />
                </div>
              </div>

              {/* Bring your own evidence */}
              <p className="mt-10 text-sm text-foreground/70">
                ...or connect your own evidence
              </p>

              <div className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                <EvidenceTile
                  title="Connect your CRM"
                  connectorIds={["salesforce", "hubspot"]}
                />
                <EvidenceTile
                  title="Connect your database"
                  connectorIds={["postgresql", "mysql", "snowflake"]}
                />
              </div>

              {connectedNames.length > 0 ? (
                <p className="mt-6 text-xs text-muted-foreground">
                  Reading context from{" "}
                  <span className="text-foreground/80">
                    {connectedNames.join(", ")}
                  </span>
                  .
                </p>
              ) : null}

              {/* Recent conversations live at the bottom of home. */}
              {conversations.length > 0 ? (
                <div className="mt-10">
                  <p className="text-sm text-foreground/70">Recent</p>

                  <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                    {conversations.slice(0, 6).map((item) => (
                      <li key={item.conversationId} className="group flex items-center">
                        <button
                          type="button"
                          onClick={() => openConversation(item.conversationId)}
                          className="min-w-0 flex-1 truncate px-4 py-3 text-left text-sm text-foreground/85 transition-colors hover:bg-card/60 hover:text-foreground"
                        >
                          {item.title}
                        </button>
                        <span className="shrink-0 pr-2 text-xs text-muted-foreground">
                          {formatRelative(item.updatedAt)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeConversation(item.conversationId)}
                          aria-label={`Delete ${item.title}`}
                          className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-[860px] space-y-6 px-5 py-8 sm:px-8">
            {messages.map((message) => (
              <ChatTurn key={message.id} role={message.role} content={message.content} />
            ))}

            {streaming ? (
              <ChatTurn
                role="assistant"
                content={streamedText}
                pending={streamedText.length === 0}
              />
            ) : null}

            {error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3.5">
                <p className="flex items-start gap-2.5 text-sm text-destructive">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Shared composer. Rendered inline inside the onboarding hero, and pinned to
 * the top of the pane once a conversation is underway.
 */
function Composer({
  value,
  onChange,
  onSubmit,
  streaming,
  onStop,
  connectedCount,
  autoFocus = false,
  highlighted = false,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  streaming: boolean;
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
          "rounded-xl border bg-card/70 transition-colors focus-within:border-primary/60",
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
          rows={2}
          placeholder="Help me find..."
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

          {streaming ? (
            <button
              type="button"
              onClick={onStop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Square className="h-3 w-3" />
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={value.trim().length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors enabled:hover:bg-secondary enabled:hover:text-foreground disabled:opacity-45"
            >
              Submit
              <ArrowUp className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

/** Onboarding tile linking to the connectors page, showing real logos. */
function EvidenceTile({
  title,
  connectorIds,
}: {
  title: string;
  connectorIds: string[];
}) {
  const connectors = connectorIds
    .map((id) => getConnector(id))
    .filter((connector): connector is ConnectorDefinition => Boolean(connector));

  return (
    <Link
      href="/dashboard/connectors"
      className="group flex flex-col items-center gap-3.5 bg-background px-5 py-7 text-center transition-colors hover:bg-card/50"
    >
      <span className="text-sm text-foreground/80">{title}</span>

      <span className="flex items-center gap-2">
        {connectors.map((connector) =>
          connector.logo ? (
            <span
              key={connector.id}
              title={connector.name}
              className="relative h-7 w-7 overflow-hidden rounded-md bg-white/[0.06] p-1"
            >
              <Image
                src={connector.logo}
                alt={connector.name}
                fill
                sizes="28px"
                className="object-contain p-0.5"
              />
            </span>
          ) : null
        )}
        <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
          More
        </span>
      </span>
    </Link>
  );
}

function ChatTurn({
  role,
  content,
  pending = false,
}: {
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[15px] leading-relaxed">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/12">
        <Logo className="h-3.5 w-4 text-primary" />
      </span>
      <div className="min-w-0 flex-1">
        {pending ? (
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Analysing...
          </span>
        ) : (
          <Markdown content={content} />
        )}
      </div>
    </div>
  );
}
