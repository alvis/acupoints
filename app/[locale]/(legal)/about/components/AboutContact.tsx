import Link from 'next/link';

import { HanLead } from '@/features/editorial/components/HanLead';
import { ShelfLink } from '@/features/editorial/components/ShelfLink';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** Resolved strings for {@link AboutContact}. */
export type AboutContactLabels = {
  cap: string;
  title: string;
  body: string;
  changed: string;
  shelfCap: string;
  faq: string;
  policies: string;
  privacy: string;
  notAdviceLead: string;
  notAdviceBody: string;
  /** Han word leading the caps line (正誤), in the page's script. */
  correctionsMark: string;
  /** Han tag on the printing-record button (刊記), in the page's script. */
  recordMark: string;
};

/** Props for {@link AboutContact}. */
export type AboutContactProps = {
  labels: AboutContactLabels;
  changelogHref: string;
  faqHref: string;
  policiesHref: string;
  zh: boolean;
};

/**
 * 正誤: the corrections inbox, the printing record, and the rest of the shelf.
 * @param props corrections copy, related destinations, and Chinese typography choice
 * @param props.labels localized corrections, contact, and shelf-link copy
 * @param props.changelogHref destination of the printing record
 * @param props.faqHref destination of the frequently asked questions
 * @param props.policiesHref destination of the editorial policy
 * @param props.zh whether to use Chinese typography
 */
export const AboutContact: FC<AboutContactProps> = ({
  labels,
  changelogHref,
  faqHref,
  policiesHref,
  zh,
}) => (
  <section
    aria-labelledby="about-contact"
    className="
      mt-[72px] grid items-start gap-10
      lg:grid-cols-[minmax(0,1fr)_470px] lg:gap-14
    ">
    <div className="flex flex-col gap-3.5">
      <span className="cap">
        <HanLead han={labels.correctionsMark} zh={zh}>
          {labels.cap}
        </HanLead>
      </span>
      <h2
        className={cn(
          `
            m-0 text-[1.6rem] font-medium
            md:text-[2rem]
          `,
          zh && 'tc',
        )}
        id="about-contact">
        {labels.title}
      </h2>
      <p
        className={cn(
          'm-0 max-w-[640px] text-[1.13rem] leading-[1.55]',
          zh &&
            `tc`,
        )}>
        {labels.body}
      </p>
      <div className="flex flex-wrap gap-3.5 pt-1.5">
        <a className="btn btn-primary" href="mailto:editorial@acupoints.com">
          editorial@acupoints.com
        </a>
        <Link className="btn btn-secondary" href={changelogHref}>
          <span aria-hidden="true" className="tc font-bold">
            {labels.recordMark}
          </span>{' '}
          <span className={cn(zh && 'tc')}>{labels.changed}</span>
        </Link>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <div
        className="
          r1 flex flex-col gap-1.5 px-6 py-5 text-[1.06rem] leading-[1.6]
        ">
        <span className={cn('cap mb-1', zh && 'tc')}>{labels.shelfCap}</span>
        <ShelfLink han="問答" href={faqHref} label={labels.faq} zh={zh} />
        <ShelfLink han="規約" href={policiesHref} label={labels.policies} zh={zh} />
        <a className="flex items-baseline no-underline" href="mailto:privacy@acupoints.com">
          <span className="min-w-0">
            {zh ? null : (
              <span aria-hidden="true" className="tc mr-2 font-bold" lang="zh-Hant">
                私
              </span>
            )}
            <span className={cn(zh && 'tc')}>{labels.privacy}</span>
          </span>
          <span aria-hidden="true" className="lead" />
          <span className="pm shrink-0 text-[0.81rem]">privacy@acupoints.com</span>
        </a>
      </div>
      <p
        className="
          m-0 px-[18px] py-3.5 text-base/normal
          shadow-[inset_4px_0_0_var(--color-cinnabar)]
        ">
        <strong className={cn('font-semibold', zh && 'tc')}>{labels.notAdviceLead}</strong>
        <span className={cn(zh && 'tc')}>{labels.notAdviceBody}</span>
      </p>
    </div>
  </section>
);
