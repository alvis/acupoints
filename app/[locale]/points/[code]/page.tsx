import { pointByCode, points } from '@/content/points';
import { localizedRoutes, resolveLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { PointLeafContainer } from './components/PointLeafContainer';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export type PageProps = { params: Promise<{ locale: string; code: string }> };

/**
 * enumerate registry entries for static export.
 * @returns the locale and point-code combinations for static export
 */
export function generateStaticParams(): Array<{ code: string }> {
  return points.map((p) => ({ code: p.code.toLowerCase() }));
}

/**
 * build localized page metadata.
 * @param props route parameters for the localized point leaf
 * @param props.params localized route parameters
 * @returns localized search and social metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: segment, code } = await params;
  const locale = resolveLocale(segment);
  const r = localizedRoutes(locale);
  const point = pointByCode(code);
  if (!point) {
    return buildMetadata({ title: 'Point not found', description: 'Unknown point code.' });
  }

  return buildMetadata({
    title: `${point.code} ${point.name} (${point.pinyin})`,
    description: point.canonicalOneLiner,
    path: `${r.point(point.code)}/`,
  });
}

/**
 * A point leaf (葉): composition only; the container loads and renders it.
 * @param props route parameters for the localized point leaf
 * @param props.params localized route parameters
 * @returns the localized point leaf page
 */
const PointDetailPage = async ({ params }: Readonly<PageProps>): Promise<ReactNode> => {
  const { locale: segment, code } = await params;

  return <PointLeafContainer code={code} locale={resolveLocale(segment)} />;
};

export default PointDetailPage;
