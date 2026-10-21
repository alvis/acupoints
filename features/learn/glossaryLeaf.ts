/**
 * Dictionary-leaf lines for the glossary entries, as the Glossary board sets
 * them: a part of speech, an also-known-as, one line, where you meet the term
 * and the catalogue points it is worked through on. Every line restates the
 * entry's own prose under content/pages/glossary; nothing here adds a claim.
 * zh-hant is authored from the zh-hant arms and zh-cn is derived from it.
 */

import { pointByCode } from '@/content/points';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { fill } from './fill';

import type { Locale } from '@/utilities/routes';

import type { CunShortcutLabels } from './components/CunShortcuts';
import type { GlossaryExample } from './components/GlossaryLeaf';
import type { LearnCopy } from './copy';

/** The leaf's lines for one locale, examples resolved against the registry. */
export interface GlossaryLeafText {
  kind: string;
  aka?: string;
  line: string;
  meet: string;
  examples: GlossaryExample[];
  /** Which of the arm's FAQs the leaf quotes as "asked often". */
  faqIndex: number;
}

/** Welcome-versus-stop panel beside the de qi entry. */
export interface DeQiPanel {
  welcomeTitle: string;
  welcome: string[];
  stopTitle: string;
  stop: string[];
}

/** Figure data beside an entry, per slug. */
export type GlossaryFigureData =
  | { slug: 'cun'; labels: CunShortcutLabels; caption: string }
  | { slug: 'de-qi'; panel: DeQiPanel }
  | { slug: 'yuan-source'; zh: string; text: string };

interface LeafSource {
  kind: string;
  aka?: string;
  line: string;
  meet: string;
  examples: ReadonlyArray<readonly [code: string, where: string]>;
}

interface LeafEntry {
  faqIndex: number;
  en: LeafSource;
  zh: LeafSource;
}

const LEAF: Readonly<Record<string, LeafEntry | undefined>> = {
  // glossary-cun: #same-body-inch, #finger-width-shortcuts, #reading-cun-on-this-site
  'cun': {
    faqIndex: 0,
    en: {
      kind: 'noun · a unit of length',
      aka: '同身寸 tóngshēn cùn, the body’s own inch',
      line: 'Your own thumb’s width: the ruler every location on this site is written in.',
      meet: 'In nearly every location line, such as “2 cun above the wrist crease”. Three worked examples:',
      examples: [
        ['PC6', '2 cun above the wrist crease'],
        ['SP6', '3 cun above the tip of the inner anklebone'],
        ['ST36', '3 cun below the hollow under the outer knee'],
      ],
    },
    zh: {
      kind: '名詞 · 長度單位',
      aka: '同身寸，以身為尺',
      line: '本人拇指的寬度：本站每一條定位，都用這把尺寫成。',
      meet: '幾乎每一條定位都會用到，例如“腕橫紋上 2 寸”。三個實例：',
      examples: [
        ['PC6', '腕橫紋上 2 寸'],
        ['SP6', '內踝尖直上 3 寸'],
        ['ST36', '外膝眼下方 3 寸'],
      ],
    },
  },
  // glossary-de-qi: #what-de-qi-names, #stop-sign-sensations, #where-you-meet-it
  'de-qi': {
    faqIndex: 1,
    en: {
      kind: 'noun · a sensation',
      aka: 'the arrival of qi',
      line: 'Heavy and dull is right; sharp, electric or travelling means stop.',
      meet: 'On the point leaves, where you can test the vocabulary yourself, and in the stop rules every region and channel guide repeats.',
      examples: [],
    },
    zh: {
      kind: '名詞 · 一種感覺',
      aka: '氣的到來',
      line: '沉而鈍便對了；尖、麻電或走竄，就停。',
      meet: '在各個穴位頁上，你可以親手體會這組詞彙；區域與經絡指南也一再重申同樣的停止規則。',
      examples: [],
    },
  },
  // glossary-yuan-source: #twelve-windows, #meeting-them-on-this-site
  'yuan-source': {
    faqIndex: 1,
    en: {
      kind: 'noun · a class of point',
      aka: 'source point',
      line: 'One source on each channel, near the wrist or ankle.',
      meet: 'Several catalogued points carry the tag outright. Three suit a first encounter:',
      examples: [
        ['LI4', 'back of the hand'],
        ['LV3', 'top of the foot'],
        ['KI3', 'inner ankle'],
      ],
    },
    zh: {
      kind: '名詞 · 一類穴位',
      aka: '十二原',
      line: '每條經一處源頭，就在腕踝附近。',
      meet: '目錄裡有好幾個穴位直接帶著“原穴”標籤。有三處特別適合初次相識：',
      examples: [
        ['LI4', '手背'],
        ['LV3', '足背'],
        ['KI3', '內踝'],
      ],
    },
  },
};

