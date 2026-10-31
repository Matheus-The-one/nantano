import { createRemoteJWKSet, jwtVerify } from "jose";

const GOOGLE_ISSUERS = ["https://accounts.google.com", "accounts.google.com"];
const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const JWKS_URL = new URL("https://www.googleapis.com/oauth2/v3/certs");

/** Cached across requests; jose handles its own key refresh and TTL. */
const jwks = createRemoteJWKSet(JWKS_URL);

export type GoogleProfile = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
};

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing ${key}. Add it to .env.local - see .env.example for the full list.`
    );
  }
  return value;
}

export function getClientId(): string {
  return requireEnv("GOOGLE_CLIENT_ID");
}

/**
 * The redirect URI must byte-for-byte match an entry in the Google client's
 * authorized redirect URIs, so it is derived from one env var only.
 */
export function getRedirectUri(): string {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  return `${appUrl.replace(/\/$/, "")}/api/auth/google/callback`;
}

/** base64url without padding, per RFC 7636. */
function base64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64url");
}

export function createVerifier(): string {
  return base64Url(crypto.getRandomValues(new Uint8Array(32)));
}

export function createState(): string {
  return base64Url(crypto.getRandomValues(new Uint8Array(16)));
}

export async function deriveChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier)
  );
  return base64Url(new Uint8Array(digest));
}

export type ConsentUrlInput = {
  state: string;
  codeChallenge: string;
  /** Extra scopes beyond the base identity set, for connector authorization. */
  additionalScopes?: string[];
  /** Forces the account chooser, used by the "switch account" affordance. */
  prompt?: "consent" | "select_account";
};

export function buildConsentUrl(input: ConsentUrlInput): string {
  const scopes = ["openid", "email", "profile", ...(input.additionalScopes ?? [])];

  const params = new URLSearchParams({
    client_id: getClientId(),
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: scopes.join(" "),
    state: input.state,
    code_challenge: input.codeChallenge,
    code_challenge_method: "S256",
    access_type: "offline",
    include_granted_scopes: "true",
  });

  if (input.prompt) params.set("prompt", input.prompt);

  return `${AUTH_ENDPOINT}?${params.toString()}`;
}

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  id_token?: string;
  error?: string;
  error_description?: string;
};

export type ExchangeResult = {
  profile: GoogleProfile;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
};

/**
 * Exchanges an authorization code for tokens and verifies the returned
 * id_token against Google's JWKS. Throws on any verification failure, so the
 * caller can treat a resolved value as authenticated.
 */
export async function exchangeCode(
  code: string,
  verifier: string
): Promise<ExchangeResult> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: getClientId(),
      client_secret: requireEnv("GOOGLE_CLIENT_SECRET"),
      redirect_uri: getRedirectUri(),
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as TokenResponse;

  if (!response.ok || payload.error) {
    throw new Error(
      `Google token exchange failed: ${payload.error_description ?? payload.error ?? response.status}`
    );
  }

  if (!payload.id_token) {
    throw new Error("Google token response did not include an id_token.");
  }

  const { payload: claims } = await jwtVerify(payload.id_token, jwks, {
    issuer: GOOGLE_ISSUERS,
    audience: getClientId(),
  });

  if (typeof claims.sub !== "string" || typeof claims.email !== "string") {
    throw new Error("Google id_token is missing the sub or email claim.");
  }

  if (claims.email_verified === false) {
    throw new Error("This Google account does not have a verified email address.");
  }

  return {
    profile: {
      sub: claims.sub,
      email: claims.email,
      name:
        typeof claims.name === "string" && claims.name.length > 0
          ? claims.name
          : claims.email.split("@")[0],
      picture: typeof claims.picture === "string" ? claims.picture : undefined,
    },
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresAt: payload.expires_in
      ? new Date(Date.now() + payload.expires_in * 1000).toISOString()
      : undefined,
  };
}
