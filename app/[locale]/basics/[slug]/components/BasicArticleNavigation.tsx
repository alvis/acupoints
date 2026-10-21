import Link from 'next/link';

import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { LearnCopy } from '@/features/learn/copy';
import type { Locale } from '@/utilities/routes';

import type { Neighbour } from './BasicArticleDetails';

type BasicArticleNavigationProps = {
  locale: Locale;
  copy: LearnCopy;
  english: boolean;
  prev: Neighbour | undefined;
  next: Neighbour | undefined;
};

/**
 * link the adjacent stops along the basics route
 * @param props links to the previous and next basics stops
 * @param props.locale page language and writing system
 * @param props.copy localized interface text
 * @param props.english whether this edition is English
 * @param props.prev previous basics stop
 * @param props.next next basics stop
 * @returns links to the previous and next basics stops
 */
export const BasicArticleNavigation: FC<Readonly<BasicArticleNavigationProps>> = ({
  locale,
  copy,
  english,
  prev,
  next,
}) => (
  <nav
    aria-label={copy.basicsNav}
    className="
      mt-14 grid gap-6 border-t-[2.5px] border-b border-ink py-5
      md:grid-cols-2
    ">
    {prev ? (
      <Link className="flex flex-wrap items-baseline gap-3 no-underline" href={prev.href}>
        <span aria-hidden="true" className="text-[1.375rem]">
          ←
        </span>
        <span className="cap">{fill(copy.stopN, { n: countWord(prev.n, locale) })}</span>
        <span aria-hidden="true" className="tc text-[1.625rem] font-bold">
          {prev.zh}
        </span>
        <span
          className={cn(
            'text-[1.25rem] underline underline-offset-4',
            !english &&
              `tc`,
          )}>
          {prev.title}
        </span>
      </Link>
    ) : (
      <span />
    )}
    {next ? (
      <Link
        className="
          flex flex-wrap items-baseline gap-3 no-underline
          md:justify-end
        "
        href={next.href}>
        <span className="cap">{fill(copy.stopN, { n: countWord(next.n, locale) })}</span>
        <span
          className={cn(
            'text-[1.5rem] font-medium underline underline-offset-4',
            !english && 'tc',
          )}>
          {fill(copy.nextStop, { title: next.title })}
        </span>
        <span aria-hidden="true" className="tc text-[1.625rem] font-bold">
          {next.zh}
        </span>
        <span aria-hidden="true" className="text-[1.5rem]">
          →
        </span>
      </Link>
    ) : null}
  </nav>
);
