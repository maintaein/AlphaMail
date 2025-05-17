import React, { useState } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { AiAssistantRow } from '../organisms/aiAssistantRow';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// 샘플 데이터
const sampleData = [
  { id: '1', type: '발주서' as const, title: '써피에서 도기그룹의 3개 품목에 대한 발주요청', date: '2025/04/23' },
  { id: '2', type: '일정' as const, title: '2025/4/25 14:00시 써피와의 1분기 미팅', date: '2025/04/25' },
  { id: '3', type: '견적서' as const, title: '써피에서 도기그룹의 3개 품목에 대한 발주요청', date: '2025/04/26' },
  { id: '4', type: '거래처' as const, title: '삼성전자 거래처 등록', date: '2025/04/27' },
  { id: '5', type: '발주서' as const, title: 'LG전자 발주서 검토 요청', date: '2025/04/28' },
  { id: '6', type: '일정' as const, title: '2025/4/29 10:00시 LG전자와의 미팅', date: '2025/04/29' },
  { id: '7', type: '견적서' as const, title: 'SK하이닉스 견적서 발송', date: '2025/04/30' },
  { id: '8', type: '거래처' as const, title: '현대자동차 거래처 등록', date: '2025/05/01' },
  { id: '9', type: '발주서' as const, title: '포스코 발주서 검토', date: '2025/05/02' },
  { id: '10', type: '일정' as const, title: '2025/5/3 15:00시 포스코와의 미팅', date: '2025/05/03' },
  { id: '11', type: '견적서' as const, title: '네이버 견적서 발송', date: '2025/05/04' },
  { id: '12', type: '거래처' as const, title: '카카오 거래처 등록', date: '2025/05/05' },
];

const ITEMS_PER_PAGE = 10;

export const HomeAiTemplate: React.FC = () => {
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [items, setItems] = useState(sampleData);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const currentItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    if (activeRowId === id) {
      setActiveRowId(null);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full min-h-[700px] flex flex-col">
      <div className="mb-4">
        <Typography variant="titleMedium">AI 업무 비서</Typography>
      </div>
      
      <div>
        {/* 아이템 목록 */}
        <div className="space-y-1 flex-grow">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <AiAssistantRow
                key={item.id}
                id={item.id}
                type={item.type}
                title={item.title}
                date={item.date}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <Typography variant="body">표시할 항목이 없습니다.</Typography>
            </div>
          )}
        </div>
        
        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`p-1 rounded-md ${
                currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            
            <div className="flex mx-2 space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-1 rounded-md ${
                currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};