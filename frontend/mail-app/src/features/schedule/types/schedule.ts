export interface Schedule {
  id: string;
  title: string;
<<<<<<< HEAD
  startDate: Date;
  endDate: Date;
  description: string;
  color?: string;
  userId: string;
  isCompleted?: boolean;
=======
  startDate: string;
  endDate: string;
  description: string;
  color?: string;
  userId: string;
>>>>>>> 47954d76e5867bc2c31c520dfa75f4f0a6d75c79
  isAllDay?: boolean;
}

export interface ScheduleResponse {
<<<<<<< HEAD
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
=======
  data: Schedule[];
  message: string;
  status: number;
}

export interface CreateScheduleRequest {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  color?: string;
}

export interface UpdateScheduleRequest extends CreateScheduleRequest {
  id: string;
} 
>>>>>>> 47954d76e5867bc2c31c520dfa75f4f0a6d75c79
