"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { ChatHome } from "@/components/dashboard/chat/ChatHome";
import { ChatTurn } from "@/components/dashboard/chat/ChatTurn";
import { Composer } from "@/components/dashboard/chat/Composer";
import { useChatHistory } from "@/components/dashboard/chat/ChatHistoryContext";
import { messageText, type VeloxizUIMessage } from "@/lib/ai/messages";

/**
 * One conversation. Laid out like a standard chat client: the transcript
 * scrolls in the middle and the composer is docked at the bottom.
 *
 * Mounted with a `key` of its conversation id so switching chats remounts
 * with fresh history rather than mutating `useChat` state in place.
 */
export function ChatSession({
  conversationId,
  initialMessages,
  title,
  connectedNames,
  storageError,
  /** True on /dashboard, where an empty chat shows the onboarding hero. */
  isNew = false,
}: {
  conversationId: string;
  initialMessages: VeloxizUIMessage[];
  title: string | null;
  connectedNames: string[];
  storageError: string | null;
  isNew?: boolean;
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { touch } = useChatHistory();

  const transport = useMemo(
    () =>
      new DefaultChatTransport<VeloxizUIMessage>({
        api: "/api/chat",
        // Only the newest message goes over the wire; the server reads history
        // from DynamoDB so the browser cannot rewrite past turns.
        prepareSendMessagesRequest: ({ id, messages, trigger, messageId }) => ({
          body: {
            id,
            trigger,
            messageId,
            message: messages[messages.length - 1],
          },
        }),
      }),
    []
  );

  const { messages, sendMessage, status, error, stop, regenerate, clearError } =
    useChat<VeloxizUIMessage>({
      id: conversationId,
      messages: initialMessages,
      transport,
      onFinish: ({ messages: finalMessages }) => {
        const firstUser = finalMessages.find(
          (message) => message.role === "user"
        );
        if (!firstUser) return;

        // Keeps the sidebar in step as turns land. The server already derived
        // the real title, so refresh once a new chat gets its first reply.
        touch(conversationId, messageText(firstUser));
        if (isNew) router.refresh();
      },
    });

  const busy = status === "submitted" || status === "streaming";
  const hasConversation = messages.length > 0;

  // Follow the newest turn as it streams, the way a chat client should.
  useEffect(() => {
    if (!hasConversation) return;
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, hasConversation]);

  function submit(text: string) {
    const prompt = text.trim();
    if (prompt.length === 0 || busy) return;

    clearError();
    setInput("");
    void sendMessage({ text: prompt });

    // Give the new chat its own URL so it is linkable and survives a reload.
    if (isNew) {
      window.history.replaceState(null, "", `/dashboard/c/${conversationId}`);
    }
  }

  const composer = (
    <Composer
      value={input}
      onChange={setInput}
      onSubmit={() => submit(input)}
      busy={busy}
      onStop={stop}
      connectedCount={connectedNames.length}
      autoFocus
      highlighted={!hasConversation}
    />
  );

  const lastMessage = messages[messages.length - 1];
  const awaitingFirstChunk =
    status === "submitted" && lastMessage?.role !== "assistant";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4 lg:px-6">
        <h1 className="truncate font-display text-base font-semibold tracking-tight">
          {hasConversation ? (title ?? "New chat") : "Home"}
        </h1>
      </div>

      {storageError ? (
        <div className="shrink-0 border-b border-border bg-destructive/10 px-4 py-2.5 lg:px-6">
          <p className="flex items-start gap-2 text-xs text-destructive">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {storageError}
          </p>
        </div>
      ) : null}

      {/* Transcript. Scrolls between the header and the docked composer. */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {hasConversation ? (
          <div className="mx-auto w-full max-w-[760px] space-y-7 px-5 py-8 sm:px-8">
            {messages.map((message, index) => (
              <ChatTurn
                key={message.id}
                message={message}
                streaming={status === "streaming" && index === messages.length - 1}
              />
            ))}

            {awaitingFirstChunk ? (
              <ChatTurn
                message={{ id: "pending", role: "assistant", parts: [] }}
                streaming
              />
            ) : null}

            {error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3.5">
                <p className="flex items-start gap-2.5 text-sm text-destructive">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error.message}</span>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    clearError();
                    void regenerate();
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <RefreshCw className="h-3 w-3" />
                  Retry
                </button>
              </div>
            ) : null}

            {/* Scroll anchor, kept clear of the composer. */}
            <div ref={bottomRef} className="h-1" />
          </div>
        ) : (
          <ChatHome
            connectedNames={connectedNames}
            onSuggestion={submit}
          />
        )}
      </div>

      {/* Composer docked at the bottom. */}
      <div className="shrink-0 border-t border-border bg-background px-4 pb-4 pt-3 lg:px-6">
        <div className="mx-auto w-full max-w-[760px]">
          {composer}
          <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
            Veloxiz proposes; verify against your own data before acting.
          </p>
        </div>
      </div>
    </div>
  );
}
