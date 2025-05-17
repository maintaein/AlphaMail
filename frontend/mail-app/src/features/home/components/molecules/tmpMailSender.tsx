import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface TmpMailSenderProps {
  name: string;
}

export const TmpMailSender: React.FC<TmpMailSenderProps> = ({ name }) => {
  return (
    <div className="mb-2 flex">
      <Typography variant="body" className="text-gray-600 w-20">
        보낸사람:
      </Typography>
      <Typography variant="body" className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
        {name}
      </Typography>
    </div>
  );
};