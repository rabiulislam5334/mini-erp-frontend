import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSale, getSales } from "../services/saleService";
import type { ISaleFormValues } from "@/types";


export const useSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: getSales,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: ISaleFormValues) => createSale(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Sale created");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create sale");
    },
  });
};
