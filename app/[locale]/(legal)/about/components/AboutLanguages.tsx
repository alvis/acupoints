import Link from 'next/link';

import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { HtmlLang } from '@/utilities/routes';

/** `.cap` sets its own muted color, so the red marker overrides it inline. */
const SEAL_INK = { color: 'var(--color-seal)' } as const;

/** One language edition of the book. */
export type LanguageEdition = {
  /** Glyph in the inked tile (EN, 繁, 简). */
  glyph: string;
  /** `lang` of the edition's own name. */
  lang: HtmlLang;
  /** The edition's name in its own language. */
  name: string;
  /** This page in that edition. */
  href: string;
  note: string;
  /** True for the edition being read. */
  current: boolean;
};

/** Props for {@link AboutLanguages}. */
export type AboutLanguagesProps = {
  editions: readonly LanguageEdition[];
  /** "You are reading this one". */
  currentLabel: string;
  zh: boolean;
};

/**
 * 三語: one card per language, each linking to this page in that language.
 * @param props language tiles, current-edition label, and typography choice
 * @param props.editions language tiles with names, destinations, and current-edition state
 * @param props.currentLabel accessible label marking the current edition
 * @param props.zh whether to use Chinese typography
 */
export const AboutLanguages: FC<AboutLanguagesProps> = ({ editions, currentLabel, zh }) => (
  <ul
    className="
      m-0 grid list-none gap-7 p-0
      md:grid-cols-3
    ">
    {editions.map((edition) => (
      <li key={edition.lang}>
        <Link
          aria-current={edition.current ? 'page' : undefined}
          className={cn(
            `
              grid h-full grid-cols-[76px_minmax(0,1fr)] items-start gap-5 px-6
              py-[22px] text-ink no-underline
              hover:bg-paper-raised hover:text-ink
            `,
            edition.current ? 'r2-red' : 'r1',
          )}
          href={edition.href}
          hrefLang={edition.lang}>
          <span
            aria-hidden="true"
            className={cn(
              `
                grid size-[76px] place-items-center bg-ink text-[2.13rem]
                font-bold text-paper
              `,
              edition.lang !== 'en' && 'tc',
            )}>
            {edition.glyph}
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="flex flex-wrap items-baseline gap-x-3">
              <span
                className={cn(
                  'text-[1.38rem] font-semibold',
                  edition.lang !== 'en' &&
                    `tc`,
                )}
                lang={edition.lang}>
                {edition.name}
              </span>
              <span className="pm text-[0.75rem] text-ink-micro">{edition.href}/</span>
            </span>
            <span className={cn('text-base/normal', zh && 'tc')}>{edition.note}</span>
            {edition.current ? (
              <span className={cn('cap', zh && 'tc')} style={SEAL_INK}>
                {currentLabel}
              </span>
            ) : null}
          </span>
        </Link>
      </li>
    ))}
  </ul>
);
