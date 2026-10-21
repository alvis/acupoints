import { translator } from '@/features/editorial/copy';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { DISCLAIMER_META, MedicalDisclaimer } from './components/MedicalDisclaimer';

import type { Metadata } from 'next';

/**
 * build localized metadata for the disclaimer page
 * @param props route parameters identifying the page’s edition
 * @param props.params promised locale route parameters
 * @returns localized metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/disclaimer'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);
  const t = translator(loc);

  return buildMetadata({
    title: t(DISCLAIMER_META.title),
    description: t(DISCLAIMER_META.description),
    path: withLocale(loc, '/disclaimer/'),
  });
}

const DisclaimerPage = async ({
  params,
}: Readonly<PageProps<'/[locale]/disclaimer'>>): Promise<React.JSX.Element> => {
  return <MedicalDisclaimer locale={resolveLocale((await params).locale)} />;
};

export default DisclaimerPage;
