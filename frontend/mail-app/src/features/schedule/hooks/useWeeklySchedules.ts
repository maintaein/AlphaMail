import { useQuery } from '@tanstack/react-query';
import { scheduleService } from '../services/scheduleService';
import { Schedule } from '../types/schedule';

export const useWeeklySchedules = (selectedDate: Date) => {
  return useQuery<Schedule[]>({
    queryKey: ['schedules', 'week', selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()],
    queryFn: () => scheduleService.getSchedulesForWeek(selectedDate).then(res => res.data),
    placeholderData: (previousData) => previousData,
  });
};
