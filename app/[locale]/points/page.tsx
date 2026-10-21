import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { PointsIndexContainer } from './components/PointsIndexContainer';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export type PageProps = { params: Promise<{ locale: string }> };

/**
 * build localized page metadata.
 * @param props route parameters for the localized points index
 * @param props.params localized route parameters
 * @returns localized search and social metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'All acupoints',
    description:
      'Browse every WHO-standardized acupoint on the 14 classical meridians — code, pinyin, hanzi, and a calm one-line summary each.',
    path: withLocale(loc, '/points/'),
  });
}

/**
 * The points index (目錄): composition only.
 * @param props route parameters for the localized points index
 * @param props.params localized route parameters
 * @returns the localized points index page
 */
const PointsIndexPage = async ({ params }: Readonly<PageProps>): Promise<ReactNode> => {
  const { locale: segment } = await params;

  return <PointsIndexContainer locale={resolveLocale(segment)} />;
};

export default PointsIndexPage;
