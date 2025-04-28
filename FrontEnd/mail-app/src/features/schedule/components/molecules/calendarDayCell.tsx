import React from 'react';

interface CalendarDayCellProps {
  date: Date;
  events: Array<{ id: string; title: string }>;
  isToday: boolean;
  isCurrentMonth: boolean;
}

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  date,
  events,
  isToday,
  isCurrentMonth,
}) => {
  return (
    <div
      className={`p-2 min-h-[100px] bg-white ${
        !isCurrentMonth ? 'text-gray-400' : ''
      } ${isToday ? 'border-2 border-blue-500' : ''}`}
    >
      <div className="text-right">{date.getDate()}</div>
      <div className="mt-1">
        {events.map((event) => (
          <div key={event.id} className="text-sm truncate">
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};
