import Link from 'next/link';

import { CarvedBody } from '@/components/primitives/CarvedBody';
import { cn } from '@/utilities/cn';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { CardCap } from './CardCap';
import { hanLang, homeHan, homeText } from './homeCopy';

import type { FC } from 'react';

import type { RegionSlug } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

import type { WayRegion } from './homeData';

/** Props for {@link RegionCard}. */
export type RegionCardProps = {
  locale: Locale;
  regions: readonly WayRegion[];
  /** Regions index. */
  regionsHref: string;
};

/** Where a label sits on the 330px stage, and how long its leader runs, after the board. */
type RegionPlace = { side: 'left' | 'right'; top: string; leader: string };

/**
 * Label placements copied from the board: px from the top of the stage and
 * the leader length, as static classes so Tailwind can see them.
 */
const REGION_PLACES: Readonly<Partial<Record<RegionSlug, RegionPlace>>> = {
  head: { side: 'left', top: 'top-[18px]', leader: 'w-[72px]' },
  chest: { side: 'left', top: 'top-[76px]', leader: 'w-[76px]' },
  hand: { side: 'left', top: 'top-[182px]', leader: 'w-[84px]' },
  shoulder: { side: 'right', top: 'top-[48px]', leader: 'w-[56px]' },
  leg: { side: 'right', top: 'top-[236px]', leader: 'w-[66px]' },
  foot: { side: 'right', top: 'top-[300px]', leader: 'w-[74px]' },
};

/**
 * 按部 — "Point at the body": region labels with hairline leaders around a
 * small carved figure; a plain two-column list on phones.
 * @param props edition, body-region links, and region-index destination
 * @param props.locale edition used for labels and links
 * @param props.regions body regions and their localized links
 * @param props.regionsHref regions destination
 * @returns the body-region figure and links, with a compact list on phones
 */
export const RegionCard: FC<RegionCardProps> = ({ locale, regions, regionsHref }) => {
  const t = homeText(locale);
  const han = homeHan(locale);

  return (
    <div
      className="
        flex flex-col gap-2.5 p-6 shadow-rest
        lg:min-h-[420px] lg:px-7 lg:py-[26px]
      ">
      <CardCap en={t.regionCap} locale={locale} zh={han.byRegion} />
      <h3
        className={cn(
          'm-0 text-[1.75rem] leading-tight font-medium',
          locale !== 'en' &&
            `tc`,
        )}>
        {t.regionTitle}
      </h3>

      <div
        className="
          relative mx-auto hidden h-[330px] w-full max-w-[420px]
          md:block
        ">
        <svg
          aria-hidden="true"
          className="absolute top-1 left-1/2 -translate-x-1/2"
          focusable="false"
          height="320"
          viewBox="0 0 300 640"
          width="150">
          <CarvedBody strokeWidth={2.6} />
        </svg>
        <ul className="m-0 list-none p-0">
          {regions.map((region) => {
            const place = REGION_PLACES[region.slug];
            if (!place) {
              return null;
            }
            const left = place.side === 'left';

            return (
              <li
                className={cn('absolute', place.top, left ? 'left-0' : 'right-0')}
                key={region.slug}>
                <Link
                  className={cn(
                    `wb-link flex items-center gap-1.5 text-base text-ink`,
                    !left && 'flex-row-reverse',
                  )}
                  href={region.href}>
                  <RegionLabel locale={locale} region={region} />
                  <span aria-hidden="true" className={cn('h-px bg-ink', place.leader)} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <ul
        className="
          m-0 grid list-none grid-cols-2 gap-x-4 p-0
          md:hidden
        ">
        {regions.map((region) => (
          <li className="border-b border-rule" key={region.slug}>
            <Link
              className="
                flex min-h-11 items-center gap-2 text-base text-ink no-underline
              "
              href={region.href}>
              <RegionLabel locale={locale} region={region} />
            </Link>
          </li>
        ))}
      </ul>

      <Link
        className={cn(`wb-link mt-auto pt-3 text-base text-ink underline`, locale !== 'en' && `
          tc
        `)}
        href={regionsHref}>
        {t.allRegions}
      </Link>
    </div>
  );
};

/** Props for the private {@link RegionLabel}. */
type RegionLabelProps = { locale: Locale; region: WayRegion };

/**
 * A region's Han name, then its English name on English pages.
 * @param props edition and body region to name
 * @param props.locale edition used for labels and links
 * @param props.region body region whose Han and English names are printed
 */
const RegionLabel: FC<RegionLabelProps> = ({ locale, region }) => (
  <>
    {region.hanzi ? (
      <span className="tc font-bold" lang={hanLang(locale)}>
        {hanFor(region.hanzi, locale)}
      </span>
    ) : null}
    {locale === 'en' || !region.hanzi ? <span>{region.name}</span> : null}
  </>
);
