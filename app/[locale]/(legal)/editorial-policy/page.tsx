import { translator } from '@/features/editorial/copy';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { EDITORIAL_META, EditorialPolicy } from './components/EditorialPolicy';

import type { Metadata } from 'next';

/**
 * build localized metadata for the editorial policy page
 * @param props route parameters identifying the page’s edition
 * @param props.params promised locale route parameters
 * @returns localized metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/editorial-policy'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);
  const t = translator(loc);

  return buildMetadata({
    title: t(EDITORIAL_META.title),
    description: t(EDITORIAL_META.description),
    path: withLocale(loc, '/editorial-policy/'),
  });
}

const EditorialPolicyPage = async ({
  params,
}: Readonly<PageProps<'/[locale]/editorial-policy'>>): Promise<React.JSX.Element> => {
  return <EditorialPolicy locale={resolveLocale((await params).locale)} />;
};

export default EditorialPolicyPage;
