import { create } from 'zustand';

interface MailState {
  // 현재 선택된 폴더 ID (1: 받은메일함, 2: 보낸메일함, 3: 임시보관함, 4: 휴지통 등)
  currentFolder?: number;
  
  // 현재 페이지
  currentPage: number;
  
  // 정렬 방식 (0: 최신순, 1: 오래된순)
  sortOrder: number;
  
  // 검색어
  searchKeyword: string;
  
  // 선택된 메일 ID 목록
  selectedMails: string[];
  
  // 액션
  setCurrentFolder: (folderId?: number) => void;
  setCurrentPage: (page: number) => void;
  setSortOrder: (order: number) => void;
  setSearchKeyword: (keyword: string) => void;
  selectMail: (id: string) => void;
  unselectMail: (id: string) => void;
  selectAllMails: (ids: string[]) => void;
  clearSelection: () => void;
}

export const useMailStore = create<MailState>((set) => ({
  // 초기 상태
  currentFolder: 1, // 기본값: 받은메일함
  currentPage: 1,
  sortOrder: 0, // 기본값: 최신순
  searchKeyword: '',
  selectedMails: [],
  
  // 액션
  setCurrentFolder: (folderId) => set({ 
    currentFolder: folderId,
    currentPage: 1, // 폴더 변경 시 페이지 초기화
    selectedMails: [] // 선택 초기화
  }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setSortOrder: (order) => set({ 
    sortOrder: order,
    currentPage: 1 // 정렬 변경 시 페이지 초기화
  }),
  
  setSearchKeyword: (keyword) => set({ 
    searchKeyword: keyword,
    currentPage: 1 // 검색어 변경 시 페이지 초기화
  }),
  
  selectMail: (id) => set((state) => ({
    selectedMails: [...state.selectedMails, id]
  })),
  
  unselectMail: (id) => set((state) => ({
    selectedMails: state.selectedMails.filter((mailId) => mailId !== id)
  })),
  
  selectAllMails: (ids) => set({
    selectedMails: ids
  }),
  
  clearSelection: () => set({
    selectedMails: []
  })
}));