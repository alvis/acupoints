import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link SafetyCallout}. */
export type SafetyCalloutProps = PropsWithChildren<{
  title: string;
  /** `caution` is the cinnabar "get help now" frame; `info` the ink ruled box. */
  variant?: 'caution' | 'info';
  /** Han mark cut before the title; 忌 for cautions and 注 for notes by default. */
  mark?: string;
  className?: string;
}>;

/**
 * Safety note in the Woodblock frame: cautions sit in the cinnabar double
 * frame (`.r2-red`) used for "get help now" boxes, notes in a single ink rule.
 * The Han mark is decorative; the title is the note's heading.
 * @param props the framed safety note.
 * @param props.title display heading.
 * @param props.children the safety advice inside the frame.
 * @param props.variant whether the note uses the caution or information frame.
 * @param props.mark the decorative Han character overriding the default mark.
 * @param props.className additional wrapper classes.
 */
export const SafetyCallout: FC<SafetyCalloutProps> = ({
  title,
  children,
  variant = 'info',
  mark,
  className,
}) => {
  const isCaution = variant === 'caution';
  const glyph = mark ?? (isCaution ? '忌' : '注');

  return (
    <div
      className={cn(
        'my-8 flex flex-col gap-2.5 bg-paper px-6 py-5',
        isCaution ? 'r2-red' : 'r1',
        className,
      )}
      role="note">
      <p
        aria-level={3}
        className="
          m-0 flex items-baseline gap-3 font-display text-lead/snug
          font-semibold text-ink
        "
        role="heading">
        <span
          aria-hidden="true"
          className={cn(
            'tc text-[1.6rem] leading-none font-black',
            isCaution ? 'text-seal' : `text-ink`,
          )}>
          {glyph}
        </span>
        <span>{title}</span>
      </p>
      <div
        className="
          text-[1.0625rem] leading-[1.6] text-ink
          [&_li]:mt-1
          [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5
        ">
        {children}
      </div>
    </div>
  );
};
