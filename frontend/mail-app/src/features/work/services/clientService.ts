import { api } from '@/shared/lib/axiosInstance';
import {
  Client,
  ClientResponse,
  CreateClientRequest,
  UpdateClientRequest,
  ClientQueryParams,
} from '../types/clients';

export const clientService = {
  getClients: async (params?: ClientQueryParams): Promise<ClientResponse> => {
    const response = await api.get<ClientResponse>('/clients', { params });
    return response.data;
  },
  createClient: async (data: CreateClientRequest): Promise<Client> => {
    const response = await api.post<Client>('/clients', data);
    return response.data;
  },
  updateClient: async (data: UpdateClientRequest): Promise<Client> => {
    const response = await api.put<Client>(`/clients/${data.id}`, data);
    return response.data;
  },
  deleteClient: async (id: number): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },
};