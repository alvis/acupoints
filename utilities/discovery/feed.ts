import { loadProseRegistry } from '@/content/pages';
import { points } from '@/content/points';
import { summaryForLocale } from '@/utilities/i18n/locale-text';
import { armText } from '@/utilities/i18n/t2s';
import { DEFAULT_LOCALE, localizedRoutes, SITE } from '@/utilities/routes';

import { escapeXml } from './xml';

import type { EditorialHubModule } from '@/content/editorial/schema';
import type { ProseRegistry } from '@/content/pages';
import type { AnyPoint } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

/** Journal-tier prose module served by the markdown registry. */
type JournalPost = EditorialHubModule<'journal'>;

/** One RSS item payload before XML escaping. */
export interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
}

/** Registry access a point's localized feed description needs. */
interface PointDescriptionParams {
  locale: Locale;
  registry: ProseRegistry;
}

/** RSS `<language>` code per site locale. */
const FEED_LANGUAGE: Record<Locale, string> = {
  'en': 'en',
  'zh-hant': 'zh-Hant',
  'zh-cn': 'zh-CN',
};

/**
 * URL path prefix for a locale's feed; the default locale sits at the root.
 * @param locale language used for text and routes.
 * @returns an empty prefix for English or the locale path segment.
 */
function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

/**
 * Maps an acupoint to a feed item announcing its reference page. The review
 * date stands in as the publication date so feed output stays deterministic.
 * The description is the catalogue's English one-liner: a point row carries
 * no prose arm, so localizing it needs the prose registry this mapper cannot
 * reach — `buildLocaleFeed` owns that join.
 * @param point catalogue entry to describe.
 * @param locale language used for text and routes.
 * @returns the point reference's title, permalink, summary, and review date.
 */
export function pointToFeedItem(point: AnyPoint, locale: Locale = DEFAULT_LOCALE): FeedItem {
  return {
    title: `${point.code} ${point.name}`,
    link: `${SITE.url}${localizedRoutes(locale).point(point.code)}/`,
    description: point.canonicalOneLiner,
    pubDate: point.lastReviewed,
  };
}

/**
 * Maps a journal post to a feed item announcing its essay. Publication date
 * falls back through updatedAt to lastReviewed so the feed stays
 * deterministic even for posts that never carried an explicit publish date.
 * Descriptions follow the site's prose-arm policy: the English arm for en,
 * the authored traditional arm for zh-hant, and simplified derived from that
 * same traditional arm for zh-cn.
 * @param post the authored journal essay.
 * @param locale language used for text and routes.
 * @returns the journal essay's title, permalink, localized summary, and publication date.
 */
export function postToFeedItem(post: JournalPost, locale: Locale = DEFAULT_LOCALE): FeedItem {
  return {
    title: post.title,
    link: `${SITE.url}${localizedRoutes(locale).journalPost(post.slug)}/`,
    description: summaryForLocale(post, locale),
    pubDate: post.publishedAt ?? post.updatedAt ?? post.lastReviewed,
  };
}

/**
 * Builds the RSS 2.0 document for one locale's feed. Items render in the
 * order given; guids equal permalinks so they are unique per page.
 * @param items ordered entries to display.
 * @param locale language used for text and routes.
 * @returns the RSS 2.0 XML document in the supplied item order.
 */
export function buildRssFeed(items: readonly FeedItem[], locale: Locale = DEFAULT_LOCALE): string {
  const r = localizedRoutes(locale);
  const itemLines = items.flatMap(renderItem);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(SITE.name)}</title>`,
    `    <link>${SITE.url}${r.home}</link>`,
    `    <description>${escapeXml(SITE.description)}</description>`,
    `    <language>${FEED_LANGUAGE[locale]}</language>`,
    `    <atom:link href="${SITE.url}${localePrefix(locale)}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...itemLines,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

/**
 * Assembles and serves one locale's feed: journal essays lead (newest
 * editorial work first), reference points follow. Empty journal registry is
 * fine — points-only feed. Static export handlers call this at build time.
 *
 * Journal items carry their own localized descriptions. Point items need the
 * registry join this assembly owns, so their descriptions are overridden
 * here. Titles stay each module's single authored identity (the loader
 * enforces one title across arms).
 * @param locale language used for text and routes.
 * @returns the XML response containing journal essays and point references.
 */
export async function buildLocaleFeed(locale: Locale): Promise<Response> {
  const registry = await loadProseRegistry();
  const items = [
    ...registry.journal.map((post) => postToFeedItem(post, locale)),
    ...points.map((point) => ({
      ...pointToFeedItem(point, locale),
      description: pointDescription(point, { locale, registry }),
    })),
  ];
  const xml = buildRssFeed(items, locale);

  return new Response(xml, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}

/**
 * Resolves a point's feed description. Catalogue rows carry only the English
 * one-liner, so Chinese locales look for an authored prose module on the same
 * code and fall back to that one-liner when the point has no arm yet.
 * @param point catalogue entry to describe.
 * @param params the locale and prose registry used to resolve the point summary.
 * @returns the authored Chinese summary or the catalogue's English one-liner.
 */
function pointDescription(point: AnyPoint, params: PointDescriptionParams): string {
  const { locale, registry } = params;
  const authored = locale === 'en' ? undefined : registry.pointByCode(point.code)?.zh.summary;

  return authored ? armText(authored, locale) : point.canonicalOneLiner;
}

/**
 * serialize one RSS entry with escaped text.
 * @param item the feed item to serialize.
 * @returns the escaped XML lines for one RSS item.
 */
function renderItem(item: FeedItem): string[] {
  return [
    '    <item>',
    `      <title>${escapeXml(item.title)}</title>`,
    `      <link>${escapeXml(item.link)}</link>`,
    `      <guid>${escapeXml(item.link)}</guid>`,
    `      <description>${escapeXml(item.description)}</description>`,
    `      <pubDate>${formatRfc822(item.pubDate)}</pubDate>`,
    '    </item>',
  ];
}

/**
 * RFC-822 timestamps in UTC, as RSS readers expect (e.g. "Wed, 15 Apr 2026 00:00:00 GMT").
 * @param date calendar instant to inspect.
 * @returns the UTC timestamp formatted for an RSS publication date.
 */
function formatRfc822(date: Date): string {
  return date.toUTCString();
}
