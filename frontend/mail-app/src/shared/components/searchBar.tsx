import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMailStore } from '@/features/mail/stores/useMailStore';
import { useLocation } from 'react-router-dom';

export const SearchBar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { searchKeyword, setSearchKeyword } = useMailStore();
  const [localKeyword, setLocalKeyword] = useState(searchKeyword);
  
  const getPlaceholder = () => {
    if (path === '/schedule') {
      return "일정 검색";
    }
    return "메일 제목 검색";
  };

  // searchKeyword가 변경되면 localKeyword도 업데이트
  useEffect(() => {
    setLocalKeyword(searchKeyword);
  }, [searchKeyword]);
  
  // 검색어 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalKeyword(e.target.value);
  };
  
  // 검색 실행 핸들러
  const handleSearch = () => {
    setSearchKeyword(localKeyword);
  };
  
  // 엔터 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="flex items-center">
      <div className="relative flex items-center w-56 bg-white rounded-md border border-gray-300 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
        <input
          type="text"
          value={localKeyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="w-full py-1.5 px-3 text-sm outline-none rounded-l-md"
        />
        <button 
          onClick={handleSearch}
          className="text-gray-400 pr-2"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};