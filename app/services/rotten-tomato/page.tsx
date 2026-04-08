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
  Film,
  Zap,
  Shield,
  Code,
  CheckCircle,
  Star,
} from "lucide-react";

export default function RottenTomatoPage() {
  const features = [
    {
      icon: Film,
      title: "Movie Database",
      description:
        "Access comprehensive movie information, ratings, and reviews.",
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description:
        "Get Rotten Tomatoes scores, audience ratings, and critical reviews.",
    },
    {
      icon: Zap,
      title: "Real-time Data",
      description: "Always up-to-date movie information and trending content.",
    },
  ];

  const useCases = [
    "Movie recommendation apps",
    "Entertainment websites",
    "Review aggregation platforms",
    "Streaming service integration",
    "Movie discovery applications",
    "Entertainment analytics",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Film className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Rotten Tomato API
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive movie data, ratings, and reviews through our
              Rotten Tomato API. Live on RapidAPI with 20,000+ calls and 100+
              paying customers. Perfect for entertainment applications and movie
              discovery platforms.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href="https://rapidapi.com/matepapava123/api/rottentomato/playground/apiendpoint_a560ff0f-b628-4708-9705-39bd3a34cfcf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try on RapidAPI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg">
                View API Docs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive Movie Data
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Everything you need for movie-related applications
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

      {/* Code Example Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Easy Integration
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get movie data with a simple API call
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Movie Data Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted/50 p-4">
                  <pre className="text-sm leading-relaxed overflow-x-auto">
                    <code className="text-muted-foreground font-mono">
                      {`// Get movie information
const response = await fetch('https://rapidapi.com/matepapava123/api/rottentomato', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'rottentomato.rapidapi.com'
  }
});

const movieData = await response.json();
console.log(movieData);

// Response includes:
// - Movie title and details
// - Rotten Tomatoes score
// - Audience rating
// - Cast and crew information
// - Release dates and genres`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Rich Movie Data
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Access detailed information for entertainment applications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Movie Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Title, year, and genre</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Cast and crew details</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Plot summaries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Release information</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Rotten Tomatoes scores</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Audience ratings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Critical consensus</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Review excerpts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Perfect For
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Ideal for entertainment and media applications
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30 border border-border/50"
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-12 shadow-lg border border-border/50">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Start building with movie data
              </h2>

              <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto mb-8">
                Join developers building entertainment applications with our
                comprehensive movie database API.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <a
                    href="https://rapidapi.com/matepapava123/api/rottentomato/playground/apiendpoint_a560ff0f-b628-4708-9705-39bd3a34cfcf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get API Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button variant="outline" size="lg">
                  View Documentation
                </Button>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                Available on RapidAPI • Trusted by 100+ customers
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
