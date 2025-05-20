import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote } from '../../../types/quote';
import { QuoteSearchBar } from '../molecules/quoteSearchBar';
import { QuoteTable } from '../organisms/quoteTable';
import { useQuotes } from '../../../hooks/useQuote';
import { quoteService } from '../../../services/quoteService';
import { Button } from '@/shared/components/atoms/button';
import { Typography } from '@/shared/components/atoms/Typography';
import { useQuoteStore } from '@/features/work/stores/quoteStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const QuoteManagementTemplate: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { 
    currentPage, 
    pageSize, 
    sortOption,
    searchParams,
    selectedQuoteIds,
    setCurrentPage,
    setPageSize,
    setSortOption,
    setSearchParams,
    setSelectedQuoteIds,
    clearSelection 
  } = useQuoteStore();

  const { data: quoteResponse, isLoading, error } = useQuotes({
    ...searchParams,
    page: currentPage,
    size: pageSize
  });

  // 페이지 변경 시 선택 초기화
  useEffect(() => {
    clearSelection();
  }, [currentPage, clearSelection]);

  // 서버의 현재 페이지와 클라이언트의 현재 페이지가 다를 경우 동기화
  useEffect(() => {
    if (quoteResponse?.currentPage && quoteResponse.currentPage !== currentPage) {
      setCurrentPage(quoteResponse.currentPage);
    }
  }, [quoteResponse?.currentPage, currentPage, setCurrentPage]);

  const handleSearch = (params: any) => {
    setSearchParams(params);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleAddQuote = () => {
    navigate('/work/quotes/new');
  };

  const handleQuoteClick = (quote: Quote) => {
    navigate(`/work/quotes/${quote.id}`);
  };

  const handleDelete = async () => {
    if (selectedQuoteIds.size === 0) {
      toast.error('삭제할 견적서를 선택해주세요.');
      return;
    }

    if (!window.confirm('선택한 견적서를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await quoteService.deleteQuotes(Array.from(selectedQuoteIds));
      await queryClient.invalidateQueries({ queryKey: ['quotes'] });
      await queryClient.invalidateQueries({ queryKey: ['quoteDetail'] });
      clearSelection();
      setSelectedQuoteIds(new Set());
      toast.success('선택한 견적서가 삭제되었습니다.');
    } catch (error) {
      console.error('견적서 삭제 실패:', error);
      toast.error('견적서 삭제를 실패했습니다.');
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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <QuoteSearchBar onSearch={handleSearch} />
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={handleAddQuote}
              variant="text"
              size="large"
              className="flex items-baseline gap-2 p-0 bg-transparent shadow-none border-none text-black font-bold text-xl hover:bg-transparent hover:text-black active:bg-transparent"
            >
              <span className="text-2xl font-bold leading-none relative -top-[-1px] text-black" >+</span>
              <Typography variant="titleSmall" className="leading-none">견적서 등록하기</Typography>
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
          <QuoteTable
            quotes={quoteResponse?.contents || []}
            currentPage={currentPage}
            pageCount={quoteResponse?.pageCount || 0}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onSizeChange={handleSizeChange}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            totalCount={quoteResponse?.totalCount || 0}
            onQuoteClick={handleQuoteClick}
            isLoading={isLoading}
            selectedQuoteIds={selectedQuoteIds}
            onSelectQuote={(id) => {
              const newSelectedIds = new Set(selectedQuoteIds);
              if (newSelectedIds.has(id)) {
                newSelectedIds.delete(id);
              } else {
                newSelectedIds.add(id);
              }
              setSelectedQuoteIds(newSelectedIds);
            }}
          />
        </div>
      </div>
    </div>
  );
}; 