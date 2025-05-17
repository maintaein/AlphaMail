import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface TmpMailDateProps {
  date: string;
}

export const TmpMailDate: React.FC<TmpMailDateProps> = ({ date }) => {
  return (
    <div className="mb-2 flex">
      <Typography variant="body" className="text-gray-600 w-20">
        보낸날짜:
      </Typography>
      <Typography variant="body">
        {date}
      </Typography>
    </div>
  );
};