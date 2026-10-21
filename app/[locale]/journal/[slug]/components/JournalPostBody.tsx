import { FaqLeaf } from '@/features/learn/components/FaqLeaf';
import { LearnCrumbs } from '@/features/learn/components/LearnCrumbs';
import { ReviewFooter } from '@/features/learn/components/ReviewFooter';
import { SourceList } from '@/features/learn/components/SourceList';
import { FRAME } from '@/features/learn/layout';
import { cn } from '@/utilities/cn';

import { JournalPostCare } from './JournalPostCare';
import { chipProps } from './JournalPostDetails';
import { JournalPostHero } from './JournalPostHero';
import { JournalPostNavigation } from './JournalPostNavigation';
import { JournalPostParts } from './JournalPostParts';
import { journalPostPresentation } from './journalPostPresentation';
import { PointChip } from './PointChip';

import type { FC } from 'react';

import type { JournalPostView } from './journalPostPresentation';

export type { JournalPostView } from './journalPostPresentation';

type JournalPostBodyProps = Pick<JournalPostView, 'locale' | 'slug' | 'post' | 'older' | 'newer'>;

/**
 * render the journal article and its references
 * @param props article identity and neighboring entries
 * @param props.locale page language and writing system
 * @param props.slug entry URL segment
 * @param props.post authored article
 * @param props.older adjacent article
 * @param props.newer adjacent article
 * @returns the article with its reading tools and references
 */
export const JournalPostBody: FC<Readonly<JournalPostBodyProps>> = ({
  locale,
  slug,
  post,
  older,
  newer,
}) => {
  const {
    copy,
    r,
    dict,
    labels,
    english,
    han,
    arm,
    zhArm,
    title,
    guide,
    named,
    parts,
    pagePath,
    glossaryHref,
    st36,
    crumbs,
  } = journalPostPresentation({ locale, slug, post });

  return (
    <div className={cn(FRAME, `pb-20`)}>
      <LearnCrumbs items={crumbs} label={copy.breadcrumb} />

      <article data-pagefind-body>
        <JournalPostHero {...{ locale, slug, post }} />

        <JournalPostParts
          {...{ han, parts, copy, locale, arm, guide, glossaryHref, r, english, zhArm }}
        />

        <JournalPostCare {...{ guide, st36, r, copy, han, dict, arm }} />

        <div className="mt-16 flex flex-col gap-12">
          <FaqLeaf faqs={arm.faqs} heading={dict.faqHeading} mark={han('問')} />
          <SourceList
            heading={copy.sources}
            mark={han('據')}
            sourceLang={english ? undefined : 'en'}
            sources={post.sources}
          />
          <ReviewFooter
            citeLabel={labels.cite.text}
            citeTitle={title}
            className="border-t-[2.5px] border-ink pt-4"
            locale={locale}
            pagePath={pagePath}
            reviewed={post.lastReviewed}
            template={copy.lastReviewed}
          />
        </div>
      </article>

      {named.length > 0 ? (
        <section
          aria-labelledby="rel"
          className="mt-16 flex flex-wrap items-center gap-6">
          <span className="flex items-baseline gap-3.5">
            <span aria-hidden="true" className="tc text-[1.625rem] font-black">
              {han('類')}
            </span>
            <h2 className="m-0 text-[1.625rem] font-medium" id="rel">
              {copy.relatedLeaves}
            </h2>
          </span>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {named.map((point) => (
              <li key={point.code}>
                <PointChip {...chipProps(point, r.point(point.code), copy)} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {older || newer ? <JournalPostNavigation {...{ copy, older, english, newer }} /> : null}
    </div>
  );
};
