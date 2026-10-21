import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

/**
 * Merges Tailwind class names while deduping conflicts.
 * @param {...ClassValue} inputs conditional class names to merge.
 * @returns the joined class names with Tailwind conflicts resolved.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
