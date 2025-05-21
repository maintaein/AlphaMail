import React, { useRef, useState } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import ProductSelectTemplate from '../../products/templates/productSelectTemplate';

interface QuoteSearchBarProps {
  onSearch: (params: QuoteSearchParams) => void;
}

export interface QuoteSearchParams {
  clientName: string;
  quoteNo: string;
  userName: string;
  startDate: string;
  endDate: string;
  productName: string;
}

export const QuoteSearchBar: React.FC<QuoteSearchBarProps> = ({ onSearch }) => {
  // 레퍼런스와 상태는 동일하게 유지
  const clientRef = useRef<HTMLInputElement>(null);
  const quoteNoRef = useRef<HTMLInputElement>(null);
  const managerRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);

  // 핸들러 함수들은 동일하게 유지
  const handleSearch = (e?: React.FormEvent) => {
    // 기존 코드 그대로
    if (e) e.preventDefault();
    let startDateValue = startDateRef.current?.value || '';
    let endDateValue = endDateRef.current?.value || '';
    // ISOString 변환
    startDateValue = startDateValue ? new Date(startDateValue).toISOString() : '';
    endDateValue = endDateValue ? new Date(endDateValue).toISOString() : '';
    const params: QuoteSearchParams = {
      clientName: clientRef.current?.value || '',
      quoteNo: quoteNoRef.current?.value || '',
      userName: managerRef.current?.value || '',
      startDate: startDateValue,
      endDate: endDateValue,
      productName: itemRef.current?.value || '',
    };
    onSearch(params);
  };

  const handleProductSelect = (product: { name: string }) => {
    if (itemRef.current) {
      itemRef.current.value = product.name;
    }
    setIsProductSelectOpen(false);
  };

  // 모든 입력 필드에 공통으로 적용할 클래스
  const inputClassCommon = "font-pretendard text-xs placeholder:text-xs placeholder:font-pretendard";

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-white p-4 border border-gray-200 rounded mb-4"
    >
      {/* 1st row: 거래처, 견적번호, 담당자 */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center mb-2">
        <div className="flex items-center gap-2">
          <Typography variant="body" className="min-w-[56px] text-right text-gray-600 text-xs">거래처</Typography>
          <input
            ref={clientRef}
            className={`w-[240px] h-[30px] px-2 bg-white border border-gray-300 focus:outline-none pr-8 rounded-none ${inputClassCommon}`}
            placeholder="거래처명"
          />
        </div>
        <div className="flex items-center gap-2">
          <Typography variant="body" className="min-w-[56px] text-right text-gray-600 text-xs">견적번호</Typography>
          <input
            ref={quoteNoRef}
            className={`w-[140px] h-[30px] px-2 bg-white border border-gray-300 focus:outline-none pr-8 rounded-none ${inputClassCommon}`}
            placeholder="견적번호"
          />
        </div>
        <div className="flex items-center gap-2">
          <Typography variant="body" className="min-w-[56px] text-right text-gray-600 text-xs">담당자</Typography>
          <input
            ref={managerRef}
            className={`w-[140px] h-[30px] px-2 bg-white border border-gray-300 focus:outline-none pr-8 rounded-none ${inputClassCommon}`}
            placeholder="담당자"
          />
        </div>
      </div>
      {/* 2nd row: 견적일자, 품목, 검색버튼 */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center mt-2">
        <div className="flex items-center gap-2">
          <Typography variant="body" className="min-w-[56px] text-right text-gray-600 text-xs">견적일자</Typography>
          <input
            ref={startDateRef}
            type="date"
            className={`w-[140px] h-[30px] px-2 bg-white border border-gray-300 focus:outline-none rounded-none ${inputClassCommon}`}
          />
          <Typography variant="body" className="mx-1 text-gray-400">-</Typography>
          <input
            ref={endDateRef}
            type="date"
            className={`w-[140px] h-[30px] px-2 bg-white border border-gray-300 focus:outline-none rounded-none ${inputClassCommon}`}
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <Typography variant="body" className="min-w-[40px] text-right text-gray-600 text-xs">품목</Typography>
          <input
            ref={itemRef}
            className={`w-[140px] h-[30px] px-2 bg-white border border-gray-300 focus:outline-none pr-8 rounded-none cursor-pointer ${inputClassCommon}`}
            placeholder="품목"
            readOnly
            onClick={() => setIsProductSelectOpen(true)}
          />
        </div>
        <button
          type="submit"
          className="w-[100px] h-[35px] bg-[#3E99C6] text-white rounded-lg flex items-center justify-center gap-2 ml-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <Typography variant="body" className="text-white">검색</Typography>
        </button>
      </div>
      <ProductSelectTemplate
        isOpen={isProductSelectOpen}
        onSelect={handleProductSelect}
        onClose={() => setIsProductSelectOpen(false)}
      />
    </form>
  );
};