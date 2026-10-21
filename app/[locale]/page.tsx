import { JsonLd } from '@/components/primitives/JsonLd';
import { EDITORIAL_ID, ORG_ID, SITE_ID } from '@/utilities/editorial';
import { resolveLocale, SITE, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { HomeFrontLeaf } from './components/HomeFrontLeaf';

import type { Metadata } from 'next';
import type { Thing } from 'schema-dts';

/** Route params for a locale's home page. */
type HomePageProps = { params: Promise<{ locale: string }> };

/** The home page's structured data: the site's front page as a reviewed medical web page. */
const HOME_ENTITIES: readonly Thing[] = [
  {
    '@type': 'MedicalWebPage',
    '@id': `${SITE.url}/#page`,
    'url': SITE.url,
    'name': SITE.name,
    'description': SITE.description,
    'isPartOf': { '@id': SITE_ID },
    'about': { '@id': ORG_ID },
    'reviewedBy': { '@id': EDITORIAL_ID },
    'lastReviewed': '2026-04-15',
  },
];

/**
 * prepare localized page metadata.
 * @param props route parameters identifying the page’s edition
 * @param props.params promised locale route parameters
 * @returns localized page metadata.
 */
export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: SITE.name,
    description: SITE.description,
    path: withLocale(loc, '/'),
  });
}

/**
 * Home: the book's front leaf, plus the page's structured data.
 * @param props route parameters identifying the front leaf’s edition
 * @param props.params promised locale route parameters
 * @returns the book’s front leaf and home-page structured data
 */
const HomePage = async ({ params }: Readonly<HomePageProps>): Promise<React.JSX.Element> => {
  const locale = resolveLocale((await params).locale);

  return (
    <>
      <HomeFrontLeaf locale={locale} />
      <JsonLd entities={HOME_ENTITIES} />
    </>
  );
};

export default HomePage;
