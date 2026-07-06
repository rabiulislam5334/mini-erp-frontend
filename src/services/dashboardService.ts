import type { IApiResponse, IDashboardStats } from "@/types";
import { apiClient } from "../lib/apiClient";

export const getDashboardStats = async (): Promise<IDashboardStats> => {
  const { data } =
    await apiClient.get<IApiResponse<IDashboardStats>>("/dashboard/stats");
  return data.data;
};
