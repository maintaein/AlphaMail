import React, { useRef, useState } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import ProductSelectTemplate from '../../products/templates/productSelectTemplate';
import { Product } from '../../../types/product';

interface OrderSearchBarProps {
  onSearch: (params: any) => void;
}

const OrderSearchBar: React.FC<OrderSearchBarProps> = ({ onSearch }) => {
  const clientRef = useRef<HTMLInputElement>(null);
  const orderNoRef = useRef<HTMLInputElement>(null);
  const managerRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);

  const resetForm = () => {
    if (clientRef.current) clientRef.current.value = '';
    if (orderNoRef.current) orderNoRef.current.value = '';
    if (managerRef.current) managerRef.current.value = '';
    if (itemRef.current) itemRef.current.value = '';
    if (startDateRef.current) startDateRef.current.value = '';
    if (endDateRef.current) endDateRef.current.value = '';
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = {
      clientName: clientRef.current?.value,
      orderNo: orderNoRef.current?.value,
      userName: managerRef.current?.value,
      productName: itemRef.current?.value,
      startDate: startDateRef.current?.value,
      endDate: endDateRef.current?.value,
    };
    onSearch(params);
    resetForm();
  };

  const handleProductSelect = (product: Product) => {
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
      className="w-full bg-white p-4 border border-gray-200 rounded mb-4 font-pretendard"
    >
      {/* 1st row: 거래처, 발주번호, 담당자 */}
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
          <Typography variant="body" className="min-w-[56px] text-right text-gray-600 text-xs">발주번호</Typography>
          <input
            ref={orderNoRef}
            className={`w-[140px] h-[30px] px-2 bg-white border border-gray-300 focus:outline-none pr-8 rounded-none ${inputClassCommon}`}
            placeholder="발주번호"
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
      {/* 2nd row: 발주일자, 품목, 검색버튼 */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center mt-2">
        <div className="flex items-center gap-2">
          <Typography variant="body" className="min-w-[56px] text-right text-gray-600 text-xs">발주일자</Typography>
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
          className="w-[100px] h-[35px] bg-[#3E99C6] text-white rounded-lg flex items-center justify-center gap-2 ml-2 font-pretendard"
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

export default OrderSearchBar;