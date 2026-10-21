import Link from 'next/link';

import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { H2, TITLE_LINK } from '@/features/learn/layout';

import { StartRoute } from './StartRoute';

import type { FC } from 'react';

import type { LearnCopy } from '@/features/learn/copy';
import type { Locale } from '@/utilities/routes';

import type { Stop } from './LearnHubDetails';

type LearnHubStopsProps = {
  locale: Locale;
  copy: LearnCopy;
  stops: Stop[];
  basicsMinutes: number;
  han: (text: string) => string;
};

/**
 * present the basics stops along their carved route
 * @param props three-stop basics route and its reading-time summary
 * @param props.locale page language and writing system
 * @param props.copy localized interface text
 * @param props.stops published basics stops
 * @param props.basicsMinutes total reading time across basics stops
 * @param props.han converter for Han text in the page script
 * @returns the three-stop basics route and its reading-time summary
 */
export const LearnHubStops: FC<Readonly<LearnHubStopsProps>> = ({
  locale,
  copy,
  stops,
  basicsMinutes,
  han,
}) => (
  <section aria-labelledby="start" className="mt-16">
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
      <span aria-hidden="true" className="tc text-[1.875rem] font-black">
        {han('入門')}
      </span>
      <h2 className={H2} id="start">
        {copy.startHere}
      </h2>
      <span className="text-[1.05rem] text-ink-soft italic">
        {fill(copy.startNote, { n: countWord(stops.length, locale, true), min: basicsMinutes })}
      </span>
    </div>
    <div className="mt-3.5">
      <StartRoute start={han('起')} stops={stops.length} />
    </div>
    <ol
      className="
        m-0 mt-4 grid list-none gap-6 p-0
        md:mt-1 md:grid-cols-3 md:gap-10
      ">
      {stops.map((stop, i) => (
        <li className="r1 flex flex-col gap-2.5 px-6 py-[22px]" key={stop.slug}>
          <span className="flex items-baseline gap-3.5">
            <span
              aria-hidden="true"
              className="tc text-[2.375rem] leading-none font-black">
              {stop.zh}
            </span>
            <span className="cap">{fill(copy.stopLabel, { n: i + 1, min: stop.minutes })}</span>
          </span>
          <h3 className="m-0 text-[1.625rem] font-medium">
            <Link className={TITLE_LINK} href={stop.href}>
              {stop.title}
            </Link>
          </h3>
          <p
            className="
              m-0 line-clamp-4 text-[1.05rem] leading-normal text-ink-soft
            ">
            {stop.line}
          </p>
          <span
            className="mt-auto flex items-center text-[0.95rem] text-ink-soft">
            {fill(copy.sectionsCount, { n: stop.sections })}
            <span aria-hidden="true" className="lead" />
            <Link
              aria-label={fill(copy.readAria, { title: stop.title })}
              className="wb-link text-base text-ink"
              href={stop.href}>
              {copy.read}
            </Link>
          </span>
        </li>
      ))}
    </ol>
  </section>
);
