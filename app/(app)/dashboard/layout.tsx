import type { Metadata } from "next";
import { requireSession } from "@/lib/auth/server";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar user={session} />
      {/* pt-14 clears the fixed mobile top bar; the sidebar is static on lg+. */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden pt-14 lg:pt-0">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
