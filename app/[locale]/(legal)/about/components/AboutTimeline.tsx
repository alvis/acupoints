import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

const CITED_COUNT = 3;
const CLASSIC_COUNT = 4;

/** A dated work on the 源流 timeline. */
export type TimelineWork = {
  /** `classic` for the lineage behind the figures, `cited` for a source the leaves cite. */
  kind: 'classic' | 'cited';
  /** Title as the timeline prints it (Han title for a classic). */
  title: string;
  /** Second line: pinyin for a classic, author or licence for a cited work. */
  by: string;
  date: string;
  note: string;
};

/** Props for {@link AboutTimeline}. */
export type AboutTimelineProps = {
  /** Accessible name of the ordered list. */
  label: string;
  /** Works before the gap marker, oldest first. */
  before: readonly TimelineWork[];
  /** Works after the gap marker, oldest first. */
  after: readonly TimelineWork[];
  /** "Four centuries pass", the gap's accessible name. */
  gapLabel: string;
  /** "406 years". */
  gapYears: string;
  /** "所據 · cited" tag over each cited work. */
  citedTag: string;
  /** The 所據 seal under each cited work, in the page's script. */
  citedSeal: readonly [string, string];
  zh: boolean;
};

/**
 * 源流: the sources as a woodblock timeline in a carved block. Classics stand
 * as vertical cartouches on an inked ring; cited works sit in red frames on a
 * 所據 seal; a zig-zag marks the four centuries between them. Stacks into a
 * single column on phones, where the horizontal rule falls away.
 * @param props historical and cited works, gap captions, seal text, and typography choice
 * @param props.label accessible name of the sources timeline
 * @param props.before historical works before the gap
 * @param props.after cited works after the gap
 * @param props.gapLabel accessible name of the interval between historical and cited works
 * @param props.gapYears elapsed years printed inside the timeline gap
 * @param props.citedTag caption identifying the cited works
 * @param props.citedSeal characters on the source seal
 * @param props.zh whether to use Chinese typography
 */
export const AboutTimeline: FC<AboutTimelineProps> = ({
  label,
  before,
  after,
  gapLabel,
  gapYears,
  citedTag,
  citedSeal,
  zh,
}) => (
  <div className="blk relative m-1.5 px-6 pt-2.5 pb-[34px]">
    <div
      aria-hidden="true"
      className="
        absolute inset-x-6 top-[280px] hidden h-1 border-t-[2.5px] border-b
        border-ink
        lg:block
      "
    />
    <ol
      aria-label={label}
      className={cn(
        `
          relative m-0 grid list-none gap-y-10 p-0
          sm:grid-cols-2
          lg:gap-x-1.5 lg:gap-y-0
        `,
        gridFor(before.length, after.length),
      )}>
      {before.map((work) => (
        <TimelineNode
          citedSeal={citedSeal}
          citedTag={citedTag}
          key={work.title}
          work={work}
          zh={zh}
        />
      ))}
      <li
        aria-label={gapLabel}
        className="
          flex flex-col items-center
          sm:col-span-2
          lg:col-span-1
        ">
        <div
          className="
            flex items-end pb-[18px]
            lg:h-[250px]
          ">
          <span className="tc vt text-[0.88rem] tracking-[0.3em] text-ink-micro">四百年</span>
        </div>
        <div className="flex h-11 items-center">
          <svg aria-hidden="true" height="30" viewBox="0 0 56 30" width="56">
            <rect fill="var(--color-paper)" height="30" width="56" x="0" y="0" />
            <path
              d="M4 4 L12 26 L20 4 L28 26 L36 4 L44 26 L52 4"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className={cn(`pt-3.5 text-center text-[0.88rem] text-ink-micro`, zh && `
          tc
        `)}>
          {gapYears}
        </div>
      </li>
      {after.map((work) => (
        <TimelineNode
          citedSeal={citedSeal}
          citedTag={citedTag}
          key={work.title}
          work={work}
          zh={zh}
        />
      ))}
    </ol>
  </div>
);

/**
 * Desktop column template: the works share the width, the gap marker is 64px.
 * @param before number of historical works before the gap
 * @param after number of cited works after the gap
 * @returns responsive grid classes for the work columns and fixed-width timeline gap
 */
function gridFor(before: number, after: number): string {
  if (before === CLASSIC_COUNT && after === CITED_COUNT) {
    return 'lg:grid-cols-[repeat(4,minmax(0,1fr))_64px_repeat(3,minmax(0,1fr))]';
  }
  if (before === 1 && after === CITED_COUNT) {
    return 'lg:grid-cols-[minmax(0,1fr)_64px_repeat(3,minmax(0,1fr))]';
  }

  return 'lg:grid-flow-col lg:auto-cols-fr';
}

type TimelineNodeProps = {
  work: TimelineWork;
  citedTag: string;
  citedSeal: readonly [string, string];
  zh: boolean;
};

const TimelineNode: FC<TimelineNodeProps> = ({ work, citedTag, citedSeal, zh }) => {
  const cited = work.kind === 'cited';
  let top: ReactNode;
  let marker: ReactNode;
  if (cited) {
    top = (
      <div
        className="
          flex flex-col justify-end px-2 pb-[18px]
          lg:h-[250px]
        ">
        <span
          className="
            tc red mb-2 self-center text-[0.81rem] font-bold tracking-widest
          ">
          {citedTag}
        </span>
        <span
          className="
            r2-red block p-3 text-center text-[1.06rem] leading-[1.3] italic
          "
          lang="en">
          {work.title}
        </span>
      </div>
    );
    marker = <Seal bottom={citedSeal[1]} size={30} top={citedSeal[0]} />;
  } else {
    top = (
      <div
        className="
          flex items-end justify-center pb-[18px]
          lg:h-[250px]
        ">
        <span
          className="
            tc vt bg-paper-raised px-2 py-3.5 text-[1.31rem] font-bold
            tracking-[0.12em]
            shadow-[inset_0_0_0_1.5px_var(--color-ink),inset_0_0_0_4px_var(--color-paper-raised),inset_0_0_0_5px_var(--color-ink)]
          "
          lang={zh ? undefined : 'zh-Hant'}>
          {work.title}
        </span>
      </div>
    );
    marker = (
      <svg aria-hidden="true" height="26" viewBox="0 0 26 26" width="26">
        <circle
          cx="13"
          cy="13"
          fill="var(--color-paper)"
          r="10"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
        />
        <circle cx="13" cy="13" fill="var(--color-ink)" r="3.5" />
      </svg>
    );
  }

  return (
    <li className="flex flex-col">
      {top}
      <div className="flex h-11 items-center justify-center">{marker}</div>
      <div className="flex flex-col gap-1.5 px-2.5 pt-3.5 text-center">
        <span className="text-[1.5rem] font-medium">{work.date}</span>
        <span
          className={cn('text-[0.94rem] text-ink-soft italic', !cited && zh && `
            tc not-italic
          `)}
          lang={cited ? 'en' : undefined}>
          {work.by}
        </span>
        <span className={cn('text-[0.94rem] leading-[1.4]', zh && 'tc')}>{work.note}</span>
      </div>
    </li>
  );
};
