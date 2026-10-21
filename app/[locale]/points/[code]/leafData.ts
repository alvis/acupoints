/**
 * Pure builders that turn a point's registry record, authored leaf card and
 * editorial arm into the leaf's printed parts: the Where / For / Press /
 * Caution lines, the margin notes that open authored sections, and the
 * colophon record (also served as the leaf's JSON copy). Facts are only ever
 * taken from the registry, catalogue, leaf cards and authored prose — never
 * composed.
 */

import { isCataloguePoint } from '@/content/catalog';
import { toSimplified } from '@/utilities/i18n/t2s';
import { localizedRoutes } from '@/utilities/routes';

import type { EditorialArm } from '@/content/editorial/schema';
import type { AnyPoint, CataloguePoint } from '@/content/schemas';
import type { LeafText } from '@/features/points/labels';
import type { LocalLeafCard } from '@/features/points/leafCard';
import type { LeafPosition } from '@/features/points/volumes';
import type { Locale } from '@/utilities/routes';

import type { LeafLine, LeafNote } from './components/LeafNotes';

type NoteKey = 'where' | 'for' | 'press' | 'caution';

/** The leaf's machine copy: the board's colophon fields plus its address. */
export interface LeafRecord {
  id: string;
  name: Record<'zh-Hant' | 'zh-Hans', string> & { en: string; gloss?: string };
  channel: { id: string; order?: number; of?: number };
  location: { text: string };
  for: string[];
  press?: { text: string; seconds?: number; sides?: 'both'; pressable?: false };
  cautions: string[];
  source?: string;
  url: string;
  lastReviewed: string;
}

/** Authored section ids each margin note opens, in order of preference. */
const NOTE_SECTIONS: Readonly<Record<NoteKey, readonly string[]>> = {
  where: ['finding-it-by-touch', 'where-it-sits'],
  for: ['traditional-use', 'traditional-indications'],
  press: ['self-care-practice', 'self-care-acupressure'],
  caution: ['cautions-safety', 'cautions-and-safe-practice'],
};

/** Inputs for {@link leafLines}. */
export interface LeafLinesInput {
  point: AnyPoint;
  entry?: CataloguePoint;
  arm?: EditorialArm;
  text: LeafText;
  /** The authored leaf card in the page language; its lines win over the dataset's. */
  card?: LocalLeafCard;
  /** Language tag of dataset English on a Chinese page. */
  datasetLang?: string;
}

/**
 * The Where / For / Press (/ Caution) lines, each with the margin note its section supports.
 * @param props registry location and actions with optional authored lines and prose
 * @param props.point point registry entry
 * @param props.entry catalogue metadata for the point
 * @param props.arm localized editorial prose
 * @param props.text localized interface copy
 * @param props.card authored leaf card in the page language, when available
 * @param props.datasetLang language tag for untranslated registry text
 * @returns the location, uses, pressure, and caution lines with linked margin notes
 */
export function leafLines({
  point,
  entry,
  arm,
  text,
  card,
  datasetLang,
}: LeafLinesInput): LeafLine[] {
  if (card) {
    return cardLines(card, arm, text);
  }
  const where =
    entry?.location ?? (isCataloguePoint(point) ? point.location : point.whoCoordinates);
  const actions = entry?.actions ?? [];
  const press = arm ? firstSentence(arm.selfCareLimits) : undefined;
  const lines: LeafLine[] = [
    {
      key: 'where',
      label: text.lines.where,
      text: where,
      lang: datasetLang,
      note: noteFor('where', arm, text),
    },
  ];
  if (actions.length > 0) {
    lines.push({
      key: 'for',
      label: text.lines.for,
      text: `${capitalise(actions.join('; '))}.`,
      lang: datasetLang,
      note: noteFor('for', arm, text),
    });
  }
  if (press) {
    lines.push({
      key: 'press',
      label: text.lines.press,
      text: press,
      note: noteFor('press', arm, text),
    });
  }

  return lines;
}

/** Inputs for {@link leafRecord}. */
export interface ColophonInput {
  point: AnyPoint;
  entry?: CataloguePoint;
  position?: LeafPosition;
  /** The leaf card in the record's language; dataset English fills in without one. */
  card?: LocalLeafCard;
  /** Whether the record is for an English page (quote sources print in English). */
  english: boolean;
  url: string;
  lastReviewed: Date;
}

/**
 * The leaf's machine copy, shaped as the board's colophon: name with gloss,
 * channel place, location, uses, press timing, cautions and the classical
 * source. Card lines (page language) win; dataset English fills in.
 * @param props registry facts, authored card, channel position, and publication details
 * @param props.point point registry entry
 * @param props.entry catalogue metadata for the point
 * @param props.position placement within its channel volume
 * @param props.card authored leaf card in the page language, when available
 * @param props.english whether to use English copy
 * @param props.url canonical page address
 * @param props.lastReviewed date of the latest content review
 * @returns the localized machine record with channel position and press guidance
 */
