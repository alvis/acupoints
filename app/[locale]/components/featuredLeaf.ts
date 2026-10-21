/**
 * Today's leaf (今日一葉): which point the home page features and the facts
 * its leaf shows. The election is the almanac's; the facts come from the
 * authored leaf card (content/leaves) when the point has one, else from the
 * point registry, the prose registry and the meridian table.
 *
 * SERVER ONLY: reads the prose registry from disk.
 */

import { catalogue, isCataloguePoint } from '@/content/catalog';
import { meridianBySlug } from '@/content/meridians';
import { loadProseRegistry } from '@/content/pages';
import { pointByCode } from '@/content/points';
import { localLeafCard } from '@/features/points/leafCard';
import { summaryForLocale } from '@/utilities/i18n/locale-text';

import type { AnyPoint, Meridian } from '@/content/schemas';
import type { LocalLeafCard } from '@/features/points/leafCard';
import type { AlmanacEntry } from '@/utilities/almanac';
import type { Locale } from '@/utilities/routes';

/** A curated hero tag; `warn` marks a caution. */
export interface FeaturedTag {
  label: string;
  tone?: 'neutral' | 'warn' | 'info';
}

/** Curated editorial copy for a featured point. */
export interface CuratedFeature {
  code: string;
  name: string;
  cjk: string;
  meridian: string;
  summary: string;
  tags: FeaturedTag[];
}

/** Everything the home page renders for today's leaf. */
export interface FeaturedLeaf {
  code: string;
  name: string;
  hanzi: string;
  /** "Large Intestine 4" — curated where authored, otherwise derived. */
  meridianLabel: string;
  meridian?: Meridian;
  /** English one-liner: curated summary, else the registry's own. */
  summary: string;
  /** The locale's prose summary from the bilingual registry, when one exists. */
  localSummary?: string;
  tags: FeaturedTag[];
  /** WHO-style location text (English). */
  location: string;
  /** English caution line, when the registry records one. */
  caution?: string;
  /** Whether the registry flags a pregnancy caution. */
  pregnancyCaution: boolean;
  /** Place in the book (catalogue order), 1-based; absent for extra points. */
  leafNumber?: number;
  /** The point's authored leaf card in the page language; its lines win over curated copy. */
  card?: LocalLeafCard;
}

/**
 * Featured-point catalogue keyed by point code.
 * The hero auto-rotates to whichever point the solar-term almanac elects
 * (`getAlmanacEntry(new Date()).pointCode`), falling back to LI4.
 * Kept here — not as content/ — because the hero copy is editorial, not data.
 */
export const FEATURED_POINTS: Readonly<Record<string, CuratedFeature>> = {
  LI4: {
    code: 'LI4',
    name: 'Hegu',
    cjk: '合谷',
    meridian: 'Large Intestine 4',
    summary: 'The command point of the head and face — the classical choice for tension headache.',
    tags: [{ label: 'headache' }, { label: '⚠ pregnancy', tone: 'warn' }],
  },
  ST36: {
    code: 'ST36',
    name: 'Zusanli',
    cjk: '足三里',
    meridian: 'Stomach 36',
    summary:
      'Below the knee on the tibialis anterior — the classical tonifying point for digestion, fatigue, and general vitality.',
    tags: [{ label: 'digestion' }, { label: 'vitality' }, { label: 'fatigue', tone: 'info' }],
  },
  LV3: {
    code: 'LV3',
    name: 'Taichong',
    cjk: '太冲',
    meridian: 'Liver 3',
    summary:
      'Between the first and second metatarsals — releases stagnant qi, steadies emotion, softens tension.',
    tags: [{ label: 'stress' }, { label: 'tension' }],
  },
  HT7: {
    code: 'HT7',
    name: 'Shenmen',
    cjk: '神门',
    meridian: 'Heart 7',
    summary:
      'At the wrist crease on the ulnar side — the gate of the spirit, calms the shen for rest and sleep.',
    tags: [{ label: 'sleep' }, { label: 'anxiety', tone: 'info' }],
  },
};

/**
 * Resolves the almanac's elected point into today's leaf.
 *
 * Featured resolution: whatever solar-term point the almanac elects resolves
 * through the full registry — editorial or compiled catalogue — so ANY
 * elected code has a page and hero facts. Curated hero copy wins where
 * authored; otherwise the entry's own one-liner carries the hero; LI4 is
 * the hard fallback.
 * @param almanac elected point and seasonal context
 * @param locale edition used for labels and links
 * @returns the elected point’s hero facts, preferring authored leaf-card copy
 */
export async function resolveFeaturedLeaf(
  almanac: AlmanacEntry,
  locale: Locale,
): Promise<FeaturedLeaf> {
  const elected = pointByCode(almanac.pointCode) ?? pointByCode('LI4');
  if (!elected) {
    throw new Error('Point registry is missing the LI4 featured fallback');
  }
  const curated: CuratedFeature | undefined = Object.hasOwn(FEATURED_POINTS, elected.code)
    ? FEATURED_POINTS[elected.code]
    : undefined;
  const electedNumber = /\d+/.exec(elected.code)?.[0] ?? '';
  const meridian = meridianBySlug(elected.meridian);
  const prose = (await loadProseRegistry()).pointByCode(elected.code);
  const caution = cautionOf(elected);
  const leafIndex = catalogue.findIndex((p) => p.code === elected.code);

  return {
    code: elected.code,
    name: elected.name,
    hanzi: elected.hanzi,
    meridianLabel:
      curated?.meridian ??
      [meridian?.name ?? elected.meridian, electedNumber].filter(Boolean).join(' '),
    meridian,
    summary: curated?.summary ?? elected.canonicalOneLiner,
    localSummary: prose ? summaryForLocale(prose, locale) : undefined,
    tags: curated?.tags ?? [],
    location: isCataloguePoint(elected) ? elected.location : elected.whoCoordinates,
    caution: caution.text,
    pregnancyCaution: caution.pregnancy,
    leafNumber: leafIndex >= 0 ? leafIndex + 1 : undefined,
    card: localLeafCard(elected.code, locale),
  };
}

/**
 * The registry's caution for a point: catalogue cautions, or the editorial pregnancy flag.
 * @param point registry point supplying caution text and pregnancy safety
 * @returns the point’s caution text and pregnancy-warning flag
 */
function cautionOf(point: AnyPoint): { text?: string; pregnancy: boolean } {
  if (isCataloguePoint(point)) {
    const text = point.cautions[0];

    return { text, pregnancy: point.cautions.some((c) => /pregnan/iu.test(c)) };
  }

  return point.pregnancySafe ? { pregnancy: false } : { pregnancy: true };
}
