import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface MailSubjectProps {
  subject: string;
  isRead?: boolean;
}

export const MailSubject: React.FC<MailSubjectProps> = ({ 
  subject, 
  isRead = true
}) => {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <Typography 
        variant="body" 
        bold={!isRead}
        className="truncate"
      >
        {subject}
      </Typography>
    </div>
  );
};