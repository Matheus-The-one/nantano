/**
 * The connector catalog.
 *
 * This is the single source of truth for what the dashboard offers. Each entry
 * declares the credential shape the connector will actually need once
 * ingestion is wired up, so the connect dialog is honest about the real
 * requirements rather than showing invented fields.
 */

export type ConnectorCategory =
  | "email-calendar"
  | "databases"
  | "crm-support"
  | "workspace";

/**
 * - `available`   : can be connected now through the UI.
 * - `coming-soon` : listed for roadmap visibility, connect button disabled.
 */
export type ConnectorAvailability = "available" | "coming-soon";

/** How a connector authenticates, which determines the dialog we render. */
export type ConnectorAuthKind = "oauth" | "credentials" | "api-key";

export type ConnectorField = {
  key: string;
  label: string;
  placeholder?: string;
  /** Rendered as a password input and never echoed back to the client. */
  secret?: boolean;
  optional?: boolean;
  helpText?: string;
};

export type ConnectorDefinition = {
  id: string;
  name: string;
  category: ConnectorCategory;
  availability: ConnectorAvailability;
  authKind: ConnectorAuthKind;
  /** One-line value statement, phrased in terms of gap intelligence. */
  summary: string;
  /** What Veloxiz does with the data once connected. */
  signals: string[];
  /** Path under /public, or null when we fall back to a lucide glyph. */
  logo: string | null;
  /** OAuth scopes requested, for `oauth` connectors. */
  scopes?: string[];
  /** Fields collected in the connect dialog, for non-oauth connectors. */
  fields?: ConnectorField[];
};

export const CONNECTOR_CATEGORIES: {
  id: ConnectorCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "email-calendar",
    label: "Email & Calendar",
    description:
      "Deal threads and meeting patterns reveal where momentum stalls and which conversations never got a follow-up.",
  },
  {
    id: "databases",
    label: "Databases & Warehouses",
    description:
      "Your product and revenue tables are the ground truth Veloxiz scores gaps against.",
  },
  {
    id: "crm-support",
    label: "CRM & Support",
    description:
      "Pipeline stages and ticket themes surface unmet demand and the objections that keep losing deals.",
  },
  {
    id: "workspace",
    label: "Workspace",
    description:
      "Docs, tickets, and channels carry the strategy context Veloxiz needs to rank a gap against your priorities.",
  },
];

