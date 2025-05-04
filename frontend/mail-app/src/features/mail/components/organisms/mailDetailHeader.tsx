import React from 'react';
import { Button } from '@/shared/components/atoms/button';
import { ButtonGroup } from '../molecules/buttonGroup';

interface MailDetailHeaderProps {
  onBack: () => void;
  onReply: () => void;
  onForward: () => void;
  onDelete: () => void;
}

export const MailDetailHeader: React.FC<MailDetailHeaderProps> = ({
  onBack,
  onReply,
  onForward,
  onDelete
}) => {
  return (
    <div className="flex justify-between mb-6 p-4 bg-gray-50">
      <Button variant="ghost" onClick={onBack} className="flex items-center gap-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        뒤로
      </Button>
      
      <ButtonGroup
        buttons={[
          {
            label: '답장',
            onClick: onReply,
            variant: 'text'
          },
          {
            label: '전달',
            onClick: onForward,
            variant: 'text'
          },
          {
            label: '삭제',
            onClick: onDelete,
            variant: 'text'
          }
        ]}
      />
    </div>
  );
};