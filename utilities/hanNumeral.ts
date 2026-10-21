/** Han numerals for ordered lists of points and steps. */
export const HAN_NUMERALS = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
  '十六',
  '十七',
  '十八',
  '十九',
  '二十',
] as const;

/**
 * Han numeral for a 1-based index; falls back to Arabic past twenty.
 * @param n integer to display.
 * @returns the Han numeral, or decimal digits outside the supported range.
 */
export function hanNumeral(n: number): string {
  return HAN_NUMERALS[n - 1] ?? String(n);
}
