import { cn } from '@/shared/utils/cn';
import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'boxed'; 
  size?: 'small' | 'medium' | 'large';
}

export const Input = ({ variant = 'default', size = 'medium', className, ...props }: InputProps) => {

  const textSizeMap = {
    small: 'text-xs', // 12px
    medium: 'text-sm', // 14px
    large: 'text-base', // 16px
  };

  
  // 기본 입력창 스타일
  if (variant === 'default') {
    return (
      <input
        className={cn('border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary h-[30px] w-full px-3', 
          textSizeMap[size],
          className)}
        {...props}
      />
    );
  }

  // boxed 입력창 스타일 (박스 안에 입력창)
  return (
    <input
      className={cn('border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary h-[25px] w-full px-3', 
        textSizeMap[size],
        className)}
      {...props}
    />
  );
};