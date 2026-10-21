import type { LeafCardInput } from './schema';

/** Leaf cards for the PC points, in channel order. */
export const pericardiumLeaves: readonly LeafCardInput[] = [
  {
    code: 'PC1',
    gloss: 'Heavenly Pool',
    where: {
      en: 'In the rib space level with the nipple, one thumb-width outside it.',
      zh: '與乳頭同高的肋間，乳頭外側一拇指寬。',
    },
    place: { en: 'Rib space just outside the nipple', zh: '乳頭外側一拇指寬肋間' },
    for: {
      en: 'Cough; pain at the side of the ribs; low breast milk.',
      zh: '咳嗽，脅肋痛，乳汁不足。',
    },
    press: {
      en: 'A light fingertip touch on the surface, about a minute each side.',
      zh: '以指尖輕觸皮膚表面，每側約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press in between the ribs.',
      zh: '只可輕觸，切勿往肋間深按。',
    },
    quote: {
      han: '天池，一名天會，在乳後一寸',
      en: 'Tianchi, also called Tianhui, lies one cun beyond the nipple.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'PC2',
    gloss: 'Celestial Spring',
    where: {
      en: 'On the inner upper arm, three finger-widths below the front armpit crease, between the two heads of the biceps.',
      zh: '上臂內側，腋前紋頭下三橫指，肱二頭肌兩頭之間。',
    },
    place: { en: 'Inner upper arm, below armpit crease', zh: '上臂內側，腋前紋下' },
    for: {
      en: 'Cough; pain of the chest and inner arm.',
      zh: '咳嗽，胸痛，上臂內側痛。',
    },
    press: {
      en: 'Light fingertip pressure on the relaxed muscle, about a minute each arm.',
      zh: '肌肉放鬆，以指尖輕按，每側約一分鐘。',
    },
    quote: {
      han: '天泉，一名天溫，在曲腋下去臂二寸，舉臂取之',
      en: 'Tianquan, also called Tianwen, lies below the fold of the armpit, two cun down the arm; raise the arm to find it.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'PC3',
    gloss: 'Marsh at the Bend',
    where: {
      en: 'On the elbow crease, just on the little-finger side of the firm biceps tendon.',
      zh: '肘橫紋上，肱二頭肌腱靠小指的一側。',
    },
    place: { en: 'Elbow crease, by the biceps tendon', zh: '肘橫紋，二頭肌腱小指側' },
    for: {
      en: 'Palpitations; stomach ache; elbow and arm pain.',
      zh: '心悸，胃痛，肘臂疼痛。',
    },
    press: {
      en: 'Gentle finger pressure, about a minute each arm.',
      zh: '以指腹輕柔按壓，每側約一分鐘。',
    },
    caution: {
      en: 'Ease off at a strong pulse; ask first if pregnant or on blood thinners.',
      zh: '觸及明顯脈動即放輕；孕期或服抗凝血藥者請先諮詢。',
    },
    quote: {
      han: '曲澤者，水也，在肘內廉下陷者中，屈肘得之',
      en: 'Quze is water. It lies in the hollow below the inner edge of the elbow, found with the elbow bent.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'PC4',
    gloss: 'Cleft Gate',
    where: {
      en: 'On the palm side of the forearm, about seven finger-widths above the wrist crease, between the two tendons.',
      zh: '前臂掌側，腕橫紋上約七橫指，兩條肌腱之間。',
    },
    place: { en: 'Mid forearm, palm side, between tendons', zh: '前臂掌側中段，兩筋之間' },
    for: { en: 'Palpitations; hiccups.', zh: '心悸，打嗝。' },
    press: {
      en: 'Light fingertip pressure, about a minute each arm.',
      zh: '以指尖輕按，每側約一分鐘。',
    },
    caution: {
      en: 'New chest pain or fainting needs urgent care; in pregnancy, ask first.',
      zh: '新發胸痛或昏厥須立即就醫；孕期請先諮詢。',
    },
    quote: {
      han: '郄門二穴，去腕五寸，手厥陰郄',
      en: 'Ximen, one on each arm, lies five cun from the wrist and is the cleft point of the hand jueyin.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'PC5',
    gloss: 'The Intermediary Envoy',
    where: {
      en: 'Four finger-widths above the wrist crease on the palm side, between the two tendons.',
      zh: '前臂掌側，腕橫紋上四橫指，兩條肌腱之間。',
    },
    place: { en: 'Four fingers above the wrist crease', zh: '腕橫紋上四橫指，兩筋間' },
    for: {
      en: 'Palpitations; stomach ache; sore throat.',
      zh: '心悸，胃痛，咽喉痛。',
    },
    press: {
      en: 'Light fingertip pressure, about a minute each arm.',
      zh: '以指尖輕按，每側約一分鐘。',
    },
    quote: {
      han: '間使者，金也。在掌後三寸，兩筋間陷者中',
      en: 'Jianshi is metal. It lies three cun behind the palm, in the hollow between the two sinews.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'PC6',
    gloss: 'Inner Pass',
    where: {
      en: 'Three finger-widths above the wrist crease on the palm side, between the two tendons.',
      zh: '前臂掌側，腕橫紋上三橫指，兩條肌腱之間。',
    },
    place: { en: 'Three fingers above the wrist crease', zh: '腕橫紋上三橫指，兩筋間' },
    for: { en: 'Nausea; palpitations; poor sleep.', zh: '噁心，心悸，失眠。' },
    press: {
      en: 'Gentle finger pressure between the tendons, about a minute each arm.',
      zh: '在兩筋之間以指腹輕按，每側約一分鐘。',
    },
    quote: {
      han: '內關，手心主絡，在掌後去腕二寸，別走少陽',
      en: 'Neiguan, the connecting point of the heart-governor channel, lies two cun from the wrist behind the palm, and branches off to the shaoyang.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'PC7',
    gloss: 'Great Mound',
    where: {
      en: 'At the middle of the wrist crease on the palm side, between the two tendons.',
      zh: '腕掌側橫紋的中點，兩條肌腱之間。',
    },
    place: { en: 'Middle of the inner wrist crease', zh: '腕掌側橫紋中點' },
    for: {
      en: 'Palpitations; stomach ache; wrist pain.',
      zh: '心悸，胃痛，手腕疼痛。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each wrist.',
      zh: '以指尖輕柔按壓，每側手腕約一分鐘。',
    },
    quote: {
      han: '大陵者，土也。在掌後兩筋間陷者中',
      en: 'Daling is earth. It lies in the hollow between the two sinews behind the palm.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'PC8',
    gloss: 'Palace of Toil',
    where: {
      en: 'In the centre of the palm, where the tip of the middle finger lands when you make a loose fist.',
      zh: '掌心，輕握拳時中指指尖所點之處。',
    },
    place: { en: 'Centre of the palm', zh: '掌心' },
    for: {
      en: 'Mouth ulcers; bad breath; numb fingers.',
      zh: '口瘡，口臭，手指麻木。',
    },
    press: {
      en: 'Gentle pressure with the other thumb pad, no nails, about a minute; then switch.',
      zh: '以另一手拇指指腹輕按，勿用指甲，約一分鐘後換手。',
    },
    quote: {
      han: '勞宮，掌中中指本節之內間也',
      en: 'Laogong is in the palm, just inside the base knuckle of the middle finger.',
      source: { han: '《靈樞·本輸》', en: 'Lingshu, chapter 2' },
    },
  },
  {
    code: 'PC9',
    gloss: 'Central Rush',
    where: { en: 'At the very centre of the tip of the middle finger.', zh: '中指指尖的正中央。' },
    place: { en: 'Tip of the middle finger', zh: '中指指尖正中' },
    for: {
      en: 'Faintness in the summer heat; a stiff, swollen tongue.',
      zh: '暑熱頭昏，舌強腫痛。',
    },
    press: {
      en: 'Gentle fingertip pressure, nothing sharp, about a minute each hand.',
      zh: '以指尖輕柔按壓，勿用尖物，每手約一分鐘。',
    },
    caution: {
      en: 'Fainting or heatstroke needs emergency care; skip with diabetes or poor circulation.',
      zh: '昏厥或中暑須先急救；糖尿病或循環不良者不按。',
    },
    quote: {
      han: '中沖者，木也。在手中指之端，去爪甲角如韭葉陷者中',
      en: 'Zhongchong is wood. It lies at the tip of the middle finger, a leek leaf’s width from the corner of the nail, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
