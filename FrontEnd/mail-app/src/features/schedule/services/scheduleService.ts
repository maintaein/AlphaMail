import { Schedule, CreateScheduleRequest, UpdateScheduleRequest, ScheduleResponse } from '../types/schedule';
import axios from 'axios';

const baseUrl = 'https://65cbb986-d62d-4747-8554-6b4f334092a8.mock.pstmn.io';

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
    
    return axios.get<ScheduleResponse>(`${baseUrl}/api/schedules`, {
      params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
    }).then(response => {
      console.log('scheduleService - API 응답:', response.data);
      
      // API 응답을 Schedule[] 타입으로 변환
      const schedules: Schedule[] = response.data.items.map((item: ScheduleResponse['items'][0]) => {
        // UTC 시간을 로컬 시간으로 변환
        const startDate = new Date(item.start_time);
        const endDate = new Date(item.end_time);
        
        // 로컬 날짜를 YYYY-MM-DD 형식으로 변환
        const startDateKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        
        return {
          id: crypto.randomUUID(),
          title: item.name,
          startDate: startDateKey,
          endDate: endDate.toISOString(),
          description: item.description,
          userId: 'current-user-id',
          isCompleted: item.is_done
        };
      });
      
      return { data: schedules };
    }).catch(error => {
      console.error('scheduleService - API 오류:', error);
      throw error;
    });
  },

  getSchedulesForWeek: (selectedDate: Date) => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // 일요일로 설정
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 토요일로 설정
    endOfWeek.setHours(23, 59, 59, 999);

    return axios.get<ScheduleResponse>(`${baseUrl}/api/schedules`, {
      params: { startDate: startOfWeek.toISOString(), endDate: endOfWeek.toISOString() }
    }).then(response => {
      console.log('주간 일정 응답:', response.data);
      
      // API 응답을 Schedule[] 타입으로 변환
      const schedules: Schedule[] = response.data.items.map((item: ScheduleResponse['items'][0]) => ({
        id: crypto.randomUUID(), // 임시 ID 생성
        title: item.name,
        startDate: item.start_time,
        endDate: item.end_time,
        description: item.description,
        userId: 'current-user-id', // 임시 사용자 ID
        isCompleted: item.is_done
      }));
      
      return { data: schedules };
    });
  },

  // 스케줄 생성
  createSchedule: async (schedule: CreateScheduleRequest): Promise<Schedule> => {
    const response = await axios.post(`${baseUrl}/api/schedules`, schedule);
    return response.data;
  },

  // 스케줄 수정
  updateSchedule: async (schedule: UpdateScheduleRequest): Promise<Schedule> => {
    const response = await axios.put(`${baseUrl}/api/schedules/${schedule.id}`, schedule);
    return response.data;
  },

  // 스케줄 삭제
  deleteSchedule: async (id: string): Promise<void> => {
    await axios.delete(`${baseUrl}/api/schedules/${id}`);
  }
}; 