import { cataloguePointSchema } from '../schemas';

import type { CatalogueInput, CataloguePoint } from '../schemas';

const raw: CatalogueInput[] = [
  {
    code: 'LU1',
    name: 'Zhongfu',
    pinyin: 'Zhōngfǔ',
    hanzi: '中府',
    meridian: 'lung',
    number: 1,
    canonicalOneLiner:
      'LU1 (Zhongfu) is an acupoint on the Lung meridian, classically used for cough, asthma, and chest fullness and pain.',
    location:
      'On the upper outer aspect of the chest, 1 cun below Yunmen (LU2), level with the first intercostal space, 6 cun lateral to the anterior midline.',
    category: ['front-mu of the lung', 'crossing-point'],
    actions: ['cough', 'asthma', 'chest fullness and pain', 'shoulder and back pain'],
    cautions: [
      'Keep insertion shallow; a deep needle can puncture the lung and cause pneumothorax.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU2',
    name: 'Yunmen',
    pinyin: 'Yúnmén',
    hanzi: '云门',
    meridian: 'lung',
    number: 2,
    canonicalOneLiner:
      'LU2 (Yunmen) is an acupoint on the Lung meridian, classically used for cough, asthma, and chest pain.',
    location:
      'On the upper outer aspect of the chest, in the depression below the lateral end of the clavicle, under the coracoid process of the scapula, 6 cun lateral to the anterior midline.',
    category: [],
    actions: [
      'cough',
      'asthma',
      'chest pain',
      'shoulder and back pain',
      'painful obstruction of the throat',
    ],
    cautions: [
      'Keep insertion shallow; a deep needle can puncture the lung and cause pneumothorax.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU3',
    name: 'Tianfu',
    pinyin: 'Tiānfǔ',
    hanzi: '天府',
    meridian: 'lung',
    number: 3,
    canonicalOneLiner:
      'LU3 (Tianfu) is an acupoint on the Lung meridian, classically used for cough, asthma, and nosebleed.',
    location:
      'On the medial aspect of the arm, on the radial border of biceps brachii, 3 cun below the anterior end of the axillary fold.',
    category: [],
    actions: ['cough', 'asthma', 'nosebleed', 'thyroid disorders', 'upper arm pain'],
    cautions: ['Classical texts forbid moxibustion at this point.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU4',
    name: 'Xiabai',
    pinyin: 'Xiábái',
    hanzi: '侠白',
    meridian: 'lung',
    number: 4,
    canonicalOneLiner:
      'LU4 (Xiabai) is an acupoint on the Lung meridian, classically used for cough, asthma, and dry retching.',
    location:
      'On the medial aspect of the arm, on the radial border of biceps brachii, 4 cun below the anterior end of the axillary fold, or 5 cun above the cubital crease.',
    category: [],
    actions: ['cough', 'asthma', 'dry retching', 'upper arm pain', 'rapid heartbeat'],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU5',
    name: 'Chize',
    pinyin: 'Chǐzé',
    hanzi: '尺泽',
    meridian: 'lung',
    number: 5,
    canonicalOneLiner:
      'LU5 (Chize) is an acupoint on the Lung meridian, classically used for cough, asthma, and coughing blood.',
    location:
      'At the cubital crease, in the depression on the radial side of the tendon of biceps brachii.',
    category: ['he-sea'],
    actions: [
      'cough',
      'asthma',
      'coughing blood',
      'sore and swollen throat',
      'spasmodic pain of the elbow and arm',
      'acute vomiting and diarrhea',
      'heatstroke',
      'infantile convulsions',
    ],
    cautions: ['Keep clear of the cephalic vein; piercing it can leave bruising and swelling.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU6',
    name: 'Kongzui',
    pinyin: 'Kǒngzuì',
    hanzi: '孔最',
    meridian: 'lung',
    number: 6,
    canonicalOneLiner:
      'LU6 (Kongzui) is an acupoint on the Lung meridian, classically used for cough, asthma, and coughing blood.',
    location:
      'On the radial aspect of the palmar surface of the forearm, on the line connecting Chize (LU5) and Taiyuan (LU9), 7 cun above the wrist crease.',
    category: ['xi-cleft'],
    actions: [
      'cough',
      'asthma',
      'coughing blood',
      'sore and swollen throat',
      'spasmodic pain of the elbow and arm',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU7',
    name: 'Lieque',
    pinyin: 'Lièquē',
    hanzi: '列缺',
    meridian: 'lung',
    number: 7,
    canonicalOneLiner:
      'LU7 (Lieque) is an acupoint on the Lung meridian, classically used for cough, asthma, and sore and swollen throat.',
    location:
      'On the radial edge of the forearm, above the styloid process of the radius, 1.5 cun above the wrist crease, in the groove between brachioradialis and the tendon of abductor pollicis longus.',
    category: ['luo-connecting', 'eight-confluent point (opens the ren vessel)'],
    actions: [
      'cough',
      'asthma',
      'sore and swollen throat',
      'headache',
      'toothache',
      'stiff neck',
      'facial paralysis',
      'wrist pain',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU8',
    name: 'Jingqu',
    pinyin: 'Jīngqú',
    hanzi: '经渠',
    meridian: 'lung',
    number: 8,
    canonicalOneLiner:
      'LU8 (Jingqu) is an acupoint on the Lung meridian, classically used for cough, asthma, and chest pain.',
    location:
      'On the radial aspect of the palmar surface of the forearm, in the depression between the styloid process of the radius and the radial artery, 1 cun above the wrist crease.',
    category: ['jing-river'],
    actions: ['cough', 'asthma', 'chest pain', 'sore and swollen throat', 'wrist pain'],
    cautions: ['Keep the needle clear of the radial artery.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU9',
    name: 'Taiyuan',
    pinyin: 'Tàiyuān',
    hanzi: '太渊',
    meridian: 'lung',
    number: 9,
    canonicalOneLiner:
      'LU9 (Taiyuan) is an acupoint on the Lung meridian, classically used for cough, asthma, and absence of pulse.',
    location:
      'On the radial end of the palmar wrist crease, where the pulse of the radial artery is palpable.',
    category: ['shu-stream', 'yuan-source', 'eight-influential point of the vessel'],
    actions: ['cough', 'asthma', 'absence of pulse', 'wrist and arm pain', 'hiccups'],
    cautions: ['Keep clear of the radial artery: push it aside and insert on its lateral side.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU10',
    name: 'Yuji',
    pinyin: 'Yújì',
    hanzi: '鱼际',
    meridian: 'lung',
    number: 10,
    canonicalOneLiner:
      'LU10 (Yuji) is an acupoint on the Lung meridian, classically used for dry and sore throat, loss of voice, and cough.',
    location:
      'Behind the first metacarpophalangeal joint, at the midpoint of the first metacarpal bone on the radial side, at the junction of the red and white skin.',
    category: ['ying-spring'],
    actions: [
      'dry and sore throat',
      'loss of voice',
      'cough',
      'coughing blood',
      'swelling and pain of the fingers',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LU11',
    name: 'Shaoshang',
    pinyin: 'Shàoshāng',
    hanzi: '少商',
    meridian: 'lung',
    number: 11,
    canonicalOneLiner:
      'LU11 (Shaoshang) is an acupoint on the Lung meridian, classically used for sore and swollen throat, nosebleed, and high fever.',
    location:
      'On the thumb, 0.1 cun from the corner of the nail, on the radial side of the distal phalanx.',
    category: ['jing-well'],
    actions: [
      'sore and swollen throat',
      'nosebleed',
      'high fever',
      'loss of consciousness',
      'mania and epilepsy',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
];

/** Lung-meridian catalogue points, validated at load. */
export const lungPoints: CataloguePoint[] = raw.map((entry) => cataloguePointSchema.parse(entry));
