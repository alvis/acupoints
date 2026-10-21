/**
 * Read-only helpers that shape registry content for the Learn pages: reading
 * times, the point codes a guide names, publication state, and the Han labels
 * that sit beside each entry. Every value is derived from content already in
 * the repo; nothing here authors prose.
 */

import { pointByCode } from '@/content/points';
import { armText } from '@/utilities/i18n/t2s';

import type { EditorialArm, EditorialHubModule } from '@/content/editorial/schema';
import type { Locale } from '@/utilities/routes';

import type { LearnCopy } from './copy';

/** Han label and optional pinyin beside a glossary headword. */
export interface TermHan {
  zh: string;
  pinyin?: string;
}

/** A point a guide names, resolved against the registry. */
export interface NamedPoint {
  code: string;
  name: string;
  pinyin: string;
  hanzi: string;
  /** True when the registry records the point as unsafe during pregnancy. */
  avoidInPregnancy: boolean;
}

/** What sort of guide a journal post is, for its kicker. */
export type JournalKind = 'routine' | 'locating' | 'primer' | 'sensation';

/** Main headline and optional subtitle of a "Main: Subtitle" title. */
export interface SplitTitle {
  main: string;
  sub?: string;
}

/**
 * Han topic tag and kind per journal slug, as the Learn and Journal boards
 * set them beside each guide. Each tag names the guide's own subject.
 */
const JOURNAL_TAG: Readonly<Record<string, { han: string; kind: JournalKind } | undefined>> = {
  'cycle-comfort-routine': { han: '經期', kind: 'routine' },
  'steadier-anxious-days': { han: '安神', kind: 'routine' },
  'motion-sickness-on-the-road': { han: '暈車', kind: 'routine' },
  'wind-down-for-sleep': { han: '安眠', kind: 'routine' },
  'tension-headache-toolkit': { han: '頭痛', kind: 'routine' },
  'pressure-not-needles': { han: '按壓', kind: 'primer' },
  'what-de-qi-feels-like': { han: '得氣', kind: 'sensation' },
  'measuring-with-cun': { han: '量寸', kind: 'locating' },
  'getting-started-with-acupressure': { han: '入門', kind: 'primer' },
  'desk-back-routine': { han: '腰背', kind: 'routine' },
};

/**
 * Han label per basics slug. Each word is the subject the article itself
 * names in its zh-hant arm (氣, 陰陽, 五行).
 */
const BASIC_HAN: Readonly<Record<string, string | undefined>> = {
  'what-is-qi': '氣',
  'yin-and-yang': '陰陽',
  'five-elements': '五行',
};

/**
 * Han headword per glossary slug, as written in the entry's zh-hant prose,
 * with its standard Hanyu Pinyin reading (glossary-cun, the de qi journal
 * guide's "Reading the Name: Dé Qì"; 原穴 reads yuán xué).
 */
const TERM_HAN: Readonly<Record<string, TermHan | undefined>> = {
  'cun': { zh: '寸', pinyin: 'cùn' },
  'de-qi': { zh: '得氣', pinyin: 'dé qì' },
  'yuan-source': { zh: '原穴', pinyin: 'yuán xué' },
};

/**
 * Traditional Chinese titles per prose-module key. The loader keeps one
 * (English) title per module, so the Chinese headline each article's zh-hant
 * arm is written under lives here; zh-cn derives its Simplified form.
 */
