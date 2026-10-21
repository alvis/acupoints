/** calendar units and day-key field widths. */
const CALENDAR_LIMITS = {
  YEAR_DIGITS: 4,
  MILLISECONDS_PER_DAY: 86_400_000,
} as const;
/**
 * Calendar arithmetic for dated seals. A day is the reader's own local
 * calendar day, written `YYYY-MM-DD`, so a leaf sealed at 23:50 counts for
 * that evening wherever the reader is.
 */

/** One square of the reading calendar. */
export interface ReadingDay {
  /** Local calendar day, `YYYY-MM-DD`. */
  day: string;
  /** Whether at least one leaf was sealed that day. */
  read: boolean;
}

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;

/**
 * Whether the value is a `YYYY-MM-DD` day key.
 * @param value the candidate calendar day key.
 * @returns whether the value matches the calendar day-key format.
 */
export function isDayKey(value: unknown): value is string {
  return typeof value === 'string' && DAY_PATTERN.test(value);
}

/**
 * The local calendar day of `date`, as `YYYY-MM-DD`.
 * @param date calendar instant to inspect.
 * @returns the date's local calendar day as YYYY-MM-DD.
 */
export function localDayKey(date: Date): string {
  const y = String(date.getFullYear()).padStart(CALENDAR_LIMITS.YEAR_DIGITS, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
}

/**
 * Local midnight of a `YYYY-MM-DD` day.
 * @param day the local calendar day as YYYY-MM-DD.
 * @returns the local midnight represented by the day key.
 */
export function dayToDate(day: string): Date {
  const [y, m, d] = day.split('-').map(Number);

  return new Date(y, m - 1, d);
}

/**
 * The day `offset` calendar days after `day` (negative goes back).
 * @param day the local calendar day as YYYY-MM-DD.
 * @param offset the signed number of calendar days to shift.
 * @returns the day key offset by the requested number of calendar days.
 */
export function shiftDay(day: string, offset: number): string {
  const date = dayToDate(day);
  date.setDate(date.getDate() + offset);

  return localDayKey(date);
}

/**
 * Whole calendar days from `from` to `to` (positive when `to` is later).
 * @param from the first local calendar day.
 * @param to the second local calendar day.
 * @returns the signed calendar-day distance from the first day to the second.
 */
export function daysBetween(from: string, to: string): number {
  // Two local midnights can sit 23 or 25 hours apart across DST, so round.
  return Math.round(
    (dayToDate(to).getTime() - dayToDate(from).getTime()) / CALENDAR_LIMITS.MILLISECONDS_PER_DAY,
  );
}

/**
 * Consecutive local days with at least one seal, ending today or yesterday:
 * a streak survives until a whole day passes without a seal.
 * @param days calendar day recorded for each point.
 * @param today the current local day as YYYY-MM-DD.
 * @returns the consecutive reading-day count ending today or yesterday.
 */
export function sealStreak(days: Iterable<string>, today: string): number {
  const read = new Set(days);
  let day = read.has(today) ? today : shiftDay(today, -1);
  let streak = 0;
  while (read.has(day)) {
    streak += 1;
    day = shiftDay(day, -1);
  }

  return streak;
}

/**
 * The last `count` days ending today, oldest first, each marked read or not.
 * @param days calendar day recorded for each point.
 * @param today the current local day as YYYY-MM-DD.
 * @param count number of entries to return.
 * @returns the oldest-first day keys with a flag for whether each was read.
 */
export function readingDays(days: Iterable<string>, today: string, count: number): ReadingDay[] {
  const read = new Set(days);

  return Array.from({ length: count }, (_, i) => {
    const day = shiftDay(today, i - count + 1);

    return { day, read: read.has(day) };
  });
}
