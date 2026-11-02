import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

/**
 * Claude Sonnet reached through a cross-region inference profile (the `us.`
 * prefix). Bedrock only accepts the profile id - not the bare model id - for
 * on-demand throughput in us-east-1.
 */
export const DEFAULT_MODEL_ID = "us.anthropic.claude-sonnet-4-5-20250929-v1:0";

let cached: ReturnType<typeof createAmazonBedrock> | undefined;

/**
 * The AI SDK Bedrock provider signs requests with SigV4 over plain `fetch`
 * (via aws4fetch) instead of wrapping the AWS SDK. That keeps the serverless
 * bundle small and lets the route run on any runtime.
 */
function getProvider(): ReturnType<typeof createAmazonBedrock> {
  if (cached) return cached;

  cached = createAmazonBedrock({
    region: process.env.AWS_REGION ?? "us-east-1",
    // Left undefined, the provider reads the standard AWS env vars itself,
    // which is what we want when running under an instance role.
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  return cached;
}

export function getChatModel() {
  return getProvider()(process.env.BEDROCK_MODEL_ID ?? DEFAULT_MODEL_ID);
}
