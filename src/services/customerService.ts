import { apiClient } from "../lib/apiClient";
import type {
  IApiResponse,
  ICustomer,
  ICustomerFormValues,
  IPaginationMeta,
} from "../types";

type CustomerListResponse = IApiResponse<ICustomer[]> & {
  meta: IPaginationMeta;
};

export const getCustomers = async (params: {
  searchTerm?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: ICustomer[]; meta: IPaginationMeta }> => {
  const response = await apiClient.get<CustomerListResponse>("/customers", {
    params,
  });
  return { data: response.data.data, meta: response.data.meta };
};

export const createCustomer = async (values: ICustomerFormValues) => {
  const { data } = await apiClient.post<IApiResponse<ICustomer>>(
    "/customers",
    values,
  );
  return data.data;
};

export const updateCustomer = async (
  id: string,
  values: ICustomerFormValues,
) => {
  const { data } = await apiClient.patch<IApiResponse<ICustomer>>(
    `/customers/${id}`,
    values,
  );
  return data.data;
};

export const deleteCustomer = async (id: string) => {
  await apiClient.delete(`/customers/${id}`);
};
