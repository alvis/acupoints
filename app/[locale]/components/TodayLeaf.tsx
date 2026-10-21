import { PointFigure } from '@/components/composites/PointFigure';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { channelHanzi, fill, hanLang, homeHan, homeText } from './homeCopy';
import { TodayLeafDetails } from './TodayLeafDetails';
import { TodayLeafHeading } from './TodayLeafHeading';

import type { FC } from 'react';

import type { AlmanacEntry } from '@/utilities/almanac';
import type { Locale } from '@/utilities/routes';

import type { FeaturedLeaf } from './featuredLeaf';

/** Props for {@link TodayLeaf}. */
export type TodayLeafProps = {
  locale: Locale;
  leaf: FeaturedLeaf;
  almanac: AlmanacEntry;
  /** The leaf's own page. */
  leafHref: string;
};

/**
 * Today's leaf (今日一葉): the elected point's plate, name and its short ruled lines.
 * @param props edition, elected point, seasonal context, and leaf destination
 * @param props.locale edition used for labels and links
 * @param props.leaf elected point with its names, location, and leaf card
 * @param props.almanac elected point and seasonal context
 * @param props.leafHref leaf destination
 */
export const TodayLeaf: FC<TodayLeafProps> = ({ locale, leaf, almanac, leafHref }) => {
  const t = homeText(locale);
  const han = homeHan(locale);
  const lang = hanLang(locale);
  const en = locale === 'en';
  const hanzi = hanFor(leaf.hanzi, locale);
  const channelHan = leaf.meridian ? channelHanzi(leaf.meridian.hanzi, locale) : undefined;

  return (
    <article
      aria-labelledby="today-leaf-name"
      className="
        relative grid min-h-[230px] grid-cols-[100px_minmax(0,1fr)]
        grid-rows-[auto_1fr]
        md:min-h-0 md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-3 md:gap-y-3.5
        md:p-6
        lg:gap-x-2.5 lg:py-[26px] lg:pr-[30px] lg:pl-2.5
        xl:grid-cols-[210px_minmax(0,1fr)]
      ">
      <div
        className="
          relative row-span-2 overflow-hidden border-r-[1.5px] border-ink
          pt-[70px]
          md:overflow-visible md:border-r-0 md:pt-[60px]
        ">
        {channelHan ? (
          <span
            aria-hidden="true"
            className="
              tc vt absolute top-2 left-2 bg-paper px-0.5 py-1.5 text-xs
              font-bold shadow-[inset_0_0_0_1px_var(--color-ink)]
              md:top-0 md:left-1.5 md:px-[3px] md:py-2 md:text-sm
            "
            lang={lang}>
            {channelHan}
            {han.plateSuffix}
          </span>
        ) : null}
        <PointFigure
          channel={leaf.meridian?.slug}
          className="max-w-[210px]"
          code={leaf.code}
          label={fill(t.plateLabel, { name: en ? leaf.name : hanzi, code: leaf.code })}
          names={[{ code: leaf.code, text: hanzi }]}
        />
      </div>

      <TodayLeafHeading {...{ locale, leaf, almanac, leafHref }} />

      <TodayLeafDetails {...{ locale, leaf, almanac, leafHref }} />
    </article>
  );
};
