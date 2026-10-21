/**
 * Sitewide TCM-basics catalogue. Extracted from the basics detail page so the
 * sitemap, llms.txt, and the page itself share one source of slugs and copy.
 */

interface BasicOpener {
  question: string;
  answer: string;
  followThrough?: string;
}

export interface SeededBasic {
  title: string;
  oneLiner: string;
  body: string[];
  opener?: BasicOpener;
}

export interface BasicSummary {
  label: string;
  oneLiner: string;
}

const SEEDED: Partial<Record<string, SeededBasic>> = {
  'what-is-qi': {
    title: 'What is qi?',
    oneLiner:
      'Qi (氣) in Traditional Chinese Medicine refers to the body’s capacity for coordinated movement and change — not a mystical energy, but a practical descriptor for function.',
    opener: {
      question: 'What does "qi" actually mean in clinic?',
      answer:
        "In practical TCM, qi is shorthand for the body's functional activity — not a mystical substance.",
      followThrough:
        'Classical texts describe qi as the functioning of tissues and organs. When a practitioner “regulates qi,” they’re adjusting a functional pattern, not manipulating a supernatural field.',
    },
    body: [
      'The word <em>qi</em> is often translated as &ldquo;energy,&rdquo; but the sense classical writers intended is closer to &ldquo;functioning.&rdquo; When a Chinese physician says the spleen&rsquo;s qi is weak, they do not mean the organ contains less mystical essence. They mean it is not doing its job well — in this case, transforming food into usable nourishment.',
      'You can read qi as a verb masquerading as a noun: breath, circulation, digestion, and warmth are all expressions of qi at work. If you have ever felt the difference between a well-rested morning and a jet-lagged one, you already have a working intuition for it.',
      'We use the term on this site because it is the shortest word that carries the original clinical meaning. Where a modern biomechanical term fits better, we use that instead.',
    ],
  },
};

const OTHER: Partial<Record<string, BasicSummary>> = {
  'yin-and-yang': {
    label: 'Yin and yang',
    oneLiner:
      'Yin and yang in TCM are descriptive lenses — not moral opposites — for tracking paired dynamics like cold/warm, quiet/active, interior/exterior.',
  },
  'five-elements': {
    label: 'The five elements',
    oneLiner:
      'The five elements — wood, fire, earth, metal, water — are a classical relational model linking organs, emotions, and seasons.',
  },
};

/** Slugs of every basics entry that ships a static page. */
export const basicSlugs: readonly string[] = [...Object.keys(SEEDED), ...Object.keys(OTHER)];

/**
 * look up an authored introductory lesson.
 * @param slug route identifier.
 * @returns the authored lesson, when available.
 */
export function seededBasicBySlug(slug: string): SeededBasic | undefined {
  return SEEDED[slug];
}

/**
 * look up an unseeded lesson summary.
 * @param slug route identifier.
 * @returns the lesson summary, when available.
 */
export function basicSummaryBySlug(slug: string): BasicSummary | undefined {
  return OTHER[slug];
}

/**
 * Display title for any basics slug, whether fully written or summary-only.
 * @param slug route identifier.
 * @returns the lesson title or summary label, when the slug exists.
 */
export function basicTitleBySlug(slug: string): string | undefined {
  return SEEDED[slug]?.title ?? OTHER[slug]?.label;
}

/**
 * One-line description for any basics slug, drawn from whichever tier holds it.
 * @param slug route identifier.
 * @returns the lesson's one-line description, when the slug exists.
 */
export function basicOneLinerBySlug(slug: string): string | undefined {
  return SEEDED[slug]?.oneLiner ?? OTHER[slug]?.oneLiner;
}
