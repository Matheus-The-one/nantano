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
  Stethoscope,
  Zap,
  Shield,
  Code,
  CheckCircle,
  User,
  MapPin,
  Star,
  ExternalLink,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Doctors API  | Find Doctors & Medical Professionals",
  description:
    "Access comprehensive doctors database, medical professionals, specialties, and healthcare provider information. Perfect for healthcare apps, doctor finder platforms, and medical directory services. Available .",
  keywords:
    "doctors api, medical api, healthcare api, doctors database api, find doctors api, medical professionals api, healthcare providers api, doctor finder api, medical directory api, physicians api, specialists api, doctors contact api, medical data api, healthcare information api, doctors search api",
  openGraph: {
    title: "Doctors API  | Find Doctors & Medical Professionals",
    description:
      "Access comprehensive doctors database, medical professionals, specialties, and healthcare provider information. Perfect for healthcare apps and medical directory services.",
    type: "website",
    url: "https://nantano.ai/services/doctors-api",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doctors API  | Find Doctors & Medical Professionals",
    description:
      "Access comprehensive doctors database, medical professionals, specialties, and healthcare provider information.",
  },
  alternates: {
    canonical: "https://nantano.ai/services/doctors-api",
  },
};

export default function DoctorsApiPage() {
  const features = [
    {
      icon: User,
      title: "Comprehensive Doctor Database",
      description:
        "Access detailed information about doctors, specialists, and medical professionals including credentials and specialties.",
    },
    {
      icon: MapPin,
      title: "Location-Based Search",
      description:
        "Find doctors by location, city, state, or zip code with advanced geographical filtering options.",
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description:
        "Get doctor ratings, patient reviews, and quality metrics to help patients make informed decisions.",
    },
  ];

  const useCases = [
    "Healthcare appointment booking apps",
    "Doctor finder and directory websites",
    "Medical referral systems",
    "Healthcare marketplace platforms",
    "Telemedicine applications",
    "Insurance provider networks",
    "Medical tourism platforms",
    "Healthcare analytics and research",
  ];

  const apiEndpoints = [
    {
      endpoint: "/doctors",
      method: "GET",
      description:
        "Retrieve doctors with filtering by specialty, location, and other criteria",
    },
    {
      endpoint: "/doctors/{id}",
      method: "GET",
      description: "Get detailed information about a specific doctor",
    },
    {
      endpoint: "/specialties",
      method: "GET",
      description: "Get all available medical specialties and subspecialties",
    },
    {
      endpoint: "/search",
      method: "GET",
      description: "Search doctors by name, specialty, or location",
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
                <Stethoscope className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-primary">Doctors API</span> 
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive doctors database, medical professionals,
              specialties, and healthcare provider information. Perfect for
              healthcare apps, doctor finder platforms, and medical directory
              services.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href="https://rapidapi.com/matepapava123/api/doctors-api1"
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
              Why Choose Our Doctors API?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive healthcare data access with powerful search
              capabilities
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
              Powerful endpoints to access doctors and medical data
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
              Build powerful healthcare applications with doctor data
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
              Get started with Doctors API in minutes
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Doctors API Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted/50 p-4">
                  <pre className="text-sm leading-relaxed overflow-x-auto">
                    <code className="text-muted-foreground font-mono">
                      {`// Search doctors by specialty and location
const response = await fetch('https://doctors-api.p.rapidapi.com/search?specialty=cardiologist&city=New York', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'doctors-api.p.rapidapi.com'
  }
});

const doctors = await response.json();
console.log(doctors);

// Get doctor details
const doctorResponse = await fetch('https://doctors-api.p.rapidapi.com/doctors/12345', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'doctors-api.p.rapidapi.com'
  }
});

const doctor = await doctorResponse.json();
console.log(doctor);`}
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
                <Stethoscope className="h-16 w-16 text-primary mx-auto" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Start Building Healthcare Apps
              </h2>

              <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto mb-8">
                Access comprehensive doctors database and build amazing
                healthcare applications. Join 100+ developers already using our
                Doctors API .
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://rapidapi.com/matepapava123/api/doctors-api1"
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
            name: "Doctors API",
            description:
              "Access comprehensive doctors database, medical professionals, specialties, and healthcare provider information",
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


