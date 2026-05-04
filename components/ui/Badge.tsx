import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  inverted?: boolean;
}

export default function Badge({ children, inverted = false, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block border px-3 py-1 font-sans text-label-sm uppercase tracking-widest font-semibold transition-all',
        inverted
          ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
          : 'border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
