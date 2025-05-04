import React from 'react';
import { Button } from '@/shared/components/atoms/button';

interface MailDetailActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
}

export const MailDetailAction: React.FC<MailDetailActionProps> = ({
  icon,
  label,
  onClick,
  variant = 'ghost'
}) => {
  return (
    <Button variant={variant} onClick={onClick} className="flex items-center gap-1">
      {icon}
      <span>{label}</span>
    </Button>
  );
};