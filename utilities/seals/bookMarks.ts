import {
  LAYOUT_DIMENSIONS,
  SEAL_BOOK_WIDTH,
  MARGIN,
  LABEL,
  SQUARE,
  STEP,
  ROW_PAD,
  SEAL,
  PER_LINE,
} from './bookLayout';

import type {
  DrawFrameParams,
  DrawHeaderParams,
  DrawVolumeRowParams,
  DrawVolumeSealsParams,
  RuleParams,
  SealBookInk,
  SealMark,
} from './bookLayout';

/**
 * stroke the nested borders around the canvas.
 * @param props the canvas border geometry and palette.
 * @param props.ctx the canvas drawing context.
 * @param props.width horizontal extent in pixels.
 * @param props.height vertical extent in pixels.
 * @param props.ink palette used for drawing.
 */
export function drawFrame({ ctx, width, height, ink }: DrawFrameParams): void {
  ctx.strokeStyle = ink.ink;
  ctx.lineWidth = 3;
  ctx.strokeRect(
    LAYOUT_DIMENSIONS.OUTER_FRAME_INSET,
    LAYOUT_DIMENSIONS.OUTER_FRAME_INSET,
    width - LAYOUT_DIMENSIONS.OUTER_FRAME_TOTAL_INSET,
    height - LAYOUT_DIMENSIONS.OUTER_FRAME_TOTAL_INSET,
  );
  ctx.lineWidth = 1;
  ctx.strokeRect(
    LAYOUT_DIMENSIONS.INNER_FRAME_INSET,
    LAYOUT_DIMENSIONS.INNER_FRAME_INSET,
    width - LAYOUT_DIMENSIONS.INNER_FRAME_TOTAL_INSET,
    height - LAYOUT_DIMENSIONS.INNER_FRAME_TOTAL_INSET,
  );
}

/**
 * paint the book title and introductory text.
 * @param props the seal-book heading and introductory text.
 * @param props.ctx the canvas drawing context.
 * @param props.page localized book labels and volumes.
 * @param props.ink palette used for drawing.
 * @param props.top the vertical drawing origin in canvas pixels.
 */
export function drawHeader({ ctx, page, ink, top }: DrawHeaderParams): void {
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = ink.ink;
  ctx.font = `900 104px ${ink.hanFont}`;
  ctx.fillText(
    page.han,
    MARGIN - LAYOUT_DIMENSIONS.TITLE_LEFT_OFFSET,
    top + LAYOUT_DIMENSIONS.HAN_TITLE_BASELINE,
  );
  const x = MARGIN + ctx.measureText(page.han).width + LAYOUT_DIMENSIONS.TITLE_LANGUAGE_GAP;
  ctx.font = `500 44px ${ink.textFont}`;
  ctx.fillText(page.title, x, top + LAYOUT_DIMENSIONS.TITLE_BASELINE);
  ctx.fillStyle = ink.inkSoft;
  ctx.font = `20px ${ink.textFont}`;
  ctx.fillText(page.summary, x, top + LAYOUT_DIMENSIONS.SUMMARY_BASELINE);
  drawSeal(ctx, ink, {
    x: SEAL_BOOK_WIDTH - MARGIN - LAYOUT_DIMENSIONS.PRINTER_SEAL_WIDTH,
    y: top + LAYOUT_DIMENSIONS.SEAL_TOP_INSET,
    size: 92,
    top: page.printerGlyphs[0],
    bottom: page.printerGlyphs[1],
    turn: -6,
  });
}

/**
 * paint one channel label and its leaf grid.
 * @param props the channel label and stamped-leaf grid.
 * @param props.ctx the canvas drawing context.
 * @param props.volume channel and its sealed leaves.
 * @param props.ink palette used for drawing.
 * @param props.top the vertical drawing origin in canvas pixels.
 */
