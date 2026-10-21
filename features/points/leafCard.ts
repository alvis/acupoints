/**
 * The authored leaf card (content/leaves) read in one page language: the
 * gloss and the Where / For / Press / Caution lines the boards print, plus
 * the press timing the English line states. zh-hant reads the card's own
 * Traditional text and zh-cn derives Simplified from it, so the two Chinese
 * trees never drift. Pure lookups — a point without a card returns undefined
 * and its page keeps the dataset lines.
 */

import { leafCardByCode } from '@/content/leaves';
import { toSimplified } from '@/utilities/i18n/t2s';

import type { LeafCard } from '@/content/leaves';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

const SECONDS_PER_MINUTE = 60;

/** A classical line on the point, with its place in the book. */
export interface LocalLeafQuote {
  /** The classical text in the page's script (Traditional on en and zh-hant). */
  han: string;
  /** The plain English rendering. */
  en: string;
  /** Book and chapter: Han in the page's script, and English. */
  source: { han: string; en: string };
}

/** How long and on which sides the press line says to press. */
export interface PressTiming {
  /** Seconds per side, when the English line states a duration. */
  seconds?: number;
  /** `both` when the line sends the reader to the other side too. */
  sides?: 'both';
  /**
   * False when the line opens by forbidding pressure ("Do not press: …",
   * "Never press …"): the leaf prints it, but offers no press-along.
   */
  pressable: boolean;
}

/** A leaf card in one page language. */
export interface LocalLeafCard {
  code: string;
  /** The English meaning of the name ("Joining Valley"). */
  gloss: string;
  where: string;
  /** Where it is in a few words, for the neighbouring-leaf cards. */
  place: string;
  for: string;
  press: string;
  caution?: string;
  quote?: LocalLeafQuote;
  /** Timing read from the English press line (any page language). */
  timing: PressTiming;
}

const NUMBER_WORDS: Readonly<Record<string, number>> = {
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  fifteen: 15,
  twenty: 20,
  thirty: 30,
  forty: 40,
  sixty: 60,
  ninety: 90,
};

const AMOUNT = String.raw`(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten|fifteen|twenty|thirty|forty|sixty|ninety)`;
const MINUTES = new RegExp(String.raw`\b${AMOUNT}\s+minutes?\b`, 'iu');
const SECONDS = new RegExp(String.raw`\b${AMOUNT}\s+seconds?\b`, 'iu');
const BREATHS = new RegExp(String.raw`\b${AMOUNT}\s+(?:slow\s+|deep\s+)?breaths?\b`, 'iu');
const DO_NOT_PRESS = /^\s*(?:do not|don['’]t|never)\s+press\b/iu;
const BOTH_SIDES =
  /\b(?:each|both)\s+(?:side|sides|hand|hands|arm|arms|leg|legs|foot|feet|ear|ears)\b/iu;
const OTHER_SIDE = /\bthe other\s+(?:side|hand|arm|leg|foot|ear)\b/iu;

/** Seconds one slow breath takes when a line counts breaths. */
const SECONDS_PER_BREATH = 10;

/**
 * The point's leaf card in the page language; undefined when none is authored yet.
 * @param code catalog identifier
 * @param locale page language and writing system
 * @returns the localized leaf content, when authored
 */
export function localLeafCard(code: string, locale: Locale): LocalLeafCard | undefined {
  const card = leafCardByCode(code);

  return card ? localise(card, locale) : undefined;
}

/**
 * Reads the press duration and sides from an English press line.
 * @param line authored bilingual line
 * @returns the parsed duration and side guidance
 */
export function pressTiming(line: string): PressTiming {
  const minutes = MINUTES.exec(line);
  const seconds = SECONDS.exec(line);
  const breaths = BREATHS.exec(line);
  const total = minutes
    ? amountOf(minutes[1]) * SECONDS_PER_MINUTE
    : seconds
      ? amountOf(seconds[1])
      : breaths
        ? amountOf(breaths[1]) * SECONDS_PER_BREATH
        : Number.NaN;

  return {
    ...(Number.isFinite(total) && total > 0 ? { seconds: total } : {}),
    ...(BOTH_SIDES.test(line) || OTHER_SIDE.test(line) ? { sides: 'both' as const } : {}),
    pressable: !DO_NOT_PRESS.test(line),
  };
}

/**
 * selects and converts bilingual leaf content
 * @param card authored bilingual leaf content
 * @param locale page language and writing system
 * @returns the leaf content in the page language
 */
function localise(card: LeafCard, locale: Locale): LocalLeafCard {
  const zh = (text: string): string => (locale === 'zh-cn' ? toSimplified(text) : text);
  const pick = (line: Bilingual): string => (locale === 'en' ? line.en : zh(line.zh));
  const quote = card.quote
    ? {
        han: zh(card.quote.han),
        en: card.quote.en,
        source: { han: zh(card.quote.source.han), en: card.quote.source.en },
      }
    : undefined;

  return {
    code: card.code,
    gloss: card.gloss,
    where: pick(card.where),
    place: pick(card.place),
    for: pick(card.for),
    press: pick(card.press),
    ...(card.caution ? { caution: pick(card.caution) } : {}),
    ...(quote ? { quote } : {}),
    timing: pressTiming(card.press.en),
  };
}

/**
 * interprets a digit sequence or English number word
 * @param token numeric word or digit sequence
 * @returns the numeric amount, or NaN for an unknown word
 */
function amountOf(token: string): number {
  const word = token.toLowerCase();

  return /^\d+$/u.test(word) ? Number(word) : (NUMBER_WORDS[word] ?? Number.NaN);
}
