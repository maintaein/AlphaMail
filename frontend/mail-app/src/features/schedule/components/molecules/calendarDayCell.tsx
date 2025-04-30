import React from 'react';
import { Schedule } from '@/features/schedule/types/schedule';
import { format } from 'date-fns';

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
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'HH:mm');
  };

  return (
    <div
      className={`p-2 min-h-[100px] bg-white border border-gray-200 rounded ${
        !isCurrentMonth ? 'text-gray-400' : ''
      } ${isToday ? 'border-2 border-blue-500' : ''}`}
    >
      <div className="text-right font-medium">{date.getDate()}</div>
      <div className="mt-1 space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            className="text-sm truncate cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={() => onEventClick?.(event)}
          >
            {formatTime(event.startDate.toISOString())} {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};
