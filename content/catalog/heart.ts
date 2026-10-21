import { cataloguePointSchema } from '../schemas';

import type { CatalogueInput, CataloguePoint } from '../schemas';

const raw: CatalogueInput[] = [
  {
    code: 'HT1',
    name: 'Jiquan',
    pinyin: 'Jíquán',
    hanzi: '极泉',
    meridian: 'heart',
    number: 1,
    canonicalOneLiner:
      'HT1 (Jiquan) is an acupoint on the Heart meridian, classically used for cardiac pain, palpitations, and shoulder and arm pain.',
    location:
      'In the axilla, with the arm abducted, at the apex of the axillary fossa where the pulse of the axillary artery is palpable.',
    category: [],
    actions: [
      'cardiac pain',
      'palpitations',
      'shoulder and arm pain',
      'hypochondriac pain',
      'scrofula',
    ],
    cautions: ['Keep the needle away from the axillary artery to prevent bleeding.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT2',
    name: 'Qingling',
    pinyin: 'Qīnglíng',
    hanzi: '青灵',
    meridian: 'heart',
    number: 2,
    canonicalOneLiner:
      'HT2 (Qingling) is an acupoint on the Heart meridian, classically used for headache, chills and shivering, and hypochondriac pain.',
    location:
      'On the medial aspect of the arm, on the line connecting Jiquan (HT1) and Shaohai (HT3), 3 cun above the cubital crease, in the medial groove of biceps brachii.',
    category: [],
    actions: [
      'headache',
      'chills and shivering',
      'hypochondriac pain',
      'shoulder and arm pain',
      'angina',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT3',
    name: 'Shaohai',
    pinyin: 'Shàohǎi',
    hanzi: '少海',
    meridian: 'heart',
    number: 3,
    canonicalOneLiner:
      'HT3 (Shaohai) is an acupoint on the Heart meridian, classically used for cardiac pain, emotional distress, and spasmodic pain of the elbow and arm.',
    location:
      'With the elbow flexed, at the midpoint of the line between the medial end of the cubital crease and the medial epicondyle of the humerus.',
    category: ['he-sea'],
    actions: [
      'cardiac pain',
      'emotional distress',
      'spasmodic pain of the elbow and arm',
      'numbness and tremor of the hand',
      'head and neck pain',
      'axillary and hypochondriac pain',
      'scrofula',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT4',
    name: 'Lingdao',
    pinyin: 'Língdào',
    hanzi: '灵道',
    meridian: 'heart',
    number: 4,
    canonicalOneLiner:
      'HT4 (Lingdao) is an acupoint on the Heart meridian, classically used for cardiac pain, sudden loss of voice, and spasmodic pain of the elbow and arm.',
    location:
      'On the palmar aspect of the forearm, on the radial border of the tendon of flexor carpi ulnaris, 1.5 cun above the wrist crease.',
    category: ['jing-river'],
    actions: [
      'cardiac pain',
      'sudden loss of voice',
      'spasmodic pain of the elbow and arm',
      'grief and fearfulness',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT5',
    name: 'Tongli',
    pinyin: 'Tōnglǐ',
    hanzi: '通里',
    meridian: 'heart',
    number: 5,
    canonicalOneLiner:
      'HT5 (Tongli) is an acupoint on the Heart meridian, classically used for palpitations, stiff tongue with inability to speak, and sudden loss of voice.',
    location:
      'On the palmar aspect of the forearm, on the radial border of the tendon of flexor carpi ulnaris, 1 cun above the wrist crease.',
    category: ['luo-connecting'],
    actions: [
      'palpitations',
      'stiff tongue with inability to speak',
      'sudden loss of voice',
      'wrist and arm pain',
      'tonsillitis',
      'cough',
      'asthma',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT6',
    name: 'Yinxi',
    pinyin: 'Yīnxì',
    hanzi: '阴郄',
    meridian: 'heart',
    number: 6,
    canonicalOneLiner:
      'HT6 (Yinxi) is an acupoint on the Heart meridian, classically used for cardiac pain, palpitations with fright, and night sweats with tidal fever.',
    location:
      'On the palmar aspect of the forearm, on the radial border of the tendon of flexor carpi ulnaris, 0.5 cun above the wrist crease.',
    category: ['xi-cleft'],
    actions: [
      'cardiac pain',
      'palpitations with fright',
      'night sweats with tidal fever',
      'vomiting blood',
      'nosebleed',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT7',
    name: 'Shenmen',
    pinyin: 'Shénmén',
    hanzi: '神门',
    meridian: 'heart',
    number: 7,
    canonicalOneLiner:
      'HT7 (Shenmen) is an acupoint on the Heart meridian, classically used for cardiac pain, irritability, and palpitations with fright.',
    location:
      'On the wrist, at the ulnar end of the palmar wrist crease, in the depression on the radial side of the tendon of flexor carpi ulnaris.',
    category: ['shu-stream', 'yuan-source'],
    actions: [
      'cardiac pain',
      'irritability',
      'palpitations with fright',
      'poor memory',
      'insomnia',
      'mania and epilepsy',
      'high blood pressure',
      'chest and hypochondriac pain',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT8',
    name: 'Shaofu',
    pinyin: 'Shàofǔ',
    hanzi: '少府',
    meridian: 'heart',
    number: 8,
    canonicalOneLiner:
      'HT8 (Shaofu) is an acupoint on the Heart meridian, classically used for palpitations, cardiac pain, and itching and pain of the external genitals.',
    location:
      'On the palm, between the fourth and fifth metacarpal bones; when a fist is made, the point lies where the tip of the little finger rests.',
    category: ['ying-spring'],
    actions: [
      'palpitations',
      'cardiac pain',
      'itching and pain of the external genitals',
      'sores and ulcers',
      'spasmodic pain of the little finger',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'HT9',
    name: 'Shaochong',
    pinyin: 'Shàochōng',
    hanzi: '少冲',
    meridian: 'heart',
    number: 9,
    canonicalOneLiner:
      'HT9 (Shaochong) is an acupoint on the Heart meridian, classically used for palpitations, cardiac pain, and mania and loss of consciousness.',
    location:
      'On the little finger, 0.1 cun from the corner of the nail, on the radial side of the distal phalanx.',
    category: ['jing-well'],
    actions: [
      'palpitations',
      'cardiac pain',
      'mania and loss of consciousness',
      'febrile disease',
      'chest and hypochondriac pain',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
];

/** Heart-meridian catalogue points, validated at load. */
export const heartPoints: CataloguePoint[] = raw.map((entry) => cataloguePointSchema.parse(entry));
