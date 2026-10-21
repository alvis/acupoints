import { basicSlugs } from '@/content/basics';
import { basicHan, learnTitle } from '@/features/learn/content';
import { localizedRoutes } from '@/utilities/routes';

import type { loadProseRegistry } from '@/content/pages';
import type { Locale } from '@/utilities/routes';

import type { Neighbour } from './BasicArticleDetails';

interface BasicNeighbourParams {
  n: number;
  offset: number;
  registry: Awaited<ReturnType<typeof loadProseRegistry>>;
  locale: Locale;
}

/**
 * locate an adjacent published basics stop
 * @param props position and localized content
 * @param props.n current stop number
 * @param props.offset direction along the route
 * @param props.registry loaded editorial content
 * @param props.locale page language and writing system
 * @returns the adjacent stop when its editorial content exists
 */
export function basicNeighbour({
  n,
  offset,
  registry,
  locale,
}: BasicNeighbourParams): Neighbour | undefined {
  const other = basicSlugs[n - 1 + offset];
  const otherEd = other ? registry.hub('static', `basics-${other}`) : undefined;
  if (!other || !otherEd) {
    return undefined;
  }

  return {
    slug: other,
    n: n + offset,
    zh: basicHan(other, locale) ?? '',
    title: learnTitle(`static/basics-${other}`, otherEd.title, locale),
    href: localizedRoutes(locale).basic(other),
  };
}
