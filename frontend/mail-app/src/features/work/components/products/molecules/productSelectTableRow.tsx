import React from 'react';
import { Product } from '../../../types/product';
import { Typography } from '@/shared/components/atoms/Typography';

interface ProductSelectTableRowProps {
  product: Product;
  checked: boolean;
  onSelect: (id: number) => void;
  withColBorder?: boolean;
  tdPadding?: string;
}

const ProductSelectTableRow: React.FC<ProductSelectTableRowProps> = ({ product, checked, onSelect, withColBorder, tdPadding }) => {
  const tdClass = (isLast: boolean) =>
    `${tdPadding ?? 'p-2'} text-center${withColBorder && !isLast ? ' border-r border-gray-200' : ''}`;
  return (
    <tr className="hover:bg-gray-100 cursor-pointer" onClick={() => onSelect(product.id)}>
      <td className={tdClass(false)}>
        <input
          type="radio"
          checked={checked}
          onChange={() => onSelect(product.id)}
        />
      </td>
      <td className={tdClass(false)}><Typography variant="body">{product.name}</Typography></td>
      <td className={tdClass(false)}><Typography variant="body">{product.standard}</Typography></td>
      <td className={tdClass(false)}><Typography variant="body">{product.stock}</Typography></td>
      <td className={tdClass(false)}><Typography variant="body">{(product.inboundPrice ?? 0).toLocaleString()}/원</Typography></td>
      <td className={tdClass(true)}><Typography variant="body">{(product.outboundPrice ?? 0).toLocaleString()}/원</Typography></td>
    </tr>
  );
};

export default ProductSelectTableRow; 