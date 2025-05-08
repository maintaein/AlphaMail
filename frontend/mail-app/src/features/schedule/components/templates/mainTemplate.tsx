import React from 'react';
import { CalendarGrid } from '../organisms/calendarGrid';
import { ScheduleManagerGrid } from '../organisms/scheduleManagerGrid';
import { ScheduleDetailTemplate } from './scheduleDetailTemplate';
import { useModalStore, useModalKeyboard } from '@/shared/stores/useModalStore';
import { useScheduleStore } from '../../stores/useScheduleStore';
import { Schedule } from '../../types/schedule';
import { useCalendarSchedules } from '../../hooks/useCalendarSchedules';
import { useWeeklySchedules } from '../../hooks/useWeeklySchedules';
import { addDays, format, isBefore, startOfDay } from 'date-fns';

export const MainTemplate: React.FC = () => {
  const { isOpen, isAnimating, openModal, closeModal } = useModalStore();
  const { setSelectedSchedule, resetSchedule, setIsEdit } = useScheduleStore();
  useModalKeyboard();

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedWeekDate] = React.useState(new Date());

  const { data: calendarSchedules, isLoading: isCalendarLoading, isError, error } = useCalendarSchedules(currentDate);
  const { data: weeklySchedules, isLoading: isWeeklyLoading } = useWeeklySchedules(selectedWeekDate);

  React.useEffect(() => {
    console.log('React Query 상태:', {
      calendarSchedules,
      weeklySchedules,
      isCalendarLoading,
      isWeeklyLoading,
      isError,
      error
    });
  }, [calendarSchedules, weeklySchedules, isCalendarLoading, isWeeklyLoading, isError, error]);

  const eventsMap = React.useMemo(() => {
    if (!calendarSchedules?.data) {
      return {};
    }

    const map: Record<string, Schedule[]> = {};
    const schedulePositions = new Map<string, number>(); // 일정의 위치(순서)를 저장

    // 모든 일정을 시작일 기준으로 정렬
    const sortedSchedules = [...calendarSchedules.data].sort((a, b) => {
      return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
    });

    // 각 일정에 대해 시작일부터 종료일까지의 모든 날짜에 일정 추가
    sortedSchedules.forEach((schedule) => {
      let currentDate = startOfDay(new Date(schedule.start_time));
      const endDate = startOfDay(new Date(schedule.end_time));

      // 사용 가능한 위치 찾기
      let position = 0;
      while (true) {
        let isPositionAvailable = true;
        for (let date = currentDate; date <= endDate; date = addDays(date, 1)) {
          const dateKey = format(date, 'yyyy-MM-dd');
          if (map[dateKey] && map[dateKey][position]) {
            isPositionAvailable = false;
            break;
          }
        }
        if (isPositionAvailable) break;
        position++;
      }

      schedulePositions.set(schedule.id, position);

      while (isBefore(currentDate, endDate) || currentDate.getTime() === endDate.getTime()) {
        const dateKey = format(currentDate, 'yyyy-MM-dd');
        if (!map[dateKey]) {
          map[dateKey] = [];
        }

        // 해당 일정의 위치에 맞게 빈 슬롯 채우기
        while (map[dateKey].length <= position) {
          map[dateKey].push(null as any);
        }
        map[dateKey][position] = schedule;

        currentDate = addDays(currentDate, 1);
      }
    });

    return map;
  }, [calendarSchedules]);

  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month));
  };

  const handleEventClick = (event: Schedule) => {
    setSelectedSchedule(event);
    setIsEdit(true);
    openModal();
  };

  const handleAddSchedule = () => {
    resetSchedule();
    setTimeout(() => {
      openModal();
    }, 0);
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
            schedules={weeklySchedules?.data || []}
          />
        </div>
      </div>

      <ScheduleDetailTemplate
        onClose={closeModal}
        isOpen={isOpen}
        isAnimating={isAnimating}
      />
    </div>
  );
};
