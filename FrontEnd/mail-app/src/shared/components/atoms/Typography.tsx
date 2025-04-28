interface TypographyProps {
    children: React.ReactNode;
    variant?: 'title' | 'subtitle' | 'body' | 'caption';
  }
  
  export const Typography = ({ children, variant = 'body' }: TypographyProps) => {
    const variantClass = {
      title: 'text-xl font-bold',
      subtitle: 'text-lg font-semibold',
      body: 'text-base',
      caption: 'text-sm text-gray-500',
    }[variant];
  
    return <p className={variantClass}>{children}</p>;
  };
  