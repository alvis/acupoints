/**
 * Interface microcopy for the Learn section (hub, basics, journal, glossary),
 * worded after the Woodblock boards. Prose comes from the content registries;
 * only chrome lives here. zh-hant is authored and zh-cn is derived from it,
 * matching the editorial arms. Server-only: it pulls in the t2s converter.
 */

import { hanNumeral } from '@/utilities/hanNumeral';
import { toSimplified } from '@/utilities/i18n/t2s';

import type { Locale } from '@/utilities/routes';

/** Learn-section chrome strings; `{name}` slots are filled with `fill` from ./fill. */
export interface LearnCopy {
  // shared
  home: string;
  breadcrumb: string;
  learn: string;
  basics: string;
  journal: string;
  glossary: string;
  homeHan: string;
  learnHan: string;
  basicsHan: string;
  journalHan: string;
  glossaryHan: string;
  minutesCap: string;
  readWord: string;
  sources: string;
  lastReviewed: string;
  stopBox: string;
  selfCareCap: string;
  notAdviceLine: string;
  avoidLine1: string;
  avoidLine2: string;
  comingSoon: string;
  comingText: string;
  rssFeed: string;
  changelog: string;
  askedFirst: string;
  // hub
  hubTitle: string;
  hubLede: string;
  startCta: string;
  journalCta: string;
  statBasicsValue: string;
  statJournalValue: string;
  statForthcoming: string;
  statGlossaryValue: string;
  statTone: string;
  statToneValue: string;
  notA: string;
  diagnosis: string;
  startHere: string;
  startNote: string;
  stopLabel: string;
  sectionsCount: string;
  read: string;
  readAria: string;
  journalHeading: string;
  journalNote: string;
  onTheBlock: string;
  outOn: string;
  glossaryHeading: string;
  wholeGlossary: string;
  routinesKicker: string;
  routinesHeading: string;
  routinesText: string;
  seeRoutines: string;
  routinesLimit: string;
  // journal index
  journalLede: string;
  journalEmpty: string;
  statGuides: string;
  statGuidesValue: string;
  statNewest: string;
  statPace: string;
  statPaceValue: string;
  alsoInLearn: string;
  basicsLinkText: string;
  glossaryLinkText: string;
  // basics article
  basicsKicker: string;
  fullMeta: string;
  shortMeta: string;
  partsCount: string;
  partsHeading: string;
  modeShortNote: string;
  modeFullNote: string;
  lengthGroup: string;
  shortButton: string;
  fullButton: string;
  markRead: string;
  markedRead: string;
  sealedLabel: string;
  partOf: string;
  stopN: string;
  nextStop: string;
  basicsNav: string;
  fromPart: string;
  yinYangLabel: string;
  yinYangCaption: string;
  hillLabel: string;
  hillYang: string;
  hillYin: string;
  hillTail: string;
  qiLabel: string;
  qiCaption: string;
  fiveLabel: string;
  fiveCaption: string;
  // journal post
  journalKicker: string;
  kindRoutine: string;
  kindLocating: string;
  kindPrimer: string;
  kindSensation: string;
  byline: string;
  reviewed: string;
  journalPartsHeading: string;
  journalPartsNote: string;
  relatedLeaves: string;
  moreJournal: string;
  pointsCap: string;
  openLeaf: string;
  leafArrow: string;
  measureCap: string;
  measureGroup: string;
  measureNote: string;
  // glossary
  glossaryKicker: string;
  glossaryLede: string;
  statTerms: string;
  statTermsValue: string;
  statGives: string;
  statGivesValue: string;
  statReadIn: string;
  readInLatin: string;
  lettersGroup: string;
  allLetters: string;
  letterLabel: string;
  letterLabelOne: string;
  letterEmpty: string;
  listAll: string;
  listLetter: string;
  termsGroup: string;
  greyed: string;
  moreToRead: string;
  basicsLeaves: string;
  faqLinkText: string;
  spine: string;
  letterPart: string;
  termOf: string;
  alsoLabel: string;
  means: string;
  inOneLine: string;
  meetIt: string;
  seeAlso: string;
  relatedGroup: string;
  askedOften: string;
  readWhole: string;
  readWholeAria: string;
  exampleAria: string;
  entryHeading: string;
}

