import { z } from 'zod';

/** coordinate table field and position limits. */
const VALIDATION_LIMITS = {
  X_MAX: 100,
  Y_MAX: 120,
  TEXT_MAX: 12,
  NOTE_MIN: 5,
  SUMMARY_SLICE: 10,
} as const;

/**
 * W5 coordinate table schema — the single source for every point illustration.
 *
 * All seven region templates draw in a shared SVG viewBox of `0 0 100 120`
 * (x grows right, y grows down). Markers, labels, and neighbor dots live in
 * that space. The table replaces the former 20-file curated-overlay registry;
 * renderers derive their overlay from it programmatically.
 *
 * ── Calibration contract ────────────────────────────────────────────────────
 * Coordinates were placed against each template's authored landmarks using
 * the WHO-style location wording in `content/catalog/*.ts` (`location`) and
 * `content/points.ts` (`whoCoordinates`). Nominal scales below are
 * approximations fitted to the template drawings and pinned to the curated
 * anchors; where a derived position conflicted with a curated anchor, the
 * curated anchor won (cross-page consistency beats local re-derivation).
 *
 * · hand — wrist crease band slopes from ulnar (28,42) to radial (52,36);
 *   forearm extends up beyond y≈20 (≈5.5 units/cun proximal travel), palm
 *   and metacarpus span y≈50–75, fingers descend to y≈115 fanning from
 *   knuckles (little finger x≈32 … thumb column x≈70–85). Forearm points
 *   beyond ≈4 cun proximal to the crease are placed per channel on whichever
 *   template fits the drawn anatomy (`hand` or `arm`) — decided against the
 *   curated anchors rather than by a fixed distance threshold, since the
 *   two templates' forearm spans differ.
 * · arm — elbow flexed, lateral profile: shoulder ≈(24,12), cubital crease
 *   arcs (30,60)→(66,66), forearm extends down-right to wrist ≈(80,106)
 *   (≈4.2 units/cun upper arm, ≈6 units/cun forearm).
 * · leg — vertical limb: hip y≈8, knee joint y≈68–80 (popliteal crease
 *   drawn y68–80), ankle y≈112–118. Medial structures hug x≈40–46,
 *   posterior chain (Bladder) x≈44–50, anterior/lateral (Stomach/
 *   Gallbladder) x≈50–62. Nominal ≈3.3–4 units/cun, interpolated between
 *   the curated anchors (ST36/ST37, SP6/KI8, BL40/BL57).
 * · foot — medial profile, toes right: heel x≈14–20, toe webs x≈80–92,
 *   dorsum midline y≈70–74, plantar border y≈80–84, medial malleolus
 *   ≈(20,60). ≈6.3 units/cun heel→toe. Lateral-surface points (GB40+, BL60+
 *   lateral chain) sit at the visible dorsal/plantar edge of the profile —
 *   schematic by construction, flagged in the spot-check notes.
 * · head — lateral profile facing left: nose/glabella x≈8–16, crown
 *   (46,14), ear disc centre ≈(66,82), occiput x≈76–80, skull-base/nape band
 *   y≈86–100 (curated GB20 (58,94), GV16 (50,96)), jaw/chin y≈80–98.
 *   Facial third-axis depth is compressed by the profile view; facial
 *   placements are ordered but schematic (flagged).
 * · torso-supine — anterior trunk: midline x=50, clavicles y≈30–36,
 *   nipple line y=48 (dots ±12 = 4 cun ⇒ 3 units/cun horizontal),
 *   umbilicus y≈78, symphysis y≈100. Conception-vessel chain pinned to the
 *   curated CV17 (50,48)/CV18 (50,42)/CV16 (50,58) ladder.
 * · torso-prone — posterior trunk: midline x=50, C7/T1 hollow y=30
 *   (curated GV14), spine drawn y28–104, sacrum y≈95–110. Bladder first
 *   line ±8 units (1.5 cun ⇒ ≈5.3 units/cun horizontal), second line ±16.
 *   Vertebral ladder descends ≈4.5 units/interspace from GV13 (50,38).
 *
 * `ear` remains a valid BaseTemplate for the region atlas but hosts no
 * catalogue point, so it is deliberately absent here.
 */

/** The seven region templates the coordinate table may target. */
export const REGION_TEMPLATES = [
  'hand',
  'foot',
  'leg',
  'arm',
  'head',
  'torso-supine',
  'torso-prone',
] as const;

export type RegionTemplate = (typeof REGION_TEMPLATES)[number];

const pointXY = z.object({
  /** viewBox-space x (0..100, inclusive of the drawing edge). */
  x: z.number().min(0).max(VALIDATION_LIMITS.X_MAX),
  /** viewBox-space y (0..120, inclusive of the drawing edge). */
  y: z.number().min(0).max(VALIDATION_LIMITS.Y_MAX),
});

const pointCode = z
  .string()
  .regex(/^(L[UIV]|S[TPI]|HT|BL|KI|PC|TH|GB|GV|CV)\d{1,2}$|^EX-[A-Z]{1,2}\d{1,2}$/u, {
    message: 'Point code must match the catalogue/editorial code shape',
  });

/** One point's illustration placement on its region template. */
const coordinateEntrySchema = z.object({
  pointCode,
  regionTemplate: z.enum(REGION_TEMPLATES),
  /** Primary marker in template viewBox space. */
  marker: pointXY,
  /** Label anchor + text rendered via dashed call-out line. */
  label: pointXY.extend({ text: z.string().min(1).max(VALIDATION_LIMITS.TEXT_MAX) }),
  /** Neighbouring points shown dim on the same illustration. */
  neighbors: z.array(pointXY.extend({ pointCode })),
  /** WHO-style location wording carried from the location source. */
  note: z.string().min(VALIDATION_LIMITS.NOTE_MIN),
});

export type CoordinateEntry = z.infer<typeof coordinateEntrySchema>;

export interface TableIssue {
  code?: string;
  problem: string;
}

/**
 * Cross-entry integrity checks over already-parsed entries: duplicate point
 * codes and neighbour references that do not resolve to a table entry throw,
 * so a malformed table fails the build at import instead of shipping.
 * @param entries the parsed point-coordinate records to validate.
 */
export function validateCoordinateTable(entries: readonly CoordinateEntry[]): void {
  const issues: TableIssue[] = [];
  const seen = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.pointCode)) {
      issues.push({ code: entry.pointCode, problem: 'duplicate pointCode' });
    }
    seen.add(entry.pointCode);
  }
  for (const entry of entries) {
    for (const neighbor of entry.neighbors) {
      if (!seen.has(neighbor.pointCode)) {
        issues.push({
          code: entry.pointCode,
          problem: `neighbour ${neighbor.pointCode} is not in the table`,
        });
      }
    }
  }
  if (issues.length > 0) {
    const summary = issues
      .slice(0, VALIDATION_LIMITS.SUMMARY_SLICE)
      .map((i) => `${i.code ?? '?'}: ${i.problem}`)
      .join('; ');
    throw new Error(`Coordinate table invalid (${issues.length} issue(s)): ${summary}`);
  }
}

export { coordinateEntrySchema as CoordinateEntrySchema };
