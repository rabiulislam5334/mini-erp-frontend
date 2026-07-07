import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function CustomersPage() {
  const { user } = useAuthStore();
  const canManage = user?.role === "admin" || user?.role === "manager";

  const { data: customers, isLoading, isError } = useCustomers();
  const deleteCustomer = useDeleteCustomer();

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

      <div className="mt-6 rounded-xl border border-border">
        {isLoading ? (
          <Loader label="Loading customers..." />
        ) : isError ? (
          <p className="p-6 text-sm text-muted-foreground">
            Couldn't load customers. Please try again.
          </p>
        ) : customers && customers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                {canManage && (
                  <TableHead className="w-24 text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
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
        ) : (
          <div className="p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No customers yet. Add your first customer to get started.
            </p>
          </div>
        )}
      </div>

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
