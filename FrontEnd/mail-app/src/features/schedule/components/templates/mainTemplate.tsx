import React from 'react';
import { useSchedule } from '../../hooks/useSchedule';
import { CalendarGrid } from '../organisms/calendarGrid';
import { ScheduleDetailTemplate } from './scheduleDetailTemplate';
import { useModalStore, useModalKeyboard } from '@/shared/stores/useModalStore';
import { Schedule } from '../../types/schedule';

export const MainTemplate: React.FC = () => {
  const { 
    isLoading, 
    error,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    isCreating,
    isUpdating,
    isDeleting
  } = useSchedule();

  const { isOpen, isAnimating, openModal, closeModal } = useModalStore();
  useModalKeyboard(); // ESC 키 처리 추가

  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule | null>(null);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const handleEventClick = (event: Schedule) => {
    setSelectedSchedule(event);
    openModal();
  };

  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    openModal();
  };

  const handleSaveSchedule = (scheduleData: Omit<Schedule, 'id'>) => {
    if (selectedSchedule) {
      updateSchedule({ id: selectedSchedule.id, ...scheduleData });
    } else {
      createSchedule(scheduleData);
    }
    closeModal();
  };

  const handleDeleteSchedule = () => {
    if (selectedSchedule) {
      deleteSchedule(selectedSchedule.id);
      closeModal();
    }
  };

  const handleMonthChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month));
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

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
      <div className="max-w-4xl mx-auto">
        <CalendarGrid 
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          onEventClick={handleEventClick}
          onMonthChange={handleMonthChange}
        />
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
        isSubmitting={isCreating || isUpdating || isDeleting}
      />
    </div>
  );
};
