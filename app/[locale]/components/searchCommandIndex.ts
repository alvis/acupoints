import { conditions, topConditionSlugs } from '@/content/conditions';
import { meridians } from '@/content/meridians';
import { points, topPointCodes } from '@/content/points';
import { localizedRoutes } from '@/utilities/routes';

import { KIND_ORDER, QUERY_LIMIT, IDLE_LIMIT } from './searchCommandData';

import type { AnyPoint } from '@/content/schemas';
import type { PagefindResult } from '@/utilities/pagefind';
import type { Locale } from '@/utilities/routes';

import type { Copy, Hit, HitKind, IndexEntry } from './searchCommandData';

/**
 * Lower-cases and strips tone marks so "he gu" finds "Hé Gǔ".
 * @param text text to normalize for case- and tone-insensitive matching
 * @returns lowercase search text with combining tone marks removed
 */
function fold(text: string): string {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

/**
 * choose the location line used beneath a point search result.
 * @param point registry point supplying the location hint
 * @returns the catalogue location or editorial WHO coordinates
 */
function pointHint(point: AnyPoint): string {
  return 'location' in point ? point.location : point.whoCoordinates;
}

/**
 * assemble searchable registry entries for the modal book index.
 * @param locale edition used for labels and links
 * @param copy localized result-count formatters and index labels
 * @returns point, condition, and channel entries with folded search keys and localized links
 */
export function buildLocalIndex(locale: Locale, copy: Copy): IndexEntry[] {
  const r = localizedRoutes(locale);
  const pointEntries: IndexEntry[] = points.map((p) => ({
    id: `p-${p.code}`,
    kind: 'point',
    zh: p.hanzi,
    title: p.name,
    code: p.code,
    hint: pointHint(p),
    href: r.point(p.code),
    keys: fold([p.code, p.name, p.pinyin, p.hanzi, p.region ?? '', pointHint(p)].join(' ')),
  }));
  const conditionEntries: IndexEntry[] = conditions.map((c) => ({
    id: `c-${c.slug}`,
    kind: 'condition',
    title: c.name,
    code: c.pickerPoints?.length ? copy.pointCount(c.pickerPoints.length) : undefined,
    hint: c.canonicalOneLiner,
    href: r.condition(c.slug),
    keys: fold([c.name, c.slug, c.canonicalOneLiner].join(' ')),
  }));
  const channelEntries: IndexEntry[] = meridians.map((m) => ({
    id: `m-${m.slug}`,
    kind: 'channel',
    zh: m.hanzi,
    title: m.name,
    code: copy.pointCount(m.pointCount),
    hint: m.canonicalOneLiner,
    href: r.meridian(m.slug),
    keys: fold([m.name, m.pinyin, m.hanzi, m.slug, m.canonicalOneLiner].join(' ')),
  }));

  return [...pointEntries, ...conditionEntries, ...channelEntries];
}

export type HitGroup = { kind: HitKind; hits: Hit[] };

/**
 * Groups local hits by type (idle: featured entries; typed: ranked matches), then full text.
 * @param index searchable point, condition, and channel entries
 * @param pagefind full-text matches for the current query
 * @param query search text used to filter and rank the local index
 * @returns nonempty result groups in content-kind order, with full-text matches last
 */
export function groupHits(
  index: IndexEntry[],
  pagefind: PagefindResult[],
  query: string,
): HitGroup[] {
  const q = fold(query.trim());
  const groups: HitGroup[] = [];
  for (const kind of KIND_ORDER) {
    if (kind === 'text') {
      if (q && pagefind.length > 0) {
        groups.push({ kind, hits: pagefind.map(toTextHit) });
      }
      continue;
    }
    const ofKind = index.filter((e) => e.kind === kind);
    const hits = q
      ? ofKind
          .filter((e) => e.keys.includes(q))
          .sort((a, b) => rank(a, q) - rank(b, q))
          .slice(0, QUERY_LIMIT[kind])
      : featured(ofKind, kind).slice(0, IDLE_LIMIT[kind]);
    if (hits.length > 0) {
      groups.push({ kind, hits });
    }
  }

  return groups;
}

/**
 * Exact code first, then a name or code that starts with the query, then any match.
 * @param entry local result whose code and title are ranked
 * @param q trimmed, tone-folded search text
 * @returns zero for an exact code, one for a code or title prefix, otherwise two
 */
function rank(entry: IndexEntry, q: string): number {
  const code = entry.code ? fold(entry.code) : '';
  if (code === q) {
    return 0;
  }
  if (code.startsWith(q) || fold(entry.title).startsWith(q)) {
    return 1;
  }

  return 2;
}

/**
 * order idle results by the curated point and condition lists.
 * @param entries local entries belonging to one content kind
 * @param kind content kind whose featured order is applied
 * @returns curated points or conditions in featured order, or all channel entries
 */
function featured(entries: IndexEntry[], kind: Exclude<HitKind, 'text'>): IndexEntry[] {
  const order: readonly string[] =
    kind === 'point'
      ? topPointCodes.map((c) => `p-${c}`)
      : kind === 'condition'
        ? topConditionSlugs.map((s) => `c-${s}`)
        : [];
  if (order.length === 0) {
    return entries;
  }

  return order.flatMap((id) => entries.filter((e) => e.id === id));
}

/**
 * adapt a Pagefind match to the modal index’s listbox result.
 * @param hit Pagefind match with a title, URL, and highlighted excerpt
 * @returns a listbox result containing the full-text title, destination, and excerpt
 */
function toTextHit(hit: PagefindResult): Hit {
  return {
    id: `t-${hit.id}`,
    kind: 'text',
    title: String(hit.meta.title ?? hit.url),
    hint: '',
    href: hit.url,
    excerpt: { __html: hit.excerpt },
  };
}
