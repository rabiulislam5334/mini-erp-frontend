import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export function CTA() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative overflow-hidden border-t border-border/40 bg-muted/20">
      <div className="absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-border/60 bg-card/50 px-6 py-14 text-center shadow-xl backdrop-blur-md sm:px-12"
        >
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready to run your shop's books properly?
          </h2>
          <p className="mt-4 max-w-md text-base text-muted-foreground leading-relaxed">
            Join Apex ERP and keep products, customers, and sales in one place —
            no spreadsheets required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="shadow-md transition-transform active:scale-95"
              onClick={() =>
                navigate(isAuthenticated ? "/dashboard" : "/login")
              }
            >
              {isAuthenticated ? "Go to dashboard" : "Get started for free"}{" "}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>

            {/* এখানে <a ট্যাগটি ঠিক করে দেওয়া হয়েছে */}
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground underline-offset-4 hover:underline"
            >
              Explore features
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
