import { z } from 'zod';

/** point-code and annotation text length limits. */
const VALIDATION_LIMITS = {
  POINT_CODE_MAX: 8,
  TEXT_MAX: 12,
} as const;

export const BASE_TEMPLATES = [
  'hand',
  'foot',
  'head',
  'ear',
  'torso-supine',
  'torso-prone',
  'arm',
  'leg',
] as const;
export type BaseTemplate = (typeof BASE_TEMPLATES)[number];

const pointXY = z.object({ x: z.number(), y: z.number() });

const illustrationOverlaySchema = z.object({
  /** Acupoint code, e.g. "LI4". */
  pointCode: z.string().min(2).max(VALIDATION_LIMITS.POINT_CODE_MAX),
  /** Which base body template to compose against. */
  baseTemplate: z.enum(BASE_TEMPLATES),
  /** Primary marker coordinates in SVG viewBox units (x 0..100, y 0..120 — the shared composer viewBox is `0 0 100 120`). */
  marker: pointXY,
  /** Label anchor + text rendered via dashed call-out line. */
  label: pointXY.extend({ text: z.string().min(1).max(VALIDATION_LIMITS.TEXT_MAX) }),
  /** Optional nearby points shown dim on the same illustration. */
  nearby: z
    .array(pointXY.extend({ pointCode: z.string().min(2).max(VALIDATION_LIMITS.POINT_CODE_MAX) }))
    .optional(),
  /** Human-readable coordinate prose. */
  coordinates: z.string().optional(),
});

export type IllustrationOverlay = z.infer<typeof illustrationOverlaySchema>;

export { illustrationOverlaySchema as IllustrationOverlaySchema };
