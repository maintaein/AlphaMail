import { Product, ProductResponse, CreateProductRequest, UpdateProductRequest } from '../types/product';
import { api } from '@/shared/lib/axiosInstance';

interface GetProductsParams {
  query?: string;
  page?: number;
  size?: number;
  sort?: number;
  companyId: number;
}

export const productService = {
  // 상품 목록 조회
  getProducts: async (params: GetProductsParams) => {
    const response = await api.get<ProductResponse>(`/api/erp/companies/${params.companyId}/products`, {
      params: {
        ...(params?.query && { query: params.query }),
        ...(params?.page && { page: params.page }),
        ...(params?.size && { size: params.size }),
        ...(params?.sort && { sort: params.sort })
      }
    });
    return response.data;
  },

  // 상품 상세 조회
  getProduct: async (id: string) => {
    const response = await api.get<Product>(`/api/erp/products/${id}`);
    return response.data;
  },

  // 상품 생성
  createProduct: async (product: CreateProductRequest) => {
    const response = await api.post<Product>('/api/erp/products', product);
    return response.data;
  },

  // 상품 수정
  updateProduct: async (id: string, product: UpdateProductRequest) => {
    const response = await api.put<Product>(`/api/erp/products/${id}`, product);
    return response.data;
  },

  // 상품 삭제
  deleteProduct: async (id: string) => {
    await api.delete(`/api/erp/products/${id}`);
  },

  // 선택된 상품들 삭제
  deleteProducts: async (ids: number[]) => {
    try {
      await api.delete('/api/erp/products', {
        data: { ids }
      });
    } catch (error) {
      console.error('선택된 상품 삭제 실패:', error);
      throw error;
    }
  }
};
