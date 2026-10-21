import type { FC } from 'react';

/** Props for {@link SourceList}. */
export type SourceListProps = {
  sources: readonly string[];
  heading: string;
  /** 據, in the page's script. */
  mark: string;
  /** Language of the source lines when it differs from the page (they are recorded in English). */
  sourceLang?: string;
  className?: string;
};

/**
 * Numbered, ruled list of the article's sources.
 * @param props numbered source citations
 * @param props.sources referenced publications
 * @param props.heading heading text
 * @param props.mark Han glyph beside the section heading
 * @param props.sourceLang language tag for references
 * @param props.className additional presentation classes
 * @returns the numbered source citations
 */
export const SourceList: FC<SourceListProps> = ({
  sources,
  heading,
  mark,
  sourceLang,
  className,
}) => (
  <section aria-labelledby="sources-heading" className={className}>
    <h2 className="cap m-0" id="sources-heading">
      <span aria-hidden="true" className="tc">
        {mark}
      </span>{' '}
      · {heading}
    </h2>
    <ol className="m-0 mt-3 list-none border-t-2 border-ink p-0">
      {sources.map((source, i) => (
        <li
          className="
            flex gap-4 border-b border-rule py-2.5 text-[0.95rem]
            leading-relaxed text-ink-soft
          "
          key={source}>
          <span className="pm shrink-0 text-xs text-ink-micro">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1" lang={sourceLang}>
            {source}
          </span>
        </li>
      ))}
    </ol>
  </section>
);
