/**
 * The route (循行) of each channel in one sentence, after the standard
 * descriptions of the fourteen courses: where it starts, the faces it runs
 * along, where it ends. Traditional Chinese is authored; zh-cn derives its
 * simplified text at render time.
 */

import { hanFor } from '@/utilities/i18n/contentLabels';

import type { BodyPart } from '@/content/illustrations';
import type { Bilingual } from '@/features/editorial/copy';
import type { Locale } from '@/utilities/routes';

/** A route sentence in English and Traditional Chinese. */
interface RouteSentence {
  readonly en: string;
  readonly zh: string;
}

/** Han and English names of the body parts the route strip groups points by. */
export const PART_LABELS: Readonly<Record<BodyPart, Bilingual>> = {
  'face': { zh: '面', en: 'Face' },
  'head': { zh: '頭', en: 'Head' },
  'ear': { zh: '耳', en: 'Ear' },
  'neck': { zh: '頸', en: 'Neck' },
  'shoulder': { zh: '肩', en: 'Shoulder' },
  'armpit': { zh: '腋', en: 'Armpit' },
  'upper arm': { zh: '上臂', en: 'Upper arm' },
  'elbow': { zh: '肘', en: 'Elbow' },
  'forearm': { zh: '前臂', en: 'Forearm' },
  'hand': { zh: '手', en: 'Hand' },
  'chest': { zh: '胸', en: 'Chest' },
  'flank': { zh: '脇', en: 'Flank' },
  'belly': { zh: '腹', en: 'Belly' },
  'back': { zh: '背', en: 'Back' },
  'lower back': { zh: '腰', en: 'Lower back' },
  'sacrum': { zh: '骶', en: 'Sacrum' },
  'hip': { zh: '髖', en: 'Hip' },
  'thigh': { zh: '股', en: 'Thigh' },
  'knee': { zh: '膝', en: 'Knee' },
  'lower leg': { zh: '小腿', en: 'Lower leg' },
  'ankle': { zh: '踝', en: 'Ankle' },
  'foot': { zh: '足', en: 'Foot' },
};

const ROUTES: Readonly<Record<string, RouteSentence | undefined>> = {
  'lung': {
    en: 'From the chest, below the collarbone, down the inner arm to the thumb.',
    zh: '起於胸前鎖骨之下，沿手臂內側下行，止於拇指。',
  },
  'large-intestine': {
    en: 'From the index fingertip, up the outer arm and over the shoulder, to beside the nose.',
    zh: '起於食指端，沿手臂外側上行，越過肩頭，止於鼻旁。',
  },
  'stomach': {
    en: 'Down the front of the body, from below the eye to the second toe.',
    zh: '沿身體前面下行，起於眼下，止於第二趾。',
  },
  'spleen': {
    en: 'From the big toe, up the inner leg and belly, to the side of the chest.',
    zh: '起於大趾，沿腿內側與腹部上行，止於胸側。',
  },
  'heart': {
    en: 'From the armpit, down the inner arm to the little finger.',
    zh: '起於腋窩，沿手臂內側下行，止於小指。',
  },
  'small-intestine': {
    en: 'From the little finger, up the back of the arm and over the shoulder blade, to the ear.',
    zh: '起於小指，沿手臂後側上行，繞過肩胛，止於耳前。',
  },
  'bladder': {
    en: 'From the inner eye, over the head and down the back, to the little toe. The longest channel.',
    zh: '起於眼內角，越過頭頂，沿背部下行，止於小趾。是最長的一條經。',
  },
  'kidney': {
    en: 'From the sole of the foot, up the inner leg, to just below the collarbone.',
    zh: '起於足底，沿腿內側上行，止於鎖骨之下。',
  },
  'pericardium': {
    en: 'From beside the nipple, down the middle of the inner arm, to the middle finger.',
    zh: '起於乳頭之旁，沿手臂內側正中下行，止於中指。',
  },
  'san-jiao': {
    en: 'From the ring finger, up the outer arm and round the ear, to the outer end of the eyebrow.',
    zh: '起於無名指，沿手臂外側上行，繞耳而過，止於眉梢。',
  },
  'gallbladder': {
    en: 'Zigzags from the outer eye down the side of the head and body, to the fourth toe.',
    zh: '起於眼外角，曲折而下，經頭側與身側，止於第四趾。',
  },
  'liver': {
    en: 'From the big toe, up the inner leg, to the ribs below the nipple.',
    zh: '起於大趾，沿腿內側上行，止於乳頭下方的脅肋。',
  },
  'du': {
    en: 'Up the midline of the back from the tailbone, over the head, to the upper gum.',
    zh: '起於尾骨，沿背部正中上行，越過頭頂，止於上齒齦。',
  },
  'ren': {
    en: 'Up the front midline from the perineum, to the dip below the lower lip.',
    zh: '起於會陰，沿身體前面正中上行，止於下唇下方的淺溝。',
  },
};

/**
 * The route of the channel `slug` in one sentence, in the page's language.
 * @param slug the meridian slug identifying the chapter
 * @param locale the page language and Han script
 * @returns the authored route description, when available
 */
export function channelRoute(slug: string, locale: Locale): string | undefined {
  const route = ROUTES[slug];
  if (!route) {
    return undefined;
  }

  return locale === 'en' ? route.en : hanFor(route.zh, locale);
}
