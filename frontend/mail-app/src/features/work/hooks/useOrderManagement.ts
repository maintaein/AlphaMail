import { useCallback } from 'react';
import { useOrderStore } from '../store/orderStore';
import { orderService } from '../services/orderService';
import { OrderDetail } from '../types/order';

export const useOrderManagement = () => {
  const {
    currentPage,
    pageSize,
    sortOption,
    setOrders,
    setTotalPages,
    setLoading,
    setError,
    selectedOrderIds,
    clearSelection,
  } = useOrderStore();

  const fetchOrders = useCallback(async (searchParams?: string) => {
    try {
      setLoading(true);
      const response = await orderService.getOrders({
        page: currentPage,
        size: pageSize,
        sort: sortOption.toString(),
        search: searchParams,
      });
      setOrders(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, sortOption, setOrders, setTotalPages, setLoading, setError]);

  const handleDeleteOrders = useCallback(async () => {
    if (selectedOrderIds.size === 0) {
      setError('No orders selected for deletion');
      return;
    }

    try {
      setLoading(true);
      await orderService.deleteOrders(Array.from(selectedOrderIds));
      await fetchOrders();
      clearSelection();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete orders');
    } finally {
      setLoading(false);
    }
  }, [selectedOrderIds, fetchOrders, clearSelection, setLoading, setError]);

  const handleSaveOrder = useCallback(async (orderData: OrderDetail, orderId?: number) => {
    try {
      setLoading(true);
      if (orderId) {
        await orderService.updateOrder(orderId, orderData);
      } else {
        await orderService.createOrder(orderData);
      }
      await fetchOrders();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save order');
    } finally {
      setLoading(false);
    }
  }, [fetchOrders, setLoading, setError]);

  return {
    fetchOrders,
    handleDeleteOrders,
    handleSaveOrder,
  };
}; 