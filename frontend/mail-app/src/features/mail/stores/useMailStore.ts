import { create } from 'zustand';

export interface MailAttachment {
  id: string; 
  file: File;
  name: string;
  size: number;
  type: string;
}

interface MailState {
  currentFolder?: number;
  currentPage: number;
  sortOrder: number;
  searchKeyword: string;
  selectedMails: string[];
    attachments: MailAttachment[];
  
  setCurrentFolder: (folderId?: number) => void;
  setCurrentPage: (page: number) => void;
  setSortOrder: (order: number) => void;
  setSearchKeyword: (keyword: string) => void;
  selectMail: (id: string) => void;
  unselectMail: (id: string) => void;
  selectAllMails: (ids: string[]) => void;
  clearSelection: () => void;
  addAttachment: (file: File) => void;
  removeAttachment: (id: string) => void;
  clearAttachments: () => void;
}

export const useMailStore = create<MailState>((set) => ({
  currentFolder: 1,
  currentPage: 1,
  sortOrder: 0,
  searchKeyword: '',
  selectedMails: [],
  attachments: [],
  
  setCurrentFolder: (folderId) => set({ 
    currentFolder: folderId,
    currentPage: 1,
    selectedMails: []
  }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  setSortOrder: (order) => set({ 
    sortOrder: order,
    currentPage: 1
  }),
  
  setSearchKeyword: (keyword) => set({ 
    searchKeyword: keyword,
    currentPage: 1
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
  }),
  
  addAttachment: (file) => set((state) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    const newAttachment: MailAttachment = {
      id,
      file,
      name: file.name,
      size: file.size,
      type: file.type
    };
    
    return {
      attachments: [...state.attachments, newAttachment]
    };
  }),
  
  removeAttachment: (id) => set((state) => ({
    attachments: state.attachments.filter(attachment => attachment.id !== id)
  })),
  
  clearAttachments: () => set({ attachments: [] })
}));