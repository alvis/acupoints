import { CardCap } from './CardCap';
import { ConditionCard } from './ConditionCard';
import { hanLang, homeHan, homeText } from './homeCopy';
import { RegionCard } from './RegionCard';
import { StreakCalendar } from './StreakCalendar';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { WayCondition, WayRegion } from './homeData';
import type { StreakCalendarText } from './StreakCalendar';

/** Props for {@link WaysIn}. */
export type WaysInProps = {
  locale: Locale;
  regions: readonly WayRegion[];
  conditions: readonly WayCondition[];
  regionsHref: string;
  conditionsHref: string;
};

/**
 * Three ways into the book: by where it is (按部), by what you feel (按症)
 * and by the day (按日), the last being the reader's own reading calendar
 * and streak. Three ruled cards side by side from `lg`; on phones the
 * "Feeling…" chips come first, straight under the shelf, as the mobile
 * board has them.
 * @param props edition, region and condition links, and index destinations
 * @param props.locale edition used for labels and links
 * @param props.regions body regions and their localized links
 * @param props.conditions condition links and their point counts
 * @param props.regionsHref destination of the body region index
 * @param props.conditionsHref conditions destination
 */
export const WaysIn: FC<WaysInProps> = ({
  locale,
  regions,
  conditions,
  regionsHref,
  conditionsHref,
}) => {
  const t = homeText(locale);
  const han = homeHan(locale);
  const streakText: StreakCalendarText = {
    none: t.streakNone,
    one: t.streakOne,
    many: t.streakMany,
    lede: t.streakLede,
    label: t.streakLabel,
    stamp: han.dayStamp,
  };

  return (
    <section
      aria-labelledby="ways-in-title"
      className="
        mt-6
        md:mt-16
        lg:mt-[88px]
      ">
      <h2 className="sr-only" id="ways-in-title">
        {t.waysTitle}
      </h2>
      <div
        className="
          grid grid-cols-1 gap-7
          lg:grid-cols-3
        ">
        <RegionCard locale={locale} regions={regions} regionsHref={regionsHref} />
        <ConditionCard
          className="max-md:order-first"
          conditions={conditions}
          conditionsHref={conditionsHref}
          locale={locale}
        />
        <div
          className="
            flex flex-col gap-2.5 p-6 shadow-rest
            lg:px-7 lg:py-[26px]
          ">
          <CardCap en={t.dayCap} locale={locale} zh={han.byDay} />
          <StreakCalendar hanLang={hanLang(locale)} locale={locale} text={streakText} />
        </div>
      </div>
    </section>
  );
};
