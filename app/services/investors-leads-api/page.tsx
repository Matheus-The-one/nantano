import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Shield,
  Code,
  CheckCircle,
  Mail,
  Building,
  DollarSign,
  ExternalLink,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Investors Leads API on RapidAPI | Access Investor Contact Emails & Business Leads",
  description:
    "Access investor contact emails, business leads, funding data, and investment opportunities. Perfect for startups, fundraising platforms, and business development. Available on RapidAPI with verified contact information.",
  keywords:
    "investors api, business leads api, investor contacts api, funding data api, startup investors api, venture capital api, angel investors api, business contacts api, investor email api, leads generation api, fundraising api, investment opportunities api, business development api, investor database api, funding leads api",
  openGraph: {
    title:
      "Investors Leads API on RapidAPI | Access Investor Contact Emails & Business Leads",
    description:
      "Access investor contact emails, business leads, funding data, and investment opportunities. Perfect for startups, fundraising platforms, and business development.",
    type: "website",
    url: "https://nantano.ai/services/investors-leads-api",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Investors Leads API on RapidAPI | Access Investor Contact Emails & Business Leads",
    description:
      "Access investor contact emails, business leads, funding data, and investment opportunities.",
  },
  alternates: {
    canonical: "https://nantano.ai/services/investors-leads-api",
  },
};

export default function InvestorsLeadsApiPage() {
  const features = [
    {
      icon: Mail,
      title: "Verified Contact Emails",
      description:
        "Access verified investor email addresses, phone numbers, and contact information for direct outreach.",
    },
    {
      icon: Building,
      title: "Investment Firm Data",
      description:
        "Get comprehensive data about venture capital firms, angel investors, and investment companies.",
    },
    {
      icon: DollarSign,
      title: "Funding History & Preferences",
      description:
        "Access investment history, funding amounts, preferred industries, and investment criteria.",
    },
  ];

  const useCases = [
    "Startup fundraising platforms",
    "Business development tools",
    "Investment research platforms",
    "CRM and lead management systems",
    "Pitch deck distribution services",
    "Investor matching platforms",
    "Funding opportunity databases",
    "Venture capital research tools",
  ];

  const apiEndpoints = [
    {
      endpoint: "/investors",
      method: "GET",
      description:
        "Retrieve investors with filtering by industry, location, and investment stage",
    },
    {
      endpoint: "/investors/{id}",
      method: "GET",
      description: "Get detailed information about a specific investor or firm",
    },
    {
      endpoint: "/leads",
      method: "GET",
      description:
        "Get business leads with contact information and company details",
    },
    {
      endpoint: "/search",
      method: "GET",
      description: "Search investors by name, company, or investment focus",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-4">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-primary">Investors Leads API</span> on
              RapidAPI
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Access investor contact emails, business leads, funding data, and
              investment opportunities. Perfect for startups, fundraising
              platforms, and business development.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href="https://rapidapi.com/matepapava123/api/investors-leads-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Access on RapidAPI
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                20,000+ API calls
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                100+ paying customers
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                99.9% uptime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Our Investors Leads API?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive investment data access with verified contact
              information
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <div className="rounded-md bg-primary/10 p-2 w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              API Endpoints
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Powerful endpoints to access investors and business leads data
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Perfect For
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Build powerful business and investment applications
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg bg-background border border-border/50"
              >
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                <span className="text-sm font-medium">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Quick Start
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get started with Investors Leads API in minutes
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Investors Leads API Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted/50 p-4">
                  <pre className="text-sm leading-relaxed overflow-x-auto">
                    <code className="text-muted-foreground font-mono">
                      {`// Search investors by industry and location
const response = await fetch('https://investors-api.p.rapidapi.com/search?industry=technology&location=San Francisco', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'investors-api.p.rapidapi.com'
  }
});

const investors = await response.json();
console.log(investors);

// Get investor details with contact information
const investorResponse = await fetch('https://investors-api.p.rapidapi.com/investors/12345', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'investors-api.p.rapidapi.com'
  }
});

const investor = await investorResponse.json();
console.log(investor.contact_email);`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-12 shadow-lg border border-border/50">
              <div className="mb-4">
                <TrendingUp className="h-16 w-16 text-primary mx-auto" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Start Building Investment Tools
              </h2>

              <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto mb-8">
                Access verified investor contacts and business leads data to
                build amazing fundraising and business development applications.
                Join 100+ developers already using our Investors Leads API on
                RapidAPI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://rapidapi.com/matepapava123/api/investors-leads-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Get Started on RapidAPI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                Free tier available • No credit card required • 24/7 support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Investors Leads API",
            description:
              "Access investor contact emails, business leads, funding data, and investment opportunities",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: "Nantano AI",
              url: "https://nantano.ai",
            },
          }),
        }}
      />
    </div>
  );
}
