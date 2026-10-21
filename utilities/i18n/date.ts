import type { Locale } from '@/utilities/routes';

/** BCP-47 tag for Intl formatters — distinct from the URL locale slug. */
const INTL_TAG: Record<Locale, string> = {
  'en': 'en-US',
  'zh-hant': 'zh-Hant',
  'zh-cn': 'zh-CN',
};

/**
 * Locale-aware date formatting; every Intl call on the site goes through here.
 * @param date calendar instant to inspect.
 * @param locale language used for text and routes.
 * @param options the date fields and styles passed to Intl.
 * @returns the date formatted with the locale's Intl language tag.
 */
export function formatDate(
  date: Date,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(INTL_TAG[locale], options).format(date);
}
