import { z } from 'zod';

import { faqItem, sourceLine } from '../schemas';

import {
  findBannedMatches,
  HUB_TIERS,
  POINT_WORD_FLOOR,
  POINT_ZH_CHAR_FLOOR,
  POLICY_VERSION,
  SOURCE_TOKENS,
} from './policy';

import type { HubKind } from './policy';

/** editorial text length and collection size limits. */
const VALIDATION_LIMITS = {
  HEADING_MIN: 3,
  PARAGRAPHS_MIN: 40,
  AUTHORED_BY_MIN: 3,
  SUMMARY_MIN: 60,
  SUMMARY_MAX: 400,
  SECTIONS_MIN: 5,
  FAQS_MIN: 3,
  FAQS_MAX: 8,
  SELF_CARE_LIMITS_MIN: 40,
  TITLE_MIN: 3,
} as const;

/**
 * Zod shapes for authored editorial-layer modules. Every module is parsed
 * through one of these at registration time in ./index.ts, so `pnpm build`
 * is the enforcement gate: floors, banned-pattern screens, and authorship
 * metadata all fail loudly instead of shipping.
 */

const sectionBlock = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/u),
  heading: z.string().min(VALIDATION_LIMITS.HEADING_MIN),
  paragraphs: z.array(z.string().min(VALIDATION_LIMITS.PARAGRAPHS_MIN)).min(2),
});

export const authorshipSchema = z.object({
  authoredBy: z.string().min(VALIDATION_LIMITS.AUTHORED_BY_MIN),
  method: z.literal('dual-witness-authored'),
  generatedAt: z.coerce.date(),
  reviewStatus: z.enum(['draft', 'sample-reviewed', 'approved']),
  reviewer: z.string().optional(),
  policyVersion: z.literal(POLICY_VERSION),
});

/**
 * Counts whitespace-separated words across a locale arm's prose fields.
 * @param value the prose text to count.
 * @returns the number of nonempty whitespace-separated words.
 */
function countWords(value: string): number {
  return value.split(/\s+/u).filter(Boolean).length;
}

/**
 * Counts CJK characters across a locale arm's prose fields.
 * @param value the prose text to count.
 * @returns the number of CJK ideographs in the string.
 */
function countCjkChars(value: string): number {
  return value.match(/[一-鿿]/gu)?.length ?? 0;
}

interface ArmProse {
  summary: string;
  sections: Array<{ heading: string; paragraphs: readonly string[] }>;
  faqs: Array<{ q: string; a: string }>;
  /**
   * Screened by the banned-pattern gate like every other prose field, but
   * deliberately excluded from word/hanzi floors: safety boilerplate must
   * never be stretched to hit a count.
   */
  selfCareLimits: string;
}

/**
 * Collects every prose string a floor must cover (selfCareLimits excluded by policy).
 * @param arm the authored prose arm to inspect.
 * @returns the summary, headings, paragraphs, and FAQ text counted by prose floors.
 */
function armProseStrings(arm: ArmProse): string[] {
  return [
    arm.summary,
    ...arm.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ...arm.faqs.flatMap((faq) => [faq.q, faq.a]),
  ];
}

type LocaleArmSchema = z.ZodObject<{
  summary: z.ZodString;
  sections: z.ZodArray<typeof sectionBlock>;
  faqs: z.ZodArray<typeof faqItem>;
  selfCareLimits: z.ZodString;
}>;

type HubModuleSchema<T extends HubKind> = z.ZodObject<{
  slug: z.ZodString;
  kind: z.ZodLiteral<T>;
  title: z.ZodString;
  publishedAt: z.ZodCoercedDate<unknown> | z.ZodOptional<z.ZodCoercedDate<unknown>>;
  updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
  authorship: typeof authorshipSchema;
  sources: z.ZodArray<typeof sourceLine>;
  lastReviewed: z.ZodCoercedDate<unknown>;
  ogImage: z.ZodOptional<z.ZodString>;
  en: LocaleArmSchema;
  zh: LocaleArmSchema;
}>;

