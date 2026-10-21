/**
 * Loads one point's registry record, authored leaf card and editorial prose
 * and composes its printed leaf: the phone header, the carved block (card
 * lines and classical quote when a card exists, dataset lines otherwise),
 * the cards under it, the authored commentary, safety notes, FAQ, sources,
 * the colophon and the leaf turn — plus the page's JSON-LD graph, which
 * must quote exactly what renders.
 */

import { conditionBySlug } from '@/content/conditions';
import { pointByCode } from '@/content/points';
import { localLeafCard } from '@/features/points/leafCard';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { fourGatesFor } from './PointLeafContainer';

import type { AnyPoint } from '@/content/schemas';
import type { LeafText } from '@/features/points/labels';
import type { leafPosition } from '@/features/points/volumes';
import type { localizedRoutes, Locale } from '@/utilities/routes';

import type { CardCondition, CardPoint } from './LeafCards';
import type { PointLeafContainerModel } from './pointLeafContainerModel';

/**
 * resolve the neighboring leaves and related condition cards.
 * @param props point record, channel position, locale, and route builders
 * @param props.point point registry entry
 * @param props.position placement within its channel volume
 * @param props.t localized leaf labels and text templates
 * @param props.locale language used for links and copy
 * @param props.r localized route builders for page links
 * @returns the current point card, neighbors, related points, conditions, and Four Gates pairing
 */
export const leafRelations = ({
  point,
  position,
  t,
  locale,
  r,
}: {
  point: AnyPoint;
  position: ReturnType<typeof leafPosition>;
  t: LeafText;
  locale: Locale;
  r: ReturnType<typeof localizedRoutes>;
}): Pick<
  Awaited<PointLeafContainerModel>,
  'current' | 'prev' | 'next' | 'pairs' | 'fourGates' | 'conditions'
> => {
  const card = (p: AnyPoint): CardPoint => ({
    code: p.code,
    name: p.name,
    han: hanFor(p.hanzi, locale),
    href: r.point(p.code),
  });
  const current = card(point);
  const neighbor = (p: AnyPoint): CardPoint => {
    const place = localLeafCard(p.code, locale)?.place;

    return place ? { ...card(p), place } : card(p);
  };
  const prev = position?.prev ? neighbor(position.prev) : undefined;
  const next = position?.next ? neighbor(position.next) : undefined;
  const pairs = point.related
    .map((c) => pointByCode(c))
    .filter((p): p is AnyPoint => p !== undefined)
    .map(card);
  const fourGates = fourGatesFor({ code: point.code, t, pairs, card });
  const conditions: CardCondition[] = point.about
    .filter((ref) => ref.startsWith('condition:'))
    .map((ref) => conditionBySlug(ref.replace('condition:', '')))
    .filter((c): c is NonNullable<typeof c> => c !== undefined)
    .map((c) => ({ slug: c.slug, name: c.name, href: r.condition(c.slug) }));

  return { current, prev, next, pairs, fourGates, conditions };
};
