import React, { useEffect } from 'react';
import { useClient } from '../../../hooks/useClient';
import { ClientTable } from '../organisms/clientTable';
import { ClientSearchBar } from '../organisms/clientSearchBar';

export const ClientManagementTemplate: React.FC = () => {
  const {
    clients,
    totalCount,
    pageCount,
    currentPage,
    pageSize,
    selectedClientIds,
    fetchClients,
    setCurrentPage,
    setPageSize,
    toggleClientSelection,
    setSelectedClientIds,
    deleteClient
  } = useClient();

  useEffect(() => {
    fetchClients({ page: currentPage, size: pageSize });
  }, [currentPage, pageSize, fetchClients]);

  const handleSearch = (keyword: string) => {
    fetchClients({ page: 1, size: pageSize, search: keyword });
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (selectedClientIds.size === 0) {
      alert('삭제할 거래처를 선택해주세요.');
      return;
    }

    if (!window.confirm('선택한 거래처를 삭제하시겠습니까?')) {
      return;
    }

    try {
      for (const id of selectedClientIds) {
        await deleteClient(id);
      }
      setSelectedClientIds(new Set());
      fetchClients({ page: currentPage, size: pageSize });
      alert('선택한 거래처가 삭제되었습니다.');
    } catch (error) {
      console.error('거래처 삭제 실패:', error);
      alert('거래처 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <ClientSearchBar
          onSearch={handleSearch}
        />
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              거래처 등록
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
          <ClientTable
            clients={clients}
            currentPage={currentPage}
            pageSize={pageSize}
            selectedClientIds={selectedClientIds}
            onSelectClient={toggleClientSelection}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
            totalCount={totalCount}
            pageCount={pageCount}
          />
        </div>
      </div>
    </div>
  );
};