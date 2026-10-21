import { cn } from '@/utilities/cn';

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

/** Props for {@link LeaderRow}. */
export type LeaderRowProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  left: ReactNode;
  right: ReactNode;
};

/**
 * Label · dotted leader · value, as in an old table of contents.
 * @param props the dotted label and value row.
 * @param props.left the row label before the dotted leader.
 * @param props.right the row value after the dotted leader.
 * @param props.className additional wrapper classes.
 */
export const LeaderRow: FC<LeaderRowProps> = ({ left, right, className, ...spanProps }) => {
  return (
    <span {...spanProps} className={cn('flex items-baseline', className)}>
      <span className="min-w-0">{left}</span>
      <span aria-hidden="true" className="lead" />
      <span className="shrink-0">{right}</span>
    </span>
  );
};
