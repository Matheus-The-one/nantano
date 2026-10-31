import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { GoogleButton } from "@/app/signin/GoogleButton";
import { getSession } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Sign in - Veloxiz",
  description:
    "Sign in to Veloxiz to connect your evidence and start surfacing business gaps.",
  robots: { index: false, follow: false },
};

const valueProps = [
  "Connect CRM, warehouse, email, and support in minutes",
  "Impact-ranked gaps with the evidence trail attached",
  "Ask anything about your market in plain language",
];

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;

  if (session) redirect(params.next ?? "/dashboard");

  return (
    <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel - hero imagery with the same scrim + grain as the landing page */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* object-position pulls the canyon horizon up, since a 1.94:1 source is
            being cover-cropped into a portrait panel. */}
        <Image
          src="/brand/hero-ui.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 1200px, 0px"
          className="object-cover object-[center_35%]"
        />
        {/* Scrim is weighted at both ends: the bottom carries the body text,
            the top lifts the logo and eyebrow off the bright sky. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />
        <div className="absolute inset-0 grain" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-8 text-primary" />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Veloxiz
            </span>
          </div>

          <div className="max-w-md">
            <p className="inline-flex items-center rounded-full bg-ink/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
              Business gap intelligence
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white">
              Find the gaps{" "}
              <em className="font-medium italic text-primary">your business</em>{" "}
              can&apos;t see
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">
              Veloxiz scans your market, customers, and operations to surface
              revenue gaps, unmet demand, and strategic blind spots - before
              competitors do.
            </p>

            <ul className="mt-8 space-y-3.5">
              {valueProps.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/55">
            Trusted by growth and strategy teams
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12">
        <Link
          href="/"
          className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:left-12 sm:top-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <Logo className="h-6 w-8 text-primary" />
            <span className="font-display text-lg font-bold tracking-tight">
              Veloxiz
            </span>
          </div>

          <h2 className="font-display text-[28px] font-bold leading-tight tracking-tight">
            Sign in to Veloxiz
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            Use your Google account. No password to manage, and we never see
            your credentials.
          </p>

          {params.error ? (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {params.error}
            </p>
          ) : null}

          <div className="mt-8">
            <GoogleButton next={params.next} />
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            By continuing you agree to our{" "}
            <Link href="/terms" className="text-foreground underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
