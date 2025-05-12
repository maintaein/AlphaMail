import { create } from 'zustand';

interface SearchState {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  sortOption: number;
  setSortOption: (option: number) => void;
  isSearchMode: boolean;
  setIsSearchMode: (isSearchMode: boolean) => void;
}

export const useScheduleSearchStore = create<SearchState>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (keyword) => set({ 
    searchKeyword: keyword,
    isSearchMode: keyword.trim().length > 0 // 검색어가 있으면 검색 모드 활성화
  }),
  currentPage: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  pageSize: 10,
  setPageSize: (size) => set({ pageSize: size }),
  sortOption: 0,
  setSortOption: (option) => set({ sortOption: option }),
  isSearchMode: false,
  setIsSearchMode: (isSearchMode) => set({ isSearchMode }),
}));