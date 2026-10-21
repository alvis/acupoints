/**
 * Layout constants shared by the Learn pages, matching the Woodblock boards:
 * a 1440px sheet with 80px gutters at desktop, narrowing to 16px on phones.
 */

/** Page frame shared by every Learn page. */
export const FRAME = 'mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-20';

/** The boards' 34px section heading, scaled down on narrow screens. */
export const H2 =
  'm-0 text-[1.75rem] font-medium leading-tight tracking-[-0.005em] md:text-[2.125rem]';

/** Heavy-over-hairline rules that open a section head. */
export const HEAD_RULE = 'border-b-[2.5px] border-[color:var(--color-ink)] pb-3';

/** The boards' underlined title link: 1.5px rule, 5px offset. */
export const TITLE_LINK =
  'underline decoration-[1.5px] underline-offset-[5px] hover:decoration-[color:var(--color-cinnabar)]';
