import { orderedRegionSlugs, regionBySlug } from '@/content/regions';
import { localizedRoutes, resolveLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { RegionContainer } from './components/RegionContainer';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * enumerate registry entries for static export.
 * @returns body-region slugs for static export
 */
export function generateStaticParams(): Array<{
  slug: 'head' | 'neck' | 'shoulder' | 'chest' | 'back' | 'arm' | 'hand' | 'leg' | 'foot' | 'ear';
}> {
  return orderedRegionSlugs.map((slug) => ({ slug }));
}

/**
 * build localized page metadata.
 * @param props localized route parameters
 * @param props.params localized route parameters
 * @returns localized search and social metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = resolveLocale(segment);
  const r = localizedRoutes(locale);
  const region = regionBySlug(slug);
  if (!region) {
    return buildMetadata({ title: 'Region not found', description: '' });
  }

  return buildMetadata({
    title: `Points in the ${region.name.toLowerCase()}`,
    description: region.summary,
    path: `${r.region(slug)}/`,
  });
}

const RegionPage = async ({ params }: Readonly<PageProps>): Promise<ReactNode> => {
  const { locale: segment, slug } = await params;

  return <RegionContainer locale={resolveLocale(segment)} slug={slug} />;
};

export default RegionPage;
