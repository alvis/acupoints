import { basicSlugs } from '@/content/basics';
import { conditions } from '@/content/conditions';
import { glossary } from '@/content/glossary';
import { meridians } from '@/content/meridians';
import { loadProseRegistry } from '@/content/pages';
import { points } from '@/content/points';
import { regions } from '@/content/regions';
import {
  DEFAULT_LOCALE,
  LOCALES,
  localeToHtmlLang,
  localizedRoutes,
  routes,
  SITE,
  withLocale,
} from '@/utilities/routes';

import type { MetadataRoute } from 'next';

import type { Locale } from '@/utilities/routes';

/**
 * Builds sitemap entries for every page the static export ships — each
 * canonical path emitted once per locale prefix. Paths derive from the same
 * content registries the pages render, and `lastModified` is omitted so the
 * output stays deterministic across rebuilds.
 */

/** A route reference: a static key, or a parameterized route with its arg. */
type PathEntry = { key: keyof typeof routes; arg?: string };

const staticEntry = (key: keyof typeof routes): PathEntry => ({ key });
const paramEntry = (key: keyof typeof routes, arg: string): PathEntry => ({ key, arg });

/**
 * resolve a sitemap entry through the localized route table.
 * @param r localized route table.
 * @param entry record to describe.
 * @returns the localized destination for the static or parameterized route entry.
 */
function routePath(r: ReturnType<typeof localizedRoutes>, entry: PathEntry): string {
  const value = r[entry.key];

  return typeof value === 'function' ? value(entry.arg ?? '') : value;
}

/**
 * enumerate public localized routes for search crawlers. *
 * @returns the public pages in each locale with modification dates and language alternates.
 */
export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const { journal } = await loadProseRegistry();
  const paths: PathEntry[] = [
    staticEntry('home'),
    staticEntry('points'),
    ...points.map((point) => paramEntry('point', point.code)),
    staticEntry('meridians'),
    ...meridians.map((meridian) => paramEntry('meridian', meridian.slug)),
    staticEntry('conditions'),
    ...conditions.map((condition) => paramEntry('condition', condition.slug)),
    ...conditions.map((condition) => paramEntry('practice', condition.slug)),
    staticEntry('protocols'),
    staticEntry('regions'),
    ...regions.map((region) => paramEntry('region', region.slug)),
    staticEntry('basics'),
    ...basicSlugs.map((slug) => paramEntry('basic', slug)),
    staticEntry('glossary'),
    ...glossary.map((entry) => paramEntry('glossaryTerm', entry.slug)),
    staticEntry('journal'),
    ...journal.map((post) => paramEntry('journalPost', post.slug)),
    staticEntry('faq'),
    staticEntry('about'),
    staticEntry('changelog'),
    staticEntry('disclaimer'),
    staticEntry('privacy'),
    staticEntry('affiliate'),
    staticEntry('editorialPolicy'),
  ];

  // Every locale variant of a path carries the full xhtml:link alternate set
  // (all three locales plus x-default → EN), so crawlers discover the trio
  // from any single entry.
  return LOCALES.flatMap((locale: Locale) => {
    const r = localizedRoutes(locale);

    return paths.map((entry) => {
      const barePath = routePath(routes, entry);

      return {
        url: absoluteUrl(routePath(r, entry)),
        alternates: {
          languages: {
            ...Object.fromEntries(
              LOCALES.map(
                (l) => [localeToHtmlLang(l), absoluteUrl(withLocale(l, barePath))] as const,
              ),
            ),
            'x-default': absoluteUrl(withLocale(DEFAULT_LOCALE, barePath)),
          },
        },
      };
    });
  });
}

/**
 * join a site-relative path to the public origin.
 * @param path site-relative destination.
 * @returns the site's absolute page URL with a trailing slash.
 */
function absoluteUrl(path: string): string {
  return `${SITE.url}${withTrailingSlash(path)}`;
}

/**
 * Matches the site's `trailingSlash: true` export layout.
 * @param path site-relative destination.
 * @returns the path ending in exactly its existing or appended slash.
 */
function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}
