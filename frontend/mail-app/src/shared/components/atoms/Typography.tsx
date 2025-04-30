import { cn } from '@/shared/utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'titleLarge' | 'titleMedium' | 'titleSmall' | 'body' | 'caption';
  bold?: boolean,
<<<<<<< HEAD
  color?: string; // className prop 추가
}

export const Typography = ({ children, variant = 'body', bold = false, color}: TypographyProps) => {
  const baseStyle = 'text-gray-900';

  const variantStyle = {
    titleLarge: 'text-[21px] font-light',
    titleMedium: 'text-[19px] font-light',
    titleSmall: 'text-[14px] font-light',
    body: 'text-[12px] font-light',
    caption: 'text-[11px] font-medium text-[#ADADAD]',
  }[variant];

  const boldStyle = bold ? 'font-bold' : '';

  return (
    <p className={cn(baseStyle, variantStyle, boldStyle, color)}>
=======
  color?: string;
  className?: string;
}

export const Typography = ({ children, variant = 'body', bold, color, className}: TypographyProps) => {
  const baseStyle = 'text-gray-900 font-pretendard';

  const variantStyle = {
    titleLarge: 'text-[20px]',
    titleMedium: 'text-[17px]',
    titleSmall: 'text-[14px]',
    body: 'text-[12px]',
    caption: 'text-[11px] text-[#ADADAD]',
  }[variant];

  const fontWeightStyle = bold ? 'font-bold' : 'font-light';

  return (
    <p className={cn(baseStyle, variantStyle, fontWeightStyle, color, className)}>
>>>>>>> 47954d76e5867bc2c31c520dfa75f4f0a6d75c79
      {children}
    </p>
  );
};
