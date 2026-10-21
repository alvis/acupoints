import Link from 'next/link';

import { basicSlugs } from '@/content/basics';
import { Cartouche } from '@/features/learn/components/Cartouche';
import { FactList } from '@/features/learn/components/FactList';
import { JournalRow } from '@/features/learn/components/JournalRow';
import { LearnCrumbs } from '@/features/learn/components/LearnCrumbs';
import { publishedOn } from '@/features/learn/content';
import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { FRAME, H2, HEAD_RULE } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';
import { formatDate } from '@/utilities/i18n/date';
import { SITE } from '@/utilities/routes';

import { NEWEST_DATE } from './JournalIndexDetails';

import type { FC } from 'react';

import type { EditorialHubModule } from '@/content/editorial/schema';
import type { FactRow } from '@/features/learn/components/FactList';
import type { JournalRowProps } from '@/features/learn/components/JournalRow';
import type { LearnCopy } from '@/features/learn/copy';
import type { Locale, localizedRoutes } from '@/utilities/routes';

type JournalIndexBodyProps = {
  locale: Locale;
  copy: LearnCopy;
  r: ReturnType<typeof localizedRoutes>;
  rows: Array<JournalRowProps & { slug: string }>;
  newest: EditorialHubModule<'journal'> | undefined;
  crumbs: Array<{ href: string; label: string; zh: string | undefined }>;
  facts: FactRow[];
};

/**
 * render a section of the localized page
 * @param props journal title, publication facts, and ordered guide rows
 * @param props.locale page language and writing system
 * @param props.copy localized interface text
 * @param props.r localized destination routes
 * @param props.rows ordered journal rows
 * @param props.newest most recent published entry
 * @param props.crumbs breadcrumb labels and destinations
 * @param props.facts summary facts for the hero
 * @returns the journal title, publication facts, and ordered guide rows
 */
export const JournalIndexBody: FC<Readonly<JournalIndexBodyProps>> = ({
  locale,
  copy,
  r,
  rows,
  newest,
  crumbs,
  facts,
}) => (
  <div className={cn(FRAME, `pb-20`)}>
    <LearnCrumbs items={crumbs} label={copy.breadcrumb} />

    <section
      className="
        mt-[34px] grid items-start gap-10
        lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14
      ">
      <div className="flex items-start gap-[30px]">
        <Cartouche zh={copy.journalHan} />
        <div className="flex flex-col gap-3.5 pt-2">
          <span className="cap">
            <span aria-hidden="true" className="tc">
              {copy.learnHan}
            </span>{' '}
            · {copy.learn}
          </span>
          <h1
            className="
              m-0 text-[2.75rem] leading-none font-medium tracking-[-0.01em]
              md:text-[3.75rem]
            ">
            {copy.journalHeading}
          </h1>
          <p className="m-0 max-w-[600px] text-lead/normal">
            {fill(copy.journalLede, { site: SITE.name })}
          </p>
        </div>
      </div>
      <FactList rows={facts} />
    </section>

    <section aria-labelledby="jh" className="mt-16">
      <div className={cn('flex flex-wrap items-baseline gap-x-5 gap-y-1', HEAD_RULE)}>
        <span aria-hidden="true" className="tc text-[1.875rem] font-black">
          {copy.journalHan}
        </span>
        <h2 className={H2} id="jh">
          {copy.journal}
        </h2>
        <span className="flex-1" />
        <span className="text-base text-ink-soft">{copy.journalNote}</span>
      </div>
      {rows.length > 0 ? (
        <ol
          className="
            relative m-0 grid list-none gap-x-14 p-0
            md:grid-cols-2
            md:before:absolute md:before:inset-y-0 md:before:left-1/2
            md:before:w-px md:before:bg-ink
          ">
          {rows.map((row) => (
            <JournalRow key={row.slug} {...row} />
          ))}
        </ol>
      ) : (
        <p className="r1 mt-6 px-6 py-5 text-base text-ink-soft">
          {copy.journalEmpty}{' '}
          <a className="wb-link" href="/feed.xml">
            {copy.rssFeed}
          </a>{' '}
          ·{' '}
          <Link className="wb-link" href={r.changelog}>
            {copy.changelog}
          </Link>
        </p>
      )}
    </section>

    <nav
      aria-labelledby="also"
      className="
        mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t-[2.5px]
        border-b border-ink py-[18px]
      ">
      <h2 className="cap m-0" id="also">
        {copy.alsoInLearn}
      </h2>
      <Link className="flex items-baseline gap-2.5 no-underline" href={r.basics}>
        <span aria-hidden="true" className="tc text-[1.25rem] font-bold">
          {copy.basicsHan}
        </span>
        <span className="text-[1.15rem] underline underline-offset-4">
          {fill(copy.basicsLinkText, { n: countWord(basicSlugs.length, locale) })}
        </span>
      </Link>
      <Link className="flex items-baseline gap-2.5 no-underline" href={r.glossary}>
        <span aria-hidden="true" className="tc text-[1.25rem] font-bold">
          {copy.glossaryHan}
        </span>
        <span className="text-[1.15rem] underline underline-offset-4">{copy.glossaryLinkText}</span>
      </Link>
      {newest ? (
        <span className="text-sm text-ink-soft">
          {copy.statNewest} · {formatDate(publishedOn(newest), locale, NEWEST_DATE)}
        </span>
      ) : null}
    </nav>
  </div>
);
