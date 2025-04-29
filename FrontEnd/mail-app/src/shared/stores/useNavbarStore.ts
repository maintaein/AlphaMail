import { create } from 'zustand';

interface NavbarState {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  contentVisible: boolean;
  setContentVisible: (visible: boolean) => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  isCollapsed: false,
  toggleCollapse: () => set((state) => ({ 
    isCollapsed: !state.isCollapsed,
    // 네비바가 축소될 때 즉시 콘텐츠 숨김
    contentVisible: state.isCollapsed ? false : state.contentVisible
  })),
  contentVisible: true,
  setContentVisible: (visible) => set({ contentVisible: visible }),
}));