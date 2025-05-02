import { create } from 'zustand';
import { Quote } from '../types/quote';

interface QuoteState {
  // 검색 관련 상태
  keyword: string;
  setKeyword: (keyword: string) => void;
  
  // 선택된 견적서 관련 상태
  selectedQuote: Quote | null;
  setSelectedQuote: (quote: Quote | null) => void;
  
  // 선택된 견적서 ID 목록
  selectedQuoteIds: Set<number>;
  setSelectedQuoteIds: (ids: Set<number>) => void;
  toggleQuoteSelection: (id: number) => void;
  
  // 페이지네이션 관련 상태
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // 정렬 관련 상태
  sortOption: number;
  setSortOption: (option: number) => void;
}

export const useQuoteStore = create<QuoteState>((set) => ({
  // 검색 관련 상태
  keyword: '',
  setKeyword: (keyword) => set({ keyword }),
  
  // 선택된 견적서 관련 상태
  selectedQuote: null,
  setSelectedQuote: (quote) => set({ selectedQuote: quote }),
  
  // 선택된 견적서 ID 목록
  selectedQuoteIds: new Set(),
  setSelectedQuoteIds: (ids) => set({ selectedQuoteIds: ids }),
  toggleQuoteSelection: (id) => 
    set((state) => {
      const newSet = new Set(state.selectedQuoteIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { selectedQuoteIds: newSet };
    }),
  
  // 페이지네이션 관련 상태
  currentPage: 1,
  pageSize: 10,
  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  
  // 정렬 관련 상태
  sortOption: 0,
  setSortOption: (option) => set({ sortOption: option }),
})); 