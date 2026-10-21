/**
 * Loads one point's registry record, authored leaf card and editorial prose
 * and composes its printed leaf: the phone header, the carved block (card
 * lines and classical quote when a card exists, dataset lines otherwise),
 * the cards under it, the authored commentary, safety notes, FAQ, sources,
 * the colophon and the leaf turn — plus the page's JSON-LD graph, which
 * must quote exactly what renders.
 */

import { fill } from '@/features/points/format';

import { CautionStrip } from './CautionStrip';

import type { ReactNode } from 'react';

import type { loadProseRegistry } from '@/content/pages';
import type { AnyPoint } from '@/content/schemas';
import type { LeafText } from '@/features/points/labels';
import type { LocalLeafCard } from '@/features/points/leafCard';
import type { catalogueEntry } from '@/features/points/volumes';
import type { getDictionary } from '@/utilities/i18n/dictionaries';

import type { FourGates } from './LeafCards';

/** source content used to select the leaf's safety notes. */
interface CautionInputs {
  ed: ReturnType<Awaited<ReturnType<typeof loadProseRegistry>>['pointByCode']>;
  legacy: Extract<AnyPoint, { pregnancySafe: boolean }> | undefined;
  point: AnyPoint;
  t: LeafText;
  dict: ReturnType<typeof getDictionary>;
  datasetLang: string | undefined;
  entry: ReturnType<typeof catalogueEntry>;
  leafCard: LocalLeafCard | undefined;
  fourGates: FourGates | undefined;
}
/**
 * select authored margin notes and the recorded safety cautions.
 * @param props editorial and registry safety sources
 * @param props.ed published editorial module for this point, when available
 * @param props.legacy legacy authored point record, when no editorial module is available
 * @param props.point point registry entry
 * @param props.t localized leaf labels and text templates
 * @param props.dict site interface strings for safety notices, questions, and search
 * @param props.datasetLang language tag for untranslated registry text
 * @param props.entry catalogue metadata for the point
 * @param props.leafCard localized instructions and timing
 * @param props.fourGates the hand and foot pairing with its localized labels
 * @returns the margin caution markup, recorded cautions, language, and fallback notice flag
 */
export const leafCautions = ({
  ed,
  legacy,
  point,
  t,
  dict,
  datasetLang,
  entry,
  leafCard,
  fourGates,
}: CautionInputs): {
  aboveBlock: ReactNode;
  recordedCautions: string[];
  infoNote: boolean;
  cautionsTitle: string;
  cautionsLang: string | undefined;
} => {
  const legacyOnly = !ed && legacy !== undefined;
  const pregnancy =
    legacy && !legacy.pregnancySafe ? [fill(t.pregnancyBody, { name: point.name })] : [];
  const cautionItems = ed
    ? ed.echoedDatasetCautions
    : legacyOnly
      ? pregnancy
      : (entry?.cautions ?? []);
  const cautionsTitle = legacyOnly ? t.pregnancyTitle : dict.disclaimers.cautionsTitle;
  const cautionsLang = legacyOnly ? undefined : datasetLang;
  // With a card, the margin carries its caution (and the Four Gates pairing)
  // and the dataset's cautions move below the commentary as recorded.
  const marginItems = marginFor({ leafCard, fourGates, point, t }, cautionItems);
  const aboveBlock: ReactNode =
    marginItems.length > 0 ? (
      <CautionStrip
        items={marginItems}
        lang={leafCard ? undefined : cautionsLang}
        title={leafCard ? t.margin : cautionsTitle}
      />
    ) : undefined;
  const recordedCautions = leafCard ? cautionItems : [];
  const infoNote = !ed && cautionItems.length === 0;

  return { aboveBlock, recordedCautions, infoNote, cautionsTitle, cautionsLang };
};

/**
 * choose the authored caution and Four Gates pairing for the margin.
 * @param props authored leaf card and optional Four Gates partner
 * @param props.leafCard localized instructions and timing
 * @param props.fourGates the hand and foot pairing with its localized labels
 * @param props.point point registry entry
 * @param props.t localized leaf labels and text templates
 * @param fallback recorded cautions used when no authored leaf card exists
 * @returns the authored caution and pairing notes, or the recorded fallback cautions
 */
const marginFor = (
  { leafCard, fourGates, point, t }: Pick<CautionInputs, 'leafCard' | 'fourGates' | 'point' | 't'>,
  fallback: string[],
): string[] => {
  const gatesPartner = fourGates?.gates.find((g) => g.point.code !== point.code)?.point;
  const marginItems = leafCard
    ? [
        leafCard.caution,
        gatesPartner ? fill(t.fourGates.margin, { han: gatesPartner.han }) : undefined,
      ].filter((item): item is string => item !== undefined)
    : fallback;

  return marginItems;
};
