import { FishTail } from '@/components/primitives/FishTail';
import { cn } from '@/utilities/cn';

import { fill, hanLang, homeHan, homeText, termHanFor } from './homeCopy';
import { SealCount } from './SealCount';
import { TitleLeaf } from './TitleLeaf';
import { TodayLeaf } from './TodayLeaf';

import type { FC } from 'react';

import type { AlmanacEntry } from '@/utilities/almanac';
import type { Locale } from '@/utilities/routes';

import type { FeaturedLeaf } from './featuredLeaf';

/** Props for {@link HeroSpread}. */
export type HeroSpreadProps = {
  locale: Locale;
  leaf: FeaturedLeaf;
  almanac: AlmanacEntry;
  /** Today's leaf page. */
  leafHref: string;
  /** Index of all leaves. */
  indexHref: string;
  /** My seals. */
  sealsHref: string;
};

/**
 * The opening spread: a title leaf ("an illustrated book, cut for the web")
 * and today's leaf, joined by the fish-tail centre strip (版心) inside one
 * carved frame. Side by side from `lg`; stacked below it, with the strip
 * laid flat between the two leaves.
 * @param props edition, elected leaf, seasonal context, and opening destinations
 * @param props.locale edition used for labels and links
 * @param props.leaf elected point with its names, location, and leaf card
 * @param props.almanac elected point and seasonal context
 * @param props.leafHref destination of the elected point leaf
 * @param props.indexHref destination of the point index
 * @param props.sealsHref seals destination
 */
export const HeroSpread: FC<HeroSpreadProps> = ({
  locale,
  leaf,
  almanac,
  leafHref,
  indexHref,
  sealsHref,
}) => {
  const t = homeText(locale);
  const lang = hanLang(locale);
  const zh = locale !== 'en';

  return (
    <section
      aria-labelledby="home-title"
      className="
        pt-4
        md:pt-10
      ">
      <div
        className="
          flex items-baseline justify-between gap-6 pb-2.5
          md:items-end md:px-2.5
        ">
        <p
          className={cn(
            `
              m-0 text-[1.625rem] leading-tight font-medium
              md:hidden
            `,
            zh && `tc`,
          )}>
          {t.todayCap}
        </p>
        <p
          className={cn(
            `
              red m-0 text-[0.95rem] italic
              max-md:hidden
            `,
            zh && `tc`,
          )}>
          {t.marginNote}
        </p>
        <p
          className="
            m-0 text-right text-[0.95rem] text-ink-soft
            max-md:font-mono max-md:text-[0.68rem] max-md:tracking-[0.08em]
            max-md:uppercase
          ">
          {locale === 'en' ? `${almanac.solarTerm.latin} ` : null}
          <span className="tc" lang={lang}>
            {termHanFor(almanac.solarTerm.cjk, locale)}
          </span>
          {leaf.leafNumber ? (
            <span className={cn('max-md:hidden', zh && 'tc')}>
              {' · '}
              {fill(t.leafOf, { n: leaf.leafNumber })}
            </span>
          ) : null}
        </p>
      </div>

      <div
        className="
          blk m-1.5 grid
          lg:min-h-[700px] lg:grid-cols-[minmax(0,1fr)_58px_minmax(0,1fr)]
        ">
        <TitleLeaf
          indexHref={indexHref}
          leafHref={leafHref}
          locale={locale}
          sealsHref={sealsHref}
        />
        <CentreStrip locale={locale} />
        <TodayLeaf almanac={almanac} leaf={leaf} leafHref={leafHref} locale={locale} />
      </div>

      <SealCount
        className={cn(
          `
            mt-4
            md:hidden
          `,
          zh && 'tc',
        )}
        sealsHref={sealsHref}
        template={t.sealedShort}
      />
    </section>
  );
};

/** Props for the private {@link CentreStrip}. */
type CentreStripProps = { locale: Locale };

/**
 * 版心: the fish-tail centre strip naming the book and the leaf.
 * @param props edition used to label the fish-tail strip
 * @param props.locale edition used for labels and links
 */
const CentreStrip: FC<CentreStripProps> = ({ locale }) => {
  const han = homeHan(locale);
  const lang = hanLang(locale);

  return (
    <div
      aria-hidden="true"
      className="
        flex items-center justify-center gap-3 border-y-[1.5px] border-ink px-4
        py-2.5
        max-md:hidden
        lg:flex-col lg:border-y-0 lg:border-r-[1.5px] lg:px-0 lg:py-3
      ">
      <span
        className="
          hidden h-10 w-1.5 bg-ink
          lg:block
        "
      />
      <FishTail width={28} />
      <span
        className="
          tc text-base font-bold tracking-[0.2em]
          lg:[text-orientation:upright] lg:[writing-mode:vertical-rl]
        "
        lang={lang}>
        {han.stripHead}
      </span>
      <span className="flex-1" />
      <span
        className="
          tc text-sm tracking-[0.2em]
          lg:[text-orientation:upright] lg:[writing-mode:vertical-rl]
        "
        lang={lang}>
        {han.stripToday}
      </span>
      <FishTail up width={28} />
      <span className="tc text-base font-bold" lang={lang}>
        {han.stripLeaf}
      </span>
    </div>
  );
};
