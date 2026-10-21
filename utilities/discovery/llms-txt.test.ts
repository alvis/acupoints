import { beforeAll, describe, expect, it } from 'vitest';

import { basicSlugs } from '@/content/basics';
import { conditions } from '@/content/conditions';
import { glossary } from '@/content/glossary';
import { meridians } from '@/content/meridians';
import { points } from '@/content/points';
import { regions } from '@/content/regions';
import { DEFAULT_LOCALE, LOCALES, localizedRoutes, SITE } from '@/utilities/routes';

import { buildLlmsTxt } from './llms-txt';

const routes = localizedRoutes(DEFAULT_LOCALE);

function occurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

describe('buildLlmsTxt', () => {
  let text: string;

  beforeAll(async () => {
    text = await buildLlmsTxt(DEFAULT_LOCALE);
  });

  it('opens with an H1 identity line followed by a blockquote summary', () => {
    const lines = text.split('\n');
    expect(lines[0]).toBe(`# ${SITE.name}`);
    expect(lines[2]?.startsWith('> ')).toBe(true);
  });

  it('links every point page exactly once', () => {
    for (const point of points) {
      expect(occurrences(text, urlFor(routes.point(point.code)))).toBe(1);
    }
  });

  it('links every meridian, condition, region, basic, and glossary page exactly once', () => {
    const paths = [
      ...meridians.map((m) => routes.meridian(m.slug)),
      ...conditions.map((c) => routes.condition(c.slug)),
      ...regions.map((r) => routes.region(r.slug)),
      ...basicSlugs.map((slug) => routes.basic(slug)),
      ...glossary.map((g) => routes.glossaryTerm(g.slug)),
    ];
    for (const path of paths) {
      expect(occurrences(text, urlFor(path))).toBe(1);
    }
  });

  it('links each URL once, always under a locale prefix', () => {
    const matches = [...text.matchAll(/\((https:\/\/[^)]+)\)/gu)].map((match) => match[1]);
    expect(matches.length).toBeGreaterThan(0);
    expect(new Set(matches).size).toBe(matches.length);
    // an unprefixed URL would send a reader of one language into another tree
    const prefixes = LOCALES.map((locale) => `${SITE.url}/${locale}/`);
    expect(matches.filter((url) => !prefixes.some((prefix) => url.startsWith(prefix)))).toEqual([]);
  });

  it('ends with a trailing newline and carries no empty sections', () => {
    expect(text.endsWith('\n')).toBe(true);
    expect(text).toContain('## Points');
    expect(text).toContain('## Meridians');
    expect(text).toContain('## Conditions');
    expect(text).toContain('## Body regions');
    expect(text).toContain('## Basics');
    expect(text).toContain('## Glossary');
    expect(text).toContain('## Site');
  });
});

describe('buildLlmsTxt in Chinese', () => {
  // a described row looks like `- [label](url): description`
  const described = /^- \[[^\]]*\]\([^)]*\): (?<description>.+)$/gmu;
  const hasHan = /\p{Script=Han}/u;

  it('describes every catalogue row from its authored Chinese arm', async () => {
    const text = await buildLlmsTxt('zh-hant');
    const descriptions = [...text.matchAll(described)].map((match) => match.groups?.description);
    // an English one-liner leaking through means a registry lookup missed its module
    expect(descriptions.length).toBeGreaterThan(points.length);
    expect(descriptions.filter((description) => !hasHan.test(description ?? ''))).toEqual([]);
  });

  it('derives the simplified index from the traditional one', async () => {
    const [traditional, simplified] = await Promise.all([
      buildLlmsTxt('zh-hant'),
      buildLlmsTxt('zh-cn'),
    ]);
    expect(simplified).not.toBe(traditional);
  });
});

function urlFor(path: string): string {
  return path.endsWith('/') ? `${SITE.url}${path}` : `${SITE.url}${path}/`;
}
