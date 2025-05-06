import React, { useEffect } from 'react';
import OrderSearchBar from '../organisms/orderSearchBar';
import OrderTable from '../organisms/orderTable';
import { Order } from '../../../types/order';
import OrderDetailTemplate from './orderDetailTemplate';
import { OrderDetail } from '../../../types/order';
import { useOrderStore } from '../../../store/orderStore';
import { useOrderManagement } from '../../../hooks/useOrderManagement';

function orderToOrderDetail(order: Order): OrderDetail {
  return {
    order_no: order.order_no,
    date: order.date,
    is_inbound: false,
    manager: order.manager,
    client_name: order.client_name,
    business_no: '',
    representative: '',
    business_type: '',
    business_category: '',
    client_manager: '',
    client_contact: '',
    payment_condition: '',
    due_date: order.due_date,
    address: '',
    products: [
      {
        name: order.item,
        standard: '',
        quantity: 1,
        unit_price: order.amount,
        tax_amount: 0,
        supply_amount: 0,
        amount: order.amount,
      },
    ],
  };
}

const OrderManagementTemplate: React.FC = () => {
  const {
    orders,
    selectedOrderIds,
    currentPage,
    totalPages,
    pageSize,
    sortOption,
    showOrderDetail,
    selectedOrder,
    isLoading,
    error,
    setCurrentPage,
    setPageSize,
    setSortOption,
    setShowOrderDetail,
    setSelectedOrder,
    toggleOrderSelection,
  } = useOrderStore();

  const { fetchOrders, handleDeleteOrders, handleSaveOrder } = useOrderManagement();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, currentPage, pageSize, sortOption]);

  const handleSearch = (params: any) => {
    fetchOrders(params);
  };

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setShowOrderDetail(true);
  };

  const handleDelete = () => {
    if (selectedOrderIds.size === 0) {
      alert('삭제할 발주서를 선택해주세요.');
      return;
    }
    if (window.confirm('선택한 발주서를 삭제하시겠습니까?')) {
      handleDeleteOrders();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSizeChange = (size: number) => {
    setPageSize(size);
  };

  const handleSortChange = (option: number) => {
    setSortOption(option);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(orderToOrderDetail(order));
    setShowOrderDetail(true);
  };

  const handleBack = () => {
    setShowOrderDetail(false);
    setSelectedOrder(null);
  };

  const handleSave = (orderData: OrderDetail) => {
    handleSaveOrder(orderData);
    setShowOrderDetail(false);
    setSelectedOrder(null);
  };

  if (showOrderDetail) {
    return (
      <OrderDetailTemplate
        order={selectedOrder}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <OrderSearchBar onSearch={handleSearch} />
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleAddOrder}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={isLoading}
            >
              발주서 등록
            </button>
            <div className="space-x-2">
              <button
                className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
                disabled={isLoading}
              >
                출력
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
                disabled={isLoading}
              >
                삭제
              </button>
            </div>
          </div>
          <OrderTable
            orders={orders}
            onSelect={toggleOrderSelection}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onSizeChange={handleSizeChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            totalCount={orders.length}
            onOrderClick={handleOrderClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagementTemplate; 