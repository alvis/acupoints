/**
 * Editorial-layer authoring policy v1 (see ./README.md for the human-facing
 * contract). The constants here are load-bearing: module schemas in
 * ./schema.ts enforce the floors and the banned-pattern screens at parse
 * time, so a violating module fails `pnpm build` instead of shipping.
 */

/** Bump when the authoring contract changes; modules pin the version they were authored under. */
export const POLICY_VERSION = '2026-08-editorial-v1';

/** Minimum whitespace-word count across an English locale arm's prose fields. */
export const POINT_WORD_FLOOR = 1200;

/** Minimum CJK-character count across a Chinese locale arm's prose fields. */
export const POINT_ZH_CHAR_FLOOR = 1800;

/**
 * Hub prose floors by page family. Point pages sit above every tier because
 * they are the site's deepest reference surface.
 */
export const HUB_TIERS = {
  meridian: { enWords: 1500, zhChars: 2250 },
  journal: { enWords: 1500, zhChars: 2250 },
  condition: { enWords: 1000, zhChars: 1500 },
  region: { enWords: 1000, zhChars: 1500 },
  static: { enWords: 800, zhChars: 1200 },
} as const;

export type HubKind = keyof typeof HUB_TIERS;

/**
 * Titles a module may quote or cite as classical sources. Anything outside
 * this list fails review; screening happens at review level, not by regex —
 * do NOT ban 《…》 inside `sources[]`.
 */
export const ALLOWED_SOURCE_TITLES = [
  'WHO Standard Acupuncture Point Locations in the Western Pacific Region',
  'A Manual of Acupuncture', // Deadman
  'aijiu-mpvue', // MIT dataset
  'China Association of Chinese Medicine', // 中華中醫藥學會 guidelines and nursing protocols
  'China Association of Acupuncture-Moxibustion', // 中國針灸學會 clinical practice guidelines
] as const;

/**
 * Exact citation tokens every sources[] entry must contain (build-enforced
 * via ./schema.ts). Free-form descriptive text may follow a token, but the
 * token itself is verbatim so licensing vocabulary cannot drift — e.g.
 * "(MIT)" or "licence" spellings are rejected. Established after the pilot
 * critic round found three paraphrase variants across five modules.
 * Clinical reviews, guidelines and trials are cited by a resolvable link
 * (a DOI, or a stable https URL where the source has none), the same
 * sources content/evidence.ts lists for the condition's evidence box.
 */
export const SOURCE_TOKENS = [
  'aijiu-mpvue (MIT License)',
  'WHO Standard Acupuncture Point Locations in the Western Pacific Region',
  'A Manual of Acupuncture',
  'https://',
] as const;

/**
 * Mechanical screens applied to every prose string field. Each pattern marks
 * language the editorial layer never ships: needle instruction phrasing,
 * moxa parameters or durations, dosages, efficacy absolutes, and study-claim
 * shapes. Prose never asserts what studies show; the cited evidence box
 * (content/evidence.ts) carries each finding beside its source instead.
 */
export const bannedPatterns: RegExp[] = [
  // Needle instruction phrasing
  /\binsert (the |a )?needle/i,
  /needle (depth|angle|insertion)/i,
  /针刺/,
  /进针/,
  /针感/,
  // Moxa parameters/durations
  /(?<!\d)\d+\s*(minutes?|min)\s*(of )?moxa/i,
  /艾灸.{0,6}\d+\s*(分钟|秒)/,
  // Dosages
  /(?<!\d)\d+\s?(mg|ml|g)\b/i,
  // Efficacy absolutes
  /\bcures?\b/i,
  /\bcured\b/i,
  /guaranteed/i,
  /clinically proven/i,
  // Study-claim shapes
  /studies show/i,
  /(?<!\d)\d+(\.\d+)?\s?%/,
];

/**
 * Returns the first match of each banned pattern found in `value`, in pattern order.
 * @param value prose to scan.
 * @returns the matched text, at most one hit per pattern.
 */
export function findBannedMatches(value: string): string[] {
  const matches: string[] = [];
  for (const pattern of bannedPatterns) {
    const hit = pattern.exec(value);
    if (hit) {
      matches.push(hit[0]);
    }
  }

  return matches;
}
