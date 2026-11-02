import { tool, type InferUITools } from "ai";
import { z } from "zod";
import { CONNECTORS, getConnector } from "@/lib/connectors/catalog";
import type { ConnectorRecord } from "@/lib/db/connectors";
import { listMemories, saveMemory } from "@/lib/db/memory";
import { MEMORY_KINDS, memoryKindLabel } from "@/lib/memory/schema";

export type ToolContext = {
  userId: string;
  connections: ConnectorRecord[];
};

/**
 * Tools are built per request so each one closes over the signed-in user. A
 * tool must never take a userId as model input - that would let a prompt
 * injection write into another tenant's knowledge base.
 */
export function buildTools({ userId, connections }: ToolContext) {
  return {
    saveFact: tool({
      description:
        "Save a durable fact the user stated about their business to the knowledge base. Use for lasting context (market, ICP, pricing, constraints, competitors), never for one-off questions.",
      inputSchema: z.object({
        kind: z
          .enum(MEMORY_KINDS)
          .describe("Which category of business context this fact belongs to."),
        content: z
          .string()
          .min(3)
          .max(500)
          .describe(
            "The fact as a single standalone sentence, understandable without the surrounding conversation."
          ),
      }),
      execute: async ({ kind, content }) => {
        const memory = await saveMemory({
          userId,
          kind,
          content,
          origin: "stated",
        });

        return {
          saved: true as const,
          kind: memoryKindLabel(memory.kind),
          content: memory.content,
        };
      },
    }),

    searchKnowledgeBase: tool({
      description:
        "Search facts already known about this business. Use before asking the user to repeat context.",
      inputSchema: z.object({
        query: z
          .string()
          .max(200)
          .describe("Keywords to match. Pass an empty string to list everything."),
      }),
      execute: async ({ query }) => {
        const memories = await listMemories(userId);
        const needle = query.trim().toLowerCase();

        const matches = (
          needle.length === 0
            ? memories
            : memories.filter((memory) =>
                memory.content.toLowerCase().includes(needle)
              )
        ).slice(0, 25);

        return {
          count: matches.length,
          facts: matches.map((memory) => ({
            kind: memoryKindLabel(memory.kind),
            content: memory.content,
            origin: memory.origin,
          })),
        };
      },
    }),

    listDataSources: tool({
      description:
        "List which data sources the user has connected and which are still available to connect. Use when asked what you can see, or which source would answer a question.",
      inputSchema: z.object({}),
      execute: async () => {
        const connected = connections.map((record) => ({
          name: getConnector(record.connectorId)?.name ?? record.connectorId,
          ingestion: record.ingestion,
        }));

        const connectedIds = new Set(
          connections.map((record) => record.connectorId)
        );

        return {
          connected,
          // Keeps the model from recommending a connector we cannot offer yet.
          availableToConnect: CONNECTORS.filter(
            (connector) =>
              connector.availability === "available" &&
              !connectedIds.has(connector.id)
          ).map((connector) => connector.name),
        };
      },
    }),
  };
}

export type VeloxizTools = ReturnType<typeof buildTools>;

/** Tool shapes as they appear on `UIMessage.parts`. */
export type VeloxizUITools = InferUITools<VeloxizTools>;
