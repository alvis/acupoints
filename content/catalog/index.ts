/**
 * Aggregates the per-meridian catalogue modules into one registry. Every
 * entry is zod-validated at module load; see README.md for dataset and
 * licensing provenance.
 */

import { bladderPoints } from './bladder';
import { duPoints } from './du';
import { gallbladderPoints } from './gallbladder';
import { HANT_NAMES } from './hant-names';
import { heartPoints } from './heart';
import { kidneyPoints } from './kidney';
import { largeIntestinePoints } from './large-intestine';
import { liverPoints } from './liver';
import { lungPoints } from './lung';
import { pericardiumPoints } from './pericardium';
import { renPoints } from './ren';
import { sanJiaoPoints } from './san-jiao';
import { smallIntestinePoints } from './small-intestine';
import { spleenPoints } from './spleen';
import { stomachPoints } from './stomach';

import type { CataloguePoint } from '../schemas';

/** All 361 classical catalogue points ordered by canonical meridian sequence. */
export const catalogue: CataloguePoint[] = [
  ...lungPoints,
  ...largeIntestinePoints,
  ...stomachPoints,
  ...spleenPoints,
  ...heartPoints,
  ...smallIntestinePoints,
  ...bladderPoints,
  ...kidneyPoints,
  ...pericardiumPoints,
  ...sanJiaoPoints,
  ...gallbladderPoints,
  ...liverPoints,
  ...duPoints,
  ...renPoints,
].map(withHantName);

/**
 * Authored points store traditional hanzi; bring catalogue entries onto the same script.
 * @param point catalogue entry to describe.
 * @returns the catalogue point with its traditional name when a mapping exists.
 */
function withHantName(point: CataloguePoint): CataloguePoint {
  const hanzi = HANT_NAMES[point.code];

  return hanzi ? { ...point, hanzi } : point;
}

/**
 * Narrows a registry entry to a compiled catalogue point.
 * @param point catalogue entry to describe.
 * @returns whether the value has the compiled catalogue's location and actions fields.
 */
export function isCataloguePoint(point: unknown): point is CataloguePoint {
  return typeof point === 'object' && point !== null && 'location' in point && 'actions' in point;
}
