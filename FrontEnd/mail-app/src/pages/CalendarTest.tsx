import React, { useState } from 'react';
import { CalendarGrid } from '@/features/schedule/components/organisms/calendarGrid';
import { ScheduleDetailTemplate } from '@/features/schedule/components/templates/scheduleDetailTemplate';
import { useModal } from '@/hooks/useModal';

interface Schedule {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  color?: string;
}

const CalendarTest: React.FC = () => {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [schedules, setSchedules] = useState<Record<string, Schedule[]>>({});
  
  const { isOpen, isAnimating, openModal, closeModal } = useModal();

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const handleEventClick = (event: any) => {
    setSelectedSchedule(event);
    openModal();
  };

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    openModal();
  };

  const handleSaveSchedule = (scheduleData: any) => {
    const schedule: Schedule = {
      id: selectedSchedule?.id || Date.now().toString(),
      ...scheduleData,
    };

    const startDate = new Date(schedule.startDate);
    const endDate = new Date(schedule.endDate);
    const dateKey = startDate.toISOString().split('T')[0];

    setSchedules((prev) => {
      const updatedSchedules = { ...prev };
      if (selectedSchedule) {
        // 기존 일정 제거
        Object.keys(updatedSchedules).forEach((key) => {
          updatedSchedules[key] = updatedSchedules[key].filter(
            (s) => s.id !== selectedSchedule.id
          );
        });
      }

      // 새 일정 추가
      if (!updatedSchedules[dateKey]) {
        updatedSchedules[dateKey] = [];
      }
      updatedSchedules[dateKey].push(schedule);

      return updatedSchedules;
    });

    closeModal();
    setSelectedSchedule(null);
  };

  const handleCloseModal = () => {
    closeModal();
    setSelectedSchedule(null);
  };

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">캘린더 테스트</h1>
        <button
          onClick={handleAddSchedule}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          일정 추가
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        <CalendarGrid 
          year={year} 
          month={month} 
          eventsMap={schedules} 
          onMonthChange={handleMonthChange}
          onEventClick={handleEventClick}
        />
      </div>

      <ScheduleDetailTemplate
        isEdit={!!selectedSchedule}
        initialData={selectedSchedule || undefined}
        onSave={handleSaveSchedule}
        onClose={handleCloseModal}
        isOpen={isOpen}
        isAnimating={isAnimating}
      />
    </div>
  );
};

export default CalendarTest; 