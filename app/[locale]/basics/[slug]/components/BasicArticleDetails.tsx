import { formatDate } from '@/utilities/i18n/date';

import type { FC } from 'react';

import type { LearnCopy } from '@/features/learn/copy';
import type { Locale } from '@/utilities/routes';
/** Props for the page renderer. */
export type BasicArticleProps = {
  locale: Locale;
  slug: string;
};

export type Neighbour = {
  slug: string;
  n: number;
  zh: string;
  title: string;
  href: string;
};

export const PART = 'flex flex-col gap-3.5 px-[26px] pt-6 pb-[22px]';

export type ReviewedTextProps = {
  reviewed: Date;
  locale: Locale;
  template: string;
};

export const REVIEWED_DATE: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

/**
 * The hero's plain "Last reviewed 26 Aug 2026" line.
 * @param props review date inserted into the localized sentence
 * @param props.reviewed date of the latest editorial review
 * @param props.locale page language and writing system
 * @param props.template localized review sentence containing a {date} slot
 * @returns the review date inserted into the localized sentence
 */
export const ReviewedText: FC<ReviewedTextProps> = ({ reviewed, locale, template }) => {
  const [before, after = ''] = template.split('{date}');

  return (
    <span>
      {before}
      <time dateTime={reviewed.toISOString()}>{formatDate(reviewed, locale, REVIEWED_DATE)}</time>
      {after}
    </span>
  );
};

/**
 * choose the accessible label for the basics emblem
 * @param slug entry URL segment
 * @param copy localized interface text
 * @returns the accessible name for the article emblem
 */
export function emblemLabel(slug: string, copy: LearnCopy): string {
  return slug === 'yin-and-yang'
    ? copy.yinYangLabel
    : slug === 'five-elements'
      ? copy.fiveLabel
      : copy.qiLabel;
}

/**
 * choose the explanation beneath the basics emblem
 * @param slug entry URL segment
 * @param copy localized interface text
 * @returns the caption explaining the article emblem
 */
export function emblemCaption(slug: string, copy: LearnCopy): string {
  return slug === 'yin-and-yang'
    ? copy.yinYangCaption
    : slug === 'five-elements'
      ? copy.fiveCaption
      : copy.qiCaption;
}
