import React from 'react';
import { Order } from '../../../types/order';

interface OrderTableRowProps {
  order: Order;
  onSelect: (id: number, checked: boolean) => void;
  onOrderClick?: (order: Order) => void;
}

const OrderTableRow: React.FC<OrderTableRowProps> = ({
  order,
  onSelect,
  onOrderClick,
}) => {
  return (
    <tr className={`border-b hover:bg-gray-50 ${order.isSelected ? 'bg-blue-50' : ''}`}>
      <td className="p-4">
        <input
          type="checkbox"
          checked={order.isSelected || false}
          onChange={(e) => onSelect(order.id, e.target.checked)}
          className="rounded border-gray-300"
        />
      </td>
      <td className="p-4">
        {onOrderClick ? (
          <button
            onClick={() => onOrderClick(order)}
            className="text-left hover:text-blue-600 hover:underline"
          >
            {order.order_no}
          </button>
        ) : (
          <span>{order.order_no}</span>
        )}
      </td>
      <td className="p-4">{order.date}</td>
      <td className="p-4">{order.manager}</td>
      <td className="p-4">{order.client_name}</td>
      <td className="p-4">{order.due_date}</td>
      <td className="p-4">{order.item}</td>
      <td className="p-4 text-right">{order.amount.toLocaleString()}원</td>
    </tr>
  );
};

export default OrderTableRow; 