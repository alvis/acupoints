/**
 * Loads one point's registry record, authored leaf card and editorial prose
 * and composes its printed leaf: the phone header, the carved block (card
 * lines and classical quote when a card exists, dataset lines otherwise),
 * the cards under it, the authored commentary, safety notes, FAQ, sources,
 * the colophon and the leaf turn — plus the page's JSON-LD graph, which
 * must quote exactly what renders.
 */

import { fill } from '@/features/points/format';

import type { AnyPoint } from '@/content/schemas';
import type { LeafText } from '@/features/points/labels';
import type { getDictionary } from '@/utilities/i18n/dictionaries';
import type { armForLocale } from '@/utilities/i18n/locale-text';

import type { CommentarySection, ContentsEntry } from './LeafCommentary';

/**
 * assemble commentary, questions, and the matching contents links.
 * @param props editorial and legacy prose with localized section headings
 * @param props.arm localized editorial prose
 * @param props.legacy legacy authored point record, when no editorial module is available
 * @param props.dict site interface strings for safety notices, questions, and search
 * @param props.t localized leaf labels and text templates
 * @returns the authored or legacy commentary, questions, and contents links
 */
export const leafCommentary = ({
  arm,
  legacy,
  dict,
  t,
}: {
  arm: ReturnType<typeof armForLocale> | undefined;
  legacy: Extract<AnyPoint, { pregnancySafe: boolean }> | undefined;
  dict: ReturnType<typeof getDictionary>;
  t: LeafText;
}): {
  sections: CommentarySection[];
  faqs: Array<{ q: string; a: string }>;
  contents: ContentsEntry[];
} => {
  const sections: CommentarySection[] = arm
    ? arm.sections
    : legacy
      ? [
          {
            id: 'how-to-find',
            heading: fill(t.howToFind, { n: legacy.howToFind.length }),
            paragraphs: legacy.howToFind,
          },
          ...legacy.body.map((s, i) => ({
            id: `part-${i + 1}`,
            heading: s.heading,
            paragraphs: [s.content],
          })),
        ]
      : [];
  const faqs = arm?.faqs ?? legacy?.faqs ?? [];
  const contents: ContentsEntry[] = [
    ...sections.map((s) => ({ href: `#${s.id}`, label: s.heading })),
    ...(faqs.length > 0 ? [{ href: '#faq-heading', label: dict.faqHeading }] : []),
    { href: '#sources-heading', label: t.sources.label },
  ];

  return { sections, faqs, contents };
};
