import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface MailContentProps {
  bodyHtml?: string;
  bodyText?: string;
}

export const MailContent: React.FC<MailContentProps> = ({
  bodyHtml,
  bodyText
}) => {
  return (
    <div className="mail-content px-4 py-4">
      {bodyHtml ? (
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      ) : (
        <Typography variant="body" className="whitespace-pre-line">
          {bodyText}
        </Typography>
      )}
    </div>
  );
};