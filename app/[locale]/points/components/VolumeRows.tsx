'use client';

import Link from 'next/link';
import { useId, useState } from 'react';

import { useSeals } from '@/components/headless/useSeals';
import { fill } from '@/features/points/format';

import { LeafLinks } from './LeafLinks';

import type { FC } from 'react';

import type { IndexText } from '@/features/points/labels';

import type { IndexLeaf, IndexVolume } from './indexTypes';

/** Props for {@link VolumeRows}. */
export type VolumeRowsProps = {
  volumes: readonly IndexVolume[];
  leaves: Readonly<Record<string, IndexLeaf | undefined>>;
  /** Codes matching the in-page search; undefined while the search is empty. */
  matches?: ReadonlySet<string>;
  text: IndexText;
  total: number;
  /** BCP-47 tag for Han text. */
  hanLang: string;
};

/**
 * The fourteen volumes in the traditional order, one ruled row each: volume
 * number, channel name, leaf count on a dotted leader, and how many of its
 * leaves this browser has sealed. Each row opens its leaves in place.
 * @param props channel entries, point records, search matches, and count labels
 * @param props.volumes ordered channel volumes
 * @param props.leaves point records keyed by code
 * @param props.matches codes matching the search, or undefined while the search is empty
 * @param props.text localized interface copy
 * @param props.total number of points in the catalogue
 * @param props.hanLang language tag for Han text
 * @returns the expandable channel rows with leaf and seal counts
 */
const PERCENT_SCALE = 100;

export const VolumeRows: FC<VolumeRowsProps> = ({
  volumes,
  leaves,
  matches,
  text,
  total,
  hanLang,
}) => {
  const seals = useSeals();
  const { codes, ready } = seals;
  const sealed = ready ? codes.length : 0;
  const shown = matches ? volumes.filter((v) => v.codes.some((c) => matches.has(c))) : volumes;

  return (
    <div className="flex min-w-0 flex-col">
      <div
        className="
          flex flex-wrap items-baseline justify-between gap-x-4 border-b-[1.5px]
          border-ink pb-2.5
        ">
        <h2 className="m-0 text-[1.375rem] font-medium">{text.volumesHeading}</h2>
        <span className="text-[0.95rem] text-ink-soft">
          {fill(text.sealedCount, { n: sealed, total })}
        </span>
      </div>
      <ul className="m-0 list-none p-0">
        {shown.map((volume) => (
          <VolumeRow
            hanLang={hanLang}
            key={volume.slug}
            leaves={leaves}
            matches={matches}
            text={text}
            volume={volume}
          />
        ))}
      </ul>
    </div>
  );
};

export type VolumeRowProps = {
  volume: IndexVolume;
  leaves: Readonly<Record<string, IndexLeaf | undefined>>;
  matches?: ReadonlySet<string>;
  text: IndexText;
  hanLang: string;
};

const VolumeRow: FC<VolumeRowProps> = ({ volume, leaves, matches, text, hanLang }) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const seals = useSeals();
  const { ready } = seals;
  const n = volume.codes.length;
  const s = ready ? volume.codes.filter((c) => seals.has(c)).length : 0;
  const expanded = open || matches !== undefined;
  const listed = volume.codes
    .filter((c) => !matches || matches.has(c))
    .map((c) => leaves[c])
    .filter((leaf): leaf is IndexLeaf => leaf !== undefined);

  return (
    <li className="border-b border-ink/25">
      <div
        className="
          grid grid-cols-[3rem_minmax(0,1fr)_2.75rem] items-center gap-x-2
          py-2.5
          md:min-h-[52px] md:grid-cols-[58px_minmax(0,1fr)_150px_2.75rem]
          md:py-0
        ">
        <Link className="col-span-2 grid grid-cols-subgrid items-center" href={volume.href}>
          <span className="tc text-[0.95rem] text-ink-micro" lang={hanLang}>
            {volume.number}
          </span>
          <span
            className="
              flex min-w-0 flex-col gap-0.5
              lg:grid lg:grid-cols-[152px_minmax(0,1fr)] lg:items-center
            ">
            <span
              className="
                tc text-[1.25rem] font-bold
                md:text-[1.44rem]
              "
              lang={hanLang}>
              {volume.han}
            </span>
            <span
              className="
                flex min-w-0 items-baseline text-base
                md:text-lg
              ">
              <span className="truncate">
                {volume.name}
                {volume.channel ? <span className="text-ink-soft"> · {volume.channel}</span> : null}
              </span>
              <span aria-hidden="true" className="lead" />
              <span className="pm shrink-0 text-xs">{fill(text.leavesCount, { n })}</span>
            </span>
          </span>
        </Link>
        <span
          className="
            col-start-2 row-start-2 flex items-center gap-2
            md:col-start-auto md:row-start-auto md:justify-end
          ">
          <svg
            aria-hidden="true"
            className="h-[5px] w-20 shadow-[inset_0_0_0_1px_var(--color-ink)]"
            preserveAspectRatio="none"
            viewBox="0 0 100 5">
            <rect fill="var(--color-cinnabar)" height="5" width={(PERCENT_SCALE * s) / n} />
            <rect fill="none" height="5" stroke="var(--color-ink)" strokeWidth="1.2" width="100" />
          </svg>
          <span className="pm w-9 text-right text-[0.6875rem]">
            <span className="sr-only">{fill(text.sealedCount, { n: s, total: n })}</span>
            <span aria-hidden="true">
              {s}/{n}
            </span>
          </span>
        </span>
        <button
          aria-controls={panelId}
          aria-expanded={expanded}
          aria-label={expanded ? text.hideLeaves : fill(text.showLeaves, { n })}
          className="
            col-start-3 row-span-2 row-start-1 grid size-9 cursor-pointer
            place-items-center justify-self-end border-0 bg-transparent text-xl
            shadow-[inset_0_0_0_1px_var(--color-ink)]
            disabled:cursor-default disabled:opacity-60
            md:col-start-4 md:row-span-1
          "
          disabled={matches !== undefined}
          type="button"
          onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
      </div>
      <div className="pb-4" hidden={!expanded} id={panelId}>
        {expanded ? (
          <LeafLinks hanLang={hanLang} leaves={listed} sealedLabel={text.sealed} />
        ) : null}
      </div>
    </li>
  );
};
