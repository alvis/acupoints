import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** Props for {@link StopBox}. */
export type StopBoxProps = {
  /** Heading, "Stop, or ask first". */
  title: string;
  /** 止, in the page's script. */
  mark: string;
  /** The article's own self-care limits, one sentence per line. */
  lines: readonly string[];
  /** The site-wide self-care notice, set under the list. */
  notice: string;
  className?: string;
};

/**
 * Cinnabar double-framed box of the article's self-care limits.
 * @param props self-care cautions inside a double cinnabar frame
 * @param props.title display heading
 * @param props.mark Han glyph beside the section heading
 * @param props.lines ordered caution passages
 * @param props.notice optional additional advice
 * @param props.className additional presentation classes
 * @returns the self-care cautions inside a double cinnabar frame
 */
export const StopBox: FC<StopBoxProps> = ({ title, mark, lines, notice, className }) => (
  <aside
    aria-labelledby="self-care-limits"
    className={cn(
      `
        r2-red flex flex-col gap-2 px-6 py-[18px]
        sm:px-[22px]
      `,
      className,
    )}>
    <span className="flex items-baseline gap-2.5">
      <span aria-hidden="true" className="tc red text-2xl font-black">
        {mark}
      </span>
      <h2 className="m-0 text-[1.375rem] font-semibold" id="self-care-limits">
        {title}
      </h2>
    </span>
    <ul className="m-0 pl-5 text-base/normal">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
    <p className="m-0 text-[0.95rem] leading-normal text-ink-soft">{notice}</p>
  </aside>
);
