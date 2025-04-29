import { Schedule } from "../types/schedule";

const BASE_URL = 'http://localhost:8080';

export const getSchedules = async (): Promise<Schedule[]> => {
  const response = await fetch(`${BASE_URL}/schedules`);
  return response.json();
}