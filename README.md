# Veloxiz

AI business gap intelligence. Marketing site plus an authenticated dashboard
with a Bedrock-backed analyst agent.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

The app runs at http://localhost:3000.

## Architecture

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16 App Router, React 19, Tailwind v4 |
| Auth | Google OAuth (code + PKCE), signed JWT in an httpOnly cookie |
| Data | DynamoDB (`VELOXIZ_USERS`, `_CONVERSATIONS`, `_CONNECTORS`, `_MEMORY`) |
| Agent | Vercel AI SDK v7 + `@ai-sdk/amazon-bedrock` (Claude Sonnet) |
| Chat UI | `useChat` from `@ai-sdk/react` over a UI message stream |

Route groups: `app/(marketing)` is the public site, `app/(app)/dashboard` is
the authenticated product. `proxy.ts` guards `/dashboard/:path*` at the edge.

### The agent

`lib/ai/` holds the agent. `provider.ts` builds the Bedrock client,
`prompt.ts` the analyst persona, and `tools.ts` the tools it can call:

- `saveFact` — writes a durable fact to the user's knowledge base
- `searchKnowledgeBase` — reads facts back before asking the user to repeat
- `listDataSources` — reports which connectors are attached

Tools are constructed per request and close over the signed-in `userId`, so a
prompt injection cannot address another tenant's data.

Conversations are stored in the AI SDK `UIMessage` format, so tool calls and
reasoning survive a reload. Rows written before that migration are upgraded on
read (`lib/db/conversations.ts`).

The client sends only the newest message; history is loaded server-side from
DynamoDB and never trusted from the browser.

## Deploying to Vercel

1. Import the repository, set the root directory to `nantano`. The framework
   preset and build command are detected automatically.
2. Add every variable from `.env.example` under Settings → Environment
   Variables.
3. Set `APP_URL` to the deployed origin (e.g. `https://veloxiz.ai`). The OAuth
   redirect URI is derived from it.
4. Add that origin's callback to the Google Cloud console under **Authorized
   redirect URIs**:
   `https://<your-domain>/api/auth/google/callback`

### Notes

- `/api/chat` declares `maxDuration = 60`, the ceiling on the Hobby plan. Paid
  plans allow more; raise it if multi-step tool runs get truncated.
- The AWS credentials need DynamoDB access on the `VELOXIZ_*` tables plus
  `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream`. Missing
  Bedrock permissions surface as an actionable banner in the chat rather than a
  generic failure.
- Bedrock is reached over SigV4-signed `fetch`, not the AWS SDK, so the chat
  route stays small. DynamoDB still uses the AWS SDK and needs the Node runtime.
- Create the DynamoDB tables once with `npm run setup:dynamo`.
