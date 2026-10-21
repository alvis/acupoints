import { basicHan, learnTitle } from '@/features/learn/content';
import { learnCopy } from '@/features/learn/copy';
import { localizedRoutes } from '@/utilities/routes';

import type { seededBasicBySlug } from '@/content/basics';
import type { EditorialHubModule } from '@/content/editorial/schema';
import type { LearnCrumb } from '@/features/learn/components/LearnCrumbs';
import type { Locale } from '@/utilities/routes';

interface BasicArticleCrumbsParams {
  locale: Locale;
  slug: string;
  ed: EditorialHubModule | undefined;
  seeded: ReturnType<typeof seededBasicBySlug>;
}

/**
 * assemble the route and article breadcrumbs
 * @param props article identity and available content
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.ed authored article when available
 * @param props.seeded introductory article summary
 * @returns breadcrumbs in the page language
 */
export function basicArticleCrumbs({
  locale,
  slug,
  ed,
  seeded,
}: BasicArticleCrumbsParams): LearnCrumb[] {
  const copy = learnCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const zh = basicHan(slug, locale) ?? '';
  const key = `static/basics-${slug}`;
  const crumbs: LearnCrumb[] = [
    { href: r.basics, label: copy.learn, zh: english ? copy.learnHan : undefined },
    { href: r.basics, label: copy.basics, zh: english ? copy.basicsHan : undefined },
    {
      href: r.basic(slug),
      label: learnTitle(key, ed?.title ?? seeded?.title ?? copy.basics, locale),
      zh: english ? zh : undefined,
    },
  ];

  return crumbs;
}
