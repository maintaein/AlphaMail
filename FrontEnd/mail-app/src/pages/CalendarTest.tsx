import React from 'react';
import { CalendarGrid } from '@/features/schedule/components/organisms/calendarGrid';

const CalendarTest: React.FC = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 테스트용 이벤트 데이터
  const testEvents = {
    [new Date().toISOString().split('T')[0]]: [
      { id: '1', title: '테스트 일정 1' },
      { id: '2', title: '테스트 일정 2' },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">캘린더 테스트</h1>
      <div className="max-w-4xl mx-auto">
        <CalendarGrid year={year} month={month} eventsMap={testEvents} />
      </div>
    </div>
  );
};

export default CalendarTest; 