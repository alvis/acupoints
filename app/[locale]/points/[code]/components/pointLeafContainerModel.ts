import type { JSX, ReactNode } from 'react';
import type { Thing } from 'schema-dts';

import type { AnyPoint } from '@/content/schemas';
import type { PointsText, LeafText } from '@/features/points/labels';
import type { LocalLeafQuote, LocalLeafCard } from '@/features/points/leafCard';
import type { LeafPosition } from '@/features/points/volumes';
import type { getDictionary } from '@/utilities/i18n/dictionaries';
import type { localizedRoutes } from '@/utilities/routes';

import type { CardCondition, CardPoint, FourGates } from './LeafCards';
import type { CommentarySection, ContentsEntry } from './LeafCommentary';
import type { LeafLine } from './LeafNotes';
import type { LeafIdentity } from './LeafSpread';

/** loaded point content, safety notes, related cards, and page schema */
export type PointLeafContainerModel = Promise<{
  position: LeafPosition | undefined;
  r: ReturnType<typeof localizedRoutes>;
  t: LeafText;
  volumeName: string;
  hanLang: string;
  mobilePlace: string;
  dict: ReturnType<typeof getDictionary>;
  aboveBlock: ReactNode | undefined;
  lines: LeafLine[];
  locale: 'en' | 'zh-hant' | 'zh-cn';
  identity: LeafIdentity;
  quote: LocalLeafQuote | undefined;
  summary: JSX.Element;
  text: PointsText;
  datasetLang: string | undefined;
  leafCard: LocalLeafCard | undefined;
  conditions: CardCondition[];
  current: CardPoint;
  fourGates: FourGates | undefined;
  next: CardPoint | undefined;
  pairs: CardPoint[];
  prev: CardPoint | undefined;
  sections: CommentarySection[];
  contents: ContentsEntry[];
  recordedCautions: string[];
  cautionsTitle: string;
  cautionsLang: string | undefined;
  arm:
    | {
        summary: string;
        sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
        faqs: Array<{ q: string; a: string }>;
        selfCareLimits: string;
      }
    | undefined;
  infoNote: boolean;
  faqs: Array<{ q: string; a: string }>;
  citations: string[];
  reviewed: Date;
  pagePath: string;
  point: AnyPoint;
  jsonPaths: string[];
  record: string;
  place: string;
  graph: Thing[];
}>;
