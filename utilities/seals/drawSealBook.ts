import {
  LAYOUT_DIMENSIONS,
  SEAL_BOOK_WIDTH,
  MARGIN,
  HEADER,
  SEALS_HEADING,
  SEALS_TOP,
  SEALS_BLOCK,
  sealBookHeight,
  rowHeight,
} from './bookLayout';
import {
  drawFrame,
  drawHeader,
  drawVolumeRow,
  drawVolumeSeals,
  rule,
  withAlpha,
} from './bookMarks';

import type { SealBookPage, SealBookInk } from './bookLayout';

export { SEAL_BOOK_WIDTH, sealBookHeight } from './bookLayout';
export type { SealBookPageVolume, SealBookPage, SealBookInk } from './bookLayout';

/**
 * Draw the page onto a context already scaled to CSS pixels.
 * @param ctx the canvas drawing context.
 * @param page localized book labels and volumes.
 * @param ink palette used for drawing.
 */
export function drawSealBook(
  ctx: CanvasRenderingContext2D,
  page: SealBookPage,
  ink: SealBookInk,
): void {
  const width = SEAL_BOOK_WIDTH;
  const height = sealBookHeight(page);
  const right = width - MARGIN;

  ctx.fillStyle = ink.paper;
  ctx.fillRect(0, 0, width, height);
  drawFrame({ ctx, width, height, ink });

  let y = MARGIN;
  drawHeader({ ctx, page, ink, top: y });
  y += HEADER;
  rule({
    ctx,
    from: MARGIN,
    to: right,
    y,
    weight: LAYOUT_DIMENSIONS.HEADER_RULE_WEIGHT,
    color: ink.ink,
  });

  for (const volume of page.volumes) {
    drawVolumeRow({ ctx, volume, ink, top: y });
    y += rowHeight(volume.sealed.length);
    rule({
      ctx,
      from: MARGIN,
      to: right,
      y,
      weight: 1,
      color: withAlpha(ctx, ink.ink, LAYOUT_DIMENSIONS.ROW_RULE_ALPHA),
    });
  }

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = ink.ink;
  ctx.font = `700 22px ${ink.hanFont}`;
  ctx.fillText(page.volumeSeals.han, MARGIN, y + SEALS_HEADING);
  if (page.volumeSeals.label !== page.volumeSeals.han) {
    const offset =
      ctx.measureText(page.volumeSeals.han).width + LAYOUT_DIMENSIONS.VOLUME_SEAL_LABEL_GAP;
    ctx.font = `500 20px ${ink.textFont}`;
    ctx.fillText(page.volumeSeals.label, MARGIN + offset, y + SEALS_HEADING);
  }
  drawVolumeSeals({ ctx, page, ink, top: y + SEALS_TOP });
  y += SEALS_BLOCK;

  rule({ ctx, from: MARGIN, to: right, y, weight: 1, color: ink.ink });
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = ink.ink;
  ctx.font = `500 18px ${ink.textFont}`;
  ctx.fillText(page.brand, MARGIN, y + LAYOUT_DIMENSIONS.BRAND_BASELINE_OFFSET);
  ctx.fillStyle = ink.inkMicro;
  ctx.font = `13px ${ink.monoFont}`;
  ctx.textAlign = 'right';
  ctx.fillText(page.printed, right, y + LAYOUT_DIMENSIONS.PRINTED_BASELINE_OFFSET);
  ctx.textAlign = 'left';
}
