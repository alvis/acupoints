import { courseSegments } from '@/utilities/illustrations/woodcut';

import { coordinateByCode } from './coordinates';
import { FIGURE_EXTRA_POINTS, FIGURE_POINTS } from './coordinates/figure';
import { HAND_BACK_POINTS } from './coordinates/handBack';

import type { CourseSegment } from '@/utilities/illustrations/woodcut';

import type { FigurePoint } from './coordinates/figure';
import type { IllustrationOverlay } from './schema';

export type { BodyPart, FigurePoint, FigureView } from './coordinates/figure';
export type { BaseTemplate, IllustrationOverlay } from './schema';

/**
 * Derive an illustration overlay for any published point from the shared
 * coordinate table. Every registry code is guaranteed to resolve — the
 * table's coverage guard runs at import — so a miss here is a programming
 * error and throws rather than degrading into a stale hand-authored plate.
 * @param pointCode catalogue point identifier.
 * @returns the point's anatomical illustration overlay.
 */
export function getOverlay(pointCode: string): IllustrationOverlay {
  const entry = coordinateByCode.get(pointCode.toUpperCase());
  if (!entry) {
    throw new Error(`No illustration coordinate entry for "${pointCode}"`);
  }

  return {
    pointCode: entry.pointCode,
    baseTemplate: entry.regionTemplate,
    marker: entry.marker,
    label: entry.label,
    nearby: entry.neighbors.map(({ pointCode: code, x, y }) => ({ pointCode: code, x, y })),
    coordinates: entry.note,
  };
}

const FIGURE_BY_CODE: ReadonlyMap<string, FigurePoint> = new Map(
  [...Object.values(FIGURE_POINTS).flat(), ...FIGURE_EXTRA_POINTS].map((p) => [p.code, p]),
);

/**
 * Where a point sits on the whole carved figure; every registry code resolves.
 * @param pointCode catalogue point identifier.
 * @returns the point's whole-body coordinates, or undefined when absent.
 */
export function figurePoint(pointCode: string): FigurePoint | undefined {
  return FIGURE_BY_CODE.get(pointCode.toUpperCase());
}

/**
 * A channel's points on the whole figure, in channel order.
 * @param meridianSlug the channel route identifier.
 * @returns the channel's whole-body points in channel order.
 */
export function channelFigure(meridianSlug: string): readonly FigurePoint[] {
  return FIGURE_POINTS[meridianSlug] ?? [];
}

/**
 * A channel's course on the front and back figures, through every one of its points.
 * @param meridianSlug the channel route identifier.
 * @returns the channel's continuous front and back SVG paths.
 */
export function channelCourse(meridianSlug: string): readonly CourseSegment[] {
  return courseSegments(channelFigure(meridianSlug));
}

/**
 * Where a point sits on the enlarged back of the hand; undefined for points the drawing cannot show.
 * @param pointCode catalogue point identifier.
 * @returns the point's hand-inset coordinates, or undefined outside the drawing.
 */
export function handBackPoint(
  pointCode: string,
): { readonly x: number; readonly y: number } | undefined {
  return HAND_BACK_POINTS[pointCode.toUpperCase()];
}
