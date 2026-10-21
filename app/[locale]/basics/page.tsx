import { resolveLocale, withLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { LearnHub } from './components/LearnHub';

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
    title: 'TCM basics',
    description:
      'A gentle, grounded introduction to the ideas that organize Traditional Chinese Medicine — qi, yin-yang, meridians, and the five elements.',
    path: withLocale(loc, '/basics/'),
  });
}

const BasicsIndex = async ({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<React.JSX.Element> => {
  const { locale } = await params;

  return <LearnHub locale={resolveLocale(locale)} />;
};

export default BasicsIndex;
