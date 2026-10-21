import type { FC, PropsWithChildren } from 'react';

/** Props for {@link AboutWhat}. */
export type AboutWhatProps = PropsWithChildren<{
  /** Visually hidden section heading. */
  title: string;
}>;

/**
 * 是 · 為誰 · 刻: the three-card band under the About hero.
 * @param props section heading and the three purpose cards
 * @param props.title heading of this about-page panel
 * @param props.children content rendered inside this frame
 */
export const AboutWhat: FC<AboutWhatProps> = ({ title, children }) => (
  <section aria-labelledby="about-what" className="mt-16">
    <h2 className="sr-only" id="about-what">
      {title}
    </h2>
    <div
      className="
        grid gap-7
        md:grid-cols-3
      ">
      {children}
    </div>
  </section>
);
