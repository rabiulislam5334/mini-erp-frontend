import type { IApiResponse, ISale, ISaleFormValues } from "@/types";
import { apiClient } from "../lib/apiClient";

export const getSales = async (): Promise<ISale[]> => {
  const { data } = await apiClient.get<IApiResponse<ISale[]>>("/sales");
  return data.data;
};

export const createSale = async (values: ISaleFormValues) => {
  const { data } = await apiClient.post<IApiResponse<ISale>>("/sales", values);
  return data.data;
};
