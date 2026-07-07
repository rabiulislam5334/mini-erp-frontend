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

export interface IProductFormValues {
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  image?: FileList;
}

export interface ICustomer {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
}

export interface ICustomerFormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
}
export interface ISaleItem {
  product: { _id: string; name: string; sku: string };
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ISale {
  _id: string;
  customer: { _id: string; name: string; phone: string; email: string };
  items: ISaleItem[];
  grandTotal: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISaleFormValues {
  customer: string;
  items: { product: string; quantity: number }[];
}

//
export interface IDashboardStats {
  totalProducts: number;
  totalCustomers: number;
  totalSales: number;
  totalRevenue: number;
  lowStockProducts: {
    _id: string;
    name: string;
    sku: string;
    stockQuantity: number;
  }[];
}
