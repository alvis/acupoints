'use client';

import { useState } from 'react';

import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';

import { useBasicsRead } from '../hooks/useBasicsRead';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link BasicsReader}. */
export type BasicsReaderProps = PropsWithChildren<{
  slug: string;
  /** Id of the parts heading, for the section's accessible name. */
  headingId: string;
  /** "In three parts". */
  heading: string;
  /** Han count beside the heading, such as 三節; decorative. */
  han: string;
  /** Note shown while the short read is on. */
  shortNote: string;
  /** Note shown while the full article is on. */
  fullNote: string;
  /** Accessible name of the length group. */
  lengthLabel: string;
  shortLabel: string;
  fullLabel: string;
  markLabel: string;
  markedLabel: string;
  /** 已 and 讀, for the button's small seal. */
  sealTop: string;
  sealBottom: string;
}>;

type Mode = 'short' | 'full';

const TOGGLE =
  'inline-flex h-11 cursor-pointer items-center gap-2 border-0 px-[18px] text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-ink)]';
const ON = 'bg-[color:var(--color-ink)] text-[color:var(--color-paper)]';
const OFF = 'bg-transparent text-[color:var(--color-ink)]';

/**
 * The parts section of a basics article, as the Basics board runs it: a
 * reading-length toggle (short read first) and a mark-as-read button above
 * the numbered parts. The server renders every paragraph; the short read
 * only hides the later paragraphs of each part, so the whole text stays in
 * the page for search and for readers without scripts.
 * @param props reading toolbar and article parts
 * @param props.slug entry URL segment
 * @param props.headingId anchor for the parts heading
 * @param props.heading heading text
 * @param props.han converter for Han text in the page script
 * @param props.shortNote note shown in short-read mode
 * @param props.fullNote note shown in full-read mode
 * @param props.lengthLabel accessible name of the reading-length control
 * @param props.shortLabel short-read option label
 * @param props.fullLabel full-read option label
 * @param props.markLabel action label for marking the article read
 * @param props.markedLabel action label for clearing the read mark
 * @param props.sealTop upper character of the read stamp
 * @param props.sealBottom lower character of the read stamp
 * @param props.children article prose and numbered parts
 * @returns the reading toolbar and article parts
 */
export const BasicsReader: FC<BasicsReaderProps> = ({
  slug,
  headingId,
  heading,
  han,
  shortNote,
  fullNote,
  lengthLabel,
  shortLabel,
  fullLabel,
  markLabel,
  markedLabel,
  sealTop,
  sealBottom,
  children,
}) => {
  const [mode, setMode] = useState<Mode>('short');
  const { read, toggle } = useBasicsRead(slug);
  const full = mode === 'full';

  return (
    <section aria-labelledby={headingId} className="group/reader mt-11" data-mode={mode}>
      <div
        className="
          flex flex-wrap items-center gap-x-5 gap-y-3 border-t-[2.5px] border-b
          border-ink py-3.5
        ">
        <span aria-hidden="true" className="tc text-[1.75rem] font-black">
          {han}
        </span>
        <h2 className="m-0 text-[1.875rem] leading-[1.1] font-medium" id={headingId}>
          {heading}
        </h2>
        <span aria-live="polite" className="text-base text-ink-soft italic">
          {full ? fullNote : shortNote}
        </span>
        <span
          className="
            hidden flex-1
            lg:block
          "
        />
        <div aria-label={lengthLabel} className="r1 flex" role="group">
          <button
            aria-pressed={!full}
            className={cn(TOGGLE, full ? OFF : ON)}
            type="button"
            onClick={() => setMode('short')}>
            {shortLabel}
          </button>
          <button
            aria-pressed={full}
            className={cn(TOGGLE, full ? ON : OFF)}
            type="button"
            onClick={() => setMode('full')}>
            {fullLabel}
          </button>
        </div>
        <button
          aria-pressed={read}
          className={cn(
            TOGGLE,
            'shadow-rest',
            read && `
              bg-paper-raised shadow-[inset_0_0_0_1.5px_var(--color-cinnabar)]
            `,
          )}
          type="button"
          onClick={toggle}>
          {read ? <Seal bottom={sealBottom} size={22} top={sealTop} /> : null}
          {read ? markedLabel : markLabel}
        </button>
      </div>
      {children}
    </section>
  );
};
