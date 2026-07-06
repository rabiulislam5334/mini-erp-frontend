import { apiClient } from "../lib/apiClient";
import type { IApiResponse, IUser } from "../types";


interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export const loginRequest = async (email: string, password: string) => {
  const { data } = await apiClient.post<IApiResponse<ILoginResponse>>(
    "/auth/login",
    {
      email,
      password,
    },
  );
  return data.data;
};