export function leafRecord({
  point,
  entry,
  position,
  card,
  english,
  url,
  lastReviewed,
}: ColophonInput): LeafRecord {
  const location =
    entry?.location ?? (isCataloguePoint(point) ? point.location : point.whoCoordinates);
  const source = card?.quote ? (english ? card.quote.source.en : card.quote.source.han) : undefined;

  return {
    id: point.code,
    name: {
      'en': point.name,
      ...(card ? { gloss: card.gloss } : {}),
      'zh-Hant': point.hanzi,
      'zh-Hans': toSimplified(point.hanzi),
    },
    channel: position
      ? { id: channelId(point.code), order: position.index, of: position.total }
      : { id: point.meridian },
    location: { text: card?.where ?? location },
    for: card ? listOf(card.for) : (entry?.actions ?? []),
    ...pressRecord(card),
    cautions: card ? (card.caution ? [card.caution] : []) : (entry?.cautions ?? []),
    ...(source ? { source } : {}),
    url,
    lastReviewed: lastReviewed.toISOString().split('T')[0],
  };
}

/**
 * Where a leaf's JSON copy is served: beside the page, since a static export
 * cannot answer `/points/li4.json` while `/points/[code]/` is a page.
 * @param locale language used for links and copy
 * @param code canonical point identifier
 * @returns the localized path to the leaf JSON copy
 */
export function leafJsonPath(locale: Locale, code: string): string {
  return `${localizedRoutes(locale).point(code)}/leaf.json`;
}

/**
 * The leaf's record as pretty-printed JSON for the colophon.
 * @param input registry and editorial values for the record
 * @returns the indented JSON record printed in the colophon
 */
export function colophonRecord(input: ColophonInput): string {
  return JSON.stringify(leafRecord(input), null, 2);
}

/**
 * The card's four lines, each with the margin note its section supports.
 * @param card authored leaf card in the page language, when available
 * @param arm localized editorial prose
 * @param text localized interface copy
 * @returns the authored card lines with links to their commentary
 */
function cardLines(card: LocalLeafCard, arm: EditorialArm | undefined, text: LeafText): LeafLine[] {
  const lines: LeafLine[] = [
    { key: 'where', label: text.lines.where, text: card.where, note: noteFor('where', arm, text) },
    { key: 'for', label: text.lines.for, text: card.for, note: noteFor('for', arm, text) },
    { key: 'press', label: text.lines.press, text: card.press, note: noteFor('press', arm, text) },
  ];
  if (card.caution) {
    lines.push({
      key: 'caution',
      label: text.lines.caution,
      text: card.caution,
      note: noteFor('caution', arm, text),
    });
  }

  return lines;
}

/**
 * link an instruction line to its first supported commentary passage
 * @param key line category used to select the margin note
 * @param arm localized editorial prose
 * @param text localized interface copy
 * @returns the first matching commentary note, when its opening paragraph exists
 */
function noteFor(
  key: NoteKey,
  arm: EditorialArm | undefined,
  text: LeafText,
): LeafNote | undefined {
  const section = NOTE_SECTIONS[key]
    .map((id) => arm?.sections.find((s) => s.id === id))
    .find((s) => s !== undefined);
  const body = section?.paragraphs[0];
  if (!section || !body) {
    return undefined;
  }

  return { lines: text.notes[key], title: section.heading, body, href: `#${section.id}` };
}

/**
 * First sentence of a passage (Latin or Han full stop), the passage itself when it has one.
 * @param passage passage whose opening sentence is used
 * @returns the opening sentence, or the trimmed passage when no full stop matches
 */
function firstSentence(passage: string): string {
  const match = /^.+?(?:\.(?=\s|$)|。)/u.exec(passage.trim());

  return match ? match[0] : passage.trim();
}

/**
 * The channel letters of a code ("LI" of LI4).
 * @param code canonical point identifier
 * @returns the leading channel letters, or the original code when none match
 */
function channelId(code: string): string {
  return /^[A-Z]+/u.exec(code)?.[0] ?? code;
}

/**
 * A card line split into its items: "Headache; pain of the face." → ["headache", "pain of the face"].
 * @param line source line to format
 * @returns the nonempty items with punctuation removed and English initials lowercased
 */
function listOf(line: string): string[] {
  return line
    .replace(/[.。]\s*$/u, '')
    .split(/[;,；，、]/u)
    .map((item, index, all) => {
      const start = index > 0 ? item.trimStart() : item;

      return index < all.length - 1 ? start.trimEnd() : start;
    })
    .filter((item) => item.length > 0)
    .map((item) =>
      /^[A-Z][a-z]/u.test(item) ? item.charAt(0).toLowerCase() + item.slice(1) : item,
    );
}

/**
 * capitalize the initial character of a label.
 * @param value label whose initial character is uppercased
 * @returns the label with its initial character uppercased
 */
function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * include timing fields only when the card provides them.
 * @param card authored leaf card in the page language, when available
 * @returns the authored press guidance and available timing fields, or an empty object
 */
const pressRecord = (card: LocalLeafCard | undefined): Pick<LeafRecord, 'press'> =>
  card
    ? {
        press: {
          text: card.press,
          ...(card.timing.seconds ? { seconds: card.timing.seconds } : {}),
          ...(card.timing.sides ? { sides: card.timing.sides } : {}),
          ...(card.timing.pressable ? {} : { pressable: false as const }),
        },
      }
    : {};
