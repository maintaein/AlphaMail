import React from 'react';
import { Schedule } from '@/features/schedule/types/schedule';

interface CalendarDayCellProps {
  date: Date;
  events: Schedule[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onEventClick?: (event: Schedule) => void;
}

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  date,
  events,
  isToday,
  isCurrentMonth,
  onEventClick,
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
          <div
            key={event.id}
            className="text-sm truncate cursor-pointer hover:bg-gray-100"
            onClick={() => onEventClick?.(event)}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};
