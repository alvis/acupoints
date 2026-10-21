/**
 * Chrome strings for the shared Woodblock (版刻) content blocks: the mono caps
 * labels, fact names and small captions that frame authored prose. Prose
 * itself stays in the content registries; these are interface words only.
 *
 * Every label carries a Han word (set before the English label on EN pages)
 * and its text. Chinese locales render the text alone, since it is already
 * Han; zh-cn reads the simplified forms.
 */

import { toSimplified } from '@/utilities/i18n/t2s';

import type { Locale } from '@/utilities/routes';

/** A Han word paired with the label text it introduces. */
export interface HanLabel {
  /** Han word in the locale's script (traditional for EN and zh-hant). */
  zh: string;
  /** Label text in the page language. */
  text: string;
}

/** Interface strings used by the shared content components. */
export interface ContentLabels {
  inShort: HanLabel;
  where: HanLabel;
  usedFor: HanLabel;
  sources: HanLabel;
  lastReviewed: HanLabel;
  keyFacts: HanLabel;
  faq: HanLabel;
  cite: HanLabel;
  pronunciation: HanLabel;
  comingSoon: HanLabel;
  /** Mono caps label above the n-th authored section (1-based). */
  part: (n: number) => string;
  /** Sentence naming the channel a point sits on. */
  meridianOf: (name: string) => string;
  facts: {
    code: string;
    name: string;
    pinyin: string;
    hanzi: string;
    meridian: string;
    element: string;
    category: string;
    className: string;
    who: string;
    difficulty: string;
    pregnancy: string;
    yes: string;
    noPregnancy: string;
  };
}

const EN: ContentLabels = {
  inShort: { zh: '要', text: 'In short' },
  where: { zh: '位', text: 'Where it is' },
  usedFor: { zh: '主治', text: 'Classically used for' },
  sources: { zh: '出處', text: 'Sources' },
  lastReviewed: { zh: '校', text: 'Last reviewed' },
  keyFacts: { zh: '要目', text: 'Key facts' },
  faq: { zh: '問答', text: 'Frequently asked' },
  cite: { zh: '引', text: 'Cite this page' },
  pronunciation: { zh: '音', text: 'Pronunciation' },
  comingSoon: { zh: '待刻', text: 'coming soon' },
  part: (n) => `Part ${n}`,
  meridianOf: (name) => `Part of the ${name} meridian.`,
  facts: {
    code: 'Code',
    name: 'Name',
    pinyin: 'Pinyin',
    hanzi: 'Hanzi',
    meridian: 'Meridian',
    element: 'Element',
    category: 'Category',
    className: 'Class',
    who: 'WHO coordinates',
    difficulty: 'Difficulty',
    pregnancy: 'Pregnancy-safe',
    yes: 'Yes',
    noPregnancy: 'No — traditionally contraindicated',
  },
};

const ZH_HANT: ContentLabels = {
  inShort: { zh: '要', text: '提要' },
  where: { zh: '位', text: '位置' },
  usedFor: { zh: '主治', text: '古典主治' },
  sources: { zh: '出處', text: '出處' },
  lastReviewed: { zh: '校', text: '最後審閱' },
  keyFacts: { zh: '要目', text: '要目' },
  faq: { zh: '問答', text: '常見問題' },
  cite: { zh: '引', text: '引用本頁' },
  pronunciation: { zh: '音', text: '讀音' },
  comingSoon: { zh: '待刻', text: '即將刊出' },
  part: (n) => `第 ${n} 節`,
  meridianOf: (name) => `所屬經脈：${name}`,
  facts: {
    code: '編號',
    name: '名稱',
    pinyin: '拼音',
    hanzi: '漢字',
    meridian: '經脈',
    element: '五行',
    category: '類別',
    className: '類別',
    who: '世衛定位',
    difficulty: '取穴難度',
    pregnancy: '孕期可用',
    yes: '可',
    noPregnancy: '否，傳統上孕期禁用',
  },
};

const ZH_CN: ContentLabels = {
  inShort: { zh: '要', text: '提要' },
  where: { zh: '位', text: '位置' },
  usedFor: { zh: '主治', text: '古典主治' },
  sources: { zh: '出处', text: '出处' },
  lastReviewed: { zh: '校', text: '最后审阅' },
  keyFacts: { zh: '要目', text: '要目' },
  faq: { zh: '问答', text: '常见问题' },
  cite: { zh: '引', text: '引用本页' },
  pronunciation: { zh: '音', text: '读音' },
  comingSoon: { zh: '待刻', text: '即将刊出' },
  part: (n) => `第 ${n} 节`,
  meridianOf: (name) => `所属经脉：${name}`,
  facts: {
    code: '编号',
    name: '名称',
    pinyin: '拼音',
    hanzi: '汉字',
    meridian: '经脉',
    element: '五行',
    category: '类别',
    className: '类别',
    who: '世卫定位',
    difficulty: '取穴难度',
    pregnancy: '孕期可用',
    yes: '可',
    noPregnancy: '否，传统上孕期禁用',
  },
};

const LABELS: Record<Locale, ContentLabels> = { 'en': EN, 'zh-hant': ZH_HANT, 'zh-cn': ZH_CN };

/**
 * Content-block chrome strings for a locale; EN when omitted.
 * @param locale language used for text and routes.
 * @returns the localized headings and captions for shared content blocks.
 */
export function contentLabels(locale: Locale = 'en'): ContentLabels {
  return LABELS[locale];
}

/**
 * BCP-47 tag for a Han word set inside a page of the given locale.
 * @param locale language used for text and routes.
 * @returns the Chinese language tag matching the page's Han script.
 */
export function hanLang(locale: Locale = 'en'): 'zh-Hant' | 'zh-Hans' {
  return locale === 'zh-cn' ? 'zh-Hans' : 'zh-Hant';
}

/**
 * Han text in the locale's script: authored traditional, simplified on zh-cn.
 * @param text the authored traditional Chinese text.
 * @param locale language used for text and routes.
 * @returns the Han text in simplified script for zh-cn, otherwise unchanged.
 */
export function hanFor(text: string, locale: Locale): string {
  return locale === 'zh-cn' ? toSimplified(text) : text;
}
