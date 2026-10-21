import { FishTail } from '@/components/primitives/FishTail';
import { MarginNote } from '@/components/primitives/MarginNote';
import { Seal } from '@/components/primitives/Seal';
import { SectionHead } from '@/components/primitives/SectionHead';
import { cn } from '@/utilities/cn';
import { hanNumeral } from '@/utilities/hanNumeral';

import { hanLang, homeHan, homeText } from './homeCopy';

import type { FC, ReactNode } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link LeafLegend}. */
export type LeafLegendProps = {
  locale: Locale;
};

/** One device in the legend: its caption, how it looks, and what it means. */
type LegendDevice = { key: string; cap: string; demo: ReactNode; text: string };

/** The red-note demo's two lines per locale, built once so JSX never holds an array literal. */
const RED_NOTE_LINES: Readonly<Record<Locale, [string, string]>> = {
  'en': redLines('en'),
  'zh-hant': redLines('zh-hant'),
  'zh-cn': redLines('zh-cn'),
};

/**
 * 凡例 — "How to read a leaf": the five devices every leaf uses (main text,
 * red notes, margin notes, fish tails, seals), each shown as it appears.
 * Five across on wide screens, two then one as the page narrows.
 * @param props edition used for legend explanations and demonstrations
 * @param props.locale edition used for labels and links
 */
export const LeafLegend: FC<LeafLegendProps> = ({ locale }) => {
  const t = homeText(locale);
  const han = homeHan(locale);
  const lang = hanLang(locale);
  const zh = locale !== 'en';
  const devices = legendDevices(locale);

  return (
    <section
      aria-labelledby="legend-title"
      className="
        mt-16
        lg:mt-[88px]
      ">
      <SectionHead
        className="mb-5"
        id="legend-title"
        title={<span className={cn(zh && 'tc')}>{t.legendTitle}</span>}
        zh={han.legend}
      />
      <ol
        className="
          m-0 grid list-none border-t-[2.5px] border-b border-ink p-0
          sm:grid-cols-2
          lg:grid-cols-5
        ">
        {devices.map((d, i) => (
          <li
            className="
              flex flex-col gap-3 border-rule px-5 pt-5 pb-6
              not-last:border-b
              sm:not-last:border-b-0
              sm:odd:border-r
              lg:border-r lg:px-[22px] lg:pt-[22px]
              lg:last:border-r-0
            "
            key={d.key}>
            <h3 className="cap m-0">
              <span className="tc" lang={lang}>
                {hanNumeral(i + 1)}
              </span>{' '}
              · <span className={cn(zh && 'tc')}>{d.cap}</span>
            </h3>
            {d.demo}
            <p className={cn('m-0 text-base leading-[1.45]', zh && 'tc')}>{d.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

/**
 * The five legend devices for a locale, each with its live demo.
 * @param locale edition used for labels and links
 * @returns the five legend explanations paired with their live demonstrations
 */
function legendDevices(locale: Locale): LegendDevice[] {
  const t = homeText(locale);
  const han = homeHan(locale);
  const lang = hanLang(locale);
  const zh = locale !== 'en';

  return [
    {
      key: 'main',
      cap: t.legendMainCap,
      demo: (
        <div
          className={cn(
            'ruled h-[102px] overflow-hidden text-base',
            zh &&
              `tc`,
          )}>
          {t.legendMainDemo.split(' | ').map((line) => {
            const [label, ...rest] = line.split(' ');

            return (
              <span className="block" key={line}>
                <b>{label}</b> {rest.join(' ')}
              </span>
            );
          })}
        </div>
      ),
      text: t.legendMainText,
    },
    {
      key: 'red',
      cap: t.legendRedCap,
      demo: (
        <span className={cn('flex h-[102px] items-center text-lg', zh && 'tc')}>
          <span>
            {t.legendRedBefore}
            <MarginNote className="text-[0.8rem]" lines={RED_NOTE_LINES[locale]} />
            {t.legendRedAfter}
          </span>
        </span>
      ),
      text: t.legendRedText,
    },
    {
      key: 'margin',
      cap: t.legendMarginCap,
      demo: (
        <span
          className={cn(
            'red flex h-[102px] items-center text-lg italic',
            zh &&
              `tc`,
          )}>
          {t.legendMarginDemo}
        </span>
      ),
      text: t.legendMarginText,
    },
    {
      key: 'fish',
      cap: t.legendFishCap,
      demo: (
        <span aria-hidden="true" className="flex h-[102px] items-center gap-2.5">
          <FishTail />
          <span className="tc text-lg font-bold" lang={lang}>
            {han.fishDemo}
          </span>
        </span>
      ),
      text: t.legendFishText,
    },
    {
      key: 'seal',
      cap: t.legendSealCap,
      demo: (
        <span className="flex h-[102px] items-center">
          <span className="inline-flex -rotate-6">
            <Seal bottom="谷" label={t.legendSealLabel} size={64} top="合" />
          </span>
        </span>
      ),
      text: t.legendSealText,
    },
  ];
}

/**
 * The red-note demo's two lines for a locale.
 * @param locale edition used for labels and links
 * @returns the two localized lines of the red-note demonstration
 */
function redLines(locale: Locale): [string, string] {
  const t = homeText(locale);

  return [t.legendRedA, t.legendRedB];
}
