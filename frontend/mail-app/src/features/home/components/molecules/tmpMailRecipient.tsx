import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface TmpMailRecipientProps {
  emails: string[];
}

export const TmpMailRecipient: React.FC<TmpMailRecipientProps> = ({ emails }) => {
  return (
    <div className="mb-2 flex">
      <Typography variant="body" className="text-gray-600 w-20">
        받는사람:
      </Typography>
      <div className="flex flex-wrap gap-1">
        {emails.map((email, index) => (
          <Typography 
            key={index} 
            variant="body" 
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
          >
            {email}
          </Typography>
        ))}
      </div>
    </div>
  );
};