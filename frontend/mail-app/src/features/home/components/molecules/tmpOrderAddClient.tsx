import React from 'react';
import { useTmpOrderStore } from '../../stores/useTmpOrderStore';
import ClientInput from '@/shared/components/atoms/clientInput';
import { Client } from '@/features/work/types/clients';

export const TmpOrderAddClient: React.FC = () => {
  const { 
    clientName, 
    setClientName, 
    setLicenseNumber, 
    setRepresentative, 
    setBusinessType, 
    setBusinessItem 
  } = useTmpOrderStore();

  const handleClientSelect = (client: Client) => {
    console.log('선택된 거래처:', client); // 디버깅용
    
    // 거래처 정보 설정
    setClientName(client.corpName);
    
    setLicenseNumber(client.licenseNumber || '');
    setRepresentative(client.representative || '');
    setBusinessType(client.businessType || '');
    setBusinessItem(client.businessItem || '');
  };

  return (
    <div className="w-full">
      <ClientInput
        value={clientName}
        onChange={handleClientSelect}
        className="w-full !h-8 !text-sm !rounded-none"
      />
    </div>
  );
};