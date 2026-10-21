import type { Locale } from '@/utilities/routes';
/** Props for the page renderer. */
export type JournalIndexProps = {
  locale: Locale;
};

export const NEWEST_DATE: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};
