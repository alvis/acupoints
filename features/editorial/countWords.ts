const ENGLISH_COUNTS = [
  'no',
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
] as const;

/**
 * Spells a small count as the boards do ("ten questions"); digits past twelve.
 * @param n count to express
 * @returns the English count or numeric spelling
 */
export function englishCount(n: number): string {
  return ENGLISH_COUNTS[n] ?? String(n);
}
