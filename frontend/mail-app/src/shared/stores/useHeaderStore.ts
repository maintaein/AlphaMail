import { create } from 'zustand';

interface HeaderState {
  // 헤더 타이틀
  title: string;
  
  // 헤더 부제목 (전체메일/안읽은메일 등의 정보)
  subtitle?: string;
  
  // 메일 통계 정보
  mailStats: {
    totalCount: number;
    unreadCount: number;
  };
  
  // 액션
  setTitle: (title: string) => void;
  setSubtitle: (subtitle?: string) => void;
  setMailStats: (totalCount: number, unreadCount: number) => void;
  resetMailStats: () => void;
  
}

export const useHeaderStore = create<HeaderState>((set) => ({
  // 초기 상태
  title: '',
  subtitle: undefined,
  mailStats: {
    totalCount: 0,
    unreadCount: 0,
  },  
  
  // 액션
  setTitle: (title: string) => set({ title }),
  
  setSubtitle: (subtitle?: string) => set({ subtitle }),
  
  setMailStats: (totalCount: number, unreadCount: number) => 
    set({ 
      mailStats: { 
        totalCount, 
        unreadCount 
      } 
    }),
  
  resetMailStats: () => 
    set({ 
      mailStats: { 
        totalCount: 0, 
        unreadCount: 0 
      } 
    }),

}));