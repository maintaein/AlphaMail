import React from 'react';
import { CalendarDayCell } from '@/features/schedule/components/molecules/calendarDayCell';

interface EventItem {
  id: string;
  title: string;
}

interface CalendarGridProps {
  year: number;
  month: number; // 0 = 1월, 11 = 12월
  eventsMap?: Record<string, EventItem[]>; // "YYYY-MM-DD" 형태로 매칭
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ year, month, eventsMap = {} }) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 1. 날짜 배열 만들기
  const dates: Date[] = [];

  // 앞쪽 지난달 채우기
  for (let i = 0; i < firstDayOfWeek; i++) {
    const prevMonthDate = new Date(year, month, i - firstDayOfWeek + 1);
    dates.push(prevMonthDate);
  }

  // 이번 달 날짜 채우기
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }

  // 뒷쪽 다음달 채우기
  while (dates.length % 7 !== 0) {
    const nextMonthDate = new Date(year, month + 1, dates.length - (firstDayOfWeek + daysInMonth) + 1);
    dates.push(nextMonthDate);
  }

  // 2. 오늘 날짜
  const today = new Date();
  const todayString = today.toDateString();

  // 3. 요일 헤더
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="w-full">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dates.map((date, index) => {
          const dateString = date.toDateString();
          const isToday = dateString === todayString;
          const isCurrentMonth = date.getMonth() === month;

          return (
            <CalendarDayCell
              key={index}
              date={date}
              events={eventsMap[formatDateKey(date)] || []}
              isToday={isToday}
              isCurrentMonth={isCurrentMonth}
            />
          );
        })}
      </div>
    </div>
  );
};

// 헬퍼 함수: "YYYY-MM-DD" 포맷
function formatDateKey(date: Date) {
  return date.toISOString().split('T')[0]; // 예: "2025-04-28"
}
