import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useCreateSale } from "@/hooks/useSales";
import { useProducts } from "@/hooks/useProducts";
import { useCustomers } from "@/hooks/useCustomers";
import type { ISaleFormValues } from "@/types";

interface SaleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaleFormDialog({ open, onOpenChange }: SaleFormDialogProps) {
  const { data: productsData } = useProducts({ limit: 1000 });
  const products = productsData?.data;
  const { data: customersData } = useCustomers({ limit: 1000 });
  const customers = customersData?.data;
  const createSale = useCreateSale();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISaleFormValues>({
    defaultValues: { customer: "", items: [{ product: "", quantity: 1 }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  useEffect(() => {
    if (open) {
      reset({ customer: "", items: [{ product: "", quantity: 1 }] });
    }
  }, [open, reset]);

  const watchedItems = watch("items");
  const getProduct = (id: string) => products?.find((p) => p._id === id);
  const getCustomer = (id: string) => customers?.find((c) => c._id === id);

  const grandTotal = watchedItems.reduce((sum, item) => {
    const product = getProduct(item.product);
    if (!product || !item.quantity) return sum;
    return sum + product.sellingPrice * Number(item.quantity);
  }, 0);

  const onSubmit = (values: ISaleFormValues) => {
    createSale.mutate(values, { onSuccess: () => onOpenChange(false) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>New sale</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <Label>Customer</Label>
            <Select
              onValueChange={(value) => setValue("customer", value as string)}
              value={watch("customer")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a customer">
                  {(value: string) => {
                    const c = getCustomer(value);
                    return c ? `${c.name} · ${c.phone}` : "Select a customer";
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {customers?.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name} · {c.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.customer && (
              <p className="text-xs text-destructive">Customer is required</p>
            )}
            <input
              type="hidden"
              {...register("customer", { required: true })}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ product: "", quantity: 1 })}
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add item
              </Button>
            </div>

            {fields.map((field, index) => {
              const selectedProduct = getProduct(watchedItems[index]?.product);
              const lineTotal = selectedProduct
                ? selectedProduct.sellingPrice *
                  (Number(watchedItems[index]?.quantity) || 0)
                : 0;

              return (
                <div
                  key={field.id}
                  className="flex items-end gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex-1 space-y-1.5">
                    <Label className="text-xs">Product</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue(`items.${index}.product`, value as string)
                      }
                      value={watchedItems[index]?.product}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a product">
                          {(value: string) => {
                            const p = getProduct(value);
                            return p
                              ? `${p.name} (${p.sku})`
                              : "Select a product";
                          }}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {products?.map((p) => (
                          <SelectItem key={p._id} value={p._id}>
                            {p.name} ({p.sku}) — ৳ {p.sellingPrice} ·{" "}
                            {p.stockQuantity} in stock
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-24 space-y-1.5">
                    <Label className="text-xs">Qty</Label>
                    <Input
                      type="number"
                      min={1}
                      {...register(`items.${index}.quantity`, {
                        required: true,
                        valueAsNumber: true,
                        min: 1,
                      })}
                    />
                  </div>

                  <div className="w-28 shrink-0 text-right text-sm font-medium tabular-nums">
                    ৳ {lineTotal.toLocaleString()}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
            <span className="text-sm font-medium">Grand total</span>
            <span className="font-display text-lg font-semibold tabular-nums">
              ৳ {grandTotal.toLocaleString()}
            </span>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createSale.isPending}>
              {createSale.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create sale
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
