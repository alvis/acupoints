'use client';

/**
 * Interactive leaf chart (經穴圖): carved plates with a channel's or
 * region's points marked from the shared coordinate tables, a numbered list
 * of every point, and a card for the one picked. A plate is either a region
 * template (0 0 100 120) or the whole standing figure (0 0 300 640, front or
 * back). Picking from the list, a plate tab or a mark on the plate moves the
 * cinnabar disc; each point's seal (from this browser) shows filled or hollow.
 *
 * Plate drawings arrive pre-rendered from the server (`base`), because the
 * templates are read from content/ at build time.
 */

import { useRef, useState } from 'react';

import { useSeals } from '@/components/headless/useSeals';

import { ChartRows } from './ChartRows';
import { ChartStrip } from './ChartStrip';
import { PlateDrawing } from './PlateDrawing';
import { PlateTabs } from './PlateTabs';

import type { FC, ReactNode } from 'react';

/** One point drawn on the chart. */
export type ChartPoint = {
  code: string;
  /** Han numeral or number shown at the head of its row. */
  ordinal: string;
  hanzi: string;
  /** Romanised name, e.g. Hegu. */
  name: string;
  /** One line saying where it is, in the page's language. */
  where: string;
  /** Key of the plate it sits on. */
  plate: string;
  /** Marker position in the plate's own space (0 0 100 120 unless the plate says). */
  x: number;
  y: number;
  /** The point's own leaf. */
  href: string;
};

/** One region plate the chart can show. */
export type ChartPlate = {
  key: string;
  /** Han label, e.g. 臂. */
  zh: string;
  /** Label in the page's language. */
  label: string;
  /** Carved drawing (an SVG group) rendered on the server. */
  base: ReactNode;
  /** The plate's drawing space. */
  size: PlateSize;
  /** Mark scale; 1 suits a plate about 100 units wide. */
  mark: number;
};

/** A plate's drawing space: its width and height, and its top-left corner when it crops a larger drawing. */
export type PlateSize = {
  width: number;
  height: number;
  x?: number;
  y?: number;
};

/** Interface strings for {@link PointChart}. */
export type PointChartCopy = {
  platesLabel: string;
  listLabel: string;
  openLeaf: string;
  sealed: string;
  notSealed: string;
  legendSealed: string;
  legendNot: string;
  /** Plate description with `{plate}`, `{code}` and `{name}` slots. */
  plateAria: string;
};

/** Labels of the centre strip (版心) between plate and list. */
export type ChartStrip = {
  title: string;
  middle: string;
  foot: string;
};

/** Props for {@link PointChart}. */
export type PointChartProps = {
  points: readonly ChartPoint[];
  plates: readonly ChartPlate[];
  copy: PointChartCopy;
  strip: ChartStrip;
  /** Vertical cartouche on the plate side, e.g. 手陽明大腸經圖. */
  cartouche: string;
  /** BCP-47 tag for Han text. */
  hanLang: string;
  /** Whether the page reads English (Han labels then sit before English ones). */
  english: boolean;
  /** Index of the point picked first. */
  initial?: number;
  /** Optional carved figure with the channel's line, shown beside the plate. */
  figure?: ReactNode;
};

/**
 * Plate, list and card for a set of points; see the module note.
 * @param props the plates, point rows, and chart labels
 * @param props.points the ordered points with plate coordinates and leaf links
 * @param props.plates available anatomical drawings
 * @param props.copy the localized chart labels and announcement templates
 * @param props.strip center-strip labels
 * @param props.cartouche vertical inscription
 * @param props.hanLang the BCP-47 tag for Han text
 * @param props.english whether Han labels precede English labels
 * @param props.initial the index of the point picked first
 * @param props.figure optional anatomical illustration
 * @returns the interactive chart, or null when no point exists
 */
export const PointChart: FC<PointChartProps> = ({
  points,
  plates,
  copy,
  strip,
  cartouche,
  hanLang,
  english,
  initial = 0,
  figure,
}) => {
  const [selected, setSelected] = useState(Math.min(Math.max(initial, 0), points.length - 1));
  const rows = useRef(new Map<number, HTMLButtonElement>());
  const seals = useSeals();
  const ready = seals.ready;
  const current = points.at(selected);
  if (!current) {
    return null;
  }
  const plate = plates.find((p) => p.key === current.plate) ?? plates.at(0);
  const onPlate = points
    .map((point, index) => ({ point, index }))
    .filter(({ point }) => point.plate === plate?.key);
  const isSealed = (code: string): boolean => ready && seals.has(code);
  const size = plate?.size ?? { width: 300, height: 640 };
  const mark = plate?.mark ?? 2;
  const tall = size.height > size.width * 2;

  const pickFromPlate = (index: number): void => {
    setSelected(index);
    rows.current.get(index)?.scrollIntoView({ block: 'nearest' });
  };

  return (
    <div
      className="
        blk m-1.5 grid
        lg:grid-cols-[minmax(0,30rem)_58px_minmax(0,1fr)]
      ">
      <div
        className="
          relative flex flex-col gap-5 border-b-[1.5px] border-ink p-5
          sm:p-8
          lg:border-r-[1.5px] lg:border-b-0
        ">
        <PlateTabs
          copy={copy}
          english={english}
          hanLang={hanLang}
          plate={plate}
          plates={plates}
          points={points}
          setSelected={setSelected}
        />

        <PlateDrawing
          copy={copy}
          current={current}
          figure={figure}
          isSealed={isSealed}
          mark={mark}
          pickFromPlate={pickFromPlate}
          plate={plate}
          selected={selected}
          size={size}
          tall={tall}
          onPlate={onPlate}
        />

        <span
          className="
            flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft
          ">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-(--color-cinnabar)" />
            {copy.legendSealed}
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="
                size-2.5 rounded-full
                shadow-[inset_0_0_0_1.5px_var(--color-cinnabar)]
              "
            />
            {copy.legendNot}
          </span>
        </span>

        <span
          aria-hidden="true"
          className="
            tc vt r1 absolute top-4 right-4 hidden bg-paper px-1.5 py-3 text-xl
            font-bold tracking-[0.12em]
            sm:block
          ">
          {cartouche}
        </span>
      </div>

      <ChartStrip strip={strip} />

      <ChartRows
        copy={copy}
        current={current}
        english={english}
        hanLang={hanLang}
        isSealed={isSealed}
        points={points}
        rows={rows}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};
