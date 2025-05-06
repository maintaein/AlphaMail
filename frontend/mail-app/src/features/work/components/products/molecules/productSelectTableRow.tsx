import React from 'react';
import { Product } from '../../../types/product';

interface ProductSelectTableRowProps {
  product: Product;
  checked: boolean;
  onSelect: (id: number) => void;
}

const ProductSelectTableRow: React.FC<ProductSelectTableRowProps> = ({ product, checked, onSelect }) => {
  return (
    <tr>
      <td className="p-2 text-center">
        <input
          type="radio"
          checked={checked}
          onChange={() => onSelect(product.id)}
        />
      </td>
      <td className="p-2">{product.name}</td>
      <td className="p-2">{product.standard}</td>
      <td className="p-2">{product.stock}</td>
      <td className="p-2">{product.inboundPrice.toLocaleString()}/원</td>
      <td className="p-2">{product.outboundPrice.toLocaleString()}/원</td>
    </tr>
  );
};

export default ProductSelectTableRow; 