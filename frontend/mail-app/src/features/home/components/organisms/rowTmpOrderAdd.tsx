import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { Input } from '@/shared/components/atoms/input';
import { Button } from '@/shared/components/atoms/button';
import { TmpOrderAddAddress } from '../molecules/tmpOrderAddAddress';
import { TmpOrderAddDate } from '../molecules/tmpOrderAddDate';
import { TmpOrderAddRow } from '../molecules/tmpOrderAddRow';
import { useTmpOrderStore } from '../../stores/useTmpOrderStore';
import { TmpOrderAddClient } from '../molecules/tmpOrderAddClient';

export const RowTmpOrderAdd: React.FC = () => {
  const { 
    orderNo, 
    orderDate, 
    licenseNumber, 
    representative, 
    businessType, 
    businessItem, 
    manager, 
    setManager, 
    managerContact, 
    setManagerContact,
    paymentTerm,
    setPaymentTerm,
    reset
  } = useTmpOrderStore();
  
  const handleTempSave = () => {
    // 임시저장 로직 구현
    console.log('임시저장');
    alert('임시저장 되었습니다.');
  };
  
  const handleApply = () => {
    // 적용 로직 구현
    console.log('적용');
    alert('발주서가 적용되었습니다.');
    reset();
  };
  
  // 입력 필드 높이를 일관되게 유지하기 위한 스타일
  const inputStyle = "h-10";
  
  return (
    <div className="mt-4 border-t border-gray-200 pt-4 bg-white rounded-sm p-4">
      <Typography variant="titleMedium" className="font-medium mb-4">
        발주서
      </Typography>
      
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            발주등록번호
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={orderNo} className={`bg-gray-200 ${inputStyle}`} />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            일자
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={orderDate} className={`bg-gray-200 ${inputStyle}`} />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            발주담당자
          </Typography>
        </div>
        <div className="col-span-2">
          <Input 
            value={manager} 
            onChange={(e) => setManager(e.target.value)} 
            placeholder="" 
            className={inputStyle}
          />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            결제조건
          </Typography>
        </div>
        <div className="col-span-2">
          <Input 
            value={paymentTerm} 
            onChange={(e) => setPaymentTerm(e.target.value)} 
            placeholder="" 
            className={inputStyle}
          />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            거래처명
          </Typography>
        </div>
        <div className="col-span-5">
          <div className={`h-10 flex items-center`}>
            <TmpOrderAddClient />
          </div>
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            사업자등록번호
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={licenseNumber} className={`bg-gray-200 ${inputStyle}`} placeholder="" />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            대표자
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={representative} className={`bg-gray-200 ${inputStyle}`} placeholder="" />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            거래처담당자
          </Typography>
        </div>
        <div className="col-span-2">
          <Input 
            value={managerContact} 
            onChange={(e) => setManagerContact(e.target.value)} 
            placeholder="" 
            className={inputStyle}
          />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            종목
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={businessItem} className={`bg-gray-200 ${inputStyle}`} placeholder="" />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            거래처연락처
          </Typography>
        </div>
        <div className="col-span-2">
          <Input placeholder="" className={inputStyle} />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            업태
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={businessType} className={`bg-gray-200 ${inputStyle}`} placeholder="" />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            주소
          </Typography>
        </div>
        <div className="col-span-5">
          <div className="w-full">
            <TmpOrderAddAddress />
          </div>
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            납기일자
          </Typography>
        </div>
        <div className="col-span-5">
          <div className={`h-10 flex items-center`}>
            <TmpOrderAddDate />
          </div>
        </div>
      </div>
      
      <TmpOrderAddRow />
      
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="secondary" size="small" onClick={handleTempSave}>
          임시저장
        </Button>
        <Button variant="primary" size="small" onClick={handleApply}>
          적용
        </Button>
      </div>
    </div>
  );
};