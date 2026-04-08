import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ui/themwitcher";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nantano Studio - Domains and APIs for LLMs",
  description:
    "Access comprehensive APIs designed specifically for Large Language Models. Build the future of AI with Nantano Studio.",
  keywords:
    "domains, llm apis, ai apis, rapidapi, developer apis, ai development, llm integrations, nantano studio",
  openGraph: {
    title: "Nantano Studio - Domains and APIs for LLMs",
    description:
      "Access  comprehensive APIs specifically designed for Large Language Models.",
    type: "website",
    url: "https://nantano.studio",
    siteName: "Nantano Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nantano Studio - Domains and APIs for LLMs",
    description:
      "Access comprehensive APIs specifically designed for Large Language Models.",
  },
  alternates: {
    canonical: "https://nantano.studio",
  },
  metadataBase: new URL("https://nantano.studio"),
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
                  <svg viewBox="0 0 36 36" className="w-9 h-9 text-primary" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="18 3 31 10.5 31 25.5 18 33 5 25.5 5 10.5" />
                    <path d="M11 12V24" />
                    <path d="M25 12V24" />
                    <path d="M11 12L25 24" />
                  </svg>
                  NANTANO STUDIO
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  <Navbar />
                  <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Button asChild size="sm">
                      <a href="mailto:contact@nantano.studio">Contact Us</a>
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
