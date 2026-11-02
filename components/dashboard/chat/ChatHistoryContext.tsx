"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { deriveTitle } from "@/lib/ai/messages";
import type { ConversationSummary } from "@/lib/conversations/schema";

/**
 * Shared chat history.
 *
 * The sidebar and the chat pane are rendered by different parts of the tree
 * (layout vs page), so the list of conversations lives in context. The server
 * seeds it on first render; the chat pane updates it as turns complete, which
 * keeps the sidebar current without a refetch.
 */
type ChatHistoryValue = {
  conversations: ConversationSummary[];
  /** True when the server has more conversations than were seeded here. */
  hasMore: boolean;
  /** Records activity for a conversation, moving it to the top of the list. */
  touch: (conversationId: string, firstUserText: string) => void;
  remove: (conversationId: string) => void;
};

const ChatHistoryContext = createContext<ChatHistoryValue | null>(null);

export function ChatHistoryProvider({
  initial,
  hasMore = false,
  children,
}: {
  initial: ConversationSummary[];
  hasMore?: boolean;
  children: ReactNode;
}) {
  const [conversations, setConversations] = useState(initial);

  const touch = useCallback(
    (conversationId: string, firstUserText: string) => {
      setConversations((previous) => {
        const existing = previous.find(
          (item) => item.conversationId === conversationId
        );

        const entry: ConversationSummary = {
          conversationId,
          // Keep the server-derived title once it exists; only a brand new
          // conversation needs one invented on the client.
          title: existing?.title ?? deriveTitle(firstUserText),
          updatedAt: new Date().toISOString(),
        };

        return [
          entry,
          ...previous.filter((item) => item.conversationId !== conversationId),
        ];
      });
    },
    []
  );

  const remove = useCallback((conversationId: string) => {
    setConversations((previous) =>
      previous.filter((item) => item.conversationId !== conversationId)
    );
  }, []);

  const value = useMemo(
    () => ({ conversations, hasMore, touch, remove }),
    [conversations, hasMore, touch, remove]
  );

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory(): ChatHistoryValue {
  const value = useContext(ChatHistoryContext);
  if (!value) {
    throw new Error("useChatHistory must be used inside ChatHistoryProvider.");
  }
  return value;
}
