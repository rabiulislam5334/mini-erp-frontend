import {
  Package,
  Users,
  Receipt,
  Wallet,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { Loader } from "@/components/ui/loader";

const statCards = [
  { key: "totalProducts", label: "Total products", icon: Package },
  { key: "totalCustomers", label: "Total customers", icon: Users },
  { key: "totalSales", label: "Total sales", icon: Receipt },
  { key: "totalRevenue", label: "Total revenue", icon: Wallet, prefix: "৳ " },
] as const;

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return <Loader label="Loading dashboard stats..." />;
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center border border-dashed border-border/60 rounded-xl bg-card/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          Couldn't load dashboard stats. Please check your connection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* Header Section */}
      <div>
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          A real-time overview of your enterprise operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            className="group relative rounded-xl border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {card.label}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/10 transition-colors group-hover:bg-primary/20">
                <card.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="mt-4 font-sans text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              {"prefix" in card ? card.prefix : ""}
              {data[card.key].toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Low Stock Status Section */}
      {data.lowStockProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5 border-b border-destructive/10 pb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold tracking-tight text-destructive">
                Low Stock Alert
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Items requiring immediate inventory replenishment.
              </p>
            </div>
          </div>
          <ul className="mt-2 divide-y divide-destructive/10">
            {data.lowStockProducts.map((p) => (
              <li
                key={p._id}
                className="flex items-center justify-between py-3.5 text-sm transition-colors hover:bg-destructive/5 px-2 rounded-md"
              >
                <span className="font-medium text-foreground">
                  {p.name}{" "}
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded ml-1.5">
                    {p.sku}
                  </span>
                </span>
                <span className="font-semibold text-destructive bg-destructive/10 px-2.5 py-0.5 rounded-full text-xs">
                  {p.stockQuantity} left
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : (
        /* Healthy Inventory (Empty State) */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-xl border border-dashed border-border/80 bg-card/30 p-10 text-center backdrop-blur-sm flex flex-col items-center justify-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h3 className="font-sans text-sm font-semibold text-foreground mt-2">
            Inventory Healthy
          </h3>
          <p className="max-w-xs text-xs text-muted-foreground">
            All product stocks are at optimal levels. No low-stock warnings at
            the moment.
          </p>
        </motion.div>
      )}
    </div>
  );
}
