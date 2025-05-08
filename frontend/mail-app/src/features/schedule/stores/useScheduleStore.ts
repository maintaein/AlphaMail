import { create } from 'zustand';
import { Schedule } from '../types/schedule';

interface ScheduleStore {
  selectedSchedule: Schedule | null;
  setSelectedSchedule: (schedule: Schedule | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  resetSchedule: () => void;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}

const initialSchedule: Schedule = {
  id: '',
  name: '',
  start_time: new Date(),
  end_time: new Date(),
  description: '',
  is_done: false,
  created_at: new Date()
};

export const useScheduleStore = create<ScheduleStore>((set) => ({
  selectedSchedule: null,
  setSelectedSchedule: (schedule) => set({ selectedSchedule: schedule }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  resetSchedule: () => set({
    selectedSchedule: initialSchedule,
    isEdit: false
  }),
  isEdit: false,
  setIsEdit: (isEdit) => set({ isEdit })
}));
