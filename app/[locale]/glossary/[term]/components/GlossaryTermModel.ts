import type { JSX } from 'react';

import type { LearnCrumb } from '@/features/learn/components/LearnCrumbs';
import type { learnCopy } from '@/features/learn/copy';
import type { glossaryTermData } from '@/features/learn/glossaryTerms';
import type { contentLabels } from '@/utilities/i18n/contentLabels';
import type { getDictionary } from '@/utilities/i18n/dictionaries';
import type { localizedRoutes } from '@/utilities/routes';

/** loaded glossary entry and localized editorial reading, or a fallback leaf. */
export type GlossaryTermModel = Promise<
  | {
      fallback: JSX.Element;
      crumbs?: never;
      english?: never;
      entry?: never;
      contentKey?: never;
      locale?: never;
      data?: never;
      copy?: never;
      headwordLang?: never;
      han?: never;
      seeAlso?: never;
      opener?: never;
      arm?: never;
      ed?: never;
      dict?: never;
      labels?: never;
      r?: never;
      term?: never;
    }
  | {
      crumbs: (label: string, zh?: string) => LearnCrumb[];
      english: boolean;
      entry: {
        term: string;
        slug: string;
        oneLiner: string;
        opener?: { question: string; answer: string; followThrough?: string };
        body?: string[];
        relatedTerms?: string[];
      };
      contentKey: string;
      locale: 'en' | 'zh-hant' | 'zh-cn';
      data: ReturnType<typeof glossaryTermData>;
      copy: ReturnType<typeof learnCopy>;
      headwordLang: string | undefined;
      han: (text: string) => string;
      seeAlso: JSX.Element;
      opener: { question: string; answer: string; followThrough?: string } | undefined;
      arm:
        | {
            summary: string;
            sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
            faqs: Array<{ q: string; a: string }>;
            selfCareLimits: string;
          }
        | undefined;
      ed:
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
      dict: ReturnType<typeof getDictionary>;
      labels: ReturnType<typeof contentLabels>;
      r: ReturnType<typeof localizedRoutes>;
      term: string;
      fallback?: never;
    }
>;
