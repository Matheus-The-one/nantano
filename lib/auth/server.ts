import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/auth/session";

/**
 * Server-only session access. Separate from lib/auth/session so middleware can
 * import the token helpers without pulling in next/headers.
 */

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * For pages and route handlers that cannot render without a user. Middleware
 * already guards /dashboard/*, so reaching the redirect here means the cookie
 * expired mid-session.
 */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/signin");
  return session;
}
