import { cn } from '@/shared/utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'titleLarge' | 'titleMedium' | 'titleSmall' | 'body' | 'caption';
  bold?: boolean,
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
      {children}
    </p>
  );
};
