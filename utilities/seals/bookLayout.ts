/** canvas border size and drawing palette. */
export interface DrawFrameParams {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  ink: SealBookInk;
}

/** seal-book title, palette, and heading baseline. */
export interface DrawHeaderParams {
  ctx: CanvasRenderingContext2D;
  page: SealBookPage;
  ink: SealBookInk;
  top: number;
}

/** channel label, leaf flags, palette, and row origin. */
export interface DrawVolumeRowParams {
  ctx: CanvasRenderingContext2D;
  volume: SealBookPageVolume;
  ink: SealBookInk;
  top: number;
}

/** volume completion marks, palette, and footer origin. */
export interface DrawVolumeSealsParams {
  ctx: CanvasRenderingContext2D;
  page: SealBookPage;
  ink: SealBookInk;
  top: number;
}

/** horizontal divider endpoints, baseline, thickness, and color. */
export interface RuleParams {
  ctx: CanvasRenderingContext2D;
  from: number;
  to: number;
  y: number;
  weight: number;
  color: string;
}

/** seal-book frame, text, and grid dimensions. */
export const LAYOUT_DIMENSIONS = {
  COLOPHON_GAP: 36,
  HEADER_RULE_WEIGHT: 2.5,
  ROW_RULE_ALPHA: 0.25,
  VOLUME_SEAL_LABEL_GAP: 12,
  BRAND_BASELINE_OFFSET: 36,
  PRINTED_BASELINE_OFFSET: 35,
  ROW_BOTTOM_GAP: 8,
  OUTER_FRAME_INSET: 24,
  OUTER_FRAME_TOTAL_INSET: 48,
  INNER_FRAME_INSET: 33.5,
  INNER_FRAME_TOTAL_INSET: 67,
  TITLE_LEFT_OFFSET: 4,
  HAN_TITLE_BASELINE: 104,
  TITLE_LANGUAGE_GAP: 32,
  TITLE_BASELINE: 56,
  SUMMARY_BASELINE: 96,
  PRINTER_SEAL_WIDTH: 92,
  SEAL_TOP_INSET: 4,
  VOLUME_LABEL_BASELINE: 16,
  VOLUME_NAME_INSET: 64,
  VOLUME_COUNT_RIGHT_INSET: 20,
  UNSEALED_LEAF_ALPHA: 0.55,
  LEAF_STROKE_ALIGNMENT: 0.5,
  MAX_VOLUME_SEAL_GAP: 40,
  VOLUME_STROKE_ALIGNMENT: 0.5,
  UNSEALED_DASH_LENGTH: 3,
  VOLUME_INNER_BORDER_INSET: 6.5,
  VOLUME_INNER_BORDER_TOTAL_INSET: 13,
  SEAL_DESIGN_WIDTH: 40,
  HALF_TURN_DEGREES: 180,
  SEAL_FACE_WIDTH: 38,
  SEAL_CORNER_RADIUS: 3,
  SEAL_BORDER_WEIGHT: 1.5,
  SEAL_BORDER_INSET: 4.5,
  SEAL_BORDER_WIDTH: 31,
  SEAL_GLYPH_SIZE: 12.5,
  SEAL_TEXT_CENTER: 20,
  SEAL_TOP_BASELINE: 18.6,
  SEAL_BOTTOM_BASELINE: 32.4,
} as const;

/**
 * Draws a page of the reader's seal book as a printed sheet: paper ground,
 * a double ink frame, the 印譜 title over the counts, one square per leaf
 * in rows by volume, the fourteen volume seals, and a colophon line. Pure
 * canvas drawing — colors and font stacks arrive resolved from the site's
 * tokens, so nothing here touches the network or the DOM.
 */

/** ordered channel labels and the reader’s stamped leaves. */
export interface SealBookPageVolume {
  /** volume number written in Han, such as 卷一. */
  number: string;
  /** Full channel name in Han. */
  han: string;
  /** Character pressed into the volume seal. */
  glyph: string;
  /** One flag per leaf, in book order: sealed or not. */
  sealed: readonly boolean[];
}

/** Everything the printed page says, already in the page language. */
export interface SealBookPage {
  /** Han title (印譜). */
  han: string;
  title: string;
  /** "47 of 361 leaves · 1 of 14 volumes · 12-day streak". */
  summary: string;
  volumeSeals: { han: string; label: string };
  /** Stamp on an earned volume seal (完). */
  completeGlyph: string;
  /** Glyphs of the printer's seal in the corner. */
  printerGlyphs: readonly [string, string];
  brand: string;
  printed: string;
  volumes: readonly SealBookPageVolume[];
}

/** The site's paper, ink and cinnabar, and its font stacks, resolved. */
export interface SealBookInk {
  paper: string;
  ink: string;
  inkSoft: string;
  inkMicro: string;
  cinnabar: string;
  /** CSS font-family list for Han text. */
  hanFont: string;
  /** CSS font-family list for Latin text. */
  textFont: string;
  monoFont: string;
}

/** Logical width of the page in CSS pixels. */
export const SEAL_BOOK_WIDTH = 1200;

export const MARGIN = 72;

export const HEADER = 150;

export const LABEL = 300;

export const SQUARE = 16;

export const STEP = 20;

export const ROW_PAD = 14;

export const SEAL = 56;

/** Heading baseline, then the seals, then air before the colophon rule. */
export const SEALS_HEADING = 48;

export const SEALS_TOP = 68;

export const SEALS_BLOCK = SEALS_TOP + SEAL + LAYOUT_DIMENSIONS.COLOPHON_GAP;

export const FOOTER = 56;

/** Leaf squares that fit on one line beside the volume label. */
export const PER_LINE = Math.floor((SEAL_BOOK_WIDTH - 2 * MARGIN - LABEL + STEP - SQUARE) / STEP);

/**
 * Height the page needs for its volumes, in CSS pixels.
 * @param page localized book labels and volumes.
 * @returns required canvas height in CSS pixels.
 */
export function sealBookHeight(page: SealBookPage): number {
  const rows = page.volumes.reduce((sum, v) => sum + rowHeight(v.sealed.length), 0);

  return MARGIN + HEADER + rows + SEALS_BLOCK + FOOTER + MARGIN;
}

/**
 * reserve enough canvas height for a volume grid.
 * @param leaves number of point marks.
 * @returns the canvas height needed for the volume's leaf rows and padding.
 */
export function rowHeight(leaves: number): number {
  const lines = Math.max(1, Math.ceil(leaves / PER_LINE));

  return ROW_PAD * 2 + lines * STEP - (STEP - SQUARE) + LAYOUT_DIMENSIONS.ROW_BOTTOM_GAP;
}

/** Where and what to press: a square seal, its two glyphs, and a slight turn in degrees. */
export interface SealMark {
  x: number;
  y: number;
  size: number;
  top: string;
  bottom: string;
  turn: number;
}
