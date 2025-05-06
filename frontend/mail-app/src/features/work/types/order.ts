export interface Order {
  id: number;
  order_no: string;
  date: string;
  manager: string;
  client_name: string;
  due_date: string;
  item: string;
  amount: number;
  isSelected?: boolean;
}

export interface OrderSearchParams {
  client_name?: string;
  client_or_biz_no?: string;
  order_no?: string;
  manager?: string;
  order_date_from?: string;
  order_date_to?: string;
  item?: string;
  search?: string;
}

export interface OrderListResponse {
  contents: Order[];
  total_count: number;
  page_count: number;
  current_page: number;
}

export interface OrderDetail {
  order_no: string;
  date: string;
  is_inbound: boolean;
  manager: string;
  client_name: string;
  business_no: string;
  representative: string;
  business_type: string;
  business_category: string;
  client_manager: string;
  client_contact: string;
  payment_condition: string;
  due_date: string;
  address: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  name: string;
  standard: string;
  quantity: number;
  unit_price: number;
  tax_amount: number;
  supply_amount: number;
  amount: number;
} 