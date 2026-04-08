"use client";

const stats = [
  { label: "API Calls per Month", value: "2.5B+" },
  { label: "Uptime Guarantee", value: "99.9%" },
  { label: "Global Endpoints", value: "15+" },
  { label: "Response Time", value: "<50ms" },
];

export function Stats() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of developers building the next generation of
            applications
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
                  {stat.value}
                </div>
                <div className="mt-2 text-base leading-7 text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
