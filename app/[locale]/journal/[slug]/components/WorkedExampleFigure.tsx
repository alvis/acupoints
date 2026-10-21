import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

import type { WorkedExampleProps } from './WorkedExample';

const LAST_FINGER_INDEX = 3;
const FINGER_SPACING = 17;
const FINGER_TOP = 176;

const INK = 'var(--color-ink)';
const PAPER = 'var(--color-paper)';
const CINNABAR = 'var(--color-cinnabar)';
const SEAL = 'var(--color-seal)';
const HAN = 'var(--font-han), serif';
const MONO = 'var(--font-mono)';
const CUT = `url(#${CUT_FILTER})`;

/** Four stacked fingers below the knee-eye: the three-cun span. */
const FINGERS = [0, 1, 2, LAST_FINGER_INDEX].map((i) => FINGER_TOP + FINGER_SPACING * i);

/**
 * draw the leg and finger span beside the worked instructions
 * @param props leg illustration with the four-finger span below the knee
 * @param props.example Zusanli locating steps and illustration labels
 * @returns the leg illustration with the four-finger span below the knee
 */
export const WorkedExampleFigure: FC<Readonly<Pick<WorkedExampleProps, 'example'>>> = ({
  example,
}) => (
  <figure
    className="
      m-0 flex flex-col items-center gap-2 border-b-[1.5px] border-ink px-3.5
      pt-[22px] pb-4
      md:border-r-[1.5px] md:border-b-0
    ">
    <svg
      aria-label={example.legLabel}
      className="h-auto w-full max-w-[300px]"
      role="img"
      viewBox="0 0 280 400">
      <title>{example.legLabel}</title>
      <g fill="none" filter={CUT} stroke={INK} strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M70 0 C72 50 74 90 76 118 C70 142 72 166 80 186 C76 230 76 280 86 340 C90 362 92 380 92 400"
          strokeWidth="3.2"
        />
        <path
          d="M170 0 C168 50 164 90 162 118 C168 142 166 166 160 186 C172 222 170 270 150 340 C146 362 144 380 144 400"
          strokeWidth="3.2"
        />
        <ellipse cx="118" cy="130" rx="25" ry="30" strokeWidth="2.4" />
        <path
          d="M110 160 L112 184 M126 160 L124 184 M96 166 q-4 8 0 14 M116 190 C114 250 112 300 112 360"
          strokeWidth="1.4"
        />
        <circle cx="140" cy="171" r="5" strokeWidth="1.8" />
      </g>
      <g opacity=".92">
        {FINGERS.map((y) => (
          <rect
            fill={PAPER}
            height="16"
            key={y}
            rx="8"
            stroke={INK}
            strokeWidth="1.6"
            width="74"
            x="120"
            y={y}
          />
        ))}
      </g>
      <path
        d="M206 176 V244 M198 176 H214 M198 244 H214"
        fill="none"
        stroke={CINNABAR}
        strokeLinecap="round"
        strokeWidth="3.2"
      />
      <text
        fill={CINNABAR}
        fontFamily={HAN}
        fontSize="18"
        fontWeight="900"
        textAnchor="middle"
        x="246"
        y="208">
        三寸
      </text>
      <text fill={SEAL} fontFamily={MONO} fontSize="10" textAnchor="middle" x="246" y="226">
        3 CUN
      </text>
      <path d="M146 166 L196 140" stroke={INK} strokeWidth="1" />
      <text fill={INK} fontFamily={HAN} fontSize="14" fontWeight="700" x="200" y="138">
        {example.steps[0]?.han}
      </text>
      <circle cx="128" cy="254" fill={CINNABAR} r="7.5" stroke={PAPER} strokeWidth="2.5" />
      <path d="M136 258 L176 290" stroke={INK} strokeWidth="1" />
      <text fill={INK} fontFamily={HAN} fontSize="18" fontWeight="900" x="178" y="302">
        {example.han}
      </text>
      <text fill={INK} fontFamily={MONO} fontSize="11" x="178" y="320">
        ST36
      </text>
    </svg>
    <figcaption className="text-center text-sm text-ink-soft">{example.legCaption}</figcaption>
  </figure>
);
