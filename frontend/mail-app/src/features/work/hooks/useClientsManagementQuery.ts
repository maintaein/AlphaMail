import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { clientService } from '../services/clientService';
import { ClientResponse } from '../types/clients';

interface UseClientsManagementQueryParams {
  companyId: number;
  query?: string;
  page?: number;
  size?: number;
  sort?: number;
}

export const useClientsManagementQuery = (
  params: UseClientsManagementQueryParams,
  placeholderData?: ClientResponse
): UseQueryResult<ClientResponse> => {
  return useQuery<ClientResponse>({
    queryKey: ['clients-management', params],
    queryFn: () => clientService.getClients(params),
    placeholderData,
  });
}; 