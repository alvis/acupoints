import { cn } from '@/utilities/cn';

import type { FC } from 'react';

export type QAOpenerProps = {
  /** The reader's question, verbatim. */
  question: string;
  /** A one-sentence honest answer. */
  answer: string;
  /** Optional follow-through paragraph leading into the body. */
  followThrough?: string;
  className?: string;
  /**
   * When `true`, the inline FAQPage JSON-LD is not emitted. Use this on
   * pages that consolidate every QA into a single page-level FAQPage (e.g.
   * `/faq`) so crawlers see one authoritative FAQ entity instead of N
   * duplicates.
   */
  suppressJsonLd?: boolean;
  /**
   * When `true`, the follow-through paragraph adopts the `lead-dropcap`
   * treatment so the Q→A block reads as an editorial opener. Use this on
   * primary content-page openers (condition, basics, glossary) — not on
   * FAQ lists where multiple QAOpeners stack.
   */
  dropCap?: boolean;
};

/**
 * F · Q→A Answer-First Opener.
 * Surfaces the reader's literal question (cut beside a cinnabar 問) and a
 * direct answer (beside an ink 答) between two ink rules, then emits
 * matching FAQPage JSON-LD for GEO compliance (unless the caller opts out
 * via `suppressJsonLd` to consolidate a page-level FAQPage).
 * See docs/superpowers/specs/2026-04-21-editorial-pacing-contract-design.md §3.4.
 * @param props the question, the answer, and display options.
 * @param props.question question heading.
 * @param props.answer answer prose.
 * @param props.followThrough related reading after the answer.
 * @param props.className additional wrapper classes.
 * @param props.suppressJsonLd whether structured data is already emitted elsewhere.
 * @param props.dropCap whether the opening glyph is enlarged.
 */
export const QAOpener: FC<QAOpenerProps> = ({
  question,
  answer,
  followThrough,
  className,
  suppressJsonLd = false,
  dropCap = false,
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answer,
        },
      },
    ],
  };
  const jsonLdHtml = { __html: JSON.stringify(jsonLd) };

  return (
    <section
      className={cn(
        `speakable flex flex-col gap-3 border-y-[1.5px] border-ink py-5`,
        className,
      )}>
      <p
        className="
          m-0 grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3
          font-serif leading-snug font-medium text-ink
        ">
        <span aria-hidden="true" className="
          tc red text-[1.6rem] leading-none font-black
        ">
          問
        </span>
        <span>{question}</span>
      </p>
      <p
        className="
          m-0 grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3
          font-serif leading-snug font-semibold tracking-[-0.01em] text-ink
        ">
        <span aria-hidden="true" className="
          tc text-[1.6rem] leading-none font-black
        ">
          答
        </span>
        <span>{answer}</span>
      </p>
      {followThrough ? (
        <p
          className={cn(
            `m-0 border-t border-rule pt-3 leading-relaxed text-ink-soft`,
            dropCap && 'lead-dropcap',
          )}>
          {followThrough}
        </p>
      ) : null}
      {suppressJsonLd ? null : (
        <script dangerouslySetInnerHTML={jsonLdHtml} type="application/ld+json" />
      )}
    </section>
  );
};
