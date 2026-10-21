import { ALMANAC_DEFAULT, ALMANAC_ROTATION, SOLAR_TERMS } from '@/content/almanac';

import type { SolarTerm } from '@/content/almanac';

/** ISO date substring length for curated calendar entries. */
const CALENDAR_LIMITS = {
  ISO_DATE_LENGTH: 10,
} as const;

/**
 * choose the active solar term using the UTC calendar date.
 * @param date calendar instant to inspect.
 * @returns the solar term active on the UTC calendar date.
 */
export function getSolarTermForDate(date: Date): SolarTerm {
  const mmdd = `${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
    date.getUTCDate(),
  ).padStart(2, '0')}`;
  const sorted = [...SOLAR_TERMS].sort((a, b) => a.startMonthDay.localeCompare(b.startMonthDay));
  let active: SolarTerm = sorted[sorted.length - 1];
  for (const term of sorted) {
    if (term.startMonthDay <= mmdd) {
      active = term;
    }
  }
  if (mmdd < sorted[0].startMonthDay) {
    active = SOLAR_TERMS.find((t) => t.cjk === '大寒') ?? active;
  }

  return active;
}

export interface AlmanacEntry {
  solarTerm: SolarTerm;
  pointCode: string;
  blurb: string;
  ritual: string;
  dateIso: string;
}

/**
 * combine the current solar term with its curated reading.
 * @param date calendar instant to inspect.
 * @returns the solar term and its curated reading, condition, and point.
 */
export function getAlmanacEntry(date: Date): AlmanacEntry {
  const solarTerm = getSolarTermForDate(date);
  const curated = ALMANAC_ROTATION.find((e) => e.termIndex === solarTerm.index);
  const base = curated ?? ALMANAC_DEFAULT;

  return {
    solarTerm,
    pointCode: base.pointCode,
    blurb: base.blurb,
    ritual: base.ritual,
    dateIso: date.toISOString().slice(0, CALENDAR_LIMITS.ISO_DATE_LENGTH),
  };
}
