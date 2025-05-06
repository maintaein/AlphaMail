import React, { useState } from 'react';
import { Product } from '../../../types/product';
import ProductSearchBar from '../molecules/productSearchBar';
import ProductSelectTable from '../organisms/productSelectTable';

interface ProductSelectTemplateProps {
  isOpen: boolean;
  onSelect: (product: Product) => void;
  onClose: () => void;
  products: Product[]; // 외부에서 데이터 주입 (API 연동 시 커스텀 hook으로 대체 가능)
}

const ProductSelectTemplate: React.FC<ProductSelectTemplateProps> = ({
  isOpen, onSelect, onClose, products
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredProducts = products.filter((p) =>
    p.name.includes(searchKeyword)
  );

  if (!isOpen) return null;

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleSelect = () => {
    const product = filteredProducts.find((p) => p.id === selectedId);
    if (product) onSelect(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 */}
      <div className="fixed inset-0 bg-gray-500 opacity-50" onClick={onClose}></div>
      {/* 모달 */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold">품목 추가</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div className="p-4">
          <ProductSearchBar keyword={searchKeyword} onSearch={handleSearch} />
          <div className="overflow-x-auto">
            <ProductSelectTable
              products={filteredProducts}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              disabled={selectedId === null}
              onClick={handleSelect}
            >
              선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectTemplate; 