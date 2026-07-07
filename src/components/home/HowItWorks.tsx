import { motion } from "framer-motion";
import { UserPlus, PackagePlus, ReceiptText } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create your account",
    description:
      "Sign up in seconds and get straight into a clean, ready-to-use dashboard — no setup calls needed.",
  },
  {
    icon: PackagePlus,
    step: "02",
    title: "Add products & customers",
    description:
      "List your inventory with prices and stock, and save customer details as you go.",
  },
  {
    icon: ReceiptText,
    step: "03",
    title: "Log sales, stay in control",
    description:
      "Record a sale and ApexERP updates stock, totals, and your dashboard instantly — automatically.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-border/40 bg-background"
    >
      <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-xl">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-primary/80">
            How it works
          </p>
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Up and running in three steps
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            No lengthy onboarding — just sign up and start keeping your books
            straight from day one.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
          <div className="pointer-events-none absolute top-9 left-0 right-0 hidden h-px bg-border/60 sm:block" />

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className="relative rounded-xl border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-sans text-sm font-semibold tabular-nums text-muted-foreground/70">
                  {item.step}
                </span>
              </div>

              <h3 className="mt-4 font-sans text-base font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground/90 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
