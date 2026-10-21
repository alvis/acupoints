import { loadProseRegistry } from '@/content/pages';
import { pointByCode, points } from '@/content/points';
import { localLeafCard } from '@/features/points/leafCard';
import { catalogueEntry, leafPosition } from '@/features/points/volumes';
import { LOCALES, localizedRoutes, resolveLocale, SITE } from '@/utilities/routes';

import { leafRecord } from '../leafData';

/** Route params of one leaf's JSON copy. */
interface LeafJsonParams {
  locale: string;
  code: string;
}

// Static export only supports GET handlers pinned to force-static; this emits
// out/<locale>/points/<code>/leaf.json for every leaf at build time.
export const dynamic = 'force-static';
export const dynamicParams = false;

/**
 * enumerate registry entries for static export.
 * @returns the locale and point-code combinations for static export
 */
export function generateStaticParams(): LeafJsonParams[] {
  return LOCALES.flatMap((locale) =>
    points.map((point) => ({ locale, code: point.code.toLowerCase() })),
  );
}

/**
 * The leaf's machine copy: the same record its colophon prints, in the locale's language.
 * @param _request incoming request, unused by the static record handler
 * @param context route context containing the locale and point code
 * @param context.params localized route parameters
 * @returns the localized JSON record, or a response indicating an unknown point
 */
async function get(
  _request: Request,
  { params }: { params: Promise<LeafJsonParams> },
): Promise<Response> {
  const { locale: segment, code } = await params;
  const locale = resolveLocale(segment);
  const point = pointByCode(code);
  if (!point) {
    return new Response('Unknown point code.', { status: 404 });
  }

  const ed = (await loadProseRegistry()).pointByCode(point.code);
  const record = leafRecord({
    point,
    entry: catalogueEntry(point.code),
    position: leafPosition(point.code),
    card: localLeafCard(point.code, locale),
    english: locale === 'en',
    url: `${SITE.url}${localizedRoutes(locale).point(point.code)}`,
    lastReviewed: ed?.lastReviewed ?? point.lastReviewed,
  });

  return new Response(`${JSON.stringify(record, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export { get as GET };