const CUN_FIGURE = {
  en: {
    labels: {
      label:
        'Finger-width shortcuts on your own hand: one cun is the thumb at the knuckle; one and a half cun is the index and middle fingers together; two cun is three fingers; three cun is all four fingers.',
      oneCun: '1 cun',
      thumb: 'thumb',
      oneHalf: '1.5 cun',
      twoFingers: 'two fingers',
      two: '2 cun',
      three: 'three',
      threeCun: '3 cun',
      four: 'four',
      across: 'measured across the middle knuckles',
    },
    caption:
      'Use the hand of the person being measured. Finger widths are first guesses; let bones and tendons decide.',
  },
  zh: {
    labels: {
      label:
        '自己手上的指寸：拇指指節寬為一寸；食指與中指併攏為一寸半；三指並排為二寸；四指併攏為三寸。',
      oneCun: '1 寸',
      thumb: '拇指',
      oneHalf: '1.5 寸',
      twoFingers: '兩指',
      two: '2 寸',
      three: '三指',
      threeCun: '3 寸',
      four: '四指',
      across: '從中節橫量',
    },
    caption: '用被量者本人的手。指寬只是初估，最後交給骨與腱定奪。',
  },
} as const;

const DEQI_PANEL: Readonly<Record<'en' | 'zh', DeQiPanel>> = {
  en: {
    welcomeTitle: 'Welcome',
    welcome: ['dull', 'heavy', 'spreading, then settling', 'a gentle warmth'],
    stopTitle: 'Stop at once',
    stop: ['sharp', 'electric', 'shooting or travelling', 'pain that grows as you press'],
  },
  zh: {
    welcomeTitle: '受歡迎',
    welcome: ['鈍', '沉重', '擴散，而後安住', '溫柔的暖意'],
    stopTitle: '立即停止',
    stop: ['尖', '麻電', '放射或走竄', '越按越尖銳的痛'],
  },
};

const YUAN_TEXT = {
  en: 'Twelve source points, one per channel, gathered near the wrists and ankles where the channels run close to bone and tendon.',
  zh: '十二個原穴，每經一個，聚在腕踝一帶——經脈在這裡貼著骨與腱淺行。',
} as const;

/**
 * The leaf's lines for one entry, or undefined for an entry without leaf copy.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @param copy localized interface strings
 * @returns localized definition details, when authored
 */
export function glossaryLeaf(
  slug: string,
  locale: Locale,
  copy: LearnCopy,
): GlossaryLeafText | undefined {
  const entry = LEAF[slug];
  if (!entry) {
    return undefined;
  }
  const source = locale === 'en' ? entry.en : entry.zh;
  const r = localizedRoutes(locale);
  const examples: GlossaryExample[] = [];
  for (const [code, where] of source.examples) {
    const point = pointByCode(code);
    if (!point) {
      continue;
    }
    examples.push({
      code: point.code,
      name: point.name,
      hanzi: armText(point.hanzi, locale),
      where: armText(where, locale),
      href: r.point(point.code),
      aria: fill(copy.exampleAria, { name: point.name, code: point.code }),
    });
  }

  return {
    kind: armText(source.kind, locale),
    aka: source.aka === undefined ? undefined : armText(source.aka, locale),
    line: armText(source.line, locale),
    meet: armText(source.meet, locale),
    examples,
    faqIndex: entry.faqIndex,
  };
}

/**
 * Side-figure data for an entry, in the locale's script.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @returns localized side-figure data, when available
 */
export function glossaryFigure(slug: string, locale: Locale): GlossaryFigureData | undefined {
  const arm = locale === 'en' ? 'en' : 'zh';
  if (slug === 'cun') {
    const { labels, caption } = CUN_FIGURE[arm];
    const converted: CunShortcutLabels = {
      label: armText(labels.label, locale),
      oneCun: armText(labels.oneCun, locale),
      thumb: armText(labels.thumb, locale),
      oneHalf: armText(labels.oneHalf, locale),
      twoFingers: armText(labels.twoFingers, locale),
      two: armText(labels.two, locale),
      three: armText(labels.three, locale),
      threeCun: armText(labels.threeCun, locale),
      four: armText(labels.four, locale),
      across: armText(labels.across, locale),
    };

    return { slug, labels: converted, caption: armText(caption, locale) };
  }
  if (slug === 'de-qi') {
    const panel = DEQI_PANEL[arm];

    return {
      slug,
      panel: {
        welcomeTitle: armText(panel.welcomeTitle, locale),
        welcome: panel.welcome.map((w) => armText(w, locale)),
        stopTitle: armText(panel.stopTitle, locale),
        stop: panel.stop.map((w) => armText(w, locale)),
      },
    };
  }
  if (slug === 'yuan-source') {
    return { slug, zh: armText('十二原', locale), text: armText(YUAN_TEXT[arm], locale) };
  }

  return undefined;
}
