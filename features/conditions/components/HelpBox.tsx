import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

const _TERTIARY_HEADING_LEVEL = 3;

/** Props for {@link HelpBox}. */
export type HelpBoxProps = PropsWithChildren<{
  /** Id of the heading, for `aria-labelledby`. */
  id: string;
  title: string;
  /** Heading level inside the page outline. */
  level?: 2 | typeof _TERTIARY_HEADING_LEVEL;
  /** Han glyph beside the heading (急, 停, 孕 …). */
  glyph?: string;
  /** Cinnabar double frame for "get help now"; ruled single box otherwise. */
  urgent?: boolean;
  className?: string;
}>;

/**
 * One bite-size safety block: a Han glyph, a heading and its text. Urgent
 * blocks take the cinnabar double frame used for "get help now".
 * @param props advice heading, urgency, anchor, and warning content
 * @param props.id anchor identifying the prescription slip
 * @param props.title condition title on the prescription slip
 * @param props.level heading depth of the advice box
 * @param props.glyph decorative Han character beside the heading
 * @param props.urgent whether the box uses urgent warning styling
 * @param props.className additional classes for the outer element
 * @param props.children introductory heading displayed inside the session
 */
export const HelpBox: FC<HelpBoxProps> = ({
  id,
  title,
  level = 2,
  glyph = '急',
  urgent = false,
  className,
  children,
}) => {
  const Heading = level === 2 ? 'h2' : 'h3';

  return (
    <aside
      aria-labelledby={id}
      className={cn(
        'flex min-w-0 flex-col gap-2.5 px-6 py-5',
        urgent ? 'r2-red' : 'r1',
        className,
      )}>
      <span className="flex items-baseline gap-2.5">
        <span aria-hidden="true" className="
          tc red text-[1.6rem] leading-none font-black
        ">
          {glyph}
        </span>
        <Heading className="m-0 text-[1.35rem] leading-tight font-semibold" id={id}>
          {title}
        </Heading>
      </span>
      <div className="flex flex-col gap-2.5 text-[1.0625rem] leading-[1.55]">{children}</div>
    </aside>
  );
};
