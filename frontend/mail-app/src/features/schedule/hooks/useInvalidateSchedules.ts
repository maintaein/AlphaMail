import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateSchedules = (selectedMonth: Date, selectedDate: Date) => {
  const queryClient = useQueryClient();

  const invalidateSchedules = async () => {
    await queryClient.invalidateQueries({ queryKey: ['schedules', 'calendar', selectedMonth.getFullYear(), selectedMonth.getMonth()] });
    await queryClient.invalidateQueries({ queryKey: ['schedules', 'weekly', selectedDate.toISOString()] });
  };

  return { invalidateSchedules };
};
