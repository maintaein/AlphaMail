import React from 'react';
import { Typography } from '@/shared/components/atoms/Typography';

interface PaginationButtonProps {
  page: number | string;
  isActive?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({ 
  page, 
  isActive = false,
  onClick,
  disabled = false
}) => {
  const isNavigationButton = typeof page === 'string';

  return (
    <button
      className={`
        w-8 h-8 flex items-center justify-center rounded
        ${isActive ? 'bg-[#CDECFC] text-white' : 'text-gray-700 hover:bg-gray-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {isNavigationButton ? (
        <span className="text-sm">{page}</span>
      ) : (
        <Typography variant="body" bold={isActive}>
          {page}
        </Typography>
      )}
    </button>
  );
};