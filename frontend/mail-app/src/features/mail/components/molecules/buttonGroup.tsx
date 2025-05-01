import React from 'react';
import { Button } from '@/shared/components/atoms/button';

interface ButtonOption {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  disabled?: boolean;
}

interface ButtonGroupProps {
  buttons: ButtonOption[];
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ 
  buttons,
  className
}) => {
  return (
    <div className={`flex gap-2 ${className || ''}`}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant || 'primary'}
          onClick={button.onClick}
          disabled={button.disabled}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};