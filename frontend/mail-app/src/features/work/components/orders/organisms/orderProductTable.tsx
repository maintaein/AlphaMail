import React from 'react';
import { OrderProduct } from '../../../types/order';
import OrderProductRow from '../molecules/orderProductRow';

interface OrderProductTableProps {
  products: OrderProduct[];
  onProductChange: (index: number, field: keyof OrderProduct, value: string | number) => void;
  onAddProduct: () => void;
  onRemoveProduct: (index: number) => void;
}

const OrderProductTable: React.FC<OrderProductTableProps> = ({
  products,
  onProductChange,
  onAddProduct,
  onRemoveProduct,
}) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full mb-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">순번</th>
            <th className="p-2">품목</th>
            <th className="p-2">규격</th>
            <th className="p-2">수량</th>
            <th className="p-2">단가</th>
            <th className="p-2">세액</th>
            <th className="p-2">공급가액</th>
            <th className="p-2">금액</th>
            <th className="p-2">삭제</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <OrderProductRow
              key={idx}
              index={idx}
              product={product}
              onProductChange={onProductChange}
              onRemoveProduct={onRemoveProduct}
            />
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={onAddProduct}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        행 추가
      </button>
    </div>
  );
};

export default OrderProductTable; 