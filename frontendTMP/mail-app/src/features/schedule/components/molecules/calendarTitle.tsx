import React from 'react';

interface EventItem {
  id: string;
  title: string;
}

interface CalendarDayCellProps {
  date: Date;
  events?: EventItem[];
  isToday?: boolean;
  isCurrentMonth?: boolean;
}

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  date,
  events = [],
  isToday = false,
  isCurrentMonth = true,
}) => {
  return (
    <div
      className={`border p-2 h-24 flex flex-col relative
        ${isCurrentMonth ? '' : 'text-gray-400'}
        ${isToday ? 'bg-blue-100 border-blue-500' : ''}
      `}
    >
      {/* 날짜 숫자 */}
      <div className="text-sm font-bold">{date.getDate()}</div>

      {/* 일정 리스트 */}
      <div className="mt-1 flex-1 overflow-hidden">
        {events.slice(0, 2).map((event) => (
          <div
            key={event.id}
            className="text-xs truncate bg-blue-300 text-white rounded px-1 mt-1"
            title={event.title}
          >
            {event.title}
          </div>
        ))}

        {/* 일정이 많으면 +N 표시 */}
        {events.length > 2 && (
          <div className="text-xs text-gray-500 mt-1">
            +{events.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};
