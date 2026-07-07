import { useEffect, useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const LIMIT = 5;

export default function SalesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError, isPlaceholderData } = useSales({
    searchTerm: searchTerm || undefined,
    sort: "-createdAt",
    page,
    limit: LIMIT,
  });

  const sales = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          New Sale
        </Button>
      </div>

      <div className="relative mt-4 w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by customer name..."
          className="pl-9"
        />
      </div>

      <div className="mt-6 rounded-xl border border-border">
        {isLoading ? (
          <Loader label="Loading sales..." />
        ) : isError ? (
          <p className="p-6 text-sm text-muted-foreground">
            Couldn't load sales. Please try again.
          </p>
        ) : sales.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
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
                  {sales.map((sale) => (
                    <TableRow key={sale._id}>
                      <TableCell className="font-medium">
                        {sale.customer?.name ?? "—"}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {sale.items
                          .map(
                            (item) =>
                              `${item.product?.name} × ${item.quantity}`,
                          )
                          .join(", ")}
                      </TableCell>

                      <TableCell className="text-right font-medium">
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

            {/* Mobile Cards */}
            <div className="space-y-4 p-4 md:hidden">
              {sales.map((sale) => (
                <div key={sale._id} className="rounded-lg border p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {sale.customer?.name ?? "—"}
                    </h3>

                    <span className="font-semibold">
                      ৳ {sale.grandTotal.toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {sale.items
                      .map((item) => `${item.product?.name} × ${item.quantity}`)
                      .join(", ")}
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-10 text-center">
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? "No sales matched your search."
                : "No sales yet. Create your first sale to get started."}
            </p>
          </div>
        )}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            Page {meta.page} of {meta.totalPage} • {meta.total} sales
          </p>

          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isPlaceholderData}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= (meta.totalPage ?? 1) || isPlaceholderData}
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
