import Link from "next/link";
import { LogOut, Mail, Plug, ShieldCheck } from "lucide-react";
import { requireSession } from "@/lib/auth/server";
import { listConnections } from "@/lib/db/connectors";
import { getUser } from "@/lib/db/users";
import { getConnector } from "@/lib/connectors/catalog";
import { PageHeader, PAGE_WIDTH } from "@/components/dashboard/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function formatDate(value: string | undefined): string {
  if (!value) return "Unknown";
  return new Date(value).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function SettingsPage() {
  const session = await requireSession();

  const [user, connections] = await Promise.all([
    getUser(session.userId).catch(() => null),
    listConnections(session.userId).catch(() => []),
  ]);

  const connectedNames = connections
    .map((record) => getConnector(record.connectorId)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Your profile comes from Google. Veloxiz never stores a password."
        centered
      />

      <div className={`mx-auto w-full ${PAGE_WIDTH} space-y-6 px-5 py-6 sm:px-8`}>
        {/* Profile */}
        <section className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border border-border">
              {session.picture ? <AvatarImage src={session.picture} alt="" /> : null}
              <AvatarFallback className="bg-primary/15 text-base font-semibold text-primary">
                {session.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold tracking-tight">
                {session.name}
              </p>
              <p className="flex items-center gap-1.5 truncate text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {session.email}
              </p>
            </div>
          </div>

          <dl className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Signed in with</dt>
              <dd className="mt-1 text-sm">Google</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Member since</dt>
              <dd className="mt-1 text-sm">{formatDate(user?.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Last sign-in</dt>
              <dd className="mt-1 text-sm">{formatDate(user?.lastLoginAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">User ID</dt>
              <dd className="mt-1 truncate font-mono text-xs text-muted-foreground">
                {session.userId}
              </dd>
            </div>
          </dl>
        </section>

        {/* Connected sources */}
        <section className="rounded-2xl border border-border bg-card/40 p-5">
          <h2 className="font-display text-base font-semibold tracking-tight">
            Connected sources
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {connectedNames.length === 0
              ? "No sources connected yet."
              : `${connectedNames.length} connected: ${connectedNames.join(", ")}.`}
          </p>

          <Link
            href="/dashboard/connectors"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <Plug className="h-3.5 w-3.5 text-primary" />
            Manage connectors
          </Link>
        </section>

        {/* Privacy */}
        <section className="rounded-2xl border border-border bg-card/40 p-5">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Data and privacy
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Connectors request read-only scopes. Veloxiz never writes to a source.</li>
            <li>Disconnecting a source removes its connection record immediately.</li>
            <li>
              Read our{" "}
              <Link
                href="/privacy"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                Terms
              </Link>
              .
            </li>
          </ul>
        </section>

        {/* Session */}
        <section className="rounded-2xl border border-border bg-card/40 p-5">
          <h2 className="font-display text-base font-semibold tracking-tight">
            Session
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Signing out clears your session cookie on this device.
          </p>

          <form action="/api/auth/signout" method="post" className="mt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
