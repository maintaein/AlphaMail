import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { Input } from '@/shared/components/atoms/input';
import { Button } from '@/shared/components/atoms/button';
import { TmpOrderAddAddress } from '../molecules/tmpOrderAddAddress';
import { FileUploadInput } from '../molecules/fileUploadInput';
import { useTmpClientStore } from '../../stores/useTmpClientStore';

export const RowTmpClientsAdd: React.FC = () => {
  const {
    clientName,
    setClientName,
    representative,
    setRepresentative,
    licenseNumber,
    setLicenseNumber,
    businessType,
    setBusinessType,
    businessItem,
    setBusinessItem,
    managerPhone,
    setManagerPhone,
    managerEmail,
    setManagerEmail,
    businessLicenseFileName,
    setBusinessLicense,
    reset
  } = useTmpClientStore();

  const handleTempSave = () => {
    console.log('임시저장');
    alert('임시저장 되었습니다.');
  };

  const handleApply = () => {
    console.log('등록');
    alert('거래처가 등록되었습니다.');
    reset();
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4 bg-white rounded-sm p-4">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            사업자등록증 첨부
          </Typography>
        </div>
        <div className="col-span-5">
          <FileUploadInput
            value={businessLicenseFileName}
            onChange={setBusinessLicense}
            placeholder="사업자등록증 파일을 첨부하세요"
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            거래처명 <span className="text-red-500">*</span>
          </Typography>
        </div>
        <div className="col-span-5">
          <Input 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            대표자명 <span className="text-red-500">*</span>
          </Typography>
        </div>
        <div className="col-span-5">
          <Input 
            value={representative}
            onChange={(e) => setRepresentative(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            사업자 번호 <span className="text-red-500">*</span>
          </Typography>
        </div>
        <div className="col-span-5">
          <Input 
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="123-34-2123512"
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            종목 <span className="text-red-500">*</span>
          </Typography>
        </div>
        <div className="col-span-5">
          <Input 
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="종목을 입력하세요."
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            업태 <span className="text-red-500">*</span>
          </Typography>
        </div>
        <div className="col-span-5">
          <Input 
            value={businessItem}
            onChange={(e) => setBusinessItem(e.target.value)}
            placeholder="업태를 입력하세요."
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            담당자 전화번호
          </Typography>
        </div>
        <div className="col-span-5">
          <Input 
            value={managerPhone}
            onChange={(e) => setManagerPhone(e.target.value)}
            placeholder="전화번호"
            className="w-full"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
          <Typography variant="caption" className="text-gray-700">
            담당자 Email
          </Typography>
        </div>
        <div className="col-span-5">
          <Input 
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            placeholder="Email"
            className="w-full"
            type="email"
          />
        </div>

        <div className="col-span-1 flex items-center bg-[#CDECFC] p-2">
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

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="secondary" size="small" onClick={handleTempSave}>
          임시저장
        </Button>
        <Button variant="primary" size="small" onClick={handleApply}>
          등록
        </Button>
      </div>
    </div>
  );
};