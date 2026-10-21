import { cn } from '@/utilities/cn';

import type { FC, ReactNode } from 'react';

/** heading sizes and spacing. */
const _HEADING_LEVELS = {
  TERTIARY: 3,
} as const;

/** Props for {@link SectionHead}. */
export type SectionHeadProps = {
  /** Han heading set beside the English one (目錄, 凡例 …). */
  zh: string;
  title: ReactNode;
  id?: string;
  /** Optional mono caps line above the heading. */
  kicker?: ReactNode;
  /** Right-aligned slot (a "see all" link, a count). */
  aside?: ReactNode;
  level?: 2 | typeof _HEADING_LEVELS.TERTIARY;
  className?: string;
};

/**
 * Section heading: bold Han word, English heading, optional aside link.
 * @param props the Han and English section heading.
 * @param props.zh the decorative Han word before the English label.
 * @param props.title display heading.
 * @param props.id document anchor.
 * @param props.kicker the small caption above the heading.
 * @param props.aside the content aligned beside the heading.
 * @param props.level the semantic heading level.
 * @param props.className additional wrapper classes.
 */
export const SectionHead: FC<SectionHeadProps> = ({
  zh,
  title,
  id,
  kicker,
  aside,
  level = 2,
  className,
}) => {
  const H = level === 2 ? 'h2' : 'h3';

  return (
    <div className={cn('flex flex-wrap items-end gap-x-6 gap-y-2', className)}>
      <div className="flex min-w-0 flex-col gap-2">
        {kicker ? <span className="cap">{kicker}</span> : null}
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span
            aria-hidden="true"
            className="
              tc text-[1.6rem] leading-none font-black
              md:text-[2rem]
            ">
            {zh}
          </span>
          <H
            className={cn(
              'm-0 leading-tight font-medium tracking-[-0.005em]',
              level === 2
                ? `
                  text-[1.6rem]
                  md:text-[2rem]
                `
                : 'text-[1.35rem]',
            )}
            id={id}>
            {title}
          </H>
        </div>
      </div>
      {aside ? <div className="ml-auto text-base">{aside}</div> : null}
    </div>
  );
};
