import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface RecipientInfoProps {
  email: string;
}

export const RecipientInfo: React.FC<RecipientInfoProps> = ({ email }) => {
  const name = email.split('@')[0]; // 이메일에서 사용자 이름 추출
  
  return (
    <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center mr-1">
        <Typography variant="caption" className="text-xs">
          {name.charAt(0).toUpperCase()}
        </Typography>
      </div>
      <Typography variant="caption">{email}</Typography>
    </div>
  );
};