/**
 * Region (部位) facts for the Woodblock region pages, derived from the
 * registries in `@/content`: the ten regions, their key points (the
 * descriptor's `keyPoints`, then any point filed under it by `region`), the
 * conditions those points are written about, and the region's cautions (from
 * its prose's self-care limits) with any pregnancy caution on its points. The
 * only layout data here is where each region sits on the carved figure, so it
 * can be picked there.
 */

import { isCataloguePoint } from '@/content/catalog';
import { conditionBySlug } from '@/content/conditions';
import { meridianBySlug } from '@/content/meridians';
import { points } from '@/content/points';
import { regionBySlug, regions } from '@/content/regions';
import { conditionGlyphFor, conditionLabel } from '@/features/conditions/copy';
import { hanFor } from '@/utilities/i18n/contentLabels';

import type { RegionDescriptor } from '@/content/regions';
import type { AnyPoint, Condition, Meridian, RegionSlug } from '@/content/schemas';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

/** Where a region sits on the carved figure (viewBox 0 0 300 640), as a pickable zone. */
export interface RegionZone {
  view: 'front' | 'back';
  x: number;
  y: number;
  width: number;
  height: number;
  /** CSS border radius of the zone outline. */
  radius: string;
}

const ZONES: Record<RegionSlug, RegionZone> = {
  head: { view: 'front', x: 118, y: 14, width: 64, height: 86, radius: '50%' },
  neck: { view: 'front', x: 130, y: 100, width: 40, height: 24, radius: '6px' },
  shoulder: { view: 'front', x: 64, y: 112, width: 50, height: 46, radius: '50%' },
  chest: { view: 'front', x: 114, y: 140, width: 72, height: 94, radius: '8px' },
  back: { view: 'back', x: 110, y: 120, width: 80, height: 260, radius: '10px' },
  arm: { view: 'front', x: 44, y: 162, width: 52, height: 222, radius: '24px' },
  hand: { view: 'front', x: 32, y: 386, width: 40, height: 52, radius: '40%' },
  leg: { view: 'front', x: 98, y: 380, width: 52, height: 222, radius: '24px' },
  foot: { view: 'front', x: 100, y: 602, width: 50, height: 38, radius: '12px' },
  ear: { view: 'front', x: 104, y: 48, width: 16, height: 30, radius: '50%' },
};

/**
 * The one caution each region's page leads with, condensed from the
 * self-care limits of its prose (content/pages/regions). Traditional Chinese
 * is authored; zh-cn converts.
 */
const CAUTIONS: Record<RegionSlug, Bilingual> = {
  head: {
    en: 'Never press the eyeball, and keep the hollows at the base of the skull feather-light.',
    zh: '絕不按壓眼球；顱底的凹陷只作極輕的觸碰。',
  },
  neck: {
    en: 'Press only the back and sides. Leave the front of the neck alone.',
    zh: '只按頸後與頸側；頸前的咽喉一律不碰。',
  },
  shoulder: {
    en: 'Leave the hollows above the collarbone and the armpit alone. If you are pregnant, skip this region, Jianjing (GB21) above all.',
    zh: '鎖骨上方的凹窩與腋窩一律不碰。孕期請跳過此處，肩井（GB21）尤其如此。',
  },
  chest: {
    en: 'Chest pain or breathlessness is a call for help now, not for pressing.',
    zh: '胸痛或氣短，應立即求助，而不是按壓。',
  },
  back: {
    en: 'Work beside the spine, never on the spine itself. If you are pregnant, ask a practitioner before any low-back work.',
    zh: '只在脊柱兩旁施力，不按脊骨本身。孕期進行任何下腰手法之前，請先諮詢醫師。',
  },
  arm: {
    en: 'Leave the hollow inside the elbow and the nerve groove behind the inner elbow bump alone.',
    zh: '肘內側的軟窩與內側骨凸後方的神經溝，一律避開。',
  },
  hand: {
    en: 'Keep touch feather-light in the hollows of the wrist.',
    zh: '腕部的凹窩只作極輕的觸碰。',
  },
  leg: {
    en: 'Keep off varicose veins, and touch the hollow behind the knee lightly at most.',
    zh: '避開曲張的靜脈；膝後的軟窩至多輕輕一觸。',
  },
  foot: {
    en: 'Keep off hot or swollen joints and fresh injuries, and go lighter in the toe webs.',
    zh: '避開發熱腫脹的關節與新鮮損傷；趾縫更要放輕。',
  },
  ear: {
    en: 'Keep touch feather-light and nothing inside the ear canal; see a doctor for sudden hearing loss or ear pain.',
    zh: '觸碰保持極輕，不把任何東西伸入耳道；突然聽力下降或耳痛，請就醫。',
  },
};

/** The ten regions in canonical order. */
export const orderedRegions: readonly RegionDescriptor[] = regions;

/**
 * Region by slug.
 * @param slug registry key to look up
 * @returns the anatomical descriptor, when registered
 */
