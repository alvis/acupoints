import { translator } from '@/features/editorial/copy';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { AFFILIATE_META, AffiliateDisclosure } from './components/AffiliateDisclosure';

import type { Metadata } from 'next';

/**
 * build localized metadata for the affiliate disclosure page
 * @param props route parameters identifying the page’s edition
 * @param props.params promised locale route parameters
 * @returns localized metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/affiliate-disclosure'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);
  const t = translator(loc);

  return buildMetadata({
    title: t(AFFILIATE_META.title),
    description: t(AFFILIATE_META.description),
    path: withLocale(loc, '/affiliate-disclosure/'),
  });
}

const AffiliatePage = async ({
  params,
}: Readonly<PageProps<'/[locale]/affiliate-disclosure'>>): Promise<React.JSX.Element> => {
  return <AffiliateDisclosure locale={resolveLocale((await params).locale)} />;
};

export default AffiliatePage;
