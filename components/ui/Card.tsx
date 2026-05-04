import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  sm: 'p-6',
  md: 'p-8',
  lg: 'p-12',
};

export default function Card({
  children,
  hoverable = false,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'border border-black dark:border-white transition-all duration-300',
        paddingStyles[padding],
        hoverable &&
          'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black group',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
