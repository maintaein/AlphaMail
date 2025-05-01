import React from 'react';
import { MailListItem  } from './mailListItem';
import { Typography } from '@/shared/components/atoms/Typography';
import { Mail } from '../../types/mail'; // 공통 타입 임포트

interface MailListProps {
  mails: Mail[];
  selectedMailIds: string[];
  onSelectMail: (id: string, selected: boolean) => void;
  onMailClick: (id: string) => void;
}

export const MailList: React.FC<MailListProps> = ({
  mails,
  selectedMailIds,
  onSelectMail,
  onMailClick
}) => {
  if (mails.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Typography variant="body">메일이 없습니다.</Typography>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200">
      {mails.map((mail) => (
        <MailListItem
          key={mail.id}
          mail={mail}
          isSelected={selectedMailIds.includes(mail.id)}
          onSelect={onSelectMail}
          onClick={onMailClick}
        />
      ))}
    </div>
  );
};