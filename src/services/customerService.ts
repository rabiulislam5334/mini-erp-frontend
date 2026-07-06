import type { IApiResponse, ICustomer, ICustomerFormValues } from "@/types";
import { apiClient } from "../lib/apiClient";

export const getCustomers = async (): Promise<ICustomer[]> => {
  const { data } = await apiClient.get<IApiResponse<ICustomer[]>>("/customers");
  return data.data;
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
