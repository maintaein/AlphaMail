export interface Product {
  id: number;
  name: string;
  standard: string;
  stock: number;
  inboundPrice: number;
  outboundPrice: number;
  isSelected?: boolean;
}

export interface ProductSearchParams {
  keyword: string;
}

export interface ProductListResponse {
  contents: Product[];
  total_count: number;
  page_count: number;
  current_page: number;
}

export interface CreateProductRequest {
  name: string;
  standard: string;
  stock: number;
  inboundPrice: number;
  outboundPrice: number;
  image?: File;
  companyId: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

export type ProductResponse = ProductListResponse; 