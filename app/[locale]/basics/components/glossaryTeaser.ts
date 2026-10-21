/**
 * The six words the Learn hub's glossary teaser prints, as the board sets
 * them: the three glossary entries, and three terms the guides themselves
 * define (the cun guide's tóngshēncùn and fu, and the channel grades from
 * the yin-and-yang basics). Each line restates the linked text.
 */

import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import type { Locale } from '@/utilities/routes';

/** One teaser card. */
export interface TeaserTerm {
  zh: string;
  term: string;
  line: string;
  /** Where the word is defined: a glossary entry or the guide that names it. */
  source: string;
  href: string;
}

type Target =
  | { kind: 'term'; slug: string }
  | { kind: 'journal'; slug: string; anchor: string }
  | { kind: 'basic'; slug: string; anchor: string };

interface TeaserSource {
  zh: string;
  term: string;
  en: { line: string; source: string };
  zhHant: { line: string; source: string };
  target: Target;
}

const TERMS: readonly TeaserSource[] = [
  {
    zh: '得氣',
    term: 'De qi',
    en: {
      line: 'The dull, heavy or radiating sensation that signals a classical point has been correctly located.',
      source: 'Glossary',
    },
    zhHant: { line: '鈍、沉或向外放射的感覺，表示一個古典穴位已經找準。', source: '詞彙' },
    target: { kind: 'term', slug: 'de-qi' },
  },
  {
    zh: '原穴',
    term: 'Yuan-source point',
    en: {
      line: 'A classical “origin” point on each primary meridian, used to reach the organ it governs.',
      source: 'Glossary',
    },
    zhHant: { line: '每條正經上一個古典的“源頭”穴位，用來觸及它所主的臟腑。', source: '詞彙' },
    target: { kind: 'term', slug: 'yuan-source' },
  },
  {
    zh: '寸',
    term: 'Cun',
    en: {
      line: 'A body-proportional unit for locating points, roughly the width of your own thumb at the knuckle.',
      source: 'Glossary',
    },
    zhHant: { line: '定位穴位的身體比例單位，約等於本人拇指指節的寬度。', source: '詞彙' },
    target: { kind: 'term', slug: 'cun' },
  },
  {
    zh: '同身寸',
    term: 'Tóngshēncùn',
    en: {
      line: 'The “same-body inch”: measures drawn from the very body they will be used on.',
      source: 'From the cun guide',
    },
    zhHant: { line: '“以同一個人的身體為度”：量具取自將被量的那副身體。', source: '出自量寸指南' },
    target: { kind: 'journal', slug: 'measuring-with-cun', anchor: 'why-your-body-is-the-ruler' },
  },
  {
    zh: '一夫',
    term: 'Fu',
    en: {
      line: 'Four fingers held snugly together, sighted across the middle knuckles: three cun.',
      source: 'From the cun guide',
    },
    zhHant: { line: '四指併攏、從中節橫量：恰好三寸。', source: '出自量寸指南' },
    target: { kind: 'journal', slug: 'measuring-with-cun', anchor: 'the-finger-measures' },
  },
  {
    zh: '太陰 · 陽明',
    term: 'Channel grades',
    en: {
      line: 'Old grades of yin and yang that ride inside channel names, like taiyin and yangming.',
      source: 'From Yin and yang',
    },
    zhHant: { line: '藏在經絡名字裡的陰陽古老分級，如太陰、陽明。', source: '出自陰陽' },
    target: { kind: 'basic', slug: 'yin-and-yang', anchor: 'channel-names' },
  },
];

/**
 * The teaser cards for one locale. Cards whose target does not exist are
 * dropped by the caller via `exists`.
 * @param locale active language
 * @param exists predicate that checks whether a glossary destination exists
 * @returns localized glossary teasers whose destinations exist
 */
export function teaserTerms(locale: Locale, exists: (target: Target) => boolean): TeaserTerm[] {
  const r = localizedRoutes(locale);

  return TERMS.filter((t) => exists(t.target)).map((t) => {
    const text = locale === 'en' ? t.en : t.zhHant;
    const href =
      t.target.kind === 'term'
        ? r.glossaryTerm(t.target.slug)
        : t.target.kind === 'journal'
          ? `${r.journalPost(t.target.slug)}#${t.target.anchor}`
          : `${r.basic(t.target.slug)}#${t.target.anchor}`;

    return {
      zh: armText(t.zh, locale),
      term: t.term,
      line: armText(text.line, locale),
      source: armText(text.source, locale),
      href,
    };
  });
}

export type { Target as TeaserTarget };
