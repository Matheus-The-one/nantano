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
  ShoppingBag,
  Zap,
  Shield,
  Code,
  CheckCircle,
  Package,
  Search,
  Star,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nike API on RapidAPI | Access Nike Products & Inventory Data",
  description:
    "Access Nike products, inventory, pricing, and e-commerce data through our comprehensive Nike API. Perfect for price comparison, inventory management, and product analysis. Available on RapidAPI with 20,000+ calls.",
  keywords:
    "nike api, rapidapi nike, nike products api, nike inventory api, nike price api, nike data api, nike ecommerce api, nike shoes api, nike clothing api, nike products data, nike api documentation, nike api pricing, nike api integration, nike api developer, nike api access",
  openGraph: {
    title: "Nike API on RapidAPI | Access Nike Products & Inventory Data",
    description:
      "Access Nike products, inventory, pricing, and e-commerce data through our comprehensive Nike API. Perfect for price comparison, inventory management, and product analysis.",
    type: "website",
    url: "https://nantano.ai/services/nike-api",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nike API on RapidAPI | Access Nike Products & Inventory Data",
    description:
      "Access Nike products, inventory, pricing, and e-commerce data through our comprehensive Nike API.",
  },
  alternates: {
    canonical: "https://nantano.ai/services/nike-api",
  },
};

export default function NikeApiPage() {
  const features = [
    {
      icon: Package,
      title: "Product Catalog Access",
      description:
        "Access Nike's complete product catalog including shoes, clothing, and accessories with detailed specifications.",
    },
    {
      icon: Search,
      title: "Advanced Search & Filtering",
      description:
        "Search products by category, price range, size, color, and other attributes with powerful filtering options.",
    },
    {
      icon: Star,
      title: "Real-time Pricing",
      description:
        "Get real-time pricing information, discounts, and availability status for all Nike products.",
    },
  ];

  const useCases = [
    "Price comparison websites and apps",
    "Inventory management systems",
    "E-commerce platforms integration",
    "Product recommendation engines",
    "Market research and analysis",
    "Mobile shopping applications",
    "Affiliate marketing platforms",
    "Product catalog synchronization",
  ];

  const apiEndpoints = [
    {
      endpoint: "/products",
      method: "GET",
      description: "Retrieve Nike products with filtering and pagination",
    },
    {
      endpoint: "/products/{id}",
      method: "GET",
      description: "Get detailed information about a specific product",
    },
    {
      endpoint: "/search",
      method: "GET",
      description: "Search products by name, category, or keywords",
    },
    {
      endpoint: "/categories",
      method: "GET",
      description: "Get all available product categories and subcategories",
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
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-primary">Nike API</span> on RapidAPI
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Access Nike's complete product catalog, real-time pricing, and
              inventory data through our comprehensive API. Perfect for
              e-commerce integration, price comparison, and product analysis.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href="https://rapidapi.com/matepapava123/api/nike-api"
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
              Why Choose Our Nike API?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive Nike data access with powerful features for
              developers
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
              Powerful endpoints to access Nike product data
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
              Build powerful applications with Nike product data
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
              Get started with Nike API in minutes
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Nike API Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted/50 p-4">
                  <pre className="text-sm leading-relaxed overflow-x-auto">
                    <code className="text-muted-foreground font-mono">
                      {`// Search Nike products
const response = await fetch('https://nike-api.p.rapidapi.com/search?q=air%20max', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'nike-api.p.rapidapi.com'
  }
});

const products = await response.json();
console.log(products);

// Get product details
const productResponse = await fetch('https://nike-api.p.rapidapi.com/products/12345', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'nike-api.p.rapidapi.com'
  }
});

const product = await productResponse.json();
console.log(product);`}
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
                <ShoppingBag className="h-16 w-16 text-primary mx-auto" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Start Building with Nike API
              </h2>

              <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto mb-8">
                Access Nike's complete product catalog and build amazing
                applications. Join 100+ developers already using our Nike API on
                RapidAPI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://rapidapi.com/matepapava123/api/nike-api"
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
            name: "Nike API",
            description:
              "Access Nike products, inventory, pricing, and e-commerce data through our comprehensive API",
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
