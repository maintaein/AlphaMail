import React from 'react';
import { CalendarGrid } from '../organisms/calendarGrid';
import { ScheduleManagerGrid } from '../organisms/scheduleManagerGrid';
import { ScheduleDetailTemplate } from './scheduleDetailTemplate';
import { useModalStore, useModalKeyboard } from '@/shared/stores/useModalStore';
import { useScheduleStore } from '../../stores/useScheduleStore';
import { Schedule } from '../../types/schedule';
import { useCalendarSchedules } from '../../hooks/useCalendarSchedules';
import { useWeeklySchedules } from '../../hooks/useWeeklySchedules';
import { scheduleService } from '../../services/scheduleService';
import { useQueryClient } from '@tanstack/react-query';

export const MainTemplate: React.FC = () => {
  const queryClient = useQueryClient();
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

  const handleSaveSchedule = async (scheduleData: Omit<Schedule, 'id'>) => {
    try {
      if (selectedSchedule) {
        await scheduleService.updateSchedule({ id: selectedSchedule.id, ...scheduleData });
      } else {
        await scheduleService.createSchedule(scheduleData);
      }

      await queryClient.invalidateQueries({ queryKey: ['schedules', 'calendar', currentDate.getFullYear(), currentDate.getMonth()] });
      await queryClient.invalidateQueries({ queryKey: ['schedules', 'week', selectedWeekDate.getFullYear(), selectedWeekDate.getMonth(), selectedWeekDate.getDate()] });
      
      closeModal();
    } catch (error) {
      console.error('일정 저장 중 오류 발생:', error);
    }
  };

  const handleDeleteSchedule = async () => {
    if (selectedSchedule) {
      try {
        await scheduleService.deleteSchedule(selectedSchedule.id);

        await queryClient.invalidateQueries({ queryKey: ['schedules', 'calendar', currentDate.getFullYear(), currentDate.getMonth()] });
        await queryClient.invalidateQueries({ queryKey: ['schedules', 'week', selectedWeekDate.getFullYear(), selectedWeekDate.getMonth(), selectedWeekDate.getDate()] });

        closeModal();
      } catch (error) {
        console.error('일정 삭제 중 오류 발생:', error);
      }
    }
  };

  const handleToggleComplete = async (schedule: Schedule) => {
    try {
      await scheduleService.updateSchedule({
        ...schedule,
        isCompleted: !schedule.isCompleted
      });

      await queryClient.invalidateQueries({ queryKey: ['schedules', 'calendar', currentDate.getFullYear(), currentDate.getMonth()] });
      await queryClient.invalidateQueries({ queryKey: ['schedules', 'week', selectedWeekDate.getFullYear(), selectedWeekDate.getMonth(), selectedWeekDate.getDate()] });
    } catch (error) {
      console.error('일정 상태 변경 중 오류 발생:', error);
    }
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
            onToggleComplete={handleToggleComplete}
            onScheduleClick={handleEventClick}
          />
        </div>
      </div>

      <ScheduleDetailTemplate
        isEdit={!!selectedSchedule}
        initialData={selectedSchedule || undefined}
        onSave={handleSaveSchedule}
        onDelete={handleDeleteSchedule}
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
