/**
 * The fourteen volumes (卷) of the book: one per classical channel, in the
 * traditional order the catalogue already follows. Pure lookups over the
 * registry and catalogue — no new facts, only the standard channel names
 * the boards print on every leaf.
 */

import { catalogue } from '@/content/catalog';
import { pointByCode } from '@/content/points';

import type { AnyPoint, CataloguePoint, MeridianSlug } from '@/content/schemas';

const MAX_HAN_NUMBER = 99;
const DECIMAL_BASE = 10;

/** One channel volume of the book. */
export interface Volume {
  slug: MeridianSlug;
  /** 1-based position in the traditional order. */
  order: number;
  /** Full classical channel name in traditional characters (手太陰肺經). */
  han: string;
  /** English limb-and-channel name ("Hand Taiyin"). */
  channel: string;
  /** English organ or vessel name the channel belongs to ("Lung", "Du"). */
  organ: string;
  /** Single character pressed into the volume seal. */
  glyph: string;
}

/** Where a leaf sits in its volume. */
export interface LeafPosition {
  volume: Volume;
  /** 1-based leaf number inside the volume. */
  index: number;
  total: number;
  /** Every code in the volume, in order (for the position dots). */
  codes: string[];
  prev?: AnyPoint;
  next?: AnyPoint;
}

/** The fourteen volumes in the traditional order. */
export const VOLUMES: readonly Volume[] = [
  { slug: 'lung', order: 1, han: '手太陰肺經', channel: 'Hand Taiyin', organ: 'Lung', glyph: '肺' },
  {
    slug: 'large-intestine',
    order: 2,
    han: '手陽明大腸經',
    channel: 'Hand Yangming',
    organ: 'Large Intestine',
    glyph: '腸',
  },
  {
    slug: 'stomach',
    order: 3,
    han: '足陽明胃經',
    channel: 'Foot Yangming',
    organ: 'Stomach',
    glyph: '胃',
  },
  {
    slug: 'spleen',
    order: 4,
    han: '足太陰脾經',
    channel: 'Foot Taiyin',
    organ: 'Spleen',
    glyph: '脾',
  },
  {
    slug: 'heart',
    order: 5,
    han: '手少陰心經',
    channel: 'Hand Shaoyin',
    organ: 'Heart',
    glyph: '心',
  },
  {
    slug: 'small-intestine',
    order: 6,
    han: '手太陽小腸經',
    channel: 'Hand Taiyang',
    organ: 'Small Intestine',
    glyph: '小',
  },
  {
    slug: 'bladder',
    order: 7,
    han: '足太陽膀胱經',
    channel: 'Foot Taiyang',
    organ: 'Bladder',
    glyph: '膀',
  },
  {
    slug: 'kidney',
    order: 8,
    han: '足少陰腎經',
    channel: 'Foot Shaoyin',
    organ: 'Kidney',
    glyph: '腎',
  },
  {
    slug: 'pericardium',
    order: 9,
    han: '手厥陰心包經',
    channel: 'Hand Jueyin',
    organ: 'Pericardium',
    glyph: '包',
  },
  {
    slug: 'san-jiao',
    order: 10,
    han: '手少陽三焦經',
    channel: 'Hand Shaoyang',
    organ: 'San Jiao',
    glyph: '焦',
  },
  {
    slug: 'gallbladder',
    order: 11,
    han: '足少陽膽經',
    channel: 'Foot Shaoyang',
    organ: 'Gallbladder',
    glyph: '膽',
  },
  {
    slug: 'liver',
    order: 12,
    han: '足厥陰肝經',
    channel: 'Foot Jueyin',
    organ: 'Liver',
    glyph: '肝',
  },
  { slug: 'du', order: 13, han: '督脈', channel: 'Governing Vessel', organ: 'Du', glyph: '督' },
  { slug: 'ren', order: 14, han: '任脈', channel: 'Conception Vessel', organ: 'Ren', glyph: '任' },
];

const DIGITS = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'] as const;

/**
 * Han numeral for 1–99 (四, 十四, 六十七); Arabic beyond.
 * @param n count to express
 * @returns the Han numeral or numeric fallback
 */
export function hanNumber(n: number): string {
  if (n < 1 || n > MAX_HAN_NUMBER || !Number.isInteger(n)) {
    return String(n);
  }
  const tens = Math.floor(n / DECIMAL_BASE);
  const ones = n % DECIMAL_BASE;
  if (tens === 0) {
    return DIGITS[ones];
  }

  return `${tens === 1 ? '' : DIGITS[tens]}十${DIGITS[ones]}`;
}

/**
 * The volume a channel slug belongs to; undefined for extra points.
 * @param slug registry key to look up
 * @returns the matching canonical volume, when available
 */
export function volumeOf(slug: string): Volume | undefined {
  return VOLUMES.find((v) => v.slug === slug);
}

/**
 * Catalogue leaves of one volume, in point-number order.
 * @param slug registry key to look up
 * @returns the catalog entries in channel order
 */
export function volumeLeaves(slug: MeridianSlug): CataloguePoint[] {
  return catalogue.filter((p) => p.meridian === slug);
}

/**
 * Position of a point inside its volume; undefined for points outside the fourteen.
 * @param code catalog identifier
 * @returns the volume position and neighboring identifiers
 */
export function leafPosition(code: string): LeafPosition | undefined {
  const wanted = code.toUpperCase();
  const entry = catalogue.find((p) => p.code === wanted);
  const volume = entry ? volumeOf(entry.meridian) : undefined;
  if (!entry || !volume) {
    return undefined;
  }
  const leaves = volumeLeaves(volume.slug);
  const at = leaves.findIndex((p) => p.code === wanted);
  const prevCode = leaves[at - 1]?.code;
  const nextCode = leaves[at + 1]?.code;

  return {
    volume,
    index: at + 1,
    total: leaves.length,
    codes: leaves.map((p) => p.code),
    prev: prevCode ? pointByCode(prevCode) : undefined,
    next: nextCode ? pointByCode(nextCode) : undefined,
  };
}

/**
 * The compiled catalogue record behind a code (actions, cautions, number).
 * @param code catalog identifier
 * @returns the catalog record matching the identifier
 */
export function catalogueEntry(code: string): CataloguePoint | undefined {
  const wanted = code.toUpperCase();

  return catalogue.find((p) => p.code === wanted);
}

/**
 * Two characters for a seal face, taken from the point's Han name.
 * @param hanzi Han name to display
 * @returns the pair of characters for the seal
 */
export function sealGlyphs(hanzi: string): [string, string] {
  const chars = Array.from(hanzi);

  return [chars.at(0) ?? '穴', chars.at(1) ?? chars.at(0) ?? '穴'];
}
