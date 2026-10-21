import { Seal } from '@/components/primitives/Seal';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One kind of mark in the legend. */
export type LegendMark = {
  /** The two seal characters (新刻, 補正 …). */
  seal: readonly [string, string];
  /** What the mark means. */
  meaning: string;
  count: number;
};

/** One area in the by-area tally. */
export type LegendArea = { glyph: string; scope: string; count: number };

/** Props for {@link ChangelogLegend}. */
export type ChangelogLegendProps = {
  title: string;
  editionNote: string;
  marks: readonly LegendMark[];
  byArea: string;
  areas: readonly LegendArea[];
  zh: boolean;
};

/**
 * "How to read a mark": the edition number, each seal, and a tally by area.
 * @param props seal meanings and change counts by area
 * @param props.title accessible heading for the seal legend
 * @param props.editionNote explanation of the edition numbering
 * @param props.marks seal meanings and counts by change kind
 * @param props.byArea heading for the area tally
 * @param props.areas change counts grouped by area
 * @param props.zh whether the edition uses Chinese labels
 * @returns the seal meanings and change counts by area
 */
export const ChangelogLegend: FC<ChangelogLegendProps> = ({
  title,
  editionNote,
  marks,
  byArea,
  areas,
  zh,
}) => (
  <aside aria-label={title} className="blk m-1.5 flex flex-col gap-3 px-6 py-5">
    <span className={cn('text-[1.25rem] font-semibold', zh && 'tc')}>{title}</span>
    <div className="flex items-center gap-3 text-base">
      <span className="tc min-w-[52px] font-bold" lang="zh-Hant">
        第N版
      </span>
      <span className={cn(zh && 'tc')}>{editionNote}</span>
    </div>
    {marks.map((mark) => (
      <div className="flex items-center gap-3 text-base" key={mark.seal.join('')}>
        <Seal bottom={mark.seal[1]} size={30} top={mark.seal[0]} />
        <span className={cn(zh && 'tc')}>
          <strong className="tc font-semibold" lang="zh-Hant">
            {mark.seal.join('')}
          </strong>{' '}
          {mark.meaning} · {mark.count}
        </span>
      </div>
    ))}
    <div className="flex flex-col gap-0.5 border-t border-rule pt-2.5">
      <span className="cap mb-1">
        <span className="tc" lang="zh-Hant">
          部
        </span>{' '}
        · <span className={cn(zh && 'tc')}>{byArea}</span>
      </span>
      <dl className="m-0 flex flex-col gap-0.5">
        {areas.map((area) => (
          <div className="flex items-baseline text-base" key={area.scope}>
            <dt className="min-w-0">
              <span aria-hidden="true" className="tc mr-2 font-bold" lang="zh-Hant">
                {area.glyph}
              </span>
              <span className="pm text-[0.81rem]">{area.scope}</span>
            </dt>
            <span aria-hidden="true" className="lead" />
            <dd className="m-0 shrink-0">{area.count}</dd>
          </div>
        ))}
      </dl>
    </div>
  </aside>
);
