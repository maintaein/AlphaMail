import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface MailSubjectProps {
  subject: string;
  isRead?: boolean;
  variant?: 'list' | 'detail'; // 새로운 prop 추가
}

export const MailSubject: React.FC<MailSubjectProps> = ({ 
  subject, 
  isRead = true,
  variant = 'list' // 기본값은 list
}) => {
  // variant에 따라 다른 Typography variant 사용
  const typographyVariant = variant === 'detail' ? 'titleMedium' : 'body';
  
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <Typography 
        variant={typographyVariant}
        bold={!isRead}
        className="truncate"
      >
        {subject}
      </Typography>
    </div>
  );
};