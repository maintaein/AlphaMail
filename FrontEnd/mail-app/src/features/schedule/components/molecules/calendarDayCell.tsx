import React from 'react';
import { CalendarScheduleInfo } from './calendarScheduleInfo';
import { format } from 'date-fns';

interface EventItem {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  color?: string;
}

interface CalendarDayCellProps {
  date: Date;
  events: EventItem[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onEventClick?: (event: EventItem) => void;
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
      <div className="mt-1 space-y-1">
        {events.map((event) => {
          const isAllDay = 
            format(event.startDate, 'HH:mm') === '00:00' && 
            format(event.endDate, 'HH:mm') === '23:59';

          return (
            <CalendarScheduleInfo
              key={event.id}
              schedule={{
                id: event.id,
                title: event.title,
                startTime: isAllDay ? '' : format(event.startDate, 'HH:mm'),
                endTime: isAllDay ? '' : format(event.endDate, 'HH:mm'),
                color: event.color,
                isAllDay,
              }}
              onClick={() => onEventClick?.(event)}
            />
          );
        })}
      </div>
    </div>
  );
};
