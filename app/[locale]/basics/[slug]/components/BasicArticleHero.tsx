import { Speakable } from '@/components/primitives/Speakable';
import { Cartouche } from '@/features/learn/components/Cartouche';
import { learnTitle } from '@/features/learn/content';
import { countWord } from '@/features/learn/copy';
import { fill } from '@/features/learn/fill';
import { cn } from '@/utilities/cn';

import { ReviewedText, emblemCaption, emblemLabel } from './BasicArticleDetails';
import { basicArticlePresentation } from './basicArticlePresentation';
import { BasicsEmblem } from './BasicsEmblem';
import { ReadSeal } from './ReadSeal';

import type { FC } from 'react';

import type { BasicArticleView } from './BasicArticleBody';

type BasicArticleHeroProps = Pick<BasicArticleView, 'locale' | 'slug' | 'ed'>;

/**
 * introduce the basics article with its reading facts and illustration
 * @param props article identity
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.ed authored article
 * @returns the article title, reading facts, and illustration
 */
export const BasicArticleHero: FC<Readonly<BasicArticleHeroProps>> = ({ locale, slug, ed }) => {
  const { copy, seeded, english, han, zh, articleKey, total, n, arm, full, short, parts } =
    basicArticlePresentation({ locale, slug, ed });

  return (
    <section
      className="
        mt-[34px] grid items-start gap-10
        lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14
      ">
      <div className="flex items-start gap-[30px]">
        <Cartouche upright zh={zh} />
        <div className="flex flex-col gap-4 pt-2">
          <span className="cap">
            <span aria-hidden="true" className="tc">
              {copy.basicsHan}
            </span>{' '}
            ·{' '}
            {fill(copy.basicsKicker, {
              n: countWord(n, locale),
              total: countWord(total, locale),
            })}
          </span>
          <h1
            className={cn(
              `
                m-0 text-[2.75rem] leading-none font-medium tracking-[-0.01em]
                md:text-[4.75rem]
              `,
              !english && 'tc',
            )}>
            {learnTitle(articleKey, ed.title, locale)}
          </h1>
          <Speakable
            as="p"
            className="
              m-0 max-w-[600px] font-[inherit] text-[1.2rem] leading-normal
              text-ink-soft not-italic
              md:text-[1.3rem]
            "
            suppressJsonLd={!seeded}>
            {arm.summary}
          </Speakable>
          <div
            className="
              flex flex-wrap items-center gap-x-[22px] gap-y-2 text-base
              text-ink-soft
            ">
            <span>
              <span className="pm text-xs text-ink">{fill(copy.minutesCap, { min: full })}</span>{' '}
              {copy.fullMeta} ·{' '}
              <span className="pm text-xs text-ink">{fill(copy.minutesCap, { min: short })}</span>{' '}
              {copy.shortMeta}
            </span>
            <span>{fill(copy.partsCount, { n: countWord(parts, locale, true) })}</span>
            <ReviewedText locale={locale} reviewed={ed.lastReviewed} template={copy.lastReviewed} />
            <ReadSeal bottom={han('讀')} label={copy.sealedLabel} slug={slug} top={han('已')} />
          </div>
        </div>
      </div>
      <figure className="m-0 flex flex-col items-center gap-3">
        <BasicsEmblem
          className="h-auto w-full max-w-[300px]"
          label={emblemLabel(slug, copy)}
          qiGlyph={han('氣')}
          slug={slug}
        />
        <figcaption
          className="
            max-w-[340px] text-center text-base leading-[1.45] text-ink-soft
          ">
          <span className="tc font-bold text-ink">{zh}</span> · {emblemCaption(slug, copy)}
        </figcaption>
      </figure>
    </section>
  );
};
