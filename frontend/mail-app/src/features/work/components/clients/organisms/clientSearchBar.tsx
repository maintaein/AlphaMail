import React, { useState } from 'react';

interface ClientSearchBarProps {
  onSearch: (keyword: string) => void;
}

export const ClientSearchBar: React.FC<ClientSearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border rounded mb-4">
      <input
        type="text"
        className="flex-1 p-2 border rounded"
        placeholder="거래처명/사업자번호를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        검색
      </button>
    </form>
  );
};