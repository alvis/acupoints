import type { Thing } from 'schema-dts';

import type { IndexText } from '@/features/points/labels';

import type { IndexGroup, IndexLeaf, IndexVolume, RegionLabel } from './indexTypes';
import type { FigureRegion } from './RegionFigure';

/** localized index entries, browsing groups, and page schema */
export interface PointsIndexContainerModel {
  az: IndexGroup[];
  conditions: IndexGroup[];
  hanLang: string;
  leaves: Record<string, IndexLeaf>;
  plates: IndexGroup[];
  regions: Record<FigureRegion, RegionLabel>;
  en: boolean;
  t: IndexText;
  total: number;
  volumes: IndexVolume[];
  locale: 'en' | 'zh-hant' | 'zh-cn';
  graph: Thing[];
}
