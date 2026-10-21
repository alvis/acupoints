import type { LeafCardInput } from './schema';

/** Leaf cards for the SP points, in channel order. */
export const spleenLeaves: readonly LeafCardInput[] = [
  {
    code: 'SP1',
    gloss: 'Hidden White',
    where: {
      en: 'On the big toe, beside the corner of the nail on the inner side.',
      zh: '大腳趾內側，趾甲角旁。',
    },
    place: { en: 'By the big toenail, inner corner', zh: '大趾內側趾甲角旁' },
    for: { en: 'Heavy periods, a full belly, restless dreaming.', zh: '月經量多，腹脹，多夢。' },
    press: {
      en: 'Light, steady fingertip-pad pressure, one minute each foot.',
      zh: '以指腹輕而穩地按，每隻腳一分鐘。',
    },
    caution: {
      en: 'Skip over broken skin or an ingrown nail.',
      zh: '趾甲旁破皮或嵌甲時不按。',
    },
    quote: {
      han: '隱白者，木也。在足大指端內側，去爪甲角如韭葉',
      en: 'Yinbai, the wood point, lies at the inner side of the big toe’s tip, a leek leaf’s breadth from the nail corner.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP2',
    gloss: 'Great Capital',
    where: {
      en: 'On the inner edge of the foot, just in front of the big-toe joint, where the top skin meets the paler sole.',
      zh: '腳內側緣，大腳趾根部關節前方，腳背與腳底膚色交界處。',
    },
    place: { en: 'In front of the big-toe joint, inside', zh: '腳內側緣，大趾根關節前' },
    for: { en: 'Bloating, stomach ache, cold hands and feet.', zh: '腹脹，胃痛，手腳冰冷。' },
    press: {
      en: 'Thumb pad, small slow circles, one minute each foot; not hard on the joint.',
      zh: '拇指腹慢慢打小圈，每隻腳一分鐘，勿重壓關節。',
    },
  },
  {
    code: 'SP3',
    gloss: 'Great White',
    where: {
      en: 'On the inner edge of the foot, just behind the big-toe joint, in the dip below the bony bump.',
      zh: '腳內側緣，大腳趾根部關節後方，骨突下的凹陷處。',
    },
    place: { en: 'Behind the big-toe joint, inside', zh: '腳內側緣，大趾根關節後' },
    for: {
      en: 'A rumbling, bloated belly; loose stools; a heavy body.',
      zh: '腸鳴腹脹，大便稀溏，身體沉重。',
    },
    press: {
      en: 'Thumb pad, slow circles, one minute each foot.',
      zh: '拇指腹慢慢打圈，每隻腳一分鐘。',
    },
    quote: {
      han: '太白者，土也。在足內側核骨下陷者中',
      en: 'Taibai, the earth point, lies in the hollow below the knob of bone on the inner foot.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP4',
    gloss: 'Duke’s Grandson',
    where: {
      en: 'On the inner arch, about a thumb-width behind Taibai (SP3), in the dip below the base of the long foot bone.',
      zh: '腳弓內側，太白後約一拇指寬，足骨底部下方的凹陷。',
    },
    place: { en: 'In the inner arch, below the foot bone', zh: '腳弓內側，足骨底下凹陷' },
    for: { en: 'Stomach ache, vomiting, poor sleep.', zh: '胃痛，嘔吐，失眠。' },
    press: {
      en: 'Thumb pad, slow circles, one minute each foot.',
      zh: '拇指腹慢慢打圈，每隻腳一分鐘。',
    },
    quote: {
      han: '公孫，在足大指本節後一寸',
      en: 'Gongsun lies one cun behind the base joint of the big toe.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP5',
    gloss: 'Mound of Shang',
    where: {
      en: 'In the hollow just in front of and below the inner ankle bone.',
      zh: '內踝前下方的凹陷處。',
    },
    place: { en: 'Hollow in front of the inner ankle', zh: '內踝前下方凹陷' },
    for: {
      en: 'Bloating, loose stools or constipation, ankle pain.',
      zh: '腹脹，腹瀉或便秘，腳踝疼痛。',
    },
    press: {
      en: 'Thumb or two finger pads, slow circles, one minute each ankle.',
      zh: '拇指或兩指指腹慢慢打圈，每側一分鐘。',
    },
    caution: {
      en: 'Not on a freshly sprained or swollen ankle.',
      zh: '腳踝新扭傷或腫脹時不按。',
    },
    quote: {
      han: '商丘者，金也。在足內踝下微前陷者中',
      en: 'Shangqiu, the metal point, lies in the hollow below and slightly in front of the inner ankle bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP6',
    gloss: 'Three Yin Intersection',
    where: {
      en: 'Four finger-widths above the inner ankle bone, just behind the edge of the shinbone.',
      zh: '內踝尖上四橫指，脛骨內側緣後方。',
    },
    place: { en: 'Four fingers above the inner ankle', zh: '內踝尖上四橫指，脛骨後' },
    for: { en: 'Period pain, irregular periods, poor sleep.', zh: '經痛，月經不調，失眠。' },
    press: {
      en: 'Thumb pad, slow circles, one minute each leg.',
      zh: '拇指腹慢慢打圈，每條腿一分鐘。',
    },
    caution: {
      en: 'Never in pregnancy; if you may be pregnant, ask a practitioner first.',
      zh: '孕期絕不可按；可能懷孕時，先請教醫師。',
    },
    quote: {
      han: '三陰交，在內踝上三寸，骨下陷者中',
      en: 'Sanyinjiao lies three cun above the inner ankle, in the hollow below the bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP7',
    gloss: 'Leaking Valley',
    where: {
      en: 'Two hand-widths above the inner ankle bone, just behind the edge of the shinbone.',
      zh: '內踝尖上兩個手掌寬，脛骨內側緣後方。',
    },
    place: { en: 'Two hand-widths above the inner ankle', zh: '內踝尖上兩掌寬，脛骨後' },
    for: { en: 'Bloating, a rumbling belly, weak legs.', zh: '腹脹，腸鳴，下肢無力。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each leg.',
      zh: '兩指指腹慢慢打圈，每條腿一分鐘。',
    },
    quote: {
      han: '漏谷，在內踝上六寸骨下陷者中',
      en: 'Lougu lies six cun above the inner ankle, in the hollow below the bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP8',
    gloss: 'Pivot of the Earth',
    where: {
      en: 'On the inner shin, four finger-widths below Yinlingquan (SP9), just behind the edge of the shinbone.',
      zh: '小腿內側，陰陵泉下四橫指，脛骨內側緣後方。',
    },
    place: { en: 'Inner shin, four fingers below SP9', zh: '小腿內側，陰陵泉下四橫指' },
    for: { en: 'Period pain, irregular periods, loose stools.', zh: '經痛，月經不調，腹瀉。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each leg.',
      zh: '兩指指腹慢慢打圈，每條腿一分鐘。',
    },
    caution: {
      en: 'In pregnancy, ask a practitioner before pressing.',
      zh: '孕期按壓前，先請教醫師。',
    },
    quote: {
      han: '在膝下五寸',
      en: 'Five cun below the knee.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP9',
    gloss: 'Spring Beneath the Yin Mound',
    where: {
      en: 'On the inner leg just below the knee, in the hollow under the knob at the top of the shinbone.',
      zh: '膝下內側，脛骨上端骨突下方的凹陷處。',
    },
    place: { en: 'Below the knob at the top of the shin', zh: '膝下內側，脛骨骨突下凹陷' },
    for: { en: 'Bloating, swelling from fluid, knee pain.', zh: '腹脹，水腫，膝痛。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each leg.',
      zh: '兩指指腹慢慢打圈，每條腿一分鐘。',
    },
    quote: {
      han: '陰陵泉者，水也。在膝下內側輔骨下陷者中，伸足乃得之',
      en: 'Yinlingquan, the water point, lies below the knee on the inner side, in the hollow under the bone; stretch the leg out to find it.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP10',
    gloss: 'Sea of Blood',
    where: {
      en: 'Knee bent: three finger-widths above the inner top corner of the kneecap, on the bulge of the thigh muscle.',
      zh: '屈膝，髕骨內上角上三橫指，大腿肌肉隆起處。',
    },
    place: { en: 'Thigh bulge above the inner kneecap', zh: '髕骨內上角上三橫指' },
    for: {
      en: 'Period pain, irregular periods, itchy skin rashes.',
      zh: '經痛，月經不調，皮膚癢疹。',
    },
    press: {
      en: 'Two finger pads, slow circles, one minute each leg.',
      zh: '兩指指腹慢慢打圈，每條腿一分鐘。',
    },
    caution: { en: 'Not over broken or inflamed skin.', zh: '皮膚破損或發炎處不按。' },
    quote: {
      han: '血海，在膝臏上內廉白肉際二寸中',
      en: 'Xuehai lies above the kneecap on the inner side, two cun up, at the edge of the pale skin.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP11',
    gloss: 'Gate of the Winnowing Basket',
    where: {
      en: 'On the inner thigh, two hand-widths above Xuehai (SP10), on the line toward the groin.',
      zh: '大腿內側，血海上方兩個手掌寬，朝腹股溝方向。',
    },
    place: { en: 'Inner thigh, toward the groin', zh: '大腿內側，血海上兩掌寬' },
    for: {
      en: 'Aching groin, difficult urination, bedwetting.',
      zh: '腹股溝腫痛，小便不利，遺尿。',
    },
    press: {
      en: 'Light, with palm heel or finger pads on the muscle, one minute each leg.',
      zh: '以掌根或指腹輕按大腿肌肉，每側一分鐘。',
    },
    caution: {
      en: 'Stay off the groin crease and anywhere you feel a pulse.',
      zh: '避開腹股溝摺痕及有脈動處。',
    },
    quote: {
      han: '箕門，在魚腹上越兩筋間，動脈應手',
      en: 'Jimen lies above the fish-belly of the thigh, between the two sinews, where a pulse meets the hand.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP12',
    gloss: 'Surging Gate',
    where: {
      en: 'In the outer part of the groin crease, just outside the spot where a pulse beats.',
      zh: '腹股溝外側，摸到脈動處的外側。',
    },
    place: { en: 'Outer groin crease, beside the pulse', zh: '腹股溝外側，脈動處外' },
    for: { en: 'Lower belly pain, difficult urination.', zh: '下腹痛，小便不利。' },
    press: {
      en: 'Light touch only, beside the pulse and never on it, about a minute.',
      zh: '只在脈動旁輕觸，勿壓脈上，約一分鐘。',
    },
    caution: {
      en: 'An artery runs here: never press where you feel a beat.',
      zh: '此處有動脈，摸到脈動處不可按壓。',
    },
    quote: {
      han: '沖門，一名慈宮，上去大橫五寸，在府舍下',
      en: 'Chongmen, also called Cigong, lies five cun below Daheng, beneath Fushe.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP13',
    gloss: 'Mansion Lodging',
    where: {
      en: 'Low on the belly just above the groin crease, about a finger-width above Chongmen (SP12).',
      zh: '下腹部，腹股溝上方，衝門上約一橫指。',
    },
    place: { en: 'Low belly, just above the groin crease', zh: '下腹部，衝門上約一橫指' },
    for: { en: 'Lower belly pain, aching at the groin.', zh: '下腹痛，腹股溝痠痛。' },
    press: {
      en: 'Lying with knees bent, gentle finger pads, one minute each side.',
      zh: '屈膝躺下，指腹輕按，每側一分鐘。',
    },
    caution: {
      en: 'Not on the belly in pregnancy; keep off any pulse in the groin.',
      zh: '孕期不按腹部；避開腹股溝的脈動處。',
    },
    quote: {
      han: '府舍，在腹結下三寸',
      en: 'Fushe lies three cun below Fujie.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP14',
    gloss: 'Abdominal Knot',
    where: {
      en: 'On the belly, straight down from the nipple, about two finger-widths below the level of the navel.',
      zh: '腹部，乳頭直下，肚臍水平下約兩橫指。',
    },
    place: { en: 'Below the navel line, under the nipple', zh: '乳頭直下，臍水平下兩橫指' },
    for: { en: 'Belly pain, loose stools, constipation.', zh: '腹痛，腹瀉，便秘。' },
    press: {
      en: 'Gentle finger pads, slow circles, one minute each side.',
      zh: '指腹輕柔打圈，每側一分鐘。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '腹屈，一名腹結，在大橫下一寸三分',
      en: 'Fuqu, also called Fujie, lies one cun three fen below Daheng.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP15',
    gloss: 'Great Horizontal',
    where: {
      en: 'Level with the navel, straight down from the nipple.',
      zh: '與肚臍同高，乳頭正下方。',
    },
    place: { en: 'Level with the navel, under the nipple', zh: '與肚臍同高，乳頭正下方' },
    for: { en: 'Constipation, loose stools, a rumbling belly.', zh: '便秘，腹瀉，腸鳴。' },
    press: {
      en: 'Gentle finger pads, slow circles, one minute each side.',
      zh: '指腹輕柔打圈，每側一分鐘。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '大橫，在腹哀下三寸，直臍傍',
      en: 'Daheng lies three cun below Fu’ai, beside the navel.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP16',
    gloss: 'Belly’s Sorrow',
    where: {
      en: 'Straight down from the nipple, four finger-widths above the level of the navel.',
      zh: '乳頭直下，肚臍水平上四橫指。',
    },
    place: { en: 'Above the navel line, under the nipple', zh: '乳頭直下，臍水平上四橫指' },
    for: { en: 'Belly pain, indigestion, constipation.', zh: '腹痛，消化不良，便秘。' },
    press: {
      en: 'Gentle finger pads, one minute each side; not after a heavy meal.',
      zh: '指腹輕按，每側一分鐘；飽餐後不按。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '腹哀，在日月下一寸五分',
      en: 'Fu’ai lies one and a half cun below Riyue.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP17',
    gloss: 'Hollow of Food',
    where: {
      en: 'On the side of the chest, in the fifth rib gap, about three finger-widths outside the nipple line.',
      zh: '胸側，第五肋間，乳頭線外約三橫指。',
    },
    place: { en: 'Side of the chest, fifth rib gap', zh: '胸側，第五肋間' },
    for: { en: 'Tight chest and sides, belching, bloating.', zh: '胸脅脹痛，噯氣，腹脹。' },
    press: {
      en: 'Gentle finger pads in the rib gap, one minute each side.',
      zh: '指腹輕按肋間，每側一分鐘。',
    },
    quote: {
      han: '食竇，在天溪下一寸六分陷者中',
      en: 'Shidou lies one cun six fen below Tianxi, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP18',
    gloss: 'Heavenly Stream',
    where: {
      en: 'On the side of the chest, in the rib gap level with the nipple, about three finger-widths outside it.',
      zh: '胸側，與乳頭同高的肋間，乳頭外約三橫指。',
    },
    place: { en: 'Side of the chest, level with the nipple', zh: '胸側，與乳頭同高的肋間' },
    for: { en: 'Chest and side pain, cough, low milk supply.', zh: '胸脅痛，咳嗽，乳汁不足。' },
    press: {
      en: 'Gentle finger pads in the rib gap, one minute each side.',
      zh: '指腹輕按肋間，每側一分鐘。',
    },
    caution: {
      en: 'Not over a breast lump, redness or warmth; have a doctor check it.',
      zh: '乳房有腫塊或紅熱時不按，請就醫檢查。',
    },
    quote: {
      han: '天溪，在胸鄉下一寸六分陷者中',
      en: 'Tianxi lies one cun six fen below Xiongxiang, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP19',
    gloss: 'Chest Village',
    where: {
      en: 'On the side of the chest, one rib gap above Tianxi (SP18), the same distance out.',
      zh: '胸側，天溪上一個肋間，同樣距離。',
    },
    place: { en: 'Side of the chest, third rib gap', zh: '胸側，第三肋間' },
    for: { en: 'Tight chest and sides, cough, hiccups.', zh: '胸脅脹痛，咳嗽，打嗝。' },
    press: {
      en: 'Gentle finger pads in the rib gap, one minute each side.',
      zh: '指腹輕按肋間，每側一分鐘。',
    },
    quote: {
      han: '胸鄉，在周榮下一寸六分陷者中',
      en: 'Xiongxiang lies one cun six fen below Zhourong, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP20',
    gloss: 'Flourishing All Around',
    where: {
      en: 'High on the side of the chest, in the second rib gap, two gaps above Tianxi (SP18).',
      zh: '上胸側，第二肋間，天溪上兩個肋間。',
    },
    place: { en: 'High on the side of the chest', zh: '上胸側，第二肋間' },
    for: { en: 'Cough, a full chest, hiccups.', zh: '咳嗽，胸脅脹滿，打嗝。' },
    press: {
      en: 'Gentle finger pads in the rib gap, one minute each side.',
      zh: '指腹輕按肋間，每側一分鐘。',
    },
    quote: {
      han: '周榮，在中府下一寸六分陷者中',
      en: 'Zhourong lies one cun six fen below Zhongfu, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SP21',
    gloss: 'Great Wrap',
    where: {
      en: 'On the side of the ribs, straight down from the middle of the armpit, in the sixth rib gap.',
      zh: '腋窩正中直下，胸側第六肋間。',
    },
    place: { en: 'Below the armpit, sixth rib gap', zh: '腋窩正中直下，第六肋間' },
    for: {
      en: 'Aching all over, chest and side pain, weak limbs.',
      zh: '全身痠痛，胸脅痛，四肢無力。',
    },
    press: {
      en: 'Gentle finger pads in the rib gap, one minute each side.',
      zh: '指腹輕按肋間，每側一分鐘。',
    },
    quote: {
      han: '大包，在淵腋下三寸',
      en: 'Dabao lies three cun below Yuanye.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
