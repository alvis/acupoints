import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link HanLead}. */
export type HanLeadProps = PropsWithChildren<{
  /** Han word set before the text (源流, 三語 …), already in the page's script. */
  han: string;
  /** True on Chinese pages (the text set in the Han face). */
  zh: boolean;
}>;

/**
 * Contents of a mono caps line as the boards set it, "源流 · Where the map
 * comes from": the Han word, a middle dot, then the localized text. Place it
 * inside an element that carries `.cap`.
 * @param props the Han-led caption.
 * @param props.han han word set before the text (源流, 三語 …), already in the page's script.
 * @param props.zh whether the page uses Chinese typography.
 * @param props.children the localized caption following the Han word.
 */
export const HanLead: FC<HanLeadProps> = ({ han, zh, children }) => (
  <>
    <span className="tc" lang={zh ? undefined : 'zh-Hant'}>
      {han}
    </span>{' '}
    · <span className={cn(zh && 'tc')}>{children}</span>
  </>
);
