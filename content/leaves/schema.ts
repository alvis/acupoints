import { z } from 'zod';

import { findBannedMatches } from '../editorial/policy';

/** leaf-card field length and collection limits. */
const VALIDATION_LIMITS = {
  QUOTE_HAN_MIN: 4,
  QUOTE_HAN_MAX: 80,
  QUOTE_EN_MAX: 200,
  SOURCE_HAN_MIN: 3,
  SOURCE_EN_MIN: 3,
  GLOSS_MAX: 40,
  WHERE_BILINGUAL: 140,
  PLACE_BILINGUAL: 40,
  FOR_BILINGUAL: 90,
  PRESS_BILINGUAL: 90,
  CAUTION_BILINGUAL: 90,
} as const;

/**
 * The printed leaf's short lines, authored per point. The registry and the
 * prose triplets carry the full record; a leaf card is the face of the leaf
 * the boards set: a gloss of the name and four plain lines a reader takes in
 * under a minute, in English and in Traditional Chinese (the /zh-cn tree
 * derives its Simplified text at render time).
 */

/**
 * Screens one authored line through the editorial policy.
 * @param max the maximum permitted line length in characters.
 * @returns the bounded string schema that rejects banned editorial language.
 */
const line = (max: number): z.ZodString =>
  z
    .string()
    .min(2)
    .max(max)
    .refine((value) => findBannedMatches(value).length === 0, {
      message: 'Line uses language the editorial policy bans.',
    });

/**
 * One line in both authored scripts; `zh` is Traditional Chinese.
 * @param max the maximum permitted line length in characters.
 * @returns the English and traditional Chinese line schemas.
 */
const bilingual = (max: number): z.ZodObject<{ en: z.ZodString; zh: z.ZodString }> =>
  z.object({ en: line(max), zh: line(Math.ceil(max / 2)) });

/**
 * A verbatim classical line on the point, with its place in the book. Only
 * text checked against a published edition of the classic belongs here.
 */
const quoteSchema = z.object({
  /** The classical text, verbatim, in Traditional characters. */
  han: z.string().min(VALIDATION_LIMITS.QUOTE_HAN_MIN).max(VALIDATION_LIMITS.QUOTE_HAN_MAX),
  /** A plain English rendering of the line. */
  en: line(VALIDATION_LIMITS.QUOTE_EN_MAX),
  /** Book and chapter, e.g. 《靈樞·本輸》 / "Lingshu, chapter 2". */
  source: z.object({
    han: z.string().min(VALIDATION_LIMITS.SOURCE_HAN_MIN),
    en: z.string().min(VALIDATION_LIMITS.SOURCE_EN_MIN),
  }),
});

export const leafCardSchema = z.object({
  code: z.string().regex(/^(LU|LI|ST|SP|HT|SI|BL|KI|PC|TH|GB|LV|GV|CV)\d{1,2}$/u),
  /** The name's meaning in English, e.g. "Joining Valley". */
  gloss: z.string().min(2).max(VALIDATION_LIMITS.GLOSS_MAX),
  /** Where it is, by landmarks a reader can feel. */
  where: bilingual(VALIDATION_LIMITS.WHERE_BILINGUAL),
  /** Where it is in a few words, for the neighbouring-leaf cards: "Behind the index knuckle". */
  place: bilingual(VALIDATION_LIMITS.PLACE_BILINGUAL),
  /** What tradition reached for it for: two or three everyday complaints. */
  for: bilingual(VALIDATION_LIMITS.FOR_BILINGUAL),
  /** How to press it: pressure, time, sides. */
  press: bilingual(VALIDATION_LIMITS.PRESS_BILINGUAL),
  /** The one caution a reader must see before pressing, when there is one. */
  caution: bilingual(VALIDATION_LIMITS.CAUTION_BILINGUAL).optional(),
  quote: quoteSchema.optional(),
});

export type LeafCard = z.infer<typeof leafCardSchema>;
export type LeafCardInput = z.input<typeof leafCardSchema>;
