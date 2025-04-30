import React from 'react';
import { CalendarScheduleInfo } from '../molecules/calendarScheduleInfo';
import { Schedule } from '@/features/schedule/types/schedule';

interface ScheduleManagerGridProps {
  schedules: Schedule[];
}

export const ScheduleManagerGrid: React.FC<ScheduleManagerGridProps> = ({
  schedules,
}) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const completedSchedules = schedules.filter(
    (schedule) => schedule.isCompleted && new Date(schedule.startDate) >= startOfWeek && new Date(schedule.startDate) <= endOfWeek
  );

  const remainingSchedules = schedules.filter(
    (schedule) => !schedule.isCompleted && new Date(schedule.startDate) >= startOfWeek && new Date(schedule.startDate) <= endOfWeek
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
            />
          ))
        )}
      </div>
    </div>
  );
};
