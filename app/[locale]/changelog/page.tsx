import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { ChangelogContainer } from './components/ChangelogContainer';

import type { Metadata } from 'next';

/**
 * prepare localized page metadata.
 * @param props page rendering context
 * @param props.params promised route parameters for the locale and entry
 * @returns localized page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/changelog'>): Promise<Metadata> {
  const loc = resolveLocale((await params).locale);

  return buildMetadata({
    title: 'Changelog',
    description:
      'A reverse-chronological record of notable changes to Acupoints — new features, fixes, performance work, and accessibility improvements.',
    path: withLocale(loc, '/changelog/'),
  });
}

const ChangelogPage = async ({
  params,
}: Readonly<PageProps<'/[locale]/changelog'>>): Promise<React.JSX.Element> => {
  return <ChangelogContainer locale={resolveLocale((await params).locale)} />;
};

export default ChangelogPage;
