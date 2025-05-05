import { create } from 'zustand';
import { clientService } from '../services/clientService';
import { Client, ClientQueryParams, CreateClientRequest, UpdateClientRequest } from '../types/clients';

interface ClientState {
  clients: Client[];
  totalCount: number;
  pageCount: number;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  selectedClientIds: Set<number>;
  fetchClients: (params?: ClientQueryParams) => Promise<void>;
  createClient: (data: CreateClientRequest) => Promise<void>;
  updateClient: (data: UpdateClientRequest) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSelectedClientIds: (ids: Set<number>) => void;
  toggleClientSelection: (id: number) => void;
  clearError: () => void;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [],
  totalCount: 0,
  pageCount: 0,
  isLoading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  selectedClientIds: new Set(),

  fetchClients: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const response = await clientService.getClients(params);
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

  createClient: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await clientService.createClient(data);
      await set((state) => {
        state.fetchClients();
        return {};
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create client' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateClient: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await clientService.updateClient(data);
      await set((state) => {
        state.fetchClients();
        return {};
      });
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
      await set((state) => {
        state.fetchClients();
        return {};
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete client' });
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  setSelectedClientIds: (ids) => set({ selectedClientIds: ids }),
  toggleClientSelection: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedClientIds);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return { selectedClientIds: newSet };
    }),
  clearError: () => set({ error: null }),
}));