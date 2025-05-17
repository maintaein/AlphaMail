import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface AiAssistantRowTitleProps {
  title: string;
}

export const AiAssistantRowTitle: React.FC<AiAssistantRowTitleProps> = ({ title }) => {
  return (
    <Typography variant="titleSmall" className="ml-2">
      {title}
    </Typography>
  );
};