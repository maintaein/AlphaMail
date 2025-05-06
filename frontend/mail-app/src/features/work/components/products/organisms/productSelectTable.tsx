import React from 'react';
import { Product } from '../../../types/product';

interface ProductSelectTableProps {
  products: Product[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  isLoading?: boolean;
}

const ProductSelectTable: React.FC<ProductSelectTableProps> = ({
  products,
  selectedId,
  onSelect,
  isLoading = false,
}) => {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              선택
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              품목명
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              규격
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              재고
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => onSelect(product.id)}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedId === product.id ? 'bg-blue-50' : ''
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="radio"
                  checked={selectedId === product.id}
                  onChange={() => onSelect(product.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.standard}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSelectTable; 