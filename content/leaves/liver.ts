import type { LeafCardInput } from './schema';

/** Leaf cards for the LV points, in channel order. */
export const liverLeaves: readonly LeafCardInput[] = [
  {
    code: 'LV1',
    gloss: 'Great Thickness',
    where: {
      en: 'On the big toe, at the corner of the nail on the side facing the second toe, just beside the nail.',
      zh: '大腳趾靠第二趾一側的趾甲角旁。',
    },
    place: { en: 'Big toe, nail corner by second toe', zh: '大腳趾甲角，靠第二趾側' },
    for: { en: 'Bed-wetting; difficult urination; constipation.', zh: '遺尿，小便不利，便秘。' },
    press: {
      en: 'Light fingertip pressure beside the nail, about a minute each foot.',
      zh: '指腹在趾甲旁輕按，每腳約一分鐘。',
    },
    quote: {
      han: '大敦者，木也。在足大指端，去爪甲角如韭葉及三毛中',
      en: 'Dadun is the wood point; it lies at the tip of the big toe, a leek leaf’s width from the corner of the nail, among the three hairs.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV2',
    gloss: 'The Space of Movement',
    where: {
      en: 'On top of the foot, between the big toe and the second toe, just behind the edge of the web.',
      zh: '足背，大腳趾與第二趾之間，趾蹼邊緣稍後方。',
    },
    place: { en: 'Web between big and second toes', zh: '大腳趾與第二趾間趾蹼後' },
    for: { en: 'Headache; dizziness; red, sore eyes.', zh: '頭痛，頭暈，目赤腫痛。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each foot.',
      zh: '指腹輕按，每腳約一分鐘。',
    },
    quote: {
      han: '行間者，火也。在足大指間動脈陷者中',
      en: 'Xingjian is the fire point; it lies between the big toe and the next, in a hollow where a pulse beats.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV3',
    gloss: 'Grand Surge',
    where: {
      en: 'On top of the foot: slide back from the web of the big toe until the two toe bones meet; it is the hollow just before.',
      zh: '足背，由大腳趾與第二趾之間往腳踝方向推，至兩骨相接前的凹陷中。',
    },
    place: { en: 'Top of foot, where the toe bones meet', zh: '足背，兩骨相接前凹陷' },
    for: { en: 'Headache; dizziness; painful periods.', zh: '頭痛，頭暈，經痛。' },
    press: {
      en: 'Steady fingertip pressure, about a minute each foot.',
      zh: '指腹穩穩按壓，每腳約一分鐘。',
    },
    caution: {
      en: 'In pregnancy, ask a practitioner first.',
      zh: '孕期請先諮詢醫師。',
    },
    quote: {
      han: '太沖者，土也。在足大指本節後二寸，或曰一寸五分陷者中',
      en: 'Taichong is the earth point; it lies two cun behind the base joint of the big toe, some say one and a half, in a hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV4',
    gloss: 'Central Boundary',
    where: {
      en: 'In front of the inner anklebone, in the hollow just inside the tendon that rises when you pull the toes up.',
      zh: '內踝前方，翹起腳趾時浮起的肌腱內側凹陷中。',
    },
    place: { en: 'In front of the inner ankle', zh: '內踝前，肌腱內側' },
    for: {
      en: 'Low belly pain; a swollen, sore ankle; a bloated belly.',
      zh: '小腹痛，腳踝腫痛，腹脹。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each foot.',
      zh: '指腹輕按，每腳約一分鐘。',
    },
    caution: { en: 'Not on a fresh sprain or a swollen ankle.', zh: '剛扭傷或腳踝腫脹時不按。' },
    quote: {
      han: '中封者，金也。在足內踝前一寸，仰足取之陷者中，伸足乃得之',
      en: 'Zhongfeng is the metal point; it lies one cun in front of the inner anklebone, in a hollow found with the foot drawn up and felt with the foot stretched.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV5',
    gloss: 'Ladle and Groove',
    where: {
      en: 'Five thumb-widths above the inner anklebone, in the middle of the flat inner face of the shin bone.',
      zh: '內踝尖上五拇指寬，脛骨內側平面的中央。',
    },
    place: { en: 'Inner shin, five thumbs above the ankle', zh: '內踝上五拇指寬，脛骨面' },
    for: {
      en: 'Irregular periods; genital itching; aching shins.',
      zh: '月經不調，陰部瘙癢，脛骨痠痛。',
    },
    press: {
      en: 'Gentle fingertip pressure on the flat of the bone, about a minute each leg.',
      zh: '指腹輕按骨面，每條腿約一分鐘。',
    },
    quote: {
      han: '蠡溝，足厥陰之絡，在足內踝上五寸，別走少陽',
      en: 'Ligou, the connecting point of the foot Jueyin, lies five cun above the inner anklebone and branches off to the Shaoyang.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV6',
    gloss: 'Central Capital',
    where: {
      en: 'Seven thumb-widths above the inner anklebone, in the middle of the flat inner face of the shin bone.',
      zh: '內踝尖上七拇指寬，脛骨內側平面的中央。',
    },
    place: { en: 'Inner shin, seven thumbs above the ankle', zh: '內踝上七拇指寬，脛骨面' },
    for: {
      en: 'Low belly pain; pain under the ribs; weak legs.',
      zh: '小腹痛，脅肋痛，下肢無力。',
    },
    press: {
      en: 'Light fingertip pressure on the flat of the bone, about a minute each leg.',
      zh: '指腹輕按骨面，每條腿約一分鐘。',
    },
    quote: {
      han: '中都二穴，一名中郄，在內踝上七寸',
      en: 'Zhongdu, one on each leg, also called Zhongxi, lies seven cun above the inner ankle.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'LV7',
    gloss: 'Knee Pass',
    where: {
      en: 'Below the inner knee: from the groove under the knob of the shin bone, one thumb-width back onto the calf muscle.',
      zh: '膝內下方，由脛骨內側髁下的凹溝往後一拇指寬，小腿肌肉上。',
    },
    place: { en: 'Below the inner knee, on the calf', zh: '膝內下方，小腿肌肉上' },
    for: { en: 'Swollen, painful knees; weak legs.', zh: '膝蓋腫痛，下肢無力。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each leg.',
      zh: '指腹輕按，每條腿約一分鐘。',
    },
    quote: {
      han: '膝關，在犢鼻下二寸陷者中',
      en: 'Xiguan lies in a hollow two cun below Dubi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV8',
    gloss: 'Spring at the Bend',
    where: {
      en: 'Knee bent: at the inner end of the crease behind the knee, in the hollow in front of the tendons.',
      zh: '屈膝，膕橫紋內側端，肌腱前方的凹陷中。',
    },
    place: { en: 'Inner knee crease, front of the tendons', zh: '膕橫紋內側端，肌腱前' },
    for: { en: 'Difficult urination; painful periods; knee pain.', zh: '小便不利，經痛，膝痛。' },
    press: {
      en: 'Light fingertip touch, knee bent, about a minute each leg.',
      zh: '屈膝，指腹輕觸，每條腿約一分鐘。',
    },
    caution: {
      en: 'Not on a hot, swollen or newly injured knee.',
      zh: '膝蓋發熱、腫脹或剛受傷時不按。',
    },
    quote: {
      han: '曲泉者，水也。在膝內輔骨下，大筋上，小筋下，陷者中，屈膝得之',
      en: 'Ququan is the water point; it lies below the bone at the inner knee, above the large sinew and below the small one, in a hollow found with the knee bent.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV9',
    gloss: 'The Wrapping of Yin',
    where: {
      en: 'On the inner thigh, four thumb-widths above the bony knob of the inner knee, in the seam between two muscles.',
      zh: '大腿內側，膝內側骨突上四拇指寬，兩肌之間的縫中。',
    },
    place: { en: 'Inner thigh, above the knee', zh: '大腿內側，膝上四拇指寬' },
    for: {
      en: 'Low belly pain reaching the lower back; irregular periods.',
      zh: '小腹痛牽引腰骶，月經不調。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each leg.',
      zh: '指腹輕按，每條腿約一分鐘。',
    },
    caution: {
      en: 'Not over varicose veins, bruises or broken skin.',
      zh: '有靜脈曲張、瘀傷或皮膚破損處不按。',
    },
    quote: {
      han: '陰包，在膝上四寸股內廉兩筋間',
      en: 'Yinbao lies four cun above the knee, between two sinews on the inner thigh.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV10',
    gloss: 'Five Li on the Leg',
    where: {
      en: 'At the top of the inner thigh, four finger-widths below the groin, beside the cord that stands out as the knees squeeze.',
      zh: '大腿內側根部，腹股溝下四橫指，夾腿時浮起的肌腱旁。',
    },
    place: { en: 'Top of the inner thigh, below the groin', zh: '大腿內側根部，腹股溝下四橫指' },
    for: {
      en: 'Low belly bloating and pain; difficult urination; tiredness.',
      zh: '小腹脹痛，小便不利，疲倦嗜睡。',
    },
    press: {
      en: 'Light fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    caution: {
      en: 'Not over swollen glands, lumps or varicose veins.',
      zh: '有淋巴結腫大、腫塊或靜脈曲張處不按。',
    },
    quote: {
      han: '五里，在陰廉下，去氣沖三寸，陰股中動脈',
      en: 'Wuli lies below Yinlian, three cun from Qichong, where a pulse beats in the inner thigh.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV11',
    gloss: 'Margin of the Yin',
    where: {
      en: 'At the top of the inner thigh, three finger-widths below the groin, beside the cord that stands out as the knees squeeze.',
      zh: '大腿內側根部，腹股溝下三橫指，夾腿時浮起的肌腱旁。',
    },
    place: { en: 'Top of the inner thigh, by the groin', zh: '大腿內側根部，腹股溝下三橫指' },
    for: { en: 'Irregular periods; low belly pain.', zh: '月經不調，小腹痛。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    caution: { en: 'Keep off any spot where you feel a pulse.', zh: '摸到脈搏跳動處，切勿按壓。' },
    quote: {
      han: '陰廉，在羊矢下，去氣沖二寸動脈中',
      en: 'Yinlian lies below the groin nodes, two cun from Qichong, where a pulse beats.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LV12',
    gloss: 'Urgent Pulse',
    where: {
      en: 'In the groin fold, just out from the pubic bone, where you feel the pulse of the large thigh artery.',
      zh: '腹股溝褶中，恥骨外側，可摸到大腿動脈搏動處。',
    },
    place: { en: 'Groin fold, at the thigh pulse', zh: '腹股溝，大腿動脈搏動處' },
    for: { en: 'Low belly pain; groin pain.', zh: '小腹痛，腹股溝痛。' },
    press: {
      en: 'Do not press the artery: rest a feather-light fingertip beside the pulse only.',
      zh: '勿壓動脈，只在脈旁極輕觸碰。',
    },
    caution: {
      en: 'Never press on the pulse itself; skip it over lumps or swollen glands.',
      zh: '切勿按壓脈搏處；有腫塊或淋巴結腫大時不碰。',
    },
  },
  {
    code: 'LV13',
    gloss: 'Orderly Gate',
    where: {
      en: 'On the side of the belly, just below the free tip of the second-lowest rib.',
      zh: '側腹，倒數第二根肋骨游離端的下方。',
    },
    place: { en: 'Side belly, below a floating rib tip', zh: '側腹，倒數第二肋游離端下' },
    for: { en: 'Pain under the ribs; a bloated belly; loose stools.', zh: '脅肋痛，腹脹，腹瀉。' },
    press: {
      en: 'Gentle fingertip pressure on the muscle, not under the ribs; about a minute.',
      zh: '指腹輕按肌肉，勿往肋下深按；約一分鐘。',
    },
    caution: {
      en: 'Not during a stomach upset; in pregnancy, ask a practitioner first.',
      zh: '腸胃不適時不按；孕期請先徵詢醫師意見。',
    },
    quote: {
      han: '章門二穴，脾之募，一名長平，一名脇髎，在大橫外，直臍季肋端',
      en: 'Zhangmen, one on each side, is the alarm point of the spleen, also called Changping and Xieliao; it lies outside Daheng, level with the navel, at the end of the floating ribs.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'LV14',
    gloss: 'Cycle Gate',
    where: {
      en: 'Straight below the nipple, in the second rib gap down from it.',
      zh: '乳頭直下，往下數第二個肋間。',
    },
    place: { en: 'Second rib space below the nipple', zh: '乳頭直下第二肋間' },
    for: { en: 'Tight chest and ribs; a bloated belly; hiccups.', zh: '胸脅脹痛，腹脹，打嗝。' },
    press: {
      en: 'Light touch with the finger pads in the rib groove, about a minute.',
      zh: '指腹輕觸肋間，約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press hard into the rib space.',
      zh: '只可輕觸，切勿往肋間用力深按。',
    },
    quote: {
      han: '期門，肝募也，在第二肋端，不容傍各一寸五分，上直兩乳',
      en: 'Qimen, the gathering point of the liver, lies at the end of the second rib, one and a half cun beside Burong, in line with the nipples above.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
