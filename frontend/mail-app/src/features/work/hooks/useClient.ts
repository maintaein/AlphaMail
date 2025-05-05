import { useClientStore } from '../stores/clientStore';

export const useClient = () => {
  const {
    clients,
    totalCount,
    pageCount,
    isLoading,
    error,
    currentPage,
    pageSize,
    selectedClientIds,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    setCurrentPage,
    setPageSize,
    setSelectedClientIds,
    toggleClientSelection,
    clearError,
  } = useClientStore();

  return {
    clients,
    totalCount,
    pageCount,
    isLoading,
    error,
    currentPage,
    pageSize,
    selectedClientIds,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    setCurrentPage,
    setPageSize,
    setSelectedClientIds,
    toggleClientSelection,
    clearError,
  };
};