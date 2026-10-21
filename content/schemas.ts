import { z } from 'zod';

/** catalogue field length and numeric limits. */
const VALIDATION_LIMITS = {
  Q_MIN: 3,
  A_MIN: 3,
  SOURCE_LINE_MIN: 10,
  DIFFICULTY_TO_LOCATE_MAX: 5,
  CANONICAL_ONE_LINER_MAX: 300,
  QUESTION_HEADINGS_MIN: 3,
  FAQS_MIN: 3,
  FAQS_MAX: 5,
  HOW_TO_FIND_MIN: 3,
  CANONICAL_ONE_LINER_MIN: 10,
  LOCATION_MIN: 10,
  QUESTION_MIN: 3,
  ANSWER_MIN: 3,
  FOLLOW_THROUGH_MIN: 3,
} as const;

/** Every MDX content file is parsed through one of these Zod schemas. */

const questionHeading = z.string().regex(/\?$/u, { message: 'Question heading must end with "?"' });

export const faqItem = z.object({
  q: z.string().min(VALIDATION_LIMITS.Q_MIN),
  a: z.string().min(VALIDATION_LIMITS.A_MIN),
});

export const sourceLine = z.string().min(VALIDATION_LIMITS.SOURCE_LINE_MIN);

export const regionSlugs = [
  'head',
  'neck',
  'shoulder',
  'chest',
  'back',
  'arm',
  'hand',
  'leg',
  'foot',
  'ear',
] as const;

export const regionSchema = z.enum(regionSlugs);

export type RegionSlug = z.infer<typeof regionSchema>;

export const pointSchema = z.object({
  code: z.string().regex(/^([A-Z]{1,3}\d{1,3}|EX-[A-Z]{1,2}\d{1,2})$/u),
  name: z.string(),
  pinyin: z.string(),
  hanzi: z.string(),
  meridian: z.string(),
  region: regionSchema.nullish(),
  element: z.enum(['metal', 'wood', 'water', 'fire', 'earth']).optional(),
  category: z.array(z.string()).default([]),
  whoCoordinates: z.string(),
  difficultyToLocate: z.number().int().min(1).max(VALIDATION_LIMITS.DIFFICULTY_TO_LOCATE_MAX),
  pregnancySafe: z.boolean(),
  canonicalOneLiner: z.string().max(VALIDATION_LIMITS.CANONICAL_ONE_LINER_MAX),
  questionHeadings: z.array(questionHeading).min(VALIDATION_LIMITS.QUESTION_HEADINGS_MIN),
  faqs: z.array(faqItem).min(VALIDATION_LIMITS.FAQS_MIN).max(VALIDATION_LIMITS.FAQS_MAX),
  about: z.array(z.string()).default([]),
  sources: z.array(sourceLine).min(1),
  lastReviewed: z.coerce.date(),
  howToFind: z.array(z.string()).min(VALIDATION_LIMITS.HOW_TO_FIND_MIN),
  body: z.array(z.object({ heading: z.string(), content: z.string() })),
  related: z.array(z.string()).default([]),
});

export type Point = z.infer<typeof pointSchema>;

/** The 14 classical meridian slugs, pinned to `content/meridians.ts`. */
export const meridianSlugs = [
  'lung',
  'large-intestine',
  'stomach',
  'spleen',
  'heart',
  'small-intestine',
  'bladder',
  'kidney',
  'pericardium',
  'san-jiao',
  'gallbladder',
  'liver',
  'du',
  'ren',
] as const;

export const meridianSlugSchema = z.enum(meridianSlugs);
export type MeridianSlug = z.infer<typeof meridianSlugSchema>;

/**
 * A classical catalogue point compiled from the licensed composite dataset
 * (see `content/catalog/README.md`). Editorial `Point` pages carry authored
 * FAQs, how-to-find steps, and review metadata; catalogue entries carry only
 * fields citable to the dataset: identity, WHO-style location, point class,
 * actions, and cautions. Fields that cannot be cited from the dataset are
 * omitted rather than invented. `about` and `region` exist so both shapes
 * share the registry surface consumed by list contexts; catalogue data
 * leaves them empty.
 */
export const cataloguePointSchema = z.object({
  code: z.string().regex(/^(LU|LI|ST|SP|HT|SI|BL|KI|PC|TH|GB|LV|GV|CV)\d{1,2}$/u),
  name: z.string().min(1),
  pinyin: z.string().min(1),
  hanzi: z.string().min(1),
  meridian: meridianSlugSchema,
  number: z.number().int().min(1),
  canonicalOneLiner: z
    .string()
    .min(VALIDATION_LIMITS.CANONICAL_ONE_LINER_MIN)
    .max(VALIDATION_LIMITS.CANONICAL_ONE_LINER_MAX),
  location: z.string().min(VALIDATION_LIMITS.LOCATION_MIN),
  category: z.array(z.string()).default([]),
  actions: z.array(z.string()).default([]),
  cautions: z.array(z.string()).default([]),
  about: z.array(z.string()).default([]),
  region: regionSchema.nullish(),
  related: z.array(z.string()).default([]),
  sources: z.array(sourceLine).min(1),
  lastReviewed: z.coerce.date(),
});

export type CataloguePoint = z.infer<typeof cataloguePointSchema>;

/** Input shape for authoring catalogue modules; defaults are applied by parse. */
export type CatalogueInput = z.input<typeof cataloguePointSchema>;

/**
 * Any registry entry: an editorially authored point or a compiled catalogue
 * point. List contexts (sitemap, feed, llms.txt, cards, search) consume the
 * shared surface; the detail page narrows via `isCataloguePoint`.
 */
export type AnyPoint = Point | CataloguePoint;

export const meridianSchema = z.object({
  slug: z.string(),
  name: z.string(),
  pinyin: z.string(),
  hanzi: z.string(),
  element: z.enum(['metal', 'wood', 'water', 'fire', 'earth']),
  pointCount: z.number().int(),
  canonicalOneLiner: z.string().max(VALIDATION_LIMITS.CANONICAL_ONE_LINER_MAX),
});
export type Meridian = z.infer<typeof meridianSchema>;

export const conditionOpenerSchema = z.object({
  question: z.string().min(VALIDATION_LIMITS.QUESTION_MIN),
  answer: z.string().min(VALIDATION_LIMITS.ANSWER_MIN),
  followThrough: z.string().min(VALIDATION_LIMITS.FOLLOW_THROUGH_MIN).optional(),
});
export type ConditionOpener = z.infer<typeof conditionOpenerSchema>;

export const conditionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  canonicalOneLiner: z.string().max(VALIDATION_LIMITS.CANONICAL_ONE_LINER_MAX),
  /**
   * Ordered point codes the condition leads with, ahead of the codes its prose
   * cites. The codes must exist in the point registry; unknown codes are
   * dropped at render time.
   */
  pickerPoints: z.array(z.string()).optional(),
});
export type Condition = z.infer<typeof conditionSchema>;
