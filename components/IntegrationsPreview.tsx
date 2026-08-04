import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const integrations = [
  { name: "PostgreSQL",    logo: "/integrations/devicon_postgresql.svg" },
  { name: "MySQL",         logo: "/integrations/logos_mysql.svg" },
  { name: "MongoDB",       logo: "/integrations/mongodb.svg" },
  { name: "Redis",         logo: "/integrations/redis.svg" },
  { name: "Snowflake",     logo: "/integrations/snowflake-db.svg" },
  { name: "Airtable",      logo: "/integrations/logos_airtable.svg" },
  { name: "Google Sheets", logo: "/integrations/google-sheets.svg" },
  { name: "HubSpot",       logo: "/integrations/hubspot.svg" },
  { name: "Confluence",    logo: "/integrations/confluence.svg" },
  { name: "Jira",          logo: "/integrations/jira.svg" },
  { name: "Notion",        logo: "/integrations/notion.svg" },
  { name: "Slack",         logo: "/integrations/slack.svg" },
  { name: "Stripe",        logo: "/integrations/stripe.svg" },
  { name: "GitHub",        logo: "/integrations/github.svg" },
  { name: "Workday",       logo: "/integrations/workday-icon.svg" },
];

export function IntegrationsPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-6">
        <SectionHeader
          eyebrow="Integrations"
          title="Connects to your existing stack"
          description="Plug Veloxiz into your data sources, notification channels, and cloud infrastructure — no rip-and-replace."
        />

        <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto">
          {integrations.map((intg) => (
            <div
              key={intg.name}
              className="card-hover flex items-center gap-2.5 rounded-xl border border-border/60 bg-card px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md"
            >
              <Image
                src={intg.logo}
                alt={intg.name}
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="text-sm font-medium text-foreground/75 whitespace-nowrap">{intg.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
