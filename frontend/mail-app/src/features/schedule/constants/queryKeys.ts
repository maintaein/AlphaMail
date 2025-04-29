export const SCHEDULE_KEYS = {
  all: ['schedules'] as const,
  lists: () => [...SCHEDULE_KEYS.all, 'list'] as const,
  list: (year: number, month: number) => [...SCHEDULE_KEYS.lists(), { year, month }] as const,
  details: () => [...SCHEDULE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...SCHEDULE_KEYS.details(), id] as const,
}; 