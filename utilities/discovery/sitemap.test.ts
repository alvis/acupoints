import { describe, expect, it } from 'vitest';

import { basicSlugs } from '@/content/basics';
import { conditions } from '@/content/conditions';
import { glossary } from '@/content/glossary';
import { meridians } from '@/content/meridians';
import { points } from '@/content/points';
import { regions } from '@/content/regions';
import { LOCALES, routes, SITE, withLocale } from '@/utilities/routes';

import { buildSitemapEntries } from './sitemap';

import type { Locale } from '@/utilities/routes';

/**
 * Mirrors the generator's absolute-URL shape for a repo route path.
 * @param path site-relative destination.
 */
function urlFor(path: string): string {
  const route = path.endsWith('/') ? path : `${path}/`;

  return `${SITE.url}${route}`;
}

function urlsOf(entries: Awaited<ReturnType<typeof buildSitemapEntries>>): string[] {
  return entries.map((entry) => entry.url);
}

/**
 * Every locale-prefixed URL a bare route path must produce — one entry per
 * shipped locale tree.
 * @param barePath the page path without a locale prefix.
 */
function urlVariants(barePath: string): Array<{ locale: Locale; url: string }> {
  return LOCALES.map((locale) => ({ locale, url: urlFor(withLocale(locale, barePath)) }));
}

describe('buildSitemapEntries', () => {
  it('returns one entry per built page per locale with no duplicate URLs', async () => {
    const urls = urlsOf(await buildSitemapEntries());
    expect(new Set(urls).size).toBe(urls.length);
    // Uniqueness alone can't catch a dropped locale tree, so pin the multiple.
    expect(urls.length % LOCALES.length).toBe(0);
    for (const locale of LOCALES) {
      const prefix = `${SITE.url}/${locale}/`;
      expect(urls.some((url) => url.startsWith(prefix))).toBe(true);
    }
  });

  it('links every point page exactly once per locale', async () => {
    const urls = urlsOf(await buildSitemapEntries());
    for (const point of points) {
      for (const { url } of urlVariants(routes.point(point.code))) {
        expect(urls.filter((candidate) => candidate === url)).toHaveLength(1);
      }
    }
  });

  it('links every section index and detail page exactly once per locale', async () => {
    const urls = urlsOf(await buildSitemapEntries());
    const barePaths = [
      routes.home,
      routes.points,
      ...meridians.map((m) => routes.meridian(m.slug)),
      ...conditions.map((c) => routes.condition(c.slug)),
      ...regions.map((region) => routes.region(region.slug)),
      ...basicSlugs.map((slug) => routes.basic(slug)),
      ...glossary.map((g) => routes.glossaryTerm(g.slug)),
      routes.faq,
      routes.about,
      routes.changelog,
      routes.disclaimer,
      routes.privacy,
      routes.affiliate,
      routes.editorialPolicy,
    ];
    for (const bare of barePaths) {
      for (const { url } of urlVariants(bare)) {
        expect(urls.filter((candidate) => candidate === url)).toHaveLength(1);
      }
    }
  });

  it('uses absolute https URLs on the production origin', async () => {
    for (const url of urlsOf(await buildSitemapEntries())) {
      expect(url.startsWith(`${SITE.url}/`)).toBe(true);
      expect(url.startsWith('https://')).toBe(true);
    }
  });

  it('ends every URL with a trailing slash', async () => {
    for (const url of urlsOf(await buildSitemapEntries())) {
      expect(url.endsWith('/')).toBe(true);
    }
  });

  it('omits advertised routes that have no built page', async () => {
    const urls = urlsOf(await buildSitemapEntries()).join('\n');
    for (const locale of LOCALES) {
      expect(urls).not.toContain(`/${locale}/search/`);
    }
  });
});
