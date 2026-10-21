import Link from 'next/link';

import { cn } from '@/utilities/cn';

import { SealCount } from './SealCount';

import type { FC } from 'react';

/** First or last point of a channel as the panel names it. */
export type PanelEnd = {
  code: string;
  hanzi: string;
  name: string;
};

/** Props for {@link ChannelPanel}. */
export type ChannelPanelProps = {
  /** "卷二 · Volume 2 of 14". */
  cap: string;
  /** Full classical name, e.g. 手陽明大腸經. */
  zh: string;
  /** English label; omitted on Chinese pages. */
  en?: string;
  /** One line on the channel's course, from the editorial content. */
  route: string;
  pointsLabel: string;
  /** "20, drawn on the front figure". */
  pointsValue: string;
  startsLabel: string;
  endsLabel: string;
  start?: PanelEnd;
  end?: PanelEnd;
  href: string;
  readText: string;
  readLabel: string;
  codes: readonly string[];
  /** "{n} of 20 sealed". */
  sealLabel: string;
  hanLang: string;
};

/**
 * The picked volume's card: names, course line, first and last point, link to its chapter.
 * @param props the channel summary and chapter-link labels
 * @param props.cap the caps line above the heading
 * @param props.zh the Han title
 * @param props.en the optional English channel name
 * @param props.route the localized sentence describing the channel course
 * @param props.pointsLabel the label for the point count
 * @param props.pointsValue the formatted point count and figure sides
 * @param props.startsLabel the starting-point label
 * @param props.endsLabel the ending-point label
 * @param props.start the first point on the channel
 * @param props.end the last point on the channel
 * @param props.href the channel chapter URL
 * @param props.readText the visible chapter-link text
 * @param props.readLabel the accessible chapter-link name
 * @param props.codes the point codes whose browser seals are counted
 * @param props.sealLabel the count template with an {n} placeholder
 * @param props.hanLang the BCP-47 tag for Han text
 * @returns the volume heading, route, endpoint facts, and chapter link
 */
export const ChannelPanel: FC<ChannelPanelProps> = ({
  cap,
  zh,
  en,
  route,
  pointsLabel,
  pointsValue,
  startsLabel,
  endsLabel,
  start,
  end,
  href,
  readText,
  readLabel,
  codes,
  sealLabel,
  hanLang,
}) => (
  <div
    className="
      flex flex-col gap-2.5 bg-paper-raised p-4 pb-[18px]
      shadow-[inset_3px_0_0_var(--color-cinnabar)]
      sm:px-[18px]
    ">
    <span className="cap">{cap}</span>
    <span className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
      <span className="tc text-[2rem] leading-[1.1] font-black" lang={hanLang}>
        {zh}
      </span>
      {en ? <span className="text-[1.375rem] font-medium">{en}</span> : null}
    </span>
    <span className={cn('text-[1.0625rem] leading-[1.45]', en ? undefined : 'tc')}>{route}</span>
    <span className="grid grid-cols-[76px_minmax(0,1fr)] gap-y-1 text-base">
      <span className="cap self-center">{pointsLabel}</span>
      <span>{pointsValue}</span>
      <EndRow end={start} hanLang={hanLang} label={startsLabel} />
      <EndRow end={end} hanLang={hanLang} label={endsLabel} />
    </span>
    <span className="flex flex-wrap items-center gap-3.5">
      <Link
        aria-label={readLabel}
        className="btn btn-primary px-3.5 py-2 text-[0.95rem]"
        href={href}>
        {readText} →
      </Link>
      <SealCount className="text-[0.95rem] text-ink-soft" codes={codes} label={sealLabel} />
    </span>
  </div>
);

/** Props for {@link EndRow}. */
export type EndRowProps = {
  label: string;
  end?: PanelEnd;
  hanLang: string;
};

const EndRow: FC<EndRowProps> = ({ label, end, hanLang }) =>
  end ? (
    <>
      <span className="cap self-center">{label}</span>
      <span>
        <span className="pm text-xs text-ink-micro">{end.code}</span>{' '}
        <span className="tc font-bold" lang={hanLang}>
          {end.hanzi}
        </span>{' '}
        {end.name}
      </span>
    </>
  ) : null;
