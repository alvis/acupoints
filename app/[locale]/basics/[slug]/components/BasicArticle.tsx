import { basicSlugs, basicSummaryBySlug, seededBasicBySlug } from '@/content/basics';
import { loadProseRegistry } from '@/content/pages';
import { LearnComingSoon } from '@/features/learn/components/LearnComingSoon';
import { learnTitle } from '@/features/learn/content';
import { learnCopy } from '@/features/learn/copy';
import { localizedRoutes } from '@/utilities/routes';

import { BasicArticleBody } from './BasicArticleBody';
import { basicArticleCrumbs } from './basicArticleCrumbs';
import { basicNeighbour } from './basicNeighbour';

import type { FC } from 'react';

import type { BasicArticleProps } from './BasicArticleDetails';

export type { BasicArticleProps } from './BasicArticleDetails';

/**
 * A basics article, as the Basics board sets it: the stop's cartouche and
 * emblem, a band with the article's own pull quote, the parts as numbered
 * cards under a reading-length toggle, the route to the neighbouring stops,
 * and the self-care limits, questions, sources and review line.
 * @param props locale and entry identity for the page
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @returns the basics article with its reading tools and reference sections
 */
export const BasicArticle: FC<BasicArticleProps> = async ({ locale, slug }) => {
  const copy = learnCopy(locale);
  const r = localizedRoutes(locale);
  const registry = await loadProseRegistry();
  const ed = registry.hub('static', `basics-${slug}`);
  const seeded = seededBasicBySlug(slug);
  const key = `static/basics-${slug}`;
  const n = basicSlugs.indexOf(slug) + 1;

  const crumbs = basicArticleCrumbs({ locale, slug, ed, seeded });

  if (!ed) {
    const summary = basicSummaryBySlug(slug);
    const title = learnTitle(key, seeded?.title ?? summary?.label ?? copy.basics, locale);

    return (
      <LearnComingSoon
        changelogHref={r.changelog}
        changelogLabel={copy.changelog}
        crumbs={crumbs}
        crumbsLabel={copy.breadcrumb}
        kicker={`${copy.basicsHan} · ${copy.comingSoon}`}
        oneLiner={seeded?.oneLiner ?? summary?.oneLiner ?? copy.comingText}
        rssLabel={copy.rssFeed}
        text={copy.comingText}
        title={title}
      />
    );
  }

  const prev = basicNeighbour({ n, offset: -1, registry, locale });
  const next = basicNeighbour({ n, offset: 1, registry, locale });

  return <BasicArticleBody {...{ locale, slug, ed, prev, next }} />;
};
