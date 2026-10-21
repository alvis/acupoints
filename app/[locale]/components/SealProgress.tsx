'use client';

import Link from 'next/link';

import { useSeals } from '@/components/headless/useSeals';
import { cn } from '@/utilities/cn';
import { TOTAL_LEAVES } from '@/utilities/seals/sealStore';

import { InkBar } from './InkBar';

import type { FC } from 'react';

const PERCENT_SCALE = 100;

/** Props for {@link SealProgress}. */
export type SealProgressProps = {
  /** "You have sealed {n} of 361 leaves" — `{n}` is filled live. */
  template: string;
  /** Link text to My seals. */
  linkLabel: string;
  /** My seals route. */
  sealsHref: string;
  className?: string;
};

/**
 * The reader's own progress through the book, read from this browser's
 * seals: a live count, a cinnabar bar and a link to My seals. Shows 0 until
 * storage is read, so server and first client render agree.
 * @param props count template, link label, seal-book destination, and optional styling
 * @param props.template seal-count label with an {n} placeholder
 * @param props.linkLabel label of the link to the seal book
 * @param props.sealsHref destination of the reader’s seal book
 * @param props.className additional wrapper classes
 */
export const SealProgress: FC<SealProgressProps> = ({
  template,
  linkLabel,
  sealsHref,
  className,
}) => {
  const { codes, ready } = useSeals();
  const n = ready ? codes.length : 0;
  const [before, after = ''] = template.split('{n}');

  return (
    <div
      className={cn(
        `
          flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem]
          text-ink-soft
        `,
        className,
      )}>
      <span aria-live="polite">
        {before}
        <b className="text-ink">{n}</b>
        {after}
      </span>
      <InkBar
        className="h-1.5 w-full max-w-[200px] flex-1"
        percent={(PERCENT_SCALE * n) / TOTAL_LEAVES}
      />
      <Link className="wb-link text-ink underline" href={sealsHref}>
        {linkLabel}
      </Link>
    </div>
  );
};
