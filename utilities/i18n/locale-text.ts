import { armText, toSimplifiedArm } from '@/utilities/i18n/t2s';

import type { EditorialArm } from '@/content/editorial/schema';
import type { Locale } from '@/utilities/routes';

/**
 * Which authored arm a locale reads. Traditional Chinese is the authored
 * variant and zh-cn is derived from it, so every consumer that shows prose to
 * a reader — page body, page metadata, JSON-LD, RSS, llms.txt — resolves it
 * here instead of restating the three-way choice.
 */
export interface BilingualModule {
  en: EditorialArm;
  zh: EditorialArm;
}

/**
 * The single prose arm a locale renders.
 * @param module editorial document to render.
 * @param locale language used for text and routes.
 * @returns the English, traditional, or derived simplified prose arm.
 */
export function armForLocale(module: BilingualModule, locale: Locale): EditorialArm {
  if (locale === 'en') {
    return module.en;
  }

  return locale === 'zh-cn' ? toSimplifiedArm(module.zh) : module.zh;
}

/**
 * The summary line a locale renders, without deriving the whole arm.
 * @param module editorial document to render.
 * @param locale language used for text and routes.
 * @returns the summary in the locale's authored or derived script.
 */
export function summaryForLocale(module: BilingualModule, locale: Locale): string {
  return locale === 'en' ? module.en.summary : armText(module.zh.summary, locale);
}
