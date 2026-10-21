'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useSeals } from '@/components/headless/useSeals';
import { Seal } from '@/components/primitives/Seal';
import { fill } from '@/features/points/format';
import { daysBetween, dayToDate } from '@/utilities/seals/sealDays';
import { countWord, ordinal } from '@/utilities/seals/sealWords';

import type { FC } from 'react';

import type { SealsText } from '@/features/points/labels';
import type { Locale } from '@/utilities/routes';

import type { SealsMoreText } from './sealsCopy';
import type { SealLeaf, SealVolume } from './sealTypes';

/** Props for {@link LatestSeal}. */
export type LatestSealProps = {
  locale: Locale;
  text: SealsText;
  more: SealsMoreText;
  /** " · today", " · 18 October"; empty for a seal older than dating. */
  when: string;
  leaf?: SealLeaf;
  volume?: SealVolume;
  sealedSet: ReadonlySet<string>;
  leaves: Readonly<Record<string, SealLeaf>>;
  indexHref: string;
  hanLang: string;
};

export const LatestSeal: FC<LatestSealProps> = ({
  locale,
  text,
  more,
  when,
  leaf,
  volume,
  sealedSet,
  leaves,
  indexHref,
  hanLang,
}) => {
  if (!leaf || !volume) {
    return (
      <section
        aria-labelledby="seals-latest"
        className="blk m-1.5 flex flex-col items-start gap-3.5 p-[26px]">
        <h2 className="m-0 text-2xl font-medium" id="seals-latest">
          {text.emptyTitle}
        </h2>
        <p className="m-0 text-base/normal text-ink-soft">{text.emptyBody}</p>
        <Link className="btn btn-primary mt-1.5" href={indexHref}>
          {text.emptyLink} →
        </Link>
      </section>
    );
  }
  const s = volume.codes.filter((c) => sealedSet.has(c)).length;
  const left = volume.codes.length - s;
  const nextCode = volume.codes.find((c) => !sealedSet.has(c));
  const next = nextCode ? leaves[nextCode] : undefined;

  return (
    <section
      aria-labelledby="seals-latest"
      className="blk m-1.5 flex flex-col items-center gap-3.5 p-[26px]">
      <h2 className="cap m-0 self-start" id="seals-latest">
        {text.latest}
        {when}
      </h2>
      <span className="my-2.5 inline-flex -rotate-6">
        <Seal bottom={leaf.glyphs[1]} size={150} top={leaf.glyphs[0]} />
      </span>
      <p className="m-0 text-center text-2xl font-medium">
        {/* English pages name the leaf as the board does; the seal already shows its Han. */}
        {locale === 'en' ? null : (
          <>
            <span className="tc" lang={hanLang}>
              {leaf.han}
            </span>{' '}
          </>
        )}
        {leaf.name} · {leaf.code}
      </p>
      <p className="m-0 text-center text-base text-ink-soft">
        {left > 0
          ? fill(more.latestText, {
              nth: ordinal(s, locale),
              volume: volume.name,
              left: countWord(left, locale, true),
            })
          : fill(text.latestDone, { volume: volume.name })}
      </p>
      {next ? (
        <Link className="btn btn-primary mt-1.5" href={next.href}>
          {fill(text.next, { name: `${next.han} ${next.name}` })}
        </Link>
      ) : null}
    </section>
  );
};

/** Props for {@link VolumeSeals}. */
export type VolumeSealsProps = {
  text: SealsText;
  volumes: readonly SealVolume[];
  complete: readonly SealVolume[];
  hanLang: string;
};

