export interface Client {
    id: number;
    name: string;
    ceo: string;
    business_no: string;
    contact: string;
    email: string;
    address: string;
    item?: string;
    type?: string;
    address_detail?: string;
    isSelected?: boolean;
  }
  
  export interface ClientResponse {
    contents: Client[];
    total_count: number;
    page_count: number;
  }
  
  export interface CreateClientRequest {
    name: string;
    ceo: string;
    business_no: string;
    contact: string;
    email: string;
    address: string;
    item?: string;
    type?: string;
    address_detail?: string;
  }
  
  export interface UpdateClientRequest extends Partial<CreateClientRequest> {
    id: number;
  }
  
  export interface ClientQueryParams {
    page?: number;
    size?: number;
    search?: string;
    sort?: string;
  }