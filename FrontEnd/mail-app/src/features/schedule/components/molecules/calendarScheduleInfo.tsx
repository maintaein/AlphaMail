import React from 'react';

interface ScheduleInfo {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
  isAllDay?: boolean;
}

interface CalendarScheduleInfoProps {
  schedule: ScheduleInfo;
  onClick?: (schedule: ScheduleInfo) => void;
}

export const CalendarScheduleInfo: React.FC<CalendarScheduleInfoProps> = ({ 
  schedule,
  onClick 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(schedule);
    }
  };

  return (
    <div
      className={`
        p-1 mb-1 rounded text-sm cursor-pointer
        ${schedule.color ? `bg-${schedule.color}-100 text-${schedule.color}-800` : 'bg-blue-100 text-blue-800'}
        hover:opacity-80
      `}
      onClick={handleClick}
    >
      {schedule.isAllDay ? (
        <span className="font-medium">{schedule.title}</span>
      ) : (
        <>
          <span className="text-xs">
            {schedule.startTime} - {schedule.endTime}
          </span>
          <span className="font-medium ml-1">{schedule.title}</span>
        </>
      )}
    </div>
  );
};
