/**
 * Channel (經) facts for the Woodblock channel pages, derived from the
 * registries in `@/content`: the fourteen meridians, every published point on
 * each, and the shared coordinate table. The only authored layer here is the
 * classical naming (hand/foot, yin–yang degree, interior–exterior partner),
 * which the meridian editorial prose describes channel by channel.
 */

import { isCataloguePoint } from '@/content/catalog';
import { meridians } from '@/content/meridians';
import { points } from '@/content/points';
import { hanNumeral } from '@/utilities/hanNumeral';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { toSimplified } from '@/utilities/i18n/t2s';

import type { ProseRegistry } from '@/content/pages';
import type { AnyPoint, Meridian } from '@/content/schemas';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

/** Classical naming of one of the twelve paired channels. */
interface PairedNaming {
  kind: 'paired';
  limb: 'hand' | 'foot';
  /** Yin–yang degree, e.g. 太陰 / Taiyin. */
  degreeZh: string;
  degreeEn: string;
  /** Organ word in the classical name, e.g. 大腸. */
  organZh: string;
  yin: boolean;
  /** Slug of the interior–exterior partner. */
  partner: string;
  /** Organ-clock watch (時辰) tradition assigns the channel, e.g. 卯. */
  watch: string;
  /** Hour the two-hour watch opens, 0–23 (卯 → 5). */
  watchStart: number;
}

/** Classical naming of one of the two midline vessels. */
interface VesselNaming {
  kind: 'vessel';
  /** Full Han name, e.g. 督脈. */
  zh: string;
  /** Side of the body the vessel climbs. */
  side: 'back' | 'front';
}

type ChannelNaming = PairedNaming | VesselNaming;

/** One meridian with everything the channel pages show about it. */
export interface Channel {
  meridian: Meridian;
  /** 1-based position in the canonical sequence (卷一 … 卷十四). */
  volume: number;
  /** canonical volume inscription */
  volumeZh: string;
  /** Code prefix used by its points, e.g. LI, TH, GV. */
  prefix: string;
  /** Full classical name, e.g. 手陽明大腸經 or 督脈. */
  fullZh: string;
  /** "Hand Yangming", or the vessel's English name. */
  subEn: string;
  /** "Hand Yangming · Large Intestine", or "Du (Governing Vessel)". */
  labelEn: string;
  naming: ChannelNaming;
  /** Every published point on the channel, in channel order. */
  points: AnyPoint[];
}

const HOURS_PER_DAY = 24;

const NAMING: Record<string, ChannelNaming> = {
  'lung': {
    kind: 'paired',
    limb: 'hand',
    degreeZh: '太陰',
    degreeEn: 'Taiyin',
    organZh: '肺',
    yin: true,
    partner: 'large-intestine',
    watch: '寅',
    watchStart: 3,
  },
  'large-intestine': {
    kind: 'paired',
    limb: 'hand',
    degreeZh: '陽明',
    degreeEn: 'Yangming',
    organZh: '大腸',
    yin: false,
    partner: 'lung',
    watch: '卯',
    watchStart: 5,
  },
  'stomach': {
    kind: 'paired',
    limb: 'foot',
    degreeZh: '陽明',
    degreeEn: 'Yangming',
    organZh: '胃',
    yin: false,
    partner: 'spleen',
    watch: '辰',
    watchStart: 7,
  },
  'spleen': {
    kind: 'paired',
    limb: 'foot',
    degreeZh: '太陰',
    degreeEn: 'Taiyin',
    organZh: '脾',
    yin: true,
    partner: 'stomach',
    watch: '巳',
    watchStart: 9,
  },
  'heart': {
    kind: 'paired',
    limb: 'hand',
    degreeZh: '少陰',
    degreeEn: 'Shaoyin',
    organZh: '心',
    yin: true,
    partner: 'small-intestine',
    watch: '午',
    watchStart: 11,
  },
  'small-intestine': {
    kind: 'paired',
    limb: 'hand',
    degreeZh: '太陽',
    degreeEn: 'Taiyang',
    organZh: '小腸',
    yin: false,
    partner: 'heart',
    watch: '未',
    watchStart: 13,
  },
  'bladder': {
    kind: 'paired',
    limb: 'foot',
    degreeZh: '太陽',
    degreeEn: 'Taiyang',
    organZh: '膀胱',
    yin: false,
    partner: 'kidney',
    watch: '申',
    watchStart: 15,
  },
  'kidney': {
    kind: 'paired',
    limb: 'foot',
    degreeZh: '少陰',
    degreeEn: 'Shaoyin',
    organZh: '腎',
    yin: true,
    partner: 'bladder',
    watch: '酉',
    watchStart: 17,
  },
  'pericardium': {
    kind: 'paired',
    limb: 'hand',
    degreeZh: '厥陰',
    degreeEn: 'Jueyin',
    organZh: '心包',
    yin: true,
    partner: 'san-jiao',
    watch: '戌',
    watchStart: 19,
  },
  'san-jiao': {
    kind: 'paired',
    limb: 'hand',
    degreeZh: '少陽',
    degreeEn: 'Shaoyang',
    organZh: '三焦',
    yin: false,
    partner: 'pericardium',
    watch: '亥',
    watchStart: 21,
  },
  'gallbladder': {
    kind: 'paired',
    limb: 'foot',
    degreeZh: '少陽',
    degreeEn: 'Shaoyang',
    organZh: '膽',
    yin: false,
    partner: 'liver',
    watch: '子',
    watchStart: 23,
  },
  'liver': {
    kind: 'paired',
    limb: 'foot',
    degreeZh: '厥陰',
    degreeEn: 'Jueyin',
    organZh: '肝',
    yin: true,
    partner: 'gallbladder',
    watch: '丑',
    watchStart: 1,
  },
  'du': { kind: 'vessel', zh: '督脈', side: 'back' },
  'ren': { kind: 'vessel', zh: '任脈', side: 'front' },
};

