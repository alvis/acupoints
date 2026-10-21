import { translator } from '@/features/editorial/copy';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { PRIVACY_META, PrivacyPolicy } from './components/PrivacyPolicy';

import type { Metadata } from 'next';

/**
 * build localized metadata for the privacy page
 * @param props route parameters identifying the page’s edition
 * @param props.params promised locale route parameters
 * @returns localized metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/privacy'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);
  const t = translator(loc);

  return buildMetadata({
    title: t(PRIVACY_META.title),
    description: t(PRIVACY_META.description),
    path: withLocale(loc, '/privacy/'),
  });
}

const PrivacyPage = async ({
  params,
}: Readonly<PageProps<'/[locale]/privacy'>>): Promise<React.JSX.Element> => {
  return <PrivacyPolicy locale={resolveLocale((await params).locale)} />;
};

export default PrivacyPage;
