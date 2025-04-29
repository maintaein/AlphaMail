import { Schedule, ScheduleResponse, CreateScheduleRequest, UpdateScheduleRequest } from '../types/schedule';
import axios from 'axios';

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
};

export const scheduleService = {
  // 스케줄 목록 조회
  getSchedules: async (): Promise<ScheduleResponse> => {
    const response = await axios.get(`${getBaseUrl()}/api/schedules`);
    return response.data;
  },

  // 스케줄 상세 조회
  getScheduleById: async (id: string): Promise<Schedule> => {
    const response = await axios.get(`${getBaseUrl()}/api/schedules/${id}`);
    return response.data;
  },

  // 스케줄 생성
  createSchedule: async (schedule: CreateScheduleRequest): Promise<Schedule> => {
    const response = await axios.post(`${getBaseUrl()}/api/schedules`, schedule);
    return response.data;
  },

  // 스케줄 수정
  updateSchedule: async (schedule: UpdateScheduleRequest): Promise<Schedule> => {
    const response = await axios.put(`${getBaseUrl()}/api/schedules/${schedule.id}`, schedule);
    return response.data;
  },

  // 스케줄 삭제
  deleteSchedule: async (id: string): Promise<void> => {
    await axios.delete(`${getBaseUrl()}/api/schedules/${id}`);
  }
}; 