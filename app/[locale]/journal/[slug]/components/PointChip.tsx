import Link from 'next/link';

import { MarginNote } from '@/components/primitives/MarginNote';

import type { FC } from 'react';

/** Props for {@link PointChip}. */
export type PointChipProps = {
  href: string;
  /** The point's Han name, in the page's script. */
  hanzi: string;
  name: string;
  code: string;
  /** Red two-line margin note, such as a pregnancy caution. */
  note?: [string, string];
};

/**
 * A ruled chip linking to a point's leaf, as the Journal board's related leaves set it.
 * @param props related point leaf link and optional caution
 * @param props.href destination of the point leaf
 * @param props.hanzi Han name of the referenced point
 * @param props.name English name of the referenced point
 * @param props.code catalogue code of the referenced point
 * @param props.note caution or explanation beneath the figure
 * @returns the related point leaf link and optional caution
 */
export const PointChip: FC<PointChipProps> = ({ href, hanzi, name, code, note }) => (
  <Link
    className="
      r1 inline-flex items-center gap-2.5 px-3.5 py-2.5 text-[1.05rem]
      no-underline
      hover:bg-paper-raised
    "
    href={href}>
    <span aria-hidden="true" className="tc text-[1.2rem] font-bold">
      {hanzi}
    </span>
    {name}
    <span className="pm text-[0.7rem] text-ink-soft">{code}</span>
    {note ? <MarginNote lines={note} /> : null}
  </Link>
);
