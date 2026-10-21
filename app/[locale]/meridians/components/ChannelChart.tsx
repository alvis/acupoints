'use client';

/**
 * The fourteen-channel chart (十四經圖): a front and a back carved figure,
 * the volume list, and the card of the volume picked. The picked channel is
 * cut in red on the figure (or both figures) it runs on, its first point a
 * filled dot and its last a ring; "show every channel" adds the others in
 * thin ink. Seal counts come from this browser.
 */

import { useState } from 'react';

import { useSeals } from '@/components/headless/useSeals';
import { FishTail } from '@/components/primitives/FishTail';

import { useChannelSelection } from '../hooks/useChannelSelection';

import { ChannelFigures } from './ChannelFigures';
import { ChannelVolumeList } from './ChannelVolumeList';

import type { FC, ReactNode } from 'react';

/** One stretch of a channel line cut on one of the two figures. */
export type ChannelCourse = {
  view: 'front' | 'back';
  /** SVG path in the figure's 0 0 300 640 space. */
  d: string;
};

/** A point marked on one of the two figures. */
export type ChartDot = {
  view: 'front' | 'back';
  x: number;
  y: number;
};

/** One volume as the chart lists it. */
export type ChartChannel = {
  slug: string;
  /** volume number written in Chinese */
  vol: string;
  /** full Chinese channel title */
  zh: string;
  /** English line under the Han name; omitted on Chinese pages. */
  en?: string;
  /** Name used in announcements, in the page's language. */
  name: string;
  codes: readonly string[];
  /** The line, stretch by stretch; empty when it is not cut yet. */
  course: readonly ChannelCourse[];
  /** Bilateral channels are drawn on both sides. */
  mirror: boolean;
  /** First and last point of the channel. */
  start?: ChartDot;
  end?: ChartDot;
};

/** Interface strings for {@link ChannelChart}. */
export type ChannelChartCopy = {
  chartLabel: string;
  front: string;
  back: string;
  figFront: string;
  figBack: string;
  figThin: string;
  /** With a `{name}` slot. */
  figPicked: string;
  /** With `{name}` and `{side}` slots. */
  figOther: string;
  /** With a `{name}` slot. */
  figNone: string;
  legendChannel: string;
  legendPicked: string;
  legendFirst: string;
  legendLast: string;
  approx: string;
  noCourse: string;
  showAll: string;
  rowsLabel: string;
  /** With `{vol}`, `{name}`, `{count}` and `{n}` slots. */
  rowLabel: string;
  cartouche: string;
  stripTitle: string;
  stripMiddle: string;
  stripFoot: string;
};

/** Props for {@link ChannelChart}. */
export type ChannelChartProps = {
  channels: readonly ChartChannel[];
  /** The card for each channel, in the same order, rendered on the server. */
  panels: readonly ReactNode[];
  /** Carved front and back figures (SVG groups) rendered on the server. */
  frontFigure: ReactNode;
  backFigure: ReactNode;
  /** Id of the carved-edge filter mounted by the layout. */
  cutFilter: string;
  copy: ChannelChartCopy;
  hanLang: string;
  /** Han words before "front"/"back" on English pages (正面, 背面). */
  sideZh?: { front: string; back: string };
};

/**
 * Chart, list and card of the fourteen volumes; see the module note.
 * @param props the channel registry, carved figures, cards, and chart labels
 * @param props.channels the fourteen volumes in chart order
 * @param props.panels the server-rendered channel cards in volume order
 * @param props.frontFigure the server-rendered front carved body
 * @param props.backFigure the server-rendered back carved body
 * @param props.cutFilter the SVG filter ID for carved course edges
 * @param props.copy the localized chart labels and announcement templates
 * @param props.hanLang the BCP-47 tag for Han text
 * @param props.sideZh the optional Han front and back captions
 * @returns the interactive channel figures, selected card, and volume list
 */
export const ChannelChart: FC<ChannelChartProps> = ({
  channels,
  panels,
  frontFigure,
  backFigure,
  cutFilter,
  copy,
  hanLang,
  sideZh,
}) => {
  const { selected, select } = useChannelSelection();
  const [showAll, setShowAll] = useState(true);
  const seals = useSeals();
  const { ready } = seals;
  const index = Math.max(
    channels.findIndex((c) => c.slug === selected),
    0,
  );
  const current = channels.at(index);
  if (!current) {
    return null;
  }
  const sealedIn = (codes: readonly string[]): number =>
    ready ? codes.filter((code) => seals.has(code)).length : 0;

  return (
    <section aria-label={copy.chartLabel} className="mt-[52px]">
      <div
        className="
          blk m-1.5 grid
          lg:grid-cols-[minmax(0,700px)_58px_minmax(0,1fr)]
        ">
        <ChannelFigures
          {...{
            showAll,
            setShowAll,
            channels,
            frontFigure,
            backFigure,
            current,
            copy,
            cutFilter,
            hanLang,
            sideZh,
          }}
        />

        <div
          aria-hidden="true"
          className="
            hidden flex-col items-center gap-3 border-r-[1.5px] border-ink py-3
            lg:flex
          ">
          <span className="h-10 w-1.5 bg-ink" />
          <FishTail />
          <span className="tc vt text-base font-bold tracking-[0.2em]">{copy.stripTitle}</span>
          <span className="flex-1" />
          <span className="tc vt text-sm tracking-[0.2em]">{copy.stripMiddle}</span>
          <FishTail up />
          <span className="tc text-base font-bold">{copy.stripFoot}</span>
        </div>

        <ChannelVolumeList {...{ panels, index, copy, channels, sealedIn, select }} />
      </div>
    </section>
  );
};
