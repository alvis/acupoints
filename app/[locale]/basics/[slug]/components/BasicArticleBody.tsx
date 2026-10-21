import { QAOpener } from '@/components/composites/QAOpener';
import { FaqLeaf } from '@/features/learn/components/FaqLeaf';
import { LearnCrumbs } from '@/features/learn/components/LearnCrumbs';
import { ReviewFooter } from '@/features/learn/components/ReviewFooter';
import { SourceList } from '@/features/learn/components/SourceList';
import { learnTitle } from '@/features/learn/content';
import { FRAME } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';

import { BasicArticleHero } from './BasicArticleHero';
import { BasicArticleNavigation } from './BasicArticleNavigation';
import { basicArticlePresentation } from './basicArticlePresentation';
import { BasicArticleQuote } from './BasicArticleQuote';
import { BasicArticleReader } from './BasicArticleReader';

import type { FC } from 'react';

import type { BasicArticleView } from './basicArticlePresentation';

export type { BasicArticleView } from './basicArticlePresentation';

type BasicArticleBodyProps = Pick<BasicArticleView, 'locale' | 'slug' | 'ed' | 'prev' | 'next'>;

/**
 * render the basics article and its references
 * @param props article identity and neighboring entries
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.ed authored article
 * @param props.prev previous entry in reading order, when one exists
 * @param props.next following entry in reading order, when one exists
 * @returns the article with its reading tools and references
 */
export const BasicArticleBody: FC<Readonly<BasicArticleBodyProps>> = ({
  locale,
  slug,
  ed,
  prev,
  next,
}) => {
  const {
    copy,
    r,
    dict,
    labels,
    english,
    han,
    articleKey,
    crumbs,
    arm,
    full,
    short,
    parts,
    quote,
    quoteIndex,
    quoteSection,
    opener,
  } = basicArticlePresentation({ locale, slug, ed });

  return (
    <div className={cn(FRAME, `pb-20`)}>
      <LearnCrumbs items={crumbs} label={copy.breadcrumb} />

      <article data-pagefind-body>
        <BasicArticleHero {...{ locale, slug, ed }} />

        {opener ? (
          <QAOpener
            answer={opener.answer}
            className="mt-10"
            followThrough={opener.followThrough}
            question={opener.question}
          />
        ) : null}

        <BasicArticleQuote
          {...{ quote, quoteSection, slug, han, english, copy, quoteIndex, locale }}
        />

        <BasicArticleReader {...{ copy, english, full, locale, parts, han, short, slug, arm }} />

        <BasicArticleNavigation {...{ copy, prev, locale, english, next }} />

        <p
          className="
            mt-[30px] max-w-[980px] text-[0.95rem] leading-normal text-ink-soft
          ">
          <span className="cap mr-2.5">
            <span aria-hidden="true" className="tc">
              {han('限')}
            </span>{' '}
            · {dict.disclaimers.selfCareTitle}
          </span>
          {arm.selfCareLimits} {dict.disclaimers.selfCareNotice}
        </p>

        <div className="mt-14 flex flex-col gap-12">
          <FaqLeaf faqs={arm.faqs} heading={dict.faqHeading} mark={han('問')} />
          <SourceList
            heading={copy.sources}
            mark={han('據')}
            sourceLang={english ? undefined : 'en'}
            sources={ed.sources}
          />
          <ReviewFooter
            citeLabel={labels.cite.text}
            citeTitle={learnTitle(articleKey, ed.title, locale)}
            className="border-t-[2.5px] border-ink pt-4"
            locale={locale}
            pagePath={r.basic(slug)}
            reviewed={ed.lastReviewed}
            template={copy.lastReviewed}
          />
        </div>
      </article>
    </div>
  );
};
