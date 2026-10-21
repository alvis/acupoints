import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { MeridiansContainer } from './components/MeridiansContainer';

import type { Metadata } from 'next';
import type { JSX } from 'react';

type PageProps = { params: Promise<{ locale: string }> };

/**
 * builds search metadata for the meridians overview
 * @param props the locale route parameters
 * @param props.params the promised locale route parameter
 * @returns the localized title and description metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'The 14 meridians',
    description:
      'An index of the 14 classical meridians of Traditional Chinese Medicine — twelve primary channels plus the Du and Ren vessels.',
    path: withLocale(loc, '/meridians/'),
  });
}

const MeridiansIndexPage = async ({ params }: Readonly<PageProps>): Promise<JSX.Element> => {
  const locale = resolveLocale((await params).locale);

  return <MeridiansContainer locale={locale} />;
};

export default MeridiansIndexPage;
