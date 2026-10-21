import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { ProtocolsIndex } from './components/ProtocolsIndex';

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
    title: 'Routines',
    description:
      'Gentle acupressure routines, one per everyday complaint, written out like old prescription slips: the points in order, about how long each takes and how hard the points are to find.',
    path: withLocale(loc, '/protocols/'),
  });
}

const ProtocolsPage = async ({ params }: Readonly<PageProps>): Promise<JSX.Element> => {
  const { locale } = await params;

  return <ProtocolsIndex locale={resolveLocale(locale)} />;
};

export default ProtocolsPage;
