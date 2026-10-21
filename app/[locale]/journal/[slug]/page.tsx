import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/primitives/JsonLd';
import { loadProseRegistry } from '@/content/pages';
import { learnTitle } from '@/features/learn/content';
import { EDITORIAL_ID, ORG_ID, SITE_ID } from '@/utilities/editorial';
import { summaryForLocale } from '@/utilities/i18n/locale-text';
import { localeToHtmlLang, localizedRoutes, resolveLocale, SITE } from '@/utilities/routes';
import { buildMetadata } from '@/utilities/seo';

import { JournalPost } from './components/JournalPost';

import type { Metadata } from 'next';
import type { Thing } from 'schema-dts';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/**
 * enumerate statically exported routes
 * @returns static route parameters
 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return (await loadProseRegistry()).journal.map((post) => ({ slug: post.slug }));
}

/**
 * find the journal entry for the URL segment
 * @param slug entry URL segment
 * @returns the matching journal entry, when published
 */
async function postBySlug(
  slug: string,
): Promise<Awaited<ReturnType<typeof loadProseRegistry>>['journal'][number] | undefined> {
  return (await loadProseRegistry()).journal.find((p) => p.slug === slug);
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
  const post = await postBySlug(slug);
  if (!post) {
    return buildMetadata({ title: 'Journal post not found', description: '' });
  }

  return buildMetadata({
    title: learnTitle(`journal/${post.slug}`, post.title, locale),
    description: summaryForLocale(post, locale),
    path: `${r.journalPost(post.slug)}/`,
    image: post.ogImage,
  });
}

const JournalPostPage = async ({ params }: Readonly<PageProps>): Promise<React.JSX.Element> => {
  const { locale: segment, slug } = await params;
  const locale = resolveLocale(segment);
  const r = localizedRoutes(locale);
  const post = await postBySlug(slug);
  if (!post) {
    notFound();
  }

  const pagePath = r.journalPost(post.slug);
  const title = learnTitle(`journal/${post.slug}`, post.title, locale);
  const pageUrl = `${SITE.url}${pagePath}`;
  // Feed idiom: publishedAt is optional on the shared hub-module shape.
  const published = post.publishedAt ?? post.updatedAt ?? post.lastReviewed;
  const modified = post.updatedAt ?? published;

  const crumbs = [
    { href: r.home, label: 'Home' },
    { href: r.journal, label: 'Journal' },
    { href: pagePath, label: title },
  ];

  const entities: Thing[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      'itemListElement': crumbs.map((c, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': c.label,
        'item': c.href.startsWith('http') ? c.href : `${SITE.url}${c.href}`,
      })),
    },
    {
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      'url': pageUrl,
      'headline': title,
      'description': summaryForLocale(post, locale),
      'datePublished': published.toISOString(),
      'dateModified': modified.toISOString(),
      'inLanguage': localeToHtmlLang(locale),
      'author': { '@id': EDITORIAL_ID },
      'publisher': { '@id': ORG_ID },
      'isPartOf': { '@id': SITE_ID },
      'citation': post.sources.map((s) => ({
        '@type': 'CreativeWork',
        'name': s,
      })),
      // The post's lead summary suppresses its own Speakable JSON-LD
      // because the page graph owns .speakable.
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['.speakable'],
      },
    },
  ];

  return (
    <>
      <JournalPost locale={locale} slug={post.slug} />

      <JsonLd entities={entities} />
    </>
  );
};

export default JournalPostPage;
