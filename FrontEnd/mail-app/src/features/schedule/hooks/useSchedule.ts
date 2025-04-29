import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleService } from '../services/scheduleService';
import { CreateScheduleRequest, UpdateScheduleRequest } from '../types/schedule';

export const useSchedule = () => {
  const queryClient = useQueryClient();

  // 스케줄 목록 조회
  const { data: schedules, isLoading, error } = useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const response = await scheduleService.getSchedules();
      return response.data;
    }
  });

  // 스케줄 생성
  const createScheduleMutation = useMutation({
    mutationFn: (newSchedule: CreateScheduleRequest) => 
      scheduleService.createSchedule(newSchedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    }
  });

  // 스케줄 수정
  const updateScheduleMutation = useMutation({
    mutationFn: (schedule: UpdateScheduleRequest) => 
      scheduleService.updateSchedule(schedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    }
  });

  // 스케줄 삭제
  const deleteScheduleMutation = useMutation({
    mutationFn: (id: string) => scheduleService.deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    }
  });

  return {
    schedules,
    isLoading,
    error,
    createSchedule: createScheduleMutation.mutate,
    updateSchedule: updateScheduleMutation.mutate,
    deleteSchedule: deleteScheduleMutation.mutate,
    isCreating: createScheduleMutation.isPending,
    isUpdating: updateScheduleMutation.isPending,
    isDeleting: deleteScheduleMutation.isPending
  };
}; 