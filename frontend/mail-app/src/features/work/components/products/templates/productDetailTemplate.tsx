import React, { useState, useEffect } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { Product } from '../../../types/product';
import { productService } from '../../../services/productService';
import { useNavigate } from 'react-router-dom';

interface ProductDetailTemplateProps {
  product?: Product;
  onBack?: () => void;
  companyId?: number;
}

interface ProductDetailForm {
  name: string;
  standard: string;
  stock: number;
  inboundPrice: number;
  outboundPrice: number;
  image?: File;
}

export const ProductDetailTemplate: React.FC<ProductDetailTemplateProps> = ({ 
  product, 
  onBack,
  companyId = 1 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductDetailForm>({
    name: '',
    standard: '',
    stock: 0,
    inboundPrice: 0,
    outboundPrice: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        standard: product.standard,
        stock: product.stock,
        inboundPrice: product.inboundPrice,
        outboundPrice: product.outboundPrice,
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'inboundPrice' || name === 'outboundPrice' 
        ? Number(value) 
        : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) {
        // 수정
        await productService.updateProduct(product.id.toString(), {
          id: product.id,
          ...formData,
          companyId
        });
      } else {
        // 등록
        await productService.createProduct({
          ...formData,
          companyId
        });
      }
      if (onBack) {
        onBack();
      } else {
        navigate('/products');
      }
    } catch (error) {
      console.error('상품 저장 실패:', error);
      alert('상품 저장에 실패했습니다.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="titleLarge">
          {product ? '상품 상세' : '상품 등록'}
        </Typography>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            ← 목록으로
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* 상품 정보 입력 섹션 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">품목명</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">규격</label>
              <input
                type="text"
                name="standard"
                value={formData.standard}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">재고</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">입고단가</label>
              <input
                type="number"
                name="inboundPrice"
                value={formData.inboundPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">출고단가</label>
              <input
                type="number"
                name="outboundPrice"
                value={formData.outboundPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* 이미지 업로드 섹션 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상품 이미지</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            {formData.image && (
              <div className="mt-4">
                <img 
                  src={URL.createObjectURL(formData.image)} 
                  alt="상품 이미지 미리보기"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              취소
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {product ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}; 