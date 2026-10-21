/**
 * Aggregates the per-channel leaf-card modules (see ./schema.ts). Every card
 * is zod-validated at module load, so a line that breaks the editorial
 * screens fails the build rather than shipping.
 */

import { bladderLeaves } from './bladder';
import { duLeaves } from './du';
import { gallbladderLeaves } from './gallbladder';
import { heartLeaves } from './heart';
import { kidneyLeaves } from './kidney';
import { largeIntestineLeaves } from './large-intestine';
import { liverLeaves } from './liver';
import { lungLeaves } from './lung';
import { pericardiumLeaves } from './pericardium';
import { renLeaves } from './ren';
import { sanJiaoLeaves } from './san-jiao';
import { leafCardSchema } from './schema';
import { smallIntestineLeaves } from './small-intestine';
import { spleenLeaves } from './spleen';
import { stomachLeaves } from './stomach';

import type { LeafCard, LeafCardInput } from './schema';

const modules: ReadonlyArray<readonly LeafCardInput[]> = [
  lungLeaves,
  largeIntestineLeaves,
  stomachLeaves,
  spleenLeaves,
  heartLeaves,
  smallIntestineLeaves,
  bladderLeaves,
  kidneyLeaves,
  pericardiumLeaves,
  sanJiaoLeaves,
  gallbladderLeaves,
  liverLeaves,
  duLeaves,
  renLeaves,
];

const cards = new Map<string, LeafCard>(
  modules.flat().map((input) => {
    const card = leafCardSchema.parse(input);

    return [card.code, card];
  }),
);

/**
 * The authored leaf card for a point code, any case.
 * @param code catalogue point identifier.
 * @returns the authored card matching the case-insensitive point code, or undefined.
 */
export function leafCardByCode(code: string): LeafCard | undefined {
  return cards.get(code.toUpperCase());
}

export type { LeafCard };