const TITLE_ZH: Readonly<Record<string, string | undefined>> = {
  'journal/cycle-comfort-routine': '經期舒緩：一套在家做的經痛按壓',
  'journal/desk-back-routine': '伏案者的腰背：五分鐘的按壓',
  'journal/getting-started-with-acupressure': '指壓入門',
  'journal/measuring-with-cun': '用自己的手量寸：同身寸',
  'journal/motion-sickness-on-the-road': '路上暈車：旅人的一套按壓',
  'journal/pressure-not-needles': '按壓，不用針：自我指壓是甚麼、不是甚麼',
  'journal/steadier-anxious-days': '安穩的日子：心神不安時的穴位',
  'journal/tension-headache-toolkit': '平常日子裡的緊張性頭痛：一套應對之法',
  'journal/what-de-qi-feels-like': '得氣是甚麼感覺：以及何時該停',
  'journal/wind-down-for-sleep': '無眠夜晚的一套放鬆儀式',
  'static/basics-five-elements': '五行',
  'static/basics-what-is-qi': '氣是甚麼？',
  'static/basics-yin-and-yang': '陰陽',
  'static/glossary-cun': '寸：身體自帶的尺',
  'static/glossary-de-qi': '得氣：氣到來的感覺',
  'static/glossary-yuan-source': '原穴：臟腑之窗',
};

/**
 * Title of a Learn module in the page's language: the authored Chinese
 * headline on zh pages when one exists, otherwise the module's own title.
 * @param key content lookup key
 * @param title display heading
 * @param locale page language and writing system
 * @returns the localized heading
 */
export function learnTitle(key: string, title: string, locale: Locale): string {
  const zh = locale === 'en' ? undefined : TITLE_ZH[key];

  return zh === undefined ? title : armText(zh, locale);
}

const EN_WORDS_PER_MINUTE = 220;
const ZH_CHARS_PER_MINUTE = 400;
const POINT_CODE = /\(([A-Z]{1,3}\d{1,2})\)/gu;

/**
 * Han label for a basics entry, in the locale's script.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @returns the Han label, when mapped
 */
export function basicHan(slug: string, locale: Locale): string | undefined {
  const zh = BASIC_HAN[slug];

  return zh === undefined ? undefined : armText(zh, locale);
}

/**
 * Han headword (and pinyin) for a glossary term, in the locale's script.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @returns the localized Han name and reading, when mapped
 */
export function termHan(slug: string, locale: Locale): TermHan | undefined {
  const han = TERM_HAN[slug];

  return han === undefined ? undefined : { ...han, zh: armText(han.zh, locale) };
}

/**
 * Han topic tag of a journal guide, in the locale's script.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @returns the localized category, when mapped
 */
export function journalTag(slug: string, locale: Locale): string | undefined {
  const tag = JOURNAL_TAG[slug];

  return tag === undefined ? undefined : armText(tag.han, locale);
}

/**
 * Kicker label for a journal guide's kind.
 * @param slug registry key to look up
 * @param copy localized interface strings
 * @returns the localized guide classification
 */
export function journalKindLabel(slug: string, copy: LearnCopy): string {
  const kind = JOURNAL_TAG[slug]?.kind ?? 'primer';
  const labels: Record<JournalKind, string> = {
    routine: copy.kindRoutine,
    locating: copy.kindLocating,
    primer: copy.kindPrimer,
    sensation: copy.kindSensation,
  };

  return labels[kind];
}

/**
 * Splits "Main: Subtitle" or "Main — Subtitle" at the first separator.
 * @param title display heading
 * @returns the leading title and optional subtitle
 */
export function splitTitle(title: string): SplitTitle {
  // Visit each punctuation mark or whitespace run only once. The sticky
  // matcher retains the separator's greedy whitespace and subtitle grammar.
  const firstLineBreak = title.search(/[\n\r\u2028\u2029]/u);
  const lastLineBreak = Math.max(
    ...['\n', '\r', '\u2028', '\u2029'].map((character) => title.lastIndexOf(character)),
  );
  const candidates = /:|：|(?<!\s)\s+—/gu;
  const separator = /(?::\s+|\s+—\s+|：)(?=.)/uy;
  for (const candidate of title.matchAll(candidates)) {
    const start = candidate.index === 0 && /\s/u.test(candidate[0]) ? 1 : candidate.index;
    if (start === 0) {
      continue;
    }
    if (firstLineBreak !== -1 && start > firstLineBreak) {
      break;
    }
    separator.lastIndex = start;
    const match = separator.exec(title);
    if (!match || separator.lastIndex <= lastLineBreak) {
      continue;
    }

    return { main: title.slice(0, start), sub: title.slice(separator.lastIndex) };
  }

  return { main: title };
}

