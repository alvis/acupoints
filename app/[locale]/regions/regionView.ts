/**
 * View helpers shared by the regions index and the region pages: counts,
 * the "Before you press" bullets and the channel and condition chips, all
 * derived from the content registries.
 */

import { leafCardByCode } from '@/content/leaves';
import { channelBySlug } from '@/features/channels/channelData';
import {
  allPregnancyCautions,
  conditionGlyph,
  conditionName,
  pointList,
  regionChannels,
  regionConditions,
  regionPoints,
} from '@/features/regions/regionData';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import type { RegionDescriptor } from '@/content/regions';
import type { RegionLinkGroup } from '@/features/regions/components/RegionLinks';
import type { RegionTranslate } from '@/features/regions/regionCopy';
import type { Locale } from '@/utilities/routes';

/**
 * format the number of points filed in a region.
 * @param n number of filed points
 * @param t localized template formatter
 * @returns the localized singular or plural point count
 */
export function pointCount(n: number, t: RegionTranslate): string {
  if (n === 0) {
    return t('countNone');
  }

  return n === 1 ? t('countOne') : t('countMany', { n });
}

/**
 * The four "Before you press" bullets, the pregnancy one drawn from the content.
 * @param locale language used for links and copy
 * @param t localized template formatter
 * @returns the four localized safety bullets, including pregnancy exclusions
 */
export function beforeItems(locale: Locale, t: RegionTranslate): string[] {
  const cautions = allPregnancyCautions();

  return [
    t('before1'),
    t('before2'),
    ...(cautions.length > 0 ? [t('beforePregnant', { points: pointList(cautions, locale) })] : []),
    t('before4'),
  ];
}

/**
 * "Channels through here" and "Related conditions" chips for a region.
 * @param region body-region registry entry
 * @param locale language used for links and copy
 * @param t localized template formatter
 * @returns channel and condition chip groups for the region
 */
export function regionLinkGroups(
  region: RegionDescriptor,
  locale: Locale,
  t: RegionTranslate,
): RegionLinkGroup[] {
  const english = locale === 'en';
  const r = localizedRoutes(locale);
  const han = (text: string): string => hanFor(text, locale);

  return [
    {
      zh: english ? han('經') : undefined,
      title: t('channelsTitle'),
      solid: false,
      links: regionChannels(region).map((meridian) => {
        const channel = channelBySlug(meridian.slug);

        return {
          href: r.meridian(meridian.slug),
          zh: english ? meridian.hanzi : undefined,
          label: english ? meridian.name : han(channel?.fullZh ?? meridian.hanzi),
        };
      }),
    },
    {
      zh: english ? han('症') : undefined,
      title: t('conditionsTitle'),
      solid: true,
      links: regionConditions(regionPoints(region)).map((condition) => ({
        href: r.condition(condition.slug),
        zh: english ? conditionGlyph(condition) : undefined,
        label: conditionName(condition, locale),
      })),
      also: alsoBrought(region, locale, t),
    },
  ];
}

/** How many key points' complaints the "Also brought here" line draws on. */
const ALSO_POINTS = 3;

/**
 * The complaints tradition brought to a region: the leaf cards' "For" lines
 * of its first key points, split into complaints and each named once.
 * @param region body-region registry entry
 * @param locale language used for links and copy
 * @param t localized template formatter
 * @returns the complaint caption and deduplicated complaint sentence
 */
function alsoBrought(
  region: RegionDescriptor,
  locale: Locale,
  t: RegionTranslate,
): RegionLinkGroup['also'] {
  const english = locale === 'en';
  const items = regionPoints(region)
    .slice(0, ALSO_POINTS)
    .flatMap((point) => {
      const card = leafCardByCode(point.code);

      return card
        ? (english ? card.for.en : card.for.zh).split(english ? /[,;]/u : /[，；、]/u)
        : [];
    })
    .map((item) => item.trim().replace(/[.。]$/u, ''))
    .map((item) => (english ? lowerFirst(item) : item))
    .filter((item, i, all) => item !== '' && all.indexOf(item) === i);
  if (items.length === 0) {
    return undefined;
  }
  const text = english
    ? items.join(', ').replace(/^./u, (first) => first.toUpperCase())
    : hanFor(items.join('、'), locale);

  return { label: t('alsoBrought'), text: `${text}${english ? '.' : '。'}` };
}

/**
 * Lower-cases a line's first letter unless it opens an acronym.
 * @param line source line to format
 * @returns the line with its initial lowercased unless it begins an acronym
 */
function lowerFirst(line: string): string {
  return /^[A-Z](?![A-Z0-9])/u.test(line) ? `${line[0].toLowerCase()}${line.slice(1)}` : line;
}
