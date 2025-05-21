import { useNavigate } from 'react-router-dom';
import OrderSearchBar from '../organisms/orderSearchBar';
import OrderTable from '../organisms/orderTable';
import { Order } from '../../../types/order';
import { useOrderStore } from '../../../stores/orderStore';
import { useOrderManagement } from '../../../hooks/useOrderManagement';
import { Button } from '@/shared/components/atoms/button';
import { Typography } from '@/shared/components/atoms/Typography';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { showToast } from '@/shared/components/atoms/toast';
import { WarningModal } from '@/shared/components/warningModal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const OrderManagementTemplate: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    selectedOrderIds,
    currentPage,
    pageSize,
    sortOption,
    setCurrentPage,
    setPageSize,
    setSortOption,
    setSearchParams,
    setSelectedOrderIds,
    clearSelection
  } = useOrderStore();

  const { 
    orders, 
    isLoading, 
    error, 
    handleDeleteOrders,
    totalPages,
    totalElements,
    currentPage: responseCurrentPage
  } = useOrderManagement();

  // 페이지 변경 시 선택 초기화
  useEffect(() => {
    clearSelection();
  }, [currentPage, clearSelection]);

  // 서버의 현재 페이지와 클라이언트의 현재 페이지가 다를 경우 동기화
  useEffect(() => {
    if (responseCurrentPage && responseCurrentPage !== currentPage) {
      setCurrentPage(responseCurrentPage);
    }
  }, [responseCurrentPage, currentPage, setCurrentPage]);

  const handleSearch = (params: any) => {
    setSearchParams(params);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleAddOrder = () => {
    navigate('/work/orders/new');
  };

  const handleDelete = async () => {
    if (selectedOrderIds.size === 0) {
      showToast('삭제할 발주서를 선택해주세요.', 'error');
      return;
    }
    // 모달 열기
    setIsDeleteModalOpen(true);
  };

  // 실제 삭제 처리 함수
  const confirmDelete = async () => {
    try {
      await handleDeleteOrders();
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['orderDetail'] });
      clearSelection(); // 삭제 후 선택 초기화
    } finally {
      // 모달 닫기
      setIsDeleteModalOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  };

  const handleSortChange = (option: number) => {
    setSortOption(option);
    setCurrentPage(1); // 정렬 옵션 변경 시 첫 페이지로 이동
  };

  const handleOrderClick = (order: Order) => {
    navigate(`/work/orders/${order.id}`);
  };

  if (error) {
    return <div className="p-4 text-red-500">{error.message}</div>;
  }

  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <OrderSearchBar onSearch={handleSearch} />
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={handleAddOrder}
                variant="text"
                size="large"
                className="flex items-baseline gap-2 p-0 bg-transparent shadow-none border-none text-black font-bold text-xl hover:bg-transparent hover:text-black active:bg-transparent"
              >
                <span className="text-2xl font-bold leading-none relative -top-[-1px] text-black">+</span>
                <Typography variant="titleSmall" className="leading-none">발주서 등록하기</Typography>
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={handleDelete}
                  variant="text"
                  size="small"
                  className="min-w-[110px] h-[40px] border border-gray-300 bg-white shadow-none text-black font-normal hover:bg-gray-100 hover:text-black active:bg-gray-200 !rounded-none"
                >
                  <Typography variant="titleSmall">삭제</Typography>
                </Button>
              </div>
            </div>
            <OrderTable
              orders={orders as Order[]}
              currentPage={currentPage}
              pageCount={totalPages}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onSizeChange={handleSizeChange}
              sortOption={sortOption}
              onSortChange={handleSortChange}
              totalCount={totalElements}
              onOrderClick={handleOrderClick}
              isLoading={isLoading}
              selectedOrderIds={selectedOrderIds}
              onSelectOrder={setSelectedOrderIds}
            />
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 추가 */}
      <WarningModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        icon={<ExclamationTriangleIcon className="h-6 w-6 text-red-500" />}
        title={<Typography variant="titleMedium">발주서 삭제</Typography>}
        description={
          <Typography variant="body">
            선택한 {selectedOrderIds.size}개의 발주서를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </Typography>
        }
        actions={
          <>
            <Button
              variant="text"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              삭제
            </Button>
          </>
        }
      />
    </>
  );
};

export default OrderManagementTemplate; 