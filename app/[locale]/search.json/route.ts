import { conditions } from '@/content/conditions';
import { meridians } from '@/content/meridians';
import { points } from '@/content/points';
import { regions } from '@/content/regions';
import { conditionLabel } from '@/features/conditions/copy';
import { localLeafCard } from '@/features/points/leafCard';
import { regionName } from '@/features/regions/regionData';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { LOCALES, localizedRoutes, resolveLocale, SITE } from '@/utilities/routes';

import type { Locale } from '@/utilities/routes';

/** Route params of one locale's search index. */
interface SearchJsonParams {
  locale: string;
}

/** One point in the index; the leaf card's lines are in the locale's language. */
interface SearchPoint {
  code: string;
  name: string;
  pinyin: string;
  /** Han name in the locale's script. */
  han: string;
  channel: string;
  region?: string;
  gloss?: string;
  place?: string;
  for?: string;
  caution?: string;
  url: string;
}

/** A condition page and the points it leads with. */
interface SearchCondition {
  slug: string;
  name: string;
  summary: string;
  points: readonly string[];
  url: string;
}

/** A channel volume and its point count. */
interface SearchChannel {
  slug: string;
  name: string;
  han: string;
  points: number;
  url: string;
}

/** A body region page. */
interface SearchRegion {
  slug: string;
  name: string;
  url: string;
}

/** The whole local index for one locale. */
interface SearchIndex {
  locale: Locale;
  url: string;
  note: string;
  points: SearchPoint[];
  conditions: SearchCondition[];
  channels: SearchChannel[];
  regions: SearchRegion[];
}

// Static export only supports GET handlers pinned to force-static; this emits
// out/<locale>/search.json at build time. A static file cannot read `?q=`, so
// it carries the whole index and agents filter it themselves.
export const dynamic = 'force-static';
export const dynamicParams = false;

/**
 * list the supported static locale routes.
 * @returns one route parameter object for each supported edition
 */
export function generateStaticParams(): SearchJsonParams[] {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * The search window's local index (points, conditions, channels, regions) in the locale's language.
 * @param _request incoming static index request
 * @param props route context identifying the search index’s edition
 * @param props.params promised locale route parameters
 * @returns the complete localized search index as a JSON response
 */
async function getSearchIndex(
  _request: Request,
  { params }: { params: Promise<SearchJsonParams> },
): Promise<Response> {
  const locale = resolveLocale((await params).locale);

  return new Response(`${JSON.stringify(searchIndex(locale), null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

/**
 * assemble the static registry index for the selected edition.
 * @param locale edition used for labels and links
 * @returns point, condition, channel, and region records with absolute localized URLs
 */
function searchIndex(locale: Locale): SearchIndex {
  const r = localizedRoutes(locale);
  const url = (path: string): string => `${SITE.url}${path}`;

  return {
    locale,
    url: url(r.searchIndex),
    note: 'The whole index for this language. Filter it yourself; query parameters are not read.',
    points: points.map((point): SearchPoint => {
      const card = localLeafCard(point.code, locale);

      return {
        code: point.code,
        name: point.name,
        pinyin: point.pinyin,
        han: hanFor(point.hanzi, locale),
        channel: point.meridian,
        ...(point.region ? { region: point.region } : {}),
        ...(card
          ? {
              gloss: card.gloss,
              place: card.place,
              for: card.for,
              ...(card.caution ? { caution: card.caution } : {}),
            }
          : {}),
        url: url(r.point(point.code)),
      };
    }),
    conditions: conditions.map((condition) => ({
      slug: condition.slug,
      name: conditionLabel(locale, condition).name,
      summary: condition.canonicalOneLiner,
      points: condition.pickerPoints ?? [],
      url: url(r.condition(condition.slug)),
    })),
    channels: meridians.map((meridian) => ({
      slug: meridian.slug,
      name: meridian.name,
      han: hanFor(meridian.hanzi, locale),
      points: meridian.pointCount,
      url: url(r.meridian(meridian.slug)),
    })),
    regions: regions.map((region) => ({
      slug: region.slug,
      name: regionName(region, locale),
      url: url(r.region(region.slug)),
    })),
  };
}

export { getSearchIndex as GET };
