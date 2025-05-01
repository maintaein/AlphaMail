import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface DateDisplayProps {
  date: string | Date;
  isRead?: boolean;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ 
  date,
  isRead = true
}) => {
  const formatDate = (dateInput: string | Date): string => {
    const dateObj = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    
    const year = dateObj.getFullYear().toString().slice(2);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <Typography 
      variant="caption"
      bold={!isRead}
      className="whitespace-nowrap"
    >
      {formatDate(date)}
    </Typography>
  );
};