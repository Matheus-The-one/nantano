import type { Metadata } from "next";
import { DM_Sans, Syne, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veloxiz - Find the business gaps your team can't see",
  description:
    "AI that scans your market, customers, and operations to surface revenue gaps, unmet demand, and strategic blind spots - before competitors do.",
  keywords:
    "business gap analysis, ai market intelligence, revenue gaps, competitive intelligence, opportunity discovery, Veloxiz",
  openGraph: {
    title: "Veloxiz - Find the business gaps your team can't see",
    description:
      "AI-powered business gap discovery. Spot missed revenue, unmet demand, and strategic blind spots.",
    type: "website",
    url: "https://Veloxiz.ai",
    siteName: "Veloxiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veloxiz - Find the business gaps your team can't see",
    description:
      "AI that finds revenue gaps, unmet demand, and strategic blind spots.",
  },
  alternates: {
    canonical: "https://Veloxiz.ai",
  },
  metadataBase: new URL("https://Veloxiz.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <head>
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
        className={`${dmSans.variable} ${syne.variable} ${geistMono.variable} font-sans antialiased min-h-screen overflow-x-hidden bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
