import React from 'react';
import { Schedule } from '@/features/schedule/types/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleService } from '@/features/schedule/services/scheduleService';

interface CalendarScheduleInfoProps {
  schedule: Schedule;
}

export const CalendarScheduleInfo: React.FC<CalendarScheduleInfoProps> = ({ 
  schedule
}) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, isCompleted }: { id: string; isCompleted: boolean }) => 
      scheduleService.patchSchedule(id, isCompleted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    }
  });

  const handleCheckboxChange = () => {
    updateMutation.mutate({ 
      id: schedule.id, 
      isCompleted: !schedule.isCompleted 
    });
  };

  return (
    <div
      className={`
        flex items-center p-2 mb-1 rounded text-sm
        ${schedule.color ? `bg-${schedule.color}-100 text-${schedule.color}-800` : 'bg-blue-100 text-blue-800'}
        hover:opacity-80
        ${schedule.isCompleted ? 'opacity-50' : ''}
      `}
    >
      <input
        type="checkbox"
        checked={schedule.isCompleted}
        onChange={handleCheckboxChange}
        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        disabled={updateMutation.isPending}
      />
      <div className="flex-1">
        {schedule.isAllDay ? (
          <span className="font-medium">{schedule.title}</span>
        ) : (
          <>
            <span className="text-xs">
              {new Date(schedule.startDate).toLocaleTimeString()} - {new Date(schedule.endDate).toLocaleTimeString()}
            </span>
            <span className="font-medium ml-1">{schedule.title}</span>
          </>
        )}
      </div>
    </div>
  );
};
