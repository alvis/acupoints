'use client';

import { useState } from 'react';

import { cn } from '@/utilities/cn';

import type { FC, ReactElement } from 'react';

import type { CunMeasureKey, CunMeasureOption } from './cunGuide';

const BRACKET_HALF_HEIGHT = 10;
const LABEL_BASELINE_OFFSET = 26;

/** Props for {@link CunMeasure}. */
export type CunMeasureProps = {
  options: readonly CunMeasureOption[];
  /** "量 · Show a measure". */
  cap: string;
  /** Accessible name of the button group. */
  groupLabel: string;
  /** Closing line under the caption. */
  note: string;
  /** Vertical tag on the figure, 同身寸圖; decorative. */
  tag: string;
  /**
   * Id of the layout's carved-edge SVG filter. Passed in from the server so
   * this island does not import the figures module and its file-system data.
   */
  cutFilter: string;
};

const INK = 'var(--color-ink)';
const CINNABAR = 'var(--color-cinnabar)';
const SEAL = 'var(--color-seal)';
const HAN = 'var(--font-han), serif';
const MONO = 'var(--font-mono)';

/** Carved measuring hand (viewBox 0 -60 300 510): thumb 40 wide = 1 cun, fingers 30/30/30/28. */
const HAND_OUT =
  'M118 448 C116 414 108 382 98 356 C76 340 50 316 44 282 L40 170 C40 140 80 140 80 170 L80 236 C82 252 90 260 100 262 L100 60 C100 34 130 34 130 60 L130 40 C130 14 160 14 160 40 L160 52 C160 26 190 26 190 52 L190 92 C190 68 218 68 218 92 L218 250 C222 300 218 340 210 366 C204 392 202 420 202 448';
const HAND_IN =
  'M130 60 V238 M160 52 V236 M190 92 V240 M103 96 q12 4 24 0 M103 150 q12 4 24 0 M133 80 q12 4 24 0 M133 140 q12 4 24 0 M163 90 q12 4 24 0 M163 146 q12 4 24 0 M193 124 q11 4 22 0 M193 172 q11 4 22 0 M103 228 q12 5 24 0 M133 222 q12 5 24 0 M163 226 q12 5 24 0 M193 236 q11 5 22 0 M43 210 q18 6 34 0 M52 270 q18 8 36 2 M100 272 C108 310 116 350 124 404 M216 282 C190 276 160 278 132 294 M102 298 C134 306 166 320 190 340 M124 418 q38 8 76 0 M122 432 q40 8 80 0';

type BracketProps = { x1: number; x2: number; y: number };

const Bracket: FC<BracketProps> = ({ x1, x2, y }) => (
  <path
    d={`M${x1} ${y} H${x2} M${x1} ${y - BRACKET_HALF_HEIGHT} V${y + BRACKET_HALF_HEIGHT} M${x2} ${y - BRACKET_HALF_HEIGHT} V${y + BRACKET_HALF_HEIGHT}`}
    fill="none"
    stroke={CINNABAR}
    strokeLinecap="round"
    strokeWidth="3.2"
  />
);

type MeasureLabelProps = { x: number; y: number; han: string; latin: string };

const MeasureLabel: FC<MeasureLabelProps> = ({ x, y, han, latin }) => (
  <>
    <text
      fill={CINNABAR}
      fontFamily={HAN}
      fontSize="24"
      fontWeight="900"
      textAnchor="middle"
      x={x}
      y={y}>
      {han}
    </text>
    <text
      fill={SEAL}
      fontFamily={MONO}
      fontSize="11"
      letterSpacing="1.5"
      textAnchor="middle"
      x={x}
      y={y - LABEL_BASELINE_OFFSET}>
      {latin}
    </text>
  </>
);

const GUIDE = 'M100 50 V-6';

