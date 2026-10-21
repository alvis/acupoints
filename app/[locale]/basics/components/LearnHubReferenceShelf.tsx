import Link from 'next/link';

import { Seal } from '@/components/primitives/Seal';
import { H2 } from '@/features/learn/layout';

import type { FC } from 'react';

import type { LearnCopy } from '@/features/learn/copy';
import type { localizedRoutes } from '@/utilities/routes';

import type { TeaserTerm } from './glossaryTeaser';
import type { Routine } from './LearnHubDetails';

type LearnHubReferenceShelfProps = {
  copy: LearnCopy;
  r: ReturnType<typeof localizedRoutes>;
  terms: TeaserTerm[];
  routines: Routine[];
  han: (text: string) => string;
  english: boolean;
};

/**
 * set the glossary teasers beside the routine guides
 * @param props glossary teaser and routine guide shelf
 * @param props.copy localized interface text
 * @param props.r localized destination routes
 * @param props.terms glossary teaser entries
 * @param props.routines guides shown on the routine shelf
 * @param props.han converter for Han text in the page script
 * @param props.english whether this edition is English
 * @returns the glossary teaser and routine guide shelf
 */
export const LearnHubReferenceShelf: FC<Readonly<LearnHubReferenceShelfProps>> = ({
  copy,
  r,
  terms,
  routines,
  han,
  english,
}) => (
  <section
    className="
      mt-[72px] grid items-start gap-12
      lg:grid-cols-[minmax(0,1fr)_400px]
    ">
    <section aria-labelledby="gh">
      <div className="mb-[18px] flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <span aria-hidden="true" className="tc text-[1.875rem] font-black">
          {copy.glossaryHan}
        </span>
        <h2 className={H2} id="gh">
          {copy.glossaryHeading}
        </h2>
        <span className="flex-1" />
        <Link className="text-base underline underline-offset-4" href={r.glossary}>
          {copy.wholeGlossary}
        </Link>
      </div>
      <ul
        className="
          m-0 grid list-none gap-[18px] p-0
          sm:grid-cols-2
          xl:grid-cols-3
        ">
        {terms.map((term) => (
          <li className="r1 flex flex-col gap-1.5 px-5 py-[18px]" key={term.href}>
            <span
              aria-hidden="true"
              className="tc text-[1.625rem] leading-[1.1] font-black">
              {term.zh}
            </span>
            <Link
              className="
                text-[1.25rem] font-medium underline decoration-1
                underline-offset-4
              "
              href={term.href}
              lang={english ? undefined : 'en'}>
              {term.term}
            </Link>
            <span className="text-[0.97rem] leading-[1.4] text-ink-soft">{term.line}</span>
            <span className="cap mt-auto pt-2">{term.source}</span>
          </li>
        ))}
      </ul>
    </section>

    <aside
      aria-labelledby="rh"
      className="r2 flex flex-col gap-3 px-[26px] pt-6 pb-[26px]">
      <span className="flex items-center gap-3.5">
        <Seal bottom={han('譜')} size={44} top={han('方')} />
        <span className="flex flex-col">
          <span className="cap">
            <span aria-hidden="true" className="tc">
              {han('方')}
            </span>{' '}
            · {copy.routinesKicker}
          </span>
          <h2 className="m-0 text-[1.75rem] font-medium" id="rh">
            {copy.routinesHeading}
          </h2>
        </span>
      </span>
      <p className="m-0 text-[1.05rem] leading-normal text-ink-soft">{copy.routinesText}</p>
      <ul className="m-0 list-none p-0">
        {routines.map((routine) => (
          <li className="flex items-baseline border-b border-rule py-[9px]" key={routine.slug}>
            <span aria-hidden="true" className="tc w-[46px] shrink-0 font-bold">
              {routine.tag}
            </span>
            <Link className="wb-link text-[1.05rem]" href={routine.href}>
              {routine.title}
            </Link>
            <span aria-hidden="true" className="lead" />
            <span className="pm shrink-0 text-xs text-ink-soft">{routine.codes}</span>
          </li>
        ))}
      </ul>
      <Link className="btn btn-primary mt-1.5 self-start no-underline" href={r.protocols}>
        {copy.seeRoutines}
      </Link>
      <span className="text-sm leading-[1.45] text-ink-soft">{copy.routinesLimit}</span>
    </aside>
  </section>
);
