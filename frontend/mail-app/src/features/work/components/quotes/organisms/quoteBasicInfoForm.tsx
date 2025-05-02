import React from 'react';
import { QuoteDetail } from '../../../types/quote';

interface QuoteBasicInfoFormProps {
  formData: QuoteDetail;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QuoteBasicInfoForm: React.FC<QuoteBasicInfoFormProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">발주등록번호</label>
          <input
            type="text"
            name="order_no"
            value={formData.order_no}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">일자</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">발주담당자</label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">거래처명</label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">사업자등록번호</label>
          <input
            type="text"
            name="business_no"
            value={formData.business_no}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">대표자</label>
          <input
            type="text"
            name="representative"
            value={formData.representative}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">종목</label>
          <input
            type="text"
            name="business_category"
            value={formData.business_category}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">업태</label>
          <input
            type="text"
            name="business_type"
            value={formData.business_type}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">거래처담당자</label>
          <input
            type="text"
            name="client_manager"
            value={formData.client_manager}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">거래처연락처</label>
          <input
            type="text"
            name="client_contact"
            value={formData.client_contact}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">결제조건</label>
          <input
            type="text"
            name="payment_condition"
            value={formData.payment_condition}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">납기일자</label>
          <input
            type="date"
            name="delivery_date"
            value={formData.delivery_date}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium text-gray-700">주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}; 