export function drawVolumeRow({ ctx, volume, ink, top }: DrawVolumeRowParams): void {
  const s = volume.sealed.filter(Boolean).length;
  const baseline = top + ROW_PAD + LAYOUT_DIMENSIONS.VOLUME_LABEL_BASELINE;
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = ink.inkMicro;
  ctx.font = `15px ${ink.hanFont}`;
  ctx.fillText(volume.number, MARGIN, baseline);
  ctx.fillStyle = ink.ink;
  ctx.font = `700 21px ${ink.hanFont}`;
  ctx.fillText(volume.han, MARGIN + LAYOUT_DIMENSIONS.VOLUME_NAME_INSET, baseline + 1);
  ctx.fillStyle = s === volume.sealed.length ? ink.cinnabar : ink.inkMicro;
  ctx.font = `12px ${ink.monoFont}`;
  ctx.textAlign = 'right';
  ctx.fillText(
    `${s}/${volume.sealed.length}`,
    MARGIN + LABEL - LAYOUT_DIMENSIONS.VOLUME_COUNT_RIGHT_INSET,
    baseline,
  );
  ctx.textAlign = 'left';

  const left = MARGIN + LABEL;
  volume.sealed.forEach((sealed, i) => {
    const x = left + (i % PER_LINE) * STEP;
    const y = top + ROW_PAD + LAYOUT_DIMENSIONS.SEAL_TOP_INSET + Math.floor(i / PER_LINE) * STEP;
    if (sealed) {
      ctx.fillStyle = ink.cinnabar;
      ctx.fillRect(x, y, SQUARE, SQUARE);
    } else {
      ctx.strokeStyle = withAlpha(ctx, ink.ink, LAYOUT_DIMENSIONS.UNSEALED_LEAF_ALPHA);
      ctx.lineWidth = 1;
      ctx.strokeRect(
        x + LAYOUT_DIMENSIONS.LEAF_STROKE_ALIGNMENT,
        y + LAYOUT_DIMENSIONS.LEAF_STROKE_ALIGNMENT,
        SQUARE - 1,
        SQUARE - 1,
      );
    }
  });
}

/**
 * paint the footer marks for the book.
 * @param props the earned-volume seals and footer marks.
 * @param props.ctx the canvas drawing context.
 * @param props.page localized book labels and volumes.
 * @param props.ink palette used for drawing.
 * @param props.top the vertical drawing origin in canvas pixels.
 */
