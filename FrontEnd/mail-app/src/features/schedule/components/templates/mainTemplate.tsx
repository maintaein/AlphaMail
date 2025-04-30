import React from 'react';
import { CalendarGrid } from '../organisms/calendarGrid';
import { ScheduleManagerGrid } from '../organisms/scheduleManagerGrid';
import { ScheduleDetailTemplate } from './scheduleDetailTemplate';
import { useModalStore, useModalKeyboard } from '@/shared/stores/useModalStore';
import { useScheduleStore } from '../../stores/useScheduleStore';
import { Schedule } from '../../types/schedule';
import { useCalendarSchedules } from '../../hooks/useCalendarSchedules';
import { useWeeklySchedules } from '../../hooks/useWeeklySchedules';

export const MainTemplate: React.FC = () => {
  const { isOpen, isAnimating, openModal, closeModal } = useModalStore();
  const { selectedSchedule, setSelectedSchedule } = useScheduleStore();
  useModalKeyboard();

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedWeekDate] = React.useState(new Date());

  const { data: calendarSchedules, isLoading: isCalendarLoading, isError, error } = useCalendarSchedules(currentDate);
  const { data: weeklySchedules, isLoading: isWeeklyLoading } = useWeeklySchedules(selectedWeekDate);

  React.useEffect(() => {
    console.log('React Query 상태:', {
      isLoading: isCalendarLoading,
      isError,
      error,
      data: calendarSchedules,
      queryKey: ['schedules', 'calendar', currentDate.getFullYear(), currentDate.getMonth()]
    });
  }, [calendarSchedules, isCalendarLoading, isError, error, currentDate]);

  const eventsMap = React.useMemo(() => {
    if (!calendarSchedules) {
      console.log('calendarSchedules가 없습니다');
      return {};
    }
    
    console.log('calendarSchedules 데이터:', calendarSchedules);
    
    const map = (calendarSchedules as Schedule[]).reduce((acc: Record<string, Schedule[]>, schedule: Schedule) => {
      const dateKey = new Date(schedule.startDate).toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(schedule);
      return acc;
    }, {});
    
    console.log('생성된 eventsMap:', map);
    return map;
  }, [calendarSchedules]);

  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month));
  };

  const handleEventClick = (event: Schedule) => {
    setSelectedSchedule(event);
    openModal();
  };

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    openModal();
  };

  if (isCalendarLoading || isWeeklyLoading) return <div>로딩 중...</div>;

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">캘린더</h1>
        <button
          onClick={handleAddSchedule}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          일정 추가
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <CalendarGrid 
            year={currentDate.getFullYear()}
            month={currentDate.getMonth()}
            eventsMap={eventsMap}
            onEventClick={handleEventClick}
            onMonthChange={handleMonthChange}
          />
        </div>
        <div className="w-80">
          <ScheduleManagerGrid
            schedules={weeklySchedules || []}
          />
        </div>
      </div>

      <ScheduleDetailTemplate
        isEdit={!!selectedSchedule}
        initialData={selectedSchedule || undefined}
        onClose={() => {
          closeModal();
          setSelectedSchedule(null);
        }}
        isOpen={isOpen}
        isAnimating={isAnimating}
      />
    </div>
  );
};
