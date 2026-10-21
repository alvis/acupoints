import { glossaryBySlug } from '@/content/glossary';
import { pointByCode } from '@/content/points';
import {
  journalTag,
  learnTitle,
  pointsNamedIn,
  publishedOn,
  splitTitle,
} from '@/features/learn/content';
import { learnCopy } from '@/features/learn/copy';
import { contentLabels } from '@/utilities/i18n/contentLabels';
import { getDictionary } from '@/utilities/i18n/dictionaries';
import { armForLocale } from '@/utilities/i18n/locale-text';
import { armText } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import { cunGuide } from './cunGuide';
import { CUN_SLUG } from './JournalPostDetails';

import type { EditorialArm, EditorialHubModule } from '@/content/editorial/schema';
import type { AnyPoint } from '@/content/schemas';
import type { NamedPoint } from '@/features/learn/content';
import type { LearnCopy } from '@/features/learn/copy';
import type { Locale } from '@/utilities/routes';

import type { CunGuide } from './cunGuide';
import type { Neighbour } from './JournalPostDetails';

/** localized article presentation values */
export interface JournalPostView {
  locale: Locale;
  slug: string;
  copy: LearnCopy;
  r: ReturnType<typeof localizedRoutes>;
  dict: ReturnType<typeof getDictionary>;
  labels: ReturnType<typeof contentLabels>;
  post: EditorialHubModule<'journal'>;
  english: boolean;
  han: (text: string) => string;
  arm: EditorialArm;
  zhArm: EditorialArm;
  title: string;
  main: string;
  sub: string | undefined;
  tag: string | undefined;
  guide: CunGuide | undefined;
  named: NamedPoint[];
  lead: NamedPoint | undefined;
  published: Date;
  parts: number;
  pagePath: string;
  glossaryHref: string;
  st36: AnyPoint | undefined;
  older: Neighbour | undefined;
  newer: Neighbour | undefined;
  crumbs: Array<{ href: string; label: string; zh: string | undefined }>;
}

/**
 * derive the article presentation from its authored edition
 * @param props article identity
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.post authored article
 * @returns localized prose, reading facts, and reference destinations
 */
export const journalPostPresentation = ({
  locale,
  slug,
  post,
}: Pick<JournalPostView, 'locale' | 'slug' | 'post'>): Omit<
  JournalPostView,
  'locale' | 'slug' | 'post' | 'older' | 'newer'
> => {
  const copy = learnCopy(locale);
  const r = localizedRoutes(locale);
  const dict = getDictionary(locale);
  const labels = contentLabels(locale);
  const english = locale === 'en';
  const han = (text: string): string => armText(text, locale);
  const arm = armForLocale(post, locale);
  const zhArm = armForLocale(post, 'zh-hant');
  const title = learnTitle(`journal/${slug}`, post.title, locale);
  const { main, sub } = splitTitle(title);
  const tag = journalTag(slug, locale);
  const guide = slug === CUN_SLUG ? cunGuide(locale) : undefined;
  const named = pointsNamedIn(arm, locale);
  const lead = guide ? undefined : named[0];
  const published = publishedOn(post);
  const parts = arm.sections.length;
  const pagePath = r.journalPost(slug);
  const glossaryHref = glossaryBySlug('cun') ? r.glossaryTerm('cun') : r.glossary;
  const st36 = pointByCode('ST36');

  const crumbs = [
    { href: r.basics, label: copy.learn, zh: english ? copy.learnHan : undefined },
    { href: r.journal, label: copy.journal, zh: english ? copy.journalHan : undefined },
    { href: pagePath, label: main, zh: english ? tag : undefined },
  ];

  return {
    copy,
    r,
    dict,
    labels,
    english,
    han,
    arm,
    zhArm,
    title,
    main,
    sub,
    tag,
    guide,
    named,
    lead,
    published,
    parts,
    pagePath,
    glossaryHref,
    st36,
    crumbs,
  };
};
