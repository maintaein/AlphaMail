import { useState, useCallback, useEffect } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  isAnimating: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = useCallback(() => {
    setIsAnimating(true);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsAnimating(false);
    // 애니메이션 완료 후 모달 닫기
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }, []);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeModal]);

  return {
    isOpen,
    isAnimating,
    openModal,
    closeModal,
  };
}; 