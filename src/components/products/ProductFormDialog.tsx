import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Loader2 } from "lucide-react";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import type { IProduct, IProductFormValues } from "@/types";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: IProduct | null;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
}: ProductFormDialogProps) {
  const isEditMode = !!product;
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProductFormValues>();

  useEffect(() => {
    if (open) {
      reset(
        product
          ? {
              name: product.name,
              sku: product.sku,
              category: product.category,
              purchasePrice: product.purchasePrice,
              sellingPrice: product.sellingPrice,
              stockQuantity: product.stockQuantity,
            }
          : {
              name: "",
              sku: "",
              category: "",
              purchasePrice: 0,
              sellingPrice: 0,
              stockQuantity: 0,
            },
      );
    }
  }, [open, product, reset]);

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  const onSubmit = (values: IProductFormValues) => {
    if (isEditMode && product) {
      updateProduct.mutate(
        { id: product._id, values },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createProduct.mutate(values, { onSuccess: () => onOpenChange(false) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit product" : "Add product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Product name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                {...register("sku", { required: "SKU is required" })}
              />
              {errors.sku && (
                <p className="text-xs text-destructive">{errors.sku.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <p className="text-xs text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="purchasePrice">Purchase price</Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                {...register("purchasePrice", {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be ≥ 0" },
                })}
              />
              {errors.purchasePrice && (
                <p className="text-xs text-destructive">
                  {errors.purchasePrice.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sellingPrice">Selling price</Label>
              <Input
                id="sellingPrice"
                type="number"
                step="0.01"
                {...register("sellingPrice", {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be ≥ 0" },
                })}
              />
              {errors.sellingPrice && (
                <p className="text-xs text-destructive">
                  {errors.sellingPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="stockQuantity">Stock qty</Label>
              <Input
                id="stockQuantity"
                type="number"
                {...register("stockQuantity", {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be ≥ 0" },
                })}
              />
              {errors.stockQuantity && (
                <p className="text-xs text-destructive">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="image">
              Product image{" "}
              {isEditMode && "(leave empty to keep current image)"}
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", {
                required: isEditMode ? false : "Image is required",
              })}
            />
            {errors.image && (
              <p className="text-xs text-destructive">
                {errors.image.message as string}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isEditMode ? "Save changes" : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
