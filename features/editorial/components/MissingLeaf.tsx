import { cn } from '@/utilities/cn';

import { TornLeaf } from './TornLeaf';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link MissingLeaf}; children are the actions under the line. */
export type MissingLeafProps = PropsWithChildren<{
  title: string;
  body: string;
  /** Accessible description of the torn-leaf figure. */
  figure: string;
  zh: boolean;
}>;

/** `.r2` draws the cartouche in ink; the 404 board sets it in cinnabar. */
const CINNABAR_FRAME =
  'shadow-[inset_0_0_0_2px_var(--color-cinnabar),inset_0_0_0_7px_var(--color-paper),inset_0_0_0_8px_var(--color-cinnabar)]';

/**
 * 此葉闕 (board Wb404): the torn woodblock leaf beside a red vertical
 * cartouche, the 404 caps line, the heading and one line of explanation,
 * then the caller's search and links.
 * @param props the missing-page illustration and explanation.
 * @param props.title display heading
 * @param props.body main content
 * @param props.figure accessible description of the torn-leaf figure.
 * @param props.zh whether the page uses Chinese typography.
 * @param props.children the search control and recovery links.
 */
export const MissingLeaf: FC<MissingLeafProps> = ({ title, body, figure, zh, children }) => (
  <section
    className="
      mt-10 grid items-center gap-10
      lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-16
    ">
    <div className="blk m-1.5 grid place-items-center bg-paper p-3.5">
      <TornLeaf className="h-auto w-full max-w-[600px]" label={figure} />
    </div>
    <div className="flex items-start gap-[30px]">
      <span
        aria-hidden="true"
        className={cn(
          `
            tc vt hidden shrink-0 px-[11px] py-[18px] text-[3.5rem] leading-none
            font-black tracking-[0.08em] text-(--color-cinnabar)
            sm:inline-block
          `,
          CINNABAR_FRAME,
        )}>
        此葉闕
      </span>
      <div className="flex min-w-0 flex-col gap-[18px] pt-1.5">
        <span className="cap">
          404 ·{' '}
          <span className="tc" lang="zh-Hant">
            此葉闕
          </span>
        </span>
        <h1
          className={cn(
            `
              m-0 text-[2.5rem] leading-[1.04] font-medium
              sm:text-[3rem]
              lg:text-[3.75rem]
            `,
            zh && 'tc',
          )}>
          {title}
        </h1>
        <p
          className={cn(
            `
              m-0 text-[1.19rem] leading-normal text-ink-soft
              sm:text-[1.31rem]
            `,
            zh && 'tc',
          )}>
          {body}
        </p>
        {children}
      </div>
    </div>
  </section>
);
