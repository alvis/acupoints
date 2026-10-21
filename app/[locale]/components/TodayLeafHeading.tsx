import { cn } from '@/utilities/cn';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { channelHanzi, fill, hanLang, homeHan, homeText, ordinal } from './homeCopy';
import { trailingDigits } from './homeNameParts';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { FeaturedLeaf } from './featuredLeaf';
import type { TodayLeafProps } from './TodayLeaf';

/**
 * localized name and channel caption beside the elected plate.
 * @param props edition and elected point whose name and channel are printed
 * @param props.locale edition used for labels and links
 * @param props.leaf elected point and its registry labels
 */
export const TodayLeafHeading: FC<TodayLeafProps> = ({ locale, leaf }) => {
  const t = homeText(locale);
  const han = homeHan(locale);
  const lang = hanLang(locale);
  const en = locale === 'en';
  const hanzi = hanFor(leaf.hanzi, locale);
  const channelHan = leaf.meridian ? channelHanzi(leaf.meridian.hanzi, locale) : undefined;
  const channelLine = channelLineOf(locale, leaf, channelHan);

  return (
    <div
      className="
        col-start-2 flex min-w-0 flex-col gap-3.5 px-3.5 pt-3.5
        md:px-0 md:pt-1.5
      ">
      <span
        className="
          cap
          max-md:hidden
        ">
        {en ? (
          <>
            <span className="tc" lang={lang}>
              {han.stripToday}
            </span>{' '}
            · {t.todayCap}
          </>
        ) : (
          <span className="tc">{t.todayCap}</span>
        )}
      </span>
      <div
        className="
          flex flex-col gap-1.5
          md:flex-row md:items-stretch md:gap-4
        ">
        <span
          aria-hidden="true"
          className="
            tc text-[2.125rem] leading-none font-black
            md:border-l-[1.5px] md:border-ink md:pl-2.5 md:text-[2.75rem]
            md:tracking-[0.06em] md:[text-orientation:upright]
            md:[writing-mode:vertical-rl]
          "
          lang={lang}>
          {hanzi}
        </span>
        <div className="flex min-w-0 flex-col justify-center gap-1.5">
          <h2
            className={cn(
              `
                m-0 text-[1.375rem] leading-[1.1] font-medium
                md:text-[2.5rem] md:leading-none
              `,
              !en && 'tc',
            )}
            id="today-leaf-name">
            {en ? leaf.name : hanzi}
            <span
              aria-hidden="true"
              className="
                pm text-[0.7rem] font-normal text-ink-micro
                md:hidden
              ">
              {' '}
              {leaf.code}
            </span>
            <span className="sr-only">
              {' '}
              ({leaf.code}){en ? `, ${hanzi}` : `, ${leaf.name}`}
            </span>
          </h2>
          <span
            aria-hidden="true"
            className="
              text-lg text-ink-soft italic
              max-md:hidden
            ">
            {en
              ? leaf.card
                ? `“${leaf.card.gloss}” · ${leaf.code}`
                : leaf.code
              : `${leaf.name} · ${leaf.code}`}
          </span>
          <span
            className="
              pm text-[0.7rem] text-ink-micro
              max-md:hidden
            ">
            {channelLine}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * The mono line under the name: the channel and the point's place on it
 * ("Large Intestine · 4th of 20"), or just the channel's size when the code
 * carries no number.
 * @param locale edition used for labels and links
 * @param leaf elected point with its names, location, and leaf card
 * @param channelHan channel name in the edition’s Han script
 * @returns the channel name with the point’s ordinal and channel size when available
 */
function channelLineOf(locale: Locale, leaf: FeaturedLeaf, channelHan?: string): string {
  const t = homeText(locale);
  const meridian = locale === 'en' ? leaf.meridian?.name : channelHan;
  const count = leaf.meridian?.pointCount;
  if (!meridian || !count) {
    return leaf.meridianLabel;
  }
  const n = Number(trailingDigits(leaf.code) || Number.NaN);
  if (Number.isNaN(n)) {
    return fill(t.channelOnly, { meridian, count });
  }

  return fill(t.channelLine, { meridian, n, nth: ordinal(n), count });
}
