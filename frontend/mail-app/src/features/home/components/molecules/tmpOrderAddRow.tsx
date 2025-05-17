import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { Input } from '@/shared/components/atoms/input';
import { useTmpOrderStore } from '../../stores/useTmpOrderStore';
import ProductInput from '@/shared/components/atoms/productInput';
import { Product } from '@/features/work/types/product';

export const TmpOrderAddRow: React.FC = () => {
  const { items, addItem, removeItem, updateItem, setItemName, getTotalAmount } = useTmpOrderStore();

  const handleProductSelect = (id: number, product: Product) => {
    // 품목 정보 설정
    setItemName(id, product.name);
    
    // 품목 선택 시 규격, 단가 등 자동 설정
    updateItem(id, 'spec', product.standard || '1EA');
    updateItem(id, 'price', product.outboundPrice?.toLocaleString() || '0');
    
    // 수량이 없으면 기본값 1 설정
    if (!items.find(item => item.id === id)?.quantity) {
      updateItem(id, 'quantity', '1');
    }
    
    // 세액 계산 (단가의 10%)
    const price = product.outboundPrice || 0;
    const tax = Math.round(price * 0.1).toLocaleString();
    updateItem(id, 'tax', tax);
    
    // 합계 계산 (단가 * 수량)
    const quantity = parseInt(items.find(item => item.id === id)?.quantity || '1');
    const total = (price * quantity).toLocaleString();
    updateItem(id, 'total', total);
  };

  const handleQuantityChange = (id: number, value: string) => {
    // 숫자만 입력 가능하도록
    if (!/^\d*$/.test(value)) return;
    
    // 수량 업데이트
    updateItem(id, 'quantity', value);
    
    // 합계 재계산
    const item = items.find(item => item.id === id);
    if (item) {
      const price = parseInt(item.price.replace(/,/g, '')) || 0;
      const quantity = parseInt(value) || 0;
      const total = (price * quantity).toLocaleString();
      updateItem(id, 'total', total);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-y border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-t border-b border-gray-300 p-2 w-12 text-center">
                <button 
                  onClick={addItem}
                  className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </th>
              <th className="border-t border-b border-x border-gray-300 p-2 w-16 text-center">
                <Typography variant="caption" className="text-gray-700">순번</Typography>
              </th>
              <th className="border-t border-b border-x border-gray-300 p-2 text-center">
                <Typography variant="caption" className="text-gray-700">품목</Typography>
              </th>
              <th className="border-t border-b border-x border-gray-300 p-2 text-center">
                <Typography variant="caption" className="text-gray-700">규격</Typography>
              </th>
              <th className="border-t border-b border-x border-gray-300 p-2 text-center">
                <Typography variant="caption" className="text-gray-700">수량</Typography>
              </th>
              <th className="border-t border-b border-x border-gray-300 p-2 text-center">
                <Typography variant="caption" className="text-gray-700">단가</Typography>
              </th>
              <th className="border-t border-b border-x border-gray-300 p-2 text-center">
                <Typography variant="caption" className="text-gray-700">세액</Typography>
              </th>
              <th className="border-t border-b border-gray-300 p-2 text-center">
                <Typography variant="caption" className="text-gray-700">공급가액</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border-b border-gray-300 p-2 text-center">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                </td>
                <td className="border-b border-x border-gray-300 p-2 text-center">
                  <Typography variant="body">{item.id}</Typography>
                </td>
                <td className="border-b border-x border-gray-300 p-2">
                  <ProductInput
                    value={item.name}
                    onChange={(product) => handleProductSelect(item.id, product)}
                    placeholder=""
                    className="w-full !h-7 !text-sm !rounded-none"
                  />
                </td>
                <td className="border-b border-x border-gray-300 p-2">
                  <Input
                    value={item.spec}
                    readOnly
                    className="bg-gray-200 h-10"
                  />
                </td>
                <td className="border-b border-x border-gray-300 p-2">
                  <Input
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    placeholder=""
                    className="h-10"
                  />
                </td>
                <td className="border-b border-x border-gray-300 p-2">
                  <Input
                    value={item.price}
                    readOnly
                    className="bg-gray-200 text-right h-10"
                  />
                </td>
                <td className="border-b border-x border-gray-300 p-2">
                  <Input
                    value={item.tax}
                    readOnly
                    className="bg-gray-200 text-right h-10"
                  />
                </td>
                <td className="border-b border-gray-300 p-2">
                  <Input
                    value={item.total}
                    readOnly
                    className="bg-gray-200 text-right h-10"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan={7} className="border-b border-x border-gray-300 p-2 text-right">
                <Typography variant="body" className="font-bold">합계</Typography>
              </td>
              <td className="border-b border-gray-300 p-2 text-right">
                <Typography variant="body" className="font-bold">{getTotalAmount().toLocaleString()} 원</Typography>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};