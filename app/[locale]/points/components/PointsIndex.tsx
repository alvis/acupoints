'use client';

import { useDeferredValue, useId, useMemo, useRef, useState } from 'react';

import { normaliseSearch } from '@/features/points/format';

import { AzColumns } from './AzColumns';
import { PointsIndexView } from './PointsIndexView';

import type { FC, KeyboardEvent, PropsWithChildren, ReactNode } from 'react';

import type { IndexText } from '@/features/points/labels';

import type { IndexGroup, IndexLeaf, IndexVolume, RegionLabel } from './indexTypes';
import type { PointsIndexModel } from './pointsIndexModel';
import type { FigureRegion } from './RegionFigure';

/** Props for {@link PointsIndex}. */
export type PointsIndexProps = PropsWithChildren<{
  text: IndexText;
  leaves: Readonly<Record<string, IndexLeaf | undefined>>;
  volumes: readonly IndexVolume[];
  plates: readonly IndexGroup[];
  conditions: readonly IndexGroup[];
  az: readonly IndexGroup[];
  regions: Readonly<Record<FigureRegion, RegionLabel>>;
  /** Leaves in the fourteen volumes (361). */
  total: number;
  /** BCP-47 tag for Han text. */
  hanLang: string;
  /** Show the English label beside each Han word (EN pages). */
  showHan: boolean;
  /** Server-carved figure groups for the region aside. */
  figureFront: ReactNode;
  figureBack: ReactNode;
}>;

export type Tab = 'volume' | 'region' | 'condition' | 'az';

export const TABS: readonly Tab[] = ['volume', 'region', 'condition', 'az'];

/**
 * The index island: an in-page search over every leaf, and four ways to
 * browse (by volume, by the plate a leaf is cut on, by condition, A to Z).
 * The A to Z list also stands below the tabs, as on the printed board.
 * The server-rendered hero is passed as children so it shares the search row.
 * @param props index entries, browsing groups, labels, and heading content
 * @returns the searchable index with volume, region, condition, and alphabetical browsing
 */
export const PointsIndex: FC<PointsIndexProps> = (props) => (
  <PointsIndexView {...usePointsIndexModel(props)} />
);

/**
 * track the index query, browsing tab, and keyboard focus
 * @param props index entries, browsing groups, labels, and heading content
 * @param props.text localized interface copy
 * @param props.leaves point records keyed by code
 * @param props.volumes ordered channel volumes
 * @param props.plates point groups arranged by carved body plate
 * @param props.conditions condition cards or groups associated with the listed points
 * @param props.az point groups ordered by pinyin initial
 * @param props.regions localized body-region labels
 * @param props.total number of points in the catalogue
 * @param props.hanLang language tag for Han text
 * @param props.showHan whether Han labels accompany English copy
 * @param props.figureFront server-rendered front-view body illustration
 * @param props.figureBack server-rendered back-view body illustration
 * @param props.children server-rendered content
 * @returns the search matches, active tab, keyboard controls, and browsing groups
 */
export const usePointsIndexModel = ({
  text,
  leaves,
  volumes,
  plates,
  conditions,
  az,
  regions,
  total,
  hanLang,
  showHan,
  figureFront,
  figureBack,
  children,
}: PointsIndexProps): PointsIndexModel => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('volume');
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  const baseId = useId();
  const deferred = useDeferredValue(query);
  const needle = normaliseSearch(deferred);

  const matches = useMemo(() => {
    if (!needle) {
      return undefined;
    }

    return new Set(
      Object.values(leaves)
        .filter((leaf): leaf is IndexLeaf => leaf?.search.includes(needle) === true)
        .map((leaf) => leaf.code),
    );
  }, [leaves, needle]);

  const filterGroups = (groups: readonly IndexGroup[]): IndexGroup[] =>
    matches
      ? groups
          .map((g) => ({ ...g, codes: g.codes.filter((c) => matches.has(c)) }))
          .filter((g) => g.codes.length > 0)
      : [...groups];

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>): void => {
    const at = TABS.indexOf(tab);
    const nextIndex =
      event.key === 'ArrowRight'
        ? (at + 1) % TABS.length
        : event.key === 'ArrowLeft'
          ? (at - 1 + TABS.length) % TABS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? TABS.length - 1
              : -1;
    if (nextIndex < 0) {
      return;
    }
    event.preventDefault();
    const next = TABS[nextIndex];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  const searchId = `${baseId}-search`;
  const matchCount = matches?.size ?? 0;
  const leafCount = Object.keys(leaves).length;

  return {
    children,
    searchId,
    text,
    query,
    setQuery,
    needle,
    matchCount,
    leafCount,
    deferred,
    tab,
    baseId,
    tabRefs,
    setTab,
    onTabKey,
    hanLang,
    leaves,
    matches,
    total,
    volumes,
    filterGroups,
    plates,
    conditions,
    showHan,
    figureBack,
    figureFront,
    regions,
    az,
  };
};

/** Props for the A to Z section. */
export type AzSectionProps = {
  text: IndexText;
  groups: readonly IndexGroup[];
  leaves: Readonly<Record<string, IndexLeaf | undefined>>;
  hanLang: string;
};

export const AzSection: FC<AzSectionProps> = ({ text, groups, leaves, hanLang }) => (
  <section aria-labelledby="index-az" className="flex flex-col gap-[22px]">
    <div className="flex items-baseline gap-5">
      <span aria-hidden="true" className="tc text-[1.875rem] font-black" lang={hanLang}>
        {text.azHan}
      </span>
      <h2
        className="
          m-0 text-[1.75rem] leading-tight font-medium
          sm:text-[2rem]
        "
        id="index-az">
        {text.azHeading}
      </h2>
    </div>
    <AzColumns groups={groups} hanLang={hanLang} leaves={leaves} />
  </section>
);
