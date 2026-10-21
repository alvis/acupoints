'use client';

/**
 * The region picker (部位圖): the "All ten regions" list and the carved
 * front and back figures, each marked into regions you can pick, with the
 * picked region's points dotted on the figures, beside the card of the
 * region picked. Both controls move the same selection; the cards arrive
 * pre-rendered from the server.
 */

import { useState } from 'react';

import { cn } from '@/utilities/cn';

import { RegionsBoardView } from './RegionsBoardView';

import type { JSX, CSSProperties, FC, ReactNode } from 'react';

import type { RegionsBoardModel } from './RegionsBoardModel';

/** Where a region sits on its figure, in the figure's 0 0 300 640 space. */
export type BoardZone = {
  view: 'front' | 'back';
  x: number;
  y: number;
  width: number;
  height: number;
  radius: string;
};

/** One of a region's points on a figure, in the figure's 0 0 300 640 space. */
export type BoardDot = {
  code: string;
  view: 'front' | 'back';
  x: number;
  y: number;
};

/** One region as the board lists it. */
export type BoardRegion = {
  slug: string;
  /** Han glyph identifying this body region. */
  glyph: string;
  /** Name in the page's language. */
  name: string;
  /** "3 points", "via channels". */
  count: string;
  zone: BoardZone;
  /** The region's points where the figures carry them. */
  dots: readonly BoardDot[];
};

/** Interface strings for {@link RegionsBoard}. */
export type RegionsBoardCopy = {
  listTitle: string;
  listNote: string;
  listLabel: string;
  figureLabel: string;
  frontFigure: string;
  backFigure: string;
  front: string;
  back: string;
  legendZone: string;
  legendPicked: string;
  legendPoints: string;
  /** With `{name}` and `{count}` slots. */
  zoneLabel: string;
  cartouche: string;
  stripTitle: string;
  stripMiddle: string;
};

/** Props for {@link RegionsBoard}. */
export type RegionsBoardProps = {
  regions: readonly BoardRegion[];
  /** The card for each region, in the same order, rendered on the server. */
  panels: readonly ReactNode[];
  /** Carved front and back figures (SVG groups) rendered on the server. */
  frontFigure: ReactNode;
  backFigure: ReactNode;
  copy: RegionsBoardCopy;
  hanLang: string;
  /** Han words before "front"/"back" on English pages (正面, 背面). */
  sideZh?: { front: string; back: string };
  /** Slug picked first. */
  initial: string;
};

/**
 * List, figures and card of the ten regions; see the module note.
 * @param props body-part choices, figure illustrations, and matching detail cards
 * @returns the synchronized region picker, or nothing when no region exists
 */
export const RegionsBoard: FC<RegionsBoardProps> = (props) => {
  const model = useRegionsBoardModel(props);

  return model ? <RegionsBoardView {...model} /> : null;
};

/**
 * track the chosen region and position its figure overlays.
 * @param props body-part choices, figure illustrations, and matching detail cards
 * @param props.regions localized body-region labels
 * @param props.panels server-rendered detail panels
 * @param props.frontFigure server-rendered front illustration
 * @param props.backFigure server-rendered back illustration
 * @param props.copy localized interface strings
 * @param props.hanLang language tag for Han text
 * @param props.sideZh Han labels for the two figure views
 * @param props.initial region identifier selected on load
 * @returns the selected region, figure renderer, and selection setter, or null for an empty board
 */
export const useRegionsBoardModel = ({
  regions,
  panels,
  frontFigure,
  backFigure,
  copy,
  hanLang,
  sideZh,
  initial,
}: RegionsBoardProps): RegionsBoardModel => {
  const [selected, setSelected] = useState(initial);
  const index = Math.max(
    regions.findIndex((r) => r.slug === selected),
    0,
  );
  const current = regions.at(index);
  if (!current) {
    return null;
  }

  const figure = (view: 'front' | 'back', body: ReactNode, className: string): JSX.Element => (
    <figure className={cn('m-0 flex flex-col gap-3', className)}>
      <div className="relative">
        <svg
          aria-label={view === 'front' ? copy.frontFigure : copy.backFigure}
          className="block h-auto w-full"
          role="img"
          viewBox="0 0 300 640">
          {body}
          <g fill="var(--color-cinnabar)" stroke="var(--color-paper)">
            {current.dots
              .filter((dot) => dot.view === view)
              .map((dot) => (
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  key={dot.code}
                  r={view === 'front' ? BOARD_GEOMETRY.frontRadius : BOARD_GEOMETRY.backRadius}
                  strokeWidth={
                    view === 'front' ? BOARD_GEOMETRY.frontStroke : BOARD_GEOMETRY.backStroke
                  }
                />
              ))}
          </g>
        </svg>
        {regions
          .filter((r) => r.zone.view === view)
          .map((r) => {
            const on = r.slug === current.slug;

            return (
              <button
                aria-label={copy.zoneLabel.replace('{name}', r.name).replace('{count}', r.count)}
                aria-pressed={on}
                className={cn(
                  'absolute cursor-pointer border-0 p-0',
                  on
                    ? `
                      bg-[rgba(194,59,34,0.2)]
                      shadow-[inset_0_0_0_2.5px_var(--color-cinnabar)]
                    `
                    : `
                      bg-[rgba(237,227,204,0.05)] outline-[1.5px]
                      outline-offset-[-1.5px] outline-[rgba(29,26,22,0.7)]
                      outline-dashed
                      hover:bg-[rgba(194,59,34,0.08)]
                    `,
                )}
                key={r.slug}
                style={zoneStyle(r.zone)}
                type="button"
                onClick={() => setSelected(r.slug)}>
                <span
                  aria-hidden="true"
                  className={cn(
                    `
                      tc absolute -top-3 -left-3 grid size-6 place-items-center
                      rounded-full text-[0.8125rem] font-black
                    `,
                    on
                      ? `bg-(--color-cinnabar) text-paper`
                      : `bg-paper text-ink shadow-rest`,
                  )}
                  lang={hanLang}>
                  {r.glyph}
                </span>
              </button>
            );
          })}
      </div>
      <figcaption className="text-[0.95rem]">
        {sideZh ? (
          <>
            <span className="tc font-bold" lang={hanLang}>
              {sideZh[view]}
            </span>{' '}
            ·{' '}
          </>
        ) : null}
        {copy[view]}
      </figcaption>
    </figure>
  );

  return {
    copy,
    regions,
    current,
    setSelected,
    hanLang,
    figure,
    frontFigure,
    backFigure,
    panels,
    index,
  };
};

/** source dimensions of the carved body figure. */
const BOARD_GEOMETRY = {
  percent: 100,
  width: 300,
  height: 640,
  frontRadius: 5,
  backRadius: 7.5,
  frontStroke: 1.7,
  backStroke: 3.3,
} as const;

/**
 * express a figure rectangle as proportional CSS coordinates.
 * @param zone rectangle in the source illustration
 * @returns the scalable overlay placement
 */
export function zoneStyle(zone: BoardZone): CSSProperties {
  return {
    left: `${(BOARD_GEOMETRY.percent * zone.x) / BOARD_GEOMETRY.width}%`,
    top: `${(BOARD_GEOMETRY.percent * zone.y) / BOARD_GEOMETRY.height}%`,
    width: `${(BOARD_GEOMETRY.percent * zone.width) / BOARD_GEOMETRY.width}%`,
    height: `${(BOARD_GEOMETRY.percent * zone.height) / BOARD_GEOMETRY.height}%`,
    borderRadius: zone.radius,
  };
}
