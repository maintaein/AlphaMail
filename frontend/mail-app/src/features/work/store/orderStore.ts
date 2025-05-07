import { create } from 'zustand';
import { Order, OrderDetail } from '../types/order';

interface OrderState {
  orders: Order[];
  selectedOrder: OrderDetail | null;
  selectedOrderIds: Set<number>;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  sortOption: number;
  isLoading: boolean;
  error: string | null;
  showOrderDetail: boolean;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  setSelectedOrder: (order: OrderDetail | null) => void;
  setSelectedOrderIds: (ids: Set<number>) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setPageSize: (size: number) => void;
  setSortOption: (option: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowOrderDetail: (show: boolean) => void;
  
  // Complex actions
  toggleOrderSelection: (id: number) => void;
  clearSelection: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  selectedOrder: null,
  selectedOrderIds: new Set(),
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  sortOption: 0,
  isLoading: false,
  error: null,
  showOrderDetail: false,

  // Basic setters
  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  setSelectedOrderIds: (ids) => set({ selectedOrderIds: ids }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setPageSize: (size) => set({ pageSize: size }),
  setSortOption: (option) => set({ sortOption: option }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setShowOrderDetail: (show) => set({ showOrderDetail: show }),

  // Complex actions
  toggleOrderSelection: (id) =>
    set((state) => {
      const newSelectedIds = new Set(state.selectedOrderIds);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return { selectedOrderIds: newSelectedIds };
    }),

  clearSelection: () => set({ selectedOrderIds: new Set() }),
})); 