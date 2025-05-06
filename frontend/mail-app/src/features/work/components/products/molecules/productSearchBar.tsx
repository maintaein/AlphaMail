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
    <form className="flex items-center mb-2" onSubmit={handleSubmit}>
      <label className="mr-2 text-sm text-gray-700">품목</label>
      <input
        className="border p-2 rounded mr-2"
        placeholder="품목명"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">검색</button>
    </form>
  );
};

export default ProductSearchBar; 