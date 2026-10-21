'use client';

import Link from 'next/link';

import { useSeals } from '@/components/headless/useSeals';
import { cn } from '@/utilities/cn';
import { TOTAL_LEAVES } from '@/utilities/seals/sealStore';

import { InkBar } from './InkBar';

import type { FC } from 'react';

const PERCENT_SCALE = 100;

/** Props for {@link SealCount}. */
export type SealCountProps = {
  /** "{n} / 361 sealed" — `{n}` is filled live. */
  template: string;
  /** My seals route. */
  sealsHref: string;
  className?: string;
};

/**
 * The phone front's seal line: a cinnabar bar and a live "n / 361 sealed"
 * link to My seals. Shows 0 until storage is read, so server and first
 * client render agree.
 * @param props count template, seal-book destination, and optional styling
 * @param props.template seal-count label with an {n} placeholder
 * @param props.sealsHref destination of the reader’s seal book
 * @param props.className additional wrapper classes
 */
export const SealCount: FC<SealCountProps> = ({ template, sealsHref, className }) => {
  const { codes, ready } = useSeals();
  const n = ready ? codes.length : 0;

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <InkBar className="h-1.5 min-w-0 flex-1" percent={(PERCENT_SCALE * n) / TOTAL_LEAVES} />
      <Link className="wb-link shrink-0 text-[0.9rem] text-ink underline" href={sealsHref}>
        <span aria-live="polite">{template.replace('{n}', String(n))}</span>
      </Link>
    </div>
  );
};
