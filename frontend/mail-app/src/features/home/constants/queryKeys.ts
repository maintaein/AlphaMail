export const homeQueryKeys = {
    assistants: ['assistants'] as const,
    assistantById: (id: number) => ['assistants', id] as const,
  };