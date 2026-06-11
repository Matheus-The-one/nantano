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
  ChefHat,
  Zap,
  Shield,
  Code,
  CheckCircle,
  Utensils,
  Clock,
  Users,
  ExternalLink,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cookpad API  | Access Recipes & Cooking Data",
  description:
    "Access Cookpad recipes, cooking instructions, ingredients, and food data. Perfect for recipe apps, food platforms, and cooking applications. Available  with comprehensive recipe database.",
  keywords:
    "cookpad api, recipes api, cooking api, food api, recipe data api, cookpad recipes api, cooking instructions api, ingredients api, food database api, recipe search api, cooking data api, food information api, recipe app api, cooking platform api, cookpad data api",
  openGraph: {
    title: "Cookpad API  | Access Recipes & Cooking Data",
    description:
      "Access Cookpad recipes, cooking instructions, ingredients, and food data. Perfect for recipe apps, food platforms, and cooking applications.",
    type: "website",
    url: "https://nantano.ai/services/cookpad-api",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookpad API  | Access Recipes & Cooking Data",
    description:
      "Access Cookpad recipes, cooking instructions, ingredients, and food data.",
  },
  alternates: {
    canonical: "https://nantano.ai/services/cookpad-api",
  },
};

export default function CookpadApiPage() {
  const features = [
    {
      icon: Utensils,
      title: "Comprehensive Recipe Database",
      description:
        "Access thousands of recipes from Cookpad with detailed ingredients, instructions, and cooking methods.",
    },
    {
      icon: Clock,
      title: "Cooking Time & Difficulty",
      description:
        "Get cooking time estimates, difficulty levels, and preparation steps for every recipe.",
    },
    {
      icon: Users,
      title: "Community Ratings & Reviews",
      description:
        "Access user ratings, reviews, and cooking tips from the Cookpad community.",
    },
  ];

  const useCases = [
    "Recipe apps and cooking platforms",
    "Food delivery and meal planning apps",
    "Cooking instruction applications",
    "Nutrition and diet tracking tools",
    "Restaurant menu management systems",
    "Food blogging and content platforms",
    "Culinary education platforms",
    "Grocery shopping and meal prep apps",
  ];

  const apiEndpoints = [
    {
      endpoint: "/recipes",
      method: "GET",
      description:
        "Retrieve recipes with filtering by cuisine, difficulty, and cooking time",
    },
    {
      endpoint: "/recipes/{id}",
      method: "GET",
      description:
        "Get detailed recipe information including ingredients and instructions",
    },
    {
      endpoint: "/search",
      method: "GET",
      description: "Search recipes by ingredient, dish name, or cuisine type",
    },
    {
      endpoint: "/ingredients",
      method: "GET",
      description: "Get ingredient information and nutritional data",
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
                <ChefHat className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-primary">Cookpad API</span> 
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Access Cookpad recipes, cooking instructions, ingredients, and
              food data. Perfect for recipe apps, food platforms, and cooking
              applications.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href="https://rapidapi.com/matepapava123/api/cookpad-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Access 
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
              Why Choose Our Cookpad API?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive cooking data access with community-driven recipes
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
              Powerful endpoints to access recipes and cooking data
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
              Build powerful food and cooking applications
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
              Get started with Cookpad API in minutes
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Cookpad API Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted/50 p-4">
                  <pre className="text-sm leading-relaxed overflow-x-auto">
                    <code className="text-muted-foreground font-mono">
                      {`// Search recipes by ingredient
const response = await fetch('https://cookpad-api.p.rapidapi.com/search?ingredient=chicken&cuisine=italian', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'cookpad-api.p.rapidapi.com'
  }
});

const recipes = await response.json();
console.log(recipes);

// Get recipe details
const recipeResponse = await fetch('https://cookpad-api.p.rapidapi.com/recipes/12345', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'cookpad-api.p.rapidapi.com'
  }
});

const recipe = await recipeResponse.json();
console.log(recipe.ingredients);
console.log(recipe.instructions);`}
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
                <ChefHat className="h-16 w-16 text-primary mx-auto" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Start Building Food Apps
              </h2>

              <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto mb-8">
                Access Cookpad's comprehensive recipe database and build amazing
                food and cooking applications. Join 100+ developers already
                using our Cookpad API .
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://rapidapi.com/matepapava123/api/cookpad-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    Get Started 
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
            name: "Cookpad API",
            description:
              "Access Cookpad recipes, cooking instructions, ingredients, and food data",
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


