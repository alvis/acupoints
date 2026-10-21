import { basicSlugs, basicSummaryBySlug, seededBasicBySlug } from '@/content/basics';
import { loadProseRegistry } from '@/content/pages';
import { learnTitle } from '@/features/learn/content';
import { summaryForLocale } from '@/utilities/i18n/locale-text';
import { localizedRoutes, resolveLocale } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { BasicArticle } from './components/BasicArticle';

import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * enumerate statically exported routes
 * @returns static route parameters
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return basicSlugs.map((slug) => ({ slug }));
}

/**
 * build localized search metadata
 * @param props page rendering context
 * @param props.params promised route parameters for the locale and entry
 * @returns localized metadata
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: segment, slug } = await params;
  const locale = resolveLocale(segment);
  const r = localizedRoutes(locale);
  const key = `static/basics-${slug}`;
  const seeded = seededBasicBySlug(slug);
  const ed =
    locale === 'en' ? undefined : (await loadProseRegistry()).hub('static', `basics-${slug}`);
  if (seeded) {
    return buildMetadata({
      title: learnTitle(key, seeded.title, locale),
      description: ed ? summaryForLocale(ed, locale) : seeded.oneLiner,
      path: `${r.basic(slug)}/`,
    });
  }
  const other = basicSummaryBySlug(slug);

  return buildMetadata({
    title: other ? learnTitle(key, other.label, locale) : 'Basics',
    description: other ? other.oneLiner : 'TCM basics',
    path: `${r.basic(slug)}/`,
  });
}

const BasicsEntryPage = async ({ params }: Readonly<PageProps>): Promise<React.JSX.Element> => {
  const { locale, slug } = await params;

  return <BasicArticle locale={resolveLocale(locale)} slug={slug} />;
};

export default BasicsEntryPage;
