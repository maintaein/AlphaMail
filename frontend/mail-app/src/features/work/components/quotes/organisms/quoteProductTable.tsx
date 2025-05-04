import React from 'react';
import { QuoteProduct } from '../../../types/quote';
import { QuoteProductTableRow } from '../molecules/quoteProductTableRow';

interface QuoteProductTableProps {
  products: QuoteProduct[];
  onProductChange: (index: number, field: keyof QuoteProduct, value: string | number) => void;
  onAddProduct: () => void;
  onRemoveProduct: (index: number) => void;
}

export const QuoteProductTable: React.FC<QuoteProductTableProps> = ({
  products,
  onProductChange,
  onAddProduct,
  onRemoveProduct,
}) => {
  const totalSupplyAmount = products.reduce((sum, product) => sum + product.supply_amount, 0);
  const totalTaxAmount = products.reduce((sum, product) => sum + product.tax_amount, 0);
  const totalAmount = products.reduce((sum, product) => sum + product.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">품목 정보</h3>
        <button
          type="button"
          onClick={onAddProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          품목 추가
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">순번</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">품목</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">규격</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">수량</th>
              <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase">단가</th>
              <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase">세액</th>
              <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase">공급가액</th>
              <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase">삭제</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <QuoteProductTableRow
                key={index}
                index={index}
                product={product}
                onProductChange={onProductChange}
                onRemoveProduct={onRemoveProduct}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={5} className="p-4 text-right font-medium">
                합계
              </td>
              <td className="p-4 text-right font-medium">
                {totalTaxAmount.toLocaleString()}원
              </td>
              <td className="p-4 text-right font-medium">
                {totalSupplyAmount.toLocaleString()}원
              </td>
              <td></td>
            </tr>
            <tr className="bg-gray-50">
              <td colSpan={5} className="p-4 text-right font-medium">
                총 합계
              </td>
              <td colSpan={2} className="p-4 text-right font-medium">
                {totalAmount.toLocaleString()}원
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}; 