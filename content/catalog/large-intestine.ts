import { cataloguePointSchema } from '../schemas';

import type { CatalogueInput, CataloguePoint } from '../schemas';

const raw: CatalogueInput[] = [
  {
    code: 'LI1',
    name: 'Shangyang',
    pinyin: 'Shāngyáng',
    hanzi: '商阳',
    meridian: 'large-intestine',
    number: 1,
    canonicalOneLiner:
      'LI1 (Shangyang) is an acupoint on the Large Intestine meridian, classically used for toothache, sore swollen throat, and febrile disease.',
    location:
      'On the index finger, on the radial side of the distal segment, 0.1 cun from the corner of the nail.',
    category: ['jing-well'],
    actions: [
      'toothache',
      'sore swollen throat',
      'febrile disease',
      'loss of consciousness',
      'deafness',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI2',
    name: 'Erjian',
    pinyin: 'ěrjiān',
    hanzi: '二间',
    meridian: 'large-intestine',
    number: 2,
    canonicalOneLiner:
      'LI2 (Erjian) is an acupoint on the Large Intestine meridian, classically used for toothache, nosebleed, and febrile disease.',
    location:
      'With the fist slightly clenched, on the radial side of the index finger, in the depression distal to the second metacarpophalangeal joint, at the junction of the red and white skin.',
    category: ['ying-spring'],
    actions: [
      'toothache',
      'nosebleed',
      'febrile disease',
      'eye disorders',
      'periarthritis of the shoulder',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI3',
    name: 'Sanjian',
    pinyin: 'Sānjiān',
    hanzi: '三间',
    meridian: 'large-intestine',
    number: 3,
    canonicalOneLiner:
      'LI3 (Sanjian) is an acupoint on the Large Intestine meridian, classically used for toothache, sore swollen throat, and abdominal distension.',
    location:
      'With the fist slightly clenched, on the radial side of the index finger, in the depression proximal to the second metacarpophalangeal joint, at the junction of the red and white skin.',
    category: ['shu-stream'],
    actions: [
      'toothache',
      'sore swollen throat',
      'abdominal distension',
      'borborygmus',
      'drowsiness',
      'swollen painful fingers',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI4',
    name: 'Hegu',
    pinyin: 'Hégǔ',
    hanzi: '合谷',
    meridian: 'large-intestine',
    number: 4,
    canonicalOneLiner:
      'LI4 (Hegu) is an acupoint on the Large Intestine meridian, classically used for headache, red swollen eyes, and nosebleed.',
    location:
      'On the dorsum of the hand, between the first and second metacarpal bones, at the midpoint of the radial side of the second metacarpal bone; classically located by placing the transverse crease of one thumb over the web margin between thumb and index finger of the other hand, where the thumb tip falls.',
    category: ['yuan-source'],
    actions: [
      'headache',
      'red swollen eyes',
      'nosebleed',
      'toothache',
      'deviation of the mouth and eye',
      'deafness',
      'pain of the limbs and internal organs',
      'febrile disease with absence or excess of sweating',
      'amenorrhea',
      'lumbar sprain',
      'stiff neck',
      'wrist pain',
      'hiccups',
    ],
    cautions: [
      'Use with caution, or not at all, in pregnancy; research shows needling here markedly strengthens uterine contractions, and stimulating it in pregnancy can bring on miscarriage.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI5',
    name: 'Yangxi',
    pinyin: 'Yángxī',
    hanzi: '阳溪',
    meridian: 'large-intestine',
    number: 5,
    canonicalOneLiner:
      'LI5 (Yangxi) is an acupoint on the Large Intestine meridian, classically used for wrist pain, headache, and red swollen eyes.',
    location:
      'On the radial end of the dorsal transverse wrist crease, in the depression between the tendons of the extensor pollicis longus and extensor pollicis brevis when the thumb is tilted upward.',
    category: ['jing-river'],
    actions: ['wrist pain', 'headache', 'red swollen eyes', 'deafness', 'toothache', 'epilepsy'],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI6',
    name: 'Pianli',
    pinyin: 'Piānlì',
    hanzi: '偏历',
    meridian: 'large-intestine',
    number: 6,
    canonicalOneLiner:
      'LI6 (Pianli) is an acupoint on the Large Intestine meridian, classically used for tinnitus, nosebleed, and conjunctivitis.',
    location:
      'With the elbow flexed, on the radial side of the dorsum of the forearm, on the line connecting Yangxi (LI5) and Quchi (LI11), 3 cun above the dorsal transverse wrist crease.',
    category: ['luo-connecting'],
    actions: [
      'tinnitus',
      'nosebleed',
      'conjunctivitis',
      'aching pain of the arm',
      'abdominal fullness and distension',
      'edema',
      'facial paralysis',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI7',
    name: 'Wenliu',
    pinyin: 'Wēnliū',
    hanzi: '温溜',
    meridian: 'large-intestine',
    number: 7,
    canonicalOneLiner:
      'LI7 (Wenliu) is an acupoint on the Large Intestine meridian, classically used for acute borborygmus and abdominal pain, boils and sores, and headache.',
    location:
      'With the elbow flexed, on the radial side of the dorsum of the forearm, on the line connecting Yangxi (LI5) and Quchi (LI11), 5 cun above the dorsal transverse wrist crease.',
    category: ['xi-cleft'],
    actions: [
      'acute borborygmus and abdominal pain',
      'boils and sores',
      'headache',
      'facial swelling',
      'sore swollen throat',
      'aching shoulder and back',
      'mania',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI8',
    name: 'Xialian',
    pinyin: 'Xiàlián',
    hanzi: '下廉',
    meridian: 'large-intestine',
    number: 8,
    canonicalOneLiner:
      'LI8 (Xialian) is an acupoint on the Large Intestine meridian, classically used for elbow and arm pain, headache, and dizziness.',
    location:
      'On the radial side of the dorsum of the forearm, on the line connecting Yangxi (LI5) and Quchi (LI11), 4 cun below the elbow crease.',
    category: [],
    actions: [
      'elbow and arm pain',
      'headache',
      'dizziness',
      'eye pain',
      'abdominal distension and pain',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI9',
    name: 'Shanglian',
    pinyin: 'Shànglián',
    hanzi: '上廉',
    meridian: 'large-intestine',
    number: 9,
    canonicalOneLiner:
      'LI9 (Shanglian) is an acupoint on the Large Intestine meridian, classically used for elbow and arm pain, hemiplegia, and numbness of the hand and arm.',
    location:
      'On the radial side of the dorsum of the forearm, on the line connecting Yangxi (LI5) and Quchi (LI11), 3 cun below the elbow crease.',
    category: [],
    actions: [
      'elbow and arm pain',
      'hemiplegia',
      'numbness of the hand and arm',
      'headache',
      'borborygmus and abdominal pain',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI10',
    name: 'Shousanli',
    pinyin: 'Shǒusānlǐ',
    hanzi: '手三里',
    meridian: 'large-intestine',
    number: 10,
    canonicalOneLiner:
      'LI10 (Shousanli) is an acupoint on the Large Intestine meridian, classically used for weakness of the arm, paralysis of the upper limb, and abdominal pain.',
    location:
      'On the radial side of the dorsum of the forearm, on the line connecting Yangxi (LI5) and Quchi (LI11), 2 cun below the elbow crease.',
    category: [],
    actions: [
      'weakness of the arm',
      'paralysis of the upper limb',
      'abdominal pain',
      'diarrhea',
      'toothache',
      'swelling of the cheek',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI11',
    name: 'Quchi',
    pinyin: 'Qūchí',
    hanzi: '曲池',
    meridian: 'large-intestine',
    number: 11,
    canonicalOneLiner:
      'LI11 (Quchi) is an acupoint on the Large Intestine meridian, classically used for painful obstruction and paralysis of the arm, febrile disease, and hypertension.',
    location:
      'At the lateral end of the elbow crease; found with the elbow flexed at a right angle, at the midpoint of the line between the lateral end of the crease and the lateral epicondyle of the humerus.',
    category: ['he-sea'],
    actions: [
      'painful obstruction and paralysis of the arm',
      'febrile disease',
      'hypertension',
      'mania',
      'abdominal pain',
      'vomiting and diarrhea',
      'sore swollen throat',
      'toothache',
      'urticaria',
      'eczema',
      'cervical scrofula',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI12',
    name: 'Zhouliao',
    pinyin: 'Zhǒuliáo',
    hanzi: '肘髎',
    meridian: 'large-intestine',
    number: 12,
    canonicalOneLiner:
      'LI12 (Zhouliao) is an acupoint on the Large Intestine meridian, classically used for pain, numbness, and spasm of the elbow and arm.',
    location:
      'On the outer aspect of the arm, with the elbow flexed, 1 cun above Quchi (LI11), on the border of the humerus.',
    category: [],
    actions: ['pain, numbness, and spasm of the elbow and arm'],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI13',
    name: 'Shouwuli',
    pinyin: 'Shǒuwǔlǐ',
    hanzi: '手五里',
    meridian: 'large-intestine',
    number: 13,
    canonicalOneLiner:
      'LI13 (Shouwuli) is an acupoint on the Large Intestine meridian, classically used for spastic pain of the elbow and arm, and cervical scrofula.',
    location:
      'On the outer aspect of the arm, on the line connecting Quchi (LI11) and Jianyu (LI15), 3 cun above Quchi.',
    category: [],
    actions: ['spastic pain of the elbow and arm', 'cervical scrofula'],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI14',
    name: 'Binao',
    pinyin: 'Bìnào',
    hanzi: '臂臑',
    meridian: 'large-intestine',
    number: 14,
    canonicalOneLiner:
      'LI14 (Binao) is an acupoint on the Large Intestine meridian, classically used for shoulder and arm pain with paralysis, spasm of the neck and nape, and cervical scrofula.',
    location:
      'On the line connecting Quchi (LI11) and Jianyu (LI15), 7 cun above Quchi; with the arm hanging naturally it lies on the outer aspect of the arm at the insertion of the deltoid muscle.',
    category: [],
    actions: [
      'shoulder and arm pain with paralysis',
      'spasm of the neck and nape',
      'cervical scrofula',
      'eye disorders',
      'headache',
    ],
    cautions: [
      'Classical texts favour moxibustion over needling here; if needled, go no deeper than three to five fen.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI15',
    name: 'Jianyu',
    pinyin: 'Jiānyú',
    hanzi: '肩髃',
    meridian: 'large-intestine',
    number: 15,
    canonicalOneLiner:
      'LI15 (Jianyu) is an acupoint on the Large Intestine meridian, classically used for contracture and pain of the shoulder and arm, paralysis of the upper limb, and urticaria.',
    location:
      'On the shoulder, on the deltoid muscle, in the anteroinferior depression below the acromion that appears when the arm is abducted or extended forward horizontally.',
    category: ['crossing-point'],
    actions: [
      'contracture and pain of the shoulder and arm',
      'paralysis of the upper limb',
      'urticaria',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI16',
    name: 'Jugu',
    pinyin: 'Jùgǔ',
    hanzi: '巨骨',
    meridian: 'large-intestine',
    number: 16,
    canonicalOneLiner:
      'LI16 (Jugu) is an acupoint on the Large Intestine meridian, classically used for contracture and pain of the shoulder and arm, inability to raise the shoulder, and cervical scrofula.',
    location:
      'In the depression between the acromial end of the clavicle and the spine of the scapula.',
    category: ['crossing-point'],
    actions: [
      'contracture and pain of the shoulder and arm',
      'inability to raise the shoulder',
      'cervical scrofula',
      'goitre',
    ],
    cautions: [
      'Keep insertion shallow so the needle cannot enter the chest cavity and cause pneumothorax.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI17',
    name: 'Tianding',
    pinyin: 'Tiāndǐng',
    hanzi: '天鼎',
    meridian: 'large-intestine',
    number: 17,
    canonicalOneLiner:
      'LI17 (Tianding) is an acupoint on the Large Intestine meridian, classically used for sudden loss of voice with obstructed qi, sore swollen throat, and cervical scrofula.',
    location:
      'On the lateral side of the neck, on the posterior border of the sternocleidomastoid muscle beside the laryngeal prominence, midway between Futu (LI18) and Quepen (ST12).',
    category: [],
    actions: [
      'sudden loss of voice with obstructed qi',
      'sore swollen throat',
      'cervical scrofula',
      'goitre',
    ],
    cautions: [
      'Needle cautiously and shallowly, steering clear of the large vessels and nerves nearby and away from the top of the lung.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI18',
    name: 'Futu',
    pinyin: 'Fútū',
    hanzi: '扶突',
    meridian: 'large-intestine',
    number: 18,
    canonicalOneLiner:
      'LI18 (Futu) is an acupoint on the Large Intestine meridian, classically used for sore swollen throat, sudden loss of voice, and goitre.',
    location:
      'On the lateral side of the neck, level with the laryngeal prominence, between the anterior and posterior borders of the sternocleidomastoid muscle.',
    category: [],
    actions: [
      'sore swollen throat',
      'sudden loss of voice',
      'goitre',
      'cervical scrofula',
      'cough',
      'shortness of breath',
      'diaphragmatic spasm',
    ],
    cautions: [
      'Needle cautiously and shallowly. The carotid sheath and vagus nerve lie next to this point — keep clear of the carotid artery.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI19',
    name: 'Kouheliao',
    pinyin: 'Kǒuhéliáo',
    hanzi: '口禾髎',
    meridian: 'large-intestine',
    number: 19,
    canonicalOneLiner:
      'LI19 (Kouheliao) is an acupoint on the Large Intestine meridian, classically used for nasal congestion, nasal discharge and bleeding, and deviation of the mouth.',
    location:
      'On the upper lip, directly below the lateral border of the nostril, level with Shuigou (GV26).',
    category: [],
    actions: [
      'nasal congestion',
      'nasal discharge and bleeding',
      'deviation of the mouth',
      'lockjaw',
    ],
    cautions: ['No moxibustion — the classical texts are explicit on this.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'LI20',
    name: 'Yingxiang',
    pinyin: 'Yíngxiāng',
    hanzi: '迎香',
    meridian: 'large-intestine',
    number: 20,
    canonicalOneLiner:
      'LI20 (Yingxiang) is an acupoint on the Large Intestine meridian, classically used for nasal congestion with loss of smell, nasal discharge and bleeding, and deviation of the mouth.',
    location:
      'Beside the midpoint of the lateral border of the nasal ala, in the nasolabial groove.',
    category: ['crossing-point'],
    actions: [
      'nasal congestion with loss of smell',
      'nasal discharge and bleeding',
      'deviation of the mouth',
      'lockjaw',
      'facial itching and swelling',
      'nasal polyps',
    ],
    cautions: ['No moxibustion — the classical texts are explicit on this.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
];

/** Large Intestine-meridian catalogue points, validated at load. */
export const largeIntestinePoints: CataloguePoint[] = raw.map((entry) =>
  cataloguePointSchema.parse(entry),
);
