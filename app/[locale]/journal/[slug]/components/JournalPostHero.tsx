import { Speakable } from '@/components/primitives/Speakable';
import { journalKindLabel, readingMinutes } from '@/features/learn/content';
import { fill } from '@/features/learn/fill';
import { cn } from '@/utilities/cn';
import { formatDate } from '@/utilities/i18n/date';
import { CUT_FILTER } from '@/utilities/illustrations/woodcut';
import { SITE } from '@/utilities/routes';

import { CunMeasure } from './CunMeasure';
import { DATE, LeadPlate } from './JournalPostDetails';
import { journalPostPresentation } from './journalPostPresentation';

import type { FC } from 'react';

import type { JournalPostView } from './JournalPostBody';

type JournalPostHeroProps = Pick<JournalPostView, 'locale' | 'slug' | 'post'>;

/**
 * introduce the journal article with its reading facts and illustration
 * @param props article identity
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.post authored article
 * @returns the article title, reading facts, and illustration
 */
export const JournalPostHero: FC<Readonly<JournalPostHeroProps>> = ({ locale, slug, post }) => {
  const { copy, r, english, han, arm, main, sub, tag, guide, lead, published } =
    journalPostPresentation({ locale, slug, post });

  return (
    <section
      className={cn(
        `
          mt-[34px] grid items-start gap-10
          lg:gap-12
        `,
        (guide ?? lead) && 'xl:grid-cols-[minmax(0,1fr)_692px]',
      )}>
      <div className="flex flex-col gap-[18px] pt-1.5">
        <span className="cap">
          <span aria-hidden="true" className="tc">
            {copy.journalHan}
          </span>{' '}
          · {fill(copy.journalKicker, { kind: journalKindLabel(slug, copy) })}
        </span>
        <h1
          className={cn(
            `
              m-0 flex flex-col gap-3.5 text-[2.5rem] leading-[1.04] font-medium
              tracking-[-0.01em]
              md:text-[3.75rem]
            `,
            !english && 'tc',
          )}>
          <span>{main}</span>
          {sub ? (
            <span
              className="
                flex items-baseline gap-3.5 text-2xl/tight font-normal
                tracking-normal
              ">
              {guide || tag ? (
                <span
                  aria-hidden="true"
                  className="tc text-[1.625rem] font-black not-italic">
                  {guide ? guide.heroHan : tag}
                </span>
              ) : null}
              <span className="sr-only">{english ? ': ' : '：'}</span>
              <span className={cn(english && 'italic')}>{sub}</span>
            </span>
          ) : null}
        </h1>
        <Speakable
          suppressJsonLd
          as="p"
          className="
            m-0 font-[inherit] text-lead/normal text-ink-soft not-italic
          ">
          {arm.summary}
        </Speakable>
        {guide ? (
          <blockquote
            className="
              my-1.5 py-0.5 pl-6 shadow-[inset_4px_0_0_var(--color-cinnabar)]
            ">
            <p
              className="
                m-0 text-[1.75rem] leading-[1.2] italic
                md:text-[2.125rem]
              ">
              “{guide.quote}”
            </p>
          </blockquote>
        ) : null}
        <div
          className="
            flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-rule
            pt-3.5 text-base text-ink-soft
          ">
          <span className="text-ink">{fill(copy.byline, { site: SITE.name })}</span>
          <time dateTime={published.toISOString()}>{formatDate(published, locale, DATE)}</time>
          <span>
            <span className="pm text-xs text-ink">
              {fill(copy.minutesCap, { min: readingMinutes(arm, locale) })}
            </span>{' '}
            {copy.readWord}
          </span>
          <span>
            {copy.reviewed}{' '}
            <time dateTime={post.lastReviewed.toISOString()}>
              {formatDate(post.lastReviewed, locale, DATE)}
            </time>
          </span>
        </div>
      </div>

      {guide ? (
        <CunMeasure
          cap={`${han('量')} · ${copy.measureCap}`}
          cutFilter={CUT_FILTER}
          groupLabel={copy.measureGroup}
          note={copy.measureNote}
          options={guide.options}
          tag={guide.figureTag}
        />
      ) : lead ? (
        <LeadPlate copy={copy} href={r.point(lead.code)} point={lead} />
      ) : null}
    </section>
  );
};
