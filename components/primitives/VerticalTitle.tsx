import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link VerticalTitle}. */
export type VerticalTitleProps = PropsWithChildren<{
  size?: 'md' | 'lg';
  className?: string;
}>;

/**
 * Vertical Han title in a double-ruled cartouche (頭痛方, 經穴圖 …).
 * @param props the vertical Han cartouche.
 * @param props.children the Han title set vertically.
 * @param props.size mark extent in pixels.
 * @param props.className additional wrapper classes.
 */
export const VerticalTitle: FC<VerticalTitleProps> = ({ children, size = 'lg', className }) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        `
          tc vt r2 hidden shrink-0 leading-none font-black tracking-[0.08em]
          sm:inline-block
        `,
        size === 'lg' ? 'px-3 py-5 text-[3.4rem]' : 'px-2.5 py-4 text-[2.2rem]',
        className,
      )}>
      {children}
    </span>
  );
};