const EN_WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
];

const en: LearnCopy = {
  home: 'Home',
  breadcrumb: 'Breadcrumb',
  learn: 'Learn',
  basics: 'Basics',
  journal: 'Journal',
  glossary: 'Glossary',
  homeHan: '首頁',
  learnHan: '學',
  basicsHan: '基礎',
  journalHan: '日誌',
  glossaryHan: '詞彙',
  minutesCap: '{min} MIN',
  readWord: 'read',
  sources: 'Sources',
  lastReviewed: 'Last reviewed {date}',
  stopBox: 'Stop, or ask first',
  selfCareCap: 'Self-care limits',
  notAdviceLine: 'Educational reading. Not a diagnosis, and not a substitute for care.',
  avoidLine1: 'not in',
  avoidLine2: 'pregnancy',
  comingSoon: '{label} · coming soon',
  comingText:
    'This entry is on our near-term roadmap. We publish in small, carefully reviewed batches so each page stays dense and accurate. Follow the RSS feed or check the changelog for updates.',
  rssFeed: 'RSS feed',
  changelog: 'Changelog',
  askedFirst: 'Asked first',
  hubTitle: 'Learn to read the chart',
  hubLede:
    '{n} short basics to start, then the journal: plain guides to finding and pressing points, each one a few minutes long.',
  startCta: 'Start with stop one →',
  journalCta: 'Go to the journal',
  statBasicsValue: '{n} leaves, about {min} minutes',
  statJournalValue: '{n} guides',
  statForthcoming: ', {m} more on the block',
  statGlossaryValue: 'Words you meet on every leaf',
  statTone: 'Tone',
  statToneValue: 'Tradition, told plainly.',
  notA: 'not a',
  diagnosis: 'diagnosis',
  startHere: 'Start here',
  startNote: '{n} stops, about {min} minutes, in this order.',
  stopLabel: 'Stop {n} · {min} min read',
  sectionsCount: '{n} short sections',
  read: 'Read →',
  readAria: 'Read {title}',
  journalHeading: 'The journal',
  journalNote: 'Newest first · reading times at an easy pace',
  onTheBlock: 'on the block',
  outOn: 'Out {date}.',
  glossaryHeading: 'Words on every leaf',
  wholeGlossary: 'Whole glossary →',
  routinesKicker: 'Routines',
  routinesHeading: 'Press a set, in order',
  routinesText:
    'Step-by-step sets with a timer for each point. The first sets are still on the block; until they land, these guides walk you through a routine:',
  seeRoutines: 'See routines →',
  routinesLimit: 'Firm but comfortable. Stop on anything sharp, electric or radiating.',
  journalLede:
    'Plain guides to finding and pressing points, from the {site} editorial team. Each one takes a few minutes and ends with its limits.',
  journalEmpty: 'No journal posts published yet. The first essays are in review.',
  statGuides: 'Guides',
  statGuidesValue: '{n} published',
  statNewest: 'Newest',
  statPace: 'Reading',
  statPaceValue: 'Times at an easy pace',
  alsoInLearn: 'Also in Learn',
  basicsLinkText: 'The basics, in {n} short leaves',
  glossaryLinkText: 'The glossary: words on every leaf',
  basicsKicker: 'Basics · stop {n} of {total}',
  fullMeta: 'full',
  shortMeta: 'short',
  partsCount: '{n} parts',
  partsHeading: 'In {n} parts',
  modeShortNote: '{min}-minute read: the opening of each part',
  modeFullNote: 'Full article, about {min} minutes',
  lengthGroup: 'Reading length',
  shortButton: '{min}-minute read',
  fullButton: 'Full article',
  markRead: 'Mark as read',
  markedRead: 'Marked as read',
  sealedLabel: 'Sealed: marked as read',
  partOf: '{i} of {n}',
  stopN: 'Stop {n}',
  nextStop: 'Next: {title}',
  basicsNav: 'Basics, in order',
  fromPart: 'From part {n},',
  yinYangLabel:
    'Carved yin-yang circle: a dark half and a light half curling into each other, each holding a small dot of the other',
  yinYangCaption: 'One circle, two halves: each half holds a seed of the other.',
  hillLabel:
    'A hill with the sun on the left: the sunlit face is marked yang, the shaded slope, hatched, is marked yin',
  hillYang: 'the sunlit face',
  hillYin: 'the shady slope',
  hillTail: 'One hill, both weathers at once.',
  qiLabel: 'The character for qi, carved inside a ticked ring',
  qiCaption: 'One word, carved in a ring: the body’s capacity for movement and change.',
  fiveLabel:
    'Five cinnabar discs on a carved ring, wood at the top, then fire, earth, metal and water',
  fiveCaption: 'Wood, fire, earth, metal, water: the five phases in their generating order.',
  journalKicker: 'Journal · {kind}',
  kindRoutine: 'a routine',
  kindLocating: 'a guide to locating',
  kindPrimer: 'a primer',
  kindSensation: 'a guide to sensation',
  byline: 'By the {site} editors',
  reviewed: 'Reviewed',
  journalPartsHeading: '{n} short parts',
  journalPartsNote: 'One idea each.',
  relatedLeaves: 'Related leaves',
  moreJournal: 'More from the journal',
  pointsCap: 'From the chart',
  openLeaf: 'Open the {code} leaf →',
  leafArrow: 'leaf →',
  measureCap: 'Show a measure',
  measureGroup: 'Choose a finger measure',
  measureNote:
    'Your hands scale with your frame, so large or small, your own fingers land on your own points.',
  glossaryKicker: 'Words the leaves use',
  glossaryLede:
    'Short, plain definitions for the words you meet on the leaves. Each term has its own page; this leaf gives the gist in a minute.',
  statTerms: 'Terms',
  statTermsValue: '{n} in this edition',
  statGives: 'Each gives',
  statGivesValue: 'Chinese, pinyin, one line',
  statReadIn: 'Read in',
  readInLatin: 'English',
  lettersGroup: 'Jump to a letter',
  allLetters: 'All',
  letterLabel: '{ch}, {n} terms',
  letterLabelOne: '{ch}, 1 term',
  letterEmpty: '{ch}, no terms yet',
  listAll: 'All {n} terms, A to Z',
  listLetter: '{n} under {ch}',
  termsGroup: 'Terms',
  greyed: 'Greyed letters have no term yet.',
  moreToRead: 'More to read',
  basicsLeaves: 'The basics, in {n} short leaves',
  faqLinkText: 'Questions people ask',
  spine: '經穴圖 · 詞彙',
  letterPart: '{ch}部',
  termOf: '{ch} · term {i} of {n}',
  alsoLabel: 'Also:',
  means: 'Means',
  inOneLine: 'In one line',
  meetIt: 'Meet it',
  seeAlso: 'See also',
  relatedGroup: 'Related terms',
  askedOften: 'Asked often',
  readWhole: 'Read the whole entry →',
  readWholeAria: 'Read the whole entry for {term}',
  exampleAria: '{name}, {code}: open the leaf',
  entryHeading: 'The whole entry, in {n} parts',
};