export function drawVolumeSeals({ ctx, page, ink, top }: DrawVolumeSealsParams): void {
  const count = page.volumes.length;
  const gap = count > 1 ? (SEAL_BOOK_WIDTH - 2 * MARGIN - count * SEAL) / (count - 1) : 0;
  page.volumes.forEach((volume, i) => {
    const x = MARGIN + i * (SEAL + Math.min(gap, LAYOUT_DIMENSIONS.MAX_VOLUME_SEAL_GAP));
    if (volume.sealed.length > 0 && volume.sealed.every(Boolean)) {
      drawSeal(ctx, ink, {
        x,
        y: top,
        size: SEAL,
        top: volume.glyph,
        bottom: page.completeGlyph,
        turn: -5,
      });

      return;
    }
    ctx.strokeStyle = ink.inkMicro;
    ctx.lineWidth = 1;
    ctx.strokeRect(
      x + LAYOUT_DIMENSIONS.VOLUME_STROKE_ALIGNMENT,
      top + LAYOUT_DIMENSIONS.VOLUME_STROKE_ALIGNMENT,
      SEAL - 1,
      SEAL - 1,
    );
    ctx.setLineDash([
      LAYOUT_DIMENSIONS.UNSEALED_DASH_LENGTH,
      LAYOUT_DIMENSIONS.UNSEALED_DASH_LENGTH,
    ]);
    ctx.strokeRect(
      x + LAYOUT_DIMENSIONS.VOLUME_INNER_BORDER_INSET,
      top + LAYOUT_DIMENSIONS.VOLUME_INNER_BORDER_INSET,
      SEAL - LAYOUT_DIMENSIONS.VOLUME_INNER_BORDER_TOTAL_INSET,
      SEAL - LAYOUT_DIMENSIONS.VOLUME_INNER_BORDER_TOTAL_INSET,
    );
    ctx.setLineDash([]);
    ctx.fillStyle = ink.inkMicro;
    ctx.font = `18px ${ink.hanFont}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(volume.glyph, x + SEAL / 2, top + SEAL / 2 + 1);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  });
}

/**
 * The site's 白文 seal (components/primitives/Seal) redrawn on canvas.
 * @param ctx the canvas drawing context.
 * @param ink palette used for drawing.
 * @param mark the decorative Han character overriding the default mark.
 */
export function drawSeal(ctx: CanvasRenderingContext2D, ink: SealBookInk, mark: SealMark): void {
  const unit = mark.size / LAYOUT_DIMENSIONS.SEAL_DESIGN_WIDTH;
  ctx.save();
  ctx.translate(mark.x + mark.size / 2, mark.y + mark.size / 2);
  ctx.rotate((mark.turn * Math.PI) / LAYOUT_DIMENSIONS.HALF_TURN_DEGREES);
  ctx.translate(-mark.size / 2, -mark.size / 2);
  ctx.fillStyle = ink.cinnabar;
  ctx.beginPath();
  ctx.roundRect(
    unit,
    unit,
    LAYOUT_DIMENSIONS.SEAL_FACE_WIDTH * unit,
    LAYOUT_DIMENSIONS.SEAL_FACE_WIDTH * unit,
    LAYOUT_DIMENSIONS.SEAL_CORNER_RADIUS * unit,
  );
  ctx.fill();
  ctx.strokeStyle = ink.paper;
  ctx.lineWidth = LAYOUT_DIMENSIONS.SEAL_BORDER_WEIGHT * unit;
  ctx.strokeRect(
    LAYOUT_DIMENSIONS.SEAL_BORDER_INSET * unit,
    LAYOUT_DIMENSIONS.SEAL_BORDER_INSET * unit,
    LAYOUT_DIMENSIONS.SEAL_BORDER_WIDTH * unit,
    LAYOUT_DIMENSIONS.SEAL_BORDER_WIDTH * unit,
  );
  ctx.fillStyle = ink.paper;
  ctx.font = `900 ${LAYOUT_DIMENSIONS.SEAL_GLYPH_SIZE * unit}px ${ink.hanFont}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(
    mark.top,
    LAYOUT_DIMENSIONS.SEAL_TEXT_CENTER * unit,
    LAYOUT_DIMENSIONS.SEAL_TOP_BASELINE * unit,
  );
  ctx.fillText(
    mark.bottom,
    LAYOUT_DIMENSIONS.SEAL_TEXT_CENTER * unit,
    LAYOUT_DIMENSIONS.SEAL_BOTTOM_BASELINE * unit,
  );
  ctx.restore();
}

/**
 * stroke a horizontal divider with the requested ink.
 * @param props the horizontal canvas divider.
 * @param props.ctx the canvas drawing context.
 * @param props.from the divider start in canvas pixels.
 * @param props.to the divider end in canvas pixels.
 * @param props.y vertical coordinate.
 * @param props.weight stroke thickness.
 * @param props.color stroke color.
 */
export function rule({ ctx, from, to, y, weight, color }: RuleParams): void {
  ctx.fillStyle = color;
  ctx.fillRect(from, y - weight / 2, to - from, weight);
}

/**
 * A token color at reduced opacity, via the canvas's own color parsing.
 * @param ctx the canvas drawing context.
 * @param color stroke color.
 * @param alpha the requested opacity from zero to one.
 * @returns the parsed color with the requested alpha, or the original unrecognized color.
 */
export function withAlpha(ctx: CanvasRenderingContext2D, color: string, alpha: number): string {
  ctx.save();
  ctx.fillStyle = color;
  const hex = String(ctx.fillStyle);
  ctx.restore();
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/iu.exec(hex);
  if (!match) {
    return color;
  }
  const [r, g, b] = match.slice(1).map((part) => Number.parseInt(part, 16));

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
