import { VerticalTitle } from '@/components/primitives/VerticalTitle';

import type { FC, PropsWithChildren, ReactNode } from 'react';

/** Props for {@link VolumeHero}. */
export type VolumeHeroProps = PropsWithChildren<{
  /** Vertical Han title in the double-ruled cartouche (經絡總圖, 手陽明大腸經 …). */
  cartouche: string;
  /** Mono caps line above the heading. */
  cap: ReactNode;
  /** The page's one h1. */
  title: ReactNode;
  /** Right-hand column: the facts table. */
  aside: ReactNode;
}>;

/**
 * Opening spread of a channel page: cartouche, caps line, heading and the
 * lead (children) on the left, a facts table on the right.
 * @param props the cartouche, heading, lead, and facts table
 * @param props.cartouche vertical inscription
 * @param props.cap the caps line above the heading
 * @param props.title the page heading rendered as the only h1
 * @param props.aside the facts table in the right-hand column
 * @param props.children the lead paragraph and seal progress below the heading
 * @returns the opening spread with its vertical title, heading, lead, and facts
 */
export const VolumeHero: FC<VolumeHeroProps> = ({ cartouche, cap, title, aside, children }) => (
  <section
    className="
      mt-[34px] grid items-end gap-10
      lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14
    ">
    <div className="flex items-start gap-[30px]">
      <VerticalTitle>{cartouche}</VerticalTitle>
      <div className="flex min-w-0 flex-col gap-3.5 pt-2">
        <span className="cap">{cap}</span>
        <h1
          className="
            m-0 text-[2.5rem] leading-none font-medium tracking-[-0.01em]
            sm:text-[3.25rem]
            lg:text-[4rem]
          ">
          {title}
        </h1>
        {children}
      </div>
    </div>
    {aside}
  </section>
);
