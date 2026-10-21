import type { LeafCardInput } from './schema';

/** Book 3 of the Zhenjiu Jiayi Jing, where every quoted GV location line sits. */
const jiayi = { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' };
/** The three-book edition's middle book, which keeps the back-midline entries. */
const tongrenMiddle = {
  han: '《銅人腧穴針灸圖經·卷中》',
  en: 'Tongren Shuxue Zhenjiu Tujing, middle book',
};

/** Leaf cards for the GV points, in channel order. */
export const duLeaves: readonly LeafCardInput[] = [
  {
    code: 'GV1',
    gloss: 'Long Strong',
    where: {
      en: 'Just below the tip of the tailbone, midway between the tailbone and the anus.',
      zh: '尾骨尖下方，尾骨尖與肛門之間的中點。',
    },
    place: { en: 'Below the tip of the tailbone', zh: '尾骨尖下方' },
    for: {
      en: 'Haemorrhoids, constipation, tailbone and low-back ache.',
      zh: '痔瘡，便秘，尾骨與腰骶痠痛。',
    },
    press: {
      en: 'Not for self-pressing: it sits right beside the anus. Leave it to a trained practitioner.',
      zh: '不宜自行按壓：此處緊鄰肛門，宜交由受過訓練的醫者處理。',
    },
    caution: {
      en: 'Intimate area beside the anus; do not press it yourself.',
      zh: '私密部位，緊鄰肛門，請勿自行按壓。',
    },
    quote: { han: '在脊骶端', en: 'At the end of the spine, at the tailbone.', source: jiayi },
  },
  {
    code: 'GV2',
    gloss: 'Waist Way-Station',
    where: {
      en: 'On the midline at the base of the back, in the hollow just above the tailbone, between two small bony knobs.',
      zh: '背部正中線最下端，尾骨上方的凹陷中，兩個小骨突之間。',
    },
    place: { en: 'In the hollow just above the tailbone', zh: '尾骨上方凹陷中' },
    for: {
      en: 'Low-back and sacral ache, haemorrhoids, irregular periods.',
      zh: '腰骶疼痛，痔瘡，月經不調。',
    },
    press: { en: 'Firm with a fingertip, about a minute.', zh: '用指尖稍用力按，約一分鐘。' },
    quote: { han: '在第二十一椎節下間', en: 'Below the twenty-first vertebra.', source: jiayi },
  },
  {
    code: 'GV3',
    gloss: 'Yang Gate of the Waist',
    where: {
      en: 'On the spine, below the fourth lumbar bump, level with the tops of the hip bones.',
      zh: '腰部後正中線，第四腰椎棘突下凹陷中，約與兩側髂骨最高點平齊。',
    },
    place: { en: 'Below the fourth lumbar bump', zh: '第四腰椎棘突下' },
    for: {
      en: 'Low-back ache, weak legs, irregular periods.',
      zh: '腰骶痠痛，雙腿無力，月經不調。',
    },
    press: {
      en: 'Firm with both thumbs or the knuckles, about a minute.',
      zh: '雙手拇指或指節稍用力按，約一分鐘。',
    },
    quote: {
      han: '陽關一穴，在第十六椎節下間，伏而取之',
      en: 'Yangguan is a single point. It lies below the sixteenth vertebra; find it lying face down.',
      source: tongrenMiddle,
    },
  },
  {
    code: 'GV4',
    gloss: 'Gate of Life',
    where: {
      en: 'On the spine, below the second lumbar bump, straight back from the navel.',
      zh: '腰部後正中線，第二腰椎棘突下，與肚臍前後相對。',
    },
    place: { en: 'Spine, straight back from the navel', zh: '第二腰椎棘突下，正對肚臍' },
    for: { en: 'Low-back ache, period pain, a cold aching belly.', zh: '腰痛，經痛，腹中冷痛。' },
    press: {
      en: 'Firm with both thumbs or the knuckles, about a minute.',
      zh: '雙手拇指或指節稍用力按，約一分鐘。',
    },
    quote: { han: '在十四椎節下間', en: 'Below the fourteenth vertebra.', source: jiayi },
  },
  {
    code: 'GV5',
    gloss: 'Suspended Pivot',
    where: {
      en: 'On the spine, below the first lumbar bump, one bump above Mingmen.',
      zh: '腰部後正中線，第一腰椎棘突下，命門上方一個棘突處。',
    },
    place: { en: 'Below the first lumbar bump', zh: '第一腰椎棘突下' },
    for: {
      en: 'Stiff lower back, loose stools, a bloated, rumbling belly.',
      zh: '腰背僵痛，腹瀉，腹脹腸鳴。',
    },
    press: { en: 'Firm with both thumbs, about a minute.', zh: '雙手拇指稍用力按，約一分鐘。' },
    quote: {
      han: '懸樞，在第十三椎節下間',
      en: 'Xuanshu lies below the thirteenth vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV6',
    gloss: 'Middle of the Spine',
    where: {
      en: 'On the spine, below the eleventh thoracic bump: four bumps below the level of the shoulder-blade tips.',
      zh: '背部後正中線，第十一胸椎棘突下；由肩胛骨下角水平往下數四個棘突。',
    },
    place: { en: 'Below the eleventh thoracic bump', zh: '第十一胸椎棘突下' },
    for: { en: 'A full, bloated belly; a stiff, aching spine.', zh: '腹部脹滿，脊背僵痛。' },
    press: {
      en: 'Ask a helper to press firmly with a thumb, about a minute.',
      zh: '請旁人以拇指稍用力按，約一分鐘。',
    },
    quote: {
      han: '脊中，在第十一椎節下間',
      en: 'Jizhong lies below the eleventh vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV7',
    gloss: 'Central Pivot',
    where: {
      en: 'On the spine, below the tenth thoracic bump: three bumps below the level of the shoulder-blade tips.',
      zh: '背部後正中線，第十胸椎棘突下；由肩胛骨下角水平往下數三個棘突。',
    },
    place: { en: 'Below the tenth thoracic bump', zh: '第十胸椎棘突下' },
    for: { en: 'Stomach ache, poor appetite, back pain.', zh: '胃痛，食慾不振，背痛。' },
    press: {
      en: 'Ask a helper to press firmly with a thumb, about a minute.',
      zh: '請旁人以拇指稍用力按，約一分鐘。',
    },
  },
  {
    code: 'GV8',
    gloss: 'Sinew Contraction',
    where: {
      en: 'On the spine, below the ninth thoracic bump: two bumps below the level of the shoulder-blade tips.',
      zh: '背部後正中線，第九胸椎棘突下；由肩胛骨下角水平往下數兩個棘突。',
    },
    place: { en: 'Below the ninth thoracic bump', zh: '第九胸椎棘突下' },
    for: { en: 'A stiff spine, stomach ache, low-back pain.', zh: '脊背僵硬，胃痛，腰痛。' },
    press: {
      en: 'Ask a helper to press firmly with a thumb, about a minute.',
      zh: '請旁人以拇指稍用力按，約一分鐘。',
    },
    quote: {
      han: '筋縮，在第九椎節下間',
      en: 'Jinsuo lies below the ninth vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV9',
    gloss: 'Reaching Yang',
    where: {
      en: 'On the spine, below the seventh thoracic bump, level with the lower tips of the shoulder blades.',
      zh: '背部後正中線，第七胸椎棘突下，約與兩側肩胛骨下角平齊。',
    },
    place: { en: 'Below the seventh thoracic bump', zh: '第七胸椎棘突下' },
    for: {
      en: 'Fullness of the chest and ribs, a stiff aching back, cough.',
      zh: '胸脅脹痛，背部僵痛，咳嗽。',
    },
    press: {
      en: 'Ask a helper to press firmly with a thumb, about a minute.',
      zh: '請旁人以拇指稍用力按，約一分鐘。',
    },
    quote: {
      han: '至陽，在第七椎節下間',
      en: 'Zhiyang lies below the seventh vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV10',
    gloss: 'Spirit Tower',
    where: {
      en: 'On the spine, below the sixth thoracic bump: one bump above the level of the shoulder-blade tips.',
      zh: '背部後正中線，第六胸椎棘突下；由肩胛骨下角水平往上數一個棘突。',
    },
    place: { en: 'Below the sixth thoracic bump', zh: '第六胸椎棘突下' },
    for: {
      en: 'Cough, shortness of breath, a stiff aching spine.',
      zh: '咳嗽，呼吸短促，脊背僵痛。',
    },
    press: {
      en: 'Ask a helper to press firmly with a thumb, about a minute.',
      zh: '請旁人以拇指稍用力按，約一分鐘。',
    },
    quote: {
      han: '靈臺一穴，在第六椎節下間，俛而取之',
      en: 'Lingtai is a single point. It lies below the sixth vertebra; find it with the head bowed.',
      source: tongrenMiddle,
    },
  },
  {
    code: 'GV11',
    gloss: 'Spirit Way',
    where: {
      en: 'On the spine, below the fifth thoracic bump: two bumps above the level of the shoulder-blade tips.',
      zh: '背部後正中線，第五胸椎棘突下；由肩胛骨下角水平往上數兩個棘突。',
    },
    place: { en: 'Below the fifth thoracic bump', zh: '第五胸椎棘突下' },
    for: { en: 'Palpitations, poor sleep, a poor memory.', zh: '心悸，失眠，健忘。' },
    press: {
      en: 'Ask a helper to press firmly with a thumb, about a minute.',
      zh: '請旁人以拇指稍用力按，約一分鐘。',
    },
    quote: {
      han: '神道，在第五椎節下間',
      en: 'Shendao lies below the fifth vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV12',
    gloss: 'Body Pillar',
    where: {
      en: 'On the spine, below the third thoracic bump, about level with the inner ends of the shoulder-blade ridges.',
      zh: '背部後正中線，第三胸椎棘突下，約與兩側肩胛岡內端平齊。',
    },
    place: { en: 'Below the third thoracic bump', zh: '第三胸椎棘突下' },
    for: { en: 'Cough, wheezing, a stiff aching back.', zh: '咳嗽，氣喘，背部僵痛。' },
    press: {
      en: 'Ask a helper to press firmly with a thumb, about a minute.',
      zh: '請旁人以拇指稍用力按，約一分鐘。',
    },
    quote: {
      han: '身柱，在第三椎節下間',
      en: 'Shenzhu lies below the third vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV13',
    gloss: "Potter's Way",
    where: {
      en: 'On the spine, below the first thoracic bump: one bump down from the big bone at the base of the neck.',
      zh: '背部後正中線，第一胸椎棘突下；由頸根最高骨突往下數一個棘突。',
    },
    place: { en: 'Below the first thoracic bump', zh: '第一胸椎棘突下' },
    for: { en: 'Fever, headache, a stiff neck.', zh: '發熱，頭痛，頸項僵硬。' },
    press: {
      en: 'Firm with the fingertips over the shoulder, about a minute.',
      zh: '手指越過肩頭，以指尖稍用力按，約一分鐘。',
    },
    quote: {
      han: '陶道，在大椎節下間',
      en: 'Taodao lies in the space below the Great Vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV14',
    gloss: 'Great Vertebra',
    where: {
      en: 'Below the big bump at the base of the neck: the bone that moves when you turn your head.',
      zh: '頸後根部最突出的骨頭下方凹陷；轉頭時，這塊骨頭會隨之活動。',
    },
    place: { en: 'Below the big bump at the neck’s base', zh: '頸後根部最突骨下方' },
    for: {
      en: 'Colds and fever, a stiff neck, shoulder and back ache.',
      zh: '感冒發熱，頸項僵硬，肩背疼痛。',
    },
    press: { en: 'Firm with the fingertips, about a minute.', zh: '用指尖稍用力按，約一分鐘。' },
    quote: {
      han: '大椎，在第一椎陷者中',
      en: 'Dazhui lies in the hollow at the first vertebra.',
      source: jiayi,
    },
  },
  {
    code: 'GV15',
    gloss: 'Gate of Muteness',
    where: {
      en: 'On the back of the neck, half a thumb-width above the hairline, in the midline hollow just below the skull.',
      zh: '頸後正中，後髮際正中直上半拇指寬，顱骨下方的凹陷中。',
    },
    place: { en: 'Nape, just above the hairline', zh: '後髮際正中直上半拇指寬' },
    for: {
      en: 'A sudden loss of voice, headache, a stiff neck.',
      zh: '突然失聲，頭痛，頸項僵硬。',
    },
    press: { en: 'Gentle fingertip pressure, about a minute.', zh: '以指尖輕按，約一分鐘。' },
    quote: {
      han: '在後發際宛宛中，入系舌本',
      en: 'In the soft hollow at the back hairline, linked to the root of the tongue.',
      source: jiayi,
    },
  },
  {
    code: 'GV16',
    gloss: 'Mansion of Wind',
    where: {
      en: 'One thumb-width above the back hairline, in the hollow under the bump of the skull, between the two neck cords.',
      zh: '後髮際正中直上一拇指寬，枕骨隆突下方、兩條頸部大筋之間的凹陷。',
    },
    place: { en: 'Nape, in the hollow below the skull', zh: '枕骨隆突下凹陷中' },
    for: { en: 'Headache, a stiff neck, a sore throat.', zh: '頭痛，頸項僵硬，咽喉腫痛。' },
    press: { en: 'Gentle fingertip pressure, about a minute.', zh: '以指尖輕按，約一分鐘。' },
    quote: {
      han: '在頂上，入發際一寸，大筋內宛宛中，疾言其肉立起，言休其肉立下',
      en: 'On the head, one cun inside the hairline, in the soft hollow within the great sinews: speak quickly and the flesh rises; stop, and it falls.',
      source: jiayi,
    },
  },
  {
    code: 'GV17',
    gloss: "Brain's Door",
    where: {
      en: 'On the back of the head, in the dip on the upper edge of the skull bump, two finger-widths above Fengfu.',
      zh: '後頭部，枕骨隆突上緣的凹陷中，風府直上兩橫指。',
    },
    place: { en: 'Above the bump at the back of the skull', zh: '枕骨隆突上緣凹陷中' },
    for: { en: 'Headache, a stiff neck, dizziness.', zh: '頭痛，頸項僵硬，頭暈。' },
    press: { en: 'Gentle, about a minute.', zh: '輕按，約一分鐘。' },
    quote: {
      han: '在枕骨上強間後一寸五分',
      en: 'On the occipital bone, one and a half cun behind Qiangjian.',
      source: jiayi,
    },
  },
  {
    code: 'GV18',
    gloss: 'Strong Interval',
    where: {
      en: 'On the midline of the back of the head, halfway between the skull bump and Baihui at the crown.',
      zh: '後頭部正中線，枕骨隆突上緣與頭頂百會之間的中點。',
    },
    place: { en: 'Back of the head, midway to the crown', zh: '枕骨隆突與百會之中點' },
    for: { en: 'Headache, dizziness, poor sleep.', zh: '頭痛，頭暈，失眠。' },
    press: { en: 'Gentle, about a minute.', zh: '輕按，約一分鐘。' },
    quote: { han: '在後頂後一寸五分', en: 'One and a half cun behind Houding.', source: jiayi },
  },
  {
    code: 'GV19',
    gloss: 'Behind the Crown',
    where: {
      en: 'On the midline of the head, two finger-widths behind Baihui at the crown.',
      zh: '頭頂正中線，百會往後兩橫指。',
    },
    place: { en: 'Two finger-widths behind the crown', zh: '百會後兩橫指' },
    for: { en: 'Headache, a stiff neck, poor sleep.', zh: '頭痛，頸項僵硬，失眠。' },
    press: { en: 'Gentle, about a minute.', zh: '輕按，約一分鐘。' },
    quote: {
      han: '在百會後一寸五分，枕骨上',
      en: 'One and a half cun behind Baihui, above the occipital bone.',
      source: jiayi,
    },
  },
  {
    code: 'GV20',
    gloss: 'Hundred Meetings',
    where: {
      en: 'On top of the head, where the midline meets a line drawn over the head from ear tip to ear tip.',
      zh: '頭頂正中，兩耳尖連線越過頭頂與正中線相交處。',
    },
    place: { en: 'Top of the head, between the ear tips', zh: '頭頂正中，兩耳尖連線上' },
    for: { en: 'Headache and dizziness, poor sleep, a poor memory.', zh: '頭痛頭暈，失眠，健忘。' },
    press: { en: 'Gentle with a fingertip, about a minute.', zh: '以指尖輕按，約一分鐘。' },
    quote: {
      han: '在前頂後一寸五分，頂中央旋毛中，陷可容指',
      en: 'One and a half cun behind Qianding, in the hair whorl at the centre of the crown: a hollow that takes a fingertip.',
      source: jiayi,
    },
  },
  {
    code: 'GV21',
    gloss: 'Front Crown',
    where: {
      en: 'On the midline of the head, two finger-widths in front of Baihui at the crown.',
      zh: '頭頂正中線，百會往前兩橫指。',
    },
    place: { en: 'Two finger-widths in front of the crown', zh: '百會前兩橫指' },
    for: { en: 'Headache, dizziness, blocked sinuses.', zh: '頭痛，頭暈，鼻竇阻塞。' },
    press: { en: 'Gentle, about a minute.', zh: '輕按，約一分鐘。' },
    caution: {
      en: 'Never press here on a baby: the soft spot can reach this far back.',
      zh: '切勿按壓嬰兒此處：未閉合的囟門可延伸至此。',
    },
    quote: {
      han: '前頂，在囟會後一寸五分，骨間陷者中',
      en: 'Qianding lies one and a half cun behind Xinhui, in the hollow between the bones.',
      source: jiayi,
    },
  },
  {
    code: 'GV22',
    gloss: 'Fontanelle Meeting',
    where: {
      en: 'On the midline of the head, two thumb-widths inside the front hairline.',
      zh: '頭部正中線，前髮際正中直上兩拇指寬。',
    },
    place: { en: 'Two thumb-widths into the front hairline', zh: '前髮際正中直上兩拇指寬' },
    for: { en: 'Headache, dizziness, a blocked nose.', zh: '頭痛，頭暈，鼻塞。' },
    press: { en: 'Gentle, about a minute; for adults only.', zh: '輕按，約一分鐘；僅限成人。' },
    caution: {
      en: "Never press on a baby's soft spot: the skull there has not yet closed.",
      zh: '切勿按壓嬰兒囟門：嬰兒此處顱骨尚未閉合。',
    },
    quote: {
      han: '囟會，在上星後一寸，骨間陷者中',
      en: 'Xinhui lies one cun behind Shangxing, in the hollow between the bones.',
      source: jiayi,
    },
  },
  {
    code: 'GV23',
    gloss: 'Upper Star',
    where: {
      en: 'On the midline of the head, one thumb-width inside the front hairline.',
      zh: '頭部正中線，前髮際正中直上一拇指寬。',
    },
    place: { en: 'One thumb-width into the front hairline', zh: '前髮際正中直上一拇指寬' },
    for: { en: 'Headache, a blocked nose, red and sore eyes.', zh: '頭痛，鼻塞，眼睛紅腫。' },
    press: { en: 'Gentle, about a minute.', zh: '輕按，約一分鐘。' },
    quote: {
      han: '上星一穴，在顱上直鼻中央，入發際一寸陷者中，可容豆',
      en: 'Shangxing lies on the skull straight up from the nose, one cun inside the hairline, in a hollow that would hold a bean.',
      source: jiayi,
    },
  },
  {
    code: 'GV24',
    gloss: 'Spirit Courtyard',
    where: {
      en: 'On the midline, half a thumb-width inside the front hairline, straight up from the nose.',
      zh: '前髮際正中直上半拇指寬，正對鼻樑上方。',
    },
    place: { en: 'Just inside the front hairline, midline', zh: '前髮際正中直上半拇指寬' },
    for: { en: 'Headache, poor sleep, a blocked nose.', zh: '頭痛，失眠，鼻塞。' },
    press: { en: 'Gentle, about a minute.', zh: '輕按，約一分鐘。' },
    quote: {
      han: '神庭，在發際直鼻',
      en: 'Shenting lies at the hairline, straight above the nose.',
      source: jiayi,
    },
  },
  {
    code: 'GV25',
    gloss: 'Plain Hollow',
    where: { en: 'At the very tip of the nose.', zh: '鼻尖正中。' },
    place: { en: 'The tip of the nose', zh: '鼻尖正中' },
    for: {
      en: 'A blocked nose, sinus trouble, a reddened nose.',
      zh: '鼻塞，鼻竇不適，鼻頭發紅。',
    },
    press: {
      en: 'Light touch with a fingertip, about a minute.',
      zh: '以指尖輕觸按揉，約一分鐘。',
    },
    quote: { han: '在鼻柱上端', en: 'At the upper end of the nose pillar.', source: jiayi },
  },
  {
    code: 'GV26',
    gloss: 'Water Ditch',
    where: {
      en: 'In the groove between the nose and the upper lip, a third of the way down from the nose.',
      zh: '鼻與上唇之間的人中溝，由上往下約三分之一處。',
    },
    place: { en: 'In the groove above the upper lip', zh: '人中溝上三分之一處' },
    for: { en: 'Fainting, a stiff aching lower back.', zh: '昏厥，腰背僵痛。' },
    press: {
      en: 'Gentle but steady with a fingertip, about a minute.',
      zh: '以指尖輕而穩地按，約一分鐘。',
    },
    caution: {
      en: 'Fainting or collapse needs emergency help; call for it first.',
      zh: '昏厥或倒地須緊急救助，請先求救。',
    },
    quote: {
      han: '水溝，在鼻柱下人中',
      en: 'Shuigou lies below the nose pillar, in the renzhong groove.',
      source: jiayi,
    },
  },
  {
    code: 'GV27',
    gloss: 'Tip of the Mouth',
    where: {
      en: "At the centre of the upper lip's edge, where the groove meets the red of the lip.",
      zh: '上唇正中，人中溝下端與紅唇交界處。',
    },
    place: { en: 'Centre of the upper lip’s edge', zh: '上唇正中，紅唇邊緣' },
    for: { en: 'Sore, swollen gums; a blocked nose.', zh: '牙齦腫痛，鼻塞。' },
    press: {
      en: 'Light touch with a fingertip, about a minute.',
      zh: '以指尖輕觸按揉，約一分鐘。',
    },
    quote: {
      han: '兌端，在唇上端',
      en: 'Duiduan lies at the upper tip of the lip.',
      source: jiayi,
    },
  },
  {
    code: 'GV28',
    gloss: 'Gum Junction',
    where: {
      en: 'Inside the mouth, where the small fold under the upper lip joins the gum.',
      zh: '口內，上唇繫帶與上牙齦相接處。',
    },
    place: { en: 'Inside the upper lip, at the gum', zh: '上唇內，唇繫帶與牙齦交接處' },
    for: { en: 'Sore, swollen gums; bad breath.', zh: '牙齦腫痛，口臭。' },
    press: {
      en: 'Light touch with a clean fingertip, about a minute.',
      zh: '以洗淨的指尖輕按，約一分鐘。',
    },
    quote: {
      han: '齦交，在唇內齒上齦縫中',
      en: 'Yinjiao lies inside the lip, in the seam of the gum above the teeth.',
      source: jiayi,
    },
  },
];
