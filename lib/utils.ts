import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merges Tailwind classes safely, resolving conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Returns current full year as string */
export function currentYear(): string {
  return new Date().getFullYear().toString();
}

/** Capitalizes first letter of each word */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}
