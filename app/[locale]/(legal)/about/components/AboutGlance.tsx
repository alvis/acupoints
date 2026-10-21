import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One label and value of the glance box. */
export type GlanceRow = { label: string; value: string };

/** Props for {@link AboutGlance}. */
export type AboutGlanceProps = {
  title: string;
  rows: readonly GlanceRow[];
  /** The closing "record wins" line. */
  rule: string;
  /** The 本書 seal, in the page's script. */
  seal: readonly [string, string];
  zh: boolean;
};

/**
 * 本書 at a glance: the carved box beside the About hero.
 * @param props book facts, closing rule, panel heading, and seal characters
 * @param props.title heading of this about-page panel
 * @param props.rows book facts paired with their labels
 * @param props.rule closing statement that the point record takes precedence
 * @param props.seal upper and lower seal characters in the edition’s script
 * @param props.zh whether to use Chinese typography
 */
export const AboutGlance: FC<AboutGlanceProps> = ({ title, rows, rule, seal, zh }) => (
  <aside
    aria-label={title}
    className="blk m-1.5 flex flex-col gap-2.5 px-6 py-5">
    <span className="flex items-center gap-3">
      <Seal bottom={seal[1]} size={34} top={seal[0]} />
      <span className={cn('text-[1.25rem] font-semibold', zh && 'tc')}>{title}</span>
    </span>
    <dl className="m-0 flex flex-col gap-2.5">
      {rows.map((row) => (
        <div className="flex items-baseline text-[1.13rem]" key={row.label}>
          <dt className={cn('min-w-0', zh && 'tc')}>{row.label}</dt>
          <span aria-hidden="true" className="lead" />
          <dd className={cn('m-0 shrink-0', zh && 'tc')}>{row.value}</dd>
        </div>
      ))}
    </dl>
    <span
      className={cn(
        `
          border-t border-rule pt-1.5 text-[0.94rem] leading-[1.45]
          text-ink-soft
        `,
        zh && 'tc',
      )}>
      {rule}
    </span>
  </aside>
);
