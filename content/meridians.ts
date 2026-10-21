import type { Meridian } from './schemas';

/** The 14 classical meridians, in the order of the daily circulation. */
export const meridians: Meridian[] = [
  {
    slug: 'lung',
    name: 'Lung',
    pinyin: 'Fèi',
    hanzi: '肺',
    element: 'metal',
    pointCount: 11,
    canonicalOneLiner:
      'The Lung meridian runs from the chest down the inner arm to the thumb and governs respiration and the body’s defensive qi.',
  },
  {
    slug: 'large-intestine',
    name: 'Large Intestine',
    pinyin: 'Dà Cháng',
    hanzi: '大腸',
    element: 'metal',
    pointCount: 20,
    canonicalOneLiner:
      'The Large Intestine meridian runs from the index finger up the arm to the face and is classically used for headache, facial pain, and immunity.',
  },
  {
    slug: 'stomach',
    name: 'Stomach',
    pinyin: 'Wèi',
    hanzi: '胃',
    element: 'earth',
    pointCount: 45,
    canonicalOneLiner:
      'The Stomach meridian runs down the front of the body from face to second toe and is classically used for digestion, energy, and appetite.',
  },
  {
    slug: 'spleen',
    name: 'Spleen',
    pinyin: 'Pí',
    hanzi: '脾',
    element: 'earth',
    pointCount: 21,
    canonicalOneLiner:
      'The Spleen meridian ascends from the big toe up the inner leg to the chest, governing digestion, blood, and women’s health.',
  },
  {
    slug: 'heart',
    name: 'Heart',
    pinyin: 'Xīn',
    hanzi: '心',
    element: 'fire',
    pointCount: 9,
    canonicalOneLiner:
      'The Heart meridian runs from the armpit down the inner arm to the little finger and houses the shen, or spirit.',
  },
  {
    slug: 'small-intestine',
    name: 'Small Intestine',
    pinyin: 'Xiǎo Cháng',
    hanzi: '小腸',
    element: 'fire',
    pointCount: 19,
    canonicalOneLiner:
      'The Small Intestine meridian travels from the little finger up the arm to the face and is used for neck, shoulder, and ear conditions.',
  },
  {
    slug: 'bladder',
    name: 'Bladder',
    pinyin: 'Páng Guāng',
    hanzi: '膀胱',
    element: 'water',
    pointCount: 67,
    canonicalOneLiner:
      'The Bladder meridian runs from the inner eye over the head and down the back to the little toe and is the longest meridian in the body.',
  },
  {
    slug: 'kidney',
    name: 'Kidney',
    pinyin: 'Shèn',
    hanzi: '腎',
    element: 'water',
    pointCount: 27,
    canonicalOneLiner:
      'The Kidney meridian ascends from the sole of the foot up the inner leg to the chest, rooting the body’s foundational qi.',
  },
  {
    slug: 'pericardium',
    name: 'Pericardium',
    pinyin: 'Xīn Bāo',
    hanzi: '心包',
    element: 'fire',
    pointCount: 9,
    canonicalOneLiner:
      'The Pericardium meridian runs from the chest down the inner arm to the middle finger and is a primary circuit for nausea and anxiety.',
  },
  {
    slug: 'san-jiao',
    name: 'San Jiao',
    pinyin: 'Sān Jiāo',
    hanzi: '三焦',
    element: 'fire',
    pointCount: 23,
    canonicalOneLiner:
      'The San Jiao (Triple Burner) meridian runs from the ring finger up the outer arm to the temple and coordinates the three body cavities.',
  },
  {
    slug: 'gallbladder',
    name: 'Gallbladder',
    pinyin: 'Dǎn',
    hanzi: '膽',
    element: 'wood',
    pointCount: 44,
    canonicalOneLiner:
      'The Gallbladder meridian zigzags down the side of the head and body to the fourth toe and is classically used for tension and decision-making.',
  },
  {
    slug: 'liver',
    name: 'Liver',
    pinyin: 'Gān',
    hanzi: '肝',
    element: 'wood',
    pointCount: 14,
    canonicalOneLiner:
      'The Liver meridian rises from the big toe up the inner leg to the ribs and is used to soothe irritability, stagnation, and women’s cycles.',
  },
  {
    slug: 'du',
    name: 'Du (Governing Vessel)',
    pinyin: 'Dū Mài',
    hanzi: '督脈',
    element: 'metal',
    pointCount: 28,
    canonicalOneLiner:
      'The Du or Governing Vessel runs up the midline of the back and head, uniting all yang meridians.',
  },
  {
    slug: 'ren',
    name: 'Ren (Conception Vessel)',
    pinyin: 'Rèn Mài',
    hanzi: '任脈',
    element: 'water',
    pointCount: 24,
    canonicalOneLiner:
      'The Ren or Conception Vessel runs up the midline of the front of the body, uniting all yin meridians.',
  },
];

/**
 * find a channel by its route key.
 * @param slug route identifier.
 * @returns the channel with that slug, or undefined.
 */
export function meridianBySlug(slug: string): Meridian | undefined {
  return meridians.find((m) => m.slug === slug);
}
