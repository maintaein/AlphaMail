import { cn } from '@/shared/utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'titleLarge' | 'titleMedium' | 'titleSmall' | 'body' | 'caption';
  bold?: boolean,
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
      {children}
    </p>
  );
};
