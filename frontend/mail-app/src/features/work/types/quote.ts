export interface Quote {
  id: number;
  quote_no: string;
  created_at: string;
  user_name: string;
  client_name: string;
  product_count: number;
  product_name: string;
  price: number;
  isSelected?: boolean;
}

export interface QuoteResponse {
  contents: Quote[];
  total_count: number;
  page_count: number;
} 