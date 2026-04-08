"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const codeExamples = [
  {
    language: "Node.js",
    code: `// Initialize Nantano Studio client
import { NantanoAPI } from '@nantano/api-client';

const api = new NantanoAPI({
  apiKey: process.env.NANTANO_API_KEY
});

// Make a simple API call
const response = await api.data.fetch({
  endpoint: '/users',
  filters: { active: true }
});

console.log(response.data);`,
  },
  {
    language: "Python",
    code: `# Install: pip install nantano-api
from nantano_api import NantanoClient

# Initialize client
client = NantanoClient(api_key="your-api-key")

# Fetch data with real-time updates
data = client.data.stream(
    endpoint="realtime/analytics",
    callback=handle_update
)

print(f"Connected to stream: {data.id}")`,
  },
  {
    language: "cURL",
    code: `# Simple REST API call
curl -X GET "https://api.nantano.dev/v1/data" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

# Response
{
  "status": "success",
  "data": [...],
  "meta": {
    "total": 1250,
    "page": 1
  }
}`,
  },
];

export function CodeShowcase() {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto w-fit rounded-full bg-primary/10 p-3 mb-6">
            <Terminal className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, powerful integration
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Get started in minutes with our clean, well-documented APIs. Choose
            your preferred language and start building.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {codeExamples.map((example, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {example.language}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(example.code)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted/50 p-4">
                    <pre className="text-sm leading-relaxed overflow-x-auto">
                      <code className="text-muted-foreground font-mono">
                        {example.code}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
