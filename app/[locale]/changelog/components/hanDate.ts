const MAX_HAN_DAY = 99;
const DECIMAL_BASE = 10;

/**
 * Han numerals for the printing record: counts past twenty (edition marks),
 * and dates set the way a colophon prints them, 二〇二六年八月二十六日.
 */

const DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'] as const;

/**
 * Han count for 1–99 (一 … 十 … 二十六 … 九十九); Arabic numerals beyond.
 * @param n integer to write in Han numerals
 * @returns the Han count, or the original number outside the supported range
 */
export function hanCount(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > MAX_HAN_DAY) {
    return String(n);
  }
  const tens = Math.floor(n / DECIMAL_BASE);
  const units = n % DECIMAL_BASE;
  if (tens === 0) {
    return DIGITS[units];
  }
  const head = tens === 1 ? '' : DIGITS[tens];

  return `${head}十${units ? DIGITS[units] : ''}`;
}

/**
 * Colophon date for an ISO `YYYY-MM-DD` string: year digit by digit, month and day counted.
 * @param iso calendar date in ISO form
 * @returns the date with a digit-by-digit Han year and counted month and day
 */
export function hanDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  const yearHan = [...year].map((digit) => DIGITS[Number(digit)]).join('');

  return `${yearHan}年${hanCount(Number(month))}月${hanCount(Number(day))}日`;
}
