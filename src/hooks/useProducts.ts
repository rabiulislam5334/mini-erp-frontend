import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";
import type { IProductFormValues } from "@/types";

export const useProducts = (params: {
  searchTerm?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: IProductFormValues) => createProduct(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Product created");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create product");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: IProductFormValues }) =>
      updateProduct(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update product");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Product deleted");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    },
  });
};
