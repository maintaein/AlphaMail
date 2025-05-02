import React from 'react';
import { QuoteProduct } from '../../../types/quote';

interface QuoteProductTableRowProps {
  index: number;
  product: QuoteProduct;
  onProductChange: (index: number, field: keyof QuoteProduct, value: string | number) => void;
  onRemoveProduct: (index: number) => void;
}

export const QuoteProductTableRow: React.FC<QuoteProductTableRowProps> = ({
  index,
  product,
  onProductChange,
  onRemoveProduct,
}) => {
  // 공급가액 계산 (수량 * 단가)
  const handleQuantityOrPriceChange = (field: 'quantity' | 'unit_price', value: number) => {
    onProductChange(index, field, value);
    const quantity = field === 'quantity' ? value : product.quantity;
    const unitPrice = field === 'unit_price' ? value : product.unit_price;
    const supplyAmount = quantity * unitPrice;
    const taxAmount = Math.round(supplyAmount * 0.1); // 10% 세액
    
    onProductChange(index, 'supply_amount', supplyAmount);
    onProductChange(index, 'tax_amount', taxAmount);
    onProductChange(index, 'amount', supplyAmount + taxAmount);
  };

  return (
    <tr>
      <td className="p-4">{index + 1}</td>
      <td className="p-4">
        <input
          type="text"
          value={product.name}
          onChange={(e) => onProductChange(index, 'name', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </td>
      <td className="p-4">
        <input
          type="text"
          value={product.standard}
          onChange={(e) => onProductChange(index, 'standard', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </td>
      <td className="p-4">
        <input
          type="number"
          value={product.quantity}
          onChange={(e) => handleQuantityOrPriceChange('quantity', Number(e.target.value))}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </td>
      <td className="p-4">
        <input
          type="number"
          value={product.unit_price}
          onChange={(e) => handleQuantityOrPriceChange('unit_price', Number(e.target.value))}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </td>
      <td className="p-4 text-right">
        {product.tax_amount.toLocaleString()}원
      </td>
      <td className="p-4 text-right">
        {product.supply_amount.toLocaleString()}원
      </td>
      <td className="p-4 text-center">
        <button
          type="button"
          onClick={() => onRemoveProduct(index)}
          className="text-red-600 hover:text-red-900"
        >
          삭제
        </button>
      </td>
    </tr>
  );
}; 