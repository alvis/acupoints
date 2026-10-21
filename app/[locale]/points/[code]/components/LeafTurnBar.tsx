import Link from 'next/link';

import { LeafSeal } from './LeafSeal';

import type { FC } from 'react';

import type { SealButtonText } from '@/features/points/labels';

import type { CardPoint } from './LeafCards';

/** Props for `LeafTurnBar`. */
export type LeafTurnBarProps = {
  label: string;
  /** BCP-47 tag for Han text. */
  hanLang: string;
  code: string;
  /** Two characters pressed into the seal face. */
  glyphs: readonly [string, string];
  seal: SealButtonText;
  prev?: CardPoint;
  next?: CardPoint;
};

/**
 * The phone leaf's bottom bar (WbMobileLeaf): the previous leaf, the seal
 * square raised over the rule, the next leaf. Pinned to the foot of the screen
 * while the leaf scrolls; hidden from md up, where the leaf-turn rule and the
 * seal beside the block do the same work.
 * @param props neighboring point links and seal identity
 * @param props.label accessible name of the fixed leaf navigation
 * @param props.hanLang language tag for Han text
 * @param props.code canonical point identifier
 * @param props.glyphs characters printed on the seal
 * @param props.seal localized seal button labels
 * @param props.prev previous point in the channel
 * @param props.next next point in the channel
 * @returns the fixed previous and next leaf controls with the center seal
 */
export const LeafTurnBar: FC<LeafTurnBarProps> = ({
  label,
  hanLang,
  code,
  glyphs,
  seal,
  prev,
  next,
}) => (
  <nav
    aria-label={label}
    className="
      sticky bottom-0 z-30 mt-14 grid h-[86px] grid-cols-[1fr_auto_1fr]
      items-center border-t-[2.5px] border-ink bg-paper px-4 pb-2
      md:hidden
    ">
    {prev ? (
      <Link className="flex flex-col no-underline" href={prev.href} rel="prev">
        <span className="text-xs text-ink-soft">← {prev.code}</span>
        <span className="tc text-lg font-bold" lang={hanLang}>
          {prev.han}
        </span>
      </Link>
    ) : (
      <span />
    )}
    <div className="mt-[-26px]">
      <LeafSeal code={code} glyphs={glyphs} size="sm" text={seal} />
    </div>
    {next ? (
      <Link className="flex flex-col items-end no-underline" href={next.href} rel="next">
        <span className="text-xs text-ink-soft">{next.code} →</span>
        <span className="tc text-lg font-bold" lang={hanLang}>
          {next.han}
        </span>
      </Link>
    ) : (
      <span />
    )}
  </nav>
);
