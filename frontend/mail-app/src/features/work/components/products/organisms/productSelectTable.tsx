import React from 'react';
import { Product } from '../../../types/product';
import ProductSelectTableRow from '../molecules/productSelectTableRow';

interface ProductSelectTableProps {
  products: Product[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const ProductSelectTable: React.FC<ProductSelectTableProps> = ({ products, selectedId, onSelect }) => {
  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2"></th>
          <th className="p-2">품목</th>
          <th className="p-2">규격</th>
          <th className="p-2">재고</th>
          <th className="p-2">입고단가</th>
          <th className="p-2">출고단가</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductSelectTableRow
            key={product.id}
            product={product}
            checked={selectedId === product.id}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductSelectTable; 