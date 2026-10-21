import { catalogue } from './catalog';
import { pointSchema } from './schemas';

import type { AnyPoint, Point } from './schemas';

const raw: Point[] = [
  pointSchema.parse({
    code: 'LI4',
    name: 'Hegu',
    pinyin: 'Hé Gǔ',
    hanzi: '合谷',
    meridian: 'large-intestine',
    region: 'hand',
    element: 'metal',
    category: ['yuan-source'],
    whoCoordinates:
      'On the dorsum of the hand, radial to the midpoint of the second metacarpal bone.',
    difficultyToLocate: 1,
    pregnancySafe: false,
    canonicalOneLiner:
      'LI4 (Hegu) is a hand acupoint on the Large Intestine meridian, classically used for headache, facial pain, and immune support; it is contraindicated in pregnancy.',
    questionHeadings: [
      'Where is LI4?',
      'How do you find LI4?',
      'Is LI4 safe in pregnancy?',
      'How long should you press LI4?',
    ],
    faqs: [
      {
        q: 'Is LI4 safe during pregnancy?',
        a: 'No. LI4 is traditionally contraindicated in pregnancy because of its strong descending action. Avoid pressing it during pregnancy; rest your hands and consult a licensed practitioner.',
      },
      {
        q: 'How long should I press LI4?',
        a: 'Most people feel something in 30–90 seconds of firm, steady pressure. Breathe slowly; release if it feels sharp. Try a different point after two minutes if you feel nothing.',
      },
      {
        q: "Why is LI4 called 'Hegu'?",
        a: "'He' means 'joining' and 'gu' means 'valley' — a reference to the soft V-shaped hollow between your thumb and index finger where the point is located.",
      },
    ],
    about: [
      'meridian:large-intestine',
      'condition:tension-headache',
      'condition:nausea-after-treatment',
      'condition:after-stroke-limbs',
      'condition:fatigue',
      'condition:labour-pain',
    ],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Rest your hand palm-down on a table.',
      'Bring your thumb alongside your index finger so the muscle between them rises into a visible mound.',
      'Mark the highest point of that mound, then relax the hand.',
      'Press gently into that spot, angling slightly toward the base of the index finger. A dull, heavy sensation means you have found it.',
    ],
    body: [],
    related: ['LV3', 'GB20', 'ST36'],
  }),
  pointSchema.parse({
    code: 'PC6',
    name: 'Neiguan',
    pinyin: 'Nèi Guān',
    hanzi: '內關',
    meridian: 'pericardium',
    region: 'arm',
    element: 'fire',
    category: ['luo-connecting', 'confluent'],
    whoCoordinates:
      'On the palmar side of the forearm, 2 cun proximal to the wrist crease, between the tendons of palmaris longus and flexor carpi radialis.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'PC6 (Neiguan) is a forearm acupoint on the Pericardium meridian, classically used for nausea, motion sickness, anxiety, and palpitations.',
    questionHeadings: [
      'Where is PC6?',
      'How do you find PC6 quickly?',
      'Does PC6 really help with nausea?',
      'How long should you press PC6?',
    ],
    faqs: [
      {
        q: 'Does PC6 help with travel nausea?',
        a: 'PC6 is the point behind the motion-sickness wristbands sold in pharmacies. Clinical reviews suggest stimulation at this site reduces nausea in some contexts — worth trying, and generally low-risk.',
      },
      {
        q: 'How long should I press PC6?',
        a: 'Press steadily for 30–60 seconds, breathing slowly, then swap to the other arm. You can repeat every few minutes as needed.',
      },
      {
        q: 'Is PC6 safe in pregnancy?',
        a: 'Yes. PC6 is often used for morning sickness. Press gently rather than deeply, and stop if the sensation is uncomfortable.',
      },
    ],
    about: [
      'meridian:pericardium',
      'condition:travel-nausea',
      'condition:nausea-after-treatment',
      'condition:bloating',
    ],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
      'Lee A, Chan SKC, Fan LTY. Stimulation of the wrist acupuncture point PC6 for preventing postoperative nausea and vomiting. Cochrane Database Syst Rev. 2015.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Turn your forearm so the palm faces up.',
      'Place three fingers across your wrist starting at the crease — PC6 sits just above your index finger.',
      'Feel for the soft channel between the two tendons that run down the centre of the forearm.',
      'Press steadily into that channel; a dull, tingling sensation confirms the location.',
    ],
    body: [],
    related: ['HT7', 'ST36', 'LI4'],
  }),
  pointSchema.parse({
    code: 'ST36',
    name: 'Zusanli',
    pinyin: 'Zú Sān Lǐ',
    hanzi: '足三里',
    meridian: 'stomach',
    region: 'leg',
    element: 'earth',
    category: ['he-sea', 'command-point'],
    whoCoordinates:
      'On the anterior aspect of the lower leg, 3 cun below ST35, one finger-breadth lateral to the anterior crest of the tibia.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'ST36 (Zusanli) is a lower-leg acupoint on the Stomach meridian, classically considered a point of general vitality — used for digestion, fatigue, and immune support.',
    questionHeadings: [
      'Where is ST36?',
      'Why is ST36 called the longevity point?',
      'How do you locate ST36 without a ruler?',
      'How often can you press ST36?',
    ],
    faqs: [
      {
        q: 'Can ST36 really give you more energy?',
        a: 'In TCM, ST36 is described as tonifying qi. Modern readers can think of it as one of the most widely used supportive points for fatigue and low appetite.',
      },
      {
        q: 'How do I find ST36 without measuring?',
        a: 'Sit with your knee bent. Cup your kneecap with your palm; your ring finger lands about where ST36 sits — then move one finger-width toward the outside of the shin.',
      },
      {
        q: 'How often can I stimulate ST36?',
        a: 'Once or twice a day, 30–60 seconds per leg, is plenty. Classical practice prizes consistency over intensity.',
      },
    ],
    about: [
      'meridian:stomach',
      'condition:nausea-after-treatment',
      'condition:bloating',
      'condition:constipation',
      'condition:knee-arthritis',
      'condition:fatigue',
    ],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Sit with your knee bent at about 90 degrees.',
      'Cup your kneecap with your palm; your ring finger should rest just below the knee.',
      'From where your ring finger lands, move one finger-width toward the outside of the shin.',
      'You will feel a slight hollow as you press — that is ST36.',
    ],
    body: [
      {
        heading: 'Why is ST36 called the longevity point?',
        content:
          'Japanese and Chinese folk traditions use ST36 as a daily self-care point; the name “three-li” suggests you could walk three more li (a classical measure) after stimulating it. Modern practitioners read it more soberly — a reliable general support point, not a fountain of youth.',
      },
    ],
    related: ['SP6', 'LI4', 'PC6'],
  }),
  pointSchema.parse({
    code: 'GB20',
    name: 'Fengchi',
    pinyin: 'Fēng Chí',
    hanzi: '風池',
    meridian: 'gallbladder',
    region: 'head',
    element: 'wood',
    category: ['meeting'],
    whoCoordinates:
      'In the hollow between the upper trapezius and sternocleidomastoid muscles at the base of the skull.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'GB20 (Fengchi) is a neck acupoint on the Gallbladder meridian, classically used for headache, neck tension, eye strain, and early cold symptoms.',
    questionHeadings: [
      'Where is GB20?',
      'How do you press GB20 safely?',
      'Does GB20 help screen headaches?',
      'Can you use GB20 every day?',
    ],
    faqs: [
      {
        q: 'Is GB20 safe to press firmly?',
        a: 'Press steadily, not sharply. The point sits near sensitive vessels and nerves, so aim for a dull, warming sensation rather than deep, forceful digging.',
      },
      {
        q: 'Does GB20 help with headaches from screens?',
        a: 'It is among the classical choices for tension headache — particularly pain that radiates from the base of the skull to the temples or eyes.',
      },
      {
        q: 'Can I press GB20 every day?',
        a: 'Yes — thirty to ninety seconds, once or twice a day is typical. If your neck feels more strained afterwards, ease up and spread your attention across the surrounding muscles.',
      },
    ],
    about: ['meridian:gallbladder', 'condition:tension-headache', 'condition:desk-neck-shoulder'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Tilt your head slightly forward.',
      'Slide your thumbs up the back of your neck until they settle into the two hollows at the base of the skull.',
      'The hollows sit just outside the two thick strap-muscles that run down the centre of the neck.',
      'Press steadily upward and inward with your thumbs — not forward into the spine.',
    ],
    body: [],
    related: ['LI4', 'LV3', 'GV20'],
  }),
  pointSchema.parse({
    code: 'SP6',
    name: 'Sanyinjiao',
    pinyin: 'Sān Yīn Jiāo',
    hanzi: '三陰交',
    meridian: 'spleen',
    region: 'leg',
    element: 'earth',
    category: ['crossing'],
    whoCoordinates:
      'On the inner aspect of the leg, 3 cun above the tip of the medial malleolus, just behind the tibia.',
    difficultyToLocate: 2,
    pregnancySafe: false,
    canonicalOneLiner:
      'SP6 (Sanyinjiao) is an inner-leg acupoint where three yin meridians meet, used for menstrual and digestive concerns; it is contraindicated in pregnancy.',
    questionHeadings: [
      'Where is SP6?',
      'Why is SP6 avoided in pregnancy?',
      'How do you locate SP6 without measuring?',
      'What does SP6 feel like when pressed?',
    ],
    faqs: [
      {
        q: 'Why is SP6 off-limits in pregnancy?',
        a: 'SP6 is a strong downward-moving point used historically to support labour. Pressing it during pregnancy can be too stimulating — avoid it until after birth.',
      },
      {
        q: 'How often can I stimulate SP6?',
        a: 'Once or twice a day, 30–60 seconds per leg, during the non-pregnant parts of the month. Stop a few days before your period if pressing it increases cramping.',
      },
      {
        q: 'Why is it called “three yin meeting”?',
        a: 'SP6 is the crossing point of the Spleen, Liver, and Kidney meridians — three yin channels that run up the inner leg.',
      },
    ],
    about: ['meridian:spleen', 'condition:fatigue', 'condition:labour-pain'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Sit with your foot resting on your opposite knee.',
      'Place four fingers horizontally above the tip of the inner anklebone.',
      'SP6 sits just above your top finger, nestled against the back edge of the shin bone.',
      'Press gently; the spot is often tender — ease in rather than digging.',
    ],
    body: [],
    related: ['ST36', 'LV3', 'KI3'],
  }),
  pointSchema.parse({
    code: 'LV3',
    name: 'Taichong',
    pinyin: 'Tài Chōng',
    hanzi: '太衝',
    meridian: 'liver',
    region: 'foot',
    element: 'earth',
    category: ['yuan-source', 'shu-stream'],
    whoCoordinates:
      'On the dorsum of the foot, in the depression distal to the junction of the first and second metatarsal bones.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'LV3 (Taichong) is a foot acupoint on the Liver meridian, classically used for stress, irritability, headache, and menstrual discomfort.',
    questionHeadings: ['Where is LV3?', 'How do you find LV3?', 'Is LV3 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is LV3 on the foot?',
        a: 'LV3 sits in the hollow on top of the foot, about two finger-widths back from the web between the big toe and second toe, in the valley between those first two metatarsal bones.',
      },
      {
        q: 'How do you find LV3?',
        a: 'Run a fingertip up from the web between your first and second toes along the soft channel between the bones. Where your finger stops against the junction of the bones, drop back a hair — that is LV3.',
      },
      {
        q: 'Is LV3 safe in pregnancy?',
        a: 'LV3 is generally considered acceptable for gentle self-acupressure during pregnancy, but it is a strongly moving point. If pregnant, press lightly and briefly, and check with a licensed practitioner before extended use.',
      },
    ],
    about: ['meridian:liver', 'condition:tension-headache'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Sit so you can reach the top of one foot comfortably.',
      'Find the web between the big toe and the second toe.',
      'Slide a fingertip back along the groove between the first two metatarsal bones until it stops against the junction of the bones; ease back a fraction — that is LV3.',
    ],
    body: [],
    related: ['LI4', 'GB20', 'SP6'],
  }),
  pointSchema.parse({
    code: 'GV20',
    name: 'Baihui',
    pinyin: 'Bǎi Huì',
    hanzi: '百會',
    meridian: 'du',
    region: 'head',
    category: ['meeting'],
    whoCoordinates:
      'On the head, at the intersection of the midline and a line connecting the apexes of the two auricles (ears).',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'GV20 (Baihui) is a crown-of-the-head acupoint on the Governing Vessel, classically used to lift mood, clear the mind, and anchor scattered attention.',
    questionHeadings: [
      'Where is GV20?',
      'How do you find GV20 on your own head?',
      'Is GV20 safe in pregnancy?',
    ],
    faqs: [
      {
        q: 'Where is GV20?',
        a: 'GV20 sits at the very top of the head, where a line drawn up from the tops of both ears meets the midline running front-to-back across the scalp.',
      },
      {
        q: 'How do you find GV20 without a mirror?',
        a: 'Place a thumb at the top of each ear and imagine a line arching between them across the top of the scalp; GV20 is where that line crosses the centre-front-to-back midline.',
      },
      {
        q: 'Is GV20 safe in pregnancy?',
        a: 'Yes. GV20 is considered safe in pregnancy with gentle pressure. Because it is a sensitive point, keep stimulation light and brief.',
      },
    ],
    about: ['meridian:du'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Place a thumb at the top of each ear.',
      'Imagine a line arching up and across the top of the scalp between your thumbs.',
      'Where that line crosses the midline running front-to-back, you will feel a slight soft spot — that is GV20.',
    ],
    body: [],
    related: ['GB20', 'LI4'],
  }),
  pointSchema.parse({
    code: 'CV17',
    name: 'Danzhong',
    pinyin: 'Dàn Zhōng',
    hanzi: '膻中',
    meridian: 'ren',
    region: 'chest',
    category: ['front-mu', 'meeting'],
    whoCoordinates:
      'On the anterior chest, on the midline at the level of the fourth intercostal space.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'CV17 (Danzhong) is a chest acupoint on the Conception Vessel, classically used for tightness in the chest, breath, and grief.',
    questionHeadings: [
      'Where is CV17?',
      'How do you find CV17 without measuring?',
      'Is CV17 safe in pregnancy?',
    ],
    faqs: [
      {
        q: 'Where is CV17 on the chest?',
        a: 'CV17 sits on the midline of the breastbone, roughly level with the nipples in a flat adult chest — anatomically, the level of the fourth intercostal space.',
      },
      {
        q: 'How do I find CV17 without measuring?',
        a: 'Run a fingertip up the centre of the breastbone from the bottom until it is roughly level with where the nipples would be on a flat chest. That region of the sternum is CV17.',
      },
      {
        q: 'Is CV17 safe in pregnancy?',
        a: 'Yes. CV17 is commonly used in pregnancy for chest tightness and emotional tension. Press with flat, steady fingertips rather than a sharp thumb.',
      },
    ],
    about: ['meridian:ren'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Sit upright and find the top edge of your breastbone at the base of the throat.',
      'Run a fingertip down the centre of the breastbone.',
      'At about the level of the nipples on a flat chest — the fourth intercostal space — settle your fingertip on the midline of the sternum. That is CV17.',
    ],
    body: [],
    related: ['PC6', 'LU7', 'HT7'],
  }),
  pointSchema.parse({
    code: 'HT7',
    name: 'Shenmen',
    pinyin: 'Shén Mén',
    hanzi: '神門',
    meridian: 'heart',
    region: 'hand',
    element: 'earth',
    category: ['yuan-source', 'shu-stream'],
    whoCoordinates:
      'On the palmar aspect of the wrist, on the radial side of the flexor carpi ulnaris tendon, at the level of the wrist crease.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'HT7 (Shenmen) is a wrist acupoint on the Heart meridian, classically used for anxiety, insomnia, and a racing mind.',
    questionHeadings: [
      'Where is HT7?',
      'How do you find HT7 on your own wrist?',
      'Is HT7 safe in pregnancy?',
    ],
    faqs: [
      {
        q: 'Where is HT7?',
        a: 'HT7 sits on the palm-side of the wrist crease, on the little-finger side, just inside the tendon you feel there when you make a fist.',
      },
      {
        q: 'How do you find HT7 on your own wrist?',
        a: 'Turn the palm up. Feel along the wrist crease from the little-finger side until you meet the tendon of flexor carpi ulnaris; HT7 is in the soft spot just inside that tendon, on the crease.',
      },
      {
        q: 'Is HT7 safe in pregnancy?',
        a: 'Yes. HT7 is commonly used in pregnancy for anxiety and sleep, with gentle pressure for 30 to 60 seconds per side. Avoid sharp digging — the point sits near the ulnar artery.',
      },
    ],
    about: ['meridian:heart', 'condition:anxiety', 'condition:insomnia'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Turn your wrist palm-up.',
      'Feel along the wrist crease starting from the little-finger side; you will meet a firm tendon (flexor carpi ulnaris).',
      'HT7 sits in the small hollow just inside that tendon, right on the wrist crease.',
    ],
    body: [],
    related: ['PC6', 'KI3'],
  }),
  pointSchema.parse({
    code: 'LU7',
    name: 'Lieque',
    pinyin: 'Liè Quē',
    hanzi: '列缺',
    meridian: 'lung',
    region: 'arm',
    category: ['luo-connecting', 'confluent'],
    whoCoordinates:
      'On the radial side of the forearm, proximal to the wrist crease, in the groove between the tendons of abductor pollicis longus and extensor pollicis brevis, approximately 1.5 cun above the wrist crease.',
    difficultyToLocate: 3,
    pregnancySafe: true,
    canonicalOneLiner:
      'LU7 (Lieque) is a forearm acupoint on the Lung meridian, classically used for head and neck complaints, coughs, and early colds.',
    questionHeadings: [
      'Where is LU7?',
      'How do you find LU7 using the tiger-mouth trick?',
      'Is LU7 safe in pregnancy?',
    ],
    faqs: [
      {
        q: 'Where is LU7?',
        a: 'LU7 sits on the thumb-side of the forearm, just above the wrist crease, in the small groove between two tendons that run into the base of the thumb.',
      },
      {
        q: 'How do you find LU7 using the tiger-mouth trick?',
        a: 'Cross the thumb-and-index web of one hand over the wrist of the other; the tip of your index finger lands very close to LU7, in the groove it settles into.',
      },
      {
        q: 'Is LU7 safe in pregnancy?',
        a: 'Yes. LU7 is safe in pregnancy and commonly used for cough and early cold symptoms. Press gently, for 30 to 60 seconds per side, and stop if the sensation turns sharp.',
      },
    ],
    about: ['meridian:lung'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Hold one hand palm-down and relax it.',
      'With the opposite hand, cross the web between thumb and index finger over the wrist.',
      'Where the tip of the crossing index finger settles into a small groove — about 1.5 cun above the wrist crease on the thumb side — is LU7.',
    ],
    body: [],
    related: ['LI4', 'LI11', 'CV17'],
  }),
  pointSchema.parse({
    code: 'KI3',
    name: 'Taixi',
    pinyin: 'Tài Xī',
    hanzi: '太谿',
    meridian: 'kidney',
    region: 'foot',
    element: 'earth',
    category: ['yuan-source', 'shu-stream'],
    whoCoordinates:
      'On the medial aspect of the foot, in the depression between the tip of the medial malleolus and the Achilles tendon.',
    difficultyToLocate: 1,
    pregnancySafe: true,
    canonicalOneLiner:
      'KI3 (Taixi) is an inner-ankle acupoint on the Kidney meridian, classically used for fatigue, low back ache, tinnitus, and night sweats.',
    questionHeadings: ['Where is KI3?', 'How do you find KI3?', 'Is KI3 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is KI3?',
        a: 'KI3 sits in the soft hollow between the tip of the inner ankle bone and the Achilles tendon at the back of the ankle.',
      },
      {
        q: 'How do you find KI3?',
        a: 'Feel for the tip of your inner anklebone and the taut Achilles tendon behind the ankle. KI3 is in the hollow midway between them, on the same horizontal level as the tip of the anklebone.',
      },
      {
        q: 'Is KI3 safe in pregnancy?',
        a: 'Yes. KI3 is safe in pregnancy. Use steady, gentle pressure for about a minute per ankle.',
      },
    ],
    about: ['meridian:kidney'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Sit so you can reach one inner ankle comfortably.',
      'Feel for the tip of the medial malleolus (inner anklebone) and the Achilles tendon behind the ankle.',
      'KI3 is in the soft hollow midway between them, on the same horizontal level as the tip of the anklebone.',
    ],
    body: [],
    related: ['SP6', 'ST36', 'HT7'],
  }),
  pointSchema.parse({
    code: 'BL40',
    name: 'Weizhong',
    pinyin: 'Wěi Zhōng',
    hanzi: '委中',
    meridian: 'bladder',
    region: 'leg',
    element: 'earth',
    category: ['he-sea', 'command-point'],
    whoCoordinates: 'On the posterior aspect of the knee, at the midpoint of the popliteal crease.',
    difficultyToLocate: 1,
    pregnancySafe: true,
    canonicalOneLiner:
      'BL40 (Weizhong) is a back-of-knee acupoint on the Bladder meridian, classically used for low back pain and stiffness.',
    questionHeadings: ['Where is BL40?', 'How do you find BL40?', 'Is BL40 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is BL40?',
        a: 'BL40 sits in the middle of the crease at the back of the knee, right between the two large tendons you can feel there when you bend the knee.',
      },
      {
        q: 'How do you find BL40?',
        a: 'Bend the knee slightly and feel the crease at the back of it. BL40 is in the middle of that crease, between the two tendons flanking the back of the knee.',
      },
      {
        q: 'Is BL40 safe in pregnancy?',
        a: 'BL40 is considered acceptable in pregnancy for low back discomfort, but the area contains the popliteal artery and nerve — press gently and briefly, never sharply.',
      },
    ],
    about: ['meridian:bladder', 'condition:back-pain', 'condition:after-stroke-limbs'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Stand or sit with the knee slightly bent.',
      'Feel for the crease at the back of the knee and the two firm tendons at either end of it.',
      'BL40 sits in the middle of that crease, midway between the tendons. Use gentle, flat pressure rather than a sharp thumb.',
    ],
    body: [],
    related: ['BL57', 'ST36', 'SP6'],
  }),
  pointSchema.parse({
    code: 'BL57',
    name: 'Chengshan',
    pinyin: 'Chéng Shān',
    hanzi: '承山',
    meridian: 'bladder',
    region: 'leg',
    category: [],
    whoCoordinates:
      'On the posterior aspect of the lower leg, in the depression formed below the two bellies of the gastrocnemius muscle, approximately midway between BL40 and the Achilles tendon.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'BL57 (Chengshan) is a calf acupoint on the Bladder meridian, classically used for calf cramps, heel pain, and lower back strain.',
    questionHeadings: ['Where is BL57?', 'How do you find BL57?', 'Is BL57 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is BL57?',
        a: 'BL57 sits on the back of the calf, in the V-shaped hollow that forms below the two bellies of the calf muscle when you stand on tiptoe.',
      },
      {
        q: 'How do you find BL57?',
        a: 'Rise onto tiptoe briefly — the two bellies of your calf muscle will form an inverted V on the back of the leg. BL57 sits in the small dip just below that V.',
      },
      {
        q: 'Is BL57 safe in pregnancy?',
        a: 'BL57 is generally acceptable in pregnancy for calf cramps, using gentle, steady pressure. Avoid deep, forceful stimulation.',
      },
    ],
    about: ['meridian:bladder'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Stand and briefly rise onto tiptoe so the two bellies of your calf muscle stand out.',
      'Note the inverted-V where those bellies meet at the back of the calf.',
      'BL57 sits in the small depression just below that V, roughly midway between the back of the knee and the Achilles tendon.',
    ],
    body: [],
    related: ['BL40', 'ST36', 'KI3'],
  }),
  pointSchema.parse({
    code: 'SI3',
    name: 'Houxi',
    pinyin: 'Hòu Xī',
    hanzi: '後谿',
    meridian: 'small-intestine',
    region: 'hand',
    element: 'wood',
    category: ['shu-stream', 'confluent'],
    whoCoordinates:
      'On the ulnar side of the hand, in the depression proximal to the head of the fifth metacarpal bone, at the end of the transverse palmar crease when a loose fist is made.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'SI3 (Houxi) is a hand acupoint on the Small Intestine meridian, classically used for neck stiffness, upper back tension, and headache.',
    questionHeadings: ['Where is SI3?', 'How do you find SI3?', 'Is SI3 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is SI3?',
        a: 'SI3 sits on the side of the hand just below the little-finger knuckle, at the end of the crease that appears when you make a loose fist.',
      },
      {
        q: 'How do you find SI3?',
        a: 'Make a loose fist. SI3 is at the end of the transverse crease that forms on the ulnar (little-finger) side of the palm, just below the knuckle of the little finger.',
      },
      {
        q: 'Is SI3 safe in pregnancy?',
        a: 'Yes. SI3 is safe in pregnancy. Press firmly but comfortably for 30 to 60 seconds per hand.',
      },
    ],
    about: ['meridian:small-intestine'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Make a loose fist with one hand.',
      'Note the short transverse crease that forms on the little-finger side of the palm just below the little-finger knuckle.',
      'SI3 sits at the end of that crease, in the small depression just proximal to the head of the fifth metacarpal bone.',
    ],
    body: [],
    related: ['GB20', 'BL40', 'LI4'],
  }),
  pointSchema.parse({
    code: 'TH5',
    name: 'Waiguan',
    pinyin: 'Wài Guān',
    hanzi: '外關',
    meridian: 'san-jiao',
    region: 'arm',
    category: ['luo-connecting', 'confluent'],
    whoCoordinates:
      'On the dorsal aspect of the forearm, 2 cun proximal to the wrist crease, in the depression between the radius and ulna.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'TH5 (Waiguan) is a forearm acupoint on the San Jiao meridian, classically used for head and side-of-neck complaints, ear issues, and wrist pain.',
    questionHeadings: ['Where is TH5?', 'How do you find TH5?', 'Is TH5 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is TH5?',
        a: 'TH5 sits on the back of the forearm, about three finger-widths above the wrist crease, in the soft channel between the two forearm bones.',
      },
      {
        q: 'How do you find TH5?',
        a: 'Turn the forearm so the back of the hand faces up. Place three fingers across the wrist starting at the crease; TH5 sits just above your index finger, between the two forearm bones.',
      },
      {
        q: 'Is TH5 safe in pregnancy?',
        a: 'Yes. TH5 is considered safe in pregnancy. It mirrors PC6 on the palm side and is often used alongside it.',
      },
    ],
    about: ['meridian:san-jiao', 'condition:after-stroke-limbs'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Rest the forearm so the back of the hand faces up.',
      'Place three fingers across the wrist starting at the crease.',
      'TH5 sits just above your index finger, in the soft channel between the radius and ulna — directly opposite PC6 on the palm side.',
    ],
    body: [],
    related: ['PC6', 'GB20', 'LI4'],
  }),
  pointSchema.parse({
    code: 'ST44',
    name: 'Neiting',
    pinyin: 'Nèi Tíng',
    hanzi: '內庭',
    meridian: 'stomach',
    region: 'foot',
    element: 'water',
    category: ['ying-spring'],
    whoCoordinates:
      'On the dorsum of the foot, in the web between the second and third toes, proximal to the web margin at the junction of the red and white skin.',
    difficultyToLocate: 1,
    pregnancySafe: true,
    canonicalOneLiner:
      'ST44 (Neiting) is a foot acupoint on the Stomach meridian, classically used for toothache, facial pain, and heat in the stomach.',
    questionHeadings: ['Where is ST44?', 'How do you find ST44?', 'Is ST44 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is ST44?',
        a: 'ST44 sits on the top of the foot, just behind the web between the second and third toes, where the skin on top of the foot meets the lighter skin between the toes.',
      },
      {
        q: 'How do you find ST44?',
        a: 'Feel for the web between the second and third toes, then slide a fingertip back a fraction onto the top of the foot; ST44 is right there, at the border between the darker and lighter skin.',
      },
      {
        q: 'Is ST44 safe in pregnancy?',
        a: 'Yes. ST44 is considered safe in pregnancy. Use gentle pressure for 30 seconds or so per foot.',
      },
    ],
    about: ['meridian:stomach'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Sit so you can reach the top of one foot.',
      'Find the web between the second and third toes.',
      'Slide a fingertip back a fraction onto the top of the foot; ST44 sits at the junction of the darker skin on top of the foot and the lighter skin between the toes.',
    ],
    body: [],
    related: ['LV3', 'LI4', 'ST36'],
  }),
  pointSchema.parse({
    code: 'SP9',
    name: 'Yinlingquan',
    pinyin: 'Yīn Líng Quán',
    hanzi: '陰陵泉',
    meridian: 'spleen',
    region: 'leg',
    element: 'water',
    category: ['he-sea'],
    whoCoordinates:
      'On the medial aspect of the lower leg, in the depression between the posterior border of the tibia and the gastrocnemius, distal to the medial condyle of the tibia.',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'SP9 (Yinlingquan) is an inner-leg acupoint on the Spleen meridian, classically used for digestive heaviness, water retention, and knee discomfort.',
    questionHeadings: ['Where is SP9?', 'How do you find SP9?', 'Is SP9 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is SP9?',
        a: 'SP9 sits on the inside of the lower leg, just below the inner knee, in the hollow where the calf muscle meets the back edge of the shin bone.',
      },
      {
        q: 'How do you find SP9?',
        a: 'Run a fingertip up the back edge of the shin bone from the inner ankle. Where the bone curves in and meets the knee, your finger stops in a soft hollow — that is SP9.',
      },
      {
        q: 'Is SP9 safe in pregnancy?',
        a: 'SP9 is generally considered safe in pregnancy with gentle pressure. Unlike SP6 it is not treated as strongly contraindicated, but keep stimulation light.',
      },
    ],
    about: ['meridian:spleen', 'condition:knee-arthritis'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Sit with the leg comfortably bent.',
      'Starting from the inner ankle, run a fingertip up the back edge of the shin bone.',
      'Where the bone curves inward toward the knee, your finger settles into a soft hollow just below the medial condyle of the tibia — that is SP9.',
    ],
    body: [],
    related: ['SP6', 'ST36', 'KI3'],
  }),
  pointSchema.parse({
    code: 'LI11',
    name: 'Quchi',
    pinyin: 'Qū Chí',
    hanzi: '曲池',
    meridian: 'large-intestine',
    region: 'arm',
    element: 'earth',
    category: ['he-sea'],
    whoCoordinates:
      'At the lateral end of the cubital (elbow) crease, midway between LU5 and the lateral epicondyle of the humerus, when the elbow is flexed.',
    difficultyToLocate: 1,
    pregnancySafe: true,
    canonicalOneLiner:
      'LI11 (Quchi) is an elbow acupoint on the Large Intestine meridian, classically used for heat, skin complaints, and arm pain.',
    questionHeadings: ['Where is LI11?', 'How do you find LI11?', 'Is LI11 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is LI11?',
        a: 'LI11 sits at the outside end of the elbow crease — where a bent elbow makes the crease disappear into the side of the arm.',
      },
      {
        q: 'How do you find LI11?',
        a: 'Bend the elbow to about 90 degrees with the palm toward the chest. LI11 sits at the lateral (thumb-side) end of the elbow crease, just in front of the bony bump on the outside of the elbow.',
      },
      {
        q: 'Is LI11 safe in pregnancy?',
        a: 'Yes. LI11 is considered safe in pregnancy with gentle pressure, though some classical cautions group it loosely with LI4 — keep stimulation light.',
      },
    ],
    about: [
      'meridian:large-intestine',
      'condition:desk-neck-shoulder',
      'condition:after-stroke-limbs',
    ],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Bend your elbow to about 90 degrees with your palm turned toward the chest.',
      'Note the crease that forms on the inside of the elbow.',
      'LI11 sits at the outer (thumb-side) end of that crease, just in front of the bony bump on the outside of the elbow.',
    ],
    body: [],
    related: ['LI4', 'LU7', 'TH5'],
  }),
  pointSchema.parse({
    code: 'GV14',
    name: 'Dazhui',
    pinyin: 'Dà Zhuī',
    hanzi: '大椎',
    meridian: 'du',
    region: 'back',
    category: ['meeting'],
    whoCoordinates:
      'On the posterior midline, in the depression below the spinous process of the seventh cervical vertebra (C7).',
    difficultyToLocate: 2,
    pregnancySafe: true,
    canonicalOneLiner:
      'GV14 (Dazhui) is an upper-back acupoint on the Governing Vessel, classically used for neck stiffness, early colds, and heat.',
    questionHeadings: ['Where is GV14?', 'How do you find GV14?', 'Is GV14 safe in pregnancy?'],
    faqs: [
      {
        q: 'Where is GV14?',
        a: 'GV14 sits on the midline at the base of the back of the neck, in the small hollow just below the most prominent bony bump you can feel when you bow your head forward.',
      },
      {
        q: 'How do you find GV14?',
        a: 'Bow the head forward and run a fingertip down the back of the neck until it bumps over the largest prominence — that is the C7 vertebra. GV14 is in the small hollow just below it.',
      },
      {
        q: 'Is GV14 safe in pregnancy?',
        a: 'Yes. GV14 is considered safe in pregnancy. Use gentle, flat pressure; avoid sharp digging.',
      },
    ],
    about: ['meridian:du'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Bow the head slightly forward to pop the upper-back vertebrae.',
      'Run a fingertip down the back of the neck over the midline until it meets the largest bony prominence at the shoulder line — that is C7.',
      'GV14 sits in the small hollow just below that prominence, on the midline.',
    ],
    body: [],
    related: ['GB20', 'LI4', 'GV20'],
  }),
  pointSchema.parse({
    code: 'EX-HN5',
    name: 'Taiyang',
    pinyin: 'Tài Yáng',
    hanzi: '太陽',
    meridian: 'extraordinary',
    region: 'head',
    category: ['extra-point'],
    whoCoordinates:
      'On the side of the head, in the depression approximately one finger-breadth posterior to the midpoint between the lateral end of the eyebrow and the outer canthus of the eye.',
    difficultyToLocate: 1,
    pregnancySafe: true,
    canonicalOneLiner:
      'Taiyang (EX-HN5) is a temple acupoint outside the twelve regular meridians, classically used for headache, eye strain, and facial tension.',
    questionHeadings: [
      'Where is Taiyang?',
      'How do you find Taiyang?',
      'Is Taiyang safe in pregnancy?',
    ],
    faqs: [
      {
        q: 'Where is Taiyang?',
        a: 'Taiyang sits at the temple, in the soft hollow about one finger-width behind the midpoint between the outer end of the eyebrow and the outer corner of the eye.',
      },
      {
        q: 'How do you find Taiyang?',
        a: 'Find the midpoint between the outer end of your eyebrow and the outer corner of your eye, then slide a fingertip back a finger-width onto the temple; Taiyang is in the soft hollow you meet.',
      },
      {
        q: 'Is Taiyang safe in pregnancy?',
        a: 'Yes. Taiyang is commonly used in pregnancy for headache. Press gently with the pad of a finger rather than a sharp nail, for 30 to 60 seconds per side.',
      },
    ],
    about: ['condition:tension-headache'],
    sources: [
      'World Health Organization. WHO Standard Acupuncture Point Locations in the Western Pacific Region. Manila: WHO Regional Office, 2008.',
      'Deadman P, Al-Khafaji M, Baker K. A Manual of Acupuncture. 2nd ed. Journal of Chinese Medicine Publications, 2007.',
    ],
    lastReviewed: new Date('2026-04-15'),
    howToFind: [
      'Find the outer end of the eyebrow and the outer corner of the eye.',
      'Mark the midpoint between those two landmarks.',
      'Slide a fingertip about one finger-width back onto the temple; Taiyang sits in the soft hollow you meet.',
    ],
    body: [],
    related: ['GB20', 'LI4', 'GV20'],
  }),
];

/**
 * Full registry: the editorially authored points first, then every compiled
 * catalogue point not already covered (see content/catalog/README.md).
 * Editorial entries win code collisions; EX-HN5 (Taiyang) exists only here.
 */
const allPoints: AnyPoint[] = [
  ...raw,
  ...catalogue.filter((c) => !raw.some((e) => e.code === c.code)),
];

/** Every published point page — the single source for indexes and discovery. */
export const points: AnyPoint[] = allPoints;

/**
 * Single functional accessor over the full registry; preferred in new code.
 * @returns the complete point registry.
 */
export function getAllPoints(): AnyPoint[] {
  return allPoints;
}

/**
 * find a point using a case-insensitive catalogue code.
 * @param code catalogue point identifier.
 * @returns the point with the case-insensitive code, or undefined.
 */
export function pointByCode(code: string): AnyPoint | undefined {
  const wanted = code.toUpperCase();

  return getAllPoints().find((p) => p.code === wanted);
}

export const topPointCodes = ['LI4', 'PC6', 'ST36', 'GB20', 'SP6', 'LV3'] as const;
