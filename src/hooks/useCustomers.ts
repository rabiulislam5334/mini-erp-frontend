import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../services/customerService";
import type { ICustomerFormValues } from "@/types";

export const useCustomers = (
  params: { searchTerm?: string; page?: number; limit?: number } = {},
) => {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => getCustomers(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: ICustomerFormValues) => createCustomer(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Customer created");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create customer");
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: ICustomerFormValues }) =>
      updateCustomer(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer updated");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update customer");
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Customer deleted");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete customer");
    },
  });
};
