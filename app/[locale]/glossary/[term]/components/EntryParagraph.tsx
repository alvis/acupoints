import { stripTags } from '../../../faq/components/inlineLinks';

import type { FC } from 'react';

/** Props for {@link EntryParagraph}. */
export type EntryParagraphProps = {
  /** A glossary.ts body paragraph; its only inline markup is `<em>`. */
  text: string;
  className?: string;
};

/** An `<em>` run, or a run of text up to the next one. */
const EM_OR_TEXT = /<em>(.*?)<\/em>|(?:(?!<em>).)+/gsu;

/**
 * One paragraph of a glossary entry's seed body. The seed allows `<em>`
 * only, so emphasis is rebuilt as elements instead of injecting HTML.
 * @param props seed paragraph and its styling
 * @param props.text a glossary seed-body paragraph whose only markup is emphasis
 * @param props.className CSS classes applied to the paragraph
 * @returns the seed paragraph with its emphasis restored
 */
export const EntryParagraph: FC<EntryParagraphProps> = ({ text, className }) => (
  <p className={className}>
    {[...text.matchAll(EM_OR_TEXT)].map((match) =>
      match.at(1) === undefined ? stripTags(match[0]) : <em key={match.index}>{match[1]}</em>,
    )}
  </p>
);
