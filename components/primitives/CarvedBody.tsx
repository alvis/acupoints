import { CUT_FILTER, FIGURE_HALF } from '@/utilities/illustrations/woodcut';

import type { FC } from 'react';

/** figure mirroring axis and channel stroke width. */
const LAYOUT_DIMENSIONS = {
  DEFAULT_STROKE_WIDTH: 3.2,
} as const;

/** The left ear (viewer's left), from the top of the helix to the lobe, with its inner fold. */
const EAR =
  'M116 57 C110 52 106 58 107 66 C107 75 109 82 116 85 M112.5 62 C110.5 66 111 72 113.5 76';

/**
 * The left kneecap (viewer's left), rounded base up and apex down, so the
 * points ringing the knee read against it: the knee eyes beside its apex and
 * the thigh points two cun above its base.
 */
const KNEECAP =
  'M117 487 C119 482 128 482 130 487 C131 493 127 500 123.5 502 C120 500 116 493 117 487 Z';

/** The left knee crease on the back view, where weizhong sits at its midpoint. */
const KNEE_CREASE = 'M112 500 q12 3 24 0';

/** Props for {@link CarvedBody}. */
export type CarvedBodyProps = {
  /** Back view: spine and shoulder blades instead of the face. */
  back?: boolean;
  /** SVG path of a channel course to cut into the figure. */
  channel?: string;
  strokeWidth?: number;
};

/**
 * Standing figure group, viewBox 0 0 300 640. Wrap in an <svg>.
 * @param props the standing figure paths.
 * @param props.back whether to draw the back of the standing figure.
 * @param props.channel channel route identifier.
 * @param props.strokeWidth the figure outline thickness in SVG units.
 */
export const CarvedBody: FC<CarvedBodyProps> = ({
  back = false,
  channel,
  strokeWidth = LAYOUT_DIMENSIONS.DEFAULT_STROKE_WIDTH,
}) => {
  return (
    <g
      fill="none"
      filter={`url(#${CUT_FILTER})`}
      stroke="var(--color-ink)"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d={FIGURE_HALF} strokeWidth={strokeWidth} />
      <path d={FIGURE_HALF} strokeWidth={strokeWidth} transform="translate(300,0) scale(-1,1)" />
      <path
        d="M118 24 C130 12 170 12 182 24 C176 30 124 30 118 24 Z"
        fill="var(--color-ink)"
        strokeWidth="2.4"
      />
      {/* the ears, so the points in front of and around them have a landmark */}
      <path d={EAR} strokeWidth="1.8" />
      <path d={EAR} strokeWidth="1.8" transform="translate(300,0) scale(-1,1)" />
      {back ? (
        <>
          <path d="M150 120 V380 M120 170 q30 16 60 0 M126 360 q24 12 48 0" strokeWidth="1.4" />
          {/* the knee creases, so weizhong and its neighbours have a landmark */}
          <path d={KNEE_CREASE} strokeWidth="1.4" />
          <path d={KNEE_CREASE} strokeWidth="1.4" transform="translate(300,0) scale(-1,1)" />
        </>
      ) : (
        <>
          <path
            d="M136 60 q6 -3 10 0 M154 60 q6 -3 10 0 M146 76 q4 4 8 0 M142 88 q8 4 16 0"
            strokeWidth="1.6"
          />
          <path d="M126 184 q24 10 48 0 M118 300 q32 8 64 0 M150 300 v4" strokeWidth="1.4" />
          {/* the kneecaps, so the points ringing the knee have a landmark */}
          <path d={KNEECAP} strokeWidth="1.6" />
          <path d={KNEECAP} strokeWidth="1.6" transform="translate(300,0) scale(-1,1)" />
        </>
      )}
      {channel ? <path d={channel} strokeWidth="1.7" /> : null}
    </g>
  );
};
