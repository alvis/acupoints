import { pointsText } from '@/features/points/labels';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { SealsContainer } from './components/SealsContainer';

import type { Metadata } from 'next';

export type PageProps = { params: Promise<{ locale: string }> };

/**
 * prepare localized page metadata.
 * @param props localized route parameters
 * @param props.params promised locale route parameters
 * @returns localized page metadata.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = pointsText(locale).seals;

  // A private, per-browser page: kept out of the index, links still followed.
  return {
    ...buildMetadata({
      title: t.metaTitle,
      description: t.metaDescription,
      path: withLocale(locale, '/seals/'),
    }),
    robots: { index: false, follow: true },
  };
}

/**
 * My seals (印譜): composition only.
 * @param props localized route parameters
 * @param props.params promised locale route parameters
 */
const SealsPage = async ({ params }: Readonly<PageProps>): Promise<React.JSX.Element> => {
  const { locale: segment } = await params;

  return <SealsContainer locale={resolveLocale(segment)} />;
};

export default SealsPage;
