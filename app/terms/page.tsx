import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Scale,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Mail,
} from "lucide-react";

export default function TermsPage() {
  const termsSections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By accessing our APIs, you agree to these terms",
        "Must be 18+ or have parental consent",
        "Terms apply to all API usage through RapidAPI",
        "Continued use constitutes acceptance",
      ],
    },
    {
      icon: Shield,
      title: "API Usage Guidelines",
      content: [
        "Use APIs only for lawful purposes",
        "Respect rate limits and quotas",
        "No attempt to reverse engineer",
        "No unauthorized access or abuse",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Prohibited Activities",
      content: [
        "No harmful, illegal, or offensive content",
        "No copyright infringement",
        "No spam or malicious activities",
        "No circumventing security measures",
      ],
    },
    {
      icon: CheckCircle,
      title: "Service Availability",
      content: [
        "Best effort uptime and performance",
        "Maintenance windows may occur",
        "No guarantee of uninterrupted service",
        "SLA terms through RapidAPI",
      ],
    },
  ];

  const apis = [
    { name: "AI Image Generation", status: "live" },
    { name: "Background Removal AI", status: "live" },
    { name: "Rotten Tomato API", status: "live" },
    { name: "Meet Bot API", status: "development" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-8">
              <div className="rounded-full bg-primary/10 p-4">
                <Scale className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Terms of Service
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Clear, fair terms for using our AI APIs on RapidAPI. We believe in
              transparency and straightforward agreements.
            </p>

            <div className="mt-8 inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-2 text-sm">
              <span className="text-muted-foreground">
                Last updated: January 2024 • Effective immediately
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terms Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {termsSections.map((section, index) => (
              <Card
                key={index}
                className="border-border/50 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-2"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* API Coverage */}
          <Card className="border-border/50 mb-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>API Coverage</span>
              </CardTitle>
              <CardDescription>
                These terms apply to all our APIs and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {apis.map((api, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border/30 bg-background/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{api.name}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          api.status === "live"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                        }`}
                      >
                        {api.status === "live" ? "Live" : "In Development"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {api.status === "live"
                        ? "20,000+ API calls"
                        : "Coming soon"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Sections */}
          <div className="space-y-12">
            {/* Liability and Disclaimers */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span>Liability & Disclaimers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200/50">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
                        Service Disclaimers
                      </h4>
                      <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                        <li>• APIs provided "as is" without warranties</li>
                        <li>• No guarantee of accuracy or reliability</li>
                        <li>• Third-party dependencies may affect service</li>
                        <li>
                          • User responsible for backup and data protection
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
                        Limitation of Liability
                      </h4>
                      <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                        <li>• Limited to fees paid for services</li>
                        <li>• No liability for indirect damages</li>
                        <li>• User assumes risk of use</li>
                        <li>• RapidAPI terms also apply</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* RapidAPI Integration */}
            <Card className="border-border/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <span>RapidAPI Terms</span>
                </CardTitle>
                <CardDescription>
                  Additional terms from our distribution partner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4 border border-border/30">
                  <p className="text-sm text-muted-foreground mb-3">
                    When using our APIs through RapidAPI, you also agree to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>RapidAPI Terms of Service</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>RapidAPI billing policies</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>RapidAPI usage limitations</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>RapidAPI dispute resolution</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact and Support */}
            <Card className="border-border/50 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Questions & Support</span>
                </CardTitle>
                <CardDescription>
                  Need clarification on these terms or have questions?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Direct Contact</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>contact@nantano.studio</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4" />
                        <a
                          href="https://github.com/Matheus-The-one"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          GitHub Repository
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Support Options</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• RapidAPI support system</li>
                      <li>• GitHub Issues for technical questions</li>
                      <li>• Email for legal or business inquiries</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50 flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <a href="mailto:contact@nantano.studio">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Legal Team
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href="https://github.com/Matheus-The-one"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
