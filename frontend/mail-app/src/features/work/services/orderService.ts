import axios from 'axios';
import { OrderDetail } from '../types/order';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const orderService = {
  // Get orders with pagination and filters
  getOrders: async (params: {
    page: number;
    size: number;
    sort?: string;
    search?: string;
  }) => {
    const response = await axios.get(`${API_BASE_URL}/api/orders`, { params });
    return response.data;
  },

  // Get single order detail
  getOrderDetail: async (orderId: number) => {
    const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`);
    return response.data;
  },

  // Create new order
  createOrder: async (orderData: OrderDetail) => {
    const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);
    return response.data;
  },

  // Update existing order
  updateOrder: async (orderId: number, orderData: OrderDetail) => {
    const response = await axios.put(`${API_BASE_URL}/api/orders/${orderId}`, orderData);
    return response.data;
  },

  // Delete order(s)
  deleteOrders: async (orderIds: number[]) => {
    const response = await axios.delete(`${API_BASE_URL}/api/orders`, {
      data: { orderIds },
    });
    return response.data;
  },
}; 