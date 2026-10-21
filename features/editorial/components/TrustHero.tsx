import { VerticalTitle } from '@/components/primitives/VerticalTitle';
import { cn } from '@/utilities/cn';

import { HanLead } from './HanLead';

import type { FC, ReactNode } from 'react';

/** Props for {@link TrustHero}. */
export type TrustHeroProps = {
  /** Han title for the vertical cartouche (問答, 說明 …); decorative. */
  vertical: string;
  /** Mono caps line above the heading. */
  cap: string;
  /** Han word led into the caps line on English pages (問答 · …). */
  capZh?: string;
  /** The page's single h1. */
  title: ReactNode;
  /** True on Chinese pages. */
  zh: boolean;
  /** Lead paragraph, usually a `<Speakable>`. */
  lead?: ReactNode;
  /** Right-hand panel at desktop width (a glance box, a legend). */
  aside?: ReactNode;
};

/**
 * Hero: vertical Han cartouche, caps line, h1 and lead, with an optional aside.
 * @param props the trust-page title and lead.
 * @param props.vertical han title for the vertical cartouche (問答, 說明 …); decorative.
 * @param props.cap mono caps line above the heading.
 * @param props.capZh han word led into the caps line on English pages (問答 · …).
 * @param props.title display heading
 * @param props.zh whether the page uses Chinese typography.
 * @param props.lead lead paragraph, usually a `<Speakable>`.
 * @param props.aside the content aligned beside the heading.
 */
export const TrustHero: FC<TrustHeroProps> = ({ vertical, cap, capZh, title, zh, lead, aside }) => (
  <section
    className={cn(
      'mt-[34px] grid items-start gap-10',
      aside ? 'lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14' : undefined,
    )}>
    <div className="flex items-start gap-[30px]">
      <VerticalTitle>{vertical}</VerticalTitle>
      <div className="flex min-w-0 flex-col gap-3.5 pt-2">
        <span className={cn('cap', zh && 'tc')}>
          {capZh ? (
            <HanLead han={capZh} zh={zh}>
              {cap}
            </HanLead>
          ) : (
            cap
          )}
        </span>
        <h1
          className={cn(
            `
              m-0 max-w-[16ch] text-[2.5rem] leading-[1.04] font-medium
              sm:text-[3.2rem]
              lg:text-[4rem]
            `,
            zh && 'tc',
          )}>
          {title}
        </h1>
        {lead}
      </div>
    </div>
    {aside}
  </section>
);
