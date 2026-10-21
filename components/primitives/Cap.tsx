import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link Cap}. */
export type CapProps = PropsWithChildren<{
  /** Han word set before the label. */
  zh?: string;
  /** BCP-47 tag of the Han word; zh-cn pages pass zh-Hans. */
  zhLang?: string;
  className?: string;
  as?: 'span' | 'p' | 'div';
}>;

/**
 * Mono caps label, optionally led by a Han word: "注 · Why these four".
 * @param props the mono caps label.
 * @param props.zh the decorative Han word before the English label.
 * @param props.zhLang the language tag of the decorative Han word.
 * @param props.children the caption following the Han word.
 * @param props.className additional wrapper classes.
 * @param props.as the HTML element used for the text wrapper.
 */
export const Cap: FC<CapProps> = ({
  zh,
  zhLang = 'zh-Hant',
  children,
  className,
  as: Tag = 'span',
}) => {
  return (
    <Tag className={cn('cap', className)}>
      {zh ? (
        <>
          <span className="tc" lang={zhLang}>
            {zh}
          </span>{' '}
          ·{' '}
        </>
      ) : null}
      {children}
    </Tag>
  );
};
