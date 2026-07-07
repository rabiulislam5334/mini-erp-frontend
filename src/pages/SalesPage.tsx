import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
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

const LIMIT = 10;

export default function SalesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isPlaceholderData } = useSales({
    page,
    limit: LIMIT,
  });
  const [formOpen, setFormOpen] = useState(false);

  const sales = data?.data ?? [];
  const meta = data?.meta;

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
        ) : sales.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale._id}>
                    <TableCell className="font-medium">
                      {sale.customer?.name ?? "—"}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
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
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No sales yet. Create your first sale to get started.
            </p>
          </div>
        )}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPage} · {meta.total} sales
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPage || isPlaceholderData}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <SaleFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
