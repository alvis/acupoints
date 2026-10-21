import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { RegionsContainer } from './components/RegionsContainer';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * build localized page metadata.
 * @param props localized route parameters
 * @param props.params localized route parameters
 * @returns localized search and social metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'Body regions',
    description:
      'Browse acupoints by body region — head, neck, shoulder, chest, back, arm, hand, leg, foot, and ear.',
    path: withLocale(loc, '/regions/'),
  });
}

const RegionsPage = async ({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<ReactNode> => {
  const { locale } = await params;

  return <RegionsContainer locale={resolveLocale(locale)} />;
};

export default RegionsPage;