/**
 * Locale arms are FACTORIES because the word/character floors differ by hub
 * tier (see ./policy.ts). Both arms share the same object shape.
 * @param minWords the minimum English prose word count.
 * @returns the English prose schema enforcing the requested word floor.
 */
export const makeEnArmSchema = (minWords: number): LocaleArmSchema =>
  z
    .object({
      summary: z.string().min(VALIDATION_LIMITS.SUMMARY_MIN).max(VALIDATION_LIMITS.SUMMARY_MAX), // speakable lead
      sections: z.array(sectionBlock).min(VALIDATION_LIMITS.SECTIONS_MIN),
      faqs: z.array(faqItem).min(VALIDATION_LIMITS.FAQS_MIN).max(VALIDATION_LIMITS.FAQS_MAX), // reuse ../schemas.ts FAQ shape
      selfCareLimits: z.string().min(VALIDATION_LIMITS.SELF_CARE_LIMITS_MIN), // mandatory even with zero cautions
    })
    .superRefine((arm, ctx) => {
      const words = armProseStrings(arm).reduce((sum, value) => sum + countWords(value), 0);
      if (words < minWords) {
        ctx.addIssue({
          code: 'custom',
          message: `English prose is ${words} words; policy floor is ${minWords}.`,
        });
      }
    });

export const makeZhArmSchema = (minChars: number): LocaleArmSchema =>
  z
    .object({
      summary: z.string().min(VALIDATION_LIMITS.SUMMARY_MIN).max(VALIDATION_LIMITS.SUMMARY_MAX),
      sections: z.array(sectionBlock).min(VALIDATION_LIMITS.SECTIONS_MIN),
      faqs: z.array(faqItem).min(VALIDATION_LIMITS.FAQS_MIN).max(VALIDATION_LIMITS.FAQS_MAX),
      selfCareLimits: z.string().min(VALIDATION_LIMITS.SELF_CARE_LIMITS_MIN),
    })
    .superRefine((arm, ctx) => {
      const chars = armProseStrings(arm).reduce((sum, value) => sum + countCjkChars(value), 0);
      if (chars < minChars) {
        ctx.addIssue({
          code: 'custom',
          message: `Chinese prose carries ${chars} hanzi; policy floor is ${minChars}.`,
        });
      }
    });

/**
 * Runs the banned-pattern screen over every prose string of one locale arm.
 * @param arm the authored prose arm to inspect.
 * @param ctx the editorial validation issue collector.
 * @param locale language used for text and routes.
 */
function screenArm(arm: ArmProse, ctx: z.RefinementCtx, locale: 'en' | 'zh'): void {
  for (const [field, value] of armProseEntries(arm)) {
    for (const match of findBannedMatches(value)) {
      ctx.addIssue({
        code: 'custom',
        message: `Banned pattern ${JSON.stringify(match)} in ${locale}.${field} (policy v1 forbids it).`,
      });
    }
  }
}

/**
 * collect addressable prose fields for editorial validation.
 * @param arm the authored prose arm to inspect.
 * @returns the prose field paths paired with their text for validation issues.
 */
function armProseEntries(arm: ArmProse): Array<[string, string]> {
  const entries: Array<[string, string]> = [['summary', arm.summary]];
  arm.sections.forEach((section, i) => {
    entries.push([`sections[${i}].heading`, section.heading]);
    section.paragraphs.forEach((paragraph, j) => {
      entries.push([`sections[${i}].paragraphs[${j}]`, paragraph]);
    });
  });
  arm.faqs.forEach((faq, i) => {
    entries.push([`faqs[${i}].q`, faq.q], [`faqs[${i}].a`, faq.a]);
  });
  entries.push(['selfCareLimits', arm.selfCareLimits]);

  return entries;
}

/**
 * Every sources[] entry must cite at least one exact policy token
 * (SOURCE_TOKENS); free-form description may follow the token.
 * @param sources the source citations checked for required policy tokens.
 * @param ctx the editorial validation issue collector.
 */
