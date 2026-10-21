/**
 * Copy resolver shared by the channel pages: an English table and an
 * authored Traditional Chinese table, with the zh-cn tree reading the
 * Traditional text converted to simplified, as the rest of the site does.
 */

import { toSimplified } from '@/utilities/i18n/t2s';

import type { Locale } from '@/utilities/routes';

/** Resolves one copy key for the page's locale, filling `{name}` slots. */
export type Translate<K extends string> = (
  key: K,
  vars?: Readonly<Record<string, string | number>>,
) => string;

/**
 * Builds a resolver over an English and a Traditional Chinese table. zh-cn
 * reads the Traditional table converted to simplified; `{slot}` markers are
 * filled after conversion so names pass through untouched.
 * @param en the English source strings keyed by copy identifier
 * @param zh the Traditional Chinese source strings keyed by copy identifier
 * @param locale the page language and Han script
 * @returns a localized placeholder resolver
 */
export function translator<K extends string>(
  en: Readonly<Record<K, string>>,
  zh: Readonly<Record<K, string>>,
  locale: Locale,
): Translate<K> {
  return (key, vars) => {
    const raw = locale === 'en' ? en[key] : zh[key];
    const text = locale === 'zh-cn' ? toSimplified(raw) : raw;

    return vars ? fill(text, vars) : text;
  };
}

/**
 * Fills `{slot}` markers in a template; unknown slots are left as written.
 * @param text passage to process
 * @param vars placeholder replacements
 * @returns the template with known slots replaced
 */
export function fill(text: string, vars: Readonly<Record<string, string | number>>): string {
  return text.replace(/\{(\w+)\}/gu, (whole, name: string) =>
    name in vars ? String(vars[name]) : whole,
  );
}
