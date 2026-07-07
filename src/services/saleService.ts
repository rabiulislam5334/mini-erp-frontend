import { apiClient } from "../lib/apiClient";
import type {
  IApiResponse,
  ISale,
  ISaleFormValues,
  IPaginationMeta,
} from "../types";

type SaleListResponse = IApiResponse<ISale[]> & { meta: IPaginationMeta };

export const getSales = async (params: {
  page?: number;
  limit?: number;
}): Promise<{ data: ISale[]; meta: IPaginationMeta }> => {
  const response = await apiClient.get<SaleListResponse>("/sales", { params });
  return { data: response.data.data, meta: response.data.meta };
};

export const createSale = async (values: ISaleFormValues) => {
  const { data } = await apiClient.post<IApiResponse<ISale>>("/sales", values);
  return data.data;
};
