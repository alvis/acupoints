import { isCataloguePoint } from '@/content/catalog';
import { pointByCode, topPointCodes } from '@/content/points';
import { toSimplified } from '@/utilities/i18n/t2s';

import { NotFoundView } from './NotFoundView';

import type { FC } from 'react';

import type { AnyPoint } from '@/content/schemas';

import type { SuggestedLeaf } from './NotFoundView';

const SUGGESTED_POINT_COUNT = 3;

/** The board suggests the first three of the most-read points. */
const SUGGESTED = topPointCodes.slice(0, SUGGESTED_POINT_COUNT);

const PREGNANCY = /pregnan/iu;

/**
 * Server side of the 404 leaf: resolves the three suggested points from the
 * registry (with Simplified characters, which need the server-only OpenCC
 * tables) and hands them to the locale-aware client view.
 */
export const NotFoundContainer: FC = () => {
  const leaves: SuggestedLeaf[] = [];
  for (const code of SUGGESTED) {
    const point = pointByCode(code);
    if (point) {
      leaves.push(toSuggestion(point));
    }
  }

  return <NotFoundView leaves={leaves} />;
};

/**
 * prepare a registry point for the missing-leaf suggestions.
 * @param point registry point supplying the suggested leaf’s names and cautions
 * @returns a suggested point with both Han scripts, location, and pregnancy-warning flag
 */
function toSuggestion(point: AnyPoint): SuggestedLeaf {
  const catalogue = isCataloguePoint(point);

  return {
    code: point.code,
    hanzi: point.hanzi,
    hanziSimplified: toSimplified(point.hanzi),
    pinyin: point.pinyin,
    location: catalogue ? point.location : point.whoCoordinates,
    pregnancyCaution: catalogue
      ? point.cautions.some((caution) => PREGNANCY.test(caution))
      : !point.pregnancySafe,
  };
}
