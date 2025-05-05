import { create } from 'zustand';
import { clientService } from '../services/clientService';
import { Client, CreateClientRequest, UpdateClientRequest } from '../types/clients';

interface ClientState {
  clients: Client[];
  totalCount: number;
  pageCount: number;
  isLoading: boolean;
  error: string | null;
  keyword: string;
  selectedClient: Client | null;
  selectedClientIds: Set<number>;
  currentPage: number;
  pageSize: number;
  sortOption: number;
  companyId: number;
  fetchClients: () => Promise<void>;
  fetchClient: (id: string) => Promise<void>;
  createClient: (data: CreateClientRequest) => Promise<void>;
  updateClient: (id: string, data: UpdateClientRequest) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  setKeyword: (keyword: string) => void;
  setSelectedClient: (client: Client | null) => void;
  setSelectedClientIds: (ids: Set<number>) => void;
  toggleClientSelection: (id: number) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortOption: (option: number) => void;
  setCompanyId: (id: number) => void;
  clearError: () => void;
}

export const useClientStore = create<ClientState>((set, get) => ({
  clients: [],
  totalCount: 0,
  pageCount: 0,
  isLoading: false,
  error: null,
  keyword: '',
  selectedClient: null,
  selectedClientIds: new Set(),
  currentPage: 1,
  pageSize: 10,
  sortOption: 0,
  companyId: 1,

  fetchClients: async () => {
    const { keyword, currentPage, pageSize, sortOption, companyId } = get();
    try {
      set({ isLoading: true, error: null });
      const response = await clientService.getClients({
        query: keyword,
        page: currentPage,
        size: pageSize,
        sort: sortOption,
        companyId
      });
      set({
        clients: response.contents,
        totalCount: response.total_count,
        pageCount: response.page_count,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch clients' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchClient: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const client = await clientService.getClient(id);
      set({ selectedClient: client });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch client' });
    } finally {
      set({ isLoading: false });
    }
  },

  createClient: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await clientService.createClient(data);
      await get().fetchClients();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create client' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateClient: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await clientService.updateClient(id, data);
      await get().fetchClients();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update client' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteClient: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await clientService.deleteClient(id);
      await get().fetchClients();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete client' });
    } finally {
      set({ isLoading: false });
    }
  },

  setKeyword: (keyword) => set({ keyword }),
  setSelectedClient: (client) => set({ selectedClient: client }),
  setSelectedClientIds: (ids) => set({ selectedClientIds: ids }),
  toggleClientSelection: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedClientIds);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return { selectedClientIds: newSet };
    }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  setSortOption: (option) => set({ sortOption: option }),
  setCompanyId: (id) => set({ companyId: id }),
  clearError: () => set({ error: null }),
}));