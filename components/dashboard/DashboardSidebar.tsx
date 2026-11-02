"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronLeft,
  LogOut,
  MessagesSquare,
  Network,
  PanelLeft,
  Plug,
  Settings,
  SquarePen,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ChatHistoryList } from "@/components/dashboard/ChatHistoryList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { SessionPayload } from "@/lib/auth/session";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

/** Mirrors the product pipeline: ask, connect evidence, diagnose, remember. */
const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: MessagesSquare,
    description: "Ask for a brief",
  },
  {
    name: "Connectors",
    href: "/dashboard/connectors",
    icon: Plug,
    description: "Connect your evidence",
  },
  {
    name: "Root cause analysis",
    href: "/dashboard/process",
    icon: Network,
    description: "Diagnose where work breaks",
  },
  {
    name: "Knowledge base",
    href: "/dashboard/knowledge",
    icon: BookOpen,
    description: "What Veloxiz has learned",
  },
];

function initials(name: string, email: string): string {
  const source = name.trim() || email;
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function DashboardSidebar({ user }: { user: SessionPayload }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string): boolean {
    // An open conversation is represented by its own highlighted row in the
    // history list below, so Home deselects to avoid two active items.
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const nav = (
    <nav className="flex flex-col gap-1 px-3 py-4">
      <Link
        href="/dashboard"
        onClick={() => setMobileOpen(false)}
        title={collapsed ? "New chat" : undefined}
        className={cn(
          "group mb-1 flex items-center gap-3 rounded-xl border border-sidebar-border px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60",
          collapsed && "justify-center px-0"
        )}
      >
        <SquarePen className="h-[18px] w-[18px] shrink-0 text-primary" />
        {!collapsed ? <span className="truncate">New chat</span> : null}
      </Link>

      {navItems.map((item) => {
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? item.name : undefined}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              collapsed && "justify-center px-0"
            )}
          >
            <item.icon
              className={cn(
                "h-[18px] w-[18px] shrink-0 transition-colors",
                active ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
              )}
            />
            {!collapsed ? <span className="truncate">{item.name}</span> : null}
          </Link>
        );
      })}
    </nav>
  );

  const userMenu = (
    <div className="border-t border-sidebar-border p-3">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-sidebar-accent/60",
            collapsed && "justify-center px-0"
          )}
        >
          <Avatar className="h-8 w-8 shrink-0 border border-sidebar-border">
            {user.picture ? (
              <AvatarImage src={user.picture} alt="" />
            ) : null}
            <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
              {initials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
          {!collapsed ? (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-sidebar-foreground">
                {user.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </span>
          ) : null}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" side="top" className="w-60">
          <DropdownMenuLabel className="font-normal">
            <span className="block truncate text-sm font-medium">{user.name}</span>
            <span className="block truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild variant="destructive">
            {/* Form POST so sign-out cannot be triggered by a prefetch or image tag. */}
            <form action="/api/auth/signout" method="post" className="w-full">
              <button type="submit" className="flex w-full items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <PanelLeft className="h-[18px] w-[18px]" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="h-5 w-6 text-primary" />
          <span className="font-display text-base font-bold tracking-tight">
            Veloxiz
          </span>
        </Link>
      </div>

      {mobileOpen ? (
        <div
          role="presentation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 lg:static lg:translate-x-0",
          collapsed ? "lg:w-[68px]" : "lg:w-64",
          "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div
          className={cn(
            "flex h-14 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4",
            collapsed && "lg:justify-center lg:px-0"
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Logo className="h-5 w-6 shrink-0 text-primary" />
            {!collapsed ? (
              <span className="font-display text-base font-bold tracking-tight">
                Veloxiz
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "ml-auto hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:flex",
              collapsed && "lg:hidden"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            className="mx-auto mt-3 hidden h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground lg:flex"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        ) : null}

        {nav}

        {/* Chat history fills the remaining space and scrolls on its own. The
            collapsed rail is icon-width only, so it is hidden there. */}
        {collapsed ? (
          <div className="flex-1" />
        ) : (
          <ChatHistoryList onNavigate={() => setMobileOpen(false)} />
        )}

        {userMenu}
      </aside>
    </>
  );
}
