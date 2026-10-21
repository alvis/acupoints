import Link from 'next/link';

import { Speakable } from '@/components/primitives/Speakable';
import { Cartouche } from '@/features/learn/components/Cartouche';
import { FactList } from '@/features/learn/components/FactList';
import { JournalRow } from '@/features/learn/components/JournalRow';
import { LearnCrumbs } from '@/features/learn/components/LearnCrumbs';
import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { FRAME, H2, HEAD_RULE } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';

import { loadLearnHub } from './learnHubData';
import { LearnHubReferenceShelf } from './LearnHubReferenceShelf';
import { LearnHubStops } from './LearnHubStops';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

type LearnHubBodyProps = { locale: Locale };

/**
 * assemble the learning hub and its shelves
 * @param props page language
 * @param props.locale page language and writing system
 * @returns the learning hub hero and article shelves
 */
export const LearnHubBody: FC<Readonly<LearnHubBodyProps>> = async ({ locale }) => {
  const {
    copy,
    r,
    stops,
    basicsMinutes,
    rows,
    terms,
    routines,
    han,
    english,
    crumbs,
    facts,
    first,
  } = await loadLearnHub({ locale });

  return (
    <div className={cn(FRAME, `pb-20`)}>
      <LearnCrumbs items={crumbs} label={copy.breadcrumb} />

      <section
        className="
          mt-[34px] grid items-start gap-10
          lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14
        ">
        <div className="flex items-start gap-[30px]">
          <Cartouche vertical={`${copy.basicsHan} · ${copy.journalHan}`} zh={copy.learnHan} />
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
              {copy.hubTitle}
            </h1>
            <Speakable
              as="p"
              className="
                m-0 max-w-[600px] font-[inherit] text-lead/normal not-italic
              ">
              {fill(copy.hubLede, { n: countWord(stops.length, locale, true) })}
            </Speakable>
            <div className="flex flex-wrap items-center gap-3.5">
              {first ? (
                <Link className="btn btn-primary no-underline" href={first.href}>
                  {copy.startCta}
                </Link>
              ) : null}
              <a className="btn btn-secondary no-underline" href="#journal">
                {copy.journalCta}
              </a>
            </div>
          </div>
        </div>
        <FactList rows={facts} />
      </section>

      <LearnHubStops {...{ han, copy, stops, locale, basicsMinutes }} />

      <section aria-labelledby="jh" className="mt-[72px] scroll-mt-6" id="journal">
        <div className={cn('flex flex-wrap items-baseline gap-x-5 gap-y-1', HEAD_RULE)}>
          <span aria-hidden="true" className="tc text-[1.875rem] font-black">
            {copy.journalHan}
          </span>
          <h2 className={H2} id="jh">
            <Link className="wb-link" href={r.journal}>
              {copy.journalHeading}
            </Link>
          </h2>
          <span className="flex-1" />
          <span className="text-base text-ink-soft">{copy.journalNote}</span>
        </div>
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
      </section>

      <LearnHubReferenceShelf {...{ copy, r, terms, english, han, routines }} />
    </div>
  );
};
