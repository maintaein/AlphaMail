import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { Input } from '@/shared/components/atoms/input';
import { Button } from '@/shared/components/atoms/button';
import { TmpOrderAddAddress } from '../molecules/tmpOrderAddAddress';
import { TmpOrderAddDate } from '../molecules/tmpOrderAddDate';
import { TmpOrderAddRow } from '../molecules/tmpOrderAddRow';
import { useTmpQuoteStore } from '../../stores/useTmpQuoteStore';
import { TmpQuoteAddClient } from '../molecules/tmpQuoteAddClient';

export const RowTmpQuotesAdd: React.FC = () => {
  const { 
    quoteNo, 
    licenseNumber, 
    representative, 
    businessType, 
    businessItem, 
    manager, 
    setManager, 
    managerContact, 
    setManagerContact,
    validityPeriod,
    setValidityPeriod,
    reset
  } = useTmpQuoteStore();
  
  const handleTempSave = () => {
    // 임시저장 로직 구현
    console.log('임시저장');
    alert('임시저장 되었습니다.');
  };
  
  const handleApply = () => {
    // 적용 로직 구현
    console.log('적용');
    alert('견적서가 적용되었습니다.');
    reset();
  };
  
  // 입력 필드 높이를 일관되게 유지하기 위한 스타일
  const inputStyle = "h-8 text-sm";
  
  return (
    <div className="mt-4 border-t border-gray-200 pt-4 bg-white rounded-sm p-4">
      <Typography variant="titleMedium" className="font-medium mb-4">
        견적서
      </Typography>
      
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            견적등록번호
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={quoteNo} className={`bg-gray-200 ${inputStyle}`} />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            일자
          </Typography>
        </div>
        <div className="col-span-2">
          <div className="w-full">
            <TmpOrderAddDate />
          </div>
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            견적담당자
          </Typography>
        </div>
        <div className="col-span-2">
          <Input 
            value={manager} 
            onChange={(e) => setManager(e.target.value)} 
            className={inputStyle}
          />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            유효기간
          </Typography>
        </div>
        <div className="col-span-2">
          <Input 
            value={validityPeriod} 
            onChange={(e) => setValidityPeriod(e.target.value)} 
            className={inputStyle}
          />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            거래처명
          </Typography>
        </div>
        <div className="col-span-5">
          <div className="w-full">
            <TmpQuoteAddClient />
          </div>
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            사업자등록번호
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={licenseNumber} className={`bg-gray-200 ${inputStyle}`} />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            대표자
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={representative} className={`bg-gray-200 ${inputStyle}`} />
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
            className={inputStyle}
          />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            종목
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={businessItem} className={`bg-gray-200 ${inputStyle}`} />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            거래처연락처
          </Typography>
        </div>
        <div className="col-span-2">
          <Input className={inputStyle} />
        </div>
        
        <div className="col-span-1 flex items-center">
          <Typography variant="caption" className="text-gray-700">
            업태
          </Typography>
        </div>
        <div className="col-span-2">
          <Input readOnly value={businessType} className={`bg-gray-200 ${inputStyle}`} />
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