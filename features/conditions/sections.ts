/**
 * Which prose section plays which role on a condition page: the routine, the
 * traditional rationale and the red flags. The prose files name these
 * sections differently, so each condition's anchors are mapped explicitly.
 */

import type { EditorialArm, EditorialSection } from '@/content/editorial/schema';

/** A prose section that plays a fixed role on the condition page. */
export type SectionRole = 'routine' | 'tradition' | 'help';

/**
 * Section anchors per condition for each page role. The prose files name
 * these sections differently, so the mapping is explicit rather than guessed.
 */
const SECTION_ROLES: Record<SectionRole, Readonly<Record<string, string>>> = {
  routine: {
    'tension-headache': 'gentle-routine',
    'anxiety': 'self-care-routine',
    'insomnia': 'evening-routine',
    'travel-nausea': 'a-routine-for-the-road',
    'period-pain': 'a-gentle-routine',
    'back-pain': 'gentle-routine',
    'desk-neck-shoulder': 'gentle-routine',
    'nausea-after-treatment': 'gentle-routine',
    'bloating': 'gentle-routine',
    'constipation': 'gentle-routine',
    'knee-arthritis': 'gentle-routine',
    'after-stroke-limbs': 'gentle-routine',
    'fatigue': 'gentle-routine',
    'labour-pain': 'partner-routine',
  },
  tradition: {
    'tension-headache': 'traditional-reach',
    'anxiety': 'traditional-reach',
    'insomnia': 'tradition-approach',
    'travel-nausea': 'what-tradition-reached-for',
    'period-pain': 'what-tradition-reached-for',
    'back-pain': 'traditional-view',
    'desk-neck-shoulder': 'traditional-reach',
    'nausea-after-treatment': 'traditional-reach',
    'bloating': 'traditional-reach',
    'constipation': 'traditional-reach',
    'knee-arthritis': 'traditional-reach',
    'after-stroke-limbs': 'traditional-reach',
    'fatigue': 'traditional-reach',
    'labour-pain': 'traditional-reach',
  },
  help: {
    'tension-headache': 'when-self-care-is-not-enough',
    'anxiety': 'limits-and-red-flags',
    'insomnia': 'red-flags',
    'travel-nausea': 'when-to-seek-care',
    'period-pain': 'clear-boundaries',
    'back-pain': 'red-flags',
    'desk-neck-shoulder': 'when-self-care-is-not-enough',
    'nausea-after-treatment': 'when-self-care-is-not-enough',
    'bloating': 'when-self-care-is-not-enough',
    'constipation': 'when-self-care-is-not-enough',
    'knee-arthritis': 'when-self-care-is-not-enough',
    'after-stroke-limbs': 'when-self-care-is-not-enough',
    'fatigue': 'when-self-care-is-not-enough',
    'labour-pain': 'when-to-call',
  },
};

/**
 * Anchor of the prose section that plays `role` for a condition.
 * @param slug registry key to look up
 * @param role semantic purpose of the section
 * @returns the section anchor, when mapped
 */
export function sectionId(slug: string, role: SectionRole): string | undefined {
  return SECTION_ROLES[role][slug];
}

/**
 * The prose section that plays `role` for a condition, in an already-resolved arm.
 * @param arm localized editorial content
 * @param slug registry key to look up
 * @param role semantic purpose of the section
 * @returns the corresponding prose section, when found
 */
export function sectionIn(
  arm: EditorialArm,
  slug: string,
  role: SectionRole,
): EditorialSection | undefined {
  const id = sectionId(slug, role);

  return id ? arm.sections.find((section) => section.id === id) : undefined;
}
