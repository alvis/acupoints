import type { FC } from 'react';

/** Props for {@link BeforeYouPress}. */
export type BeforeYouPressProps = {
  /** decorative caution character */
  glyph: string;
  title: string;
  items: readonly string[];
  hanLang: string;
};

/**
 * Cinnabar double-framed "Before you press" (慎) box of plain cautions.
 * @param props safety heading, caution glyph, and precaution bullets
 * @param props.glyph decorative Han character
 * @param props.title display heading
 * @param props.items ordered entries to display
 * @param props.hanLang language tag for Han text
 */
export const BeforeYouPress: FC<BeforeYouPressProps> = ({ glyph, title, items, hanLang }) => (
  <aside className="r2-red flex flex-col gap-2.5 px-[22px] py-5">
    <h2 className="
      m-0 flex items-baseline gap-2.5 text-[1.375rem] font-semibold
    ">
      <span aria-hidden="true" className="tc red text-[1.625rem] font-black" lang={hanLang}>
        {glyph}
      </span>
      {title}
    </h2>
    <ul className="m-0 pl-5 text-[1.0625rem] leading-[1.55]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </aside>
);
