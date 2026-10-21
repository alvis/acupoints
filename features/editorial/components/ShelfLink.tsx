import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

/** Props for {@link ShelfLink}: a `next/link` plus its Han tag and label. */
export type ShelfLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'children'> & {
  /** Han tag before the label (說明, 刊記 …); shown on English pages only. */
  han: string;
  label: string;
  /** Right-hand end of the leader; an arrow by default. */
  end?: ReactNode;
  zh: boolean;
};

/**
 * "說明 About this book ········ →": a shelf link with a dotted leader.
 * @param props the dotted about-page link.
 * @param props.han han tag before the label (說明, 刊記 …); shown on English pages only.
 * @param props.label accessible text
 * @param props.end right-hand end of the leader; an arrow by default.
 * @param props.zh whether the page uses Chinese typography.
 * @param props.className additional presentation classes
 */
export const ShelfLink: FC<ShelfLinkProps> = ({
  han,
  label,
  end = '→',
  zh,
  className,
  ...rest
}) => (
  <Link className={cn('flex items-baseline no-underline', className)} {...rest}>
    <span className="min-w-0">
      {zh ? null : (
        <span aria-hidden="true" className="tc mr-2 font-bold" lang="zh-Hant">
          {han}
        </span>
      )}
      <span className={cn(zh && 'tc')}>{label}</span>
    </span>
    <span aria-hidden="true" className="lead" />
    <span aria-hidden={end === '→' ? true : undefined} className="shrink-0">
      {end}
    </span>
  </Link>
);
