import React from 'react';
import { CalendarScheduleInfo } from '../molecules/calendarScheduleInfo';

interface Schedule {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
  isAllDay?: boolean;
  isCompleted?: boolean;
}

interface ScheduleManagerGridProps {
  schedules: Schedule[];
  onToggleComplete: (schedule: Schedule) => void;
  onScheduleClick: (schedule: Schedule) => void;
}

export const ScheduleManagerGrid: React.FC<ScheduleManagerGridProps> = ({
  schedules,
  onToggleComplete,
  onScheduleClick,
}) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const completedSchedules = schedules.filter(
    (schedule) => schedule.isCompleted && new Date(schedule.startTime) >= startOfWeek && new Date(schedule.startTime) <= endOfWeek
  );

  const remainingSchedules = schedules.filter(
    (schedule) => !schedule.isCompleted && new Date(schedule.startTime) >= startOfWeek && new Date(schedule.startTime) <= endOfWeek
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">이번주 완료된 일정</h3>
        {completedSchedules.length === 0 ? (
          <p className="text-gray-500 text-sm">완료된 일정이 없습니다.</p>
        ) : (
          completedSchedules.map((schedule) => (
            <CalendarScheduleInfo
              key={schedule.id}
              schedule={schedule}
              onToggleComplete={onToggleComplete}
              onClick={onScheduleClick}
            />
          ))
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">이번주 남은 일정</h3>
        {remainingSchedules.length === 0 ? (
          <p className="text-gray-500 text-sm">남은 일정이 없습니다.</p>
        ) : (
          remainingSchedules.map((schedule) => (
            <CalendarScheduleInfo
              key={schedule.id}
              schedule={schedule}
              onToggleComplete={onToggleComplete}
              onClick={onScheduleClick}
            />
          ))
        )}
      </div>
    </div>
  );
};