export const CONNECTORS: ConnectorDefinition[] = [
  // --- Email & Calendar -----------------------------------------------------
  {
    id: "gmail",
    name: "Gmail",
    category: "email-calendar",
    availability: "available",
    authKind: "oauth",
    summary: "Read deal threads to spot stalled conversations and unanswered objections.",
    signals: [
      "Threads that went quiet after a pricing question",
      "Response-time drift by segment",
      "Objections repeated across accounts",
    ],
    logo: "/integrations/gmail.png",
    scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "email-calendar",
    availability: "available",
    authKind: "oauth",
    summary: "Map meeting coverage against pipeline to find accounts nobody is working.",
    signals: [
      "Accounts with no meeting in 30+ days",
      "Time spent per deal stage",
      "Demo-to-close cycle length",
    ],
    logo: null,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  },
  {
    id: "outlook",
    name: "Outlook",
    category: "email-calendar",
    availability: "coming-soon",
    authKind: "oauth",
    summary: "Microsoft 365 mail and calendar, same signals as Gmail and Google Calendar.",
    signals: [
      "Stalled deal threads",
      "Meeting coverage gaps",
      "Internal vs. customer time split",
    ],
    logo: "/integrations/outlook.png",
    scopes: ["Mail.Read", "Calendars.Read"],
  },

  // --- Databases & Warehouses ----------------------------------------------
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "databases",
    availability: "available",
    authKind: "credentials",
    summary: "Query product and revenue tables directly as gap-scoring evidence.",
    signals: [
      "Activation and retention curves by cohort",
      "Feature adoption vs. plan tier",
      "Revenue concentration risk",
    ],
    logo: "/integrations/devicon_postgresql.svg",
    fields: [
      { key: "host", label: "Host", placeholder: "db.internal.example.com" },
      { key: "port", label: "Port", placeholder: "5432" },
      { key: "database", label: "Database", placeholder: "analytics" },
      { key: "user", label: "User", placeholder: "veloxiz_readonly" },
      { key: "password", label: "Password", secret: true },
      {
        key: "sslMode",
        label: "SSL mode",
        placeholder: "require",
        optional: true,
        helpText: "One of disable, require, verify-ca, verify-full.",
      },
    ],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "databases",
    availability: "available",
    authKind: "credentials",
    summary: "Same product and revenue evidence, for MySQL-backed stacks.",
    signals: [
      "Order and subscription history",
      "Churn precursors",
      "Catalog gaps vs. demand",
    ],
    logo: "/integrations/logos_mysql.svg",
    fields: [
      { key: "host", label: "Host", placeholder: "db.internal.example.com" },
      { key: "port", label: "Port", placeholder: "3306" },
      { key: "database", label: "Database", placeholder: "analytics" },
      { key: "user", label: "User", placeholder: "veloxiz_readonly" },
      { key: "password", label: "Password", secret: true },
    ],
  },
  {
    id: "snowflake",
    name: "Snowflake",
    category: "databases",
    availability: "available",
    authKind: "credentials",
    summary: "Warehouse-scale history for trend and whitespace analysis.",
    signals: [
      "Multi-year demand trends",
      "Segment profitability",
      "Market share drift",
    ],
    logo: "/integrations/snowflake-db.svg",
    fields: [
      {
        key: "account",
        label: "Account identifier",
        placeholder: "xy12345.us-east-1",
      },
      { key: "warehouse", label: "Warehouse", placeholder: "COMPUTE_WH" },
      { key: "database", label: "Database", placeholder: "ANALYTICS" },
      { key: "schema", label: "Schema", placeholder: "PUBLIC", optional: true },
      { key: "user", label: "User", placeholder: "VELOXIZ" },
      { key: "password", label: "Password", secret: true },
    ],
  },
  {
    id: "bigquery",
    name: "BigQuery",
    category: "databases",
    availability: "available",
    authKind: "credentials",
    summary: "Google Cloud warehouse access via a read-only service account.",
    signals: [
      "Event-level funnel analysis",
      "Attribution gaps",
      "Cost-per-acquisition drift",
    ],
    logo: "/integrations/bigquery.png",
    fields: [
      { key: "projectId", label: "Project ID", placeholder: "my-gcp-project" },
      { key: "dataset", label: "Default dataset", placeholder: "analytics", optional: true },
      {
        key: "serviceAccountJson",
        label: "Service account JSON",
        secret: true,
        helpText: "Paste the full key file. Needs BigQuery Data Viewer and Job User.",
      },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "databases",
    availability: "coming-soon",
    authKind: "credentials",
    summary: "Document collections as product evidence.",
    signals: ["Usage documents", "Catalog coverage", "Config drift"],
    logo: "/integrations/mongodb.svg",
    fields: [
      {
        key: "connectionString",
        label: "Connection string",
        placeholder: "mongodb+srv://...",
        secret: true,
      },
    ],
  },
  {
    id: "redis",
    name: "Redis",
    category: "databases",
    availability: "coming-soon",
    authKind: "credentials",
    summary: "Real-time counters and session state.",
    signals: ["Live session volume", "Cache-miss hotspots"],
    logo: "/integrations/redis.svg",
    fields: [
      {
        key: "connectionString",
        label: "Connection string",
        placeholder: "rediss://...",
        secret: true,
      },
    ],
  },

  // --- CRM & Support --------------------------------------------------------
  {
    id: "salesforce",
    name: "Salesforce",
    category: "crm-support",
    availability: "available",
    authKind: "oauth",
    summary: "Pipeline, stages, and loss reasons - the core of revenue gap scoring.",
    signals: [
      "Win rate by segment and stage",
      "Loss reasons clustered by theme",
      "Deals slipping quarter over quarter",
    ],
    logo: "/integrations/salesforce.png",
    scopes: ["api", "refresh_token"],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm-support",
    availability: "available",
    authKind: "oauth",
    summary: "Deals, contacts, and marketing funnel in one pull.",
    signals: [
      "Funnel drop-off by source",
      "Lifecycle stage velocity",
      "Unworked inbound leads",
    ],
    logo: "/integrations/hubspot.svg",
    scopes: ["crm.objects.deals.read", "crm.objects.contacts.read"],
  },
  {
    id: "intercom",
    name: "Intercom",
    category: "crm-support",
    availability: "available",
    authKind: "oauth",
    summary: "Conversation themes that signal unmet demand.",
    signals: [
      "Feature requests by frequency",
      "Pre-sale questions that block conversion",
      "Sentiment by plan tier",
    ],
    logo: "/integrations/intercom.png",
    scopes: ["read_conversations", "read_users"],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    category: "crm-support",
    availability: "available",
    authKind: "api-key",
    summary: "Ticket volume and themes as evidence of operational gaps.",
    signals: [
      "Recurring root causes",
      "Resolution time by category",
      "Escalations preceding churn",
    ],
    logo: "/integrations/zendesk.png",
    fields: [
      { key: "subdomain", label: "Subdomain", placeholder: "yourcompany" },
      { key: "email", label: "Agent email", placeholder: "ops@yourcompany.com" },
      { key: "apiToken", label: "API token", secret: true },
    ],
  },
  {
    id: "gong",
    name: "Gong",
    category: "crm-support",
    availability: "coming-soon",
    authKind: "api-key",
    summary: "Call transcripts for objection and competitor mentions.",
    signals: ["Competitor mentions", "Objection frequency", "Talk-ratio outliers"],
    logo: "/integrations/gong.png",
    fields: [
      { key: "accessKey", label: "Access key" },
      { key: "accessKeySecret", label: "Access key secret", secret: true },
    ],
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "crm-support",
    availability: "available",
    authKind: "api-key",
    summary: "Billing truth for revenue, churn, and expansion gaps.",
    signals: [
      "Involuntary churn from failed payments",
      "Expansion vs. contraction by cohort",
      "Plan mix drift",
    ],
    logo: "/integrations/stripe.svg",
    fields: [
      {
        key: "secretKey",
        label: "Restricted API key",
        secret: true,
        helpText: "Use a restricted key with read-only access.",
      },
    ],
  },

  // --- Workspace -----------------------------------------------------------
  {
    id: "slack",
    name: "Slack",
    category: "workspace",
    availability: "available",
    authKind: "oauth",
    summary: "Deliver briefs where your team already works, and read channel context.",
    signals: [
      "Deal-room urgency signals",
      "Where briefs get acted on",
      "Internal blockers raised repeatedly",
    ],
    logo: "/integrations/slack.svg",
    scopes: ["channels:history", "channels:read", "chat:write"],
  },
  {
    id: "notion",
    name: "Notion",
    category: "workspace",
    availability: "available",
    authKind: "oauth",
    summary: "Strategy docs and ICP definitions that teach Veloxiz your priorities.",
    signals: [
      "Stated strategy vs. observed behaviour",
      "ICP and constraint definitions",
      "Roadmap coverage gaps",
    ],
    logo: "/integrations/notion.svg",
    scopes: ["read_content"],
  },
  {
    id: "jira",
    name: "Jira",
    category: "workspace",
    availability: "available",
    authKind: "api-key",
    summary: "Delivery throughput and the backlog behind unmet demand.",
    signals: [
      "Cycle time by team",
      "Requested features still unshipped",
      "Bug classes that drive support load",
    ],
    logo: "/integrations/jira.svg",
    fields: [
      { key: "siteUrl", label: "Site URL", placeholder: "https://yourco.atlassian.net" },
      { key: "email", label: "Account email", placeholder: "ops@yourcompany.com" },
      { key: "apiToken", label: "API token", secret: true },
    ],
  },
  {
    id: "confluence",
    name: "Confluence",
    category: "workspace",
    availability: "coming-soon",
    authKind: "api-key",
    summary: "Internal knowledge base as strategy context.",
    signals: ["Documented process vs. actual", "Stale ownership"],
    logo: "/integrations/confluence.svg",
    fields: [
      { key: "siteUrl", label: "Site URL", placeholder: "https://yourco.atlassian.net/wiki" },
      { key: "email", label: "Account email" },
      { key: "apiToken", label: "API token", secret: true },
    ],
  },
  {
    id: "ms-teams",
    name: "Microsoft Teams",
    category: "workspace",
    availability: "coming-soon",
    authKind: "oauth",
    summary: "Brief delivery and channel context for Microsoft shops.",
    signals: ["Deal-room signals", "Brief engagement"],
    logo: "/integrations/ms-teams.png",
    scopes: ["Channel.ReadBasic.All", "ChannelMessage.Read.All"],
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "workspace",
    availability: "available",
    authKind: "oauth",
    summary: "Decks and models that carry your market assumptions.",
    signals: ["Board-deck claims vs. data", "Pricing models", "Market sizing inputs"],
    logo: "/integrations/google-drive.png",
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "workspace",
    availability: "available",
    authKind: "oauth",
    summary: "The spreadsheets your forecasts actually live in.",
    signals: ["Forecast vs. actual", "Manual pipeline tracking", "Territory plans"],
    logo: "/integrations/google-sheets.svg",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "workspace",
    availability: "coming-soon",
    authKind: "oauth",
    summary: "Shipping velocity against promised roadmap.",
    signals: ["Release cadence", "Roadmap slippage"],
    logo: "/integrations/github.svg",
    scopes: ["repo:status", "read:org"],
  },
];

export function getConnector(id: string): ConnectorDefinition | undefined {
  return CONNECTORS.find((connector) => connector.id === id);
}

export function connectorsByCategory(
  category: ConnectorCategory
): ConnectorDefinition[] {
  return CONNECTORS.filter((connector) => connector.category === category);
}

/** Connector ids whose data can drive process discovery. */
export const PROCESS_CAPABLE_CONNECTORS = [
  "gmail",
  "google-calendar",
  "outlook",
  "postgresql",
  "mysql",
  "snowflake",
  "bigquery",
  "salesforce",
  "hubspot",
  "zendesk",
  "jira",
] as const;
