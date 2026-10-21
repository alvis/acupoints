import Link from 'next/link';

import { Speakable } from '@/components/primitives/Speakable';
import { cn } from '@/utilities/cn';

import { FRAME } from '../layout';

import { LearnCrumbs } from './LearnCrumbs';

import type { FC } from 'react';

import type { LearnCrumb } from './LearnCrumbs';

/** Props for {@link LearnComingSoon}. */
export type LearnComingSoonProps = {
  /** Mono caps line, "Glossary · coming soon". */
  kicker: string;
  title: string;
  oneLiner: string;
  crumbs: readonly LearnCrumb[];
  crumbsLabel: string;
  /** Plain statement that the entry is still being written. */
  text: string;
  rssLabel: string;
  changelogLabel: string;
  changelogHref: string;
};

/**
 * Woodblock coming-soon leaf for Learn entries without prose yet: the
 * canonical one-liner stays speakable, and the page says plainly that the
 * entry is still being written.
 * @param props entry summary, publication notice, and update links
 * @param props.kicker small introductory heading
 * @param props.title display heading
 * @param props.oneLiner brief page description
 * @param props.crumbs breadcrumb entries
 * @param props.crumbsLabel accessible breadcrumb label
 * @param props.text notice explaining that the entry is being written
 * @param props.rssLabel feed link text
 * @param props.changelogLabel revision history link text
 * @param props.changelogHref revision history destination
 * @returns the entry summary, publication notice, and update links
 */
export const LearnComingSoon: FC<LearnComingSoonProps> = ({
  kicker,
  title,
  oneLiner,
  crumbs,
  crumbsLabel,
  text,
  rssLabel,
  changelogLabel,
  changelogHref,
}) => (
  <div className={cn(FRAME, 'pb-20')}>
    <LearnCrumbs items={crumbs} label={crumbsLabel} />
    <div className="mx-auto mt-14 max-w-2xl">
      <span className="cap red">{kicker}</span>
      <h1
        className="
          m-0 mt-4 text-[2.6rem] leading-none font-medium tracking-[-0.01em]
          md:text-[3.75rem]
        ">
        {title}
      </h1>
      <Speakable as="p" className="mt-6 not-italic">
        {oneLiner}
      </Speakable>
      <p className="r1 mt-8 px-5 py-4 text-base/relaxed text-ink-soft">
        {text}{' '}
        <a className="wb-link" href="/feed.xml">
          {rssLabel}
        </a>{' '}
        ·{' '}
        <Link className="wb-link" href={changelogHref}>
          {changelogLabel}
        </Link>
      </p>
    </div>
  </div>
);
