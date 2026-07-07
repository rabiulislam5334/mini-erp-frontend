import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ImageOff,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader } from "@/components/ui/loader";
import { ProductFormDialog } from "@/components/products/ProductFormDialog";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import type { IProduct } from "@/types";

const LIMIT = 5;

export default function ProductsPage() {
  const { user } = useAuthStore();
  const canManage = user?.role === "admin" || user?.role === "manager";

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search input -> searchTerm (400ms), and reset to page 1 on new search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError, isPlaceholderData } = useProducts({
    searchTerm: searchTerm || undefined,
    page,
    limit: LIMIT,
  });
  const deleteProduct = useDeleteProduct();

  const products = data?.data ?? [];
  const meta = data?.meta;

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEditForm = (product: IProduct) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteProduct.mutate(deleteTarget._id, {
        onSuccess: () => setDeleteTarget(null),
      });
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your inventory catalog.
          </p>
        </div>
        {canManage && (
          <Button onClick={openCreateForm}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add product
          </Button>
        )}
      </div>

      <div className="relative mt-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, SKU, or category..."
          className="pl-9"
        />
      </div>

      <div className="mt-4 rounded-xl border border-border">
        {isLoading ? (
          <Loader label="Loading products..." />
        ) : isError ? (
          <p className="p-6 text-sm text-muted-foreground">
            Couldn't load products. Please try again.
          </p>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden text-right sm:table-cell">
                    Purchase
                  </TableHead>
                  <TableHead className="text-right">Selling</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  {canManage && (
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                          <ImageOff className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.sku}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {product.category}
                    </TableCell>
                    <TableCell className="hidden text-right tabular-nums sm:table-cell">
                      ৳ {product.purchasePrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      ৳ {product.sellingPrice.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className={`text-right tabular-nums ${
                        product.stockQuantity <= 5
                          ? "font-semibold text-destructive"
                          : ""
                      }`}
                    >
                      {product.stockQuantity}
                    </TableCell>
                    {canManage && (
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditForm(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(product)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? `No products match "${searchTerm}".`
                : "No products yet. Add your first product to get started."}
            </p>
          </div>
        )}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPage} · {meta.total} products
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

      {canManage && (
        <ProductFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          product={editingProduct}
        />
      )}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.name}" will be permanently removed. This can't be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
