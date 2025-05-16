import React from 'react';
import { Product } from '../../../types/product';
import { Typography } from '@/shared/components/atoms/Typography';

interface ProductTableRowProps {
  product: Product;
  onSelect: (id: number) => void;
  onProductClick?: (product: Product) => void;
  sequenceNumber: string;
}

export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  onSelect,
  onProductClick,
  sequenceNumber
}) => {
  return (
    <tr className={`border-t hover:bg-gray-50 ${product.isSelected ? 'bg-blue-50' : ''}`}>
      <td className="p-2 text-center">
        <input
          type="checkbox"
          checked={product.isSelected}
          onChange={() => onSelect(product.id)}
          className="rounded border-gray-300"
        />
      </td>
      <td className="p-2 text-center">
        <Typography variant="body">
          {sequenceNumber}
        </Typography>
      </td>
      <td className="p-2">
        {onProductClick ? (
          <a
            href={`/work/products/${product.id}`}
            onClick={e => { e.preventDefault(); onProductClick(product); }}
            className="text-left hover:text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0 m-0 font-normal text-[12px] leading-normal"
          >
            {product.name}
          </a>
        ) : (
          <Typography variant="body">
            {product.name}
          </Typography>
        )}
      </td>
      <td className="p-2 text-center">
        <Typography variant="body">
          {product.standard}
        </Typography>
      </td>
      <td className="p-2 text-center">
        <Typography variant="body">
          {product.stock}
        </Typography>
      </td>
      <td className="p-2 text-right">
        <Typography variant="body">
          {product.inboundPrice.toLocaleString()}원
        </Typography>
      </td>
      <td className="p-2 text-right">
        <Typography variant="body">
          {product.outboundPrice.toLocaleString()}원
        </Typography>
      </td>
    </tr>
  );
}; 