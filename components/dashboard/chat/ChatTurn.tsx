"use client";

import { useState } from "react";
import { getToolName, isToolUIPart } from "ai";
import type { DynamicToolUIPart } from "ai";
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Copy,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Markdown } from "@/components/dashboard/chat/Markdown";
import { toolActivityLabel } from "@/lib/ai/tool-labels";
import type { VeloxizUIMessage } from "@/lib/ai/messages";
import { cn } from "@/lib/utils";

type Part = VeloxizUIMessage["parts"][number];

/** Static tool parts for our own tools, plus the dynamic fallback shape. */
type AnyToolPart = Extract<Part, { type: `tool-${string}` }> | DynamicToolUIPart;

/**
 * One row per tool the agent used, so its side effects are never invisible.
 *
 * Accepts dynamic parts too: a persisted tool call whose schema has since
 * changed is replayed as `dynamic-tool` rather than its original type.
 */
function ToolActivity({ part }: { part: AnyToolPart }) {
  const label = toolActivityLabel(getToolName(part));

  const { icon, tone } =
    part.state === "output-error"
      ? { icon: <AlertTriangle className="h-3 w-3" />, tone: "text-destructive" }
      : part.state === "output-available"
        ? { icon: <Check className="h-3 w-3" />, tone: "text-primary" }
        : {
            icon: <Loader2 className="h-3 w-3 animate-spin" />,
            tone: "text-muted-foreground",
          };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className={cn("shrink-0", tone)}>{icon}</span>
      <span>{label}</span>
      {part.state === "output-error" ? (
        <span className="truncate text-destructive/80">{part.errorText}</span>
      ) : null}
    </div>
  );
}

/** Extended thinking, collapsed by default so it never buries the answer. */
function Reasoning({ text, streaming }: { text: string; streaming: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border/70 bg-card/30">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {streaming ? (
          <Loader2 className="h-3 w-3 shrink-0 animate-spin" />
        ) : (
          <Sparkles className="h-3 w-3 shrink-0 text-primary/70" />
        )}
        {streaming ? "Thinking" : "Thought process"}
        <ChevronRight
          className={cn(
            "ml-auto h-3 w-3 shrink-0 transition-transform",
            open && "rotate-90"
          )}
        />
      </button>

      {open ? (
        <p className="whitespace-pre-wrap border-t border-border/70 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function ChatTurn({
  message,
  streaming = false,
}: {
  message: VeloxizUIMessage;
  streaming?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  if (message.role === "user") {
    const text = message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");

    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] whitespace-pre-wrap rounded-3xl bg-secondary px-4 py-2.5 text-[15px] leading-relaxed">
          {text}
        </div>
      </div>
    );
  }

  const plainText = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim();

  async function copy() {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked by permissions; failing silently is fine.
    }
  }

  // An assistant turn is a sequence of parts: it may interleave tool calls,
  // reasoning, and several text blocks across multiple steps.
  const rendered = message.parts.flatMap((part, index) => {
    const key = `${message.id}-${index}`;

    if (part.type === "text") {
      if (part.text.trim().length === 0) return [];
      return [<Markdown key={key} content={part.text} />];
    }

    if (part.type === "reasoning") {
      if (part.text.trim().length === 0) return [];
      return [
        <Reasoning
          key={key}
          text={part.text}
          streaming={part.state === "streaming"}
        />,
      ];
    }

    if (isToolUIPart(part)) {
      return [<ToolActivity key={key} part={part} />];
    }

    // step-start, files, sources and data parts are not surfaced yet.
    return [];
  });

  return (
    <div className="group/turn flex gap-3.5">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/12">
        <Logo className="h-3.5 w-4 text-primary" />
      </span>

      <div className="min-w-0 flex-1 space-y-3">
        {rendered.length > 0 ? (
          rendered
        ) : streaming ? (
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Analysing...
          </span>
        ) : null}

        {/* Actions appear once the reply is complete. */}
        {!streaming && plainText.length > 0 ? (
          <div className="flex items-center gap-1 pt-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover/turn:opacity-100">
            <button
              type="button"
              onClick={() => void copy()}
              aria-label="Copy reply"
              className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
