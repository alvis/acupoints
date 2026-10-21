'use client';

import Link from 'next/link';

import { MarginNote } from '@/components/primitives/MarginNote';
import { NumberDisc } from '@/components/primitives/NumberDisc';
import { MissingLeaf } from '@/features/editorial/components/MissingLeaf';
import { TrustCrumbs } from '@/features/editorial/components/TrustCrumbs';
import { TrustPage } from '@/features/editorial/components/TrustPage';
import { useRouteLocale } from '@/features/editorial/hooks/useRouteLocale';
import { NOT_FOUND_COPY } from '@/features/editorial/statusCopy';
import { cn } from '@/utilities/cn';
import { localeToHtmlLang, localizedRoutes } from '@/utilities/routes';

import type { FC } from 'react';

import type { TrustCrumb } from '@/features/editorial/components/TrustCrumbs';

/** A suggested leaf, resolved on the server for every locale. */
export type SuggestedLeaf = {
  code: string;
  /** Traditional characters, as the registry records them. */
  hanzi: string;
  /** Simplified characters for zh-cn. */
  hanziSimplified: string;
  pinyin: string;
  /** The registry's English location line. */
  location: string;
  /** True when the registry flags the point for pregnancy. */
  pregnancyCaution: boolean;
};

/** Props for {@link NotFoundView}. */
export type NotFoundViewProps = { leaves: readonly SuggestedLeaf[] };

/**
 * The 404 leaf inside the locale layout. Not-found boundaries receive no
 * params, so the locale comes from the URL on the client; every string the
 * three locales need ships with the island.
 * @param props suggested registry points for the missing-leaf page
 * @param props.leaves suggested points with both Han scripts and pregnancy cautions
 */
export const NotFoundView: FC<NotFoundViewProps> = ({ leaves }) => {
  const locale = useRouteLocale();
  const copy = NOT_FOUND_COPY[locale];
  const r = localizedRoutes(locale);
  const zh = locale !== 'en';
  const crumbs: readonly TrustCrumb[] = [
    { href: r.home, zh: '首', label: copy.home },
    { zh: '闕', label: copy.crumb },
  ];

  return (
    <TrustPage>
      <TrustCrumbs aria-label={copy.breadcrumb} items={crumbs} zh={zh} />
      <MissingLeaf body={copy.body} figure={copy.figure} title={copy.title} zh={zh}>
        <Link
          className="
            flex h-[60px] items-center gap-3.5 px-5 text-[1.19rem] text-ink-soft
            no-underline shadow-[inset_0_0_0_2px_var(--color-ink)]
            hover:text-ink
          "
          href={r.search}>
          <svg aria-hidden="true" height="22" viewBox="0 0 16 16" width="22">
            <circle
              cx="6.5"
              cy="6.5"
              fill="none"
              r="5"
              stroke="var(--color-ink)"
              strokeWidth="1.6"
            />
            <path d="M10.4 10.4 L15 15" stroke="var(--color-ink)" strokeWidth="1.6" />
          </svg>
          <span className={cn('flex-1', zh && 'tc')}>{copy.search}</span>
          <span
            aria-hidden="true"
            className="
              pm hidden px-[7px] py-[3px] text-[0.69rem]
              shadow-[inset_0_0_0_1px_var(--color-ink-micro)]
              sm:inline
            ">
            ⌘K
          </span>
        </Link>
        <div className="flex flex-wrap gap-3.5">
          <Link className="btn btn-primary" href={r.home}>
            <span aria-hidden="true" className="tc font-bold">
              首
            </span>{' '}
            <span className={cn(zh && 'tc')}>{copy.backHome}</span>
          </Link>
          <Link className="btn btn-secondary" href={r.points}>
            <span aria-hidden="true" className="tc font-bold">
              目錄
            </span>{' '}
            <span className={cn(zh && 'tc')}>{copy.allLeaves}</span>
          </Link>
        </div>
      </MissingLeaf>

      {leaves.length > 0 ? (
        <section aria-labelledby="missing-suggest" className="mt-16">
          <div
            className="
              mb-6 flex items-end gap-[22px] border-b border-ink pb-3.5
            ">
            <span
              aria-hidden="true"
              className="tc text-[2.25rem] leading-none font-black">
              先讀
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="cap">
                <span className="tc" lang="zh-Hant">
                  先讀
                </span>{' '}
                · <span className={cn(zh && 'tc')}>{copy.suggestCap}</span>
              </span>
              <h2
                className={cn(
                  `
                    m-0 text-[1.6rem] font-medium
                    md:text-[1.88rem]
                  `,
                  zh && `tc`,
                )}
                id="missing-suggest">
                {copy.suggestTitle}
              </h2>
            </div>
          </div>
          <ul
            className="
              m-0 grid list-none gap-7 p-0
              md:grid-cols-3
            ">
            {leaves.map((leaf, index) => (
              <li key={leaf.code}>
                <SuggestionCard
                  hanLang={locale === 'zh-cn' ? localeToHtmlLang(locale) : 'zh-Hant'}
                  hanzi={locale === 'zh-cn' ? leaf.hanziSimplified : leaf.hanzi}
                  href={r.point(leaf.code)}
                  leaf={leaf}
                  n={index + 1}
                  openLabel={copy.openLeaf}
                  pregnancy={copy.pregnancy}
                  zh={zh}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </TrustPage>
  );
};

type SuggestionCardProps = {
  leaf: SuggestedLeaf;
  n: number;
  href: string;
  hanLang: string;
  hanzi: string;
  openLabel: string;
  pregnancy: [string, string];
  zh: boolean;
};

const SuggestionCard: FC<SuggestionCardProps> = ({
  leaf,
  n,
  href,
  hanLang,
  hanzi,
  openLabel,
  pregnancy,
  zh,
}) => (
  <Link
    className="
      r1 grid h-full grid-cols-[44px_minmax(0,1fr)] gap-4 px-[22px] py-5
      text-ink no-underline
      hover:bg-paper-raised hover:text-ink
    "
    href={href}>
    <NumberDisc n={n} size={40} />
    <span className="flex flex-col gap-1.5">
      <span className="flex flex-wrap items-baseline gap-x-3">
        <span className="tc text-[1.75rem] font-bold" lang={hanLang}>
          {hanzi}
        </span>
        <span className="text-[1.38rem]">{leaf.pinyin}</span>
        <span className="pm text-[0.75rem] text-ink-micro">{leaf.code}</span>
        {leaf.pregnancyCaution ? <MarginNote lines={pregnancy} /> : null}
      </span>
      {zh ? null : <span className="text-[1.06rem] leading-[1.45]">{leaf.location}</span>}
      <span
        className={cn(
          'text-[0.94rem] underline underline-offset-[3px]',
          zh &&
            `tc`,
        )}>
        {openLabel} →
      </span>
    </span>
  </Link>
);
