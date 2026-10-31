"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.53 5.53 0 0 1-2.4 3.63v3.01h3.88c2.27-2.09 3.58-5.17 3.58-8.83Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.9l-3.88-3.01c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.3v3.12A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.6H1.3a12 12 0 0 0 0 10.8l3.97-3.12Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.3 6.6l3.97 3.12C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

/**
 * Submits a real form POST to the OAuth start route, so the flow works without
 * JavaScript and is never triggered by a link prefetch. The pending state only
 * adds the spinner.
 */
export function GoogleButton({ next }: { next?: string }) {
  const [pending, setPending] = useState(false);

  // next travels in the query string because the start route reads search
  // params, not the form body.
  const action = next
    ? `/api/auth/google/start?next=${encodeURIComponent(next)}`
    : "/api/auth/google/start";

  return (
    <form action={action} method="post" onSubmit={() => setPending(true)}>
      <button
        type="submit"
        disabled={pending}
        className="btn-ink inline-flex w-full items-center justify-center gap-3 rounded-full px-5 py-3.5 text-sm font-semibold transition-opacity disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="h-[18px] w-[18px] animate-spin" />
        ) : (
          <GoogleGlyph />
        )}
        {pending ? "Redirecting to Google..." : "Continue with Google"}
      </button>
    </form>
  );
}
