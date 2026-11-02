/**
 * Display names for tool activity rows in the transcript.
 *
 * Kept separate from `lib/ai/tools.ts` on purpose: that module pulls in the
 * DynamoDB client, so importing it from a client component would ship the AWS
 * SDK to the browser.
 */
export function toolActivityLabel(toolName: string): string {
  switch (toolName) {
    case "saveFact":
      return "Saved to knowledge base";
    case "searchKnowledgeBase":
      return "Checked knowledge base";
    case "listDataSources":
      return "Reviewed connected sources";
    default:
      return toolName;
  }
}
