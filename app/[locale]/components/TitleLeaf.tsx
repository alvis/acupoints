import Link from 'next/link';

import { cn } from '@/utilities/cn';

import { hanLang, homeHan, homeText } from './homeCopy';
import { SealProgress } from './SealProgress';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** Props for {@link TitleLeaf}. */
export type TitleLeafProps = {
  locale: Locale;
  leafHref: string;
  indexHref: string;
  sealsHref: string;
};

/**
 * Title leaf of the opening spread: the 經穴圖 cartouche, the promise, the
 * two ways to begin, and the reader's own seal count.
 * @param props edition and links to today’s leaf, the index, and the seal book
 * @param props.locale edition used for labels and links
 * @param props.leafHref destination of the elected point leaf
 * @param props.indexHref destination of the point index
 * @param props.sealsHref seals destination
 */
export const TitleLeaf: FC<TitleLeafProps> = ({ locale, leafHref, indexHref, sealsHref }) => {
  const t = homeText(locale);
  const han = homeHan(locale);
  const lang = hanLang(locale);
  const zh = locale !== 'en';

  return (
    <div
      className="
        relative flex flex-col
        md:p-8
        lg:border-r-[1.5px] lg:border-ink lg:px-11 lg:pt-[46px] lg:pb-10
      ">
      <div
        aria-hidden="true"
        className="
          absolute top-8 right-6 hidden items-start gap-3.5
          md:flex
          lg:top-10 lg:right-10
        ">
        <span className="tc vt red pt-2 text-base tracking-[0.3em]" lang={lang}>
          {han.bookSub}
        </span>
        <span
          className="
            tc vt r2 bg-paper px-3.5 py-5 text-[4.2rem] leading-none font-black
            tracking-[0.06em]
            xl:text-[5.75rem]
          "
          lang={lang}>
          {han.bookTitle}
        </span>
      </div>
      <span
        className={cn(
          `
            cap
            max-md:hidden
            md:max-w-[calc(100%-170px)]
            xl:max-w-[calc(100%-190px)]
          `,
          zh && 'tc',
        )}>
        {t.heroCap}
      </span>
      <h1
        className={cn(
          `
            m-0 max-w-[380px] leading-none font-medium tracking-[-0.01em]
            max-md:sr-only
            md:mt-3.5 md:max-w-[min(380px,calc(100%-170px))] md:text-[3.4rem]
            xl:max-w-[min(380px,calc(100%-190px))] xl:text-[4rem]
          `,
          zh && 'tc leading-[1.15]',
        )}
        id="home-title">
        {t.heroTitle}
      </h1>
      <p
        className={cn(
          `
            m-0 mt-5 max-w-[360px] text-lg/normal text-ink-soft
            max-md:hidden
            md:max-w-[min(360px,calc(100%-170px))]
            lg:mt-[22px] lg:text-xl
            xl:max-w-[min(360px,calc(100%-190px))]
          `,
          zh && 'tc',
        )}>
        {t.heroLede}
      </p>
      <span
        className="
          min-h-8 flex-1
          max-md:hidden
        "
      />
      <div
        className="
          flex flex-wrap gap-3
          max-md:hidden
        ">
        <Link className={cn('btn btn-primary no-underline', zh && 'tc')} href={leafHref}>
          {t.readToday}
        </Link>
        <Link className="btn btn-secondary no-underline" href={indexHref}>
          <span className="tc font-bold" lang={lang}>
            {han.shelf}
          </span>
          {zh ? null : ` ${t.openIndex}`}
        </Link>
      </div>
      <SealProgress
        className={cn(
          `
            mt-5
            max-md:hidden
            lg:mt-[22px]
          `,
          zh && 'tc',
        )}
        linkLabel={t.seeSeals}
        sealsHref={sealsHref}
        template={t.sealedOf}
      />
    </div>
  );
};
