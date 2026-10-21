import { z } from 'zod';

import { BASE_TEMPLATES } from './illustrations/schema';
import { regionSchema } from './schemas';

import type { BaseTemplate } from './illustrations/schema';
import type { AnyPoint, RegionSlug } from './schemas';

/** minimum body-region summary length. */
const VALIDATION_LIMITS = {
  SUMMARY_MIN: 10,
} as const;

/** Placeholder anatomical layout for a region's ExplorableMap. */
export const regionLayoutSchema = z.object({
  viewBox: z.string(),
  points: z.array(
    z.object({
      code: z.string(),
      x: z.number(),
      y: z.number(),
    }),
  ),
  /**
   * Optional anatomical base template rendered behind the ExplorableMap
   * markers (e.g. `'hand'`, `'foot'`). When omitted, the region page
   * degrades gracefully to a markers-only view.
   */
  baseTemplate: z.enum(BASE_TEMPLATES).optional(),
});

export type RegionLayout = z.infer<typeof regionLayoutSchema>;

/** Descriptor for an anatomical region that groups acupoints on the body. */
export const regionDescriptorSchema = z.object({
  slug: regionSchema,
  name: z.string().min(2),
  hanzi: z.string().optional(),
  summary: z.string().min(VALIDATION_LIMITS.SUMMARY_MIN),
  relatedMeridians: z.array(z.string().min(2)),
  /**
   * Optional SVG layout used by `layoutPointsForRegion`. Phase 3b ships simple
   * placeholder coordinates for the 7 regions that had detail pages before;
   * the 3 new regions (chest, arm, ear) fall back to a descriptor-only view
   * until Phase 4/5 authors real anatomical templates.
   */
  layout: regionLayoutSchema.optional(),
  /**
   * Codes of the points the region's page leads with, in reading order. They
   * may name catalogue points that no point files under the region (the neck
   * and shoulder), so the page can still show where to press.
   */
  keyPoints: z.array(z.string().min(2)).optional(),
});

export type RegionDescriptor = z.infer<typeof regionDescriptorSchema>;

/**
 * Placeholder layouts for regions that previously rendered detail pages. They
 * use an even 0–100 × 0–120 coordinate space with generous spacing so
 * ExplorableMap renders legibly. Phase 4 will replace with anatomical SVG.
 */
const HEAD_LAYOUT: RegionLayout = {
  viewBox: '0 0 100 120',
  baseTemplate: 'head',
  points: [
    { code: 'GV20', x: 50, y: 18 },
    { code: 'GB20', x: 72, y: 48 },
    { code: 'EX-HN5', x: 28, y: 50 },
  ],
};

const NECK_LAYOUT: RegionLayout = {
  viewBox: '0 0 100 120',
  points: [{ code: 'GB20', x: 50, y: 40 }],
};

const SHOULDER_LAYOUT: RegionLayout = {
  viewBox: '0 0 100 120',
  points: [{ code: 'LI11', x: 50, y: 50 }],
};

const BACK_LAYOUT: RegionLayout = {
  viewBox: '0 0 100 120',
  baseTemplate: 'torso-prone',
  points: [{ code: 'GV14', x: 50, y: 60 }],
};

const HAND_LAYOUT: RegionLayout = {
  viewBox: '0 0 100 120',
  baseTemplate: 'hand',
  points: [
    { code: 'LI4', x: 50, y: 60 },
    { code: 'HT7', x: 30, y: 85 },
    { code: 'SI3', x: 70, y: 85 },
  ],
};

const LEG_LAYOUT: RegionLayout = {
  viewBox: '0 0 100 120',
  baseTemplate: 'leg',
  points: [
    { code: 'ST36', x: 50, y: 30 },
    { code: 'SP6', x: 50, y: 60 },
    { code: 'BL40', x: 50, y: 90 },
  ],
};

const FOOT_LAYOUT: RegionLayout = {
  viewBox: '0 0 100 120',
  baseTemplate: 'foot',
  points: [
    { code: 'LV3', x: 40, y: 60 },
    { code: 'KI3', x: 60, y: 60 },
  ],
};

/**
 * Descriptive metadata for each of the ten anatomical regions used to group
 * points. The `slug` values align with the `region` field on pointSchema so
 * region pages can filter points directly. `relatedMeridians` lists the
 * meridian slugs (as used in `content/meridians.ts`) that commonly traverse
 * the region; it is not an exhaustive anatomical atlas.
 */
