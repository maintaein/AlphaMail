import React from 'react';
import { Schedule } from '@/features/schedule/types/schedule';
import { format, isSameDay, startOfDay } from 'date-fns';

interface CalendarDayCellProps {
  date: Date;
  events: (Schedule | null)[];
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

  const getEventStyle = (event: Schedule) => {
    if (!event) return '';

    const currentDate = startOfDay(date);
    const startDate = startOfDay(new Date(event.start_time));
    const endDate = startOfDay(new Date(event.end_time));

    const isStart = isSameDay(currentDate, startDate);
    const isEnd = isSameDay(currentDate, endDate);

    let className = 'text-sm text-white cursor-pointer p-1 overflow-hidden ';

    if (isStart && isEnd) {
      className += 'bg-blue-500 rounded mx-1';
    } else if (isStart) {
      className += 'bg-blue-500 rounded-l ml-1';
    } else if (isEnd) {
      className += 'bg-blue-500 rounded-r mr-1';
    } else {
      className += 'bg-blue-500';
    }

    return className;
  };

  return (
    <div
      className={`min-h-[100px] ${
        !isCurrentMonth ? 'text-gray-400 bg-gray-50' : 'bg-white'
      } ${isToday ? 'bg-blue-100' : ''}`}
    >
      <div className={`text-right font-medium p-2 ${isToday ? 'text-blue-600 font-bold' : ''}`}>
        {date.getDate()}
      </div>
      <div className="space-y-0.5">
        {events.map((event, index) => {
          if (!event) return <div key={index} className="h-[28px]" />; // null 이벤트의 높이를 실제 이벤트와 동일하게 조정

          const isStart = isSameDay(date, new Date(event.start_time));
          
          return (
            <div
              key={`${event.id}-${index}`}
              className={getEventStyle(event)}
              onClick={() => event && onEventClick?.(event)}
            >
              {isStart ? (
                <div className="truncate">
                  {formatTime(event.start_time.toISOString())} {event.name}
                </div>
              ) : (
                <div className="invisible">placeholder</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
