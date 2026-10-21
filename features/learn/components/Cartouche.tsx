import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** Props for {@link Cartouche}. */
export type CartoucheProps = {
  /** Large Han word cut into the frame. */
  zh: string;
  /** Optional vertical subtitle under the word ("基礎 · 日誌"). */
  vertical?: string;
  /** Set the word itself vertically, as the article boards do. */
  upright?: boolean;
  className?: string;
};

/**
 * Double-ruled cartouche holding a large Han word; decorative.
 * @param props decorative Han inscription inside a double rule
 * @param props.zh Han inscription in the page script
 * @param props.vertical optional vertical inscription beside the main word
 * @param props.upright whether to keep the inscription horizontal
 * @param props.className additional presentation classes
 * @returns the decorative Han inscription inside a double rule
 */
export const Cartouche: FC<CartoucheProps> = ({ zh, vertical, upright = false, className }) => (
  <span
    aria-hidden="true"
    className={cn(
      `
        r2 hidden shrink-0 flex-col items-center gap-3.5
        sm:flex
      `,
      upright ? 'px-3.5 py-[22px]' : 'px-3.5 py-[18px]',
      className,
    )}>
    <span
      className={cn(
        'tc leading-none font-black',
        upright
          ? `
            vt text-[3.4rem] tracking-widest
            lg:text-[4.5rem]
          `
          : `
            text-[3.6rem]
            lg:text-[4.75rem]
          `,
      )}>
      {zh}
    </span>
    {vertical ? (
      <span className="tc vt text-[1.05rem] font-bold tracking-[0.3em]">{vertical}</span>
    ) : null}
  </span>
);