export const regions: RegionDescriptor[] = [
  {
    slug: 'head',
    name: 'Head',
    hanzi: '頭',
    summary:
      'The head covers the scalp, face, and crown of the skull, where yang meridians converge and classical points for headache, eye strain, and clarity of mind are most concentrated.',
    relatedMeridians: ['du', 'gallbladder', 'stomach', 'bladder', 'san-jiao'],
    layout: HEAD_LAYOUT,
    keyPoints: ['GB20', 'GV20', 'EX-HN5'],
  },
  {
    slug: 'neck',
    name: 'Neck',
    hanzi: '頸',
    summary:
      'The neck spans the region between the base of the skull and the shoulders, housing points classically used for neck stiffness, throat complaints, and the transition between head and body.',
    relatedMeridians: ['gallbladder', 'bladder', 'small-intestine', 'du', 'ren'],
    layout: NECK_LAYOUT,
    keyPoints: ['GB20'],
  },
  {
    slug: 'shoulder',
    name: 'Shoulder',
    hanzi: '肩',
    summary:
      'The shoulder spans the upper trapezius, the joint itself, and the tissue that connects neck to arm; its points are used for shoulder pain, restricted movement, and upper-body tension.',
    relatedMeridians: ['large-intestine', 'small-intestine', 'san-jiao', 'gallbladder'],
    layout: SHOULDER_LAYOUT,
    keyPoints: ['GB21', 'LI15', 'TH14', 'SI11'],
  },
  {
    slug: 'chest',
    name: 'Chest',
    hanzi: '胸',
    summary:
      'The chest covers the anterior thorax from the collarbones to the lower sternum, where Conception-Vessel and organ-front points relate to breath, heart, and emotional expression.',
    relatedMeridians: ['ren', 'lung', 'kidney', 'stomach', 'spleen', 'pericardium'],
    keyPoints: ['CV17'],
  },
  {
    slug: 'back',
    name: 'Back',
    hanzi: '背',
    summary:
      'The back runs from the base of the neck to the sacrum and carries the Governing Vessel along the midline and the Bladder meridian down the paraspinal muscles, with points used for spinal tension, organ support, and overall vitality.',
    relatedMeridians: ['du', 'bladder', 'small-intestine'],
    layout: BACK_LAYOUT,
    keyPoints: ['GV14'],
  },
  {
    slug: 'arm',
    name: 'Arm',
    hanzi: '臂',
    summary:
      'The arm runs from the shoulder joint to the wrist and carries six of the twelve regular meridians along its inner and outer surfaces; its points are used for head, chest, and digestive complaints as well as local arm issues.',
    relatedMeridians: [
      'lung',
      'large-intestine',
      'heart',
      'small-intestine',
      'pericardium',
      'san-jiao',
    ],
    keyPoints: ['PC6', 'LU7', 'TH5', 'LI11'],
  },
  {
    slug: 'hand',
    name: 'Hand',
    hanzi: '手',
    summary:
      'The hand covers the wrist, palm, and fingers and is the distal terminus of the six arm meridians, hosting many accessible command points used for head, face, and systemic complaints.',
    relatedMeridians: [
      'lung',
      'large-intestine',
      'heart',
      'small-intestine',
      'pericardium',
      'san-jiao',
    ],
    layout: HAND_LAYOUT,
    keyPoints: ['LI4', 'HT7', 'SI3'],
  },
  {
    slug: 'leg',
    name: 'Leg',
    hanzi: '腿',
    summary:
      'The leg spans the hip to the ankle and carries six of the twelve regular meridians, with points along the shin, calf, and thigh used for digestion, back pain, and women’s health.',
    relatedMeridians: ['stomach', 'spleen', 'bladder', 'kidney', 'gallbladder', 'liver'],
    layout: LEG_LAYOUT,
    keyPoints: ['ST36', 'SP6', 'SP9', 'BL40', 'BL57'],
  },
  {
    slug: 'foot',
    name: 'Foot',
    hanzi: '足',
    summary:
      'The foot is the distal terminus of the six leg meridians and hosts many yuan-source and well-points used for grounding, head and face complaints, and organ balance.',
    relatedMeridians: ['stomach', 'spleen', 'bladder', 'kidney', 'gallbladder', 'liver'],
    layout: FOOT_LAYOUT,
    keyPoints: ['LV3', 'KI3', 'ST44'],
  },
  {
    slug: 'ear',
    name: 'Ear',
    hanzi: '耳',
    summary:
      'The ear is a microsystem in its own right, with points used for hearing, balance, and a broad range of auricular-therapy protocols; several regular meridians also skirt its margins.',
    relatedMeridians: ['san-jiao', 'gallbladder', 'small-intestine'],
    keyPoints: ['SI19', 'GB2', 'TH21', 'TH17', 'TH20'],
  },
];

/**
 * find a body-region descriptor by its route key.
 * @param slug route identifier.
 * @returns the body-region descriptor with that slug, or undefined.
 */
export function regionBySlug(slug: string): RegionDescriptor | undefined {
  return regions.find((r) => r.slug === slug);
}

export const orderedRegionSlugs: readonly RegionSlug[] = regions.map((r) => r.slug);

/** Resolved point for rendering inside ExplorableMap on a region page. */
export interface RegionLayoutPoint {
  code: string;
  label: string;
  x: number;
  y: number;
  active?: boolean;
}

/** ExplorableMap-ready layout resolved for a region slug. */
export interface ResolvedRegionLayout {
  viewBox: string;
  points: RegionLayoutPoint[];
  /** Anatomical base template to render behind the markers, if any. */
  baseTemplate?: BaseTemplate;
}

/**
 * Resolve an ExplorableMap-ready layout for a region. Returns `undefined`
 * when the region has no pre-authored layout (Phase 3b: chest, arm, ear).
 * Points listed in the layout that are absent from `points` are dropped,
 * so layouts stay robust to point-catalog reshuffles.
 * @param slug route identifier.
 * @param points the point registry used to resolve layout codes.
 * @returns the authored region layout joined to existing points, or undefined.
 */
export function layoutPointsForRegion(
  slug: string,
  points: readonly AnyPoint[],
): ResolvedRegionLayout | undefined {
  const descriptor = regionBySlug(slug);
  if (!descriptor?.layout) {
    return undefined;
  }
  const resolved: RegionLayoutPoint[] = [];
  for (const entry of descriptor.layout.points) {
    const match = points.find((p) => p.code === entry.code);
    if (!match) {
      continue;
    }
    resolved.push({
      code: match.code,
      label: match.pinyin || match.name,
      x: entry.x,
      y: entry.y,
      // Mark the first point in each layout as the region's anchor so the
      // region atlas plate highlights its signature acupoint (e.g. LI4 for
      // the hand). Can be made configurable later when Phase 4 lands.
      active: resolved.length === 0,
    });
  }

  return {
    viewBox: descriptor.layout.viewBox,
    points: resolved,
    baseTemplate: descriptor.layout.baseTemplate,
  };
}
