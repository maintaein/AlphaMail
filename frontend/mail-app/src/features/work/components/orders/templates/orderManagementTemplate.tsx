import React, { useState } from 'react';
import OrderSearchBar from '../organisms/orderSearchBar';
import OrderTable from '../organisms/orderTable';
import { Order } from '../../../types/order';

const mockOrders: Order[] = [
  {
    id: 1,
    order_no: '123-456',
    date: '25/04/23',
    manager: '박도아',
    client_name: 'SSAFY',
    due_date: '25/06/23',
    item: '도기묘 및 3개',
    amount: 990000,
    isSelected: false,
  },
  // ...더미 데이터 추가 가능
];

const OrderManagementTemplate: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOption, setSortOption] = useState(0);

  const handleSelect = (id: number, checked: boolean) => {
    setOrders(orders =>
      orders.map(order =>
        order.id === id ? { ...order, isSelected: checked } : order
      )
    );
    const newSelectedIds = new Set(selectedOrderIds);
    if (checked) {
      newSelectedIds.add(id);
    } else {
      newSelectedIds.delete(id);
    }
    setSelectedOrderIds(newSelectedIds);
  };

  const handleSearch = (params: any) => {
    // TODO: 검색 로직 구현
    console.log(params);
  };

  const handleAddOrder = () => {
    // TODO: 발주서 추가 로직 구현
    console.log('Add order');
  };

  const handleDelete = () => {
    if (selectedOrderIds.size === 0) {
      alert('삭제할 발주서를 선택해주세요.');
      return;
    }
    if (window.confirm('선택한 발주서를 삭제하시겠습니까?')) {
      // TODO: 삭제 로직 구현
      console.log('Delete orders:', selectedOrderIds);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // TODO: 페이지 변경 시 데이터 로드
    setTotalPages(Math.ceil(mockOrders.length / pageSize));
  };

  const handleSizeChange = (size: number) => {
    setPageSize(size);
    // TODO: 페이지 크기 변경 시 데이터 로드
  };

  const handleSortChange = (option: number) => {
    setSortOption(option);
    // TODO: 정렬 옵션 변경 시 데이터 로드
  };

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
            >
              발주서 등록
            </button>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50">
                출력
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
              >
                삭제
              </button>
            </div>
          </div>
          <OrderTable
            orders={orders}
            onSelect={handleSelect}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onSizeChange={handleSizeChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            totalCount={orders.length}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagementTemplate; 