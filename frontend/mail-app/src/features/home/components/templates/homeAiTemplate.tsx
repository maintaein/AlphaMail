import React, { useState } from 'react';
import { Typography } from '@/shared/components/atoms/Typography';
import { AiAssistantRow } from '../organisms/aiAssistantRow';

// 샘플 데이터
const sampleData = [
  { id: '1', type: '발주서' as const, title: '써피에서 도기그룹의 3개 품목에 대한 발주요청', date: '2025/04/23' },
  { id: '2', type: '일정' as const, title: '2025/4/25 14:00시 써피와의 1분기 미팅', date: '2025/04/25' },
  { id: '3', type: '견적서' as const, title: '써피에서 도기그룹의 3개 품목에 대한 발주요청', date: '2025/04/26' },
  { id: '4', type: '거래처' as const, title: '삼성전자 거래처 등록', date: '2025/04/27' },
];

export const HomeAiTemplate: React.FC = () => {
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [items, setItems] = useState(sampleData);
  
  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    if (activeRowId === id) {
      setActiveRowId(null);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="mb-4">
        <Typography variant="titleMedium">AI 업무 비서</Typography>
      </div>
      
      <div className="space-y-1">
        {items.map((item) => (
          <AiAssistantRow
            key={item.id}
            id={item.id}
            type={item.type}
            title={item.title}
            date={item.date}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};