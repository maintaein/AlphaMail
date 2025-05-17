import React from 'react';
import { AiAssistantRowTag } from '../molecules/aiAssistantRowTag';
import { AiAssistantRowDate } from '../molecules/aiAssistantRowDate';
import { AiAssistantRowTitle } from '../molecules/aiAssistantRowTitle';
import { AiAssistantRowButton } from '../molecules/aiAssistantRowButton';
import { RowTmpMail } from './rowTmpMail';
import { RowTmpScheduleAdd } from './rowTmpScheduleAdd';
import { RowTmpClientsAdd } from './rowTmpClientsAdd';
import { RowTmpOrderAdd } from './rowTmpOrderAdd';
import { RowTmpQuotesAdd } from './rowTmpQuotesAdd';
import { useHomeStore } from '../../stores/useHomeStore';

type TagType = '발주서' | '일정' | '견적서' | '거래처';

interface AiAssistantRowProps {
  id: string;
  type: TagType;
  title: string;
  date?: string;
  onDelete: (id: string) => void;
}

export const AiAssistantRow: React.FC<AiAssistantRowProps> = ({
  id,
  type,
  title,
  date,
  onDelete
}) => {
  const { activeRowId, setActiveRowId } = useHomeStore();
  const isOpen = activeRowId === id;

  const handleView = (rowId: string) => {
    // 이미 열려있는 경우 닫기
    if (activeRowId === rowId) {
      setActiveRowId(null);
    } else {
      // 다른 행이 열려있으면 닫고 현재 행 열기
      setActiveRowId(rowId);
    }
  };

  const renderDetailContent = () => {
    switch (type) {
      case '일정':
        return <RowTmpScheduleAdd />;
      case '거래처':
        return <RowTmpClientsAdd />;
      case '발주서':
        return <RowTmpOrderAdd />;
      case '견적서':
        return <RowTmpQuotesAdd />;
      default:
        return null;
    }
  };

  return (
    <div className="border-t border-gray-100 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AiAssistantRowTag type={type} />
          <AiAssistantRowTitle title={title} />
        </div>
        <div className="flex items-center space-x-4">
          {date && <AiAssistantRowDate date={date} />}
          <AiAssistantRowButton
            id={id}
            isOpen={isOpen}
            onView={handleView}
            onDelete={onDelete}
          />
        </div>
      </div>
      
      {/* 상세 내용 (열려있을 때만 표시) */}
      {isOpen && (
        <div className="space-y-3">
          <RowTmpMail />
          {renderDetailContent()}
        </div>
      )}
    </div>
  );
};