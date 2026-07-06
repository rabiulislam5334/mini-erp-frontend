// export type TUserRole = "admin" | "manager" | "employee";

// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   role: TUserRole;
// }

// export interface IApiResponse<T> {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   meta?: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPage: number;
//   };
//   data: T;
// }
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

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  image: string;
  createdAt: string;
}

export interface ICustomer {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface ISaleItem {
  product: IProduct;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ISale {
  _id: string;
  customer: ICustomer;
  items: ISaleItem[];
  grandTotal: number;
  createdAt: string;
}

// ✅ নতুন যোগ করা হয়েছে
export interface IDashboardStats {
  totalProducts: number;
  totalCustomers: number;
  totalSales: number;
  totalRevenue: number;
  lowStockProducts: IProduct[];
}