const zhHant: LearnCopy = {
  home: '首頁',
  breadcrumb: '導覽路徑',
  learn: '學習',
  basics: '基礎',
  journal: '札記',
  glossary: '詞彙',
  homeHan: '首頁',
  learnHan: '學',
  basicsHan: '基礎',
  journalHan: '札記',
  glossaryHan: '詞彙',
  minutesCap: '{min} 分鐘',
  readWord: '閱讀',
  sources: '出處',
  lastReviewed: '最後審閱 {date}',
  stopBox: '停，或先問',
  selfCareCap: '自我照護的界限',
  notAdviceLine: '僅供教育閱讀。並非診斷，也不能代替就醫。',
  avoidLine1: '孕期',
  avoidLine2: '不宜',
  comingSoon: '{label} · 即將推出',
  comingText:
    '本條目已列入近期計劃。我們以小批量、經仔細審閱的方式發佈，確保每頁內容紮實準確。請訂閱 RSS 或查看更新記錄。',
  rssFeed: 'RSS 訂閱',
  changelog: '更新記錄',
  askedFirst: '先問',
  hubTitle: '學會讀這部圖',
  hubLede: '先讀 {n} 篇簡短的基礎，再讀札記：找穴與按壓的平實指南，每篇只需幾分鐘。',
  startCta: '從第一站開始 →',
  journalCta: '前往札記',
  statBasicsValue: '{n} 篇，約 {min} 分鐘',
  statJournalValue: '{n} 篇指南',
  statForthcoming: '，另有 {m} 篇刻版中',
  statGlossaryValue: '每頁都會遇到的詞',
  statTone: '語氣',
  statToneValue: '傳統，平實道來。',
  notA: '並非',
  diagnosis: '診斷',
  startHere: '從這裡開始',
  startNote: '共{n}站，約 {min} 分鐘，依序閱讀。',
  stopLabel: '第{n}站 · 約 {min} 分鐘',
  sectionsCount: '{n} 個短節',
  read: '閱讀 →',
  readAria: '閱讀：{title}',
  journalHeading: '札記',
  journalNote: '最新在前 · 以從容的速度估算閱讀時間',
  onTheBlock: '刻版中',
  outOn: '{date} 刊出。',
  glossaryHeading: '頁頁可見的詞',
  wholeGlossary: '完整詞彙 →',
  routinesKicker: '套組',
  routinesHeading: '依序按一組',
  routinesText: '逐點計時的分步套組。第一批仍在刻版中；在那之前，這幾篇指南會帶你走完一套：',
  seeRoutines: '查看套組 →',
  routinesLimit: '力度穩而舒適。出現尖銳、麻電或放射感即停。',
  journalLede: '{site} 編輯團隊撰寫的找穴與按壓平實指南。每篇只需幾分鐘，並以界限作結。',
  journalEmpty: '札記尚未刊出。第一批文章正在審閱中。',
  statGuides: '指南',
  statGuidesValue: '已刊出 {n} 篇',
  statNewest: '最新',
  statPace: '閱讀',
  statPaceValue: '以從容的速度估算',
  alsoInLearn: '學習的其他部分',
  basicsLinkText: '基礎，共 {n} 篇短文',
  glossaryLinkText: '詞彙：每頁都會遇到的詞',
  basicsKicker: '基礎 · 第{n}站，共{total}站',
  fullMeta: '全文',
  shortMeta: '速讀',
  partsCount: '共{n}節',
  partsHeading: '分{n}節',
  modeShortNote: '{min} 分鐘速讀：每節的開頭段落',
  modeFullNote: '全文，約 {min} 分鐘',
  lengthGroup: '閱讀長度',
  shortButton: '{min} 分鐘速讀',
  fullButton: '全文',
  markRead: '標為已讀',
  markedRead: '已讀',
  sealedLabel: '已鈐印：已讀',
  partOf: '第 {i} / {n} 節',
  stopN: '第{n}站',
  nextStop: '下一站：{title}',
  basicsNav: '基礎，依序',
  fromPart: '出自第{n}節，',
  yinYangLabel: '刻版陰陽圖：一黑一白兩半相互迴旋，各含對方的一點',
  yinYangCaption: '一圓兩半：每一半都藏著對方的種子。',
  hillLabel: '一座山，太陽在左：向陽的一面標作陽，背陰的斜坡以排線刻出，標作陰',
  hillYang: '向陽的一面',
  hillYin: '背陰的山坡',
  hillTail: '同一座山，同時有兩種天氣。',
  qiLabel: '刻在刻度圓環中的“氣”字',
  qiCaption: '一個字，刻在圓環裡：身體運動與變化的能力。',
  fiveLabel: '刻版圓環上的五個朱砂圓，木在頂端，其後為火、土、金、水',
  fiveCaption: '木、火、土、金、水：依相生次序排列的五行。',
  journalKicker: '{kind}',
  kindRoutine: '一套功課',
  kindLocating: '取穴指南',
  kindPrimer: '入門',
  kindSensation: '感覺指南',
  byline: '{site} 編輯部',
  reviewed: '審閱',
  journalPartsHeading: '{n}則短篇',
  journalPartsNote: '每則一個要點。',
  relatedLeaves: '相關穴頁',
  moreJournal: '更多札記',
  pointsCap: '取自穴圖',
  openLeaf: '打開 {code} 穴頁 →',
  leafArrow: '穴頁 →',
  measureCap: '選一個寸法',
  measureGroup: '選擇指寸',
  measureNote: '手隨身形而長，無論高矮，用自己的手指就能落在自己的穴位上。',
  glossaryKicker: '頁面上的用詞',
  glossaryLede:
    '為頁面上常見的詞彙作簡短平實的解釋。每個詞都有自己的頁面；這一頁讓你一分鐘掌握大意。',
  statTerms: '詞條',
  statTermsValue: '本版收 {n} 個',
  statGives: '每條提供',
  statGivesValue: '中文、拼音、一句話',
  statReadIn: '語言',
  readInLatin: '英文',
  lettersGroup: '按字母跳轉',
  allLetters: '全部',
  letterLabel: '{ch}，{n} 個詞',
  letterLabelOne: '{ch}，1 個詞',
  letterEmpty: '{ch}，尚無詞條',
  listAll: '全部 {n} 個詞，A 至 Z',
  listLetter: '{ch} 部 {n} 個',
  termsGroup: '詞條',
  greyed: '灰色字母尚無詞條。',
  moreToRead: '延伸閱讀',
  basicsLeaves: '基礎，共 {n} 篇短文',
  faqLinkText: '常見問題',
  spine: '經穴圖 · 詞彙',
  letterPart: '{ch}部',
  termOf: '{ch} · 第 {i} / {n} 詞',
  alsoLabel: '又作：',
  means: '釋義',
  inOneLine: '一句話',
  meetIt: '在哪裡見到',
  seeAlso: '參見',
  relatedGroup: '相關詞條',
  askedOften: '常問',
  readWhole: '閱讀完整詞條 →',
  readWholeAria: '閱讀「{term}」的完整詞條',
  exampleAria: '{name}，{code}：打開穴頁',
  entryHeading: '完整詞條，分{n}節',
};

const BY_LOCALE: Record<Locale, LearnCopy> = {
  en,
  'zh-hant': zhHant,
  'zh-cn': simplify(zhHant),
};

/**
 * Learn-section chrome for one locale.
 * @param locale page language and writing system
 * @returns localized learning-area strings
 */
export function learnCopy(locale: Locale): LearnCopy {
  return BY_LOCALE[locale];
}

/**
 * A small count as the boards write it: an English word ("six", or "Six"
 * when `capital`), or a Han numeral on the Chinese locales.
 * @param n count to express
 * @param locale page language and writing system
 * @param capital whether to capitalize the English count
 * @returns the localized count
 */
export function countWord(n: number, locale: Locale, capital = false): string {
  if (locale !== 'en') {
    return hanNumeral(n);
  }
  const word = EN_WORDS[n] ?? String(n);

  return capital ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : word;
}

/**
 * Derives the simplified chrome from the authored traditional strings.
 * @param copy localized interface strings
 * @returns the interface strings in simplified Chinese
 */
function simplify(copy: LearnCopy): LearnCopy {
  const out: LearnCopy = { ...copy };
  for (const key of Object.keys(out) as Array<keyof LearnCopy>) {
    out[key] = toSimplified(copy[key]);
  }

  return out;
}
