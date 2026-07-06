export type TUserRole = "admin" | "manager" | "employee";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
}

export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T;
}
