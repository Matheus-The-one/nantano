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
    "Access premium domains and comprehensive APIs designed specifically for Large Language Models. Build the future of AI with Nantano Studio.",
  keywords:
    "domains, llm apis, ai apis, rapidapi, developer apis, ai development, llm integrations, nantano studio",
  openGraph: {
    title: "Nantano Studio - Domains and APIs for LLMs",
    description:
      "Access premium domains and comprehensive APIs specifically designed for Large Language Models.",
    type: "website",
    url: "https://nantano.studio",
    siteName: "Nantano Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nantano Studio - Domains and APIs for LLMs",
    description:
      "Access premium domains and comprehensive APIs specifically designed for Large Language Models.",
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
                  <div className="bg-primary text-primary-foreground p-1 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                  </div>
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
