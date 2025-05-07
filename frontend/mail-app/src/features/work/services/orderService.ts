import { OrderDetail } from '../types/order';
import { api } from '../../../shared/lib/axiosInstance';

interface OrderService {
  getOrders: (params: {
    page: number;
    size: number;
    sort?: string;
    search?: string;
  }) => Promise<any>;
  getOrderDetail: (orderId: number) => Promise<any>;
  createOrder: (orderData: OrderDetail) => Promise<any>;
  updateOrder: (orderId: number, orderData: OrderDetail) => Promise<any>;
  deleteOrders: (orderIds: number[]) => Promise<any>;
}

export const orderService: OrderService = {
  // Get orders with pagination and filters
  getOrders: async (params: {
    page: number;
    size: number;
    sort?: string;
    search?: string;
  }) => {
    const response = await api.get('/api/orders', { params });
    return response.data;
  },

  // Get single order detail
  getOrderDetail: async (orderId: number) => {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  },

  // Create new order
  createOrder: async (orderData: OrderDetail) => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  },

  // Update existing order
  updateOrder: async (orderId: number, orderData: OrderDetail) => {
    const response = await api.put(`/api/orders/${orderId}`, orderData);
    return response.data;
  },

  // Delete order(s)
  deleteOrders: async (orderIds: number[]) => {
    const response = await api.delete('/api/orders', {
      data: { orderIds },
    });
    return response.data;
  },
}; 