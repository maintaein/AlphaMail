import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface SenderInfoProps {
  name: string;
  email?: string;
  isRead?: boolean;
}

export const SenderInfo: React.FC<SenderInfoProps> = ({ 
  name, 
  email,
  isRead = true
}) => {
  return (
    <div className="flex flex-col">
      <Typography 
        variant="body" 
        bold={!isRead}
        className="truncate max-w-[120px]"
      >
        {name}
      </Typography>
      {email && (
        <Typography 
          variant="caption" 
          className="truncate max-w-[120px]"
        >
          {email}
        </Typography>
      )}
    </div>
  );
};