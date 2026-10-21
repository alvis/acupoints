/**
 * Counts as the seal book says them: English spells small numbers out
 * ("Twelve days in a row", "Eleven to go") and gives ordinals ("9th"); the
 * Chinese pages write Han numerals (十二). Client-safe: no converter, no
 * catalogue, so live islands can phrase their own counts.
 */

import type { Locale } from '@/utilities/routes';

const MAX_HAN_NUMBER = 9999;

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
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
] as const;

const HAN_DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'] as const;
const HAN_UNITS = ['', '十', '百', '千'] as const;

const EN_ORDINAL: Readonly<Record<string, string>> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
};
const enOrdinals = new Intl.PluralRules('en', { type: 'ordinal' });

/**
 * A count in words where the page spells it: English words up to twenty,
 * then digits; Han numerals on the Chinese pages. `capital` starts an
 * English sentence ("Eleven to go").
 * @param n integer to display.
 * @param locale language used for text and routes.
 * @param capital whether to capitalize the first English letter.
 * @returns the localized count, with optional initial capitalization in English.
 */
export function countWord(n: number, locale: Locale, capital = false): string {
  if (locale !== 'en') {
    return hanNumeral(n);
  }
  const word = EN_WORDS[n] ?? String(n);

  return capital ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : word;
}

/**
 * "9th" in English; a Han numeral on the Chinese pages, whose templates carry 第.
 * @param n integer to display.
 * @param locale language used for text and routes.
 * @returns the English ordinal or Han number for the surrounding clause template.
 */
export function ordinal(n: number, locale: Locale): string {
  if (locale !== 'en') {
    return hanNumeral(n);
  }

  return `${n}${EN_ORDINAL[enOrdinals.select(n)] ?? 'th'}`;
}

/**
 * Han numeral for 0–9999 (十二, 一百零五); digits beyond.
 * @param n integer to display.
 * @returns the Han numeral, or decimal digits outside the supported range.
 */
export function hanNumeral(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > MAX_HAN_NUMBER) {
    return String(n);
  }
  if (n === 0) {
    return HAN_DIGITS[0];
  }
  const digits = String(n).split('').map(Number);
  let out = '';
  let gap = false;
  digits.forEach((digit, i) => {
    const unit = HAN_UNITS[digits.length - 1 - i];
    if (digit === 0) {
      gap = out !== '';

      return;
    }
    if (gap) {
      out += '零';
    }
    gap = false;
    // 十二, not 一十二, when ten leads the number.
    out += digit === 1 && unit === '十' && out === '' ? unit : `${HAN_DIGITS[digit]}${unit}`;
  });

  return out;
}
