import React from 'react';
import { OrderDetail } from '../../../types/order';

interface OrderBasicInfoFormProps {
  formData: OrderDetail;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fields = [
  { name: 'order_no', label: '발주등록번호' },
  { name: 'date', label: '일자' },
  { name: 'manager', label: '발주담당자' },
  { name: 'client_name', label: '거래처명' },
  { name: 'business_no', label: '사업자등록번호' },
  { name: 'representative', label: '대표자' },
  { name: 'business_type', label: '업태' },
  { name: 'business_category', label: '종목' },
  { name: 'client_manager', label: '거래처담당자' },
  { name: 'client_contact', label: '거래처연락처' },
  { name: 'payment_condition', label: '결제조건' },
  { name: 'due_date', label: '납기일자' },
  { name: 'address', label: '주소', colSpan: 2 },
];

const OrderBasicInfoForm: React.FC<OrderBasicInfoFormProps> = ({ formData, onInputChange }) => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded">
      {fields.map((field) => (
        <div key={field.name} className={`flex items-center ${field.colSpan ? `col-span-${field.colSpan}` : ''}`}>
          <label htmlFor={field.name} className="w-28 mr-2 text-sm text-gray-700">{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            value={(formData as any)[field.name]}
            onChange={onInputChange}
            className="border p-2 rounded flex-1"
          />
        </div>
      ))}
    </div>
  );
};

export default OrderBasicInfoForm; 