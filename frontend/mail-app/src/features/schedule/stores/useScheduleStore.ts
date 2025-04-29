import { create } from 'zustand';
import { Schedule } from '../types/schedule';

interface ScheduleStore {
  selectedSchedule: Schedule | null;
  setSelectedSchedule: (schedule: Schedule | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  selectedSchedule: null,
  setSelectedSchedule: (schedule) => set({ selectedSchedule: schedule }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
