import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { ConditionsIndex } from './components/ConditionsIndex';

import type { Metadata } from 'next';
import type { JSX } from 'react';

type PageProps = { params: Promise<{ locale: string }> };

/**
 * selects a pregnancy warning before the authored point note
 * @param props route parameters for the localized metadata
 * @param props.params promised locale and condition route parameters
 * @returns localized title, description, canonical URL, and language alternates
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'Acupressure by condition',
    description:
      'Browse classical acupoint suggestions by everyday concern — headache, neck strain, nausea, bloating, fatigue, sleep, knee pain and more — each with the Chinese-medicine and research sources behind it.',
    path: withLocale(loc, '/conditions/'),
  });
}

const ConditionsIndexPage = async ({ params }: Readonly<PageProps>): Promise<JSX.Element> => {
  const { locale } = await params;

  return <ConditionsIndex locale={resolveLocale(locale)} />;
};

export default ConditionsIndexPage;
