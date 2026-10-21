'use client';

import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';

import { useBasicsRead } from '../hooks/useBasicsRead';

import type { FC } from 'react';

/** Props for {@link ReadSeal}. */
export type ReadSealProps = {
  slug: string;
  /** Accessible name once sealed: "Sealed: marked as read". */
  label: string;
  /** upper character of the read stamp. */
  top: string;
  /** lower character of the read stamp. */
  bottom: string;
};

/**
 * The hero's "已讀" seal, as the Basics board stamps it: its space is held
 * while unread and the seal lands, slightly askew, once the reader marks
 * the article read from the parts toolbar.
 * @param props read stamp, hidden until the article is marked read
 * @param props.slug entry URL segment
 * @param props.label accessible name for the illustration
 * @param props.top upper character of the read stamp
 * @param props.bottom lower character of the read stamp
 * @returns the read stamp, hidden until the article is marked read
 */
export const ReadSeal: FC<ReadSealProps> = ({ slug, label, top, bottom }) => {
  const { read } = useBasicsRead(slug);

  return (
    <span
      className={cn(
        'ml-1.5 inline-flex',
        read
          ? 'rotate-[-8deg]'
          : `invisible`,
      )}>
      <Seal bottom={bottom} label={read ? label : undefined} size={76} top={top} />
    </span>
  );
};
