import { glossary, glossaryBySlug } from '@/content/glossary';
import { loadProseRegistry } from '@/content/pages';
import { learnTitle } from '@/features/learn/content';
import { summaryForLocale } from '@/utilities/i18n/locale-text';
import { localizedRoutes, resolveLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { GlossaryTerm } from './components/GlossaryTerm';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type PageProps = { params: Promise<{ locale: string; term: string }> };

/**
 * enumerate registry entries for static export.
 * @returns glossary term slugs for static export
 */
export function generateStaticParams(): Array<{ term: string }> {
  return glossary.map((entry) => ({ term: entry.slug }));
}

/**
 * build localized page metadata.
 * @param props localized route parameters
 * @param props.params localized route parameters
 * @returns localized search and social metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: segment, term } = await params;
  const locale = resolveLocale(segment);
  const r = localizedRoutes(locale);
  const entry = glossaryBySlug(term);
  if (!entry) {
    return buildMetadata({ title: 'Glossary entry', description: '' });
  }
  const ed =
    locale === 'en' ? undefined : (await loadProseRegistry()).hub('static', `glossary-${term}`);

  return buildMetadata({
    title: learnTitle(`static/glossary-${term}`, entry.term, locale),
    description: ed ? summaryForLocale(ed, locale) : entry.oneLiner,
    path: `${r.glossaryTerm(term)}/`,
  });
}

const GlossaryTermPage = async ({ params }: Readonly<PageProps>): Promise<ReactNode> => {
  const { locale, term } = await params;

  return <GlossaryTerm locale={resolveLocale(locale)} term={term} />;
};

export default GlossaryTermPage;
