// 일정 타입
export interface Schedule {
  id: string;
  name: string;
  created_at: Date;
  start_time: Date;
  end_time: Date;
  is_done: boolean;
  description: string;
}

// API 응답 타입
export interface ScheduleResponse {
  schedules: Array<{
    id: number;
    name: string;
    createdAt: string;
    startTime: string;
    endTime: string;
    isDone: boolean;
    description: string;
  }>;
  total_count: number;
  page_count: number;
  current_page: number;
}

export type CreateScheduleRequest = Omit<Schedule, 'id'>;
export type UpdateScheduleRequest = Schedule; 
