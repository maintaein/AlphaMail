import { useQuery } from '@tanstack/react-query';
import { scheduleService } from '../services/scheduleService';
import { useScheduleSearchStore } from '@/shared/stores/useSearchBar';

export const useScheduleSearch = () => {
  const { searchKeyword, currentPage, pageSize, sortOption } = useScheduleSearchStore();

  return useQuery({
    queryKey: ['schedules', 'search', searchKeyword, currentPage, pageSize, sortOption],
    queryFn: () => scheduleService.getSchedulesForSearch(searchKeyword, currentPage, pageSize, sortOption),
    enabled: searchKeyword.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5분
  });
};