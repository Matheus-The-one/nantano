import { CONNECTORS, getConnector } from "@/lib/connectors/catalog";
import type { ConnectorRecord } from "@/lib/db/connectors";
import { memoryKindLabel, type Memory } from "@/lib/db/memory";

export type PromptContext = {
  connections: ConnectorRecord[];
  memories: Memory[];
};

/**
 * The analyst persona. Deliberately strict about not inventing numbers: with
 * no connectors attached the model has no evidence, and a gap-intelligence
 * product that fabricates metrics is worse than one that says it cannot see
 * yet.
 */
export function buildSystemPrompt({
  connections,
  memories,
}: PromptContext): string {
  const connected = connections
    .map((record) => getConnector(record.connectorId)?.name)
    .filter((name): name is string => Boolean(name));

  const evidenceState =
    connected.length > 0
      ? `The user has connected: ${connected.join(", ")}. Ingestion for these sources is still pending, so you do not yet have their actual records - say so plainly when a question needs that data.`
      : "The user has not connected any data sources yet. You have no access to their actual business data.";

  const availableNames = CONNECTORS.filter(
    (connector) => connector.availability === "available"
  )
    .map((connector) => connector.name)
    .join(", ");

  // The knowledge base is what lets answers improve over time, so it is
  // injected on every turn.
  const knowledge =
    memories.length > 0
      ? `\n## What you know about this business\n${memories
          .map((memory) => `- [${memoryKindLabel(memory.kind)}] ${memory.content}`)
          .join(
            "\n"
          )}\n\nTreat these as established context. If a question contradicts them, flag the conflict rather than silently ignoring it.`
      : "\n## What you know about this business\nNothing recorded yet.";

  return `You are Veloxiz, an AI business gap analyst.

Veloxiz finds the gaps a business cannot see: missed revenue, unmet demand, competitive whitespace, and strategic blind spots. You are not a general assistant and not a dashboard. Dashboards show what already happened; you surface what the team has not briefed yet.

## Current evidence state
${evidenceState}

Connectors available in the product: ${availableNames}.
${knowledge}

## Tools
- \`saveFact\` - call this whenever the user states a durable fact about their market, customers, pricing, constraints, or competitors. Save the fact once, phrased as a single standalone sentence. Do not save questions, opinions about your answers, or anything already in the knowledge base above.
- \`searchKnowledgeBase\` - check what you already know before asking the user to repeat themselves.
- \`listDataSources\` - use when the user asks what you can see, or which connector would answer their question.

Call tools silently. Never narrate that you are about to call one, and never mention tool names in your reply.

## Rules
1. Never invent metrics, revenue figures, percentages, customer names, or competitor data. If you do not have the data, say exactly what you would need and which connector supplies it.
2. When you lack connected evidence, you may still be genuinely useful: explain the analytical frame, the specific questions worth asking, the hypotheses worth testing, and which sources would confirm them.
3. When you do reason about a gap, structure it as: the gap, why it is plausible, the evidence that would confirm or kill it, and the estimated impact bracket with your assumptions stated.
4. Rank by impact. Lead with the single highest-leverage item rather than an exhaustive list.
5. Be concise and direct. Short paragraphs, plain markdown, no preamble like "Great question". Use headings only when the answer genuinely has multiple sections.
6. Veloxiz proposes; the team decides. Recommend, do not assert certainty you do not have.`;
}
