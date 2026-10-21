import type { Dispatch, SetStateAction, RefObject, KeyboardEvent, ReactNode } from 'react';

import type { IndexText } from '@/features/points/labels';

import type { IndexGroup, IndexLeaf, IndexVolume, RegionLabel } from './indexTypes';
import type { Tab } from './PointsIndex';
import type { FigureRegion } from './RegionFigure';

/** query, tab focus, search matches, and grouped index entries */
export interface PointsIndexModel {
  children: ReactNode;
  searchId: string;
  text: IndexText;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  needle: string;
  matchCount: number;
  leafCount: number;
  deferred: string;
  tab: Tab;
  baseId: string;
  tabRefs: RefObject<Partial<Record<Tab, HTMLButtonElement | null>>>;
  setTab: Dispatch<SetStateAction<Tab>>;
  onTabKey: (event: KeyboardEvent<HTMLButtonElement>) => void;
  hanLang: string;
  leaves: Readonly<Record<string, IndexLeaf | undefined>>;
  matches: Set<string> | undefined;
  total: number;
  volumes: readonly IndexVolume[];
  filterGroups: (groups: readonly IndexGroup[]) => IndexGroup[];
  plates: readonly IndexGroup[];
  conditions: readonly IndexGroup[];
  showHan: boolean;
  figureBack: ReactNode;
  figureFront: ReactNode;
  regions: Readonly<Record<FigureRegion, RegionLabel>>;
  az: readonly IndexGroup[];
}
