import { SectionHead } from '@/components/primitives/SectionHead';
import { HanLead } from '@/features/editorial/components/HanLead';
import { ABOUT_COPY } from '@/features/editorial/copy';
import { cn } from '@/utilities/cn';

import { AboutTimeline } from './AboutTimeline';

import type { FC } from 'react';

import type { HanText, Translate } from '@/features/editorial/copy';

import type { TimelineWork } from './AboutTimeline';

type AboutSourcesProps = {
  t: Translate;
  han: HanText;
  zh: boolean;
  before: readonly TimelineWork[];
  after: readonly TimelineWork[];
  citedSeal: readonly [string, string];
  noteClass: string;
};

/**
 * historical sources and cited works arranged around the timeline gap
 * @param props copy translator, script converter, timeline works, and note styling
 * @param props.t localized copy lookup
 * @param props.han Han script conversion
 * @param props.zh whether to use Chinese typography
 * @param props.before historical works before the gap
 * @param props.after cited works after the gap
 * @param props.citedSeal characters on the source seal
 * @param props.noteClass shared note typography
 */
export const AboutSources: FC<Readonly<AboutSourcesProps>> = ({
  t,
  han,
  zh,
  before,
  after,
  citedSeal,
  noteClass,
}) => (
  <section aria-labelledby="about-sources" className="mt-[72px]">
    <SectionHead
      aside={
        <p className={noteClass}>
          {t(ABOUT_COPY.sourcesNote)}{' '}
          <span className="tc red font-bold" lang={zh ? undefined : 'zh-Hant'}>
            {han('所據')}
          </span>
          {t(ABOUT_COPY.sourcesNoteEnd)}
        </p>
      }
      className="mb-7 border-b border-ink pb-3.5"
      id="about-sources"
      kicker={
        <HanLead han={han('源流')} zh={zh}>
          {t(ABOUT_COPY.sourcesCap)}
        </HanLead>
      }
      title={<span className={cn(zh && 'tc')}>{t(ABOUT_COPY.sourcesTitle)}</span>}
      zh={han('源流')}
    />
    <AboutTimeline
      after={after}
      before={before}
      citedSeal={citedSeal}
      citedTag={zh ? han('所據') : `所據 · ${ABOUT_COPY.cited.en}`}
      gapLabel={t(ABOUT_COPY.gapLabel)}
      gapYears={t(ABOUT_COPY.gapYears)}
      label={t(ABOUT_COPY.timelineLabel)}
      zh={zh}
    />
  </section>
);
