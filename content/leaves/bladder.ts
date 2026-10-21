import type { LeafCardInput } from './schema';

/** Leaf cards for the BL points, in channel order. */
export const bladderLeaves: readonly LeafCardInput[] = [
  {
    code: 'BL1',
    gloss: 'Brightness of the Eye',
    where: {
      en: 'In the small hollow just above the inner corner of the eye, beside the bridge of the nose.',
      zh: '眼內角稍上方的小凹陷，緊貼鼻梁旁。',
    },
    place: {
      en: 'Just above the inner eye corner',
      zh: '眼內角稍上方',
    },
    for: { en: 'Red, sore eyes; watery eyes; blurred vision.', zh: '眼紅腫痛，流淚，視物模糊。' },
    press: {
      en: 'Feather-light, one clean fingertip toward the nose bone, for a few slow breaths.',
      zh: '洗淨手，以指腹極輕地朝鼻骨按，幾次呼吸即可。',
    },
    caution: {
      en: 'Never press the eyeball. Skip with an eye infection or after eye surgery.',
      zh: '切勿按壓眼球；眼睛發炎或術後不按。',
    },
    quote: {
      han: '睛明，一名淚孔，在目內眥外',
      en: 'Jingming, also called Tear Hole, lies outside the inner corner of the eye.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL2',
    gloss: 'Gathered Bamboo',
    where: {
      en: 'In the small notch at the inner end of the eyebrow, on the bone above the inner corner of the eye.',
      zh: '眉頭內端的小凹陷，在眼內角上方的骨緣上。',
    },
    place: {
      en: 'Inner end of the eyebrow',
      zh: '眉頭凹陷中',
    },
    for: { en: 'Headache; aching brow; twitching eyelids.', zh: '頭痛，眉稜骨痛，眼皮跳。' },
    press: {
      en: 'Small slow circles with a fingertip on the bone, about a minute each side.',
      zh: '指腹在骨上慢慢打小圈，每側約一分鐘。',
    },
    caution: {
      en: 'Press the brow bone only, never down into the eye.',
      zh: '只按眉骨，切勿往下按到眼球。',
    },
    quote: {
      han: '攢竹，一名員在，一名始光，一名夜光，又名明光，在眉頭陷者中',
      en: 'Cuanzhu, also called Yuanzai, Shiguang, Yeguang or Mingguang, lies in the hollow at the head of the eyebrow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL3',
    gloss: 'Eyebrow Surge',
    where: {
      en: 'Straight up from the inner end of the eyebrow, half a thumb-width inside the front hairline.',
      zh: '眉頭直上，入前髮際約半拇指寬處。',
    },
    place: {
      en: 'Above the brow, just inside the hairline',
      zh: '眉頭直上，入前髮際',
    },
    for: { en: 'Headache; dizziness; a blocked nose.', zh: '頭痛，頭暈，鼻塞。' },
    press: {
      en: 'Small circles with two fingertips, about a minute each side.',
      zh: '兩指指腹打小圈，每側約一分鐘。',
    },
  },
  {
    code: 'BL4',
    gloss: 'Winding Deviation',
    where: {
      en: 'Half a thumb-width inside the front hairline, two finger-widths out from the centre line.',
      zh: '入前髮際約半拇指寬，正中線旁開兩橫指。',
    },
    place: {
      en: 'Inside the hairline, two fingers out',
      zh: '入前髮際，旁開兩橫指',
    },
    for: { en: 'Headache; dizziness; a blocked nose.', zh: '頭痛，頭暈，鼻塞。' },
    press: {
      en: 'Small circles with two fingertips, about a minute each side.',
      zh: '兩指指腹打小圈，每側約一分鐘。',
    },
    quote: {
      han: '曲差，一名鼻沖，俠神庭兩傍各一寸五分，在髮際',
      en: 'Qucha, also called Bichong, lies at the hairline, one and a half cun to either side of Shenting.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL5',
    gloss: 'Fifth Place',
    where: {
      en: 'One thumb-width inside the front hairline, two finger-widths out from the centre line.',
      zh: '入前髮際一拇指寬，正中線旁開兩橫指。',
    },
    place: {
      en: 'A thumb inside the hairline, off centre',
      zh: '入髮際一拇指，旁開兩橫指',
    },
    for: { en: 'Headache; dizziness; failing eyesight.', zh: '頭痛，頭暈，視力減退。' },
    press: {
      en: 'Small circles with two fingertips, about a minute each side.',
      zh: '兩指指腹打小圈，每側約一分鐘。',
    },
    quote: {
      han: '五處，在督脈傍，去上星一寸五分',
      en: 'Wuchu lies beside the Governor Vessel, one and a half cun from Shangxing.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL6',
    gloss: 'Receiving Light',
    where: {
      en: 'On the scalp, two finger-widths behind BL5, on the same line two finger-widths out from the centre.',
      zh: '頭頂前部，五處穴後兩橫指，正中線旁開兩橫指。',
    },
    place: {
      en: 'Front of the scalp, off centre',
      zh: '頭頂前部，旁開兩橫指',
    },
    for: { en: 'Headache; dizziness; blurred vision.', zh: '頭痛，頭暈，視物模糊。' },
    press: {
      en: 'Small circles with two fingertips, about a minute each side.',
      zh: '兩指指腹打小圈，每側約一分鐘。',
    },
    quote: {
      han: '承光，在五處後二寸',
      en: 'Chengguang lies two cun behind Wuchu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL7',
    gloss: 'Reaching Heaven',
    where: {
      en: 'Near the top of the head, two finger-widths behind BL6 and two finger-widths out from the centre line.',
      zh: '近頭頂，承光穴後兩橫指，正中線旁開兩橫指。',
    },
    place: {
      en: 'Near the crown, off centre',
      zh: '近頭頂，旁開兩橫指',
    },
    for: { en: 'Headache; a stuffy nose; sinus trouble.', zh: '頭痛，鼻塞，鼻竇不適。' },
    press: {
      en: 'Small circles with two fingertips, about a minute each side.',
      zh: '兩指指腹打小圈，每側約一分鐘。',
    },
    quote: {
      han: '通天，一名天臼，在承光後一寸五分',
      en: 'Tongtian, also called Tianjiu, lies one and a half cun behind Chengguang.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL8',
    gloss: 'The Net That Steps Back',
    where: {
      en: 'Just behind the crown, two finger-widths behind BL7 and two finger-widths out from the centre line.',
      zh: '頭頂稍後，通天穴後兩橫指，正中線旁開兩橫指。',
    },
    place: {
      en: 'Just behind the crown, off centre',
      zh: '頭頂稍後，旁開兩橫指',
    },
    for: { en: 'Dizziness; ringing in the ears; blurred vision.', zh: '頭暈，耳鳴，視物模糊。' },
    press: {
      en: 'Small circles with two fingertips, about a minute each side.',
      zh: '兩指指腹打小圈，每側約一分鐘。',
    },
    quote: {
      han: '絡卻，一名強陽，一名腦蓋，在通天後一寸三分',
      en: 'Luoque, also called Qiangyang or Naogai, lies one and three-tenths cun behind Tongtian.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL9',
    gloss: 'Jade Pillow',
    where: {
      en: 'At the back of the head, level with the top of the bony bump at the base of the skull, just under two finger-widths from the centre.',
      zh: '後腦，與枕骨隆起上緣同高，正中線旁開近兩橫指。',
    },
    place: {
      en: 'Back of the head, beside the skull bump',
      zh: '後腦，枕骨隆起旁',
    },
    for: { en: 'Head and neck pain; eye pain; a blocked nose.', zh: '頭頸痛，眼痛，鼻塞。' },
    press: {
      en: 'Fingertips of both hands, small circles, about a minute.',
      zh: '雙手指腹同時打小圈，約一分鐘。',
    },
    quote: {
      han: '玉枕，在絡卻後七分，俠腦戶傍一寸三分',
      en: 'Yuzhen lies seven-tenths of a cun behind Luoque, one and three-tenths cun beside Naohu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL10',
    gloss: 'Pillar of Heaven',
    where: {
      en: 'On the back of the neck, just below the skull, in the hollow at the outer edge of the thick neck muscle.',
      zh: '頸後，枕骨下方，粗大頸肌外緣的凹陷中。',
    },
    place: {
      en: 'Under the skull, beside the neck muscle',
      zh: '枕骨下，頸肌外緣凹陷',
    },
    for: {
      en: 'Back-of-head headache; stiff neck; aching shoulders.',
      zh: '後頭痛，頸僵，肩背痠痛。',
    },
    press: {
      en: 'Thumbs press up under the skull, firm, about a minute.',
      zh: '雙手拇指向上頂按枕骨下，稍用力，約一分鐘。',
    },
    quote: {
      han: '天柱，在俠項後髮際大筋外廉陷者中',
      en: 'Tianzhu lies at the back hairline beside the nape, in the hollow on the outer edge of the great sinew.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL11',
    gloss: 'Great Shuttle',
    where: {
      en: 'Below the first bump under the knobbly neck bone (C7), two finger-widths to each side of the spine.',
      zh: '頸後最突的骨（第七頸椎）往下第一個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 1st bump below C7',
      zh: '脊旁，第七頸椎下第一骨突',
    },
    for: { en: 'Stiff neck; shoulder and upper-back ache; cough.', zh: '頸僵，肩背痠痛，咳嗽。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '大杼，在項第一椎下，兩傍各一寸五分陷者中',
      en: 'Dazhu lies below the first vertebra of the nape, in the hollows one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL12',
    gloss: 'Wind Gate',
    where: {
      en: 'Below the second bump under the neck bone (C7), two finger-widths to each side of the spine.',
      zh: '第七頸椎往下第二個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 2nd bump below C7',
      zh: '脊旁，第七頸椎下第二骨突',
    },
    for: { en: 'Common cold; cough; neck ache.', zh: '感冒，咳嗽，頸痛。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '風門熱府，在第二椎下，兩傍各一寸五分',
      en: 'Fengmen, the Heat Mansion, lies below the second vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL13',
    gloss: 'Lung Transport',
    where: {
      en: 'Below the third bump under the neck bone (C7), two finger-widths to each side of the spine.',
      zh: '第七頸椎往下第三個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 3rd bump below C7',
      zh: '脊旁，第七頸椎下第三骨突',
    },
    for: { en: 'Cough; shortness of breath; night sweats.', zh: '咳嗽，氣短，盜汗。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '肺俞，在第三椎下兩傍各一寸五分',
      en: 'Feishu lies below the third vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL14',
    gloss: 'Transport of Terminal Yin',
    where: {
      en: 'Below the fourth bump under the neck bone (C7), two finger-widths to each side of the spine.',
      zh: '第七頸椎往下第四個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 4th bump below C7',
      zh: '脊旁，第七頸椎下第四骨突',
    },
    for: { en: 'Palpitations; a tight chest; cough.', zh: '心悸，胸悶，咳嗽。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '厥陰腧二穴，在第四顀下，兩傍相去各一寸五分',
      en: 'Jueyinshu lies below the fourth vertebra, one and a half cun out on either side.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'BL15',
    gloss: 'Heart’s Transport',
    where: {
      en: 'Below the fifth bump under the neck bone (C7), two finger-widths to each side of the spine.',
      zh: '第七頸椎往下第五個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 5th bump below C7',
      zh: '脊旁，第七頸椎下第五骨突',
    },
    for: { en: 'Palpitations; poor sleep; forgetfulness.', zh: '心悸，失眠，健忘。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '心俞，在第五椎下，兩傍各一寸五分',
      en: 'Xinshu lies below the fifth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL16',
    gloss: 'Transport of the Overseer',
    where: {
      en: 'Below the sixth bump under the neck bone (C7), two finger-widths to each side of the spine.',
      zh: '第七頸椎往下第六個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 6th bump below C7',
      zh: '脊旁，第七頸椎下第六骨突',
    },
    for: { en: 'A tight chest; stomach ache; a rumbling belly.', zh: '胸悶，腹痛，腸鳴。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
  },
  {
    code: 'BL17',
    gloss: 'The Diaphragm’s Transport',
    where: {
      en: 'Level with the lower tips of the shoulder blades (below the seventh bump from C7), two finger-widths to each side.',
      zh: '與兩側肩胛骨下角同高（第七頸椎往下第七個骨突下方），脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, level with blade tips',
      zh: '脊旁，與肩胛骨下角同高',
    },
    for: { en: 'Hiccups; belching; itchy skin.', zh: '打嗝，噯氣，皮膚搔癢。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '膈俞，在第七椎下，兩傍各一寸五分',
      en: 'Geshu lies below the seventh vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL18',
    gloss: 'The Liver’s Transport',
    where: {
      en: 'Two bumps below the shoulder-blade tips (below the ninth bump from C7), two finger-widths to each side.',
      zh: '肩胛骨下角水平再往下兩個骨突（第九胸椎下），脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 9th bump below C7',
      zh: '脊旁，第七頸椎下第九骨突',
    },
    for: { en: 'Aching under the ribs; red eyes; back ache.', zh: '脅肋脹痛，眼紅，背痛。' },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '肝俞，在第九椎下，兩傍各一寸五分',
      en: 'Ganshu lies below the ninth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL19',
    gloss: 'The Gallbladder’s Transport',
    where: {
      en: 'Three bumps below the shoulder-blade tips (below the tenth bump from C7), two finger-widths to each side.',
      zh: '肩胛骨下角水平再往下三個骨突（第十胸椎下），脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 10th bump below C7',
      zh: '脊旁，第七頸椎下第十骨突',
    },
    for: { en: 'A bitter taste in the mouth; aching under the ribs.', zh: '口苦，脅肋疼痛。' },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '膽俞，在第十椎下，兩傍各一寸五分',
      en: 'Danshu lies below the tenth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL20',
    gloss: 'Spleen Transport',
    where: {
      en: 'Below the eleventh bump counted down from the neck bone (C7), two finger-widths to each side of the spine.',
      zh: '第七頸椎往下數第十一個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 11th bump below C7',
      zh: '脊旁，第七頸椎下第十一骨突',
    },
    for: { en: 'Bloating; loose stools; back ache.', zh: '腹脹，腹瀉，背痛。' },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '脾俞，在第十一椎下，兩傍各一寸五分',
      en: 'Pishu lies below the eleventh vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL21',
    gloss: 'Stomach Transport',
    where: {
      en: 'Below the twelfth bump counted down from the neck bone (C7), two finger-widths to each side of the spine.',
      zh: '第七頸椎往下數第十二個骨突下方，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Beside the spine, 12th bump below C7',
      zh: '脊旁，第七頸椎下第十二骨突',
    },
    for: {
      en: 'Stomach ache; bloating; hungry but no wish to eat.',
      zh: '胃痛，腹脹，飢而不欲食。',
    },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '胃俞，在第十二椎下，兩傍各一寸五分',
      en: 'Weishu lies below the twelfth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL22',
    gloss: 'Triple-Burner Transport',
    where: {
      en: 'On the lower back, one bump above navel level (below the first lumbar bump), two finger-widths from the spine.',
      zh: '腰部，比肚臍水平高一個骨突（第一腰椎下），脊柱旁開兩橫指。',
    },
    place: {
      en: 'Low back, one bump above navel level',
      zh: '腰部，比肚臍高一骨突',
    },
    for: { en: 'Bloating; a rumbling belly; a stiff lower back.', zh: '腹脹，腸鳴，腰背僵痛。' },
    press: {
      en: 'Hands on hips, press with the thumbs, fairly firm, about a minute.',
      zh: '雙手叉腰，以拇指稍用力按，約一分鐘。',
    },
    caution: {
      en: 'The kidneys lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是腎，只宜輕按，切勿用力。',
    },
    quote: {
      han: '三焦俞，在第十三椎下，兩傍各一寸五分',
      en: 'Sanjiaoshu lies below the thirteenth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL23',
    gloss: 'The Kidney’s Transport',
    where: {
      en: 'On the lower back, level with the navel, two finger-widths to each side of the spine.',
      zh: '腰部，與肚臍同高，脊柱旁開兩橫指。',
    },
    place: {
      en: 'Low back, level with the navel',
      zh: '腰部，與肚臍同高',
    },
    for: { en: 'Lower back ache; ringing in the ears; bed-wetting.', zh: '腰痛，耳鳴，遺尿。' },
    press: {
      en: 'Hands on hips, press with the thumbs, fairly firm, about a minute.',
      zh: '雙手叉腰，以拇指稍用力按，約一分鐘。',
    },
    caution: {
      en: 'The kidneys lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是腎，只宜輕按，切勿用力。',
    },
    quote: {
      han: '腎俞，在第十四椎下，兩傍各一寸五分',
      en: 'Shenshu lies below the fourteenth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL24',
    gloss: 'Sea-of-Qi Transport',
    where: {
      en: 'On the lower back, one bump below navel level (below the third lumbar bump), two finger-widths from the spine.',
      zh: '腰部，比肚臍水平低一個骨突（第三腰椎下），脊柱旁開兩橫指。',
    },
    place: {
      en: 'Low back, one bump below navel level',
      zh: '腰部，比肚臍低一骨突',
    },
    for: { en: 'Lower back ache; period pain; bloating.', zh: '腰痛，經痛，腹脹。' },
    press: {
      en: 'Hands on hips, press with the thumbs, fairly firm, about a minute.',
      zh: '雙手叉腰，以拇指稍用力按，約一分鐘。',
    },
  },
  {
    code: 'BL25',
    gloss: 'Large Intestine Transport',
    where: {
      en: 'On the line joining the tops of the hip bones (below the fourth lumbar bump), two finger-widths from the spine.',
      zh: '兩側髂骨最高點連線上（第四腰椎下），脊柱旁開兩橫指。',
    },
    place: {
      en: 'Low back, level with the hip-bone tops',
      zh: '腰部，兩髂骨最高點連線上',
    },
    for: { en: 'Constipation or loose stools; low back and leg pain.', zh: '便秘或腹瀉，腰腿痛。' },
    press: {
      en: 'Hands on hips, press with the thumbs, fairly firm, about a minute.',
      zh: '雙手叉腰，以拇指稍用力按，約一分鐘。',
    },
    quote: {
      han: '大腸俞，在第十六椎下，兩傍各一寸五分',
      en: 'Dachangshu lies below the sixteenth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL26',
    gloss: 'Transport of the Origin Pass',
    where: {
      en: 'One bump below the line joining the tops of the hip bones (below the fifth lumbar bump), two finger-widths from the spine.',
      zh: '髂骨最高點連線往下一個骨突（第五腰椎下），脊柱旁開兩橫指。',
    },
    place: {
      en: 'Low back, one bump below hip-bone tops',
      zh: '髂骨最高點連線下一骨突',
    },
    for: {
      en: 'Low back and tailbone ache; bloating; frequent urination.',
      zh: '腰骶痛，腹脹，尿頻。',
    },
    press: {
      en: 'Hands on hips, press with the thumbs, fairly firm, about a minute.',
      zh: '雙手叉腰，以拇指稍用力按，約一分鐘。',
    },
  },
  {
    code: 'BL27',
    gloss: 'Small Intestine Transport',
    where: {
      en: 'On the flat bone at the base of the spine, level with its top hollow, two finger-widths from the centre ridge.',
      zh: '骶骨上，與第一骶後孔同高，骶骨正中嵴旁開兩橫指。',
    },
    place: {
      en: 'On the sacrum, level with its top hollow',
      zh: '骶骨上，與第一骶後孔同高',
    },
    for: { en: 'Low back and sacral ache; loose stools.', zh: '腰骶痛，腹瀉。' },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    quote: {
      han: '小腸俞，在第十八椎下兩傍各一寸五分',
      en: 'Xiaochangshu lies below the eighteenth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL28',
    gloss: 'Bladder Transport',
    where: {
      en: 'On the sacrum, about level with the two dimples of the low back, two finger-widths from the centre ridge.',
      zh: '骶骨上，約與腰窩（髂後上棘）同高，骶骨正中嵴旁開兩橫指。',
    },
    place: {
      en: 'On the sacrum, by the low-back dimples',
      zh: '骶骨上，約與腰窩同高',
    },
    for: { en: 'Difficult urination; bed-wetting; low back ache.', zh: '小便不利，遺尿，腰骶痛。' },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    quote: {
      han: '膀胱俞，在第十九椎下，兩傍各一寸五分',
      en: 'Pangguangshu lies below the nineteenth vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL29',
    gloss: 'Central Spine Transport',
    where: {
      en: 'On the sacrum, level with its third hollow, two finger-widths from the centre ridge.',
      zh: '骶骨上，與第三骶後孔同高，骶骨正中嵴旁開兩橫指。',
    },
    place: {
      en: 'On the sacrum, level with its 3rd hollow',
      zh: '骶骨上，與第三骶後孔同高',
    },
    for: { en: 'Low back and sacral ache; loose stools.', zh: '腰骶痛，腹瀉。' },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    quote: {
      han: '中膂俞，在第二十椎下，兩傍各一寸五分，俠脊胂而起',
      en: 'Zhonglushu lies below the twentieth vertebra, one and a half cun to either side, rising on the muscle beside the spine.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL30',
    gloss: 'White Ring Transport',
    where: {
      en: 'Low on the sacrum, level with its fourth hollow, two finger-widths from the centre ridge.',
      zh: '骶骨下部，與第四骶後孔同高，骶骨正中嵴旁開兩橫指。',
    },
    place: {
      en: 'Low on the sacrum, by its 4th hollow',
      zh: '骶骨下部，與第四骶後孔同高',
    },
    for: { en: 'Low back and sacral ache; irregular periods.', zh: '腰骶痛，月經不調。' },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    quote: {
      han: '白環俞，在第二十一椎下，兩傍各一寸五分',
      en: 'Baihuanshu lies below the twenty-first vertebra, one and a half cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL31',
    gloss: 'Upper Bone-Hollow',
    where: {
      en: 'In the first small hollow on the sacrum, between the low-back dimple and the centre line of the spine.',
      zh: '骶骨上第一個小凹陷，在腰窩與脊柱正中線之間。',
    },
    place: {
      en: 'First hollow of the sacrum',
      zh: '骶骨第一個小凹陷',
    },
    for: {
      en: 'Irregular periods; low back ache; difficult urination.',
      zh: '月經不調，腰骶痛，小便不利。',
    },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    caution: {
      en: 'Not in pregnancy, or if you could be pregnant.',
      zh: '孕期或可能懷孕時不按。',
    },
    quote: {
      han: '上窌，在第一空腰髁下一寸，俠脊陷者中',
      en: 'Shangliao lies in the first hole, one cun below the lumbar bone, in the hollow beside the spine.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL32',
    gloss: 'Second Bone-Hole',
    where: {
      en: 'In the second small hollow on the sacrum, just below and inside the low-back dimple.',
      zh: '骶骨上第二個小凹陷，在腰窩稍下偏內處。',
    },
    place: {
      en: 'Second hollow of the sacrum',
      zh: '骶骨第二個小凹陷',
    },
    for: { en: 'Period pain; low back ache; difficult urination.', zh: '經痛，腰骶痛，小便不利。' },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    caution: {
      en: 'Not in pregnancy, or if you could be pregnant.',
      zh: '孕期或可能懷孕時不按。',
    },
    quote: {
      han: '次窌，在第二空，俠脊陷者中',
      en: 'Ciliao lies in the second hole, in the hollow beside the spine.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL33',
    gloss: 'The Middle Bone-Hole',
    where: {
      en: 'In the third small hollow on the sacrum, a little below and inside BL32.',
      zh: '骶骨上第三個小凹陷，在次髎穴稍下偏內處。',
    },
    place: {
      en: 'Third hollow of the sacrum',
      zh: '骶骨第三個小凹陷',
    },
    for: { en: 'Irregular periods; constipation; low back ache.', zh: '月經不調，便秘，腰骶痛。' },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    caution: {
      en: 'Not in pregnancy, or if you could be pregnant.',
      zh: '孕期或可能懷孕時不按。',
    },
    quote: {
      han: '中窌，在第三空，俠脊陷者中',
      en: 'Zhongliao lies in the third hole, in the hollow beside the spine.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL34',
    gloss: 'The Lower Bone-Hollow',
    where: {
      en: 'In the fourth small hollow, near the bottom of the sacrum, a little below and inside BL33.',
      zh: '骶骨下端附近的第四個小凹陷，在中髎穴稍下偏內處。',
    },
    place: {
      en: 'Fourth hollow of the sacrum',
      zh: '骶骨第四個小凹陷',
    },
    for: { en: 'Lower belly pain; constipation; low back ache.', zh: '小腹痛，便秘，腰骶痛。' },
    press: {
      en: 'Reach behind and press with the fingertips, about a minute.',
      zh: '雙手反到背後，以指腹按揉，約一分鐘。',
    },
    caution: {
      en: 'Not in pregnancy, or if you could be pregnant.',
      zh: '孕期或可能懷孕時不按。',
    },
    quote: {
      han: '下窌，在第四空，俠脊陷者中',
      en: 'Xialiao lies in the fourth hole, in the hollow beside the spine.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL35',
    gloss: 'Meeting of Yang',
    where: {
      en: 'Beside the tip of the tailbone, about half a thumb-width to each side.',
      zh: '尾骨尖兩旁，各約半拇指寬處。',
    },
    place: {
      en: 'Beside the tip of the tailbone',
      zh: '尾骨尖兩旁',
    },
    for: { en: 'Haemorrhoids; loose stools.', zh: '痔瘡，腹瀉。' },
    press: {
      en: 'Through clothing, light fingertip pressure, about a minute.',
      zh: '隔著衣物以指腹輕按，約一分鐘。',
    },
    caution: {
      en: 'Skip during a painful haemorrhoid flare or over sore or broken skin.',
      zh: '痔瘡發作疼痛或皮膚破損時不按。',
    },
    quote: {
      han: '會陽二穴，一名利機，在陰尾骨兩傍，督脈氣所發',
      en: 'Huiyang, also called Liji, lies on either side of the tailbone, where the Governor Vessel’s qi emerges.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'BL36',
    gloss: 'Holding Support',
    where: {
      en: 'At the centre of the crease under the buttock.',
      zh: '臀下橫紋的正中點。',
    },
    place: {
      en: 'Centre of the buttock crease',
      zh: '臀下橫紋正中',
    },
    for: { en: 'Low back, buttock and thigh ache; haemorrhoids.', zh: '腰、臀及大腿痛，痔瘡。' },
    press: {
      en: 'Press firmly with the fingers, or sit on a firm ball, about a minute each side.',
      zh: '以手指稍用力按，或坐在硬球上，每側約一分鐘。',
    },
    quote: {
      han: '承扶，一名肉郤，一名陰關，一名皮部，在尻臀下',
      en: 'Chengfu, also called Rouxi, Yinguan or Pibu, lies below the buttock.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL37',
    gloss: 'Gate of Abundance',
    where: {
      en: 'In the middle of the back of the thigh, two hand-widths (eight finger-widths) below the buttock crease.',
      zh: '大腿後側正中，臀下橫紋往下兩掌寬（八橫指）。',
    },
    place: {
      en: 'Middle of the back of the thigh',
      zh: '大腿後側正中',
    },
    for: { en: 'Low back ache; weak, tired legs.', zh: '腰痛，雙腿無力。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '以拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '殷門，在肉郤下六寸',
      en: 'Yinmen lies six cun below Rouxi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL38',
    gloss: 'The Floating Cleft',
    where: {
      en: 'One thumb-width above the outer end of the knee crease, just inside the tendon at the outer back of the knee.',
      zh: '膝後橫紋外端上方一拇指寬，外側筋腱的內緣。',
    },
    place: {
      en: 'Just above the outer knee crease',
      zh: '膝後橫紋外端上方',
    },
    for: { en: 'Numb, aching thigh and back of the knee; cramps.', zh: '大腿及膝後麻痛，抽筋。' },
    press: {
      en: 'Sit with the knee bent and press with a fingertip, about a minute each leg.',
      zh: '坐下屈膝，以指腹按，每條腿約一分鐘。',
    },
    caution: {
      en: 'A nerve runs beside this tendon: press gently, and ease off if it tingles.',
      zh: '筋腱旁有神經經過，宜輕按，有麻感即放輕。',
    },
    quote: {
      han: '浮郤，在委陽上一寸，屈膝得之',
      en: 'Fuxi lies one cun above Weiyang; bend the knee to find it.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL39',
    gloss: 'The Bent Yang',
    where: {
      en: 'At the outer end of the crease behind the knee, just inside the tendon there.',
      zh: '膝後橫紋外端，外側筋腱的內緣。',
    },
    place: {
      en: 'Outer end of the knee crease',
      zh: '膝後橫紋外端',
    },
    for: {
      en: 'A stiff lower back; cramping legs; difficult urination.',
      zh: '腰脊僵痛，腿腳拘攣，小便不利。',
    },
    press: {
      en: 'Sit with the knee bent and press with a fingertip, about a minute each leg.',
      zh: '坐下屈膝，以指腹按，每條腿約一分鐘。',
    },
    caution: {
      en: 'A nerve runs beside this tendon: press gently, and ease off if it tingles.',
      zh: '筋腱旁有神經經過，宜輕按，有麻感即放輕。',
    },
    quote: {
      han: '委陽，三焦下輔俞也，在足太陽之前，少陽之後',
      en: 'Weiyang, the lower assisting point of the triple burner, lies in front of the foot taiyang and behind the shaoyang.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL40',
    gloss: 'Bend Middle',
    where: {
      en: 'At the centre of the crease behind the knee, between the two tendons.',
      zh: '膝後橫紋正中，兩條筋腱之間。',
    },
    place: {
      en: 'Centre of the crease behind the knee',
      zh: '膝後橫紋正中',
    },
    for: { en: 'Low back and spine ache; weak legs.', zh: '腰背痛，下肢無力。' },
    press: {
      en: 'Knee bent, gentle fingertip pressure, about a minute each leg.',
      zh: '屈膝，以指腹輕按，每條腿約一分鐘。',
    },
    caution: {
      en: 'Skip over swollen, tender or varicose veins behind the knee.',
      zh: '膝後靜脈曲張、腫脹或觸痛時不按。',
    },
    quote: {
      han: '委中，膕中央，為合，委而取之',
      en: 'Weizhong lies at the centre of the knee hollow; it is the uniting point, found with the knee bent.',
      source: { han: '《靈樞·本輸》', en: 'Lingshu, chapter 2' },
    },
  },
  {
    code: 'BL41',
    gloss: 'The Attached Branch',
    where: {
      en: 'Below the second bump under the neck bone (C7), four finger-widths from the spine, at the inner edge of the shoulder blade.',
      zh: '第七頸椎往下第二個骨突下方，脊柱旁開四橫指，肩胛骨內緣。',
    },
    place: {
      en: 'By the shoulder blade, 2nd bump below C7',
      zh: '肩胛內緣，第七頸椎下第二骨突',
    },
    for: {
      en: 'Stiff neck; tight shoulders and upper back; a numb arm.',
      zh: '頸項強痛，肩背拘緊，手臂麻木。',
    },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '附分，在第二椎下，附項內廉，兩傍各三寸',
      en: 'Fufen lies below the second vertebra, along the inner border of the nape, three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL42',
    gloss: 'Door of the Corporeal Soul',
    where: {
      en: 'Below the third bump under the neck bone (C7), four finger-widths to each side of the spine.',
      zh: '第七頸椎往下第三個骨突下方，脊柱旁開四橫指。',
    },
    place: {
      en: 'Four fingers out, 3rd bump below C7',
      zh: '脊旁四橫指，第七頸椎下第三骨突',
    },
    for: { en: 'Cough; shortness of breath; stiff neck.', zh: '咳嗽，氣短，頸項強痛。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '魄戶，在第三椎下，兩傍各三寸',
      en: 'Pohu lies below the third vertebra, three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL43',
    gloss: 'The Deepest Interior',
    where: {
      en: 'Below the fourth bump under the neck bone (C7), four finger-widths from the spine; fold the arms to open the shoulder blades.',
      zh: '第七頸椎往下第四個骨突下方，旁開四橫指；雙臂交抱，使肩胛張開。',
    },
    place: {
      en: 'Four fingers out, 4th bump below C7',
      zh: '脊旁四橫指，第七頸椎下第四骨突',
    },
    for: { en: 'A lingering cough; deep tiredness; night sweats.', zh: '久咳，虛弱疲倦，盜汗。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '膏肓腧二穴，在第四顀下，兩傍相去各三寸',
      en: 'Gaohuangshu lies below the fourth vertebra, three cun out on either side.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'BL44',
    gloss: 'Hall of the Spirit',
    where: {
      en: 'Below the fifth bump under the neck bone (C7), four finger-widths to each side of the spine.',
      zh: '第七頸椎往下第五個骨突下方，脊柱旁開四橫指。',
    },
    place: {
      en: 'Four fingers out, 5th bump below C7',
      zh: '脊旁四橫指，第七頸椎下第五骨突',
    },
    for: { en: 'A tight chest; cough; poor sleep.', zh: '胸悶，咳嗽，失眠。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '神堂，在第五椎下，兩傍各三寸陷者中',
      en: 'Shentang lies below the fifth vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL45',
    gloss: 'A Sigh',
    where: {
      en: 'Below the sixth bump under the neck bone (C7), four finger-widths from the spine, by the shoulder blade.',
      zh: '第七頸椎往下第六個骨突下方，脊柱旁開四橫指，近肩胛骨內緣。',
    },
    place: {
      en: 'Four fingers out, 6th bump below C7',
      zh: '脊旁四橫指，第七頸椎下第六骨突',
    },
    for: { en: 'Cough; shortness of breath; shoulder and back ache.', zh: '咳嗽，氣短，肩背痛。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '噫嘻，在肩髆內廉，俠第六椎下，兩傍各三寸',
      en: 'Yixi lies by the inner border of the shoulder blade, below the sixth vertebra, three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL46',
    gloss: 'The Diaphragm’s Gate',
    where: {
      en: 'Level with the lower tips of the shoulder blades (below the seventh bump from C7), four finger-widths from the spine.',
      zh: '與兩側肩胛骨下角同高（第七頸椎往下第七個骨突下方），脊柱旁開四橫指。',
    },
    place: {
      en: 'Four fingers out, level with blade tips',
      zh: '脊旁四橫指，與肩胛骨下角同高',
    },
    for: { en: 'A tight chest; belching; a stiff back.', zh: '胸悶，噯氣，背脊僵痛。' },
    press: {
      en: 'Ask a partner to press gently with a thumb, about a minute each side.',
      zh: '請家人用拇指輕按，每側約一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '膈關，在第七椎下，兩傍各三寸陷者中',
      en: 'Geguan lies below the seventh vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL47',
    gloss: 'Gate of the Ethereal Soul',
    where: {
      en: 'Two bumps below the shoulder-blade tips (below the ninth bump from C7), four finger-widths from the spine.',
      zh: '肩胛骨下角水平再往下兩個骨突（第九胸椎下），脊柱旁開四橫指。',
    },
    place: {
      en: 'Four fingers out, 9th bump below C7',
      zh: '脊旁四橫指，第七頸椎下第九骨突',
    },
    for: {
      en: 'Aching chest and sides; back ache; poor appetite.',
      zh: '胸脅痛，背痛，食慾不振。',
    },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '魂門，在第九椎下，兩傍各三寸陷者中',
      en: 'Hunmen lies below the ninth vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL48',
    gloss: 'Yang’s Guiding Cord',
    where: {
      en: 'Three bumps below the shoulder-blade tips (below the tenth bump from C7), four finger-widths from the spine.',
      zh: '肩胛骨下角水平再往下三個骨突（第十胸椎下），脊柱旁開四橫指。',
    },
    place: {
      en: 'Four fingers out, 10th bump below C7',
      zh: '脊旁四橫指，第七頸椎下第十骨突',
    },
    for: { en: 'A rumbling, aching belly; loose stools.', zh: '腸鳴腹痛，腹瀉。' },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '陽綱，在第十椎下，兩傍各三寸陷者中',
      en: 'Yanggang lies below the tenth vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL49',
    gloss: 'House of Thought',
    where: {
      en: 'Below the eleventh bump counted down from the neck bone (C7), four finger-widths from the spine.',
      zh: '第七頸椎往下數第十一個骨突下方，脊柱旁開四橫指。',
    },
    place: {
      en: 'Four fingers out, 11th bump below C7',
      zh: '脊旁四橫指，第七頸椎下第十一骨突',
    },
    for: { en: 'Bloating; a rumbling belly; loose stools.', zh: '腹脹，腸鳴，腹瀉。' },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '意舍，在第十一椎下，兩傍各三寸陷者中',
      en: 'Yishe lies below the eleventh vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL50',
    gloss: 'The Stomach Granary',
    where: {
      en: 'Below the twelfth bump counted down from the neck bone (C7), four finger-widths from the spine.',
      zh: '第七頸椎往下數第十二個骨突下方，脊柱旁開四橫指。',
    },
    place: {
      en: 'Four fingers out, 12th bump below C7',
      zh: '脊旁四橫指，第七頸椎下第十二骨突',
    },
    for: { en: 'Stomach ache; bloating; back ache.', zh: '胃痛，腹脹，背痛。' },
    press: {
      en: 'Ask a partner to press with a thumb, or lean on a soft ball against a wall, a minute.',
      zh: '請家人以拇指按，或背靠牆壓一顆軟球，約一分鐘。',
    },
    quote: {
      han: '胃倉，在第十二椎下，兩傍各三寸陷者中',
      en: 'Weicang lies below the twelfth vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL51',
    gloss: 'Gate of the Huang',
    where: {
      en: 'On the lower back, one bump above navel level (below the first lumbar bump), four finger-widths from the spine.',
      zh: '腰部，比肚臍水平高一個骨突（第一腰椎下），脊柱旁開四橫指。',
    },
    place: {
      en: 'Low back, four fingers out, above navel',
      zh: '腰部脊旁四橫指，比肚臍高一骨突',
    },
    for: { en: 'Belly pain; constipation.', zh: '腹痛，便秘。' },
    press: {
      en: 'Hands on hips, press with the thumbs, fairly firm, about a minute.',
      zh: '雙手叉腰，以拇指稍用力按，約一分鐘。',
    },
    caution: {
      en: 'The kidneys lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是腎，只宜輕按，切勿用力。',
    },
    quote: {
      han: '肓門，在第十三椎下，兩傍各三寸',
      en: 'Huangmen lies below the thirteenth vertebra, three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL52',
    gloss: 'The Chamber of the Will',
    where: {
      en: 'On the lower back, level with the navel, four finger-widths to each side of the spine.',
      zh: '腰部，與肚臍同高，脊柱旁開四橫指。',
    },
    place: {
      en: 'Low back, four fingers out, navel level',
      zh: '腰部脊旁四橫指，與肚臍同高',
    },
    for: { en: 'A stiff, aching lower back; difficult urination.', zh: '腰脊強痛，小便不利。' },
    press: {
      en: 'Hands on hips, press with the thumbs, fairly firm, about a minute.',
      zh: '雙手叉腰，以拇指稍用力按，約一分鐘。',
    },
    caution: {
      en: 'The kidneys lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是腎，只宜輕按，切勿用力。',
    },
    quote: {
      han: '志室二穴，在第十四顀下，兩傍相去各三寸陷中',
      en: 'Zhishi lies below the fourteenth vertebra, in the hollow three cun out on either side.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'BL53',
    gloss: 'The Wrapping and the Deep',
    where: {
      en: 'On the buttock, about level with the low-back dimples, four finger-widths out from the centre ridge of the sacrum.',
      zh: '臀部，約與腰窩同高，骶骨正中嵴旁開四橫指。',
    },
    place: {
      en: 'Buttock, level with the low-back dimples',
      zh: '臀部，約與腰窩同高',
    },
    for: {
      en: 'Difficult urination; a stiff low back; bloating.',
      zh: '小便不利，腰脊強痛，腹脹。',
    },
    press: {
      en: 'Press firmly with the thumb, or sit on a firm ball, about a minute each side.',
      zh: '以拇指稍用力按，或坐在硬球上，每側約一分鐘。',
    },
    quote: {
      han: '胞肓，在第十九椎下，兩傍各三寸陷者中',
      en: 'Baohuang lies below the nineteenth vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL54',
    gloss: 'The Edge of Order',
    where: {
      en: 'On the buttock, level with the bottom of the sacrum, four finger-widths out from its centre ridge.',
      zh: '臀部，與骶骨下端（第四骶後孔）同高，骶骨正中嵴旁開四橫指。',
    },
    place: {
      en: 'Buttock, level with the sacrum’s end',
      zh: '臀部，與骶骨下端同高',
    },
    for: {
      en: 'Low back and hip pain; pain running down the leg.',
      zh: '腰骶痛，髖痛，腿部放射痛。',
    },
    press: {
      en: 'Press firmly with the thumb, or sit on a firm ball, about a minute each side.',
      zh: '以拇指稍用力按，或坐在硬球上，每側約一分鐘。',
    },
    caution: {
      en: 'The sciatic nerve runs deep here: ease off if pain shoots down the leg.',
      zh: '深處有坐骨神經，若有痛感竄向腿部即放輕。',
    },
    quote: {
      han: '秩邊，在第二十一椎下，兩傍各三寸陷者中',
      en: 'Zhibian lies below the twenty-first vertebra, in the hollows three cun to either side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL55',
    gloss: 'Union of Yang',
    where: {
      en: 'On the back of the calf, about three finger-widths below the centre of the knee crease.',
      zh: '小腿後側，膝後橫紋正中直下約三橫指。',
    },
    place: {
      en: 'Upper calf, below the knee crease',
      zh: '小腿後側，膝後橫紋下',
    },
    for: { en: 'Low back ache; knee pain; weak legs.', zh: '腰痛，膝痛，雙腿無力。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '以拇指稍用力按，每條腿約一分鐘。',
    },
    caution: {
      en: 'Skip a calf that is suddenly swollen, hot or sore, and see a doctor.',
      zh: '小腿突然腫、熱、痛時不按，並應就醫。',
    },
    quote: {
      han: '合陽，在膝約文中央下二寸',
      en: 'Heyang lies two cun below the centre of the knee crease.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL56',
    gloss: 'Supporting the Sinew',
    where: {
      en: 'In the middle of the back of the calf, on the fullest part of the calf muscle.',
      zh: '小腿後側正中，小腿肚最豐滿處。',
    },
    place: {
      en: 'Fullest part of the calf',
      zh: '小腿肚最豐滿處',
    },
    for: {
      en: 'Calf cramps; tight low back and legs; haemorrhoids.',
      zh: '小腿抽筋，腰腿拘痛，痔瘡。',
    },
    press: {
      en: 'Moderate thumb pressure, about a minute each leg.',
      zh: '以拇指適度按壓，每條腿約一分鐘。',
    },
    caution: {
      en: 'Skip a calf that is suddenly swollen, hot or sore, and see a doctor.',
      zh: '小腿突然腫、熱、痛時不按，並應就醫。',
    },
    quote: {
      han: '承筋，一名腨腸，一名直腸，在腨腸中央陷者中',
      en: 'Chengjin, also called Shuanchang or Zhichang, lies in the hollow at the centre of the calf.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL57',
    gloss: 'Supporting the Mountain',
    where: {
      en: 'Halfway down the back of the calf, in the pointed hollow that forms below the calf muscle when you rise onto your toes.',
      zh: '小腿後側正中，踮腳時小腿肚下方出現的尖形凹陷。',
    },
    place: {
      en: 'Hollow below the calf muscle',
      zh: '小腿肚下方尖形凹陷',
    },
    for: { en: 'Calf cramps; haemorrhoids; constipation.', zh: '小腿抽筋，痔瘡，便秘。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '以拇指稍用力按，每條腿約一分鐘。',
    },
    caution: {
      en: 'Skip a calf that is suddenly swollen, hot or sore, and see a doctor.',
      zh: '小腿突然腫、熱、痛時不按，並應就醫。',
    },
    quote: {
      han: '承山，一名魚腹，一名肉柱，在兌腨腸下分肉間陷者中',
      en: 'Chengshan, also called Fish Belly or Flesh Pillar, lies in the hollow between the muscles below the pointed calf.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL58',
    gloss: 'Soaring Flight',
    where: {
      en: 'On the outer back of the calf, a thumb-width below and outside BL57, at the edge of the calf muscle.',
      zh: '小腿後外側，承山穴外下方一拇指寬，小腿肚邊緣。',
    },
    place: {
      en: 'Outer edge of the calf muscle',
      zh: '小腿肚外側邊緣',
    },
    for: { en: 'Headache; low back and leg ache; weak legs.', zh: '頭痛，腰腿痛，雙腿無力。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '以拇指稍用力按，每條腿約一分鐘。',
    },
    caution: {
      en: 'Skip a calf that is suddenly swollen, hot or sore, and see a doctor.',
      zh: '小腿突然腫、熱、痛時不按，並應就醫。',
    },
    quote: {
      han: '飛揚，一名厥陽，在足外踝上七寸',
      en: 'Feiyang, also called Jueyang, lies seven cun above the outer ankle bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL59',
    gloss: 'Instep Yang',
    where: {
      en: 'Four finger-widths above the hollow behind the outer ankle bone, at the front edge of the Achilles tendon.',
      zh: '外踝後凹陷直上四橫指，跟腱前緣。',
    },
    place: {
      en: 'Above the outer ankle, by the tendon',
      zh: '外踝後上方，跟腱前緣',
    },
    for: { en: 'Headache; low back ache; a sore outer ankle.', zh: '頭痛，腰骶痛，外踝腫痛。' },
    press: {
      en: 'Thumb pressure, about a minute each leg.',
      zh: '以拇指按壓，每條腿約一分鐘。',
    },
    quote: {
      han: '在足外踝上三寸，太陽前，少陽後，筋骨間',
      en: 'It lies three cun above the outer ankle bone, in front of the taiyang, behind the shaoyang, between sinew and bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL60',
    gloss: 'The Kunlun Mountains',
    where: {
      en: 'In the hollow between the outer ankle bone and the Achilles tendon.',
      zh: '外踝尖與跟腱之間的凹陷中。',
    },
    place: {
      en: 'Between outer ankle and Achilles',
      zh: '外踝與跟腱之間',
    },
    for: { en: 'Back-of-head headache; stiff neck; ankle pain.', zh: '後頭痛，頸僵，腳踝痛。' },
    press: {
      en: 'Thumb pressure into the hollow, about a minute each foot.',
      zh: '以拇指按入凹陷，每腳約一分鐘。',
    },
    caution: {
      en: 'Not in pregnancy, or if you could be pregnant.',
      zh: '孕期或可能懷孕時不按。',
    },
    quote: {
      han: '崑崙，在外踝之後，跟骨之上',
      en: 'Kunlun lies behind the outer ankle bone, above the heel bone.',
      source: { han: '《靈樞·本輸》', en: 'Lingshu, chapter 2' },
    },
  },
  {
    code: 'BL61',
    gloss: 'The Servant’s Respect',
    where: {
      en: 'Directly below BL60, on the side of the heel bone, where the skin of the top of the foot meets the sole.',
      zh: '崑崙穴直下，跟骨外側，腳背與腳底皮膚交界處。',
    },
    place: {
      en: 'Side of the heel, below BL60',
      zh: '崑崙直下，跟骨外側',
    },
    for: { en: 'Heel pain; a sore ankle; weak legs.', zh: '足跟痛，腳踝腫痛，下肢無力。' },
    press: {
      en: 'Thumb pressure, about a minute each foot.',
      zh: '以拇指按壓，每腳約一分鐘。',
    },
  },
  {
    code: 'BL62',
    gloss: 'The Extending Vessel',
    where: {
      en: 'In the hollow directly below the tip of the outer ankle bone.',
      zh: '外踝尖正下方的凹陷中。',
    },
    place: {
      en: 'Just below the outer ankle bone',
      zh: '外踝尖正下方凹陷',
    },
    for: { en: 'Headache; dizziness; poor sleep.', zh: '頭痛，頭暈，失眠。' },
    press: {
      en: 'Thumb pressure into the hollow, about a minute each foot.',
      zh: '以拇指按入凹陷，每腳約一分鐘。',
    },
    quote: {
      han: '申脈，陽蹺所生也，在足外踝下',
      en: 'Shenmai, where the yang heel vessel arises, lies below the outer ankle bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL63',
    gloss: 'Golden Gate',
    where: {
      en: 'On the outer foot, in the small hollow forward and down from the ankle bone, behind the bump halfway along the foot’s edge.',
      zh: '足外側，外踝前下方的小凹陷，在足外緣中段骨突之後。',
    },
    place: {
      en: 'Outer foot, forward of the ankle',
      zh: '足外側，外踝前下方',
    },
    for: { en: 'Headache; low back ache; outer ankle pain.', zh: '頭痛，腰痛，外踝痛。' },
    press: {
      en: 'Thumb pressure, about a minute each foot.',
      zh: '以拇指按壓，每腳約一分鐘。',
    },
    quote: {
      han: '金門，在足太陽郤一空，在足外踝下',
      en: 'Jinmen is the cleft hole of the foot taiyang, below the outer ankle bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL64',
    gloss: 'Capital Bone',
    where: {
      en: 'On the outer edge of the foot, just past the bony bump halfway along it, where the skin of the top meets the sole.',
      zh: '足外緣中段骨突（第五蹠骨粗隆）前下方，腳背與腳底皮膚交界處。',
    },
    place: {
      en: 'Outer foot edge, by the mid-foot bump',
      zh: '足外緣中段骨突前下方',
    },
    for: { en: 'Headache; stiff neck; low back and leg ache.', zh: '頭痛，頸僵，腰腿痛。' },
    press: {
      en: 'Thumb pressure, about a minute each foot.',
      zh: '以拇指按壓，每腳約一分鐘。',
    },
    quote: {
      han: '京骨，在足外側大骨下，赤白肉際陷者中',
      en: 'Jinggu lies below the great bone on the outer foot, in the hollow where red and white skin meet.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL65',
    gloss: 'Bundled Bone',
    where: {
      en: 'On the outer edge of the foot, just behind the knuckle at the base of the little toe, where top and sole skin meet.',
      zh: '足外側，小趾根部關節後方，腳背與腳底皮膚交界處。',
    },
    place: {
      en: 'Behind the little-toe knuckle',
      zh: '小趾根關節後方',
    },
    for: { en: 'Headache; stiff neck; dizziness.', zh: '頭痛，頸僵，頭暈。' },
    press: {
      en: 'Thumb pressure, about a minute each foot.',
      zh: '以拇指按壓，每腳約一分鐘。',
    },
    quote: {
      han: '束骨者，木也。在足小指外側，本節後陷者中',
      en: 'Shugu is wood; it lies on the outer side of the little toe, in the hollow behind the root joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL66',
    gloss: 'Foot Penetrating Valley',
    where: {
      en: 'On the outer edge of the foot, just in front of the knuckle at the base of the little toe, where top and sole skin meet.',
      zh: '足外側，小趾根部關節前方，腳背與腳底皮膚交界處。',
    },
    place: {
      en: 'In front of the little-toe knuckle',
      zh: '小趾根關節前方',
    },
    for: { en: 'Headache; stiff neck; nosebleeds.', zh: '頭痛，頸僵，流鼻血。' },
    press: {
      en: 'Thumb pressure, about a minute each foot.',
      zh: '以拇指按壓，每腳約一分鐘。',
    },
    quote: {
      han: '通谷者，水也。在足小指外側，本節前陷者中',
      en: 'Tonggu is water; it lies on the outer side of the little toe, in the hollow in front of the root joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'BL67',
    gloss: 'Reaching Yin',
    where: {
      en: 'On the little toe, just beside the outer corner of the toenail.',
      zh: '足小趾外側，趾甲角旁。',
    },
    place: {
      en: 'Beside the little toenail',
      zh: '足小趾甲外側角旁',
    },
    for: { en: 'Headache; eye pain; a blocked nose.', zh: '頭痛，眼痛，鼻塞。' },
    press: {
      en: 'Press the toe corner between thumb and finger, about a minute each foot.',
      zh: '以拇指與食指捏按趾甲角旁，每腳約一分鐘。',
    },
    caution: {
      en: 'Not in pregnancy unless a qualified practitioner directs it.',
      zh: '孕期不按，除非由合格醫師指導。',
    },
    quote: {
      han: '至陰者，金也。在足小指外側，去爪甲角如韭葉',
      en: 'Zhiyin is metal; it lies on the outer side of the little toe, a leek-leaf’s breadth from the corner of the nail.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
