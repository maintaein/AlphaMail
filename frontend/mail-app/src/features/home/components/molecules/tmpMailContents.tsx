import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface TmpMailContentsProps {
  content: string;
}

export const TmpMailContents: React.FC<TmpMailContentsProps> = ({ content }) => {
  return (
    <div className="p-4 bg-white rounded-md h-full overflow-auto">
      <Typography variant="body">
        {content}
      </Typography>
    </div>
  );
};