import React, { useState } from 'react';

interface ProductSearchBarProps {
  keyword: string;
  onSearch: (keyword: string) => void;
}

export const ProductSearchBar: React.FC<ProductSearchBarProps> = ({ keyword, onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchKeyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="품목명으로 검색"
        className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        검색
      </button>
    </form>
  );
}; 