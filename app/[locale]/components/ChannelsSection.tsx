import { cn } from '@/utilities/cn';

import { ChannelShelf } from './ChannelShelf';
import { hanLang, homeHan, homeText } from './homeCopy';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { ShelfVolume } from './ChannelShelf';

/** Props for {@link ChannelsSection}. */
export type ChannelsSectionProps = {
  locale: Locale;
  volumes: readonly ShelfVolume[];
};

/**
 * 目錄 — the fourteen channels as volumes on a shelf. Desktop sets the Han
 * word beside "The fourteen channels" with the shelf note; the phone board
 * names it 書架 "Your shelf" in a small heading over a sideways shelf. One
 * h2 serves both, its words swapped by breakpoint.
 * @param props edition and channel volumes to place on the shelf
 * @param props.locale edition used for labels and links
 * @param props.volumes channel volumes in shelf order
 */
export const ChannelsSection: FC<ChannelsSectionProps> = ({ locale, volumes }) => {
  const t = homeText(locale);
  const han = homeHan(locale);
  const lang = hanLang(locale);
  const zh = locale !== 'en';

  return (
    <section
      aria-labelledby="channels-title"
      className="
        mt-6
        md:mt-16
        lg:mt-[88px]
      ">
      <div
        className="
          mb-2 flex flex-wrap items-baseline gap-x-5 gap-y-1
          md:mb-[22px]
        ">
        <span
          aria-hidden="true"
          className="
            tc text-[2rem] leading-none font-black
            max-md:hidden
            lg:text-[2.125rem]
          "
          lang={lang}>
          {han.shelf}
        </span>
        <h2
          className="
            m-0 text-lg/tight font-semibold
            md:text-[2rem] md:font-medium md:tracking-[-0.005em]
          "
          id="channels-title">
          <span className="md:hidden">
            <span className="tc font-bold" lang={lang}>
              {han.shelfShort}
            </span>
            {t.shelfShort ? ` ${t.shelfShort}` : null}
          </span>
          <span className={cn('max-md:hidden', zh && 'tc')}>{t.shelfTitle}</span>
        </h2>
        <p
          className={cn(
            `
              m-0 text-[1.05rem] text-ink-soft
              max-md:hidden
              md:ml-auto
            `,
            zh && 'tc',
          )}>
          {t.shelfAside}
        </p>
      </div>
      <ChannelShelf
        completeBottom={han.completeBottom}
        completeLabel={t.spineComplete}
        completeTop={han.completeTop}
        hanLang={lang}
        spineLabel={t.spineLabel}
        volumeWord={han.volume}
        volumes={volumes}
      />
    </section>
  );
};
