import Image from "next/image";

/** PNG-only set - equal visual weight in the overlay grid */
const integrations = [
  { name: "Salesforce", logo: "/integrations/salesforce.png" },
  { name: "HubSpot", logo: "/integrations/hubspot.png" },
  { name: "Snowflake", logo: "/integrations/snowflake.png" },
  { name: "BigQuery", logo: "/integrations/bigquery.png" },
  { name: "Slack", logo: "/integrations/slack.png" },
  { name: "Notion", logo: "/integrations/notion.png" },
  { name: "Jira", logo: "/integrations/jira.png" },
  { name: "Confluence", logo: "/integrations/confluence.png" },
  { name: "Intercom", logo: "/integrations/intercom.png" },
  { name: "Zendesk", logo: "/integrations/zendesk.png" },
  { name: "Monday", logo: "/integrations/monday.png" },
  { name: "Workday", logo: "/integrations/workday.png" },
  { name: "Outlook", logo: "/integrations/outlook.png" },
  { name: "Gmail", logo: "/integrations/gmail.png" },
  { name: "Teams", logo: "/integrations/ms-teams.png" },
];

export function IntegrationsPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="site-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Integrations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
              Connect your stack.
              <br />
              Veloxiz meets you there.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-md">
              CRM, product analytics, support, and market sources - Veloxiz pulls
              context, scores gaps, and syncs briefs where your team already works.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] sm:aspect-[5/4]">
            <Image
              src="/brand/integrations-ui.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/30" />
            <div className="absolute inset-0 grain" />

            <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
              <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full max-w-[360px] sm:max-w-[420px]">
                {integrations.map((intg) => (
                  <div
                    key={intg.name}
                    title={intg.name}
                    className="aspect-square rounded-xl sm:rounded-2xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.22)] flex items-center justify-center transition-transform hover:-translate-y-0.5"
                  >
                    {/* Fixed inner box so every PNG shares the same visual size */}
                    <div className="relative w-[52%] h-[52%]">
                      <Image
                        src={intg.logo}
                        alt={intg.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
