import React from 'react';
import { Schedule } from '@/features/schedule/types/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleService } from '@/features/schedule/services/scheduleService';
import { format } from 'date-fns';

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
      isCompleted: !schedule.is_done 
    });
  };

  return (
    <div
      className={`
        flex items-center p-2 mb-1 rounded text-sm
        bg-blue-100 text-blue-800
        hover:opacity-80
        ${schedule.is_done ? 'opacity-50' : ''}
      `}
    >
      <input
        type="checkbox"
        checked={schedule.is_done}
        onChange={handleCheckboxChange}
        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        disabled={updateMutation.isPending}
      />
      <div className="flex-1">
        <span className="text-xs">
          {format(new Date(schedule.start_time), 'MM/dd HH:mm')}
        </span>
        <span className="font-medium ml-1">{schedule.name}</span>
      </div>
    </div>
  );
};
