import { cn } from '@/utilities/cn';

import type { ComponentPropsWithoutRef, FC } from 'react';

/** Props for {@link MarginNote}. */
export type MarginNoteProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  /** The two short lines of the note, read top then bottom. */
  lines: readonly [string, string];
};

/**
 * Two-line red margin note tucked into running text.
 * @param props the two-line margin annotation.
 * @param props.lines the upper and lower margin-note text.
 * @param props.className additional wrapper classes.
 */
export const MarginNote: FC<MarginNoteProps> = ({ lines, className, ...spanProps }) => {
  return (
    <span {...spanProps} className={cn('n2', className)}>
      <span>{lines[0]}</span>
      <span>{lines[1]}</span>
    </span>
  );
};
