import type { LeafCardInput } from './schema';

/** Leaf cards for the HT points, in channel order. */
export const heartLeaves: readonly LeafCardInput[] = [
  {
    code: 'HT1',
    gloss: 'Summit Spring',
    where: {
      en: 'With the arm raised, in the centre of the armpit, where you can feel a pulse.',
      zh: '舉臂，腋窩正中可摸到脈動處。',
    },
    place: { en: 'In the centre of the armpit', zh: '腋窩正中，脈動處' },
    for: { en: 'Shoulder and arm ache, pain along the ribs.', zh: '肩臂痛，脅肋痛。' },
    press: {
      en: 'Light touch beside the pulse, never on it, one minute each side.',
      zh: '在脈動旁輕觸，勿壓脈上，每側一分鐘。',
    },
    caution: {
      en: 'An artery runs here: never press on the beat.',
      zh: '此處有腋動脈，不可壓在脈動上。',
    },
    quote: {
      han: '極泉，在腋下筋間，動脈入胸中',
      en: 'Jiquan lies below the armpit between the sinews, where the pulse runs into the chest.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'HT2',
    gloss: 'Azure Spirit',
    where: {
      en: 'On the inner upper arm, four finger-widths above the elbow crease, in the groove beside the biceps.',
      zh: '上臂內側，肘橫紋上四橫指，二頭肌內側的凹溝中。',
    },
    place: { en: 'Inner arm, above the elbow crease', zh: '上臂內側，肘橫紋上四橫指' },
    for: { en: 'Shoulder and arm pain, headache.', zh: '肩臂痛，頭痛。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each arm.',
      zh: '兩指指腹慢慢打圈，每臂一分鐘。',
    },
    caution: {
      en: 'The arm’s main artery runs in this groove; press gently, off any beat.',
      zh: '此溝內有肱動脈，宜輕按，勿壓在脈動上。',
    },
    quote: {
      han: '青靈二穴，在肘上三寸，舉臂取之',
      en: 'Qingling, on both arms, lies three cun above the elbow; raise the arm to find it.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'HT3',
    gloss: 'Young Sea',
    where: {
      en: 'Elbow bent: halfway between the inner end of the elbow crease and the bony knob on the inner elbow.',
      zh: '屈肘，肘橫紋內側端與肘內側骨突之間的中點。',
    },
    place: { en: 'Inner elbow, by the bony knob', zh: '屈肘，肘橫紋內端與骨突間' },
    for: {
      en: 'Elbow and arm pain, numb or shaky hands, a troubled mind.',
      zh: '肘臂痛，手麻手顫，心神不寧。',
    },
    press: {
      en: 'Two finger pads, slow circles, one minute; ease off if it tingles down the arm.',
      zh: '兩指指腹慢慢打圈一分鐘；手臂發麻即放輕。',
    },
    quote: {
      han: '少海者，水也。一名曲節，在肘內廉節後陷者中',
      en: 'Shaohai, the water point, also called Qujie, lies in the hollow behind the joint on the inner elbow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'HT4',
    gloss: 'Spirit Way',
    where: {
      en: 'On the inner forearm, two finger-widths above the wrist crease, beside the tendon in line with the little finger.',
      zh: '前臂內側，腕橫紋上兩橫指，小指側肌腱旁。',
    },
    place: { en: 'Two fingers above the wrist crease', zh: '腕橫紋上兩橫指，小指側' },
    for: {
      en: 'Sudden hoarseness, elbow and arm pain, grief and fearfulness.',
      zh: '突然失聲，肘臂痛，悲傷恐懼。',
    },
    press: {
      en: 'One finger pad, slow circles, one minute each wrist.',
      zh: '一指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '靈道者，金也。在掌後一寸五分',
      en: 'Lingdao, the metal point, lies one and a half cun behind the palm.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'HT5',
    gloss: 'Connecting to the Interior',
    where: {
      en: 'On the inner forearm, a thumb-width above the wrist crease, beside the tendon in line with the little finger.',
      zh: '前臂內側，腕橫紋上一拇指寬，小指側肌腱旁。',
    },
    place: { en: 'A thumb above the wrist crease', zh: '腕橫紋上一拇指，小指側' },
    for: {
      en: 'Palpitations, sudden hoarseness, wrist and arm pain.',
      zh: '心悸，突然失聲，腕臂痛。',
    },
    press: {
      en: 'Two finger pads, slow circles, one minute each wrist.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '通里，手少陰經，在腕後一寸',
      en: 'Tongli, on the hand Shaoyin channel, lies one cun behind the wrist.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'HT6',
    gloss: 'Yin Cleft',
    where: {
      en: 'On the inner forearm, half a thumb-width above the wrist crease, beside the tendon in line with the little finger.',
      zh: '前臂內側，腕橫紋上半拇指寬，小指側肌腱旁。',
    },
    place: { en: 'Half a thumb above the wrist crease', zh: '腕橫紋上半拇指，小指側' },
    for: { en: 'Palpitations with a start, night sweats.', zh: '心悸易驚，盜汗。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each wrist.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '陰郄二穴，在掌後動脈中，去腕五分',
      en: 'Yinxi, on both arms, lies at the pulse behind the palm, half a cun from the wrist.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'HT7',
    gloss: 'Spirit Gate',
    where: {
      en: 'On the wrist crease at the little-finger end, in the dip beside the tendon.',
      zh: '腕橫紋小指側端，肌腱旁的凹陷。',
    },
    place: { en: 'On the wrist crease, little-finger end', zh: '腕橫紋小指側端凹陷' },
    for: { en: 'Poor sleep, a restless mind, forgetfulness.', zh: '失眠，心煩，健忘。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each wrist.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '神門者，土也。一名兌沖，一名中都，在掌後兌骨之端陷者中',
      en: 'Shenmen, the earth point, also called Duichong or Zhongdu, lies in the hollow at the end of the pointed bone behind the palm.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'HT8',
    gloss: 'Young Palace',
    where: {
      en: 'On the palm, where the tip of the little finger rests when you make a fist.',
      zh: '掌心，握拳時小指尖所落之處。',
    },
    place: { en: 'In the palm, under the little fingertip', zh: '掌心，握拳小指尖處' },
    for: {
      en: 'Palpitations, itchy sores, a cramping little finger.',
      zh: '心悸，瘡瘍搔癢，小指拘攣。',
    },
    press: {
      en: 'Thumb pad, slow circles, one minute each palm.',
      zh: '拇指腹慢慢打圈，每手一分鐘。',
    },
    quote: {
      han: '少府者，火也。在小指本節後陷者中，直勞宮',
      en: 'Shaofu, the fire point, lies in the hollow behind the base joint of the little finger, level with Laogong.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'HT9',
    gloss: 'Lesser Surge',
    where: {
      en: 'On the little finger, beside the corner of the nail on the ring-finger side.',
      zh: '小指靠無名指一側，指甲角旁。',
    },
    place: { en: 'By the little fingernail, ring side', zh: '小指甲角旁，靠無名指側' },
    for: { en: 'Palpitations, feeling feverish, chest and side pain.', zh: '心悸，發熱，胸脅痛。' },
    press: {
      en: 'Steady, gentle fingertip-pad pressure, one minute each hand.',
      zh: '以指腹輕而穩地按，每手一分鐘。',
    },
    caution: {
      en: 'Skip over hangnails or broken skin by the nail.',
      zh: '指甲旁有倒刺或破皮時不按。',
    },
    quote: {
      han: '少沖者，木也。一名經始，在手小指內廉之端，去爪甲角如韭葉',
      en: 'Shaochong, the wood point, also called Jingshi, lies at the tip of the little finger’s inner edge, a leek leaf’s breadth from the nail corner.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
