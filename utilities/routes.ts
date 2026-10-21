/**
 * Centralized route constants + href helpers.
 *
 * The `routes` skeleton below always yields UNPREFIXED canonical paths — the
 * identity of every page. Locale-prefixed URLs are derived additively through
 * `withLocale` / `localizedRoutes` so adding a locale never touches the
 * skeleton.
 */

export const SITE = {
  url: 'https://acupoints.com',
  name: 'Acupoints',
  tagline: 'Every acupoint, beautifully explained.',
  description:
    'A free, modern reference for the 361 WHO-standardized acupoints — organized by meridian, body region, and everyday concern.',
} as const;

export const routes = {
  home: '/',
  points: '/points',
  point: (code: string) => `/points/${code.toLowerCase()}`,
  meridians: '/meridians',
  meridian: (slug: string) => `/meridians/${slug}`,
  conditions: '/conditions',
  condition: (slug: string) => `/conditions/${slug}`,
  practice: (slug: string) => `/conditions/${slug}/practice`,
  protocols: '/protocols',
  regions: '/regions',
  region: (slug: string) => `/regions/${slug}`,
  basics: '/basics',
  basic: (slug: string) => `/basics/${slug}`,
  glossary: '/glossary',
  glossaryTerm: (term: string) => `/glossary/${term}`,
  journal: '/journal',
  journalPost: (slug: string) => `/journal/${slug}`,
  faq: '/faq',
  search: '/search',
  /** The whole local search index as JSON, for agents to filter themselves. */
  searchIndex: '/search.json',
  about: '/about',
  disclaimer: '/disclaimer',
  privacy: '/privacy',
  affiliate: '/affiliate-disclosure',
  editorialPolicy: '/editorial-policy',
  changelog: '/changelog',
  seals: '/seals',
} as const;

// --- locale layer -------------------------------------------------------------

/** Supported URL locales, in nav/display order. English first (default). */
export const LOCALES = ['en', 'zh-hant', 'zh-cn'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type HtmlLang = 'en' | 'zh-Hant' | 'zh-Hans';

const HTML_LANG_BY_LOCALE: Record<Locale, HtmlLang> = {
  'en': 'en',
  'zh-hant': 'zh-Hant',
  'zh-cn': 'zh-Hans',
};

/**
 * BCP-47 lang attribute for a locale subtree's `<html>` element.
 * @param locale language used for text and routes.
 * @returns the HTML language tag corresponding to the URL locale.
 */
export function localeToHtmlLang(locale: Locale): HtmlLang {
  return HTML_LANG_BY_LOCALE[locale];
}

/**
 * Narrows an arbitrary segment (e.g. a `[locale]` param) to a supported locale.
 * @param value the route segment to validate.
 * @returns whether the route segment names a supported locale.
 */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Resolves an unvalidated `[locale]` param to a supported locale. The
 * `[locale]` layout rejects unknown segments with notFound() before any page
 * renders, so this fallback only exists as typed plumbing for page props.
 * @param value the unvalidated locale route segment.
 * @returns the supported locale, or English for an unknown segment.
 */
export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Prefixes a skeleton path with a locale. `/` becomes `/{locale}/`; any other
 * skeleton path keeps its shape (`withLocale('zh-hant', routes.point('li4'))`
 * → `/zh-hant/points/li4`). Trailing-slash normalization is left to callers,
 * matching the export layout.
 * @param locale language used for text and routes.
 * @param path site-relative destination.
 * @returns the path prefixed with the selected locale.
 */
export function withLocale(locale: Locale, path: string): string {
  const prefix = `/${locale}`;
  if (path === '/') {
    return `${prefix}/`;
  }

  return `${prefix}${path}`;
}

/**
 * Removes a leading locale segment from a pathname. Unprefixed pathnames pass
 * through untouched, so guards work on both legacy and localized URLs.
 * @param pathname the pathname whose locale prefix is removed.
 * @returns the pathname without its leading locale segment.
 */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) {
      return '/';
    }
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }

  return pathname;
}

type RouteValues = {
  -readonly [K in keyof typeof routes]: (typeof routes)[K] extends (...args: infer Args) => string
    ? (...args: Args) => string
    : string;
};

/**
 * The full `routes` skeleton resolved for one locale: same keys, same call
 * signatures, every path prefixed. Compute once per render
 * (`const r = localizedRoutes(locale)`).
 * @param locale language used for text and routes.
 * @returns the route table with every destination scoped to the locale.
 */
export function localizedRoutes(locale: Locale): RouteValues {
  return Object.fromEntries(
    (
      Object.entries(routes) as Array<[keyof typeof routes, string | ((arg: string) => string)]>
    ).map(([key, value]) => [
      key,
      typeof value === 'function'
        ? (arg: string) => withLocale(locale, value(arg))
        : withLocale(locale, value),
    ]),
  ) as RouteValues;
}
