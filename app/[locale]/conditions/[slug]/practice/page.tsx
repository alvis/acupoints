import { conditionBySlug, conditions } from '@/content/conditions';
import { loadProseRegistry } from '@/content/pages';
import { conditionsCopy } from '@/features/conditions/copy';
import { conditionSets } from '@/features/conditions/data';
import { fill } from '@/features/conditions/format';
import { localizedRoutes, resolveLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { PracticeArticle } from './components/PracticeArticle';

import type { Metadata } from 'next';
import type { JSX } from 'react';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * enumerate the content slugs included in the static export.
 * @returns the route parameters for each published entry.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return conditions.map((c) => ({ slug: c.slug }));
}

/**
 * selects a pregnancy warning before the authored point note
 * @param props route parameters for the localized metadata
 * @param props.params promised locale and condition route parameters
 * @returns localized title, description, canonical URL, and language alternates
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = resolveLocale(segment);
  const c = conditionBySlug(slug);
  if (!c) {
    return buildMetadata({ title: 'Condition not found', description: '' });
  }
  const copy = conditionsCopy(locale).practice;
  const set = conditionSets(locale, await loadProseRegistry()).find(
    (item) => item.condition.slug === c.slug,
  );
  const points = set?.points ?? [];

  return buildMetadata({
    title: fill(copy.title, { name: set?.label.name ?? c.name }),
    description: fill(copy.intro, {
      n: points.length,
      list: points.map((point) => point.name).join(copy.listJoin),
    }),
    path: `${localizedRoutes(locale).practice(slug)}/`,
  });
}

const PracticePage = async ({ params }: Readonly<PageProps>): Promise<JSX.Element> => {
  const { locale, slug } = await params;

  return <PracticeArticle locale={resolveLocale(locale)} slug={slug} />;
};

export default PracticePage;
