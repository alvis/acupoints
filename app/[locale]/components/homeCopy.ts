/**
 * Home-page microcopy for the Woodblock Chart (版刻) front leaf. Only
 * interface chrome lives here — every fact on the page (points, channels,
 * regions, conditions, the almanac) comes from the content registries.
 *
 * Traditional Chinese is authored; the zh-cn copy is derived from it with the
 * site's shared converter, matching the prose-arm policy. Han labels that sit
 * beside English headings (目錄, 凡例 …) live in their own record so English
 * pages carry the traditional forms and zh-cn pages the simplified ones.
 *
 * SERVER ONLY: the converter is not meant for client bundles; client islands
 * receive the resolved strings as props.
 */

import { traditionalTermName } from '@/content/almanac';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { toSimplified } from '@/utilities/i18n/t2s';

import type { Locale } from '@/utilities/routes';

import type { HomeHan, HomeText } from './homeCopyTypes';

export type { HomeHan, HomeText } from './homeCopyTypes';

const en: HomeText = {
  marginNote: 'Margin note: new here? Start with today’s leaf. It takes one minute.',
  tabsLabel: 'Quick tabs',
  tabToday: 'Today',
  tabIndex: 'Index',
  tabSeals: 'Seals',
  tabSearch: 'Search',
  leafOf: 'leaf {n} of 361',
  heroCap: 'An illustrated book, cut for the web',
  heroTitle: 'The 361 points, one leaf at a time.',
  heroLede:
    'Each point is a single leaf: where it is, what it’s for, how to press it. Deeper notes open when you tap the small red text, the way old readers wrote in the margins.',
  readToday: 'Read today’s leaf →',
  openIndex: 'Open the index',
  sealedOf: 'You have sealed {n} of 361 leaves',
  seeSeals: 'See your seals',
  todayCap: 'Today’s leaf',
  channelLine: '{meridian} · {nth} of {count}',
  channelOnly: '{meridian} · {count} points',
  rowWhere: 'Where.',
  rowBrief: 'For.',
  rowPress: 'Press.',
  rowCaution: 'Caution.',
  rowSafe: 'Safe.',
  safeText: 'Fine to press yourself.',
  pregnancyCaution: 'Not in pregnancy.',
  readLeaf: 'Read the leaf →',
  readShort: 'Read · 1 min',
  sealedShort: '{n} / 361 sealed',
  plateLabel: 'Carved plate with {name} ({code}) marked in red',
  shelfTitle: 'The fourteen channels',
  shelfAside: 'Fourteen volumes on the shelf. Pull one down to read its leaves.',
  shelfShort: 'Your shelf',
  spineLabel: 'Volume {i}, {name}, {s} of {n} leaves sealed',
  spineComplete: '{name} volume complete',
  waysTitle: 'Three ways in',
  regionCap: 'By where it is',
  regionTitle: 'Point at the body',
  allRegions: 'All regions',
  conditionCap: 'By what you feel',
  conditionTitle: 'Sets of points that pair',
  allConditions: 'All {n} conditions',
  conditionPoint: '{n} point →',
  conditionPoints: '{n} points →',
  feeling: 'Feeling…',
  dayCap: 'By the day',
  dayLede: 'The almanac turns with the 24 solar terms. Each term elects one leaf to read.',
  termsLabel: 'The 24 solar terms; {term} is current',
  termNow: 'now',
  termLeaf: 'This term’s leaf',
  streakNone: 'Start a streak today',
  streakOne: 'One day so far',
  streakMany: '{n} days in a row',
  streakLede:
    'Each day you read a leaf, the calendar takes a stamp. Miss a day and the next leaf waits for you.',
  streakLabel: 'Last {count} days, {read} with a seal. Current streak: {n}.',
  legendTitle: 'How to read a leaf',
  legendMainCap: 'Main text',
  legendMainDemo: 'Where. … | For. … | Press. …',
  legendMainText: 'Four short lines. Read it in under a minute.',
  legendRedCap: 'Red notes',
  legendRedBefore: 'press',
  legendRedA: 'how hard,',
  legendRedB: 'how long',
  legendRedAfter: 'here',
  legendRedText: 'Two small lines tucked into the text. Tap to open the deeper note.',
  legendMarginCap: 'Margin notes',
  legendMarginDemo: 'Skip in pregnancy.',
  legendMarginText: 'Cautions and pairings sit above the block, where readers wrote them.',
  legendFishCap: 'Fish tails',
  legendFishText: 'The centre strip says where you are: volume and leaf.',
  legendSealCap: 'Seals',
  legendSealLabel: 'Seal reading 合谷',
  legendSealText: 'Finish a leaf and stamp it. Your seals fill a book of 361.',
};