/**
 * Sentences of a prose string, for ruled lists of limits.
 * @param text passage to process
 * @returns the punctuated passages
 */
export function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|(?<=[。！？])/u)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Reading time of a whole arm, in whole minutes at an easy pace.
 * @param arm localized editorial content
 * @param locale page language and writing system
 * @returns the rounded reading estimate
 */
export function readingMinutes(arm: EditorialArm, locale: Locale): number {
  return minutesFor([arm.summary, ...arm.sections.flatMap((s) => s.paragraphs)], locale);
}

/**
 * Reading time of the short read: the summary plus each section's opening paragraph.
 * @param arm localized editorial content
 * @param locale page language and writing system
 * @returns the rounded estimate for introductory content
 */
export function shortReadingMinutes(arm: EditorialArm, locale: Locale): number {
  return minutesFor([arm.summary, ...arm.sections.map((s) => s.paragraphs[0] ?? '')], locale);
}

/**
 * A post's publication date, falling back the way the post page's JSON-LD does.
 * @param post authored journal entry
 * @returns the publication date
 */
export function publishedOn(post: EditorialHubModule<'journal'>): Date {
  return post.publishedAt ?? post.updatedAt ?? post.lastReviewed;
}

/**
 * Journal posts, newest first.
 * @param posts journal entries to order
 * @returns entries ordered from newest to oldest
 */
export function newestFirst(
  posts: ReadonlyArray<EditorialHubModule<'journal'>>,
): Array<EditorialHubModule<'journal'>> {
  return [...posts].sort((a, b) => publishedOn(b).getTime() - publishedOn(a).getTime());
}

/**
 * Whether a post's publication date is still ahead of `now`.
 * @param post authored journal entry
 * @param now publication cutoff date
 * @returns whether publication follows the cutoff
 */
export function isForthcoming(post: EditorialHubModule<'journal'>, now: Date): boolean {
  return publishedOn(post).getTime() > now.getTime();
}

/**
 * Registry points a guide names in parentheses — "(SP6)" — in reading order,
 * deduplicated. Codes the registry does not know are skipped.
 * @param arm localized editorial content
 * @param locale page language and writing system
 * @returns catalog entries mentioned by the prose
 */
export function pointsNamedIn(arm: EditorialArm, locale: Locale): NamedPoint[] {
  return pointsInText(arm.sections.flatMap((s) => s.paragraphs).join('\n'), locale);
}

/**
 * Registry points named in parentheses in one passage, as {@link pointsNamedIn}.
 * @param text passage to process
 * @param locale page language and writing system
 * @returns catalog entries mentioned in the passage
 */
export function pointsInText(text: string, locale: Locale): NamedPoint[] {
  const seen = new Set<string>();
  const out: NamedPoint[] = [];
  for (const match of text.matchAll(POINT_CODE)) {
    const code: string | undefined = match.at(1);
    if (code === undefined || seen.has(code)) {
      continue;
    }
    seen.add(code);
    const point = pointByCode(code);
    if (!point) {
      continue;
    }
    out.push({
      code: point.code,
      name: point.name,
      pinyin: point.pinyin,
      hanzi: armText(point.hanzi, locale),
      avoidInPregnancy: 'pregnancySafe' in point && point.pregnancySafe === false,
    });
  }

  return out;
}

/**
 * estimates reading time across prose passages
 * @param texts passages included in the reading estimate
 * @param locale page language and writing system
 * @returns the rounded reading estimate
 */
function minutesFor(texts: readonly string[], locale: Locale): number {
  const joined = texts.join(' ');
  const units =
    locale === 'en'
      ? joined.split(/\s+/u).filter(Boolean).length / EN_WORDS_PER_MINUTE
      : (joined.match(/[一-鿿]/gu)?.length ?? 0) / ZH_CHARS_PER_MINUTE;

  return Math.max(1, Math.round(units));
}
