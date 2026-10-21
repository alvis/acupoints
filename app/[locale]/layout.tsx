import '@fontsource-variable/eb-garamond/wght-italic.css';
import '@fontsource-variable/eb-garamond/wght.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource-variable/noto-serif-sc/wght.css';
import '@fontsource-variable/noto-serif-tc/wght.css';

import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/primitives/JsonLd';
import { WoodcutDefs } from '@/components/primitives/WoodcutDefs';
import { editorialPerson, ORG_ID, organization, SITE_ID } from '@/utilities/editorial';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { isLocale, LOCALES, localeToHtmlLang, SITE } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

import type { Metadata } from 'next';
import type { Thing } from 'schema-dts';

import type { Locale } from '@/utilities/routes';
import '../globals.css';

export const metadata: Metadata = buildMetadata({
  title: SITE.name,
  description: SITE.description,
  path: '/',
});

/**
 * list the supported static locale routes.
 * @returns one route parameter object for each supported edition
 */
export function generateStaticParams(): Array<{ locale: Locale }> {
  return LOCALES.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * THE root layout: every page renders under a locale subtree, so the html
 * lang attribute and the Woodblock chrome (masthead, scroll-end footer) are
 * locale-scoped here. Unknown locales fall to not-found. The almanac lives
 * on the home page's day strip rather than as a site-wide band.
 */
const SITE_GRAPH: readonly Thing[] = [
  organization,
  {
    '@type': 'WebSite',
    '@id': SITE_ID,
    'url': SITE.url,
    'name': SITE.name,
    'description': SITE.description,
    'publisher': { '@id': ORG_ID },
  },
  editorialPerson,
];

const LocaleLayout = async ({
  children,
  params,
}: Readonly<LocaleLayoutProps>): Promise<React.JSX.Element> => {
  const { locale: segment } = await params;
  if (!isLocale(segment)) {
    notFound();
  }
  const locale: Locale = segment;

  return (
    <html lang={localeToHtmlLang(locale)}>
      <body className="paper-grain" id="top">
        <WoodcutDefs />
        <a className="skip-link" href="#main">
          {getDictionary(locale).chrome.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main className="relative z-1" id="main">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <JsonLd entities={SITE_GRAPH} />
      </body>
    </html>
  );
};

export default LocaleLayout;
