import { CUT_FILTER } from '@/utilities/illustrations/woodcut';

import type { FC, ReactElement } from 'react';

/** Props for {@link JournalVignette}. */
export type JournalVignetteProps = {
  /** Journal slug the art is keyed by. */
  slug: string;
  /** Han tag carved instead when a guide has no vignette yet. */
  fallback?: string;
};

const INK = 'var(--color-ink)';
const CINNABAR = 'var(--color-cinnabar)';

/** Journal vignette art keyed by post slug; decorative only. */
const VIGNETTES: Readonly<Record<string, ReactElement | undefined>> = {
  'cycle-comfort-routine': (
    <>
      <path d="M40 12 a10 10 0 1 0 8 15 a8 8 0 1 1 -8 -15 Z" fill={INK} />
      <path d="M16 38 h24 v6 a12 12 0 0 1 -24 0 Z" />
      <path d="M40 40 q7 0 7 5 q0 5 -7 5" />
      <path d="M22 34 q-2 -4 0 -7 M28 34 q-2 -4 0 -7" stroke={CINNABAR} />
    </>
  ),
  'steadier-anxious-days': (
    <>
      <path d="M10 40 h44 M14 47 h36 M20 54 h24" />
      <ellipse cx="32" cy="34" fill={INK} rx="9" ry="5" />
      <circle cx="46" cy="16" fill={CINNABAR} r="5" stroke="none" />
    </>
  ),
  'motion-sickness-on-the-road': (
    <>
      <path d="M14 38 h36 l-6 8 h-24 Z" fill={INK} />
      <path d="M32 38 V14 l12 18 h-12" />
      <path d="M8 52 q6 -5 12 0 t12 0 t12 0 t12 0" />
      <path d="M30 14 l-6 4" stroke={CINNABAR} />
    </>
  ),
  'wind-down-for-sleep': (
    <>
      <path d="M24 12 a12 12 0 1 0 14 17 a10 10 0 1 1 -14 -17 Z" fill={INK} />
      <path d="M46 14 v6 M43 17 h6 M50 30 v4 M48 32 h4" />
      <path d="M16 46 q16 10 32 0" />
      <path d="M20 50 l-2 4 M32 53 v5 M44 50 l2 4" />
    </>
  ),
  'tension-headache-toolkit': (
    <>
      <path d="M22 54 V44 q-8 -6 -8 -16 a18 18 0 0 1 36 0 q0 6 -3 9 l3 6 h-4 v5 h-8 v6" />
      <path d="M14 26 q18 -6 36 0" stroke={CINNABAR} strokeWidth="3" />
      <circle cx="40" cy="30" fill={INK} r="1.6" />
    </>
  ),
  'pressure-not-needles': (
    <>
      <path d="M24 10 v22 q0 10 10 10 q10 0 10 -10 v-22" />
      <path d="M30 36 q4 3 8 0" />
      <path d="M14 52 h36" />
      <circle cx="34" cy="52" fill={CINNABAR} r="3" stroke="none" />
      <path d="M48 12 L56 34 M46 24 L58 22" />
    </>
  ),
  'what-de-qi-feels-like': (
    <>
      <circle cx="32" cy="32" fill={CINNABAR} r="4" stroke="none" />
      <circle cx="32" cy="32" r="11" />
      <circle cx="32" cy="32" r="18" strokeDasharray="4 4" />
      <circle cx="32" cy="32" r="25" strokeDasharray="2 5" strokeWidth="1.2" />
    </>
  ),
  'measuring-with-cun': (
    <>
      <path d="M12 46 h40 M12 46 v-30 h10 v30 M22 18 h10 v28 M32 16 h10 v30 M42 22 h10 v24" />
      <path d="M12 54 h40 M12 50 v8 M52 50 v8" stroke={CINNABAR} strokeWidth="2.4" />
    </>
  ),
  'getting-started-with-acupressure': (
    <>
      <path d="M32 54 V28" />
      <path d="M32 34 q-14 0 -16 -14 q14 0 16 14 Z" fill={INK} />
      <path d="M32 30 q12 -2 14 -14 q-12 2 -14 14 Z" />
      <path d="M14 54 h36" />
      <circle cx="46" cy="16" fill={CINNABAR} r="2.5" stroke="none" />
    </>
  ),
  'desk-back-routine': (
    <>
      <path d="M22 12 v28 h22 M22 40 v14 M44 40 v14 M22 28 h20" />
      <path d="M30 12 q-4 6 0 12" stroke={CINNABAR} />
    </>
  ),
};

/**
 * Small framed woodcut heading a journal row, from the Learn board; decorative.
 * @param props framed woodcut for the guide
 * @param props.slug registry key to look up
 * @param props.fallback drawing used for an unrecognized key
 * @returns the framed woodcut for the guide
 */
export const JournalVignette: FC<JournalVignetteProps> = ({ slug, fallback }) => {
  const art = VIGNETTES[slug];

  return (
    <svg
      aria-hidden="true"
      className="
        size-16 shrink-0
        sm:size-[76px]
      "
      viewBox="0 0 64 64">
      <rect
        fill="var(--color-paper-raised)"
        height="62"
        stroke={INK}
        strokeWidth="1.5"
        width="62"
        x="1"
        y="1"
      />
      <rect fill="none" height="55" stroke={INK} strokeWidth="0.8" width="55" x="4.5" y="4.5" />
      {art ? (
        <g
          fill="none"
          filter={`url(#${CUT_FILTER})`}
          stroke={INK}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2">
          {art}
        </g>
      ) : (
        <text
          fill={INK}
          fontFamily="var(--font-han), serif"
          fontSize="26"
          fontWeight="900"
          textAnchor="middle"
          x="32"
          y="42">
          {fallback}
        </text>
      )}
    </svg>
  );
};
