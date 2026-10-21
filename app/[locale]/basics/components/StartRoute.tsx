import { hanNumeral } from '@/utilities/hanNumeral';
import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

const FIRST_STOP_X = 213;
const MIDDLE_STOP_X = 640;
const LAST_STOP_X = 1067;

/** Props for {@link StartRoute}. */
export type StartRouteProps = {
  /** Number of stops on the route (the basics, in order). */
  stops: number;
  /** 起, the route's starting mark, in the page's script. */
  start: string;
};

const STOP_X = [FIRST_STOP_X, MIDDLE_STOP_X, LAST_STOP_X];

/**
 * The carved road over the "Start here" stops, from the Learn board; decorative.
 * @param props decorative road connecting the basics stops
 * @param props.stops published basics stops
 * @param props.start accessible start-of-route label
 * @returns the decorative road connecting the basics stops
 */
export const StartRoute: FC<StartRouteProps> = ({ stops, start }) => (
  <svg
    aria-hidden="true"
    className="
      hidden h-auto w-full
      md:block
    "
    viewBox="0 0 1280 120">
    <g fill="none" filter={`url(#${CUT_FILTER})`} stroke="var(--color-ink)" strokeLinecap="round">
      <path
        d="M24 64 C110 22 150 104 213 62 S 470 18 640 62 S 900 106 1067 62 S 1200 34 1240 60"
        strokeWidth="5"
      />
      <path
        d="M24 78 C110 36 150 118 213 76 S 470 32 640 76 S 900 120 1067 76 S 1200 48 1240 74"
        strokeDasharray="2 9"
        strokeWidth="1.4"
      />
      <path d="M1228 48 L1250 60 L1228 72" strokeWidth="3" />
    </g>
    <text
      fill="var(--color-ink)"
      fontFamily="var(--font-han), serif"
      fontSize="18"
      fontWeight="700"
      x="24"
      y="30">
      {start}
    </text>
    {STOP_X.slice(0, stops).map((x, i) => (
      <g key={x}>
        <circle cx={x} cy="62" fill="var(--color-cinnabar)" r="27" />
        <circle cx={x} cy="62" fill="none" r="21" stroke="var(--color-paper)" strokeWidth="1.5" />
        <text
          fill="var(--color-paper)"
          fontFamily="var(--font-han), serif"
          fontSize="22"
          fontWeight="900"
          textAnchor="middle"
          x={x}
          y="70">
          {hanNumeral(i + 1)}
        </text>
      </g>
    ))}
  </svg>
);
