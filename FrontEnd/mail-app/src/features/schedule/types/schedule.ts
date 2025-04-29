export interface Schedule {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  color?: string;
  userId: string;
  isAllDay?: boolean;
}

export interface ScheduleResponse {
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