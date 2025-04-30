export interface Schedule {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  color?: string;
  userId: string;
  isCompleted?: boolean;
  isAllDay?: boolean;
}

export interface ScheduleResponse {
  items: Array<{
    name: string;
    created_at: string;
    start_time: string;
    end_time: string;
    is_done: boolean;
    description: string;
  }>;
  total_count: number;
  page_count: number;
  current_page: number;
}

export type CreateScheduleRequest = Omit<Schedule, 'id'>;
export type UpdateScheduleRequest = Schedule; 
