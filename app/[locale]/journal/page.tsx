import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { JournalIndex } from './components/JournalIndex';

import type { Metadata } from 'next';
/**
 * build localized search metadata
 * @param props page rendering context
 * @param props.params promised route parameters for the locale and entry
 * @returns localized metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'Journal',
    description:
      'Long-form editorial essays on acupressure self-care — how to read a point, how to practice safely, and what the classical sources actually say.',
    path: withLocale(loc, '/journal/'),
  });
}

const JournalIndexPage = async ({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<React.JSX.Element> => {
  const { locale } = await params;

  return <JournalIndex locale={resolveLocale(locale)} />;
};

export default JournalIndexPage;
