import { apiClient } from "../lib/apiClient";
import type {
  IApiResponse,
  IPaginationMeta,
  IProduct,
  IProductFormValues,
} from "../types";

type ProductListResponse = IApiResponse<IProduct[]> & { meta: IPaginationMeta };

export const getProducts = async (params: {
  searchTerm?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: IProduct[]; meta: IPaginationMeta }> => {
  const response = await apiClient.get<ProductListResponse>("/products", {
    params,
  });
  return { data: response.data.data, meta: response.data.meta };
};

const buildProductFormData = (values: IProductFormValues) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("sku", values.sku);
  formData.append("category", values.category);
  formData.append("purchasePrice", String(values.purchasePrice));
  formData.append("sellingPrice", String(values.sellingPrice));
  formData.append("stockQuantity", String(values.stockQuantity));
  if (values.image && values.image.length > 0) {
    formData.append("image", values.image[0]);
  }
  return formData;
};

export const createProduct = async (values: IProductFormValues) => {
  const formData = buildProductFormData(values);
  const { data } = await apiClient.post<IApiResponse<IProduct>>(
    "/products",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data.data;
};

export const updateProduct = async (id: string, values: IProductFormValues) => {
  const formData = buildProductFormData(values);
  const { data } = await apiClient.patch<IApiResponse<IProduct>>(
    `/products/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data.data;
};

export const deleteProduct = async (id: string) => {
  await apiClient.delete(`/products/${id}`);
};
