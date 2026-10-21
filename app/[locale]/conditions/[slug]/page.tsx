import { conditionBySlug, conditions } from '@/content/conditions';
import { loadProseRegistry } from '@/content/pages';
import { conditionLabel } from '@/features/conditions/copy';
import { summaryForLocale } from '@/utilities/i18n/locale-text';
import { localizedRoutes, resolveLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { ConditionArticle } from './components/ConditionArticle';

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
  const r = localizedRoutes(locale);
  const c = conditionBySlug(slug);
  if (!c) {
    return buildMetadata({ title: 'Condition not found', description: '' });
  }
  const proseModule = (await loadProseRegistry()).hub('condition', c.slug);

  return buildMetadata({
    title: conditionLabel(locale, c).name,
    description:
      locale === 'en' || !proseModule ? c.canonicalOneLiner : summaryForLocale(proseModule, locale),
    path: `${r.condition(slug)}/`,
  });
}

const ConditionPage = async ({ params }: Readonly<PageProps>): Promise<JSX.Element> => {
  const { locale, slug } = await params;

  return <ConditionArticle locale={resolveLocale(locale)} slug={slug} />;
};

export default ConditionPage;
