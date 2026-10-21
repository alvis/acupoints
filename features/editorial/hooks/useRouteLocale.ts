import { usePathname } from 'next/navigation';

import { DEFAULT_LOCALE, isLocale } from '@/utilities/routes';

import type { Locale } from '@/utilities/routes';

/**
 * Locale of the current URL, read from its first path segment. For
 * boundaries (not-found, error) that receive no route params; falls back to
 * the default locale outside a locale subtree.
 * @returns the locale from the pathname, falling back to English.
 */
export function useRouteLocale(): Locale {
  const segment = usePathname().split('/').at(1) ?? '';

  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}
