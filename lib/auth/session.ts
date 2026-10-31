import { SignJWT, jwtVerify } from "jose";

/**
 * Pure token helpers with no Node or next/headers dependency, so this module
 * is safe to import from middleware running on the edge runtime.
 */

export const SESSION_COOKIE = "veloxiz_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

const ISSUER = "veloxiz";
const AUDIENCE = "veloxiz-dashboard";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  picture?: string;
};

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "Missing AUTH_SECRET. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('base64url'))\""
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .setSubject(payload.userId)
    .sign(getSecret());
}

/** Returns null for any invalid, expired, or tampered token. */
export async function verifySessionToken(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    if (typeof payload.userId !== "string" || typeof payload.email !== "string") {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : payload.email,
      picture: typeof payload.picture === "string" ? payload.picture : undefined,
    };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
