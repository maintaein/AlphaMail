import React from 'react';
import { Product } from '../../../types/product';
import { ProductSearchBar } from '../organisms/productSearchBar';
import { ProductTable } from '../organisms/productTable';
import { ProductDetailTemplate } from './productDetailTemplate';
import { productService } from '../../../services/productService';
import { useProductStore } from '../../../stores/productStore';

interface ProductManagementTemplateProps {
  onAddProduct?: () => void;
  companyId?: number;
}

export const ProductManagementTemplate: React.FC<ProductManagementTemplateProps> = ({ 
  onAddProduct,
  companyId = 1 
}) => {
  const {
    keyword,
    setKeyword,
    selectedProduct,
    setSelectedProduct,
    selectedProductIds,
    toggleProductSelection,
    setSelectedProductIds
  } = useProductStore();

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    if (selectedProductIds.size === 0) {
      alert('삭제할 상품을 선택해주세요.');
      return;
    }

    if (!window.confirm('선택한 상품을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await productService.deleteProducts([...selectedProductIds]);
      setSelectedProductIds(new Set());
      alert('선택한 상품이 삭제되었습니다.');
    } catch (error) {
      console.error('상품 삭제 실패:', error);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  if (selectedProduct) {
    return (
      <ProductDetailTemplate
        product={selectedProduct}
        onBack={handleBack}
        companyId={companyId}
      />
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <ProductSearchBar
          keyword={keyword}
          onSearch={handleSearch}
        />
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={onAddProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              상품 등록
            </button>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50">
                출력
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
              >
                삭제
              </button>
            </div>
          </div>
          <ProductTable
            companyId={companyId}
            onProductClick={handleProductClick}
            onSelectProduct={toggleProductSelection}
            selectedProductIds={selectedProductIds}
          />
        </div>
      </div>
    </div>
  );
}; 