import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * Gate for the dashboard. Verifies the session JWT at the edge so unauthenticated
 * requests never reach a server component that would hit DynamoDB.
 *
 * Named `proxy` per the Next.js 16 convention that replaces `middleware`.
 */
export default async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (session) return NextResponse.next();

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  const response = NextResponse.redirect(signInUrl);

  // Clear a stale or tampered cookie so the user is not stuck in a redirect loop.
  if (token) {
    response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  }

  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
