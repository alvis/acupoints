import { JsonLd } from '@/components/primitives/JsonLd';
import { editorialPerson, organization } from '@/utilities/editorial';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { AboutContainer } from './components/AboutContainer';

import type { Metadata } from 'next';

/**
 * build localized metadata for the about page
 * @param props route parameters identifying the page’s edition
 * @param props.params promised locale route parameters
 * @returns localized metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'About Acupoints',
    description:
      'Acupoints.com is a calm, modern reference for the 361 WHO-standardized acupoints — edited by a small team, sourced from classical texts and current reviews.',
    path: withLocale(loc, '/about/'),
  });
}

const JSON_LD = [organization, editorialPerson];

const AboutPage = async ({
  params,
}: Readonly<PageProps<'/[locale]/about'>>): Promise<React.JSX.Element> => {
  const locale = resolveLocale((await params).locale);

  return (
    <>
      <AboutContainer locale={locale} />
      <JsonLd entities={JSON_LD} />
    </>
  );
};

export default AboutPage;
