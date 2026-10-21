import { meridianBySlug, meridians } from '@/content/meridians';
import { localizedRoutes, resolveLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { ChapterContainer } from './components/ChapterContainer';

import type { Metadata } from 'next';
import type { JSX } from 'react';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * enumerate the content slugs included in the static export.
 * @returns the route parameters for each published entry.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return meridians.map((m) => ({ slug: m.slug }));
}

/**
 * builds search metadata for the channel chapter
 * @param props the locale and meridian route parameters
 * @param props.params the promised locale and meridian route parameters
 * @returns the localized title and description metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = resolveLocale(segment);
  const r = localizedRoutes(locale);
  const m = meridianBySlug(slug);
  if (!m) {
    return buildMetadata({ title: 'Meridian not found', description: '' });
  }

  return buildMetadata({
    title: `${m.name} meridian (${m.pinyin})`,
    description: m.canonicalOneLiner,
    path: `${r.meridian(slug)}/`,
  });
}

const MeridianPage = async ({ params }: Readonly<PageProps>): Promise<JSX.Element> => {
  const { locale: segment, slug } = await params;

  return <ChapterContainer locale={resolveLocale(segment)} slug={slug} />;
};

export default MeridianPage;
