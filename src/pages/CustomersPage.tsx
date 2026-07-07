import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
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
import { CustomerFormDialog } from "@/components/customers/CustomerFormDialog";
import { useCustomers, useDeleteCustomer } from "@/hooks/useCustomers";
import { useAuthStore } from "@/store/authStore";
import type { ICustomer } from "@/types";

const LIMIT = 10;

export default function CustomersPage() {
  const { user } = useAuthStore();
  const canManage = user?.role === "admin" || user?.role === "manager";

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError, isPlaceholderData } = useCustomers({
    searchTerm: searchTerm || undefined,
    page,
    limit: LIMIT,
  });
  const deleteCustomer = useDeleteCustomer();

  const customers = data?.data ?? [];
  const meta = data?.meta;

  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<ICustomer | null>(null);

  const openCreateForm = () => {
    setEditingCustomer(null);
    setFormOpen(true);
  };

  const openEditForm = (customer: ICustomer) => {
    setEditingCustomer(customer);
    setFormOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteCustomer.mutate(deleteTarget._id, {
        onSuccess: () => setDeleteTarget(null),
      });
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Customers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everyone who's bought from you.
          </p>
        </div>
        {canManage && (
          <Button onClick={openCreateForm}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add customer
          </Button>
        )}
      </div>

      <div className="relative mt-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name, phone, or email..."
          className="pl-9"
        />
      </div>

      <div className="mt-4 rounded-xl border border-border">
        {isLoading ? (
          <Loader label="Loading customers..." />
        ) : isError ? (
          <p className="p-6 text-sm text-muted-foreground">
            Couldn't load customers. Please try again.
          </p>
        ) : customers.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Address
                  </TableHead>
                  {canManage && (
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {customer.email}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {customer.address}
                    </TableCell>
                    {canManage && (
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditForm(customer)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(customer)}
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
                ? `No customers match "${searchTerm}".`
                : "No customers yet. Add your first customer to get started."}
            </p>
          </div>
        )}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPage} · {meta.total} customers
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
        <CustomerFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          customer={editingCustomer}
        />
      )}

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this customer?</AlertDialogTitle>
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
