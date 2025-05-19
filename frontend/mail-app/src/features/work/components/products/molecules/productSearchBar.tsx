import { Typography } from '@/shared/components/atoms/Typography';
import { Input } from '@/shared/components/atoms/input';
import { Button } from '@/shared/components/atoms/button';
import React, { useState } from 'react';

interface ProductSearchBarProps {
  keyword: string;
  onSearch: (keyword: string) => void;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({ keyword, onSearch }) => {
  const [input, setInput] = useState(keyword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="flex items-center mb-2 gap-3" onSubmit={handleSubmit}>
      <Typography variant="body">품목</Typography>
      <Input
        className="border p-2 rounded mr-2 !w-40"
        placeholder="품목명"
        value={input}
        onChange={e => setInput(e.target.value)}
        size="small"
      />
      <Button
        type="submit"
        className="w-[110px] h-[30px] bg-[#3E99C6] text-white rounded-lg font-semibold flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <Typography variant="titleSmall" className="text-white">검색</Typography>
      </Button>
    </form>
  );
};

export default ProductSearchBar; 