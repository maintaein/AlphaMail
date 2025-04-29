import { create } from 'zustand';
import { useEffect } from 'react';

const ANIMATION_DURATION = 300;

interface ModalStore {
  isOpen: boolean;
  isAnimating: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isAnimating: false,
  openModal: () => set({ isOpen: true, isAnimating: true }),
  closeModal: () => {
    set({ isAnimating: false });
    setTimeout(() => {
      set({ isOpen: false });
    }, ANIMATION_DURATION);
  },
}));

// ESC 키로 모달 닫기 훅
export const useModalKeyboard = () => {
  const { isOpen, closeModal } = useModalStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeModal]);
};
