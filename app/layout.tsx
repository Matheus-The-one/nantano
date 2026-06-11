import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ui/themwitcher";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nantano AI — Process Intelligence & Pattern Detection",
  description:
    "We structure enterprise data, detect process anomalies with AI, and deliver real-time alerts. Find hidden patterns and fix broken processes before they cost you.",
  keywords:
    "process intelligence, pattern detection, anomaly detection, enterprise ai, process monitoring, real-time alerts, nantano ai",
  openGraph: {
    title: "Nantano AI — Process Intelligence & Pattern Detection",
    description:
      "Structure data. Detect patterns. Get real-time alerts. AI-powered process intelligence for enterprises.",
    type: "website",
    url: "https://nantano.ai",
    siteName: "Nantano AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nantano AI — Process Intelligence & Pattern Detection",
    description:
      "Find hidden patterns. Fix broken processes. Real-time AI alerts.",
  },
  alternates: {
    canonical: "https://nantano.ai",
  },
  metadataBase: new URL("https://nantano.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VXK8K00TKJ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VXK8K00TKJ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link
                  href="/"
                  className="flex-shrink-0 font-bold text-xl hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Logo className="w-10 h-7 text-primary" />
                  NANTANO AI
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  <Navbar />
                  <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Button asChild size="sm">
                      <a href="mailto:contact@nantano.ai">Contact Us</a>
                    </Button>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-2">
                  <ModeToggle />
                  <Navbar />
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
