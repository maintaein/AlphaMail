import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface TmpMailSubjectProps {
  subject: string;
}

export const TmpMailSubject: React.FC<TmpMailSubjectProps> = ({ subject }) => {
  return (
    <div className="mb-4">
      <Typography variant="titleMedium" className="font-bold">
        {subject}
      </Typography>
    </div>
  );
};