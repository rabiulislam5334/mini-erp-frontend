import { useState } from "react";
import { Plus, Users, AlertCircle } from "lucide-react";
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
import { UserFormDialog } from "@/components/users/UserFormDialog";
import { useUsers } from "@/hooks/useUsers";

export default function UsersPage() {
  // ১. আপনার useUsers হুক থেকে সাধারণত mutate বা refetch-ও ডেস্ট্রাকচার করে নেওয়া ভালো
  const { data: users, isLoading, isError } = useUsers();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Bar / Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Team members
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Manage who has access to Apex ERP.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="shadow-sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add member
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-12">
            <Loader label="Loading team members..." />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-medium text-muted-foreground">
              Couldn't load team members. Please try again.
            </p>
          </div>
        ) : users && users.length > 0 ? (
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u._id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium text-foreground">
                    {u.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground/90 font-mono text-xs">
                    {u.email}
                  </TableCell>
                  <TableCell className="capitalize">
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border/40">
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-muted text-muted-foreground/80"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          /* Premium Empty State */
          <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div className="max-w-xs space-y-1">
              <h3 className="text-sm font-medium text-foreground">
                No team members
              </h3>
              <p className="text-xs text-muted-foreground">
                Add your first team member to start collaborating in Apex ERP.
              </p>
            </div>
            <Button
              onClick={() => setFormOpen(true)}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Add first member
            </Button>
          </div>
        )}
      </div>

      {/* Form Dialog */}
      <UserFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
