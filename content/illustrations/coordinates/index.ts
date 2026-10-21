import { points } from '../../points';

import { bladderCoordinates } from './bladder';
import { CURATED_COORDINATES } from './curated';
import { duCoordinates } from './du';
import { FIGURE_EXTRA_POINTS, FIGURE_POINTS } from './figure';
import { gallbladderCoordinates } from './gallbladder';
import { heartCoordinates } from './heart';
import { kidneyCoordinates } from './kidney';
import { largeIntestineCoordinates } from './large-intestine';
import { liverCoordinates } from './liver';
import { lungCoordinates } from './lung';
import { pericardiumCoordinates } from './pericardium';
import { renCoordinates } from './ren';
import { sanJiaoCoordinates } from './san-jiao';
import { CoordinateEntrySchema, validateCoordinateTable } from './schema';
import { smallIntestineCoordinates } from './small-intestine';
import { spleenCoordinates } from './spleen';
import { stomachCoordinates } from './stomach';

import type { CoordinateEntry } from './schema';

/** maximum coordinate validation details included in thrown errors. */
const VALIDATION_LIMITS = {
  MAX_ISSUE_DETAILS: 10,
  MAX_FIGURE_ISSUE_DETAILS: 10,
} as const;

/**
 * EX-HN5 (Taiyang) derived from the curated provenance module rather than
 * re-declared. The 20-entry `curated.ts` is otherwise excluded from the live
 * table — its entries are already re-transcribed channel by channel — but
 * Taiyang has no meridian file, so its single entry is carried here to
 * satisfy the coverage guard over the full published registry. Deriving it
 * keeps one source of truth; the import-time check below turns any removal
 * from `curated.ts` into a build failure instead of a silent coverage gap.
 */
const EX_HN5_ENTRY = CURATED_COORDINATES.find((entry) => entry.pointCode === 'EX-HN5');
if (!EX_HN5_ENTRY) {
  throw new Error(
    'EX-HN5 missing from curated provenance module (content/illustrations/coordinates/curated.ts)',
  );
}

/**
 * Full coordinate table — one entry per published point page (361 catalogue
 * codes plus editorial EX-HN5). Every entry is zod-parsed at import so a
 * malformed placement fails the build; `validateCoordinateTable` then throws
 * on duplicate codes or dangling neighbour references.
 */
export const coordinateTable: readonly CoordinateEntry[] = [
  ...bladderCoordinates,
  ...duCoordinates,
  ...gallbladderCoordinates,
  ...heartCoordinates,
  ...kidneyCoordinates,
  ...largeIntestineCoordinates,
  ...liverCoordinates,
  ...lungCoordinates,
  ...pericardiumCoordinates,
  ...renCoordinates,
  ...sanJiaoCoordinates,
  ...smallIntestineCoordinates,
  ...spleenCoordinates,
  ...stomachCoordinates,
  EX_HN5_ENTRY,
].map((entry) => CoordinateEntrySchema.parse(entry));

validateCoordinateTable(coordinateTable);

/** Coverage guard: the table must cover exactly the published registry. */
function assertRegistryCoverage(): void {
  const tableCodes = new Set(coordinateTable.map((e) => e.pointCode));
  const registryCodes = new Set(points.map((p) => p.code.toUpperCase()));
  const missing = [...registryCodes].filter((code) => !tableCodes.has(code));
  const extra = [...tableCodes].filter((code) => !registryCodes.has(code));
  if (missing.length > 0 || extra.length > 0) {
    const detail = [
      ...missing.slice(0, VALIDATION_LIMITS.MAX_ISSUE_DETAILS).map((code) => `missing ${code}`),
      ...extra.slice(0, VALIDATION_LIMITS.MAX_ISSUE_DETAILS).map((code) => `extra ${code}`),
    ].join('; ');
    throw new Error(
      `Coordinate table does not match the point registry (${missing.length} missing, ${extra.length} extra): ${detail}`,
    );
  }
}
assertRegistryCoverage();

/** Fast lookup for renderers; every registry code resolves after the guards above. */
export const coordinateByCode: ReadonlyMap<string, CoordinateEntry> = new Map(
  coordinateTable.map((entry) => [entry.pointCode, entry]),
);

/** Coverage guard: every registry code has exactly one place on the whole figure. */
function assertFigureCoverage(): void {
  const codes = [...Object.values(FIGURE_POINTS).flat(), ...FIGURE_EXTRA_POINTS].map((p) => p.code);
  const registryCodes = new Set(points.map((p) => p.code.toUpperCase()));
  const seen = new Set(codes);
  const problems = [
    ...[...registryCodes].filter((code) => !seen.has(code)).map((code) => `missing ${code}`),
    ...[...seen].filter((code) => !registryCodes.has(code)).map((code) => `extra ${code}`),
    ...(seen.size === codes.length ? [] : ['duplicate codes']),
  ];
  if (problems.length > 0) {
    throw new Error(
      `Figure table does not match the point registry: ${problems.slice(0, VALIDATION_LIMITS.MAX_FIGURE_ISSUE_DETAILS).join('; ')}`,
    );
  }
}
assertFigureCoverage();
