import { NextResponse, type NextRequest } from "next/server";
import {
  buildConsentUrl,
  createState,
  createVerifier,
  deriveChallenge,
} from "@/lib/auth/google";

/**
 * Begins the OAuth flow. The PKCE verifier and CSRF state are stashed in
 * short-lived httpOnly cookies so the callback can validate them without
 * server-side session storage.
 */

export const OAUTH_STATE_COOKIE = "veloxiz_oauth_state";
export const OAUTH_VERIFIER_COOKIE = "veloxiz_oauth_verifier";
export const OAUTH_NEXT_COOKIE = "veloxiz_oauth_next";

const TRANSIENT_COOKIE_MAX_AGE = 60 * 10; // 10 minutes

/** Only same-origin relative paths are accepted, to prevent open redirects. */
function safeNextPath(raw: string | null): string {
  if (!raw) return "/dashboard";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}

async function start(request: NextRequest) {
  const state = createState();
  const verifier = createVerifier();
  const codeChallenge = await deriveChallenge(verifier);

  const url = new URL(request.url);
  const nextPath = safeNextPath(url.searchParams.get("next"));
  const prompt =
    url.searchParams.get("prompt") === "select_account"
      ? ("select_account" as const)
      : undefined;

  let consentUrl: string;
  try {
    consentUrl = buildConsentUrl({ state, codeChallenge, prompt });
  } catch (error) {
    // Misconfigured env - surface it on the sign-in page rather than at Google.
    const message =
      error instanceof Error ? error.message : "OAuth is not configured.";
    return NextResponse.redirect(
      new URL(`/signin?error=${encodeURIComponent(message)}`, request.url)
    );
  }

  const response = NextResponse.redirect(consentUrl);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: TRANSIENT_COOKIE_MAX_AGE,
  };

  response.cookies.set(OAUTH_STATE_COOKIE, state, options);
  response.cookies.set(OAUTH_VERIFIER_COOKIE, verifier, options);
  response.cookies.set(OAUTH_NEXT_COOKIE, nextPath, options);

  return response;
}

// POST is the real entry point (the sign-in button submits a form, which keeps
// the flow out of link prefetchers). GET is supported for direct navigation.
export const POST = start;
export const GET = start;
