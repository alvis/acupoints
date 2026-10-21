import { basicSlugs, seededBasicBySlug } from '@/content/basics';
import { basicHan, readingMinutes, shortReadingMinutes } from '@/features/learn/content';
import { learnCopy } from '@/features/learn/copy';
import { contentLabels } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { armForLocale } from '@/utilities/i18n/locale-text';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { basicArticleCrumbs } from './basicArticleCrumbs';
import { basicQuote } from './basicQuotes';

import type {
  EditorialArm,
  EditorialHubModule,
  EditorialSection,
} from '@/content/editorial/schema';
import type { LearnCrumb } from '@/features/learn/components/LearnCrumbs';
import type { LearnCopy } from '@/features/learn/copy';
import type { Locale } from '@/utilities/routes';

import type { Neighbour } from './BasicArticleDetails';

/** localized article presentation values */
export interface BasicArticleView {
  locale: Locale;
  slug: string;
  copy: LearnCopy;
  r: ReturnType<typeof localizedRoutes>;
  dict: ReturnType<typeof getDictionary>;
  labels: ReturnType<typeof contentLabels>;
  ed: EditorialHubModule;
  seeded: ReturnType<typeof seededBasicBySlug>;
  english: boolean;
  han: (text: string) => string;
  zh: string;
  articleKey: string;
  total: number;
  n: number;
  crumbs: LearnCrumb[];
  arm: EditorialArm;
  full: number;
  short: number;
  parts: number;
  prev: Neighbour | undefined;
  next: Neighbour | undefined;
  quote: ReturnType<typeof basicQuote>;
  quoteIndex: number;
  quoteSection: EditorialSection | undefined;
  opener: NonNullable<ReturnType<typeof seededBasicBySlug>>['opener'] | undefined;
}

/**
 * derive the article presentation from its authored edition
 * @param props article identity
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.ed authored article
 * @returns localized prose, reading facts, and reference destinations
 */
export const basicArticlePresentation = ({
  locale,
  slug,
  ed,
}: Pick<BasicArticleView, 'locale' | 'slug' | 'ed'>): Omit<
  BasicArticleView,
  'locale' | 'slug' | 'ed' | 'prev' | 'next'
> => {
  const copy = learnCopy(locale);
  const r = localizedRoutes(locale);
  const dict = getDictionary(locale);
  const labels = contentLabels(locale);
  const seeded = seededBasicBySlug(slug);
  const english = locale === 'en';
  const han = (text: string): string => armText(text, locale);
  const zh = basicHan(slug, locale) ?? '';
  const total = basicSlugs.length;
  const n = basicSlugs.indexOf(slug) + 1;
  const articleKey = `static/basics-${slug}`;

  const crumbs = basicArticleCrumbs({ locale, slug, ed, seeded });

  const arm = armForLocale(ed, locale);
  const full = readingMinutes(arm, locale);
  const short = shortReadingMinutes(arm, locale);
  const parts = arm.sections.length;
  const quote = basicQuote(slug);
  const quoteIndex = quote ? arm.sections.findIndex((s) => s.id === quote.sectionId) : -1;
  const quoteSection = arm.sections.find((_, index) => index === quoteIndex);
  const opener = english ? seeded?.opener : undefined;

  return {
    copy,
    r,
    dict,
    labels,
    seeded,
    english,
    han,
    zh,
    articleKey,
    total,
    n,
    crumbs,
    arm,
    full,
    short,
    parts,
    quote,
    quoteIndex,
    quoteSection,
    opener,
  };
};