/** Five-phase labels for the element recorded on each meridian. */
export const PHASES: Record<Meridian['element'], Bilingual> = {
  metal: { zh: '金', en: 'Metal' },
  wood: { zh: '木', en: 'Wood' },
  water: { zh: '水', en: 'Water' },
  fire: { zh: '火', en: 'Fire' },
  earth: { zh: '土', en: 'Earth' },
};

/** The fourteen channels in canonical order. */
export const channels: readonly Channel[] = meridians.map(buildChannel);

/**
 * Channel by meridian slug.
 * @param slug the meridian slug identifying the chapter
 * @returns the matching channel, when registered
 */
export function channelBySlug(slug: string): Channel | undefined {
  return channels.find((c) => c.meridian.slug === slug);
}

/**
 * The channel's name as a locale reads it.
 * @param channel the channel with its classical names and ordered points
 * @param locale the page language and Han script
 * @returns the localized classical name
 */
export function channelName(channel: Channel, locale: Locale): string {
  return locale === 'en' ? channel.labelEn : hanFor(channel.fullZh, locale);
}

/**
 * One line saying where a point is. English pages read the catalogue's
 * WHO-style location; Chinese pages read the opening sentence of the point's
 * authored Chinese prose, which names the point and its place.
 * @param point catalog entry to describe
 * @param locale the page language and Han script
 * @param prose the loaded editorial registry for point names and locations
 * @returns the localized location passage
 */
export function pointWhere(point: AnyPoint, locale: Locale, prose: ProseRegistry): string {
  const location = isCataloguePoint(point) ? point.location : point.whoCoordinates;
  if (locale === 'en') {
    return location;
  }
  const summary = prose.pointByCode(point.code)?.zh.summary;

  return summary ? hanFor(firstSentence(summary), locale) : location;
}

/**
 * Opening sentence of a Chinese passage, through its first 。.
 * @param text passage to process
 * @returns the opening sentence including its punctuation
 */
export function firstSentence(text: string): string {
  const end = text.indexOf('。');

  return end > 0 ? text.slice(0, end + 1) : text;
}

/**
 * A point's Han name as the locale reads it. Catalogue entries record the
 * simplified form; their authored Chinese prose opens with the Traditional
 * name ("商陽，…"), which Traditional pages use when it matches.
 * @param point catalog entry to describe
 * @param locale the page language and Han script
 * @param prose the loaded editorial registry for point names and locations
 * @returns the name in the requested Han script
 */
export function pointHanzi(point: AnyPoint, locale: Locale, prose: ProseRegistry): string {
  if (locale === 'zh-cn') {
    return toSimplified(point.hanzi);
  }
  if (!isCataloguePoint(point)) {
    return point.hanzi;
  }
  const summary = prose.pointByCode(point.code)?.zh.summary ?? '';
  const lead = summary.slice(0, Math.max(summary.indexOf('，'), 0));

  return lead && toSimplified(lead) === toSimplified(point.hanzi) ? lead : point.hanzi;
}

/**
 * Numeric suffix of a point code (LI20 → 20).
 * @param code catalog identifier
 * @returns the numeric suffix, or zero when absent
 */
export function codeNumber(code: string): number {
  const match = /(?<!\d)(\d+)$/u.exec(code);

  return match ? Number(match[1]) : 0;
}

/**
 * combines a registry meridian with its classical names and points
 * @param meridian canonical meridian record
 * @param index zero-based position in the canonical sequence
 * @returns the meridian with its names and ordered points
 */
function buildChannel(meridian: Meridian, index: number): Channel {
  const naming = NAMING[meridian.slug] ?? { kind: 'vessel', zh: meridian.hanzi, side: 'front' };
  const onChannel = points
    .filter((p) => p.meridian === meridian.slug)
    .sort((a, b) => codeNumber(a.code) - codeNumber(b.code));
  const prefix = onChannel[0]?.code.replace(/(?<!\d)\d+$/u, '') ?? '';
  if (naming.kind === 'paired') {
    const limbEn = naming.limb === 'hand' ? 'Hand' : 'Foot';
    const subEn = `${limbEn} ${naming.degreeEn}`;

    return {
      meridian,
      volume: index + 1,
      volumeZh: `卷${hanNumeral(index + 1)}`,
      prefix,
      fullZh: `${naming.limb === 'hand' ? '手' : '足'}${naming.degreeZh}${naming.organZh}經`,
      subEn,
      labelEn: `${subEn} · ${meridian.name}`,
      naming,
      points: onChannel,
    };
  }

  return {
    meridian,
    volume: index + 1,
    volumeZh: `卷${hanNumeral(index + 1)}`,
    prefix,
    fullZh: naming.zh,
    subEn: meridian.name,
    labelEn: meridian.name,
    naming,
    points: onChannel,
  };
}

/**
 * A two-hour watch as clock times: 5 → "05:00–07:00".
 * @param start the opening hour of the two-hour watch, from 0 to 23
 * @returns the formatted opening and closing times
 */
export function watchHours(start: number): string {
  const hh = (h: number): string => `${String(h % HOURS_PER_DAY).padStart(2, '0')}:00`;

  return `${hh(start)}–${hh(start + 2)}`;
}
