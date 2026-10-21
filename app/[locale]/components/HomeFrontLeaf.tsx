import { getAlmanacEntry } from '@/utilities/almanac';
import { localizedRoutes } from '@/utilities/routes';

import { ChannelsSection } from './ChannelsSection';
import { resolveFeaturedLeaf } from './featuredLeaf';
import { HeroSpread } from './HeroSpread';
import { shelfVolumes, wayConditions, wayRegions } from './homeData';
import { LeafLegend } from './LeafLegend';
import { MobileTabBar } from './MobileTabBar';
import { WaysIn } from './WaysIn';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link HomeFrontLeaf}. */
export type HomeFrontLeafProps = {
  locale: Locale;
};

/**
 * The front leaf of the book, after the Woodblock Chart (版刻) boards: the
 * opening spread with today's leaf, the fourteen channels as volumes, three
 * ways in (by region, by feeling, by the reader's own reading days) and the legend for
 * reading a leaf, with the phone's bottom tab bar. Every fact comes from the content registries; the almanac
 * elects today's point at build time.
 * @param props edition used to assemble the home-page spread
 * @param props.locale edition used for labels and links
 */
export const HomeFrontLeaf: FC<HomeFrontLeafProps> = async ({ locale }) => {
  const r = localizedRoutes(locale);
  const almanac = getAlmanacEntry(new Date());
  const leaf = await resolveFeaturedLeaf(almanac, locale);

  return (
    <div
      className="
        mx-auto max-w-[1440px] px-4
        sm:px-8
        md:pb-16
        lg:px-20 lg:pb-[88px]
      ">
      <HeroSpread
        almanac={almanac}
        indexHref={r.points}
        leaf={leaf}
        leafHref={r.point(leaf.code)}
        locale={locale}
        sealsHref={r.seals}
      />
      <ChannelsSection locale={locale} volumes={shelfVolumes(locale)} />
      <WaysIn
        conditions={wayConditions(locale)}
        conditionsHref={r.conditions}
        locale={locale}
        regions={wayRegions(locale)}
        regionsHref={r.regions}
      />
      <LeafLegend locale={locale} />
      <MobileTabBar locale={locale} />
    </div>
  );
};
