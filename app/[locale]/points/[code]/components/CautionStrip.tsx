import type { FC } from 'react';

/** Props for {@link CautionStrip}. */
export type CautionStripProps = {
  /** Accessible name of the note ("Cautions from the classical sources"). */
  title: string;
  items: readonly string[];
  /** BCP-47 tag when the cautions are in another language than the page. */
  lang?: string;
};

/**
 * The red italic notes printed above the carved block, as a printer would
 * flag a leaf before it is read. The cautions are quoted as recorded.
 * @param props caution heading, statements, and language tag
 * @param props.title heading displayed above the content
 * @param props.items caution statements printed in the red margin
 * @param props.lang language tag for the caution statements
 * @returns the caution heading and red margin notes
 */
export const CautionStrip: FC<CautionStripProps> = ({ title, items, lang }) => (
  <div aria-label={title} className="flex flex-col gap-1" role="note">
    {items.map((item) => (
      <p className="red m-0 max-w-[90ch] text-base/snug italic" key={item} lang={lang}>
        {item}
      </p>
    ))}
  </div>
);
