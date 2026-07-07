import type { IApiResponse, IUserFormValues, IUserListItem } from "@/types";
import { apiClient } from "../lib/apiClient";

export const getUsers = async (): Promise<IUserListItem[]> => {
  const { data } = await apiClient.get<IApiResponse<IUserListItem[]>>("/users");
  return data.data;
};

export const createUser = async (values: IUserFormValues) => {
  const { data } = await apiClient.post<IApiResponse<IUserListItem>>(
    "/users",
    values,
  );
  return data.data;
};
