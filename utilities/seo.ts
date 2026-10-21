import { LOCALES, localeToHtmlLang, SITE, stripLocale, withLocale } from './routes';

import type { Metadata } from 'next';

type SeoInput = {
  title: string;
  description: string;
  /**
   * Locale-prefixed page path (e.g. `/zh-hant/points/li4/`) — the same value
   * pages already hand to canonical. Sibling hreflang targets derive from it.
   */
  path?: string;
  image?: string;
};

/**
 * Hreflang map for one page: every locale sibling plus x-default pointing at
 * the default-locale URL, per Google's language-targeting guidance.
 * @param barePath the page path without a locale prefix.
 * @returns the sibling language URLs and default-language fallback.
 */
function languageAlternates(barePath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[localeToHtmlLang(locale)] = `${SITE.url}${withLocale(locale, barePath)}`;
  }

  return { ...languages, 'x-default': `${SITE.url}${withLocale('en', barePath)}` };
}

/**
 * Builds a consistent per-page Metadata object whose canonical is
 * locale-scoped and whose alternates cover the whole hreflang trio.
 * @param props the page metadata and sharing cards.
 * @param props.title display heading.
 * @param props.description short destination summary.
 * @param props.path site-relative destination.
 * @param props.image the social sharing image URL.
 * @returns the page title, description, canonical URL, language alternates, and social cards.
 */
export function buildMetadata({ title, description, path = '/', image }: SeoInput): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image ?? `${SITE.url}/og/default.png`;
  const fullTitle = title === SITE.name ? title : `${title} · ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: languageAlternates(stripLocale(path)),
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}