export function regionFor(slug: string): RegionDescriptor | undefined {
  return regionBySlug(slug);
}

/**
 * Pickable zone of a region on the carved figure.
 * @param region anatomical registry descriptor
 * @returns the figure's selectable area
 */
export function regionZone(region: RegionDescriptor): RegionZone {
  return ZONES[region.slug];
}

/**
 * selects the decorative Han character for an anatomical area
 * @param region anatomical registry descriptor
 * @param locale page language and writing system
 * @returns the decorative Han character in the requested script
 */
export function regionGlyph(region: RegionDescriptor, locale: Locale): string {
  return hanFor(region.hanzi ?? region.name, locale);
}

/**
 * The region's name as a locale reads it: "Hand", or 手部.
 * @param region anatomical registry descriptor
 * @param locale page language and writing system
 * @returns the localized anatomical name
 */
export function regionName(region: RegionDescriptor, locale: Locale): string {
  return locale === 'en' ? region.name : hanFor(`${region.hanzi ?? ''}部`, locale);
}

/**
 * A region's points: its key points in their listed order, then any other
 * point filed under it, in the order of its authored layout.
 * @param region anatomical registry descriptor
 * @returns entries in key-point and authored-layout order
 */
export function regionPoints(region: RegionDescriptor): AnyPoint[] {
  const listed = region.keyPoints ?? [];
  const keyed = listed
    .map((code) => points.find((p) => p.code === code))
    .filter((p): p is AnyPoint => Boolean(p));
  const filed = points.filter((p) => p.region === region.slug && !listed.includes(p.code));
  const order = region.layout?.points.map((p) => p.code) ?? [];
  const rank = (code: string): number => {
    const at = order.indexOf(code);

    return at === -1 ? order.length : at;
  };

  return [...keyed, ...filed.sort((a, b) => rank(a.code) - rank(b.code))];
}

/**
 * The region's own caution in the page's language.
 * @param region anatomical registry descriptor
 * @param locale page language and writing system
 * @returns the localized safety passage
 */
export function regionCaution(region: RegionDescriptor, locale: Locale): string {
  const caution = CAUTIONS[region.slug];

  return locale === 'en' ? caution.en : hanFor(caution.zh, locale);
}

/**
 * Conditions the region's points are written about, first mention first.
 * @param filed catalog entries assigned to the region
 * @returns related conditions in first-mention order
 */
export function regionConditions(filed: readonly AnyPoint[]): Condition[] {
  const slugs: string[] = [];
  for (const point of filed) {
    for (const ref of point.about) {
      const [kind, slug] = ref.split(':');
      if (kind === 'condition' && slug && !slugs.includes(slug)) {
        slugs.push(slug);
      }
    }
  }

  return slugs.map((slug) => conditionBySlug(slug)).filter((c): c is Condition => Boolean(c));
}

/**
 * A condition's name as a locale reads it.
 * @param condition registry condition to describe
 * @param locale page language and writing system
 * @returns the localized condition name
 */
export function conditionName(condition: Condition, locale: Locale): string {
  return conditionLabel(locale, condition).name;
}

/**
 * Han word set before a condition's English name on English pages.
 * @param condition registry condition to describe
 * @returns the decorative Han word, when authored
 */
export function conditionGlyph(condition: Condition): string | undefined {
  return conditionGlyphFor(condition.slug, 'en');
}

/**
 * Channels the region's descriptor lists as passing through it.
 * @param region anatomical registry descriptor
 * @returns registered meridians crossing the area
 */
export function regionChannels(region: RegionDescriptor): Meridian[] {
  return region.relatedMeridians
    .map((slug) => meridianBySlug(slug))
    .filter((m): m is Meridian => Boolean(m));
}

/**
 * Points among `filed` the content marks unsafe in pregnancy.
 * @param filed catalog entries assigned to the region
 * @returns entries marked unsafe in pregnancy
 */
export function pregnancyCautions(filed: readonly AnyPoint[]): AnyPoint[] {
  return filed.filter((p) => !isCataloguePoint(p) && p.pregnancySafe === false);
}

/**
 * Every point on the site the content marks unsafe in pregnancy.
 * @returns all catalog entries marked unsafe in pregnancy
 */
export function allPregnancyCautions(): AnyPoint[] {
  return pregnancyCautions(points);
}

/**
 * "Hegu (LI4) and Sanyinjiao (SP6)", or 合谷（LI4）與三陰交（SP6）.
 * @param list catalog entries to join
 * @param locale page language and writing system
 * @returns the localized names joined for a sentence
 */
export function pointList(list: readonly AnyPoint[], locale: Locale): string {
  if (locale === 'en') {
    const names = list.map((p) => `${p.name} (${p.code})`);

    return names.length > 1
      ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
      : (names[0] ?? '');
  }
  const names = list.map((p) => `${hanFor(p.hanzi, locale)}（${p.code}）`);

  return names.length > 1
    ? `${names.slice(0, -1).join('、')}${hanFor('與', locale)}${names[names.length - 1]}`
    : (names[0] ?? '');
}
