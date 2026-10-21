import type { LeafCardInput } from './schema';

/** Leaf cards for the LU points, in channel order. */
export const lungLeaves: readonly LeafCardInput[] = [
  {
    code: 'LU1',
    gloss: 'Central Treasury',
    where: {
      en: 'On the front of the shoulder: find the hollow under the outer end of the collarbone, then go one thumb-width lower.',
      zh: '肩前，鎖骨外端下方的凹陷處，再往下約一拇指寬。',
    },
    place: { en: 'A thumb below the collarbone hollow', zh: '鎖骨下凹陷再下一拇指寬' },
    for: { en: 'Cough, wheezing, a full, tight chest.', zh: '咳嗽，氣喘，胸悶脹痛。' },
    press: {
      en: 'Gentle pressure, about a minute each side, breathing slowly.',
      zh: '輕輕按壓，每側約一分鐘，慢慢呼吸。',
    },
    quote: {
      han: '中府，肺之募也，一名膺中俞，在雲門下一寸，乳上三肋間陷者中',
      en: 'Zhongfu, the alarm point of the lung, also called Yingzhongshu, lies one cun below Yunmen, in the hollow between the ribs three ribs above the breast.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU2',
    gloss: 'Cloud Gate',
    where: {
      en: 'On the front of the shoulder, in the hollow just under the outer end of the collarbone.',
      zh: '肩前，鎖骨外端下方的凹陷中。',
    },
    place: { en: 'Under the outer end of the collarbone', zh: '鎖骨外端下方凹陷中' },
    for: { en: 'Cough, wheezing, an aching chest and shoulder.', zh: '咳嗽，氣喘，胸痛及肩痛。' },
    press: {
      en: 'Gentle pressure into the hollow, about a minute each side.',
      zh: '輕按凹陷處，每側約一分鐘。',
    },
    quote: {
      han: '雲門，在巨骨下，氣戶兩傍各二寸陷者中',
      en: 'Yunmen lies below the great bone, in the hollow two cun out from Qihu on each side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU3',
    gloss: 'Celestial Palace',
    where: {
      en: 'On the inner upper arm, at the outer edge of the biceps, four finger-widths below the front fold of the armpit.',
      zh: '上臂內側，肱二頭肌外緣，腋前皺襞下四橫指處。',
    },
    place: { en: 'Upper arm, four fingers below armpit', zh: '上臂內側，腋前皺襞下四橫指' },
    for: { en: 'Cough, nosebleed, an aching upper arm.', zh: '咳嗽，流鼻血，上臂痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute, then the other arm.',
      zh: '拇指稍用力按約一分鐘，再換另一臂。',
    },
    quote: {
      han: '天府，在腋下三寸',
      en: 'Tianfu lies three cun below the armpit.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU4',
    gloss: 'Flanking White',
    where: {
      en: 'On the inner upper arm, at the outer edge of the biceps, one thumb-width below LU3.',
      zh: '上臂內側，肱二頭肌外緣，天府穴下約一拇指寬。',
    },
    place: { en: 'Inner upper arm, at the biceps edge', zh: '上臂內側，肱二頭肌外緣' },
    for: { en: 'Cough, dry retching, an aching upper arm.', zh: '咳嗽，乾嘔，上臂痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute, then the other arm.',
      zh: '拇指稍用力按約一分鐘，再換另一臂。',
    },
    quote: {
      han: '俠白，在天府下，去肘五寸動脈中',
      en: 'Xiabai lies below Tianfu, five cun above the elbow, where a pulse is felt.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU5',
    gloss: 'Cubit Marsh',
    where: {
      en: 'In the elbow crease, on the thumb side of the firm tendon you feel when you bend the arm.',
      zh: '肘橫紋上，彎肘時摸到的粗筋靠拇指一側。',
    },
    place: { en: 'In the elbow crease, thumb side', zh: '肘橫紋上，肌腱拇指側' },
    for: { en: 'Cough, sore throat, an aching elbow.', zh: '咳嗽，喉嚨痛，手肘痛。' },
    press: {
      en: 'Thumb pressure into the hollow, about a minute, then the other arm.',
      zh: '拇指按入凹陷約一分鐘，再換另一手。',
    },
    quote: {
      han: '尺澤者，水也。在肘中紋上動脈',
      en: 'Chize is the water point. It lies on the elbow crease, at the pulse.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU6',
    gloss: 'Utmost Opening',
    where: {
      en: 'On the inner forearm, thumb side, one thumb-width above the midpoint between the wrist and elbow creases.',
      zh: '前臂內側靠拇指一側，腕橫紋與肘橫紋的中點再往上一拇指寬。',
    },
    place: { en: 'Inner forearm, just above halfway', zh: '前臂內側中點稍上，靠拇指側' },
    for: { en: 'Cough, sore throat, an aching elbow and arm.', zh: '咳嗽，喉嚨痛，肘臂痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute, then the other arm.',
      zh: '拇指稍用力按約一分鐘，再換另一臂。',
    },
    quote: {
      han: '孔最二穴，在腕上七寸，手太陰郄。治熱病汗不出',
      en: 'Kongzui, on both arms, lies seven cun above the wrist and is the cleft point of the hand taiyin. It treats febrile illness without sweating.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'LU7',
    gloss: 'Broken Sequence',
    where: {
      en: 'Hook the thumb webs of both hands together; the upper index fingertip lands in a small groove above the wrist bone.',
      zh: '兩手虎口交叉，上方食指尖落在腕上骨突的小凹溝中。',
    },
    place: { en: 'In the groove above the wrist bone', zh: '腕上骨突旁的小凹溝' },
    for: { en: 'Cough, headache, a stiff neck.', zh: '咳嗽，頭痛，頸項僵硬。' },
    press: {
      en: 'Fingertip pressure, about a minute, then the other wrist.',
      zh: '用指尖按約一分鐘，再換另一腕。',
    },
    quote: {
      han: '列缺，手太陰之絡，去腕上一寸五分',
      en: 'Lieque, the connecting point of the hand taiyin, lies one and a half cun above the wrist.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU8',
    gloss: 'Channel Ditch',
    where: {
      en: 'On the thumb side of the inner wrist, one thumb-width above the crease, between the wrist bone and the pulse.',
      zh: '手腕內側靠拇指一側，腕橫紋上一拇指寬，骨突與脈搏之間。',
    },
    place: { en: 'Beside the wrist pulse, above the crease', zh: '腕橫紋上一拇指，脈搏旁' },
    for: { en: 'Cough, sore throat, wrist pain.', zh: '咳嗽，喉嚨痛，手腕痛。' },
    press: {
      en: 'Light pressure beside the pulse, never on it, about a minute.',
      zh: '在脈搏旁輕按，不壓脈搏，約一分鐘。',
    },
    caution: {
      en: 'It sits beside the wrist pulse; press next to it, never on it.',
      zh: '此穴在腕部脈搏旁，只按旁邊，不壓脈上。',
    },
    quote: {
      han: '經渠者，金也。在寸口陷者中',
      en: 'Jingqu is the metal point. It lies in the hollow at the wrist pulse.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU9',
    gloss: 'Great Abyss',
    where: {
      en: 'At the thumb end of the inner wrist crease, where you feel the pulse.',
      zh: '手腕內側橫紋靠拇指一端，摸得到脈搏處。',
    },
    place: { en: 'On the wrist crease, at the pulse', zh: '腕橫紋拇指端脈搏處' },
    for: { en: 'Cough, wheezing, wrist pain.', zh: '咳嗽，氣喘，手腕痛。' },
    press: {
      en: 'Light touch, about a minute each wrist, without pressing the pulse flat.',
      zh: '輕觸約一分鐘，兩腕各一次，不要把脈搏壓住。',
    },
    caution: {
      en: 'It sits on the wrist pulse; keep the touch light.',
      zh: '此穴在腕部脈搏上，只宜輕按。',
    },
    quote: {
      han: '太淵者，土也。在掌後陷者中',
      en: 'Taiyuan is the earth point. It lies in the hollow behind the palm.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU10',
    gloss: 'Fish Border',
    where: {
      en: 'On the thumb mound of the palm, halfway along the thumb bone, where palm skin meets the skin of the back of the hand.',
      zh: '手掌大魚際，第一掌骨中點，掌面與手背皮膚交界處。',
    },
    place: { en: 'On the thumb mound of the palm', zh: '手掌大魚際中點' },
    for: { en: 'A dry or sore throat, a hoarse voice, cough.', zh: '喉嚨乾痛，聲音沙啞，咳嗽。' },
    press: {
      en: 'Firm thumb pressure, about a minute, then the other hand.',
      zh: '拇指稍用力按約一分鐘，再換另一手。',
    },
    quote: {
      han: '魚際者，火也。在手大指本節後內側散脈中',
      en: "Yuji is the fire point. It lies behind the thumb's base joint, on the inner side, among the scattered vessels.",
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LU11',
    gloss: 'Lesser Shang',
    where: {
      en: 'On the thumb, just off the corner of the nail on the side away from the index finger.',
      zh: '拇指指甲角旁，遠離食指的一側。',
    },
    place: { en: "Beside the thumbnail's outer corner", zh: '拇指甲角旁，遠離食指側' },
    for: { en: 'Sore throat, nosebleed, fever.', zh: '喉嚨痛，流鼻血，發燒。' },
    press: {
      en: 'Press with a fingernail edge, on and off, for about a minute.',
      zh: '用另一手指甲邊緣一按一放，約一分鐘。',
    },
    quote: {
      han: '少商者，木也。在手大指端內側，去爪甲如韭葉',
      en: "Shaoshang is the wood point. It lies at the tip of the thumb on the inner side, a leek leaf's width from the nail.",
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
