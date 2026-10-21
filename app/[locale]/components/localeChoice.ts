import type { Locale } from '@/utilities/routes';

/** Hint in the reader's current language naming each other script. */
export const SCRIPT_HINT: Record<Locale, Record<Locale, string>> = {
  'en': { 'en': '', 'zh-hant': 'Traditional', 'zh-cn': 'Simplified' },
  'zh-hant': { 'en': '英文', 'zh-hant': '', 'zh-cn': '簡體' },
  'zh-cn': { 'en': '英文', 'zh-hant': '繁体', 'zh-cn': '' },
};

/** Key mirrors public/index.html, which reads it to pick the entry locale. */
const LOCALE_KEY = 'acupoints-locale';

/**
 * Remember the edition so the bare entry page opens it next time.
 * @param locale edition used for labels and links
 */
export function rememberLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    /* storage unavailable — navigation still switches locale */
  }
}
