import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { clientService } from '../services/clientService';
import { ClientResponse } from '../types/clients';

interface UseClientsSelectQueryParams {
  companyId: number;
  query?: string;
  page?: number;
  size?: number;
  sort?: number;
}

export const useClientsSelectQuery = (
  params: UseClientsSelectQueryParams,
  placeholderData?: ClientResponse
): UseQueryResult<ClientResponse> => {
  return useQuery<ClientResponse>({
    queryKey: ['clients-select', params],
    queryFn: () => clientService.getClients(params),
    placeholderData,
  });
}; 