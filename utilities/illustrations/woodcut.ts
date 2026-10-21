/** Shared filter ids. */
export const CUT_FILTER = 'wb-cut';

/** One side of the standing figure (mirrored for the other), viewBox 0 0 300 640. */
export const FIGURE_HALF =
  'M150,20 C128,20 116,38 116,62 C116,84 126,100 138,104 L138,118 C124,124 100,126 86,134 C74,141 70,156 70,172 C68,206 64,240 62,268 C60,300 54,336 50,366 C46,382 40,398 42,418 C44,432 52,436 58,428 C62,414 62,398 66,384 C72,350 80,318 84,282 C88,250 92,214 96,196 C98,230 102,262 104,292 C104,318 98,340 98,362 C98,400 100,450 106,500 C110,540 112,580 114,606 C114,620 104,628 106,636 L144,636 C144,622 138,612 138,600 C138,560 142,520 140,496 C142,460 146,430 151,404';

/** One point a channel course passes through, in figure units. */
export interface CoursePoint {
  readonly code: string;
  readonly view: 'front' | 'back';
  readonly x: number;
  readonly y: number;
  /** Earlier point the line branches from instead of the previous one. */
  readonly from?: string;
}

/** One unbroken stretch of a course on one figure. */
export interface CourseSegment {
  readonly view: 'front' | 'back';
  /** SVG path data, a polyline through the points. */
  readonly d: string;
}

/**
 * Cut a channel course from its points in channel order: a polyline through
 * consecutive points, broken where the course turns to the other figure or
 * branches back to an earlier point (`from`). Every point therefore sits on
 * its own course. Single points left alone on a figure draw no line.
 * @param points the ordered coordinates along the channel.
 * @returns the continuous channel paths grouped by body view.
 */
export function courseSegments(points: readonly CoursePoint[]): readonly CourseSegment[] {
  const byCode = new Map(points.map((point) => [point.code, point]));
  const runs: Array<{ view: CoursePoint['view']; points: CoursePoint[] }> = [];
  let previous: CoursePoint | undefined;
  for (const point of points) {
    const start = point.from ? byCode.get(point.from) : previous;
    const run = runs.at(-1);
    if (run && !point.from && start?.view === point.view) {
      run.points.push(point);
    } else {
      runs.push({
        view: point.view,
        points: start?.view === point.view ? [start, point] : [point],
      });
    }
    previous = point;
  }

  return runs
    .filter((run) => run.points.length > 1)
    .map((run) => ({ view: run.view, d: polyline(run.points) }));
}

/**
 * encode course coordinates as an SVG path.
 * @param points the ordered coordinates along the channel.
 * @returns the SVG move and line commands through the coordinates.
 */
function polyline(points: readonly CoursePoint[]): string {
  return points.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
}

/**
 * The back of the right hand, fingers up and thumb out to the left, as the
 * leaf board's enlarged inset cuts it; viewBox 28 16 220 384. The wrist
 * crease sits near y 380, the knuckles of the fingers near y 220.
 */
export const HAND_BACK = {
  viewBox: '28 16 220 384',
  outline:
    'M112,392 C112,360 108,336 100,318 C86,296 64,262 48,230 C40,214 36,194 44,182 C54,170 70,176 80,190 C92,206 102,214 112,216 C112,170 112,110 114,62 C115,44 140,44 141,62 C142,100 143,140 144,176 C145,120 145,70 146,42 C147,22 175,22 176,42 C177,80 177,130 178,176 C179,130 180,90 181,56 C182,38 207,38 208,56 C209,100 209,140 209,182 C211,150 212,120 213,98 C214,82 236,82 237,98 C238,140 238,200 232,252 C228,292 214,322 210,352 L210,392',
  creases:
    'M118 300 C130 286 150 284 168 292 M116 216 C120 236 122 250 118 262 M150 150 q8 -2 14 0 M178 150 q8 -2 14 0 M210 160 q7 -2 13 0',
  bone: 'M100 318 C108 296 114 278 118 258 C120 240 118 222 117 206 C116 160 116 100 117 62',
} as const;