function screenSources(sources: readonly string[], ctx: z.RefinementCtx): void {
  for (const [i, source] of sources.entries()) {
    if (!SOURCE_TOKENS.some((token) => source.includes(token))) {
      ctx.addIssue({
        code: 'custom',
        message: `sources[${i}] cites no approved source token; use one of: ${SOURCE_TOKENS.join(' | ')}.`,
      });
    }
  }
}

/**
 * Bilingual parity by construction: both arms mirror section and FAQ counts.
 * @param en the authored English prose arm.
 * @param zh the authored traditional Chinese prose arm.
 * @param ctx the editorial validation issue collector.
 */
function screenArmParity(en: ArmProse, zh: ArmProse, ctx: z.RefinementCtx): void {
  if (en.sections.length !== zh.sections.length) {
    ctx.addIssue({
      code: 'custom',
      message: `Arm parity: en carries ${en.sections.length} sections but zh carries ${zh.sections.length}.`,
    });
  }
  if (en.faqs.length !== zh.faqs.length) {
    ctx.addIssue({
      code: 'custom',
      message: `Arm parity: en carries ${en.faqs.length} FAQs but zh carries ${zh.faqs.length}.`,
    });
  }
}

const enArmShape = makeEnArmSchema(POINT_WORD_FLOOR);
const zhArmShape = makeZhArmSchema(POINT_ZH_CHAR_FLOOR);

export const editorialPointModuleSchema = z
  .object({
    code: z.string().regex(/^([A-Z]{1,3}\d{1,2}|EX-[A-Z]{1,2}\d{1,2})$/u),
    /** Verbatim catalogue cautions; [] when the dataset records none. */
    echoedDatasetCautions: z.array(z.string()),
    authorship: authorshipSchema,
    sources: z.array(sourceLine).min(1),
    lastReviewed: z.coerce.date(),
    /** Per-page OG image URL from meta.json; absent falls back to the site default. */
    ogImage: z.string().min(1).optional(),
    en: enArmShape,
    zh: zhArmShape,
  })
  .superRefine((module, ctx) => {
    screenArm(module.en, ctx, 'en');
    screenArm(module.zh, ctx, 'zh');
    screenArmParity(module.en, module.zh, ctx);
    screenSources(module.sources, ctx);
  });

export const makeHubModuleSchema = <T extends HubKind>(kind: T): HubModuleSchema<T> =>
  z
    .object({
      slug: z.string().regex(/^[a-z0-9-]+$/u),
      kind: z.literal(kind),
      title: z.string().min(VALIDATION_LIMITS.TITLE_MIN),
      publishedAt: kind === 'journal' ? z.coerce.date() : z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      authorship: authorshipSchema,
      sources: z.array(sourceLine).min(1),
      lastReviewed: z.coerce.date(),
      /** Per-page OG image URL from meta.json; absent falls back to the site default. */
      ogImage: z.string().min(1).optional(),
      en: makeEnArmSchema(HUB_TIERS[kind].enWords),
      zh: makeZhArmSchema(HUB_TIERS[kind].zhChars),
    })
    .superRefine((module, ctx) => {
      screenArm(module.en, ctx, 'en');
      screenArm(module.zh, ctx, 'zh');
      screenArmParity(module.en, module.zh, ctx);
      screenSources(module.sources, ctx);
      for (const match of findBannedMatches(module.title)) {
        ctx.addIssue({
          code: 'custom',
          message: `Banned pattern ${JSON.stringify(match)} in title.`,
        });
      }
    });

export type EditorialAuthorship = z.infer<typeof authorshipSchema>;
export type EditorialSection = z.infer<typeof sectionBlock>;
export type EditorialArm = z.infer<ReturnType<typeof makeEnArmSchema>>;
export type EditorialPointModule = z.infer<typeof editorialPointModuleSchema>;
export type EditorialHubModule<T extends HubKind = HubKind> = z.infer<
  ReturnType<typeof makeHubModuleSchema<T>>
>;
