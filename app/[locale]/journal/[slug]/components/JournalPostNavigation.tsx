import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { LearnCopy } from '@/features/learn/copy';

import type { Neighbour } from './JournalPostDetails';

type JournalPostNavigationProps = {
  copy: LearnCopy;
  english: boolean;
  older: Neighbour | undefined;
  newer: Neighbour | undefined;
};

/**
 * link the neighboring journal guides
 * @param props links to the older and newer journal guides
 * @param props.copy localized interface text
 * @param props.english whether this edition is English
 * @param props.older previous journal entry
 * @param props.newer next journal entry
 * @returns links to the older and newer journal guides
 */
export const JournalPostNavigation: FC<Readonly<JournalPostNavigationProps>> = ({
  copy,
  english,
  older,
  newer,
}) => (
  <nav
    aria-label={copy.moreJournal}
    className="
      mt-12 grid gap-6 border-t-[2.5px] border-b border-ink py-[18px]
      md:grid-cols-2
    ">
    {older ? (
      <Link className="flex items-baseline gap-3 no-underline" href={older.href}>
        <span aria-hidden="true" className="text-[1.375rem]">
          ←
        </span>
        {older.tag ? (
          <span aria-hidden="true" className="tc text-[1.25rem] font-bold">
            {older.tag}
          </span>
        ) : null}
        <span
          className={cn(
            'text-[1.25rem] underline underline-offset-4',
            !english &&
              `tc`,
          )}>
          {older.title}
        </span>
      </Link>
    ) : (
      <span />
    )}
    {newer ? (
      <Link
        className="
          flex items-baseline gap-3 no-underline
          md:justify-end
        "
        href={newer.href}>
        <span
          className={cn(
            'text-[1.25rem] underline underline-offset-4',
            !english &&
              `tc`,
          )}>
          {newer.title}
        </span>
        {newer.tag ? (
          <span aria-hidden="true" className="tc text-[1.25rem] font-bold">
            {newer.tag}
          </span>
        ) : null}
        <span aria-hidden="true" className="text-[1.375rem]">
          →
        </span>
      </Link>
    ) : null}
  </nav>
);
