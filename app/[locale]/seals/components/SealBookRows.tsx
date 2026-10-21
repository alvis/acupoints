'use client';

import Link from 'next/link';

import { fill } from '@/features/points/format';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

import type { useSeals } from '@/components/headless/useSeals';

import type { SealBookProps } from './SealBook';

type SealBookRowsProps = Pick<SealBookProps, 'text' | 'volumes' | 'hanLang'> & {
  sealedSet: ReadonlySet<string>;
  ready: boolean;
  seals: ReturnType<typeof useSeals>;
};
/**
 * ruled volume rows show one filled square for each sealed leaf.
 * @param props channel volumes, loaded browser seals, and toggle actions
 * @param props.text localized seal-book labels
 * @param props.volumes ordered channel volumes
 * @param props.hanLang language tag for Han glyphs
 * @param props.sealedSet sealed codes for membership checks
 * @param props.ready whether browser seals have loaded
 * @param props.seals browser seal store and its actions
 */
export const SealBookRows: FC<Readonly<SealBookRowsProps>> = ({
  text,
  volumes,
  hanLang,
  sealedSet,
  ready,
  seals,
}) => (
  <section aria-label={text.bookLabel} className="border-t-[2.5px] border-ink">
    <ul className="m-0 list-none p-0">
      {volumes.map((volume) => {
        const s = volume.codes.filter((c) => sealedSet.has(c)).length;
        const n = volume.codes.length;
        const done = s === n;
        const reading = `${fill(text.rowLabel, { volume: volume.name, s, n })}${done ? ', ' + text.volumeComplete : ''}`;

        return (
          <li
            className="
              grid items-start gap-x-5 gap-y-2 border-b border-ink/25 py-3.5
              md:grid-cols-[250px_minmax(0,1fr)]
            "
            key={volume.slug}>
            <Link className="wb-link flex items-baseline gap-2.5" href={volume.href}>
              <span className="tc w-10 shrink-0 text-sm text-ink-micro" lang={hanLang}>
                {volume.number}
              </span>
              <span className="tc text-xl font-bold" lang={hanLang}>
                {volume.han}
              </span>
              <span className="pm ml-auto text-[0.6875rem]">
                {s}/{n}
              </span>
            </Link>
            <div
              aria-label={reading}
              className="flex flex-wrap items-center gap-1"
              role="img">
              {volume.codes.map((c) => (
                <span
                  className={cn(
                    'size-[18px]',
                    ready && seals.has(c)
                      ? 'bg-(--color-cinnabar)'
                      : 'shadow-[inset_0_0_0_1px_rgba(29,26,22,0.55)]',
                  )}
                  key={c}
                />
              ))}
              {done ? (
                <span className="red ml-3 text-[0.95rem] italic">{text.volumeComplete}</span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  </section>
);
