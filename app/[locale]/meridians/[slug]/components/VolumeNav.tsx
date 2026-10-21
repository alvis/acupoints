import Link from 'next/link';

import type { FC } from 'react';

/** A neighbouring volume. */
export type VolumeLink = {
  href: string;
  /** volume number written in Chinese */
  vol: string;
  /** full Chinese channel title */
  zh: string;
  /** English name; omitted on Chinese pages. */
  en?: string;
};

/** Props for {@link VolumeNav}. */
export type VolumeNavProps = {
  label: string;
  prev?: VolumeLink;
  next?: VolumeLink;
  hanLang: string;
};

/**
 * Previous and next volume, as at the foot of a printed chapter.
 * @param props the neighboring volumes and navigation labels
 * @param props.label the accessible name of the volume navigation
 * @param props.prev the preceding volume, when present
 * @param props.next the following volume, when present
 * @param props.hanLang the BCP-47 tag for Han text
 * @returns the previous and next channel volume links
 */
export const VolumeNav: FC<VolumeNavProps> = ({ label, prev, next, hanLang }) => (
  <nav
    aria-label={label}
    className="
      mt-16 grid gap-6 border-t-[2.5px] border-b border-ink py-[18px]
      sm:grid-cols-2
    ">
    {prev ? (
      <Link
        className="flex flex-wrap items-baseline gap-x-3 text-ink no-underline"
        href={prev.href}
        rel="prev">
        <span aria-hidden="true" className="text-[1.375rem]">
          ←
        </span>
        <span className="tc text-base" lang={hanLang}>
          {prev.vol}
        </span>
        <span className="tc text-2xl font-bold" lang={hanLang}>
          {prev.zh}
        </span>
        {prev.en ? <span className="text-lg">{prev.en}</span> : null}
      </Link>
    ) : (
      <span />
    )}
    {next ? (
      <Link
        className="
          flex flex-wrap items-baseline justify-end gap-x-3 text-ink
          no-underline
        "
        href={next.href}
        rel="next">
        {next.en ? <span className="text-lg">{next.en}</span> : null}
        <span className="tc text-2xl font-bold" lang={hanLang}>
          {next.zh}
        </span>
        <span className="tc text-base" lang={hanLang}>
          {next.vol}
        </span>
        <span aria-hidden="true" className="text-[1.375rem]">
          →
        </span>
      </Link>
    ) : null}
  </nav>
);
