export interface SolarTerm {
  index: number;
  latin: string;
  cjk: string;
  /** ISO month-day at which this term *begins* (approx — solar-accurate is unnecessary for editorial use). */
  startMonthDay: string;
}

/** 24 solar terms with approximate start dates. */
export const SOLAR_TERMS: SolarTerm[] = [
  { index: 0, latin: 'Start of Spring', cjk: '立春', startMonthDay: '02-04' },
  { index: 1, latin: 'Rain Water', cjk: '雨水', startMonthDay: '02-19' },
  { index: 2, latin: 'Awakening of Insects', cjk: '惊蛰', startMonthDay: '03-06' },
  { index: 3, latin: 'Spring Equinox', cjk: '春分', startMonthDay: '03-21' },
  { index: 4, latin: 'Clear and Bright', cjk: '清明', startMonthDay: '04-05' },
  { index: 5, latin: 'Grain Rain', cjk: '谷雨', startMonthDay: '04-20' },
  { index: 6, latin: 'Start of Summer', cjk: '立夏', startMonthDay: '05-06' },
  { index: 7, latin: 'Grain Buds', cjk: '小满', startMonthDay: '05-21' },
  { index: 8, latin: 'Grain in Ear', cjk: '芒种', startMonthDay: '06-06' },
  { index: 9, latin: 'Summer Solstice', cjk: '夏至', startMonthDay: '06-21' },
  { index: 10, latin: 'Minor Heat', cjk: '小暑', startMonthDay: '07-07' },
  { index: 11, latin: 'Major Heat', cjk: '大暑', startMonthDay: '07-23' },
  { index: 12, latin: 'Start of Autumn', cjk: '立秋', startMonthDay: '08-08' },
  { index: 13, latin: 'Stopping of Heat', cjk: '处暑', startMonthDay: '08-23' },
  { index: 14, latin: 'White Dew', cjk: '白露', startMonthDay: '09-08' },
  { index: 15, latin: 'Autumn Equinox', cjk: '秋分', startMonthDay: '09-23' },
  { index: 16, latin: 'Cold Dew', cjk: '寒露', startMonthDay: '10-08' },
  { index: 17, latin: 'Frost Descent', cjk: '霜降', startMonthDay: '10-23' },
  { index: 18, latin: 'Start of Winter', cjk: '立冬', startMonthDay: '11-07' },
  { index: 19, latin: 'Minor Snow', cjk: '小雪', startMonthDay: '11-22' },
  { index: 20, latin: 'Major Snow', cjk: '大雪', startMonthDay: '12-07' },
  { index: 21, latin: 'Winter Solstice', cjk: '冬至', startMonthDay: '12-22' },
  { index: 22, latin: 'Minor Cold', cjk: '小寒', startMonthDay: '01-06' },
  { index: 23, latin: 'Major Cold', cjk: '大寒', startMonthDay: '01-20' },
];

/**
 * Traditional spellings of the five term names whose simplified `cjk` differs
 * (checked against the standard 二十四節氣 list); the other nineteen are
 * written alike in both scripts.
 */
const TRADITIONAL_TERM_NAMES: Readonly<Record<string, string>> = {
  惊蛰: '驚蟄',
  谷雨: '穀雨',
  小满: '小滿',
  芒种: '芒種',
  处暑: '處暑',
};

export interface AlmanacRotationEntry {
  termIndex: number;
  pointCode: string;
  blurb: string;
  ritual: string;
}

export const ALMANAC_ROTATION: AlmanacRotationEntry[] = [
  {
    termIndex: 5,
    pointCode: 'ST36',
    blurb:
      "Classical choice for digestive recovery as spring damp peaks — practitioners historically moxa'd ST36 in the week after Grain Rain.",
    ritual: 'Firm pressure on ST36 for 1 minute per leg, mid-morning, for five days.',
  },
  {
    termIndex: 4,
    pointCode: 'LV3',
    blurb:
      'Qingming (清明) invites clearing — LV3 helps release stagnant qi as the ground awakens.',
    ritual: 'Press LV3 gently for 30 seconds per foot before bed.',
  },
  {
    termIndex: 9,
    pointCode: 'HT7',
    blurb:
      'At Summer Solstice, the heart is at its most active — HT7 calms the shen as the day peaks.',
    ritual: 'Three slow breaths with thumb on HT7, each wrist, before sleep.',
  },
];

export const ALMANAC_DEFAULT: Omit<AlmanacRotationEntry, 'termIndex'> = {
  pointCode: 'LI4',
  blurb:
    "LI4 is the 'command point of the head and face' — a classical daily choice when no term-specific entry applies.",
  ritual: 'Firm pressure between thumb and index for 1 minute per hand.',
};

/**
 * A solar term's name in traditional script, the source Han pages convert from.
 * @param cjk the source Chinese solar-term name.
 * @returns the traditional solar-term name, or the supplied name when unmapped.
 */
export function traditionalTermName(cjk: string): string {
  return TRADITIONAL_TERM_NAMES[cjk] ?? cjk;
}
