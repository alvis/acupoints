import { cn } from '@/utilities/cn';

import { ShelfLink } from './ShelfLink';

import type { FC } from 'react';

/** Resolved strings for {@link PolicyAside}. */
export type PolicyAsideLabels = {
  aside: string;
  lastUpdated: string;
  /** Count line, already filled ("4 clauses. When a document changes …"). */
  clauses: string;
  recordLink: string;
  emergencyTitle: string;
  emergencyBody: string;
  questions: string;
  /** Han word under the month on the revision stamp (改訂), in the page's script. */
  revised: string;
};

/** Props for {@link PolicyAside}. */
export type PolicyAsideProps = {
  labels: PolicyAsideLabels;
  /** Han month of the last revision (四 for April). */
  month: string;
  /** Last-updated date, ISO `YYYY-MM-DD`. */
  updated: string;
  /** Last-updated date as the document prints it. */
  updatedLabel: string;
  version: string;
  changelogHref: string;
  zh: boolean;
};

/**
 * The document's margin: dated revision stamp, record link, emergency line, contacts.
 * @param props the policy revision and contact margin.
 * @param props.labels localized row headings
 * @param props.month han month of the last revision (四 for April).
 * @param props.updated last-updated date, ISO `YYYY-MM-DD`.
 * @param props.updatedLabel caption for the revision date
 * @param props.version document revision label
 * @param props.changelogHref revision history destination
 * @param props.zh whether the page uses Chinese typography.
 */
export const PolicyAside: FC<PolicyAsideProps> = ({
  labels,
  month,
  updated,
  updatedLabel,
  version,
  changelogHref,
  zh,
}) => (
  <aside
    aria-label={labels.aside}
    className="
      flex flex-col gap-[22px]
      lg:pt-[74px]
    ">
    <div className="r1 flex flex-col gap-3.5 px-6 py-[22px]">
      <div className="flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="
            tc grid size-[58px] shrink-0 rotate-[-4deg] place-items-center
            bg-(--color-cinnabar) text-center text-[0.95rem] leading-[1.15]
            font-black text-paper
            shadow-[inset_0_0_0_3px_var(--color-cinnabar),inset_0_0_0_4.5px_var(--color-paper)]
          ">
          {month}月
          <br />
          {labels.revised}
        </span>
        <div className="flex flex-col gap-0.5">
          <span className={cn('cap', zh && 'tc')}>{labels.lastUpdated}</span>
          <time className="text-[1.25rem] font-semibold" dateTime={updated}>
            {updatedLabel}
          </time>
          <span className="pm text-[0.75rem] text-ink-micro">{version}</span>
        </div>
      </div>
      <p
        className={cn(
          `
            m-0 border-t border-rule pt-3 text-[0.95rem] leading-[1.45]
            text-ink-soft
          `,
          zh && 'tc',
        )}>
        {labels.clauses}
      </p>
      <ShelfLink
        className="text-[1.06rem]"
        han="刊記"
        href={changelogHref}
        label={labels.recordLink}
        zh={zh}
      />
    </div>

    <div className="r2-red flex flex-col gap-2 px-[22px] py-5">
      <span className="flex items-baseline gap-2.5">
        <span aria-hidden="true" className="
          tc text-[1.5rem] font-black text-(--color-cinnabar)
        ">
          急
        </span>
        <span className={cn('text-[1.25rem] font-semibold', zh && 'tc')}>
          {labels.emergencyTitle}
        </span>
      </span>
      <span className={cn('text-base/normal', zh && 'tc')}>{labels.emergencyBody}</span>
    </div>

    <div
      className="r1 flex flex-col gap-1.5 px-[22px] py-[18px] text-base/normal">
      <span className={cn('cap', zh && 'tc')}>{labels.questions}</span>
      <a className="underline underline-offset-4" href="mailto:privacy@acupoints.com">
        privacy@acupoints.com
      </a>
      <a className="underline underline-offset-4" href="mailto:editorial@acupoints.com">
        editorial@acupoints.com
      </a>
    </div>
  </aside>
);
