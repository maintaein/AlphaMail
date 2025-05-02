export interface Quote {
  id: number;
  quoteNumber: string;
  date: string;
  receiverCompany: string;
  sender: string;
  product: string;
  amount: string;
  isSelected?: boolean;
}

export interface QuoteResponse {
  contents: Quote[];
  total_count: number;
  page_count: number;
} 