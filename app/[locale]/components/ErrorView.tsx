'use client';

import Link from 'next/link';

import { TrustPage } from '@/features/editorial/components/TrustPage';
import { useRouteLocale } from '@/features/editorial/hooks/useRouteLocale';
import { ERROR_COPY } from '@/features/editorial/statusCopy';
import { cn } from '@/utilities/cn';
import { localizedRoutes } from '@/utilities/routes';

import type { FC } from 'react';

/** Props for {@link ErrorView}. */
export type ErrorViewProps = {
  /** Re-renders the failed segment (Next's `reset`). */
  onRetry: () => void;
};

/** `.r2` draws the cartouche in ink; a damaged block is set in cinnabar. */
const CINNABAR_FRAME =
  'shadow-[inset_0_0_0_2px_var(--color-cinnabar),inset_0_0_0_7px_var(--color-paper),inset_0_0_0_8px_var(--color-cinnabar)]';

/**
 * 版損, the block is damaged: the error boundary in the Woodblock language,
 * a red vertical cartouche beside the 500 caps line, one plain sentence, the
 * editors' inbox, and retry and home actions.
 * @param props retry action for the damaged-block page
 * @param props.onRetry action that retries the failed render
 */
export const ErrorView: FC<ErrorViewProps> = ({ onRetry }) => {
  const locale = useRouteLocale();
  const copy = ERROR_COPY[locale];
  const zh = locale !== 'en';

  return (
    <TrustPage>
      <section
        className="
          mt-[34px] flex items-start gap-[30px] py-10
          sm:py-16
        ">
        <span
          aria-hidden="true"
          className={cn(
            `
              tc vt hidden shrink-0 px-[11px] py-[18px] text-[3.5rem]
              leading-none font-black tracking-[0.08em] text-(--color-cinnabar)
              sm:inline-block
            `,
            CINNABAR_FRAME,
          )}>
          版損
        </span>
        <div className="flex max-w-[720px] min-w-0 flex-col gap-[18px] pt-1.5">
          <span className="cap">
            500 ·{' '}
            <span className="tc" lang="zh-Hant">
              版損
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
            {copy.title}
          </h1>
          <p
            className={cn(
              `
                m-0 text-[1.19rem] leading-normal text-ink-soft
                sm:text-[1.31rem]
              `,
              zh && 'tc',
            )}>
            {copy.body}{' '}
            <a className="underline underline-offset-4" href="mailto:editorial@acupoints.com">
              editorial@acupoints.com
            </a>
            {zh ? '。' : '.'}
          </p>
          <div className="flex flex-wrap gap-3.5 pt-1.5">
            <button className="btn btn-primary" type="button" onClick={onRetry}>
              <span aria-hidden="true" className="tc font-bold">
                再
              </span>{' '}
              <span className={cn(zh && 'tc')}>{copy.retry}</span>
            </button>
            <Link className="btn btn-secondary" href={localizedRoutes(locale).home}>
              <span aria-hidden="true" className="tc font-bold">
                首
              </span>{' '}
              <span className={cn(zh && 'tc')}>{copy.backHome}</span>
            </Link>
          </div>
        </div>
      </section>
    </TrustPage>
  );
};
