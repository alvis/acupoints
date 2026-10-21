import type { LeafCardInput } from './schema';

/** Leaf cards for the ST points, in channel order. */
export const stomachLeaves: readonly LeafCardInput[] = [
  {
    code: 'ST1',
    gloss: 'Container of Tears',
    where: {
      en: 'Straight below the pupil, on the soft spot between the eyeball and the bony rim of the eye socket.',
      zh: '瞳孔正下方，眼球與眼眶下緣骨之間。',
    },
    place: { en: 'Below the pupil, above the socket rim', zh: '瞳孔下，眼球與眶緣之間' },
    for: {
      en: 'Twitching eyelids, watery eyes, blurred sight.',
      zh: '眼皮跳，迎風流淚，視物模糊。',
    },
    press: {
      en: 'Do not press: the point lies right against the eyeball.',
      zh: '不要按壓：此穴緊貼眼球。',
    },
    caution: {
      en: 'Pressure here bears on the eye itself; leave this one to a practitioner.',
      zh: '在此按壓會壓到眼球，請交由專業人員處理。',
    },
    quote: {
      han: '在目下七分，直目瞳子',
      en: 'It lies seven fen below the eye, straight below the pupil.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST2',
    gloss: 'Four Whites',
    where: {
      en: 'Looking straight ahead, below the pupil, in the small dip on the cheekbone just under the rim of the eye socket.',
      zh: '雙眼平視，瞳孔正下方，眼眶下緣下方顴骨上的小凹陷。',
    },
    place: { en: 'Below the pupil, on the cheekbone dip', zh: '瞳孔下，眶下緣下小凹' },
    for: { en: 'Red, itchy eyes, twitching eyelids, face pain.', zh: '眼紅眼癢，眼皮跳，面痛。' },
    press: {
      en: 'Gentle fingertip pressure on the bone, about a minute.',
      zh: '以指尖在骨面上輕按約一分鐘。',
    },
    caution: {
      en: 'Close to the eye: press on bone only, never on the eye.',
      zh: '靠近眼睛：只按骨面，不可壓到眼球。',
    },
    quote: {
      han: '四白，在目下一寸',
      en: 'Sibai lies one cun below the eye.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST3',
    gloss: 'Great Bone-Hollow',
    where: {
      en: 'Straight below the pupil, level with the bottom of the nostril, just outside the smile line.',
      zh: '瞳孔正下方，與鼻翼下緣同高，鼻唇溝外側。',
    },
    place: { en: 'Below the pupil, level with the nostril', zh: '瞳孔直下，與鼻翼下緣平' },
    for: { en: 'Toothache, nosebleed, a puffy cheek.', zh: '牙痛，流鼻血，臉頰腫。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '以指尖輕按，每側約一分鐘。',
    },
    quote: {
      han: '在俠鼻孔旁八分，直瞳子',
      en: 'It lies eight fen beside the nostril, straight below the pupil.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST4',
    gloss: 'Earth Granary',
    where: {
      en: 'Just out from the corner of the mouth, in line below the pupil.',
      zh: '口角外側，瞳孔直下。',
    },
    place: { en: 'Just out from the corner of the mouth', zh: '口角外側' },
    for: { en: 'Drooling, a drooping mouth corner, toothache.', zh: '流口水，口角歪斜，牙痛。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '以指尖輕按，每側約一分鐘。',
    },
    quote: {
      han: '地倉，一名會維，俠口傍四分',
      en: 'Dicang, also called Huiwei, lies four fen beside the mouth.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST5',
    gloss: 'Great Welcome',
    where: {
      en: 'Puff out the cheek: in the groove in front of the jaw angle, where a pulse beats on the jawbone.',
      zh: '鼓起臉頰時，下頜角前方出現的凹溝，可摸到脈搏處。',
    },
    place: { en: 'In front of the jaw angle, at a pulse', zh: '下頜角前方，脈動處' },
    for: { en: 'Toothache, a puffy cheek, a stiff jaw.', zh: '牙痛，臉頰腫，牙關緊。' },
    press: {
      en: 'Gentle pressure just beside the pulse, about a minute each side.',
      zh: '在脈搏旁輕按，每側約一分鐘。',
    },
    caution: {
      en: 'A facial pulse beats here; keep the touch light.',
      zh: '此處有面部動脈搏動，只宜輕按。',
    },
    quote: {
      han: '大迎，一名髓孔，在曲頷前一寸三分骨陷者中',
      en: "Daying, also called Suikong, lies one cun three fen in front of the jaw's curve, in the hollow of the bone.",
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST6',
    gloss: 'Cheek Wheel',
    where: {
      en: 'Clench the teeth: on the muscle that bulges one finger-width above and in front of the jaw angle.',
      zh: '咬緊牙齒時，下頜角前上方一橫指隆起的肌肉處。',
    },
    place: { en: 'On the jaw muscle above the jaw angle', zh: '下頜角前上方咬肌隆起處' },
    for: { en: 'Toothache, a stiff jaw, a puffy cheek.', zh: '牙痛，下巴開合不利，臉頰腫。' },
    press: {
      en: 'Gentle circles on the muscle, jaw relaxed, about a minute each side.',
      zh: '放鬆下巴，在肌肉上輕輕打圈，每側約一分鐘。',
    },
    quote: {
      han: '頰車，在耳下曲頰端陷者中，開口有孔',
      en: "Jiache lies below the ear, in the hollow at the end of the jaw's curve; a hole opens when the mouth opens.",
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST7',
    gloss: 'Lower Pass',
    where: {
      en: 'In front of the ear, in the hollow under the cheekbone arch; it closes when you open the mouth.',
      zh: '耳前，顴弓下方的凹陷，張口時凹陷閉合。',
    },
    place: { en: 'In front of the ear, under the cheekbone', zh: '耳前，顴弓下凹陷' },
    for: { en: 'Jaw pain, toothache, ringing ears.', zh: '下顎關節痛，牙痛，耳鳴。' },
    press: {
      en: 'Gentle pressure with the mouth closed, about a minute each side.',
      zh: '閉口輕按，每側約一分鐘。',
    },
    quote: {
      han: '下關，在客主人下，耳前動脈下空下廉，合口有孔，張口即閉',
      en: 'Xiaguan lies below Kezhuren, in front of the ear, at the lower edge of the gap below the pulse; a hole opens when the mouth shuts and closes when it opens.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST8',
    gloss: "Head's Corner-Rope",
    where: {
      en: 'At the corner of the forehead hairline, then half a finger-width up into the hair.',
      zh: '額角髮際轉角處，再往髮內約半橫指。',
    },
    place: { en: 'At the corner of the forehead hairline', zh: '額角髮際內半橫指' },
    for: { en: 'Headache, dizziness, sore eyes.', zh: '頭痛，頭暈，眼睛痛。' },
    press: {
      en: 'Small fingertip circles, both sides together, about a minute.',
      zh: '以指尖小圈按揉，兩側同時，約一分鐘。',
    },
    quote: {
      han: '頭維，在額角髮際俠本神兩傍各一寸五分',
      en: 'Touwei lies at the corner of the forehead hairline, one and a half cun out from Benshen on each side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST9',
    gloss: "Man's Welcome",
    where: {
      en: "On the neck, level with the Adam's apple, at the front edge of the long neck muscle, where the neck pulse beats.",
      zh: '頸部，與喉結同高，胸鎖乳突肌前緣，頸動脈搏動處。',
    },
    place: { en: 'Side of the neck, at the neck pulse', zh: '頸部，喉結旁頸動脈搏動處' },
    for: { en: 'Sore throat, a swollen neck, a tight chest.', zh: '喉嚨痛，頸部腫大，胸悶。' },
    press: {
      en: 'Do not press: the point lies right on the carotid artery.',
      zh: '不要按壓：此穴正在頸動脈上。',
    },
    caution: {
      en: 'Over the carotid artery; keep pressure off the neck pulse.',
      zh: '位於頸動脈上，切勿按壓頸部脈搏。',
    },
    quote: {
      han: '人迎，一名天五會，在頸大脈動應手，俠結喉',
      en: 'Renying, also called Tianwuhui, lies at the great pulse of the neck, felt under the hand, beside the larynx.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST10',
    gloss: 'Water Rushing',
    where: {
      en: 'On the neck, at the front edge of the long neck muscle, halfway between ST9 and the inner end of the collarbone.',
      zh: '頸部，胸鎖乳突肌前緣，人迎穴與鎖骨內端之間的中點。',
    },
    place: { en: 'Lower neck, at the front muscle edge', zh: '頸部，胸鎖乳突肌前緣' },
    for: { en: 'Sore throat, cough, shortness of breath.', zh: '喉嚨痛，咳嗽，呼吸短促。' },
    press: {
      en: 'Light touch, one side at a time, about a minute.',
      zh: '輕觸，一次一側，約一分鐘。',
    },
    caution: {
      en: 'Keep off the pulse and the windpipe; never both sides at once.',
      zh: '避開脈搏與氣管，不可兩側同按。',
    },
    quote: {
      han: '水突，一名水門，在頸大筋前，直人迎下，氣舍上',
      en: 'Shuitu, also called Shuimen, lies in front of the great sinew of the neck, below Renying and above Qishe.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST11',
    gloss: 'Abode of Qi',
    where: {
      en: 'Just above the inner end of the collarbone, in the small dip between the two heads of the long neck muscle.',
      zh: '鎖骨內端上緣，胸鎖乳突肌兩頭之間的小凹陷。',
    },
    place: { en: 'Above the inner end of the collarbone', zh: '鎖骨內端上緣小凹' },
    for: { en: 'Sore throat, hiccups, a stiff neck.', zh: '喉嚨痛，打嗝，頸項僵痛。' },
    press: {
      en: 'Light touch, one side at a time, about a minute.',
      zh: '輕觸，一次一側，約一分鐘。',
    },
    caution: {
      en: 'Keep off any pulse; never press both sides at once.',
      zh: '避開脈搏，不可兩側同按。',
    },
    quote: {
      han: '氣舍，在頸，直人迎下，俠天突陷者中',
      en: 'Qishe lies on the neck, below Renying, in the hollow beside Tiantu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST12',
    gloss: 'Broken Basin',
    where: {
      en: 'In the middle of the hollow above the collarbone, roughly in line with the nipple.',
      zh: '鎖骨上窩正中，約與乳頭成一直線。',
    },
    place: { en: 'In the hollow above the collarbone', zh: '鎖骨上窩正中' },
    for: { en: 'Cough, shortness of breath, sore throat.', zh: '咳嗽，呼吸短促，喉嚨痛。' },
    press: {
      en: 'Light touch only, about a minute each side; do not push down.',
      zh: '只宜輕觸，每側約一分鐘，不要往下壓。',
    },
    caution: {
      en: 'The top of the lung and large vessels lie beneath; keep it light.',
      zh: '下方有肺尖與大血管，務必輕按。',
    },
    quote: {
      han: '缺盆，一名天蓋，在肩上橫骨陷者中',
      en: 'Quepen, also called Tiangai, lies in the hollow above the cross bone of the shoulder.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST13',
    gloss: 'Door of Qi',
    where: { en: 'Just below the midpoint of the collarbone.', zh: '鎖骨中點下緣。' },
    place: { en: 'Just below the middle of the collarbone', zh: '鎖骨中點下緣' },
    for: { en: 'Cough, wheezing, hiccups.', zh: '咳嗽，氣喘，打嗝。' },
    press: { en: 'Gentle pressure, about a minute each side.', zh: '輕按，每側約一分鐘。' },
    quote: {
      han: '氣戶，在巨骨下，輸府兩傍各二寸陷者中',
      en: 'Qihu lies below the great bone, in the hollow two cun out from Shufu on each side.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST14',
    gloss: 'Storeroom',
    where: {
      en: 'On the chest, in line with the nipple, in the first gap between the ribs below the collarbone.',
      zh: '胸前，乳頭直上，鎖骨下第一肋間隙。',
    },
    place: { en: 'First rib gap, in line with the nipple', zh: '乳頭直上，第一肋間' },
    for: {
      en: 'Cough, shortness of breath, a full, sore chest.',
      zh: '咳嗽，呼吸短促，胸脅脹痛。',
    },
    press: { en: 'Gentle pressure, about a minute each side.', zh: '輕按，每側約一分鐘。' },
    quote: {
      han: '庫房，在氣戶下一寸六分陷者中',
      en: 'Kufang lies one cun six fen below Qihu, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST15',
    gloss: 'Chamber Canopy',
    where: {
      en: 'On the chest, in line with the nipple, in the second gap between the ribs.',
      zh: '胸前，乳頭直上，第二肋間隙。',
    },
    place: { en: 'Second rib gap, in line with the nipple', zh: '乳頭直上，第二肋間' },
    for: { en: 'Cough, a full, aching chest.', zh: '咳嗽，胸脅脹痛。' },
    press: { en: 'Gentle pressure, about a minute each side.', zh: '輕按，每側約一分鐘。' },
    quote: {
      han: '屋翳，在庫房下一寸六分',
      en: 'Wuyi lies one cun six fen below Kufang.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST16',
    gloss: 'Window of the Chest',
    where: {
      en: 'On the chest, in line with the nipple, in the third gap between the ribs.',
      zh: '胸前，乳頭直上，第三肋間隙。',
    },
    place: { en: 'Third rib gap, in line with the nipple', zh: '乳頭直上，第三肋間' },
    for: {
      en: 'Cough, shortness of breath, aching chest and ribs.',
      zh: '咳嗽，呼吸短促，胸脅痛。',
    },
    press: { en: 'Gentle pressure, about a minute each side.', zh: '輕按，每側約一分鐘。' },
    quote: {
      han: '膺窗，在屋翳下一寸六分',
      en: 'Yingchuang lies one cun six fen below Wuyi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST17',
    gloss: 'Middle of the Breast',
    where: {
      en: 'At the centre of the nipple, in the fourth gap between the ribs.',
      zh: '乳頭正中，第四肋間隙。',
    },
    place: { en: 'At the centre of the nipple', zh: '乳頭正中' },
    for: {
      en: 'A landmark for finding the chest points around it.',
      zh: '作為定位周圍胸部穴位的標誌。',
    },
    press: {
      en: 'Do not press: it is the nipple itself, used only as a landmark.',
      zh: '不要按壓：此穴即乳頭，只作定位標誌。',
    },
    caution: {
      en: 'Classical texts warn against working on this point.',
      zh: '古籍告誡不可在此施術。',
    },
    quote: {
      han: '乳中二穴，當乳是，足陽明脈氣所發。禁不可灸',
      en: 'Ruzhong, on both sides, is the nipple itself, where the qi of the foot yangming emerges. Moxibustion is forbidden here.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'ST18',
    gloss: 'Milk Root',
    where: {
      en: 'Directly below the nipple, at the root of the breast, in the fifth gap between the ribs.',
      zh: '乳頭正下方，乳房根部，第五肋間隙。',
    },
    place: { en: 'Below the nipple, at the breast root', zh: '乳頭直下，乳房根部' },
    for: { en: 'Low milk supply, cough, chest pain.', zh: '乳汁不足，咳嗽，胸痛。' },
    press: { en: 'Gentle pressure, about a minute each side.', zh: '輕按，每側約一分鐘。' },
    caution: {
      en: 'Not over a breast lump, redness or warmth; have a doctor check it.',
      zh: '乳房有腫塊或紅熱時不按，請就醫檢查。',
    },
    quote: {
      han: '乳根，在乳下一寸六分陷者中',
      en: 'Rugen lies one cun six fen below the breast, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST19',
    gloss: 'Not Containing',
    where: {
      en: 'On the upper belly, eight finger-widths above the navel and three finger-widths out from the midline.',
      zh: '上腹部，臍上八橫指，前正中線旁開三橫指。',
    },
    place: { en: 'Upper belly, eight fingers above navel', zh: '上腹部，臍上八橫指旁開' },
    for: { en: 'Stomach ache, vomiting, poor appetite.', zh: '胃痛，嘔吐，食慾不振。' },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side, not after a big meal.',
      zh: '手指平放輕按，每側約一分鐘，飽餐後不按。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '不容，在幽門傍各一寸五分，去任脈二寸，直兩肋端相去四寸',
      en: 'Burong lies one and a half cun beside Youmen, two cun from the Ren vessel, in line with the rib ends, the pair four cun apart.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST20',
    gloss: 'Holding Fullness',
    where: {
      en: 'On the upper belly, three finger-widths out from the midline, one thumb-width below ST19.',
      zh: '上腹部，前正中線旁開三橫指，不容穴下一拇指寬。',
    },
    place: { en: 'Upper belly, a thumb-width below ST19', zh: '上腹部，不容穴下一拇指' },
    for: { en: 'Stomach ache, bloating, poor appetite.', zh: '胃痛，腹脹，食慾不振。' },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side, not after a big meal.',
      zh: '手指平放輕按，每側約一分鐘，飽餐後不按。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '承滿，在不容下一寸',
      en: 'Chengman lies one cun below Burong.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST21',
    gloss: 'Beam Gate',
    where: {
      en: 'On the upper belly, three finger-widths out from the midline, halfway between the navel and the base of the breastbone.',
      zh: '上腹部，前正中線旁開三橫指，肚臍與胸骨下端之間的中點高度。',
    },
    place: { en: 'Upper belly, halfway up from the navel', zh: '上腹部，臍與胸骨下端之中' },
    for: { en: 'Stomach ache, vomiting, loose stools.', zh: '胃痛，嘔吐，腹瀉。' },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side, not after a big meal.',
      zh: '手指平放輕按，每側約一分鐘，飽餐後不按。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '梁門，在承滿下一寸',
      en: 'Liangmen lies one cun below Chengman.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST22',
    gloss: 'Pass Gate',
    where: {
      en: 'On the belly, four finger-widths above the navel and three finger-widths out from the midline.',
      zh: '腹部，臍上四橫指，前正中線旁開三橫指。',
    },
    place: { en: 'Belly, four fingers above the navel', zh: '腹部，臍上四橫指旁開' },
    for: { en: 'Bloating, belly ache, loose stools.', zh: '腹脹，腹痛，腹瀉。' },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side, not after a big meal.',
      zh: '手指平放輕按，每側約一分鐘，飽餐後不按。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '關門，在梁門下，太乙上',
      en: 'Guanmen lies below Liangmen and above Taiyi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST23',
    gloss: 'Great One',
    where: {
      en: 'On the belly, three finger-widths above the navel and three finger-widths out from the midline.',
      zh: '腹部，臍上三橫指，前正中線旁開三橫指。',
    },
    place: { en: 'Belly, three fingers above the navel', zh: '腹部，臍上三橫指旁開' },
    for: { en: 'An unsettled stomach, restlessness.', zh: '胃部不適，心煩。' },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side, not after a big meal.',
      zh: '手指平放輕按，每側約一分鐘，飽餐後不按。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '太乙，在關門下一寸',
      en: 'Taiyi lies one cun below Guanmen.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST24',
    gloss: 'Slippery Flesh Gate',
    where: {
      en: 'On the belly, one thumb-width above the navel and three finger-widths out from the midline.',
      zh: '腹部，臍上一拇指寬，前正中線旁開三橫指。',
    },
    place: { en: 'Belly, a thumb-width above the navel', zh: '腹部，臍上一拇指旁開' },
    for: { en: 'Stomach ache, vomiting.', zh: '胃痛，嘔吐。' },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side, not after a big meal.',
      zh: '手指平放輕按，每側約一分鐘，飽餐後不按。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '滑肉門，在太乙下一寸',
      en: 'Huaroumen lies one cun below Taiyi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST25',
    gloss: 'Celestial Pivot',
    where: {
      en: 'Three finger-widths out to either side of the navel.',
      zh: '肚臍左右各旁開三橫指。',
    },
    place: { en: 'Three fingers out from the navel', zh: '肚臍旁開三橫指' },
    for: { en: 'Bloating, constipation, loose stools.', zh: '腹脹，便秘，腹瀉。' },
    press: {
      en: 'Gentle flat-finger pressure, both sides together, about a minute.',
      zh: '手指平放輕按，兩側同時，約一分鐘。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '天樞，大腸募也，一名長溪，一名谷門，去肓俞一寸五分，俠臍兩傍各二寸陷者中',
      en: 'Tianshu, the alarm point of the large intestine, also called Changxi and Gumen, lies one and a half cun from Huangshu, in the hollow two cun to each side of the navel.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST26',
    gloss: 'Outer Mound',
    where: {
      en: 'On the lower belly, one thumb-width below the navel and three finger-widths out from the midline.',
      zh: '下腹部，臍下一拇指寬，前正中線旁開三橫指。',
    },
    place: { en: 'Lower belly, a thumb below the navel', zh: '下腹部，臍下一拇指旁開' },
    for: { en: 'Belly ache, period pain.', zh: '腹痛，經痛。' },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side.',
      zh: '手指平放輕按，每側約一分鐘。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '外陵，在天樞下，大巨上',
      en: 'Wailing lies below Tianshu and above Daju.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST27',
    gloss: 'Great Giant',
    where: {
      en: 'On the lower belly, three finger-widths below the navel and three finger-widths out from the midline.',
      zh: '下腹部，臍下三橫指，前正中線旁開三橫指。',
    },
    place: { en: 'Lower belly, three fingers below navel', zh: '下腹部，臍下三橫指旁開' },
    for: {
      en: 'A full, aching lower belly, difficult urination, poor sleep.',
      zh: '小腹脹痛，小便不利，失眠。',
    },
    press: {
      en: 'Gentle flat-finger pressure, about a minute each side.',
      zh: '手指平放輕按，每側約一分鐘。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '大巨，一名腋門，在長溪下二寸',
      en: 'Daju, also called Yemen, lies two cun below Changxi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST28',
    gloss: 'Waterway',
    where: {
      en: 'On the lower belly, four finger-widths below the navel and three finger-widths out from the midline.',
      zh: '下腹部，臍下四橫指，前正中線旁開三橫指。',
    },
    place: { en: 'Lower belly, four fingers below navel', zh: '下腹部，臍下四橫指旁開' },
    for: {
      en: 'A full lower belly, difficult urination, period pain.',
      zh: '小腹脹痛，小便不利，經痛。',
    },
    press: {
      en: 'Gentle pressure after emptying the bladder, about a minute each side.',
      zh: '排尿後輕按，每側約一分鐘。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '水道，在大巨下一寸',
      en: 'Shuidao lies one cun below Daju.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST29',
    gloss: 'Return and Arrival',
    where: {
      en: 'On the lower belly, one thumb-width above the top of the pubic bone and three finger-widths out from the midline.',
      zh: '下腹部，恥骨上緣上一拇指寬，前正中線旁開三橫指。',
    },
    place: { en: 'Low belly, a thumb above the pubic bone', zh: '下腹部，恥骨上一拇指旁開' },
    for: { en: 'Lower-belly pain, irregular periods.', zh: '小腹痛，月經不調。' },
    press: {
      en: 'Gentle pressure after emptying the bladder, about a minute each side.',
      zh: '排尿後輕按，每側約一分鐘。',
    },
    caution: { en: 'Not on the belly in pregnancy.', zh: '孕期不按腹部。' },
    quote: {
      han: '歸來，一名溪穴，在水道下一寸',
      en: 'Guilai, also called Xixue, lies one cun below Shuidao.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST30',
    gloss: 'Qi Surge',
    where: {
      en: 'Just above the groin, level with the top of the pubic bone, three finger-widths out from the midline.',
      zh: '腹股溝上方，與恥骨上緣同高，前正中線旁開三橫指。',
    },
    place: { en: 'Just above the groin, by the pubic bone', zh: '腹股溝上方，恥骨上緣旁' },
    for: { en: 'A rumbling, aching belly, irregular periods.', zh: '腹痛腸鳴，月經不調。' },
    press: {
      en: 'Light touch; if a pulse beats under the finger, move outward off it.',
      zh: '輕觸；指下若有脈搏跳動，就往外移開。',
    },
    caution: {
      en: 'Large vessels run close by; not in pregnancy.',
      zh: '附近有大血管；孕期不按。',
    },
    quote: {
      han: '氣沖，在歸來下，鼠鼷上一寸，動脈應手',
      en: 'Qichong lies below Guilai, one cun above the groin, where a pulse meets the hand.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST31',
    gloss: 'Gate of the Thigh',
    where: {
      en: 'Straight down from the bony point at the front of the hip, level with the crotch, in a dip on the front of the thigh.',
      zh: '從髖前骨突直下，約與會陰同高，大腿前側的凹陷處。',
    },
    place: { en: 'Front thigh, level with the crotch', zh: '大腿前側，與會陰同高' },
    for: { en: 'Weak legs, low-back ache, cold knees.', zh: '下肢無力，腰痛，膝冷。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '髀關，在膝上伏兔後交分中',
      en: 'Biguan lies above the knee, behind Futu, in the cleft where the muscles meet.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST32',
    gloss: 'Crouching Rabbit',
    where: {
      en: 'On the bulge of the front thigh muscle, eight finger-widths above the outer top corner of the kneecap.',
      zh: '大腿前側肌肉隆起處，髕骨外上緣上八橫指。',
    },
    place: { en: 'Front thigh, eight fingers above knee', zh: '大腿前側，髕骨外上緣上八橫指' },
    for: { en: 'Weak legs, low-back ache, cold, numb knees.', zh: '腿軟無力，腰痛，膝部冷麻。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '伏兔，在膝上六寸起肉間',
      en: 'Futu lies six cun above the knee, among the raised flesh.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST33',
    gloss: 'Yin Market',
    where: {
      en: 'On the front of the thigh, four finger-widths above the outer top corner of the kneecap.',
      zh: '大腿前側，髕骨外上緣上四橫指。',
    },
    place: { en: 'Front thigh, four fingers above knee', zh: '大腿前側，髕骨外上緣上四橫指' },
    for: {
      en: 'Weak legs, knees that will not bend or straighten easily.',
      zh: '腿軟無力，膝蓋屈伸不利。',
    },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '陰市，一名陰鼎，在膝上三寸，伏兔下，若拜而取之',
      en: 'Yinshi, also called Yinding, lies three cun above the knee, below Futu; find it as if kneeling to bow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST34',
    gloss: 'Ridge and Hill',
    where: {
      en: 'Knee bent: three finger-widths above the outer top corner of the kneecap.',
      zh: '屈膝，髕骨外上緣上三橫指。',
    },
    place: { en: 'Three fingers above the outer kneecap', zh: '髕骨外上緣上三橫指' },
    for: { en: 'Sudden stomach ache, loose stools, sore knees.', zh: '急性胃痛，腹瀉，膝蓋腫痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '在膝上二寸',
      en: 'It lies two cun above the knee.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST35',
    gloss: "Calf's Nose",
    where: {
      en: 'Knee bent: in the outer hollow just below the kneecap, beside the thick tendon.',
      zh: '屈膝，髕骨下方、髕韌帶外側的凹陷（外膝眼）。',
    },
    place: { en: 'Outer hollow below the kneecap', zh: '外膝眼，髕骨下外側凹陷' },
    for: {
      en: 'Knee pain, a stiff knee, numbness at the knee.',
      zh: '膝痛，膝蓋屈伸不利，膝部麻木。',
    },
    press: {
      en: 'Fingertip pressure into the hollow, knee bent, about a minute each knee.',
      zh: '屈膝，以指尖按入凹陷，每膝約一分鐘。',
    },
    caution: {
      en: 'Not on a knee with broken or weeping skin.',
      zh: '膝部皮膚破損或流膿時不按。',
    },
    quote: {
      han: '犢鼻二穴，在膝臏下',
      en: 'Dubi, on both knees, lies below the kneecap.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'ST36',
    gloss: 'Leg Three Miles',
    where: {
      en: 'Four finger-widths below the kneecap, one finger out from the shin.',
      zh: '膝蓋下四橫指，脛骨外側一橫指處。',
    },
    place: { en: 'Four fingers below the kneecap', zh: '膝下四橫指，脛骨外一橫指' },
    for: { en: 'Digestion, tiredness, heavy legs.', zh: '腸胃不適，疲倦，雙腿沉重。' },
    press: { en: 'Firm, one minute each leg.', zh: '稍用力按，每條腿一分鐘。' },
    quote: {
      han: '下陵，膝下三寸，胻骨外三里也',
      en: 'Xialing lies three cun below the knee: the Sanli outside the shin bone.',
      source: { han: '《靈樞·本輸》', en: 'Lingshu, chapter 2' },
    },
  },
  {
    code: 'ST37',
    gloss: 'Upper Great Hollow',
    where: {
      en: 'Eight finger-widths below the kneecap, one finger out from the shin.',
      zh: '膝蓋下八橫指，脛骨外側一橫指處。',
    },
    place: { en: 'Eight fingers below the kneecap', zh: '膝下八橫指，脛骨外一橫指' },
    for: { en: 'Belly ache, loose stools, constipation.', zh: '腹痛，腹瀉，便秘。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '上廉二穴，一名上巨虛，在三里下三寸，當舉足取之',
      en: 'Shanglian, also called Shangjuxu, on both legs, lies three cun below Sanli; find it with the foot raised.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'ST38',
    gloss: 'Slender Opening',
    where: {
      en: 'Halfway between the outer knee hollow and the outer ankle bone, one finger out from the shin.',
      zh: '外膝眼與外踝尖連線的中點，脛骨外側一橫指。',
    },
    place: { en: 'Midway down the shin, outer side', zh: '外膝眼與外踝尖連線中點' },
    for: { en: 'Calf cramps, shoulder ache, numb feet.', zh: '小腿抽筋，肩臂痛，腳麻。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '條口，在下廉上一寸',
      en: 'Tiaokou lies one cun above Xialian, the Lower Great Hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST39',
    gloss: 'Lower Great Hollow',
    where: {
      en: 'One thumb-width below ST38, one finger out from the shin.',
      zh: '條口穴下一拇指寬，脛骨外側一橫指。',
    },
    place: { en: 'A thumb below mid-shin, outer side', zh: '條口下一拇指，脛骨外側' },
    for: { en: 'Loose stools, lower-belly ache.', zh: '腹瀉，小腹痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '巨虛下廉，足陽明與小腸合，在上廉下三寸',
      en: 'Juxu Xialian, where the foot yangming joins the small intestine, lies three cun below Shanglian.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST40',
    gloss: 'Abundant Prominence',
    where: {
      en: 'Halfway between the outer knee hollow and the outer ankle bone, two finger-widths out from the shin.',
      zh: '外膝眼與外踝尖連線的中點，脛骨外側兩橫指。',
    },
    place: { en: 'Mid-shin, two fingers off the bone', zh: '小腿中點，脛骨外兩橫指' },
    for: { en: 'Headache, dizziness, a phlegmy cough.', zh: '頭痛，頭暈，咳嗽痰多。' },
    press: {
      en: 'Firm thumb pressure, about a minute each leg.',
      zh: '拇指稍用力按，每條腿約一分鐘。',
    },
    quote: {
      han: '豐隆，足陽明絡也，在外踝上八寸',
      en: 'Fenglong, the connecting point of the foot yangming, lies eight cun above the outer ankle.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST41',
    gloss: 'Divided Stream',
    where: {
      en: 'At the front of the ankle, in the middle of the crease, in the hollow between the two big tendons.',
      zh: '足背與小腿交界的橫紋中點，兩條肌腱之間的凹陷。',
    },
    place: { en: 'Front of the ankle, between the tendons', zh: '踝前橫紋中點兩筋間' },
    for: { en: 'Ankle pain, weak feet, headache.', zh: '腳踝痛，足部無力，頭痛。' },
    press: {
      en: 'Fingertip pressure into the hollow, about a minute each ankle.',
      zh: '以指尖按入凹陷，每側腳踝約一分鐘。',
    },
    quote: {
      han: '解溪者，火也。在沖陽後一寸五分腕上陷者中',
      en: 'Jiexi is the fire point. It lies one and a half cun behind Chongyang, in the hollow above the ankle crease.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST42',
    gloss: 'Surging Yang',
    where: {
      en: 'At the highest point of the top of the foot, where you feel a pulse between the tendons.',
      zh: '足背最高處，兩條肌腱之間摸得到脈搏處。',
    },
    place: { en: 'Top of the foot, at the foot pulse', zh: '足背最高處，脈動處' },
    for: { en: 'A weak or sprained foot, stomach ache.', zh: '足部無力或扭傷，胃痛。' },
    press: {
      en: 'Light pressure just beside the pulse, about a minute each foot.',
      zh: '在脈搏旁輕按，每腳約一分鐘。',
    },
    caution: {
      en: 'It sits on the foot pulse; keep the touch light.',
      zh: '此穴在足背脈搏上，只宜輕按。',
    },
    quote: {
      han: '沖陽，一名會原，在足趺上五寸骨間動脈',
      en: 'Chongyang, also called Huiyuan, lies five cun up on the instep, between the bones, at the pulse.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST43',
    gloss: 'Sunken Valley',
    where: {
      en: 'On top of the foot, in the dip just in front of where the second and third long foot bones meet.',
      zh: '足背，第二、三蹠骨結合處前方的凹陷。',
    },
    place: { en: 'Top of foot, between 2nd and 3rd bones', zh: '足背，第二三蹠骨結合前凹陷' },
    for: {
      en: 'A puffy face, red, sore eyes, an aching top of the foot.',
      zh: '面部浮腫，眼睛紅腫，足背腫痛。',
    },
    press: {
      en: 'Fingertip pressure into the dip, about a minute each foot.',
      zh: '以指尖按入凹陷，每腳約一分鐘。',
    },
    quote: {
      han: '陷谷者木也。在足大指次指間本節後陷者中',
      en: 'Xiangu is the wood point. It lies between the second and third toes, in the hollow behind the base joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST44',
    gloss: 'Inner Courtyard',
    where: {
      en: 'On top of the foot, at the web between the second and third toes, just behind its edge.',
      zh: '足背，第二、三趾之間，趾蹼緣後方。',
    },
    place: { en: 'At the web of the second and third toes', zh: '足背第二三趾間，趾蹼後' },
    for: { en: 'Toothache, sore throat, nosebleed.', zh: '牙痛，喉嚨痛，流鼻血。' },
    press: {
      en: 'Fingertip pressure, about a minute each foot.',
      zh: '以指尖按壓，每腳約一分鐘。',
    },
    quote: {
      han: '內庭者，水也。在足大指次指外間陷者中',
      en: 'Neiting is the water point. It lies in the hollow on the outer side of the second toe.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'ST45',
    gloss: 'Sharp Exchange',
    where: {
      en: 'On the second toe, just off the corner of the nail on the side away from the big toe.',
      zh: '第二趾趾甲角旁，遠離大趾的一側。',
    },
    place: { en: 'By the second toenail, outer corner', zh: '第二趾甲角旁，遠離大趾側' },
    for: { en: 'Nosebleed, toothache, dream-filled sleep.', zh: '流鼻血，牙痛，多夢。' },
    press: {
      en: 'Press with a fingernail edge, on and off, for about a minute.',
      zh: '用指甲邊緣一按一放，約一分鐘。',
    },
    quote: {
      han: '厲兌者，金也。在足大指次指之端，去爪甲角如韭葉',
      en: "Lidui is the metal point. It lies at the tip of the second toe, a leek leaf's width from the nail corner.",
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