/** The bracket, tint and label each measure draws over the hand. */
const SHAPES: Readonly<Record<CunMeasureKey, ReactElement>> = {
  m1: (
    <>
      <rect fill={CINNABAR} height="88" opacity=".16" width="40" x="40" y="168" />
      <Bracket x1={40} x2={80} y={210} />
      <MeasureLabel han="一寸" latin="1 CUN" x={60} y={128} />
    </>
  ),
  m15: (
    <>
      <rect fill={CINNABAR} height="180" opacity=".16" width="60" x="100" y="58" />
      <Bracket x1={100} x2={160} y={150} />
      <path d={`${GUIDE} M160 30 V-6`} stroke={CINNABAR} strokeDasharray="3 4" strokeWidth="1.2" />
      <MeasureLabel han="一寸半" latin="1.5 CUN" x={130} y={-14} />
    </>
  ),
  m3: (
    <>
      <rect fill={CINNABAR} height="144" opacity=".16" width="118" x="100" y="94" />
      <Bracket x1={100} x2={218} y={150} />
      <path d={`${GUIDE} M218 82 V-6`} stroke={CINNABAR} strokeDasharray="3 4" strokeWidth="1.2" />
      <MeasureLabel han="三寸 · 一夫" latin="3 CUN" x={159} y={-14} />
    </>
  ),
};

const OPTION =
  'grid min-h-[62px] w-full cursor-pointer grid-cols-[86px_minmax(0,1fr)] items-center gap-1.5 border-0 px-3.5 py-2 text-left text-base leading-[1.25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-ink)]';

/**
 * The hand-measure switcher from the Journal board: one carved hand, three
 * finger measures. Choosing a measure draws its bracket on the hand and
 * swaps the caption, which is announced politely.
 * @param props hand illustration with selectable finger-width measures
 * @param props.options finger-width choices and their captions
 * @param props.cap heading above the measurement switcher
 * @param props.groupLabel accessible name of the measure choices
 * @param props.note caution or explanation beneath the figure
 * @param props.tag Han article label
 * @param props.cutFilter SVG filter ID for the carved hand
 * @returns the hand illustration with selectable finger-width measures
 */
export const CunMeasure: FC<CunMeasureProps> = ({
  options,
  cap,
  groupLabel,
  note,
  tag,
  cutFilter,
}) => {
  const [key, setKey] = useState<CunMeasureKey>('m1');
  const current = options.find((o) => o.key === key) ?? options.at(0);
  if (!current) {
    return null;
  }

  return (
    <figure
      className="
        blk m-1.5 grid
        md:grid-cols-[minmax(0,384px)_1.5px_minmax(0,1fr)]
      ">
      <div className="relative px-3 pt-[18px] pb-3.5">
        <svg
          aria-label={current.label}
          className="mx-auto h-auto w-full max-w-[360px]"
          role="img"
          viewBox="0 -60 300 510">
          <title>{current.label}</title>
          {SHAPES[current.key]}
          <g
            fill="none"
            filter={`url(#${cutFilter})`}
            stroke={INK}
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d={HAND_OUT} strokeWidth="3.4" />
            <path d={HAND_IN} strokeWidth="1.4" />
          </g>
        </svg>
        <span
          aria-hidden="true"
          className="
            tc vt r1 absolute top-3.5 right-2.5 bg-paper px-1 py-2.5 text-lg
            font-bold tracking-[0.14em]
          ">
          {tag}
        </span>
      </div>
      <span
        aria-hidden="true"
        className="
          hidden bg-ink
          md:block
        "
      />
      <div
        className="
          flex flex-col gap-3 border-t-[1.5px] border-ink px-5 pt-[22px] pb-5
          md:border-t-0
        ">
        <span className="cap">{cap}</span>
        <div aria-label={groupLabel} className="flex flex-col gap-2" role="group">
          {options.map((option) => {
            const on = option.key === key;

            return (
              <button
                aria-pressed={on}
                className={cn(
                  OPTION,
                  on
                    ? `
                      bg-ink text-paper
                      shadow-[inset_4px_0_0_var(--color-cinnabar)]
                    `
                    : `bg-transparent text-ink shadow-rest`,
                )}
                key={option.key}
                type="button"
                onClick={() => setKey(option.key)}>
                <span
                  aria-hidden="true"
                  className="tc text-[1.375rem] font-black">
                  {option.han}
                </span>
                <span>
                  {option.unit}
                  <br />
                  <span className="text-sm opacity-85">{option.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
        <figcaption
          aria-live="polite"
          className="
            flex flex-col gap-2 bg-paper-raised px-4 py-3.5
            shadow-[inset_3px_0_0_var(--color-cinnabar)]
          ">
          <span className="text-[1.3rem] font-medium">{current.title}</span>
          <span className="text-base leading-[1.45]">{current.how}</span>
          <span className="text-[0.95rem] leading-[1.4] text-ink-soft italic">{current.use}</span>
        </figcaption>
        <span className="mt-auto text-sm leading-[1.45] text-ink-soft">{note}</span>
      </div>
    </figure>
  );
};
