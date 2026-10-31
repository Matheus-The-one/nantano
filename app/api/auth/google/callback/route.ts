import { NextResponse, type NextRequest } from "next/server";
import { exchangeCode } from "@/lib/auth/google";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSessionToken,
} from "@/lib/auth/session";
import { upsertUser } from "@/lib/db/users";
import { isAccessDenied } from "@/lib/db/client";
import {
  OAUTH_NEXT_COOKIE,
  OAUTH_STATE_COOKIE,
  OAUTH_VERIFIER_COOKIE,
} from "@/app/api/auth/google/start/route";

function failure(request: NextRequest, message: string) {
  const response = NextResponse.redirect(
    new URL(`/signin?error=${encodeURIComponent(message)}`, request.url)
  );
  clearTransientCookies(response);
  return response;
}

function clearTransientCookies(response: NextResponse) {
  for (const name of [
    OAUTH_STATE_COOKIE,
    OAUTH_VERIFIER_COOKIE,
    OAUTH_NEXT_COOKIE,
  ]) {
    response.cookies.set(name, "", { path: "/", maxAge: 0 });
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const oauthError = url.searchParams.get("error");
  if (oauthError) {
    return failure(
      request,
      oauthError === "access_denied"
        ? "Sign-in was cancelled."
        : `Google returned an error: ${oauthError}`
    );
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;
  const verifier = request.cookies.get(OAUTH_VERIFIER_COOKIE)?.value;
  const nextPath = request.cookies.get(OAUTH_NEXT_COOKIE)?.value ?? "/dashboard";

  if (!code || !state || !expectedState || !verifier) {
    return failure(
      request,
      "Sign-in session expired. Please try again."
    );
  }

  if (state !== expectedState) {
    return failure(request, "Invalid sign-in state. Please try again.");
  }

  let profile;
  try {
    ({ profile } = await exchangeCode(code, verifier));
  } catch (error) {
    console.error("[auth] Google code exchange failed", error);
    return failure(request, "Could not verify your Google account. Please try again.");
  }

  try {
    await upsertUser({
      userId: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });
  } catch (error) {
    console.error("[auth] Failed to persist user", error);

    if (isAccessDenied(error)) {
      return failure(
        request,
        "Database access denied. The AWS credentials need DynamoDB permissions on the VELOXIZ_ tables."
      );
    }

    return failure(request, "Could not create your account. Please try again.");
  }

  const token = await signSessionToken({
    userId: profile.sub,
    email: profile.email,
    name: profile.name,
    picture: profile.picture,
  });

  const response = NextResponse.redirect(new URL(nextPath, request.url));
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  clearTransientCookies(response);

  return response;
}
