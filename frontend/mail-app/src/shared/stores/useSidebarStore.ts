import { FolderResponse } from '@/features/mail/types/mail';
import { create } from 'zustand';

interface SidebarState {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  contentVisible: boolean;
  setContentVisible: (visible: boolean) => void;
  folders: FolderResponse[];
  setFolders: (folders: FolderResponse[]) => void;
  isLoadingFolders: boolean;
  setLoadingFolders: (isLoading: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activeItem: null,
  setActiveItem: (item) => set({ activeItem: item }),
  isCollapsed: false,
  toggleCollapse: () => set((state) => ({ 
    isCollapsed: !state.isCollapsed,
    // 사이드바가 축소될 때 즉시 콘텐츠 숨김
    contentVisible: state.isCollapsed ? false : state.contentVisible
  })),
  contentVisible: true,
  setContentVisible: (visible) => set({ contentVisible: visible }),
  folders: [],
  setFolders: (folders) => set({ folders }),
  isLoadingFolders: false,
  setLoadingFolders: (isLoading) => set({ isLoadingFolders: isLoading }),
}));