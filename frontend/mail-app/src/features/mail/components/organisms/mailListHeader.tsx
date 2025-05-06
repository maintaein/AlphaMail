import React from 'react';
import { CheckboxItem } from '../molecules/checkboxItem';
import { ButtonGroup } from '../molecules/buttonGroup';

interface MailListHeaderProps {
  allSelected: boolean;
  onSelectAll: (selected: boolean) => void;
  onReply?: () => void;
  onMoveToTrash?: () => void;
  onRestore?: () => void;
  onEmptyTrash?: () => void;
  selectedCount: number;
  folderType?: 'inbox' | 'sent' | 'trash';
}

export const MailListHeader: React.FC<MailListHeaderProps> = ({
  allSelected,
  onSelectAll,
  onReply,
  onMoveToTrash,
  // onRestore,
  onEmptyTrash,
  selectedCount,
  folderType = 'inbox',
}) => {
  // 폴더 타입에 따라 다른 버튼 구성
const getButtons = () => {
  const buttons = [];
  
  if (folderType === 'inbox') {
    if (onReply) buttons.push({
      label: '답장',
      onClick: onReply,
      variant: 'text' as const,
      disabled: selectedCount !== 1
    });
    
    if (onMoveToTrash) buttons.push({
      label: '삭제',
      onClick: onMoveToTrash,
      variant: 'text' as const,
      disabled: selectedCount === 0
    });
  } else if (folderType === 'sent') {
    if (onMoveToTrash) buttons.push({
      label: '삭제',
      onClick: onMoveToTrash,
      variant: 'text' as const,
      disabled: selectedCount === 0
    });
  } else if (folderType === 'trash') {
    // if (onRestore) buttons.push({
    //   label: '복원',
    //   onClick: onRestore,
    //   variant: 'text' as const,
    //   disabled: selectedCount === 0
    // });
    
    if (onEmptyTrash) buttons.push({
      label: '비우기',
      onClick: onEmptyTrash,
      variant: 'text' as const
    });
  }
  
  return buttons;
};
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
        
        <ButtonGroup buttons={getButtons()} />
      </div>
    </div>
  );
};