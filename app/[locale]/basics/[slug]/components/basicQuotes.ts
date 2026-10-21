/**
 * The pull quote each basics article's band sets beside its figure, as the
 * Basics board pulls one line from the article. Each line is quoted from the
 * named section of the article's own en and zh-hant prose under
 * content/pages/basics; zh-cn is converted from zh-hant at render.
 */

/** One quoted line, by the section it comes from. */
export type BasicQuote = {
  /** Section id the line is quoted from. */
  sectionId: string;
  en: string;
  zh: string;
};

const QUOTES: Readonly<Record<string, BasicQuote>> = {
  'what-is-qi': {
    sectionId: 'the-word-itself',
    en: 'In the medical literature it behaves less like a substance and more like a shorthand for doing.',
    zh: '在中醫典籍裡，它的用法更像一種簡寫：臟腑組織做什麼，書中往往就把這份“做”稱作它的氣。',
  },
  'yin-and-yang': {
    sectionId: 'labels-before-laws',
    en: 'Night is not a failed day, and rest is not laziness wearing another name.',
    zh: '黑夜不是失敗的白天，休息也不是換了名字的懶惰。',
  },
  'five-elements': {
    sectionId: 'framework-not-science',
    en: 'The phases are verbs wearing nouns’ clothing.',
    zh: '五行更像穿著名詞外衣的動詞。',
  },
};

/**
 * The band's quote for a basic, or undefined when none is chosen.
 * @param slug entry URL segment
 * @returns the selected pull quote, when one is authored
 */
export function basicQuote(slug: string): BasicQuote | undefined {
  return QUOTES[slug];
}
