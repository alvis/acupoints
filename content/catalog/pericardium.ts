import { cataloguePointSchema } from '../schemas';

import type { CatalogueInput, CataloguePoint } from '../schemas';

const raw: CatalogueInput[] = [
  {
    code: 'PC1',
    name: 'Tianchi',
    pinyin: 'Tiānchí',
    hanzi: '天池',
    meridian: 'pericardium',
    number: 1,
    canonicalOneLiner:
      'PC1 (Tianchi) is an acupoint on the Pericardium meridian, classically used for breast abscess, insufficient lactation, and cough.',
    location:
      'On the chest, in the fourth intercostal space, 1 cun lateral to the nipple, 5 cun lateral to the anterior midline.',
    category: [],
    actions: ['breast abscess', 'insufficient lactation', 'cough', 'asthma', 'hypochondriac pain'],
    cautions: [
      'Keep insertion shallow, angling the needle obliquely or transversely away from the chest wall so it cannot puncture the lung.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC2',
    name: 'Tianquan',
    pinyin: 'Tiānquán',
    hanzi: '天泉',
    meridian: 'pericardium',
    number: 2,
    canonicalOneLiner:
      'PC2 (Tianquan) is an acupoint on the Pericardium meridian, classically used for cough, distending pain of the chest and hypochondrium, and pain of the chest, back, and inner arm.',
    location:
      'On the medial aspect of the arm, 2 cun below the anterior end of the axillary fold, between the long and short heads of biceps brachii.',
    category: [],
    actions: [
      'cough',
      'distending pain of the chest and hypochondrium',
      'pain of the chest, back, and inner arm',
      'failing eyesight',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC3',
    name: 'Quze',
    pinyin: 'Qūzé',
    hanzi: '曲泽',
    meridian: 'pericardium',
    number: 3,
    canonicalOneLiner:
      'PC3 (Quze) is an acupoint on the Pericardium meridian, classically used for cardiac pain, palpitations, and stomachache.',
    location: 'At the cubital crease, on the ulnar side of the tendon of biceps brachii.',
    category: ['he-sea'],
    actions: [
      'cardiac pain',
      'palpitations',
      'stomachache',
      'vomiting',
      'diarrhea',
      'spasmodic pain of the elbow and arm',
      'febrile disease',
    ],
    cautions: ['Keep clear of the artery; piercing it can cause bleeding.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC4',
    name: 'Ximen',
    pinyin: 'Xìmén',
    hanzi: '郄门',
    meridian: 'pericardium',
    number: 4,
    canonicalOneLiner:
      'PC4 (Ximen) is an acupoint on the Pericardium meridian, classically used for cardiac pain, palpitations, and chest pain.',
    location:
      'On the palmar aspect of the forearm, on the line connecting Quze (PC3) and Daling (PC7), 5 cun above the wrist crease, between the tendons of palmaris longus and flexor carpi radialis.',
    category: ['xi-cleft'],
    actions: [
      'cardiac pain',
      'palpitations',
      'chest pain',
      'coughing blood',
      'vomiting blood',
      'boils and carbuncles',
      'epilepsy',
      'hiccups',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC5',
    name: 'Jianshi',
    pinyin: 'Jiānshǐ',
    hanzi: '间使',
    meridian: 'pericardium',
    number: 5,
    canonicalOneLiner:
      'PC5 (Jianshi) is an acupoint on the Pericardium meridian, classically used for cardiac pain, palpitations, and mania and epilepsy.',
    location:
      'On the palmar aspect of the forearm, on the line connecting Quze (PC3) and Daling (PC7), 3 cun above the wrist crease, between the tendons of palmaris longus and flexor carpi radialis.',
    category: ['jing-river'],
    actions: [
      'cardiac pain',
      'palpitations',
      'mania and epilepsy',
      'stomachache',
      'vomiting',
      'malaria',
      'arm pain',
      'sore throat',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC6',
    name: 'Neiguan',
    pinyin: 'Nèiguān',
    hanzi: '内关',
    meridian: 'pericardium',
    number: 6,
    canonicalOneLiner:
      'PC6 (Neiguan) is an acupoint on the Pericardium meridian, classically used for cardiac pain, palpitations, and chest pain and tightness.',
    location:
      'On the palmar aspect of the forearm, on the line connecting Quze (PC3) and Daling (PC7), 2 cun above the wrist crease, between the tendons of palmaris longus and flexor carpi radialis.',
    category: ['luo-connecting', 'eight-confluent point (opens the yin wei vessel)'],
    actions: [
      'cardiac pain',
      'palpitations',
      'chest pain and tightness',
      'nausea',
      'vomiting',
      'hiccups',
      'stomachache',
      'insomnia',
      'epilepsy',
      'numbness of the fingers',
      'hemiplegia',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC7',
    name: 'Daling',
    pinyin: 'Dàlíng',
    hanzi: '大陵',
    meridian: 'pericardium',
    number: 7,
    canonicalOneLiner:
      'PC7 (Daling) is an acupoint on the Pericardium meridian, classically used for cardiac pain, palpitations, and chest and hypochondriac pain.',
    location:
      'At the midpoint of the palmar wrist crease, between the tendons of palmaris longus and flexor carpi radialis.',
    category: ['shu-stream', 'yuan-source'],
    actions: [
      'cardiac pain',
      'palpitations',
      'chest and hypochondriac pain',
      'mania and epilepsy',
      'stomachache',
      'vomiting',
      'wrist and arm pain',
      'sore throat',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC8',
    name: 'Laogong',
    pinyin: 'Láogōng',
    hanzi: '劳宫',
    meridian: 'pericardium',
    number: 8,
    canonicalOneLiner:
      'PC8 (Laogong) is an acupoint on the Pericardium meridian, classically used for cardiac pain, palpitations, and mania and epilepsy.',
    location:
      'In the centre of the palm, between the second and third metacarpal bones, closer to the third; when a fist is made, the point lies where the tip of the middle finger rests.',
    category: ['ying-spring'],
    actions: [
      'cardiac pain',
      'palpitations',
      'mania and epilepsy',
      'mouth ulcers',
      'bad breath',
      'jaundice',
      'poor appetite',
      'fungal infection of the hand',
      'numbness of the fingers',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'PC9',
    name: 'Zhongchong',
    pinyin: 'Zhōngchōng',
    hanzi: '中冲',
    meridian: 'pericardium',
    number: 9,
    canonicalOneLiner:
      'PC9 (Zhongchong) is an acupoint on the Pericardium meridian, classically used for loss of consciousness, heatstroke, and fainting.',
    location: 'At the centre of the tip of the middle finger.',
    category: ['jing-well'],
    actions: [
      'loss of consciousness',
      'heatstroke',
      'fainting',
      'cardiac pain',
      'night crying in infants',
      'stiff and swollen tongue',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
];

/** Pericardium-meridian catalogue points, validated at load. */
export const pericardiumPoints: CataloguePoint[] = raw.map((entry) =>
  cataloguePointSchema.parse(entry),
);
