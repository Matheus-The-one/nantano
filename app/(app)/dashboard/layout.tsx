import type { Metadata } from "next";
import { requireSession } from "@/lib/auth/server";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ChatHistoryProvider } from "@/components/dashboard/chat/ChatHistoryContext";
import { listConversations } from "@/lib/db/conversations";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dashboard - Veloxiz",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  // Chat history lives in the sidebar on every dashboard page, so it is
  // loaded here. A Dynamo failure must not take down the whole dashboard.
  let conversations: Awaited<ReturnType<typeof listConversations>> = [];
  try {
    conversations = await listConversations(session.userId);
  } catch (error) {
    console.error("[dashboard] Could not load chat history", error);
  }

  return (
    <ChatHistoryProvider initial={conversations}>
      <div className="flex h-screen overflow-hidden bg-background">
        <DashboardSidebar user={session} />
        {/* pt-14 clears the fixed mobile top bar; the sidebar is static on lg+. */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-14 lg:pt-0">
          {children}
        </div>
        <Toaster />
      </div>
    </ChatHistoryProvider>
  );
}
