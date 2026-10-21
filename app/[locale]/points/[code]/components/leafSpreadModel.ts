import type { ReactNode } from 'react';

import type { AnyPoint } from '@/content/schemas';
import type { LeafText } from '@/features/points/labels';
import type { LocalLeafQuote } from '@/features/points/leafCard';
import type { Volume, LeafPosition } from '@/features/points/volumes';
import type { localizedRoutes } from '@/utilities/routes';

import type { LeafLine } from './LeafNotes';
import type { LeafIdentity } from './LeafSpread';

/** localized point headings, channel facts, and annotated instructions */
export interface LeafSpreadModel {
  t: LeafText;
  r: ReturnType<typeof localizedRoutes>;
  hanLang: string;
  locale: 'en' | 'zh-hant' | 'zh-cn';
  volume: Volume | undefined;
  volumeHan: string;
  channelName: string;
  leafHan: string;
  point: LeafIdentity;
  aboveBlock: ReactNode;
  leafOf: string | undefined;
  channelHan: string;
  handInset: string | undefined;
  plateLabel: string;
  han: string;
  stripTitle: string;
  position: LeafPosition | undefined;
  facts: string;
  lines: readonly LeafLine[];
  quote: LocalLeafQuote | undefined;
  summary: ReactNode;
  next: AnyPoint | undefined;
}
