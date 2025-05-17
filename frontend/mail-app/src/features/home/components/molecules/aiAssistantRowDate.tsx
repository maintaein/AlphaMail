import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface AiAssistantRowDateProps {
  date: string;
}

export const AiAssistantRowDate: React.FC<AiAssistantRowDateProps> = ({ date }) => {
  return (
    <Typography variant="body" color="text-gray-500">
      {date}
    </Typography>
  );
};