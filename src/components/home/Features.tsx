import { Package, Users, Receipt, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Product & stock tracking",
    description:
      "Every SKU, price, and quantity in one list — with automatic stock deduction on every sale.",
  },
  {
    icon: Users,
    title: "Customer records",
    description:
      "Keep contact details and purchase history for every customer you sell to.",
  },
  {
    icon: Receipt,
    title: "Sales in seconds",
    description:
      "Log a multi-item sale, and ApexERP calculates totals and updates stock instantly.",
  },
  {
    icon: BarChart3,
    title: "Dashboard, not guesswork",
    description:
      "Revenue, low-stock alerts, and totals at a glance — updated the moment a sale happens.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-t border-border/40 bg-muted/20 relative overflow-hidden"
    >
      {/* Subtle background blur spot */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-xl">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-primary/80">
            Features Platform
          </p>
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything a shop's ledger needs
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            No complex modules to configure, no onboarding calls — just the core
            things that actually run an enterprise business.
          </p>
        </div>

        {/* Updated Grid for 4-column professional clean look */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
            >
              {/* Icon Container with Glassmorphism */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>

              <h3 className="mt-4 font-sans text-base font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground/90 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
