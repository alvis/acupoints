/**
 * Registry reads behind the home page's sections: the shelf volumes and the
 * region and condition ways in. Every value comes from the content
 * registries; this module only shapes them for display.
 */

import { catalogue } from '@/content/catalog';
import { conditions } from '@/content/conditions';
import { meridians } from '@/content/meridians';
import { points } from '@/content/points';
import { regions } from '@/content/regions';
import { channelBySlug } from '@/features/channels/channelData';
import { hanNumeral } from '@/utilities/hanNumeral';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import { channelHanzi } from './homeCopy';
import { trailingDigits, withoutParenthetical } from './homeNameParts';

import type { RegionSlug } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

import type { ShelfVolume } from './ChannelShelf';

/** A region link around the carved figure. */
export type WayRegion = {
  slug: RegionSlug;
  name: string;
  hanzi?: string;
  href: string;
};

/** A condition row and how many points the registry ties to it. */
export type WayCondition = {
  slug: string;
  name: string;
  href: string;
  pointCount: number;
};

/**
 * The six regions the board labels around its carved figure, in the board's
 * order: head, chest and hand down the left; shoulder, leg and foot down the
 * right. The rest of the ten are one link away ("All regions").
 */
export const FIGURE_REGIONS: readonly RegionSlug[] = [
  'head',
  'chest',
  'hand',
  'shoulder',
  'leg',
  'foot',
];

/**
 * The fourteen channels as shelf volumes, in canonical order.
 * @param locale edition used for labels and links
 * @returns the fourteen channel volumes with localized spine labels and links
 */
export function shelfVolumes(locale: Locale): ShelfVolume[] {
  const r = localizedRoutes(locale);

  return meridians.map((m, i) => {
    const channel = channelHanzi(m.hanzi, locale);
    const prefix = pointPrefix(catalogue.find((p) => p.meridian === m.slug)?.code ?? '');

    return {
      slug: m.slug,
      href: r.meridian(m.slug),
      numeral: hanNumeral(i + 1),
      // the spine carries the full classical name, as on the boards (手太陰肺經)
      hanzi: hanFor(channelBySlug(m.slug)?.fullZh ?? m.hanzi, locale),
      name: locale === 'en' ? withoutParenthetical(m.name) : channel,
      fullName: locale === 'en' ? m.name : channel,
      prefix,
      pointCount: m.pointCount,
    };
  });
}

/**
 * The figure's regions, with their registry names and links.
 * @param locale edition used for labels and links
 * @returns the body-region links with names in the selected edition
 */
export function wayRegions(locale: Locale): WayRegion[] {
  const r = localizedRoutes(locale);

  return FIGURE_REGIONS.flatMap((slug) => {
    const region = regions.find((entry) => entry.slug === slug);

    return region ? [{ slug, name: region.name, hanzi: region.hanzi, href: r.region(slug) }] : [];
  });
}

/**
 * Every condition hub with the number of points the registry ties to it: the
 * curated picker set and every point whose `about` names the condition.
 * @param locale edition used for labels and links
 * @returns condition links with counts of their associated registry points
 */
export function wayConditions(locale: Locale): WayCondition[] {
  const r = localizedRoutes(locale);

  return conditions.map((c) => {
    const linked = points.filter((p) => p.about.includes(`condition:${c.slug}`)).map((p) => p.code);

    return {
      slug: c.slug,
      name: c.name,
      href: r.condition(c.slug),
      pointCount: new Set([...(c.pickerPoints ?? []), ...linked]).size,
    };
  });
}

/**
 * separates the channel prefix from a numbered point code.
 * @param code registry point identifier
 * @returns the letters preceding terminal ASCII digits
 */
function pointPrefix(code: string): string {
  const digits = trailingDigits(code);

  return code.slice(0, code.length - digits.length);
}
