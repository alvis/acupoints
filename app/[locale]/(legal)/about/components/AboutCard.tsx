import { HanLead } from '@/features/editorial/components/HanLead';
import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren } from 'react';

/** Props for {@link AboutCard}. */
export type AboutCardProps = PropsWithChildren<{
  /** Han word that leads the caps line (是, 為誰, 刻). */
  han: string;
  /** Mono caps line after the Han word. */
  cap: string;
  title: string;
  zh: boolean;
}>;

/**
 * One ruled card: caps line, h3, then its body.
 * @param props Han cap, English cap, heading, body, and typography choice
 * @param props.han Han word that leads the caps line
 * @param props.cap mono caps line following the Han heading
 * @param props.title heading of this about-page panel
 * @param props.zh whether to use Chinese typography
 * @param props.children content rendered inside this frame
 */
export const AboutCard: FC<AboutCardProps> = ({ han, cap, title, zh, children }) => (
  <div className="r1 flex flex-col gap-3 px-7 py-[26px]">
    <span className="cap">
      <HanLead han={han} zh={zh}>
        {cap}
      </HanLead>
    </span>
    <h3 className={cn('m-0 text-[1.63rem] font-semibold', zh && 'tc')}>{title}</h3>
    {children}
  </div>
);
