import { NumberDisc } from '@/components/primitives/NumberDisc';
import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { cn } from '@/utilities/cn';

import { PART } from './BasicArticleDetails';
import { BasicsReader } from './BasicsReader';

import type { FC } from 'react';

import type { EditorialArm } from '@/content/editorial/schema';
import type { LearnCopy } from '@/features/learn/copy';
import type { Locale } from '@/utilities/routes';

type BasicArticleReaderProps = {
  locale: Locale;
  slug: string;
  copy: LearnCopy;
  english: boolean;
  han: (text: string) => string;
  arm: EditorialArm;
  full: number;
  short: number;
  parts: number;
};

/**
 * set the article parts beneath the reading toolbar
 * @param props numbered article parts and reading-length controls
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.copy localized interface text
 * @param props.english whether this edition is English
 * @param props.han converter for Han text in the page script
 * @param props.arm localized article prose
 * @param props.full full reading time in minutes
 * @param props.short short reading time in minutes
 * @param props.parts number of article sections
 * @returns the numbered article parts and reading-length controls
 */
export const BasicArticleReader: FC<Readonly<BasicArticleReaderProps>> = ({
  locale,
  slug,
  copy,
  english,
  han,
  arm,
  full,
  short,
  parts,
}) => (
  <BasicsReader
    fullLabel={copy.fullButton}
    fullNote={fill(copy.modeFullNote, { min: english ? countWord(full, locale) : full })}
    han={`${countWord(parts, 'zh-hant')}${han('節')}`}
    heading={fill(copy.partsHeading, { n: countWord(parts, locale) })}
    headingId="parts"
    lengthLabel={copy.lengthGroup}
    markLabel={copy.markRead}
    markedLabel={copy.markedRead}
    sealBottom={han('讀')}
    sealTop={han('已')}
    shortLabel={fill(copy.shortButton, { min: short })}
    shortNote={fill(copy.modeShortNote, {
      min: english ? countWord(short, locale, true) : short,
    })}
    slug={slug}>
    <ol
      className="
        m-0 mt-7 grid list-none gap-7 p-0
        md:grid-cols-2
        xl:grid-cols-3
      ">
      {arm.sections.map((section, i) => {
        const last = i === parts - 1;

        return (
          <li className={cn(PART, last ? 'r2-red' : 'r1')} key={section.id}>
            <span className="flex items-center gap-3">
              <NumberDisc n={i + 1} size={40} />
              <span aria-hidden="true" className="lead" />
              <span className="cap">{fill(copy.partOf, { i: i + 1, n: parts })}</span>
            </span>
            <h3
              className="
                m-0 scroll-mt-6 text-[1.5rem] leading-[1.15] font-medium
                md:text-[1.7rem]
              "
              id={section.id}>
              {section.heading}
            </h3>
            {section.paragraphs.map((paragraph, p) => (
              <p
                className={cn(
                  'm-0 text-[1.03rem] leading-[1.52]',
                  p > 0 && 'group-data-[mode=short]/reader:hidden',
                )}
                key={paragraph}>
                {paragraph}
              </p>
            ))}
          </li>
        );
      })}
    </ol>
  </BasicsReader>
);
