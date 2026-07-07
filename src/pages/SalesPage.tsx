import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components/ui/loader";
import { SaleFormDialog } from "@/components/sales/SaleFormDialog";
import { useSales } from "@/hooks/useSales";

export default function SalesPage() {
  const { data: sales, isLoading, isError } = useSales();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Sales
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every sale you've logged, newest first.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-1.5 h-4 w-4" />
          New sale
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-border">
        {isLoading ? (
          <Loader label="Loading sales..." />
        ) : isError ? (
          <p className="p-6 text-sm text-muted-foreground">
            Couldn't load sales. Please try again.
          </p>
        ) : sales && sales.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...sales]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell className="font-medium">
                      {sale.customer?.name ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {sale.items
                        .map(
                          (item) => `${item.product?.name} × ${item.quantity}`,
                        )
                        .join(", ")}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      ৳ {sale.grandTotal.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No sales yet. Create your first sale to get started.
            </p>
          </div>
        )}
      </div>

      <SaleFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
