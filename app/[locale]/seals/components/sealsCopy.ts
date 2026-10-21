/**
 * My seals strings that came with dated seals: the streak, when the latest
 * seal was pressed, and "Share a page of your book". The rest of the page's
 * chrome lives with the points area (`pointsText(locale).seals`).
 *
 * Traditional Chinese is authored; zh-cn derives from it with the site's
 * converter. SERVER ONLY: the client island receives the resolved strings.
 */

import { toSimplified } from '@/utilities/i18n/t2s';

import type { Locale } from '@/utilities/routes';

/** Strings for the export of the seal book as an image. */
export interface SealShareText {
  title: string;
  body: string;
  action: string;
  working: string;
  /** `{file}` = the saved file's name. */
  saved: string;
  failed: string;
  /** File name before the date: `{stem}-2026-10-20.png`. */
  fileStem: string;
  /** `{leaves}`, `{total}`, `{volumes}`, `{volumeTotal}`. */
  summary: string;
  /** Appended to the summary while a streak runs: `{n}` = days. */
  summaryStreak: string;
  /** Line printed at the foot of the image. */
  brand: string;
  /** `{date}` = today, long form. */
  printed: string;
}

/** Streak, latest-seal and export strings for My seals. */
export interface SealsMoreText {
  statStreak: string;
  /** Unit after the streak count: one day, several days. */
  streakDay: string;
  streakDays: string;
  /** Appended to "Latest seal" for a seal pressed today. */
  latestToday: string;
  latestYesterday: string;
  /** `{date}` = the day it was pressed, short form. */
  latestOn: string;
  /** `{nth}` (place in the volume), `{volume}`, `{left}` (spelled). */
  latestText: string;
  /** BCP-47 tag dates are written in. */
  dateLocale: string;
  share: SealShareText;
}

const EN: SealsMoreText = {
  statStreak: 'Streak',
  streakDay: ' day',
  streakDays: ' days',
  latestToday: ' · today',
  latestYesterday: ' · yesterday',
  latestOn: ' · {date}',
  latestText: 'Your {nth} leaf in {volume}. {left} to go for the volume seal.',
  dateLocale: 'en-GB',
  share: {
    title: 'Share a page of your book',
    body: 'Exports as a printed-style image. Your seals stay on this device.',
    action: 'Save the image',
    working: 'Printing the page…',
    saved: 'Saved {file}.',
    failed: 'The image could not be made in this browser.',
    fileStem: 'seal-book',
    summary: '{leaves} of {total} leaves · {volumes} of {volumeTotal} volumes',
    summaryStreak: ' · {n}-day streak',
    brand: '經穴圖 · Acupoints',
    printed: 'Printed {date}',
  },
};

const ZH_HANT: SealsMoreText = {
  statStreak: '連讀',
  streakDay: ' 日',
  streakDays: ' 日',
  latestToday: '・今日',
  latestYesterday: '・昨日',
  latestOn: '・{date}',
  latestText: '這是你在{volume}蓋印的第{nth}葉，再{left}葉即得卷印。',
  dateLocale: 'zh-Hant',
  share: {
    title: '分享印譜一頁',
    body: '存成一張仿印刷的圖片。印記只保存在這部設備上。',
    action: '保存圖片',
    working: '正在印製……',
    saved: '已保存 {file}。',
    failed: '此瀏覽器無法製作圖片。',
    fileStem: 'seal-book',
    summary: '已蓋印 {leaves} / {total} 葉・完成 {volumes} / {volumeTotal} 卷',
    summaryStreak: '・連讀 {n} 日',
    brand: '經穴圖',
    printed: '印於 {date}',
  },
};

const TEXT: Record<Locale, SealsMoreText> = {
  'en': EN,
  'zh-hant': ZH_HANT,
  'zh-cn': simplified(ZH_HANT),
};

/**
 * The dated-seal strings for a locale.
 * @param locale edition used for labels and links
 * @returns the streak, latest-seal, and export strings for the locale
 */
export function sealsMoreText(locale: Locale): SealsMoreText {
  return TEXT[locale];
}

/**
 * convert the dated-seal copy to simplified Chinese.
 * @param source traditional Chinese dated-seal and sharing strings
 * @returns the seal-book strings converted to simplified Chinese with its date locale
 */
function simplified(source: SealsMoreText): SealsMoreText {
  const { dateLocale: _traditional, share, ...lines } = source;

  return {
    ...simplifyRecord<Exclude<keyof SealsMoreText, 'dateLocale' | 'share'>>(lines),
    dateLocale: 'zh-Hans',
    share: simplifyRecord<keyof SealShareText>(share),
  };
}

/**
 * Derives a simplified record from its traditional source, key by key.
 * @param source record of traditional Chinese strings
 * @returns the same keys with every string converted to simplified Chinese
 */
function simplifyRecord<K extends string>(source: Readonly<Record<K, string>>): Record<K, string> {
  const out: Record<K, string> = { ...source };
  for (const key of Object.keys(out) as K[]) {
    out[key] = toSimplified(out[key]);
  }

  return out;
}
