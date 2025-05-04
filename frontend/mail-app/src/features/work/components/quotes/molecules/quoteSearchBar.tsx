import React, { useState } from 'react';

interface QuoteSearchBarProps {
  onSearch: (params: QuoteSearchParams) => void;
}

export interface QuoteSearchParams {
  keyword: string;
  receiverCompany: string;
  sender: string;
  startDate: string;
  endDate: string;
  product: string;
}

export const QuoteSearchBar: React.FC<QuoteSearchBarProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<QuoteSearchParams>({
    keyword: '',
    receiverCompany: '',
    sender: '',
    startDate: '',
    endDate: '',
    product: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <label className="w-24 text-sm text-gray-600">거래처명</label>
          <input
            type="text"
            name="keyword"
            value={searchParams.keyword}
            onChange={handleChange}
            placeholder="거래처명/사업자등록번호"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-24 text-sm text-gray-600">발주번호</label>
          <input
            type="text"
            name="receiverCompany"
            value={searchParams.receiverCompany}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-24 text-sm text-gray-600">담당자</label>
          <input
            type="text"
            name="sender"
            value={searchParams.sender}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <label className="w-24 text-sm text-gray-600">등록일자</label>
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="date"
              name="startDate"
              value={searchParams.startDate}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              name="endDate"
              value={searchParams.endDate}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-24 text-sm text-gray-600">품목</label>
          <input
            type="text"
            name="product"
            value={searchParams.product}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            검색
          </button>
        </div>
      </div>
    </form>
  );
};
