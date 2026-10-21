import { PartRow } from '@/features/learn/components/PartRow';
import { pointsInText } from '@/features/learn/content';
import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { H2, HEAD_RULE } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';

import { CunSidePanel } from './CunSidePanel';
import { chipProps, firstPhrase } from './JournalPostDetails';
import { PointChip } from './PointChip';

import type { FC } from 'react';

import type { EditorialArm } from '@/content/editorial/schema';
import type { LearnCopy } from '@/features/learn/copy';
import type { Locale, localizedRoutes } from '@/utilities/routes';

import type { CunGuide } from './cunGuide';

type JournalPostPartsProps = {
  locale: Locale;
  copy: LearnCopy;
  r: ReturnType<typeof localizedRoutes>;
  english: boolean;
  han: (text: string) => string;
  arm: EditorialArm;
  zhArm: EditorialArm;
  guide: CunGuide | undefined;
  parts: number;
  glossaryHref: string;
};

/**
 * set the guide prose beside its figures and notes
 * @param props guide sections with their numbered discs and side panels
 * @param props.locale page language and writing system
 * @param props.copy localized interface text
 * @param props.r localized destination routes
 * @param props.english whether this edition is English
 * @param props.han converter for Han text in the page script
 * @param props.arm localized article prose
 * @param props.zhArm Traditional Chinese article prose
 * @param props.guide measurement figures and captions
 * @param props.parts number of article sections
 * @param props.glossaryHref measurement glossary destination
 * @returns the guide sections with their numbered discs and side panels
 */
export const JournalPostParts: FC<Readonly<JournalPostPartsProps>> = ({
  locale,
  copy,
  r,
  english,
  han,
  arm,
  zhArm,
  guide,
  parts,
  glossaryHref,
}) => (
  <section aria-labelledby="parts" className="mt-[72px]">
    <div className={cn('flex flex-wrap items-baseline gap-x-5 gap-y-1', HEAD_RULE)}>
      <span aria-hidden="true" className="tc text-[1.875rem] font-black">
        {han(`${hanNumeral(parts)}則`)}
      </span>
      <h2 className={H2} id="parts">
        {fill(copy.journalPartsHeading, { n: countWord(parts, locale, true) })}
      </h2>
      <span className="text-[1.05rem] text-ink-soft italic">{copy.journalPartsNote}</span>
    </div>
    <ol className="m-0 list-none p-0">
      {arm.sections.map((section, i) => {
        const cunSide = guide?.sides[section.id];
        const points = pointsInText(section.paragraphs.join('\n'), locale);
        const side = cunSide ? (
          <CunSidePanel glossaryHref={glossaryHref} side={cunSide} />
        ) : points.length > 0 ? (
          <div className="flex flex-col gap-2.5">
            <span className="cap">{copy.pointsCap}</span>
            <span className="flex flex-wrap gap-2.5">
              {points.map((point) => (
                <PointChip key={point.code} {...chipProps(point, r.point(point.code), copy)} />
              ))}
            </span>
          </div>
        ) : undefined;

        return (
          <PartRow
            heading={section.heading}
            id={section.id}
            key={section.id}
            n={i + 1}
            side={side}
            zh={english ? firstPhrase(zhArm.sections[i]?.heading) : undefined}>
            {section.paragraphs.map((paragraph) => (
              <p
                className="
                  m-0 text-[1.1rem] leading-[1.55]
                  md:text-[1.19rem]
                "
                key={paragraph}>
                {paragraph}
              </p>
            ))}
          </PartRow>
        );
      })}
    </ol>
  </section>
);
