import React from 'react';
import { Quote } from '../../../types/quote';

interface QuoteTableRowProps {
  quote: Quote;
  onSelect?: (id: number) => void;
  onQuoteClick?: (quote: Quote) => void;
}

export const QuoteTableRow: React.FC<QuoteTableRowProps> = ({
  quote,
  onSelect,
  onQuoteClick,
}) => {
  const handleClick = () => {
    if (onQuoteClick) {
      onQuoteClick(quote);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4">
        <input
          type="checkbox"
          checked={quote.isSelected}
          onChange={() => onSelect?.(quote.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="p-4">{quote.id}</td>
      <td className="p-4 cursor-pointer hover:text-blue-600" onClick={handleClick}>
        {quote.quote_no}
      </td>
      <td className="p-4">{quote.created_at}</td>
      <td className="p-4">{quote.user_name}</td>
      <td className="p-4">{quote.client_name}</td>
      <td className="p-4">{quote.product_name} 외 {quote.product_count - 1}개</td>
      <td className="p-4 text-right">{quote.price.toLocaleString()}원</td>
    </tr>
  );
}; 