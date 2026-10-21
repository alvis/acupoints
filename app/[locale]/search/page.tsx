import { translator } from '@/features/editorial/copy';
import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { SearchLanding } from './components/SearchLanding';
import { SEARCH_COPY } from './copy';

import type { Metadata } from 'next';

/**
 * prepare localized page metadata.
 * @param props localized route parameters
 * @param props.params promised locale route parameters
 * @returns localized page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/search'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);
  const t = translator(loc);

  return buildMetadata({
    title: t(SEARCH_COPY.metaTitle),
    description: t(SEARCH_COPY.metaDescription),
    path: withLocale(loc, '/search/'),
  });
}

const SearchPage = async ({
  params,
}: Readonly<PageProps<'/[locale]/search'>>): Promise<React.JSX.Element> => {
  return <SearchLanding locale={resolveLocale((await params).locale)} />;
};

export default SearchPage;
