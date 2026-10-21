import { NumberDisc } from '@/components/primitives/NumberDisc';
import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren, ReactNode } from 'react';

/** Props for {@link PartRow}. */
export type PartRowProps = PropsWithChildren<{
  n: number;
  /** Anchor id of the part's heading (the prose section id). */
  id: string;
  heading: string;
  /** Vertical Han label under the disc; decorative. */
  zh?: string;
  /** Right-hand column: a table, a note, point chips. */
  side?: ReactNode;
  className?: string;
}>;

/**
 * One numbered part of a long read, as the Journal board sets it: a cinnabar
 * disc with a vertical Han label, the heading and prose, and a side column.
 * @param props numbered article part with its prose and side column
 * @param props.n count to express
 * @param props.id heading anchor for this printing date
 * @param props.heading heading text
 * @param props.zh Han inscription in the page script
 * @param props.side figure or annotation for this guide part
 * @param props.className additional presentation classes
 * @param props.children article prose and numbered parts
 * @returns the numbered article part with its prose and side column
 */
export const PartRow: FC<PartRowProps> = ({ n, id, heading, zh, side, className, children }) => (
  <li
    className={cn(
      `
        grid gap-x-10 gap-y-4 border-b border-rule py-7
        md:grid-cols-[110px_minmax(0,1fr)]
        xl:grid-cols-[110px_minmax(0,1fr)_380px]
      `,
      className,
    )}>
    <span
      className="
        flex items-center gap-3
        md:flex-col
      ">
      <NumberDisc n={n} size={48} />
      {zh ? (
        <span
          aria-hidden="true"
          className="
            tc text-lg font-bold tracking-[0.2em]
            md:[text-orientation:upright] md:[writing-mode:vertical-rl]
          "
          lang="zh-Hant">
          {zh}
        </span>
      ) : null}
    </span>
    <div className="flex max-w-[640px] flex-col gap-3">
      <h3
        className="
          m-0 text-[1.6rem] leading-[1.15] font-medium
          md:text-[1.875rem]
        "
        id={id}>
        {heading}
      </h3>
      {children}
    </div>
    {side ? (
      <div
        className="
          pt-1.5
          md:col-start-2
          xl:col-start-auto
        ">
        {side}
      </div>
    ) : null}
  </li>
);
