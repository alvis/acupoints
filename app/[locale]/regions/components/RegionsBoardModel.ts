import type { Dispatch, SetStateAction, JSX, ReactNode } from 'react';

import type { BoardRegion, RegionsBoardCopy } from './RegionsBoard';

/** selected body region, figure renderer, and synchronized card index. */
export type RegionsBoardModel = {
  copy: RegionsBoardCopy;
  regions: readonly BoardRegion[];
  current: BoardRegion;
  setSelected: Dispatch<SetStateAction<string>>;
  hanLang: string;
  figure: (view: 'front' | 'back', body: ReactNode, className: string) => JSX.Element;
  frontFigure: ReactNode;
  backFigure: ReactNode;
  panels: readonly ReactNode[];
  index: number;
} | null;
