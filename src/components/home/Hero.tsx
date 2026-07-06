import { motion } from "framer-motion";
import { ArrowRight, Package, Users, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ledgerRows = [
  { label: "Products tracked", value: "1,204", icon: Package },
  { label: "Active customers", value: "386", icon: Users },
  { label: "Sales this month", value: "৳ 4,82,300", icon: Receipt },
];

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Subtle Gradient Effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.opacity-10),transparent)]" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-border/80 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            Inventory · Sales · Customers — in one ledger
          </p>
          <h1 className="font-sans text-4xl font-semibold leading-tight tracking-tight sm:text-5xl text-foreground">
            Run your shop's books without the spreadsheet chaos.
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg leading-relaxed">
            ApexERP keeps stock counts, customer records, and every sale in one
            place — so you always know what you have, what you sold, and what
            it's worth.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button
              size="lg"
              className="shadow-md transition-transform active:scale-95"
              onClick={() => navigate("/login")}
            >
              Get started <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground underline-offset-4 hover:underline"
            >
              See what's inside
            </a>
          </div>
        </motion.div>

        {/* Right Side UI Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="rounded-2xl border border-border/60 bg-card/50 p-2 shadow-xl backdrop-blur-md"
        >
          <div className="rounded-xl border border-border/40 bg-background/50 overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-3">
              <span className="text-xs font-medium text-muted-foreground">
                Today's ledger overview
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </div>
            <ul className="divide-y divide-border/40">
              {ledgerRows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between px-5 py-4 hover:bg-muted/10 transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/10">
                      <row.icon className="h-4 w-4 text-primary" />
                    </div>
                    {row.label}
                  </span>
                  <span className="font-sans text-sm font-semibold tracking-tight text-foreground tabular-nums">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