const zhHant: HomeText = {
  marginNote: '眉批：初來乍到？先讀今日一葉，只需一分鐘。',
  tabsLabel: '常用分頁',
  tabToday: '今日',
  tabIndex: '目錄',
  tabSeals: '印譜',
  tabSearch: '搜尋',
  leafOf: '第 {n} 葉，共三百六十一葉',
  heroCap: '一部為網頁刻成的圖本',
  heroTitle: '三百六十一穴，一次讀一葉。',
  heroLede:
    '每一穴即是一葉：在哪裡、主何事、如何按。輕點細小的紅字，便展開更深的註解，一如舊時讀者在書頁邊寫下的批註。',
  readToday: '讀今日一葉 →',
  openIndex: '打開目錄',
  sealedOf: '已蓋印 {n} 葉，共三百六十一葉',
  seeSeals: '看我的印譜',
  todayCap: '今日一葉',
  channelLine: '{meridian} · 第 {n} 穴，共 {count} 穴',
  channelOnly: '{meridian} · 共 {count} 穴',
  rowWhere: '位置',
  rowBrief: '概要',
  rowPress: '按法',
  rowCaution: '注意',
  rowSafe: '安全',
  safeText: '可自行按壓。',
  pregnancyCaution: '孕期勿按。',
  readLeaf: '讀此葉 →',
  readShort: '讀 · 一分鐘',
  sealedShort: '已蓋印 {n} / 361',
  plateLabel: '刻版圖，朱點標出{name}（{code}）',
  shelfTitle: '十四經',
  shelfAside: '十四卷在架上，取下一卷，逐葉而讀。',
  shelfShort: '',
  spineLabel: '卷{i}，{name}，已蓋印 {s} 葉，共 {n} 葉',
  spineComplete: '{name}全卷已蓋印',
  waysTitle: '三種入口',
  regionCap: '按部位',
  regionTitle: '指向身體',
  allRegions: '全部部位',
  conditionCap: '按症候',
  conditionTitle: '相配成組的穴位',
  allConditions: '全部 {n} 種症候',
  conditionPoint: '{n} 穴 →',
  conditionPoints: '{n} 穴 →',
  feeling: '覺得……',
  dayCap: '按日子',
  dayLede: '曆隨二十四節氣而轉，每一節氣選讀一葉。',
  termsLabel: '二十四節氣，當令：{term}',
  termNow: '當令',
  termLeaf: '本節氣之葉',
  streakNone: '今日開始連讀',
  streakOne: '連讀一日',
  streakMany: '連讀{n}日',
  streakLede: '每讀一葉的日子，日曆就蓋上一印。漏了一天，下一葉仍等著你。',
  streakLabel: '近 {count} 日，{read} 日有印。目前連讀 {n} 日。',
  legendTitle: '如何閱讀一葉',
  legendMainCap: '正文',
  legendMainDemo: '位置。… | 主治。… | 按法。…',
  legendMainText: '短短四行，一分鐘內讀完。',
  legendRedCap: '紅字雙行',
  legendRedBefore: '按壓',
  legendRedA: '輕重',
  legendRedB: '久暫',
  legendRedAfter: '之處',
  legendRedText: '夾在正文中的兩行小字，輕點即展開註解。',
  legendMarginCap: '眉批',
  legendMarginDemo: '孕期勿按。',
  legendMarginText: '注意與配穴寫在版框之上，正是舊時讀者批註之處。',
  legendFishCap: '魚尾',
  legendFishText: '版心標明所在：第幾卷、第幾葉。',
  legendSealCap: '印',
  legendSealLabel: '印文：合谷',
  legendSealText: '讀完一葉便蓋一印，集滿三百六十一印成一冊。',
};

