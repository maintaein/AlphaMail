import React from 'react';

interface ScheduleInfo {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
  isAllDay?: boolean;
  isCompleted?: boolean;
}

interface CalendarScheduleInfoProps {
  schedule: ScheduleInfo;
  onToggleComplete?: (schedule: ScheduleInfo) => void;
  onClick?: (schedule: ScheduleInfo) => void;
}

export const CalendarScheduleInfo: React.FC<CalendarScheduleInfoProps> = ({ 
  schedule,
  onToggleComplete,
  onClick 
}) => {
  const handleCheckboxChange = () => {
    if (onToggleComplete) {
      onToggleComplete(schedule);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(schedule);
    }
  };

  return (
    <div
      className={`
        flex items-center p-2 mb-1 rounded text-sm cursor-pointer
        ${schedule.color ? `bg-${schedule.color}-100 text-${schedule.color}-800` : 'bg-blue-100 text-blue-800'}
        hover:opacity-80
        ${schedule.isCompleted ? 'opacity-50' : ''}
      `}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={schedule.isCompleted}
        onChange={handleCheckboxChange}
        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="flex-1">
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
    </div>
  );
};
