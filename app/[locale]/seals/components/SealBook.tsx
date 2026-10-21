'use client';

import { useSeals } from '@/components/headless/useSeals';
import { fill } from '@/features/points/format';

import { LatestSeal, VolumeSeals, ClearSeals, latestWhen } from './SealBookDetails';
import { SealBookRows } from './SealBookRows';
import { SealBookStats } from './SealBookStats';
import { SealShare } from './SealShare';

import type { FC, PropsWithChildren } from 'react';

import type { SealsText } from '@/features/points/labels';
import type { Locale } from '@/utilities/routes';
import type { SealBookPage } from '@/utilities/seals/drawSealBook';

import type { SealsMoreText } from './sealsCopy';
import type { SealLeaf, SealVolume } from './sealTypes';

/** Props for {@link SealBook}. */
export type SealBookProps = PropsWithChildren<{
  locale: Locale;
  text: SealsText;
  /** Streak, latest-seal date and export strings. */
  more: SealsMoreText;
  /** 印譜 in the locale's script, for the printed page. */
  bookHan: string;
  /** 經穴 in the locale's script, for the printer's seal on the printed page. */
  printerGlyphs: readonly [string, string];
  volumes: readonly SealVolume[];
  leaves: Readonly<Record<string, SealLeaf>>;
  total: number;
  indexHref: string;
  /** BCP-47 tag for Han text. */
  hanLang: string;
}>;

/**
 * 印譜, the reader's seal book: the leaf, streak and volume counts, one square
 * per leaf in rows by volume, the latest seal and when it was pressed, the
 * fourteen volume seals, a printed page to save, and a way to lift every seal.
 * Everything is read from this browser's own store; the server-rendered hero
 * arrives as children beside the live counts.
 * @param props catalog leaves, channel volumes, localized copy, and hero content
 * @param props.locale edition used for labels and links
 * @param props.text localized display copy
 * @param props.more streak, latest-seal date, and export strings
 * @param props.bookHan 印譜 in the locale’s script for the printed page
 * @param props.printerGlyphs 經穴 in the locale’s script for the printed printer seal
 * @param props.volumes ordered channel volumes and their leaf codes
 * @param props.leaves leaf names and destinations keyed by point code
 * @param props.total number of leaves across all volumes
 * @param props.indexHref localized point-index destination
 * @param props.hanLang language tag for Han glyphs
 * @param props.children server-rendered hero beside the live counts
 * @returns the seal counts, volume rows, latest seal, sharing control, and reset control
 */
export const SealBook: FC<SealBookProps> = ({
  locale,
  text,
  more,
  bookHan,
  printerGlyphs,
  volumes,
  leaves,
  total,
  indexHref,
  hanLang,
  children,
}) => {
  const seals = useSeals();
  const { codes, days, today, streak, ready } = seals;
  const sealed = ready ? codes.filter((c) => c in leaves) : [];
  const sealedSet = new Set(sealed);
  const complete = volumes.filter((v) => v.codes.every((c) => sealedSet.has(c)));
  const latest = sealed.length > 0 ? leaves[sealed[sealed.length - 1]] : undefined;
  const latestVolume = latest ? volumes.find((v) => v.slug === latest.volume) : undefined;
  const latestDay = latest ? days[latest.code] : undefined;
  const summary = `${fill(more.share.summary, {
    leaves: sealed.length,
    total,
    volumes: complete.length,
    volumeTotal: volumes.length,
  })}${streak > 0 ? fill(more.share.summaryStreak, { n: streak }) : ''}`;
  const sharePage: Omit<SealBookPage, 'printed'> = {
    han: bookHan,
    title: text.title,
    summary,
    volumeSeals: text.volumeSeals,
    completeGlyph: '完',
    printerGlyphs,
    brand: more.share.brand,
    volumes: volumes.map((v) => ({
      number: v.number,
      han: v.han,
      glyph: v.glyph,
      sealed: v.codes.map((c) => sealedSet.has(c)),
    })),
  };

  return (
    <>
      <div
        className="
          mt-8 flex flex-col gap-8
          lg:mt-11 lg:flex-row lg:items-end lg:gap-[34px]
        ">
        {children}
        <span
          aria-hidden="true"
          className="
            hidden flex-1
            lg:block
          "
        />
        <SealBookStats {...{ text, more, total, sealed, streak, complete, volumes }} />
      </div>

      <div
        className="
          mt-11 grid items-start gap-12
          lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-[52px]
        ">
        <SealBookRows {...{ text, volumes, hanLang, sealedSet, ready, seals }} />

        <div className="flex flex-col gap-7">
          <LatestSeal
            hanLang={hanLang}
            indexHref={indexHref}
            leaf={latest}
            leaves={leaves}
            locale={locale}
            more={more}
            sealedSet={sealedSet}
            text={text}
            volume={latestVolume}
            when={latestWhen(more, latestDay, today)}
          />
          <VolumeSeals complete={complete} hanLang={hanLang} text={text} volumes={volumes} />
          <SealShare
            dateLocale={more.dateLocale}
            locale={locale}
            page={sharePage}
            text={more.share}
          />
          <ClearSeals count={sealed.length} text={text} />
        </div>
      </div>
    </>
  );
};

export type { LatestSealProps, VolumeSealsProps, ClearSealsProps } from './SealBookDetails';
