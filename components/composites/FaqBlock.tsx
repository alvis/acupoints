import { DoubleRule } from '@/components/primitives/DoubleRule';
import { cn } from '@/utilities/cn';
import { hanLang } from '@/utilities/i18n/contentLabels';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

/** One question and its answer. */
export type FaqItem = {
  q: string;
  a: string;
};

/** Props for {@link FaqBlock}. */
export type FaqBlockProps = {
  items: FaqItem[];
  /** Heading anchor id. */
  id?: string;
  /** Visible heading text; chrome dictionaries localize it per locale. */
  heading?: string;
  /** Page locale for the Han marks' script; EN when omitted. */
  locale?: Locale;
  className?: string;
};

/**
 * FAQ as ruled questions and answers: a double rule opens the block, each
 * question carries a red 問 and each answer an ink 答, hairlines between.
 * JSON-LD `FAQPage` is emitted separately via the page's `@graph` bundler from
 * the same source.
 * @param props the ruled question-and-answer block.
 * @param props.items ordered entries to display.
 * @param props.id document anchor.
 * @param props.heading section title.
 * @param props.locale language used for text and routes.
 * @param props.className additional wrapper classes.
 */
export const FaqBlock: FC<FaqBlockProps> = ({
  items,
  id = 'faq-heading',
  heading = 'Frequently asked',
  locale = 'en',
  className,
}) => {
  const lang = hanLang(locale);

  return (
    <section aria-labelledby={id} className={cn('mt-16', className)}>
      <DoubleRule />
      <h2
        className="
          m-0 flex items-baseline gap-4 pt-4 font-display text-[1.6rem]
          leading-tight font-medium text-ink
          md:text-[2rem]
        "
        id={id}>
        <span aria-hidden="true" className="tc font-black" lang={lang}>
          {locale === 'zh-cn' ? '问答' : '問答'}
        </span>
        <span>{heading}</span>
      </h2>
      <dl className="m-0 mt-5 border-t-[1.5px] border-ink">
        {items.map((item) => (
          <div className="flex flex-col gap-2 border-b border-rule py-5" key={item.q}>
            <dt
              className="
                grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 font-display
                text-lead/snug font-medium text-ink
              ">
              <span
                aria-hidden="true"
                className="tc text-[1.35rem] font-black text-seal"
                lang={lang}>
                {locale === 'zh-cn' ? '问' : '問'}
              </span>
              <span>{item.q}</span>
            </dt>
            <dd
              className="
                m-0 grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 text-[1.0625rem]
                leading-[1.6] text-ink-soft
              ">
              <span
                aria-hidden="true"
                className="tc text-[1.1rem] font-bold text-ink-micro"
                lang={lang}>
                答
              </span>
              <span className="max-w-[68ch]">{item.a}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
