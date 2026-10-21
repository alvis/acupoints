import { z } from 'zod';

import { conditionOpenerSchema } from './schemas';

import type { ConditionOpener } from './schemas';

/** glossary field length limits. */
const VALIDATION_LIMITS = {
  ONE_LINER_MIN: 10,
} as const;

/** Schema for a glossary entry in content/glossary.ts. */
export const glossaryEntrySchema = z.object({
  term: z.string().min(2),
  slug: z.string().min(2),
  oneLiner: z.string().min(VALIDATION_LIMITS.ONE_LINER_MIN),
  /** Optional F · Q→A opener. Same shape as condition openers. */
  opener: conditionOpenerSchema.optional(),
  /**
   * Optional long-form body. Each string is a paragraph that may include
   * trusted inline HTML (e.g. <em>). The detail page renders these under
   * `prose-editorial`.
   */
  body: z.array(z.string()).optional(),
  /** Slugs of other glossary entries to cross-link at the bottom of the page. */
  relatedTerms: z.array(z.string()).optional(),
});

export type GlossaryEntry = z.infer<typeof glossaryEntrySchema>;

/**
 * Sitewide glossary. Keep entries short and plain-English; add an `opener`
 * when the entry has a natural Q→A framing.
 */
export const glossary: GlossaryEntry[] = [
  {
    term: 'De qi',
    slug: 'de-qi',
    oneLiner:
      'De qi (得氣) is the dull, heavy, or radiating sensation that signals a classical acupoint has been correctly located.',
    opener: {
      question: 'What does "de qi" feel like?',
      answer:
        'A steady, dull, heavy, or radiating sensation — not a sharp prick. If a press feels sharp, you are on tissue, not the point.',
      followThrough:
        'Classical texts describe de qi as the arrival of qi at a point. In self-acupressure the cue is the same: look for a spreading heaviness that settles, rather than a focal stab.',
    },
    body: [
      'Classical texts describe <em>de qi</em> as the arrival of qi at a point. Practically, the reader feels a distinct heaviness or spread that is different from the surface prick of a needle or the sharp pain of a miss.',
      'For self-acupressure, the same principle applies in miniature: you are looking for a steady, sometimes radiating sensation rather than a sharp point. If a press feels sharp, you are likely on tissue, not the point — ease up, shift slightly, and try again.',
    ],
  },
  {
    term: 'Yuan-source point',
    slug: 'yuan-source',
    oneLiner:
      'A yuan-source point is a classical “origin” point on each primary meridian, used to reach the organ it governs.',
  },
  {
    term: 'Cun',
    slug: 'cun',
    oneLiner:
      'Cun (寸) is a body-proportional unit of measurement used to locate acupoints, roughly the width of the patient’s own thumb at the knuckle.',
  },
];

/**
 * find a glossary entry by its route key.
 * @param slug route identifier.
 * @returns the glossary entry with that slug, or undefined.
 */
export function glossaryBySlug(slug: string): GlossaryEntry | undefined {
  return glossary.find((g) => g.slug === slug);
}

/** Re-export for pages that render both conditions and glossary openers. */
export type { ConditionOpener };
