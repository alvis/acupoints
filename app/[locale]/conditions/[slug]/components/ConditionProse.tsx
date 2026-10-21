import { CitePopover } from '@/components/composites/CitePopover';
import { SectionHead } from '@/components/primitives/SectionHead';
import { linkParts } from '@/features/conditions/format';
import { cn } from '@/utilities/cn';
import { formatDate } from '@/utilities/i18n/date';

import { ConditionContents } from './ConditionContents';
import { ConditionProseSection } from './ConditionProseSection';

import type { FC } from 'react';

import type { EditorialArm } from '@/content/editorial/schema';
import type { HanMarks } from '@/features/conditions/copy';
import type { Locale } from '@/utilities/routes';

/** Props for {@link ConditionProse}; headings arrive already localized. */
export type ConditionProseProps = {
  arm: EditorialArm;
  sources: readonly string[];
  lastReviewed: Date;
  locale: Locale;
  /** Title for the citation popover. */
  citeTitle: string;
  pagePath: string;
  readTitle: string;
  selfCareTitle: string;
  selfCareNotice: string;
  faqTitle: string;
  sourcesTitle: string;
  lastReviewedLabel: string;
  /** Heading glyphs (讀, 問, 據) in the page's script. */
  marks: HanMarks;
  className?: string;
};

const REVIEW_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * The condition's authored prose in the woodblock manner: a dotted-leader
 * table of contents beside the sections (stable heading anchors kept), the
 * self-care limits with the universal notice, the FAQ, sources and review
 * metadata.
 * @param props authored prose, citation details, and localized section headings
 * @param props.arm authored prose in the page language
 * @param props.sources reference URLs cited by the prose
 * @param props.lastReviewed date the authored content was last reviewed
 * @param props.locale page language and writing system
 * @param props.citeTitle title for the citation popover
 * @param props.pagePath locale-prefixed URL used in the citation
 * @param props.readTitle heading above the full prose
 * @param props.selfCareTitle heading for the self-care limits notice
 * @param props.selfCareNotice universal self-care disclaimer
 * @param props.faqTitle heading for the authored questions and answers
 * @param props.sourcesTitle heading for the cited references
 * @param props.lastReviewedLabel label preceding the review date
 * @param props.marks heading glyphs in the page script
 * @param props.className additional classes for the outer element
 * @returns the authored sections, safety notice, FAQ, sources, and review date
 */
export const ConditionProse: FC<ConditionProseProps> = ({
  arm,
  sources,
  lastReviewed,
  locale,
  citeTitle,
  pagePath,
  readTitle,
  selfCareTitle,
  selfCareNotice,
  faqTitle,
  sourcesTitle,
  lastReviewedLabel,
  marks,
  className,
}) => (
  <section aria-labelledby="read-in-full" className={cn('flex flex-col gap-10', className)}>
    <SectionHead id="read-in-full" title={readTitle} zh={marks.read} />
    <div
      className="
        grid gap-10
        lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14
      ">
      <ConditionContents {...{ arm }} />

      <div className="flex max-w-184 min-w-0 flex-col gap-10">
        {arm.sections.map((section, i) => (
          <ConditionProseSection key={section.id} {...{ section, i }} />
        ))}

        <aside
          aria-labelledby="self-care-limits"
          className="r1 flex flex-col gap-2.5 px-6 py-5">
          <span className="flex items-baseline gap-2.5">
            <span
              aria-hidden="true"
              className="tc red text-[1.5rem] leading-none font-black">
              停
            </span>
            <h3 className="m-0 text-[1.3rem] font-semibold" id="self-care-limits">
              {selfCareTitle}
            </h3>
          </span>
          <p className="m-0 text-[1.0625rem] leading-[1.55]">
            {arm.selfCareLimits} {selfCareNotice}
          </p>
        </aside>

        <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
          <SectionHead id="faq-heading" level={3} title={faqTitle} zh={marks.faq} />
          <dl className="m-0 border-t-[2.5px] border-ink">
            {arm.faqs.map((faq) => (
              <div className="border-b border-rule py-4" key={faq.q}>
                <dt className="text-[1.15rem] font-medium">{faq.q}</dt>
                <dd
                  className="
                    m-0 mt-1.5 text-[1.0625rem] leading-[1.6] text-ink-soft
                  ">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-labelledby="sources-heading"
          className="flex flex-col gap-4">
          <SectionHead id="sources-heading" level={3} title={sourcesTitle} zh={marks.sources} />
          <ol
            className="
              m-0 flex list-none flex-col gap-3 p-0 text-[0.95rem] text-ink-soft
            ">
            {sources.map((source, i) => (
              <li className="flex gap-3" key={source}>
                <span className="pm text-xs text-ink-micro">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1 wrap-anywhere">
                  {linkParts(source).map((part, j) =>
                    'href' in part ? (
                      <a
                        className="wb-link underline"
                        href={part.href}
                        key={j}
                        rel="noopener noreferrer"
                        target="_blank">
                        {part.label}
                      </a>
                    ) : (
                      part.text
                    ),
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div
          className="
            flex flex-wrap items-center justify-between gap-4 border-t
            border-rule pt-4
          ">
          <p className="cap m-0">
            {lastReviewedLabel}{' '}
            <time className="text-ink" dateTime={lastReviewed.toISOString()}>
              {formatDate(lastReviewed, locale, REVIEW_FORMAT)}
            </time>
          </p>
          <CitePopover path={pagePath} reviewed={lastReviewed} title={citeTitle} />
        </div>
      </div>
    </div>
  </section>
);
