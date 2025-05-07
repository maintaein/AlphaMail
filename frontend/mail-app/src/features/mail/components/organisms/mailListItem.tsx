import React from 'react';
import { CheckboxItem } from '../molecules/checkboxItem';
import { MailIcon } from '../molecules/mailIcon';
import { SenderInfo } from '../molecules/senderInfo';
import { MailSubject } from '../molecules/mailSubject';
import { DateDisplay } from '../molecules/dateDisplay';
import { FileSizeDisplay } from '../molecules/fileSizeDisplay';
import { Mail } from '../../types/mail';

interface MailListItemProps {
  mail: Mail;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
  onClick: (id: string) => void;
}

export const MailListItem: React.FC<MailListItemProps> = ({
  mail,
  isSelected,
  onSelect,
  onClick
}) => {
  const handleCheckboxChange = (checked: boolean) => {
    onSelect(mail.id, checked);
  };

  return (
    <div 
      className={`
        flex items-center px-4 py-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer
        ${isSelected ? 'bg-[#E6F4FA]' : ''}
      `}
      onClick={() => onClick(mail.id)}
    >
      <div className="mr-2" onClick={(e) => e.stopPropagation()}>
        <CheckboxItem 
          checked={isSelected} 
          onChange={handleCheckboxChange}
          id={`mail-${mail.id}`}
        />
      </div>
      
      <div className="mr-3">
        <MailIcon 
          isRead={mail.isRead} 
        />
      </div>
      
      <div className="w-[120px] mr-4">
        <SenderInfo 
          name={mail.sender.name} 
          email={mail.sender.email}
          isRead={mail.isRead}
        />
      </div>
      
      <div className="flex-1 mr-4 truncate">
        <MailSubject 
          subject={mail.subject} 
          isRead={mail.isRead}
        />
      </div>
      
      <div className="mr-4">
        <DateDisplay 
          date={mail.receivedAt}
          isRead={mail.isRead}
        />
      </div>
      
      <div>
        <FileSizeDisplay 
          sizeInBytes={mail.attachmentSize || 0}
          isRead={mail.isRead}
        />
      </div>
    </div>
  );
};