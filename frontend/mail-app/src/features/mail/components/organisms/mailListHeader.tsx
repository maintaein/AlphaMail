import React from 'react';
import { CheckboxItem } from '../molecules/checkboxItem';
import { ButtonGroup } from '../molecules/buttonGroup';

interface MailListHeaderProps {
  allSelected: boolean;
  onSelectAll: (selected: boolean) => void;
  onReply: () => void;
  onDelete: () => void;
  selectedCount: number;
}

export const MailListHeader: React.FC<MailListHeaderProps> = ({
  allSelected,
  onSelectAll,
  onReply,
  onDelete,
  selectedCount,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
      <div className="flex items-center">
        <div className="mr-4">
          <CheckboxItem 
            checked={allSelected} 
            onChange={onSelectAll}
            id="select-all-mails"
          />
        </div>
        
        <ButtonGroup
          buttons={[
            {
              label: '답장',
              onClick: onReply,
              variant: 'text',
              disabled: selectedCount !== 1
            },
            {
              label: '삭제',
              onClick: onDelete,
              variant: 'text',
              disabled: selectedCount === 0
            }
          ]}
        />
      </div>
    </div>
  );
};