const hanHant: HomeHan = {
  bookTitle: '經穴圖',
  bookSub: '十四經 · 三百六十一穴',
  stripHead: '經穴圖 · 卷首',
  stripToday: '今日一葉',
  stripLeaf: '一',
  shelf: '目錄',
  shelfShort: '書架',
  volume: '卷',
  completeTop: '完',
  completeBottom: '卷',
  byRegion: '按部',
  byCondition: '按症',
  byDay: '按日',
  dayStamp: '讀',
  legend: '凡例',
  fishDemo: '卷二 · 四',
  channelSuffix: '經',
  plateSuffix: '圖',
  tabToday: '今日',
  tabIndex: '目錄',
  tabSeals: '印譜',
  tabSearch: '搜',
};

const TEXT: Record<Locale, HomeText> = {
  en,
  'zh-hant': zhHant,
  'zh-cn': simplify<keyof HomeText>(zhHant),
};

const HAN: Record<Locale, HomeHan> = {
  'en': hanHant,
  'zh-hant': hanHant,
  'zh-cn': simplify<keyof HomeHan>(hanHant),
};

/**
 * Home chrome for a locale.
 * @param locale edition used for labels and links
 * @returns the home-page labels and templates for the selected edition
 */
export function homeText(locale: Locale): HomeText {
  return TEXT[locale];
}

/**
 * Han labels for a locale.
 * @param locale edition used for labels and links
 * @returns the home-page Han labels in the selected script
 */
export function homeHan(locale: Locale): HomeHan {
  return HAN[locale];
}

/**
 * A solar term's name in the locale's script; the almanac spells it simplified.
 * @param cjk solar-term name in simplified Chinese
 * @param locale edition used for labels and links
 * @returns the solar-term name in the selected Han script
 */
export function termHanFor(cjk: string, locale: Locale): string {
  return hanFor(traditionalTermName(cjk), locale);
}

/**
 * A channel's Han name from its organ: 胃 → 胃經; the vessels (督脈, 任脈) stand as they are.
 * @param organ channel organ name or vessel name in Han characters
 * @param locale edition used for labels and links
 * @returns the channel name with its suffix, preserving vessel names
 */
export function channelHanzi(organ: string, locale: Locale): string {
  const han = HAN[locale];

  return hanFor(organ.endsWith('脈') ? organ : `${organ}${han.channelSuffix}`, locale);
}

/**
 * `lang` for Han text set inside a page of the given locale.
 * @param locale edition used for labels and links
 * @returns the Traditional Chinese language tag on English pages, otherwise undefined
 */
export function hanLang(locale: Locale): 'zh-Hant' | 'zh-Hans' | undefined {
  if (locale === 'en') {
    return 'zh-Hant';
  }

  return undefined;
}

const ORDINAL_SUFFIX: Readonly<Record<string, string>> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
};
const ORDINAL_RULES = new Intl.PluralRules('en', { type: 'ordinal' });

/**
 * English ordinal: 1st, 2nd, 3rd, 4th, 11th …
 * @param n number to format as an English ordinal
 * @returns the number followed by its English ordinal suffix
 */
export function ordinal(n: number): string {
  return `${n}${ORDINAL_SUFFIX[ORDINAL_RULES.select(n)] ?? 'th'}`;
}

/**
 * Replaces `{token}` placeholders in a template.
 * @param template text containing named {token} placeholders
 * @param values replacement strings or numbers keyed by placeholder name
 * @returns the template with known placeholders replaced and unknown ones preserved
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/gu, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Derives a simplified record from its traditional source, key by key.
 * @param source traditional Chinese strings keyed by copy identifier
 * @returns a copy of the record with each string converted to simplified Chinese
 */
function simplify<K extends string>(source: Readonly<Record<K, string>>): Record<K, string> {
  const out: Record<K, string> = { ...source };
  for (const key in source) {
    out[key] = toSimplified(source[key]);
  }

  return out;
}
