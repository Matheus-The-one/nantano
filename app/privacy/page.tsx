import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Database,
  Users,
  Lock,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "API usage data and request logs",
        "Account information through RapidAPI",
        "Technical data (IP addresses, user agents)",
        "Usage analytics and performance metrics",
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our API services",
        "Monitor and improve API performance",
        "Prevent fraud and abuse",
        "Communicate about service updates",
      ],
    },
    {
      icon: Shield,
      title: "Data Protection",
      content: [
        "Industry-standard encryption in transit and at rest",
        "Regular security audits and monitoring",
        "Limited access to personal data",
        "Compliance with data protection regulations",
      ],
    },
    {
      icon: Users,
      title: "Third-Party Services",
      content: [
        "RapidAPI for API distribution and billing",
        "Analytics services for usage monitoring",
        "Cloud infrastructure providers",
        "No data selling to third parties",
      ],
    },
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
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and
              protect your data when using our AI APIs on RapidAPI.
            </p>

            <div className="mt-8 inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-2 text-sm">
              <span className="text-muted-foreground">
                Last updated: January 2024 • Effective immediately
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
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

          {/* Detailed Sections */}
          <div className="space-y-12">
            {/* Data Retention */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-primary" />
                  <span>Data Retention & Deletion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Retention Periods</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• API logs: 90 days</li>
                      <li>• Usage analytics: 2 years</li>
                      <li>• Account data: Until deletion requested</li>
                      <li>• Backup data: 30 days after deletion</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Your Rights</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Request data deletion</li>
                      <li>• Access your personal data</li>
                      <li>• Correct inaccurate information</li>
                      <li>• Data portability</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* RapidAPI Integration */}
            <Card className="border-border/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <span>RapidAPI Integration</span>
                </CardTitle>
                <CardDescription>
                  Our APIs are distributed through RapidAPI, which has its own
                  privacy practices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background/50 rounded-lg p-4 border border-border/30">
                  <p className="text-sm text-muted-foreground mb-3">
                    When you use our APIs through RapidAPI, your data is also
                    subject to:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>RapidAPI's Privacy Policy</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>RapidAPI's Terms of Service</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>RapidAPI's billing and usage tracking</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-border/50 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Contact Us</span>
                </CardTitle>
                <CardDescription>
                  Questions about this privacy policy or your data?
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
                    <h4 className="font-semibold mb-3">Support Channels</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• RapidAPI support system</li>
                      <li>• GitHub Issues</li>
                      <li>• Direct email support</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <Button asChild>
                    <a href="mailto:contact@nantano.studio">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Privacy Team
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
