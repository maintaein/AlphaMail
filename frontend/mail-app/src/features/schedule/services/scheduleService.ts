import { Schedule, CreateScheduleRequest, UpdateScheduleRequest, ScheduleResponse } from '../types/schedule';
import { api } from '@/shared/lib/axiosInstance';
import { AxiosResponse } from 'axios';

export const scheduleService = {
  getSchedulesForMonthRange: (selectedMonth: Date) => {
    console.log('scheduleService - 월간 일정 요청:', {
      year: selectedMonth.getFullYear(),
      month: selectedMonth.getMonth()
    });
    
    const startDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
    const endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 2, 0);
    
    console.log('scheduleService - 요청 기간:', {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
    
    return api.get<ScheduleResponse>('/api/schedules', {
      params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
    }).then((response: AxiosResponse<ScheduleResponse>) => {
      console.log('scheduleService - API 응답:', response.data);
      
      // API 응답을 Schedule[] 타입으로 변환
      const schedules: Schedule[] = response.data.items.map((item: ScheduleResponse['items'][0]) => {
        console.log(item.start_time);
        console.log(item.end_time);
        return {
          id: crypto.randomUUID(),
          title: item.name,
          startDate: new Date(item.start_time),
          endDate: new Date(item.end_time),
          description: item.description,
          userId: 'current-user-id',
          isCompleted: item.is_done
        };
      });
      
      return { data: schedules };
    }).catch((error: Error) => {
      console.error('scheduleService - API 오류:', error);
      throw error;
    });
  },

  getSchedulesForWeek: (selectedDate: Date) => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return api.get<ScheduleResponse>('/api/schedules', {
      params: { startDate: startOfWeek.toISOString(), endDate: endOfWeek.toISOString() }
    }).then((response: AxiosResponse<ScheduleResponse>) => {
      console.log('주간 일정 응답:', response.data);
      
      const schedules: Schedule[] = response.data.items.map((item: ScheduleResponse['items'][0]) => ({
        id: crypto.randomUUID(),
        title: item.name,
        startDate: new Date(item.start_time),
        endDate: new Date(item.end_time),
        description: item.description,
        userId: 'current-user-id',
        isCompleted: item.is_done
      }));
      
      return { data: schedules };
    });
  },

  getSchedulesForSearch: (query: string) => {
    return api.get<ScheduleResponse>('/api/schedules', {
      params: { query }
    }).then((response: AxiosResponse<ScheduleResponse>) => {
      const schedules: Schedule[] = response.data.items.map((item: ScheduleResponse['items'][0]) => ({
        id: crypto.randomUUID(),
        title: item.name,
        startDate: new Date(item.start_time),
        endDate: new Date(item.end_time),
        description: item.description,
        userId: 'current-user-id',
        isCompleted: item.is_done
      }));
      
      return { data: schedules };
    });
  },

  // 스케줄 생성
  createSchedule: async (schedule: CreateScheduleRequest): Promise<Schedule> => {
    const requestData = {
      name: schedule.title,
      start_time: schedule.startDate.toISOString(),
      end_time: schedule.endDate.toISOString(),
      description: schedule.description
    };

    const response = await api.post('/api/schedules', requestData);
    
    // API 응답을 Schedule 타입으로 변환
    return {
      id: response.data.id,
      title: response.data.name,
      startDate: new Date(response.data.start_time),
      endDate: new Date(response.data.end_time),
      description: response.data.description,
      userId: 'current-user-id'
    };
  },

  // 스케줄 수정
  updateSchedule: async (schedule: UpdateScheduleRequest): Promise<Schedule> => {
    const requestData = {
      name: schedule.title,
      start_time: schedule.startDate.toISOString(),
      end_time: schedule.endDate.toISOString(),
      description: schedule.description
    };

    const response = await api.put(`/api/schedules/${schedule.id}`, requestData);
    
    // API 응답을 Schedule 타입으로 변환
    return {
      id: response.data.id,
      title: response.data.name,
      startDate: new Date(response.data.start_time),
      endDate: new Date(response.data.end_time),
      description: response.data.description,
      userId: 'current-user-id'
    };
  },

  // 스케줄 삭제
  deleteSchedule: async (id: string) => {
    return api.delete(`/api/schedules/${id}`).then((response: AxiosResponse) => {
      return response.data;
    });
  },

  // 스케줄 완료 변경
  patchSchedule: async (id: string, isCompleted: boolean): Promise<void> => {
    await api.patch(`/api/schedules/${id}`, { is_done: isCompleted });
  }
}; 