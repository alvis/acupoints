import type { FC } from 'react';

import type { EditorialArm } from '@/content/editorial/schema';

/** Props for {@link FaqLeaf}. */
export type FaqLeafProps = {
  faqs: EditorialArm['faqs'];
  heading: string;
  /** 問, in the page's script. */
  mark: string;
  className?: string;
};

/**
 * The article's questions and answers under a 問 section head.
 * @param props page rendering context
 * @param props.faqs authored questions and answers
 * @param props.heading heading text
 * @param props.mark Han glyph beside the section heading
 * @param props.className additional presentation classes
 * @returns the question-and-answer section, or null when empty
 */
export const FaqLeaf: FC<FaqLeafProps> = ({ faqs, heading, mark, className }) => {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="faq-heading" className={className}>
      <div
        className="flex items-baseline gap-5 border-b-[2.5px] border-ink pb-3">
        <span aria-hidden="true" className="tc text-[1.75rem] font-black">
          {mark}
        </span>
        <h2
          className="
            m-0 text-[1.75rem] font-medium
            md:text-[2rem]
          "
          id="faq-heading">
          {heading}
        </h2>
      </div>
      <dl
        className="
          m-0 grid gap-x-10
          md:grid-cols-2
        ">
        {faqs.map((faq) => (
          <div className="border-b border-rule py-5" key={faq.q}>
            <dt className="text-[1.2rem] leading-snug font-semibold">{faq.q}</dt>
            <dd
              className="m-0 mt-2 text-[1.05rem] leading-relaxed text-ink-soft">
              {faq.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
