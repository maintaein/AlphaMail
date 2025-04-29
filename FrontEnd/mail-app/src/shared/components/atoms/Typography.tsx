import { cn } from '@/shared/utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'titleLarge' | 'titleMedium' | 'titleSmall' | 'body' | 'caption';
  bold?: boolean;
}

export const Typography = ({ children, variant = 'body', bold = false }: TypographyProps) => {
  const baseStyle = 'text-gray-900';

  const variantStyle = {
    titleLarge: 'text-[23px] font-light',
    titleMedium: 'text-[20px] font-light',
    titleSmall: 'text-[16px] font-light',
    body: 'text-[14px] font-light',
    caption: 'text-[13px] font-medium text-[#ADADAD]',
  }[variant];

  const boldStyle = bold ? 'font-bold' : '';

  return (
    <p className={cn(baseStyle, variantStyle, boldStyle)}>
      {children}
    </p>
  );
};