export const VolumeSeals: FC<VolumeSealsProps> = ({ text, volumes, complete, hanLang }) => (
  <section aria-labelledby="seals-volumes" className="flex flex-col gap-3.5">
    <h2 className="m-0 text-[1.375rem] font-medium" id="seals-volumes">
      <span className="tc font-bold" lang={hanLang}>
        {text.volumeSeals.han}
      </span>
      {text.volumeSeals.label !== text.volumeSeals.han ? ` ${text.volumeSeals.label}` : null}
    </h2>
    <p className="m-0 text-base text-ink-soft">{text.volumeSealsBody}</p>
    <ul
      className="
        m-0 grid list-none grid-cols-[repeat(5,56px)] gap-x-3 gap-y-3.5 p-0
        sm:gap-x-4
      ">
      {volumes.map((v) =>
        complete.includes(v) ? (
          <li className="inline-flex rotate-[-5deg]" key={v.slug}>
            <Seal
              bottom="完"
              label={fill(text.earned, { volume: v.name })}
              size={56}
              top={v.glyph}
            />
          </li>
        ) : (
          <li key={v.slug}>
            <span
              aria-label={fill(text.notEarned, { volume: v.name })}
              className="
                tc grid size-14 place-items-center text-lg text-ink-micro
                shadow-[inset_0_0_0_1px_var(--color-ink-micro)] outline-1
                outline-offset-[-6px] outline-ink-micro outline-dashed
              "
              lang={hanLang}
              role="img">
              {v.glyph}
            </span>
          </li>
        ),
      )}
    </ul>
  </section>
);

/** Props for {@link ClearSeals}. */
export type ClearSealsProps = {
  text: SealsText;
  count: number;
};

/**
 * Privacy note and the two-step "clear all seals" control, with a spoken result.
 * @param props localized reset labels and number of seals to remove
 * @param props.text localized display copy
 * @param props.count number of seals that clearing will remove
 */
export const ClearSeals: FC<ClearSealsProps> = ({ text, count }) => {
  const seals = useSeals();
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);
  const keepRef = useRef<HTMLButtonElement>(null);
  const clearRef = useRef<HTMLButtonElement>(null);
  const asked = useRef(false);
  // Move focus with the swap: into the question when it opens, back to the
  // control when it closes (never on first render).
  useEffect(() => {
    if (confirming) {
      asked.current = true;
      keepRef.current?.focus();
    } else if (asked.current) {
      clearRef.current?.focus();
    }
  }, [confirming]);

  return (
    <section
      aria-label={text.clear}
      className="r1 flex flex-col gap-3 px-5 py-[18px]">
      <p className="m-0 text-[0.95rem] leading-[1.45] text-ink-soft">{text.privacy}</p>
      {confirming ? (
        <div aria-label={text.clear} className="flex flex-col gap-2.5" role="group">
          <p className="m-0 text-base font-semibold">{fill(text.confirm, { n: count })}</p>
          <div className="flex flex-wrap gap-2.5">
            <button
              className="btn btn-primary cursor-pointer border-0"
              type="button"
              onClick={() => {
                seals.clear();
                setConfirming(false);
                setCleared(true);
              }}>
              {text.confirmYes}
            </button>
            <button
              className="btn btn-secondary cursor-pointer border-0"
              ref={keepRef}
              type="button"
              onClick={() => setConfirming(false)}>
              {text.confirmNo}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="
            btn btn-secondary cursor-pointer self-start border-0
            disabled:cursor-not-allowed disabled:opacity-60
          "
          disabled={count === 0}
          ref={clearRef}
          type="button"
          onClick={() => {
            setCleared(false);
            setConfirming(true);
          }}>
          {text.clear}
        </button>
      )}
      <p className="m-0 min-h-5 text-[0.95rem]" role="status">
        {cleared ? text.cleared : ''}
      </p>
    </section>
  );
};

/**
 * When the latest seal was pressed, as a suffix to "Latest seal".
 * @param more localized latest-seal templates and date locale
 * @param day recorded reading date
 * @param today current reading date
 * @returns a localized date suffix, or an empty string when either date is missing
 */
export function latestWhen(more: SealsMoreText, day: string | undefined, today: string): string {
  if (!day || !today) {
    return '';
  }
  const ago = daysBetween(day, today);
  if (ago === 0) {
    return more.latestToday;
  }
  if (ago === 1) {
    return more.latestYesterday;
  }
  const date = new Intl.DateTimeFormat(more.dateLocale, { day: 'numeric', month: 'long' }).format(
    dayToDate(day),
  );

  return fill(more.latestOn, { date });
}
