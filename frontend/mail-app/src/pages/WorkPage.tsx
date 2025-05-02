import { useSidebarStore } from '@/shared/stores/useSidebarStore';
import { Typography } from '@/shared/components/atoms/Typography';
import { ProductManagementTemplate } from '@/features/work/components/products/templates/productManagementTemplate';
import { ProductDetailTemplate } from '@/features/work/components/products/templates/productDetailTemplate';
import { QuoteManagementTemplate } from '@/features/work/components/quotes/templates/quoteManagementTemplate';
import { useState, useEffect } from 'react';
import { Product } from '@/features/work/types/product';

const WorkPage = () => {
  const { activeItem } = useSidebarStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showQuoteDetail, setShowQuoteDetail] = useState(false);

  // activeItem이 변경될 때 상세 화면 상태 초기화
  useEffect(() => {
    setShowProductDetail(false);
    setSelectedProduct(null);
    setShowQuoteDetail(false);
  }, [activeItem]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductDetail(true);
  };

  const handleAddQuote = () => {
    setShowQuoteDetail(true);
  };

  const handleBack = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
    setShowQuoteDetail(false);
  };

  const renderTemplate = () => {
    switch (activeItem) {
      case '거래처 관리':
        return <div className="p-4">거래처 관리 템플릿</div>;
      case '발주서 관리':
        return <div className="p-4">발주서 관리 템플릿</div>;
      case '재고 관리':
        return showProductDetail ? (
          <ProductDetailTemplate 
            product={selectedProduct || undefined}
            onBack={handleBack}
          />
        ) : (
          <ProductManagementTemplate 
            onAddProduct={handleAddProduct}
          />
        );
      case '견적서 관리':
        return showQuoteDetail ? (
          <div className="p-4">견적서 상세 템플릿</div>
        ) : (
          <QuoteManagementTemplate 
            onAddQuote={handleAddQuote}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <Typography variant="titleMedium" color="text-gray-500">
              템플릿을 선택해주세요
            </Typography>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      <div className="p-4">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default WorkPage;
