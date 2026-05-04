import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white',
  secondary:
    'bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black',
  ghost:
    'bg-transparent text-muted hover:text-black dark:hover:text-white border-transparent',
};

const sizeStyles = {
  sm: 'px-6 py-3 text-xs',
  md: 'px-10 py-5 text-xs',
  lg: 'px-12 py-6 text-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-sans font-semibold uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
