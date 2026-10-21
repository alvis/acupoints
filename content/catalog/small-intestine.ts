import { cataloguePointSchema } from '../schemas';

import type { CatalogueInput, CataloguePoint } from '../schemas';

const raw: CatalogueInput[] = [
  {
    code: 'SI1',
    name: 'Shaoze',
    pinyin: 'Shàozé',
    hanzi: '少泽',
    meridian: 'small-intestine',
    number: 1,
    canonicalOneLiner:
      'SI1 (Shaoze) is an acupoint on the Small Intestine meridian, classically used for breast abscess, insufficient lactation, and loss of consciousness.',
    location: 'On the little finger, on the ulnar side, 0.1 cun from the corner of the nail.',
    category: ['jing-well'],
    actions: [
      'breast abscess',
      'insufficient lactation',
      'loss of consciousness',
      'febrile disease',
      'headache',
      'eye cloudiness',
      'sore and swollen throat',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI2',
    name: 'Qiangu',
    pinyin: 'Qiángǔ',
    hanzi: '前谷',
    meridian: 'small-intestine',
    number: 2,
    canonicalOneLiner:
      'SI2 (Qiangu) is an acupoint on the Small Intestine meridian, classically used for febrile disease without sweating, headache, and red eyes.',
    location:
      'On the ulnar side of the hand, with the fist slightly clenched, distal to the fifth metacarpophalangeal joint, at the junction of the red and white skin at the head of the transverse crease.',
    category: ['ying-spring'],
    actions: [
      'febrile disease without sweating',
      'headache',
      'red eyes',
      'tinnitus',
      'sore and swollen throat',
      'breast abscess',
      'insufficient lactation',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI3',
    name: 'Houxi',
    pinyin: 'Hòuxī',
    hanzi: '后溪',
    meridian: 'small-intestine',
    number: 3,
    canonicalOneLiner:
      'SI3 (Houxi) is an acupoint on the Small Intestine meridian, classically used for stiffness and pain of the head and neck, lower back pain, and spasm and pain of the fingers, elbow, and arm.',
    location:
      'On the ulnar side of the hand, with the fist slightly clenched, proximal to the fifth metacarpophalangeal joint, at the junction of the red and white skin at the head of the far transverse palmar crease.',
    category: ['shu-stream', 'eight-confluent point (opens the du vessel)'],
    actions: [
      'stiffness and pain of the head and neck',
      'lower back pain',
      'spasm and pain of the fingers, elbow, and arm',
      'deafness',
      'red eyes',
      'mania and epilepsy',
      'malaria',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI4',
    name: 'Wangu',
    pinyin: 'Wàngǔ',
    hanzi: '腕骨',
    meridian: 'small-intestine',
    number: 4,
    canonicalOneLiner:
      'SI4 (Wangu) is an acupoint on the Small Intestine meridian, classically used for spasm of the fingers and wrist pain, stiffness and pain of the head and neck, and eye cloudiness.',
    location:
      'On the ulnar side of the palm, in the depression between the base of the fifth metacarpal bone and the hamate bone, at the junction of the red and white skin.',
    category: ['yuan-source'],
    actions: [
      'spasm of the fingers and wrist pain',
      'stiffness and pain of the head and neck',
      'eye cloudiness',
      'jaundice',
      'febrile disease',
      'malaria',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI5',
    name: 'Yanggu',
    pinyin: 'Yánggǔ',
    hanzi: '阳谷',
    meridian: 'small-intestine',
    number: 5,
    canonicalOneLiner:
      'SI5 (Yanggu) is an acupoint on the Small Intestine meridian, classically used for swelling of the neck and jaw, pain along the outer arm and wrist, and headache.',
    location:
      'On the ulnar side of the wrist, in the depression between the styloid process of the ulna and the triquetral bone.',
    category: ['jing-river'],
    actions: [
      'swelling of the neck and jaw',
      'pain along the outer arm and wrist',
      'headache',
      'dizziness',
      'toothache',
      'tinnitus',
      'deafness',
      'febrile disease',
      'mania and epilepsy',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI6',
    name: 'Yanglao',
    pinyin: 'Yǎnglǎo',
    hanzi: '养老',
    meridian: 'small-intestine',
    number: 6,
    canonicalOneLiner:
      'SI6 (Yanglao) is an acupoint on the Small Intestine meridian, classically used for blurred vision, aching pain of the shoulder, back, elbow, and arm, and lower back pain.',
    location:
      'On the dorsum of the forearm, on the ulnar side, in the bony gap radial to the head of the ulna; found by turning the palm to the chest so the gap opens.',
    category: ['xi-cleft'],
    actions: [
      'blurred vision',
      'aching pain of the shoulder, back, elbow, and arm',
      'lower back pain',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI7',
    name: 'Zhizheng',
    pinyin: 'Zhīzhèng',
    hanzi: '支正',
    meridian: 'small-intestine',
    number: 7,
    canonicalOneLiner:
      'SI7 (Zhizheng) is an acupoint on the Small Intestine meridian, classically used for headache, stiff neck, and aching pain of the elbow and arm.',
    location:
      'On the dorsum of the forearm, on the ulnar side, on the line connecting Yanggu (SI5) and Xiaohai (SI8), 5 cun above the dorsal transverse wrist crease.',
    category: ['luo-connecting'],
    actions: [
      'headache',
      'stiff neck',
      'aching pain of the elbow and arm',
      'febrile disease',
      'mania',
      'warts',
      'styes',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI8',
    name: 'Xiaohai',
    pinyin: 'Xiǎohǎi',
    hanzi: '小海',
    meridian: 'small-intestine',
    number: 8,
    canonicalOneLiner:
      'SI8 (Xiaohai) is an acupoint on the Small Intestine meridian, classically used for pain and numbness of the elbow and arm, epilepsy, and gum inflammation.',
    location:
      'Between the olecranon of the ulna and the medial epicondyle of the humerus, in the depression felt with the elbow slightly flexed.',
    category: ['he-sea'],
    actions: [
      'pain and numbness of the elbow and arm',
      'epilepsy',
      'gum inflammation',
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
    code: 'SI9',
    name: 'Jianzhen',
    pinyin: 'Jiānzhēn',
    hanzi: '肩贞',
    meridian: 'small-intestine',
    number: 9,
    canonicalOneLiner:
      'SI9 (Jianzhen) is an acupoint on the Small Intestine meridian, classically used for shoulder and arm pain, paralysis of the upper limb, and cervical scrofula.',
    location:
      'Below the posterior aspect of the shoulder joint, 1 cun above the end of the posterior axillary fold when the arm is adducted.',
    category: [],
    actions: [
      'shoulder and arm pain',
      'paralysis of the upper limb',
      'cervical scrofula',
      'tinnitus',
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
    code: 'SI10',
    name: 'Naoshu',
    pinyin: 'Nàoshū',
    hanzi: '臑俞',
    meridian: 'small-intestine',
    number: 10,
    canonicalOneLiner:
      'SI10 (Naoshu) is an acupoint on the Small Intestine meridian, classically used for shoulder and arm pain, inability to raise the shoulder, and cervical scrofula.',
    location:
      'On the shoulder, directly above the end of the posterior axillary fold, in the depression below the lower border of the spine of the scapula.',
    category: ['crossing-point'],
    actions: ['shoulder and arm pain', 'inability to raise the shoulder', 'cervical scrofula'],
    cautions: ['Needle cautiously and shallowly.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI11',
    name: 'Tianzong',
    pinyin: 'Tiānzōng',
    hanzi: '天宗',
    meridian: 'small-intestine',
    number: 11,
    canonicalOneLiner:
      'SI11 (Tianzong) is an acupoint on the Small Intestine meridian, classically used for pain of the scapula and shoulder-back region, shortness of breath, and mastitis.',
    location:
      'On the scapula, in the centre of the infraspinous fossa, level with the fourth thoracic vertebra.',
    category: [],
    actions: ['pain of the scapula and shoulder-back region', 'shortness of breath', 'mastitis'],
    cautions: [
      'Keep insertion shallow, angled obliquely or in a safe direction away from the pleura.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI12',
    name: 'Bingfeng',
    pinyin: 'Bǐngfēng',
    hanzi: '秉风',
    meridian: 'small-intestine',
    number: 12,
    canonicalOneLiner:
      'SI12 (Bingfeng) is an acupoint on the Small Intestine meridian, classically used for scapular pain, numbness and aching of the upper limb, and inability to raise the arm.',
    location:
      'On the scapula, in the centre of the supraspinous fossa directly above Tianzong (SI11), where a depression appears when the arm is raised.',
    category: ['crossing-point'],
    actions: [
      'scapular pain',
      'numbness and aching of the upper limb',
      'inability to raise the arm',
      'bronchitis',
    ],
    cautions: ['Do not drive the needle deep toward the chest cavity.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI13',
    name: 'Quyuan',
    pinyin: 'Qūyuán',
    hanzi: '曲垣',
    meridian: 'small-intestine',
    number: 13,
    canonicalOneLiner:
      'SI13 (Quyuan) is an acupoint on the Small Intestine meridian, classically used for pain of the scapula and upper back.',
    location:
      'On the scapula, at the medial end of the supraspinous fossa, midway between Naoshu (SI10) and the spinous process of the second thoracic vertebra.',
    category: [],
    actions: ['pain of the scapula and upper back'],
    cautions: ['Keep insertion shallow; a deep or misaimed needle can reach the chest wall.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI14',
    name: 'Jianwaishu',
    pinyin: 'Jiānwàishū',
    hanzi: '肩外俞',
    meridian: 'small-intestine',
    number: 14,
    canonicalOneLiner:
      'SI14 (Jianwaishu) is an acupoint on the Small Intestine meridian, classically used for shoulder and back pain, stiffness of the neck and nape, and weakness of the arm.',
    location:
      'On the upper back, 3 cun lateral to the lower border of the spinous process of the first thoracic vertebra.',
    category: [],
    actions: ['shoulder and back pain', 'stiffness of the neck and nape', 'weakness of the arm'],
    cautions: ['Keep insertion shallow; the needle could puncture the pleura.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI15',
    name: 'Jianzhongshu',
    pinyin: 'Jiānzhōngshū',
    hanzi: '肩中俞',
    meridian: 'small-intestine',
    number: 15,
    canonicalOneLiner:
      'SI15 (Jianzhongshu) is an acupoint on the Small Intestine meridian, classically used for cough, shortness of breath, and shoulder and back pain.',
    location:
      'On the upper back, 2 cun lateral to the lower border of the spinous process of the seventh cervical vertebra.',
    category: [],
    actions: ['cough', 'shortness of breath', 'shoulder and back pain', 'blurred vision'],
    cautions: ['Keep insertion shallow; too much depth can damage the lung.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI16',
    name: 'Tianchuang',
    pinyin: 'Tiānchuāng',
    hanzi: '天窗',
    meridian: 'small-intestine',
    number: 16,
    canonicalOneLiner:
      'SI16 (Tianchuang) is an acupoint on the Small Intestine meridian, classically used for tinnitus, deafness, and sore and swollen throat.',
    location:
      'On the lateral side of the neck, on the posterior border of the sternocleidomastoid muscle, posterior to Futu (LI18), level with the laryngeal prominence.',
    category: [],
    actions: [
      'tinnitus',
      'deafness',
      'sore and swollen throat',
      'sudden loss of voice',
      'stiffness and pain of the neck',
    ],
    cautions: [
      'Keep clear of the carotid artery, which lies beneath this point; the needle must not strike it.',
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI17',
    name: 'Tianrong',
    pinyin: 'Tiānróng',
    hanzi: '天容',
    meridian: 'small-intestine',
    number: 17,
    canonicalOneLiner:
      'SI17 (Tianrong) is an acupoint on the Small Intestine meridian, classically used for tinnitus, deafness, and swollen sore throat.',
    location:
      'On the lateral side of the neck, posterior to the angle of the mandible, in the depression on the anterior border of the sternocleidomastoid muscle.',
    category: [],
    actions: [
      'tinnitus',
      'deafness',
      'swollen sore throat',
      'sudden loss of voice',
      'swelling and pain of the neck',
      'goitre',
      'cough with rebellious qi',
    ],
    cautions: [
      "Needle cautiously; the neck's large vessels and nerves are close — keep clear of the carotid artery and the deeper neurovascular structures.",
    ],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI18',
    name: 'Quanliao',
    pinyin: 'Quánliáo',
    hanzi: '颧髎',
    meridian: 'small-intestine',
    number: 18,
    canonicalOneLiner:
      'SI18 (Quanliao) is an acupoint on the Small Intestine meridian, classically used for facial paralysis with deviation of the mouth and eye, twitching of the eyelids, and red swollen eyes.',
    location:
      'On the face, directly below the outer canthus of the eye, in the depression on the lower border of the zygomatic bone.',
    category: ['crossing-point'],
    actions: [
      'facial paralysis with deviation of the mouth and eye',
      'twitching of the eyelids',
      'red swollen eyes',
      'toothache',
      'facial pain',
      'swelling of the cheek',
      'trigeminal neuralgia',
    ],
    cautions: ['No moxibustion, per the classical texts.'],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
  {
    code: 'SI19',
    name: 'Tinggong',
    pinyin: 'Tīnggōng',
    hanzi: '听宫',
    meridian: 'small-intestine',
    number: 19,
    canonicalOneLiner:
      'SI19 (Tinggong) is an acupoint on the Small Intestine meridian, classically used for tinnitus, deafness, and discharge of pus from the ear.',
    location:
      'On the face, anterior to the tragus of the ear and posterior to the condyloid process of the mandible, in the depression that opens when the mouth is opened.',
    category: ['crossing-point'],
    actions: [
      'tinnitus',
      'deafness',
      'discharge of pus from the ear',
      'toothache',
      'loss of voice',
    ],
    cautions: [],
    sources: [
      'aijiu-mpvue (MIT License), complateXwInfo.json — Chinese-language location, indications, and point class for this entry.',
      'English wording authored in-house (2026) from the Chinese-language record, following WHO Standard Acupuncture Point Locations in the Western Pacific Region (2008) nomenclature conventions.',
    ],
    lastReviewed: '2026-08-22',
  },
];

/** Small Intestine-meridian catalogue points, validated at load. */
export const smallIntestinePoints: CataloguePoint[] = raw.map((entry) =>
  cataloguePointSchema.parse(entry),
);
