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
  Scissors,
  Zap,
  Shield,
  Code,
  CheckCircle,
  Upload,
} from "lucide-react";

export default function BackgroundRemovalPage() {
  const features = [
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Remove backgrounds in under 2 seconds with AI precision.",
    },
    {
      icon: Shield,
      title: "High Accuracy",
      description: "Advanced AI models for clean, professional edge detection.",
    },
    {
      icon: Upload,
      title: "Multiple Formats",
      description:
        "Support for JPG, PNG, WebP and other popular image formats.",
    },
  ];

  const useCases = [
    "E-commerce product photos",
    "Profile pictures and avatars",
    "Marketing materials",
    "Social media content",
    "Photo editing workflows",
    "Automated batch processing",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Scissors className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Background Removal AI
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Remove backgrounds from images instantly with AI-powered
              precision. Live  with 20,000+ calls and 100+ paying
              customers. Perfect for e-commerce, social media, and professional
              photography.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href="https://rapidapi.com/matepapava123/api/background-remover40/playground/apiendpoint_09651df5-9732-4297-959a-85fc1f93e718"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try 
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
              Why Choose Our API?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Professional-grade background removal at scale
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
              Remove backgrounds with a simple API call
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Background Removal Example</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted/50 p-4">
                  <pre className="text-sm leading-relaxed overflow-x-auto">
                    <code className="text-muted-foreground font-mono">
                      {`// Remove background from an image
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('https://api.nantano.dev/v1/remove-background', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log(result.processed_image_url);`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before/After Demo Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See the Difference
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Professional results every time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Before</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <p className="text-blue-600 font-medium">
                    Original Image with Background
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">After</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-transparent bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%),linear-gradient(-45deg,#f3f4f6_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f3f4f6_75%),linear-gradient(-45deg,transparent_75%,#f3f4f6_75%)] bg-[length:20px_20px] bg-[0_0,0_10px,10px_-10px,-10px_0px] rounded-lg flex items-center justify-center border">
                  <p className="text-gray-600 font-medium bg-white px-3 py-1 rounded">
                    Clean Subject Only
                  </p>
                </div>
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
              Versatile background removal for any workflow
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
                Start removing backgrounds today
              </h2>

              <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of developers and businesses automating their
                image processing workflows.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg">
                  Get API Key
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                500 free removals per month • No setup fees
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
