import { axiosInstance } from '@/shared/lib/axiosInstance';

export interface Schedule {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  color?: string;
}

export const scheduleApi = {
  // 특정 월의 스케줄 조회
  getSchedulesByMonth: async (year: number, month: number) => {
    const response = await axiosInstance.get<Schedule[]>(`/api/schedules`, {
      params: { year, month }
    });
    return response.data;
  },

  // 스케줄 생성
  createSchedule: async (schedule: Omit<Schedule, 'id'>) => {
    const response = await axiosInstance.post<Schedule>('/api/schedules', schedule);
    return response.data;
  },

  // 스케줄 수정
  updateSchedule: async (id: string, schedule: Partial<Schedule>) => {
    const response = await axiosInstance.put<Schedule>(`/api/schedules/${id}`, schedule);
    return response.data;
  },

  // 스케줄 삭제
  deleteSchedule: async (id: string) => {
    await axiosInstance.delete(`/api/schedules/${id}`);
  }
}; 