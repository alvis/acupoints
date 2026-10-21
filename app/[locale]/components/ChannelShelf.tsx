'use client';

import Link from 'next/link';

import { useSeals } from '@/components/headless/useSeals';
import { Seal } from '@/components/primitives/Seal';

import { InkBar } from './InkBar';

import type { FC } from 'react';

const PERCENT_SCALE = 100;

/** One volume on the shelf: a channel and its leaves. */
export type ShelfVolume = {
  slug: string;
  href: string;
  /** Volume numeral in Han (一 … 十四). */
  numeral: string;
  /** Full classical name on the spine label (手太陰肺經, 督脈 …). */
  hanzi: string;
  /** Short readable name under the label. */
  name: string;
  /** Full name for the accessible label. */
  fullName: string;
  /** Code prefix shared by the channel's points (LU, LI …). */
  prefix: string;
  pointCount: number;
};

/** Props for {@link ChannelShelf}. */
export type ChannelShelfProps = {
  volumes: readonly ShelfVolume[];
  /** "Volume {i}, {name}, {s} of {n} leaves sealed". */
  spineLabel: string;
  /** "{name} volume complete". */
  completeLabel: string;
  /** Prefix before the volume numeral (卷). */
  volumeWord: string;
  /** Upper and lower characters of the 完卷 seal. */
  completeTop: string;
  completeBottom: string;
  /** `lang` for the Han text on English pages. */
  hanLang?: string;
};

/**
 * The fourteen channels as book spines (目錄). Each spine counts the leaves
 * the reader has sealed in this browser, fills a cinnabar bar, and takes a
 * 完卷 seal once every leaf in the volume is stamped. Fourteen across on
 * wide screens, seven on tablets, a sideways-scrolling shelf (書架) on phones.
 * @param props ordered volumes, accessible spine templates, and completion seal labels
 * @param props.volumes channel volumes in shelf order
 * @param props.spineLabel accessible spine label with volume, name, and sealed-count placeholders
 * @param props.completeLabel completion label with a channel-name placeholder
 * @param props.volumeWord prefix before the volume numeral
 * @param props.completeTop upper character of the completed-volume seal
 * @param props.completeBottom lower character of the completed-volume seal
 * @param props.hanLang language tag for Han glyphs
 */
export const ChannelShelf: FC<ChannelShelfProps> = ({
  volumes,
  spineLabel,
  completeLabel,
  volumeWord,
  completeTop,
  completeBottom,
  hanLang,
}) => {
  const { codes, ready } = useSeals();

  return (
    <ol
      className="
        m-0 -mx-4 flex snap-x list-none gap-2 overflow-x-auto px-4 pb-3
        sm:-mx-8 sm:px-8
        md:mx-0 md:grid md:snap-none md:grid-cols-7 md:gap-2.5
        md:overflow-visible md:px-0 md:pb-0
        xl:grid-cols-14
      ">
      {volumes.map((v, i) => {
        const sealed = ready ? countSealed(codes, v.prefix) : 0;
        const label = spineLabel
          .replace('{i}', String(i + 1))
          .replace('{name}', v.fullName)
          .replace('{s}', String(sealed))
          .replace('{n}', String(v.pointCount));

        return (
          <li
            className="
              w-16 shrink-0 snap-start
              md:w-auto
            "
            key={v.slug}>
            <Link
              aria-label={label}
              className="
                relative flex h-40 flex-col items-center gap-2 bg-paper-raised
                py-2.5 text-ink no-underline shadow-rest
                hover:text-ink hover:shadow-[inset_0_0_0_2.5px_var(--color-ink)]
                md:h-[300px] md:gap-3 md:py-3.5
                xl:h-[340px]
              "
              href={v.href}>
              <span
                aria-hidden="true"
                className="
                  absolute inset-y-8 right-[7px] hidden flex-col justify-between
                  md:flex
                ">
                <span className="h-[1.5px] w-1.5 bg-ink" />
                <span className="h-[1.5px] w-1.5 bg-ink" />
                <span className="h-[1.5px] w-1.5 bg-ink" />
                <span className="h-[1.5px] w-1.5 bg-ink" />
              </span>
              <span
                className="
                  tc text-[0.7rem] font-bold
                  md:text-xs
                "
                lang={hanLang}>
                {volumeWord}
                {v.numeral}
              </span>
              <span
                className="
                  tc vt bg-paper px-[3px] py-1.5 text-[0.95rem] font-bold
                  tracking-[0.06em] shadow-[inset_0_0_0_1px_var(--color-ink)]
                  md:px-1 md:py-2.5 md:text-[1.2rem]
                "
                lang={hanLang}>
                {v.hanzi}
              </span>
              <span className="flex-1" />
              <span
                className="
                  hidden px-1.5 text-center text-sm/tight
                  md:block
                ">
                {v.name}
              </span>
              <span
                className="
                  pm text-[0.65rem]
                  md:text-[0.7rem]
                ">
                <span
                  className="
                    hidden
                    md:inline
                  ">
                  {v.prefix} ·{' '}
                </span>
                {sealed}/{v.pointCount}
              </span>
              <InkBar
                className="
                  h-1 w-10 bg-paper
                  md:w-[54px]
                "
                percent={(PERCENT_SCALE * sealed) / v.pointCount}
              />
              {sealed >= v.pointCount ? (
                <span className="absolute right-2 bottom-[54px] rotate-[-8deg]">
                  <Seal
                    bottom={completeBottom}
                    label={completeLabel.replace('{name}', v.fullName)}
                    size={30}
                    top={completeTop}
                  />
                </span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ol>
  );
};

/**
 * Sealed codes on one channel: the prefix followed only by the point number.
 * @param codes point codes sealed in this browser
 * @param prefix channel code prefix
 * @returns the number of sealed codes belonging to the channel
 */
function countSealed(codes: readonly string[], prefix: string): number {
  const pattern = new RegExp(`^${prefix}\\d+$`, 'u');

  return codes.filter((code) => pattern.test(code)).length;
}
