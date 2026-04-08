import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Zap,
  TrendingUp,
  Users,
  Crown,
  Coffee,
  Activity,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import Script from "next/script";

type PricingTier = {
  plan: string;
  price: string;
  limit: string;
  note?: string;
};

type API = {
  name: string;
  description: string;
  rapidApiUrl: string;
  features: string[];
  status: "Live" | "Coming Soon";
  icon: any; // Using 'any' for Lucide icons
  gradient: string;
  pricing?: PricingTier[];
  endpoints?: string[];
};

export const metadata = {
  title: "API Pricing - NANTANO | Rotten Tomatoes API & More",
  description:
    "Explore our flexible API pricing plans including the Rotten Tomatoes API for movie data, ratings and reviews. Free tiers available for all APIs.",
  keywords:
    "Rotten Tomatoes API, movie API, API pricing, free API, movie ratings API, movie reviews API",
};

export default function PricingPage() {
  const apis = [
    {
      name: "Rotten Tomato API",
      description:
        "Access comprehensive movie data, ratings, and reviews from the trusted Rotten Tomatoes platform",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/rottentomato",
      features: [
        "Movie ratings & reviews",
        "Box office data",
        "Cast & crew information",
        "Streaming availability",
        "Critics scores & reviews",
        "Movie posters & spoilers",
      ],
      status: "Live",
      icon: Crown,
      gradient: "from-orange-500/10 to-red-500/10",
      pricing: [
        {
          plan: "Basic",
          price: "$0.00",
          limit: "5 requests/month",
          note: "Hard Limit",
        },
        {
          plan: "Basic",
          price: "$0.00",
          limit: "500,000 requests/month",
          note: "Hard Limit (Deprecated)",
        },
        {
          plan: "Pro",
          price: "$5.00",
          limit: "5,000 requests/month",
          note: "Hard Limit",
        },
        {
          plan: "Ultra",
          price: "$10.00",
          limit: "50,000 requests/month",
          note: "+$0.05 per additional",
        },
      ],
      // endpoints removed for consistent card layout
    },
    {
      name: "Cookpad API",
      description: "Access comprehensive recipe and cooking data",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/cookpad-api",
      features: [
        "Extensive recipe database",
        "Nutritional information",
        "Ingredient-based search",
        "Meal planning tools",
        "User ratings and reviews",
        "Cooking time estimates",
      ],
      status: "Live",
      icon: Coffee,
      gradient: "from-green-500/10 to-yellow-500/10",
      pricing: [
        {
          plan: "Basic",
          price: "$0.00",
          limit: "5 calls/month",
          note: "Hard Limit",
        },
        {
          plan: "Pro",
          price: "$5.00",
          limit: "5,000 calls/month",
          note: "Hard Limit",
        },
        {
          plan: "Ultra",
          price: "$10.00",
          limit: "50,000 calls/month",
          note: "+$0.05 per additional",
        },
      ],
    },
    {
      name: "Doctors API",
      description: "Access healthcare provider data and information",
      rapidApiUrl:
        "https://rapidapi.com/matepapava123/api/doctors-api",
      features: [
        "Healthcare provider directory",
        "Specialty search",
        "Location-based matching",
        "Credentials verification",
        "Patient reviews",
        "Appointment availability",
      ],
      status: "Live",
      icon: Activity,
      gradient: "from-blue-500/10 to-cyan-500/10",
      pricing: [
        {
          plan: "Basic",
          price: "$0.00",
          limit: "5 calls/month",
          note: "Hard Limit",
        },
        {
          plan: "Pro",
          price: "$5.00",
          limit: "5,000 calls/month",
          note: "Hard Limit",
        },
        {
          plan: "Ultra",
          price: "$15.00",
          limit: "50,000 calls/month",
          note: "+$0.05 per additional",
        },
        {
          plan: "Mega",
          price: "$45.00",
          limit: "500000 calls/month",
          note: "No extra charges",
        },
      ],
    },
    {
      name: "Investors Leads API",
      description: "Connect with qualified investment opportunities",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/investors-leads-api",
      features: [
        "Qualified investor contacts",
        "Investment preferences",
        "Portfolio analysis",
        "Market trend insights",
        "Due diligence data",
        "Investment history",
      ],
      status: "Live",
      icon: DollarSign,
      gradient: "from-indigo-500/10 to-violet-500/10",
      pricing: [
        {
          plan: "Basic",
          price: "Free",
          limit: "5 calls/month",
          note: "Hard Limit",
        },
        {
          plan: "Pro",
          price: "$10/month",
          limit: "500 calls/month",
          note: "hard limit",
        },
        {
          plan: "Ultra",
          price: "$49/month",
          limit: "10000 calls/month",
          note: "hard limit",
        },
        {
          plan: "Mega",
          price: "$199/month",
          limit: "50000 calls/month",
          note: "hard limit",
        },
      ],
    },
    {
      name: "Nike API",
      description: "Access Nike product catalog and inventory data",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/nike-api",
      features: [
        "Product catalog access",
        "Real-time inventory",
        "Pricing information",
        "Release dates",
        "Product specifications",
        "Regional availability",
      ],
      status: "Live",
      icon: ShoppingCart,
      gradient: "from-gray-500/10 to-slate-500/10",
      pricing: [
        {
          plan: "Basic",
          price: "$0.00",
          limit: "5 calls/month",
          note: "Hard Limit",
        },
        {
          plan: "Pro",
          price: "$2.00",
          limit: "500 calls/month",
          note: "+$0.05 per additional",
        },
        {
          plan: "Ultra",
          price: "$5.00",
          limit: "5,000 calls/month",
          note: "+$0.01 per additional",
        },
        {
          plan: "Mega",
          price: "$15.00",
          limit: "50,000 calls/month",
          note: "+$0.01 per additional",
        },
      ],
    },
  ];

  const stats = [
    {
      label: "Total API Calls",
      value: "120K+",
      description: "Across all endpoints",
    },
    {
      label: "Paying Customers",
      value: "200+",
      description: "Production users",
    },
    { label: "Live APIs", value: "5", description: "Ready to use" },
    { label: "Uptime", value: "99.9%", description: "Reliable service" },
  ];

  // Create structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rotten Tomatoes API",
    applicationCategory: "API",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "45",
      offerCount: "4",
    },
    description:
      "Access comprehensive movie data, ratings, and reviews from the trusted Rotten Tomatoes platform.",
  };

  return (
    <div className="min-h-screen bg-background">
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      {/* Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-8">
              <div className="rounded-full bg-gray-100 dark:bg-gray-900 p-4">
                <ExternalLink className="h-12 w-12 text-gray-800 dark:text-gray-200" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Available on RapidAPI
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              All our APIs are live on RapidAPI with flexible pricing. Each API
              has served 20,000+ calls with 100+ paying customers.
            </p>

            <div className="mt-8 inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-2 text-sm">
              <span className="text-muted-foreground">
                5 Live APIs • Trusted by 200+ customers • 20K+ calls each
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-medium text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Cards */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-items-center">
            {apis.map((api, index) => {
              const IconComponent = api.icon;
              return (
                <Card
                  key={index}
                  className="relative w-full h-full flex flex-col border border-border/50 bg-card hover:shadow-lg transition-all duration-300 group min-h-[600px]"
                >
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        api.status === "Live"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          api.status === "Live" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      {api.status}
                    </span>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-semibold leading-tight">
                          {api.name}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                      {api.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-3 text-foreground">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {api.features
                          .slice(0, 4)
                          .map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-start space-x-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        {api.features.length > 4 && (
                          <li className="text-xs text-muted-foreground/70 pl-6">
                            +{api.features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Pricing */}
                    {api.pricing && (
                      <div className="mb-6 flex-1">
                        <h4 className="text-sm font-medium mb-3 text-foreground">
                          Pricing Plans
                        </h4>
                        <div className="space-y-2">
                          {api.pricing.slice(0, 3).map((tier, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground">
                                  {tier.plan}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {tier.limit}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-semibold text-foreground">
                                  {tier.price}
                                </div>
                                {tier.price !== "Free" &&
                                  tier.price !== "$0.00" && (
                                    <div className="text-xs text-muted-foreground">
                                      /month
                                    </div>
                                  )}
                              </div>
                            </div>
                          ))}
                          {api.pricing.length > 3 && (
                            <div className="text-xs text-muted-foreground/70 text-center py-1">
                              +{api.pricing.length - 3} more plans available
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CTA Button - Always at bottom */}
                    <div className="mt-auto pt-4">
                      {api.status === "Live" ? (
                        <Button asChild className="w-full" size="sm">
                          <a
                            href={api.rapidApiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            View on RapidAPI
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          variant="secondary"
                          size="sm"
                          disabled
                        >
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our APIs on RapidAPI
            </p>
          </div>

          <div className="grid gap-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  How does pricing work on RapidAPI?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Each API has its own pricing model on RapidAPI. Most offer
                  free tiers and flexible pay-per-use pricing. You only pay for
                  what you use, with transparent pricing displayed on each API's
                  RapidAPI page.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I test the APIs before subscribing?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Most of our APIs offer free tiers or trial credits so you
                  can test functionality before committing. Check each API's
                  RapidAPI page for specific free tier details.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  What support is available?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide comprehensive documentation and support through
                  RapidAPI's platform, plus direct email support at
                  contact@nantano.studio for complex technical issues or business
                  inquiries.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  Are the APIs reliable for production use?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Absolutely! Our APIs have proven reliability with:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      <span>20,000+ API calls per endpoint</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      <span>200+ paying customers</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      <span>99.9% uptime</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      <span>Production-ready infrastructure</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Card className="border-border/50">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 200+ developers already using our APIs in production. Start
                with our free tiers and scale as you grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a
                    href="https://rapidapi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse APIs on RapidAPI
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:contact@nantano.studio">Contact Sales</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
