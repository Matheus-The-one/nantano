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
  ShoppingBag,
  TrendingUp,
  ChefHat,
  Stethoscope,
  Wand2,
  Scissors,
  Popcorn,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "API Services | Nike, Cookpad, Doctors, Investors Leads APIs on RapidAPI",
  description:
    "Browse all our APIs on RapidAPI: Nike API, Cookpad API, Doctors API, Investors Leads API, AI Image Generation, Background Removal, and more. Access comprehensive data APIs for your applications.",
  keywords:
    "api services, nike api, cookpad api, doctors api, investors leads api, rapidapi, ai image generation api, background removal api, api marketplace, developer apis, rapidapi apis, api directory, api catalog",
  openGraph: {
    title:
      "API Services | Nike, Cookpad, Doctors, Investors Leads APIs on RapidAPI",
    description:
      "Browse all our APIs on RapidAPI. Access Nike products, Cookpad recipes, doctors database, investors leads, and more.",
    type: "website",
    url: "https://nantano.ai/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Services | Nike, Cookpad, Doctors, Investors Leads APIs",
    description:
      "Browse all our APIs on RapidAPI. Access comprehensive data APIs for your applications.",
  },
  alternates: {
    canonical: "https://nantano.ai/services",
  },
};

export default function ServicesPage() {
  const services = [
    {
      icon: TrendingUp,
      title: "Investors Leads API",
      description:
        "Access investor contact emails, business leads, funding data, and investment opportunities. Perfect for startups and fundraising platforms.",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/investors-leads-api",
      pageUrl: "/services/investors-leads-api",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      keywords: "investor api, business leads, funding data, startup investors",
    },
    {
      icon: ShoppingBag,
      title: "Nike API",
      description:
        "Access Nike's complete product catalog, real-time pricing, and inventory data. Ideal for e-commerce and price comparison platforms.",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/nike-api",
      pageUrl: "/services/nike-api",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      keywords: "nike api, nike products, nike inventory, nike pricing",
    },
    {
      icon: ChefHat,
      title: "Cookpad API",
      description:
        "Access Cookpad recipes, cooking instructions, ingredients, and food data. Perfect for recipe apps and food platforms.",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/cookpad-api",
      pageUrl: "/services/cookpad-api",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      keywords: "cookpad api, recipes api, cooking data, food api",
    },
    {
      icon: Stethoscope,
      title: "Doctors API",
      description:
        "Access comprehensive doctors database, medical professionals, specialties, and healthcare provider information for healthcare apps.",
      rapidApiUrl: "https://rapidapi.com/matepapava123/api/doctors-api1",
      pageUrl: "/services/doctors-api",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      keywords: "doctors api, medical api, healthcare api, find doctors",
    },
    {
      icon: Wand2,
      title: "AI Image Generation",
      description:
        "Generate high-quality images using AI. Perfect for content creation, marketing, and creative applications.",
      rapidApiUrl: "https://rapidapi.com/matepapava123",
      pageUrl: "/services/ai-image-generation",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      keywords: "ai image generation, ai art, image api, creative ai",
    },
    {
      icon: Scissors,
      title: "Background Removal API",
      description:
        "Automatically remove backgrounds from images using AI. Ideal for e-commerce, photo editing, and design applications.",
      rapidApiUrl: "https://rapidapi.com/matepapava123",
      pageUrl: "/services/background-removal",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      keywords: "background removal, image editing, ai photo editor",
    },
    {
      icon: Popcorn,
      title: "Rotten Tomato API",
      description:
        "Access movie ratings, reviews, and entertainment data. Perfect for movie apps and entertainment platforms.",
      rapidApiUrl: "https://rapidapi.com/matepapava123",
      pageUrl: "/services/rotten-tomato",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      keywords: "movie api, ratings api, entertainment api, film data",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Our <span className="text-primary">API Services</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of APIs available on
              RapidAPI. From Nike products to investor leads, recipes to doctors
              - we have the data you need.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div
                    className={`rounded-md ${service.bgColor} p-3 w-fit mb-4`}
                  >
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <Button asChild size="default" className="w-full">
                      <Link
                        href={service.pageUrl}
                        className="flex items-center justify-center"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="default"
                      className="w-full"
                    >
                      <a
                        href={service.rapidApiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on RapidAPI
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    {service.keywords}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our APIs */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Nantano AIs?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Trusted by 100+ paying customers with 20,000+ API calls per
              endpoint
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">20K+</div>
              <div className="mt-2 text-muted-foreground">API Calls</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="mt-2 text-muted-foreground">Paying Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <div className="mt-2 text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="mt-2 text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join 100+ developers building amazing applications with our APIs
              on RapidAPI
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <a
                  href="https://rapidapi.com/matepapava123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse on RapidAPI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for Services Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Nantano AI Services",
            description:
              "Browse all our APIs on RapidAPI including Nike API, Cookpad API, Doctors API, and Investors Leads API",
            provider: {
              "@type": "Organization",
              name: "Nantano AI",
              url: "https://nantano.ai",
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "SoftwareApplication",
                  name: service.title,
                  description: service.description,
                  url: `https://nantano.ai${service.pageUrl}`,
                  applicationCategory: "DeveloperApplication",
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}


