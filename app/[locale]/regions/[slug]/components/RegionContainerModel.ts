import type { AnyPoint } from '@/content/schemas';
import type {
  ChartPlate,
  ChartPoint,
  ChartStrip,
  PointChartCopy,
} from '@/features/channels/components/PointChart';
import type { regionCopy } from '@/features/regions/regionCopy';
import type { localizedRoutes } from '@/utilities/routes';

import type { RegionTab } from './RegionTabs';

/** loaded region content, safety notes, chart plates, and localized navigation. */
export type RegionContainerModel = Promise<{
  locale: 'en' | 'zh-hant' | 'zh-cn';
  crumbs: Array<
    | { href: string; label: string; zh?: never }
    | { href: string; label: string; zh: string | undefined }
  >;
  han: (text: string) => string;
  lang: 'zh-Hant' | 'zh-Hans';
  before: string[];
  t: ReturnType<typeof regionCopy>;
  english: boolean;
  position: number;
  region: {
    slug: 'head' | 'neck' | 'shoulder' | 'chest' | 'back' | 'arm' | 'hand' | 'leg' | 'foot' | 'ear';
    name: string;
    summary: string;
    relatedMeridians: string[];
    hanzi?: string;
    layout?: {
      viewBox: string;
      points: Array<{ code: string; x: number; y: number }>;
      baseTemplate?:
        'head' | 'arm' | 'hand' | 'leg' | 'foot' | 'ear' | 'torso-supine' | 'torso-prone';
    };
    keyPoints?: string[];
  };
  name: string;
  leadClass: string;
  summary: string;
  filed: AnyPoint[];
  lowerName: string;
  caution: string;
  tabs: RegionTab[];
  chartPoints: ChartPoint[];
  chartCopy: PointChartCopy;
  plates: ChartPlate[];
  strip: ChartStrip;
  hub:
    | {
        slug: string;
        kind: 'meridian' | 'journal' | 'condition' | 'region' | 'static';
        title: string;
        publishedAt: Date | undefined;
        authorship: {
          authoredBy: string;
          method: 'dual-witness-authored';
          generatedAt: Date;
          reviewStatus: 'draft' | 'sample-reviewed' | 'approved';
          policyVersion: '2026-08-editorial-v1';
          reviewer?: string;
        };
        sources: string[];
        lastReviewed: Date;
        en: {
          summary: string;
          sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
          faqs: Array<{ q: string; a: string }>;
          selfCareLimits: string;
        };
        zh: {
          summary: string;
          sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
          faqs: Array<{ q: string; a: string }>;
          selfCareLimits: string;
        };
        updatedAt?: Date;
        ogImage?: string;
      }
    | undefined;
  r: ReturnType<typeof localizedRoutes>;
}>;
