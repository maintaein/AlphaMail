import { useQuery } from '@tanstack/react-query';
import { scheduleService } from '@/features/schedule/services/scheduleService';
import { Schedule } from '@/features/schedule/types/schedule';

export const useTodaySchedules = () => {
  // 오늘 날짜의 시작과 끝 설정
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return useQuery<{ data: Schedule[] }>({
    queryKey: ['schedules', 'today', today.toISOString().split('T')[0]],
    queryFn: async () => {
      // 오늘 하루의 일정만 가져오기
      const startOfDay = new Date(today);
      const endOfDay = new Date(tomorrow);
      
      // 커스텀 함수 사용하여 오늘의 일정 가져오기
      return await scheduleService.getSchedulesForDay(startOfDay, endOfDay);
    },
    staleTime: 1000 * 60, // 1분으로 줄임
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};