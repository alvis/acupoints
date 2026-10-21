import type { LeafCardInput } from './schema';

/** Book 3 of the Tongren Shuxue Zhenjiu Tujing (Yuan five-book reprint): the head and face points. */
const tongren3 = { han: '《銅人腧穴針灸圖經·卷三》', en: 'Tongren Shuxue Zhenjiu Tujing, book 3' };

/** Book 5 of the Tongren Shuxue Zhenjiu Tujing: the foot shaoyang channel on the leg. */
const tongren5 = { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' };

/** Leaf cards for the GB points, in channel order. */
export const gallbladderLeaves: readonly LeafCardInput[] = [
  {
    code: 'GB1',
    gloss: 'Pupil Hollow',
    where: {
      en: 'Just outside the outer corner of the eye, in the small hollow on the bony rim of the eye socket.',
      zh: '外眼角外側，眼眶外緣骨邊的小凹陷中。',
    },
    place: { en: 'Outside the outer corner of the eye', zh: '外眼角外側，眼眶骨邊' },
    for: { en: 'Sore, red or tired eyes; headache.', zh: '眼睛痠痛、發紅、疲勞，頭痛。' },
    press: {
      en: 'Light touch with a fingertip pad on the bone, about a minute.',
      zh: '指腹輕觸骨緣，約一分鐘。',
    },
    caution: {
      en: 'Never on the eyeball; skip it while an eye is infected or inflamed.',
      zh: '切勿按到眼球；眼睛發炎或感染時不按。',
    },
    quote: {
      han: '瞳子髎二穴，在目外眥五分',
      en: 'Tongziliao, one on each side, lies half a cun outside the outer corner of the eye.',
      source: tongren3,
    },
  },
  {
    code: 'GB2',
    gloss: 'Where Hearing Gathers',
    where: {
      en: 'In front of the small notch below the ear flap, in the hollow that opens when the mouth opens.',
      zh: '耳屏下方小切跡前，張口時出現的凹陷中。',
    },
    place: { en: 'In front of the ear, below the flap', zh: '耳屏下方前，張口凹陷處' },
    for: { en: 'Ringing ears; toothache; an aching face.', zh: '耳鳴，牙痛，面部疼痛。' },
    press: {
      en: 'Mouth slightly open, gentle fingertip pressure, about a minute.',
      zh: '微微張口，指腹輕按約一分鐘。',
    },
    quote: {
      han: '聽會，在耳前陷者中，張口得之',
      en: 'Tinghui lies in the hollow in front of the ear; it is found with the mouth open.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB3',
    gloss: 'Upper Gate',
    where: {
      en: 'In front of the ear, in the shallow dip on the top edge of the cheekbone arch.',
      zh: '耳前，顴骨弓上緣的淺凹中。',
    },
    place: { en: 'Before the ear, atop the cheekbone arch', zh: '耳前，顴骨弓上緣' },
    for: { en: 'Ringing ears; toothache; one-sided headache.', zh: '耳鳴，牙痛，偏頭痛。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    quote: {
      han: '上關，一名客主人，在耳前上廉起骨端，開口有孔',
      en: 'Shangguan, also called Kezhuren, lies on the upper edge of the raised bone in front of the ear; opening the mouth shows a hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB4',
    gloss: 'Jaw Pressing',
    where: {
      en: 'In the hair of the temple, a quarter of the way along the hairline curve from the forehead corner to ear-top level.',
      zh: '鬢角髮際內，由額角沿髮際弧線至耳尖高度的四分之一處。',
    },
    place: { en: 'High in the temple hair', zh: '鬢角髮際內上部' },
    for: { en: 'One-sided headache; dizziness; ringing ears.', zh: '偏頭痛，頭暈，耳鳴。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '頷厭二穴，在曲周下顳顬上廉',
      en: 'Hanyan, one on each side, lies below the curve of the temple hair, on the upper edge of the temple.',
      source: tongren3,
    },
  },
  {
    code: 'GB5',
    gloss: 'Suspended Skull',
    where: {
      en: 'In the hair of the temple, halfway along the curve from the forehead hairline corner to the ear tip.',
      zh: '鬢角髮際內，額角髮際至耳尖弧線的中點。',
    },
    place: { en: 'Mid-temple, inside the hair', zh: '鬢角髮際內中段' },
    for: { en: 'Migraine; dizziness; toothache.', zh: '偏頭痛，頭暈，牙痛。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute; not mid-attack.',
      zh: '指腹輕按頭皮約一分鐘；頭痛發作時不按。',
    },
    quote: {
      han: '懸顱二穴，在曲周上顳顬中',
      en: 'Xuanlu, one on each side, lies above the curve of the temple hair, in the middle of the temple.',
      source: tongren3,
    },
  },
  {
    code: 'GB6',
    gloss: 'Suspended Trim',
    where: {
      en: 'In the hair of the temple, three quarters of the way down the curve from the forehead hairline corner to the ear tip.',
      zh: '鬢角髮際內，額角髮際至耳尖弧線往下約四分之三處。',
    },
    place: { en: 'Low in the temple hair', zh: '鬢角髮際內下部' },
    for: {
      en: 'One-sided headache; pain at the outer eye corner; ringing ears.',
      zh: '偏頭痛，外眼角痛，耳鳴。',
    },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '懸釐二穴，在曲周上顳顬下廉',
      en: 'Xuanli, one on each side, lies above the curve of the temple hair, on the lower edge of the temple.',
      source: tongren3,
    },
  },
  {
    code: 'GB7',
    gloss: 'Curved Temple Hair',
    where: {
      en: 'At the back edge of the temple hairline in front of the ear, level with the top of the ear.',
      zh: '耳前鬢角髮際後緣，與耳尖同高處。',
    },
    place: { en: 'Temple hairline, level with the ear top', zh: '耳前鬢角，與耳尖同高' },
    for: {
      en: 'One-sided headache; swollen jaw and cheek; toothache.',
      zh: '偏頭痛，頰頷腫，牙痛。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    quote: {
      han: '曲鬢，在耳上，入髮際曲隅陷者中，鼓頷有空',
      en: 'Qubin lies above the ear, inside the hairline at its curved corner, in a hollow that opens as the jaw works.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB8',
    gloss: 'Leading Valley',
    where: {
      en: 'Two finger-widths straight above the top of the ear, inside the hair; it stirs when you clench your back teeth.',
      zh: '耳尖直上兩橫指，髮際內；咬緊後牙時可感到牽動。',
    },
    place: { en: 'Two finger-widths above the ear tip', zh: '耳尖直上兩橫指' },
    for: { en: 'One-sided headache; dizziness; ringing ears.', zh: '偏頭痛，頭暈，耳鳴。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '率谷，在耳上，入髮際一寸五分',
      en: 'Shuaigu lies above the ear, one and a half cun inside the hairline.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB9',
    gloss: 'Heavenly Rush',
    where: {
      en: 'Above and behind the ear: from the spot two finger-widths over the ear tip, slide half a thumb-width back.',
      zh: '耳上後方：由耳尖直上兩橫指處，再往後半拇指寬。',
    },
    place: { en: 'Above and behind the ear', zh: '耳上後方髮際內' },
    for: { en: 'Headache; ringing ears; toothache.', zh: '頭痛，耳鳴，牙痛。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
  },
  {
    code: 'GB10',
    gloss: 'Floating White',
    where: {
      en: 'Behind the ear, on the scalp just above and behind the bony knob behind the earlobe.',
      zh: '耳後，耳垂後方骨突的後上方頭皮上。',
    },
    place: { en: 'Behind the ear, high above the bony knob', zh: '耳後，骨突後上方較高處' },
    for: { en: 'Headache; ringing ears; a stiff neck.', zh: '頭痛，耳鳴，頸項僵硬。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '浮白，在耳後，入髮際一寸',
      en: 'Fubai lies behind the ear, one cun inside the hairline.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB11',
    gloss: 'Yin Apertures of the Head',
    where: {
      en: 'Behind the ear, on the scalp just above and behind the bony knob, one thumb-width below GB10.',
      zh: '耳後骨突的後上方，浮白下一拇指寬。',
    },
    place: { en: 'Behind the ear, just above the bony knob', zh: '耳後骨突後上方，浮白下' },
    for: { en: 'Headache; ringing ears; a stiff neck.', zh: '頭痛，耳鳴，頸項僵硬。' },
    press: {
      en: 'Light fingertip touch on the scalp, about a minute each side.',
      zh: '指腹輕觸頭皮，每側約一分鐘。',
    },
    quote: {
      han: '竅陰，在完骨上，枕骨下，搖動應手',
      en: 'Qiaoyin lies above Wangu and below the skull bone at the back, where movement answers the hand as the head turns.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB12',
    gloss: 'Completed Bone',
    where: {
      en: 'In the soft hollow just below and behind the bony knob behind the earlobe.',
      zh: '耳垂後方骨突的後下方軟凹中。',
    },
    place: { en: 'Below and behind the knob behind the ear', zh: '耳垂後骨突的後下方' },
    for: { en: 'Headache; a stiff, sore neck; toothache.', zh: '頭痛，頸項僵痛，牙痛。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先徵詢醫師意見。' },
    quote: {
      han: '完骨，在耳後，入髮際四分',
      en: 'Wangu lies behind the ear, four fen inside the hairline.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB13',
    gloss: 'Root of the Spirit',
    where: {
      en: 'Above the outer corner of the eye, half a thumb-width inside the front hairline.',
      zh: '外眼角直上，前髮際內半拇指寬處。',
    },
    place: { en: 'Above the outer eye corner, in the hair', zh: '外眼角直上，前髮際內' },
    for: { en: 'Headache; dizziness; poor sleep.', zh: '頭痛，頭暈，失眠。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute; keep fingers clear of the eyes.',
      zh: '指腹輕按約一分鐘，手指遠離眼睛。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先徵詢醫師意見。' },
    quote: {
      han: '本神，在曲差兩傍各一寸五分，在髮際',
      en: 'Benshen lies one and a half cun to each side of Qucha, at the hairline.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB14',
    gloss: 'White Brightness',
    where: {
      en: 'On the forehead, straight above the pupil, one thumb-width above the eyebrow.',
      zh: '前額，瞳孔直上，眉毛上方一拇指寬。',
    },
    place: { en: 'Above the pupil, a thumb over the brow', zh: '瞳孔直上，眉上一拇指寬' },
    for: {
      en: 'Sore, swollen eyes; drooping eyelids; headache.',
      zh: '眼睛腫痛，眼瞼下垂，頭痛。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    quote: {
      han: '陽白二穴，在眉上一寸，直目瞳子',
      en: 'Yangbai, one on each side, lies one cun above the eyebrow, straight above the pupil.',
      source: tongren3,
    },
  },
  {
    code: 'GB15',
    gloss: 'Head Overlooking Tears',
    where: {
      en: 'Straight above the pupil, half a thumb-width inside the front hairline.',
      zh: '瞳孔直上，前髮際內半拇指寬。',
    },
    place: { en: 'Above the pupil, just in the hairline', zh: '瞳孔直上，入髮際半拇指寬' },
    for: { en: 'Headache; sore eyes; a blocked nose.', zh: '頭痛，眼睛痛，鼻塞。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    quote: {
      han: '臨泣二穴，在目上直入髮際五分陷中',
      en: 'Linqi, one on each side, lies straight above the eye, in the hollow half a cun inside the hairline.',
      source: tongren3,
    },
  },
  {
    code: 'GB16',
    gloss: 'Window of the Eye',
    where: {
      en: 'Straight above the pupil, two finger-widths inside the front hairline.',
      zh: '瞳孔直上，前髮際內兩橫指。',
    },
    place: { en: 'Above the pupil, two fingers in the hair', zh: '瞳孔直上，前髮際內兩橫指' },
    for: { en: 'Headache; dizziness; blurred vision.', zh: '頭痛，頭暈，視物模糊。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '目窗，一名至營，在臨泣後一寸',
      en: 'Muchuang, also called Zhiying, lies one cun behind Linqi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB17',
    gloss: 'Upright Camp',
    where: {
      en: 'On the scalp, on the line up from the pupil, one thumb-width behind GB16.',
      zh: '頭頂前部，瞳孔直上的線上，目窗後一拇指寬。',
    },
    place: { en: 'On the pupil line, behind Muchuang', zh: '瞳孔直上的線上，目窗後' },
    for: { en: 'Headache; dizziness; a stiff neck.', zh: '頭痛，頭暈，頸項僵硬。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '正營，在目窗後一寸',
      en: 'Zhengying lies one cun behind Muchuang.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB18',
    gloss: 'Receiving the Spirit',
    where: {
      en: 'On the scalp, on the line up from the pupil, four finger-widths inside the front hairline.',
      zh: '頭頂，瞳孔直上的線上，前髮際內四橫指。',
    },
    place: { en: 'On the pupil line, high on the scalp', zh: '瞳孔直上線，前髮際內四橫指' },
    for: { en: 'Headache; dizziness; a blocked nose.', zh: '頭痛，頭暈，鼻塞。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '承靈，在正營後一寸五分',
      en: 'Chengling lies one and a half cun behind Zhengying.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB19',
    gloss: 'Brain Hollow',
    where: {
      en: 'At the back of the head, beside the bump on the skull, straight above the hollow of GB20.',
      zh: '後頭部，枕骨隆突旁，風池直上。',
    },
    place: { en: 'Beside the bump at the back of the skull', zh: '枕骨隆突旁，風池直上' },
    for: { en: 'Headache; dizziness; a stiff, sore neck.', zh: '頭痛，頭暈，頸項僵痛。' },
    press: {
      en: 'Gentle fingertip pressure on the scalp, about a minute each side.',
      zh: '指腹輕按頭皮，每側約一分鐘。',
    },
    quote: {
      han: '腦空二穴，一名顳顬，在承靈後一寸五分',
      en: 'Naokong, one on each side, also called Nieru, lies one and a half cun behind Chengling.',
      source: tongren3,
    },
  },
  {
    code: 'GB20',
    gloss: 'Wind Pool',
    where: {
      en: 'Under the base of the skull, in the hollow between the two neck muscles on each side.',
      zh: '後頸，枕骨下方，兩側頸部大肌肉之間的凹陷中。',
    },
    place: { en: 'Below the skull, between the neck cords', zh: '枕骨下，兩條頸部大肌之間' },
    for: { en: 'Headache; dizziness; a stiff, sore neck.', zh: '頭痛，頭暈，頸項僵痛。' },
    press: {
      en: 'Gentle pressure down into the neck, never up under the skull; about a minute.',
      zh: '輕輕往頸部方向按，勿往顱骨下方上推；約一分鐘。',
    },
    quote: {
      han: '風池二穴，在顳顬後髮際陷中',
      en: 'Fengchi, one on each side, lies behind Nieru (Naokong), in the hollow at the hairline.',
      source: tongren3,
    },
  },
  {
    code: 'GB21',
    gloss: 'Shoulder Well',
    where: {
      en: 'On top of the shoulder, halfway between the bony bump at the base of the neck and the tip of the shoulder.',
      zh: '肩上，頸後最高骨突與肩峰之間的中點。',
    },
    place: { en: 'Top of the shoulder, midway', zh: '肩上，頸根與肩峰之間' },
    for: { en: 'Stiff neck; aching shoulders and upper back.', zh: '頸項僵硬，肩背痠痛。' },
    press: {
      en: 'Gentle pressure through relaxed muscle, about a minute each side.',
      zh: '肌肉放鬆，輕輕按壓，每側約一分鐘。',
    },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: {
      han: '肩井，在肩上陷者中，缺盆上大骨前',
      en: 'Jianjing lies in the hollow on top of the shoulder, in front of the large bone above the collarbone hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB22',
    gloss: 'Deep Pool of the Axilla',
    where: {
      en: 'With the arm raised, on the side of the chest straight below the armpit, four finger-widths down, between ribs.',
      zh: '舉臂，腋窩正下方胸側四橫指處，肋骨間隙中。',
    },
    place: { en: 'Side of the chest, below the armpit', zh: '胸側，腋窩下四橫指' },
    for: {
      en: 'A full chest; pain along the ribs; swelling under the arm.',
      zh: '胸悶，脅肋痛，腋下腫。',
    },
    press: {
      en: 'Gentle fingertip pressure in the rib groove, about a minute.',
      zh: '指腹輕按肋間，約一分鐘。',
    },
    quote: {
      han: '淵腋，在腋下三寸宛宛中，舉臂取之',
      en: 'Yuanye lies in the soft hollow three cun below the armpit; it is found with the arm raised.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB23',
    gloss: 'Carriage Boards and Sinew',
    where: {
      en: 'On the side of the chest, level with the nipple, one thumb-width in front of GB22, between ribs.',
      zh: '胸側，與乳頭同高，淵腋前一拇指寬的肋間。',
    },
    place: { en: 'Side of the chest, level with the nipple', zh: '胸側，與乳頭同高' },
    for: { en: 'A full chest and sore ribs; acid reflux.', zh: '胸脅脹痛，吞酸。' },
    press: {
      en: 'Gentle fingertip pressure in the rib groove, about a minute.',
      zh: '指腹輕按肋間，約一分鐘。',
    },
    quote: {
      han: '輒筋，在腋下三寸，複前行一寸，著脅',
      en: 'Zhejin lies three cun below the armpit and one cun further forward, against the ribs.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB24',
    gloss: 'Sun and Moon',
    where: {
      en: 'Straight below the nipple, in the rib gap one below LV14, just above the edge of the rib cage.',
      zh: '乳頭直下，期門下一個肋間，近肋弓邊緣。',
    },
    place: { en: 'Below the nipple, near the rib edge', zh: '乳頭直下，近肋弓邊緣' },
    for: { en: 'Acid reflux; hiccups; pain under the ribs.', zh: '吞酸，打嗝，脅肋痛。' },
    press: {
      en: 'Gentle fingertip pressure on the rib groove, about a minute.',
      zh: '指腹輕按肋間，約一分鐘。',
    },
    quote: {
      han: '日月，膽募也，在期門下一寸五分',
      en: 'Riyue, the gathering point of the gallbladder, lies one and a half cun below Qimen.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB25',
    gloss: 'Capital Gate',
    where: {
      en: 'On the side of the waist, just below the free tip of the lowest rib.',
      zh: '腰側，最下一根浮肋游離端的下方。',
    },
    place: { en: 'Below the free tip of the lowest rib', zh: '腰側，最下浮肋端下方' },
    for: { en: 'Low back and side pain; a bloated belly.', zh: '腰脅痛，腹脹。' },
    press: {
      en: 'Gentle finger-pad pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    caution: {
      en: 'Not with kidney disease, fever or urinary symptoms unless a clinician agrees.',
      zh: '有腎病、發燒或排尿不適時，未經醫師同意不按。',
    },
  },
  {
    code: 'GB26',
    gloss: 'The Belt Channel',
    where: {
      en: 'On the side of the waist, level with the navel, straight below the free tip of the second-lowest rib.',
      zh: '腰側，與肚臍同高，倒數第二根肋骨游離端的正下方。',
    },
    place: { en: 'Side of the waist, level with the navel', zh: '腰側，與肚臍同高' },
    for: {
      en: 'Irregular periods; low belly pain; aching back and sides.',
      zh: '月經不調，小腹痛，腰脅痛。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    caution: {
      en: 'In pregnancy or during heavy periods, ask a practitioner first.',
      zh: '孕期或經血量多時，請先徵詢醫師意見。',
    },
    quote: {
      han: '帶脈，在季脅下一寸八分',
      en: 'Daimai lies one cun eight fen below the lowest ribs.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB27',
    gloss: 'Five Pivots',
    where: {
      en: 'Just in front of the bony front tip of the hip, level with a spot four finger-widths below the navel.',
      zh: '髂骨前上棘前方，與肚臍下四橫指處同高。',
    },
    place: { en: 'Just in front of the hip-bone tip', zh: '髂骨前上棘前方' },
    for: { en: 'Low belly pain; lower back pain; constipation.', zh: '小腹痛，腰痛，便秘。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    quote: {
      han: '五樞，在帶脈下三寸',
      en: 'Wushu lies three cun below Daimai.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB28',
    gloss: 'The Binding Way',
    where: {
      en: 'Half a thumb-width forward and down from GB27, below the bony front tip of the hip.',
      zh: '五樞往前下方半拇指寬，髂骨前上棘前下方。',
    },
    place: { en: 'Below and in front of the hip-bone tip', zh: '髂骨前上棘前下方' },
    for: {
      en: 'Irregular periods; low belly pain; hip and back pain.',
      zh: '月經不調，小腹痛，腰胯痛。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each side.',
      zh: '指腹輕按，每側約一分鐘。',
    },
    quote: {
      han: '維道，一名外樞，在章門下五寸三分',
      en: 'Weidao, also called Waishu, lies five cun three fen below Zhangmen.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB29',
    gloss: 'A Dwelling Hollow',
    where: {
      en: 'On the side of the hip, halfway between the bony front tip of the hip and the knob at the top of the thigh bone.',
      zh: '胯側，髂骨前上棘與大腿骨上端大轉子之間的中點。',
    },
    place: { en: 'Side of the hip, between two bony knobs', zh: '胯側，兩處骨突之間' },
    for: { en: 'Low back and hip pain; heavy, weak legs.', zh: '腰胯痛，下肢無力。' },
    press: {
      en: 'Steady fingertip pressure, about a minute each side.',
      zh: '指腹穩穩按壓，每側約一分鐘。',
    },
  },
  {
    code: 'GB30',
    gloss: 'Jumping Circle',
    where: {
      en: 'Lying on your side, hip bent: on the buttock, a third of the way from the hip-bone knob toward the base of the spine.',
      zh: '側臥屈髖，臀部，由大轉子往尾骨方向約三分之一處。',
    },
    place: { en: 'On the buttock, near the hip-bone knob', zh: '臀部，大轉子後內方' },
    for: {
      en: 'Low back and hip pain; pain or numbness down the leg.',
      zh: '腰胯痛，腿痛或麻木。',
    },
    press: {
      en: 'Steady fingertip pressure, no digging, about a minute each side.',
      zh: '指腹穩穩按壓，勿深掘，每側約一分鐘。',
    },
    quote: {
      han: '環跳，在髀樞中，側臥伸下足，屈上足取之',
      en: 'Huantiao lies in the hip pivot; it is found lying on the side, the lower leg straight and the upper leg bent.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB31',
    gloss: 'The Wind Market',
    where: {
      en: 'Stand with arms hanging: on the outer thigh, where the tip of the middle finger rests.',
      zh: '站立雙手自然下垂，大腿外側中指尖所觸之處。',
    },
    place: { en: 'Outer thigh, at the middle fingertip', zh: '大腿外側，中指尖處' },
    for: { en: 'Numb or weak legs; itching all over.', zh: '下肢麻木無力，全身瘙癢。' },
    press: {
      en: 'Steady fingertip pressure, about a minute each leg.',
      zh: '指腹穩穩按壓，每條腿約一分鐘。',
    },
  },
  {
    code: 'GB32',
    gloss: 'Central Watercourse',
    where: {
      en: 'On the outer thigh, three finger-widths below GB31, in the groove between the front and back thigh muscles.',
      zh: '大腿外側，風市下三橫指，前後肌肉之間的溝中。',
    },
    place: { en: 'Outer thigh, three fingers below GB31', zh: '大腿外側，風市下三橫指' },
    for: { en: 'Numb legs; knee pain; calf cramps.', zh: '腿麻，膝痛，小腿抽筋。' },
    press: {
      en: 'Steady fingertip pressure, about a minute each leg.',
      zh: '指腹穩穩按壓，每條腿約一分鐘。',
    },
    quote: {
      han: '中犢，在髀骨外，膝上五寸，分肉間陷者中',
      en: 'Zhongdu lies on the outside of the thigh bone, five cun above the knee, in a hollow between the muscles.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB33',
    gloss: 'Yang Gate of the Knee',
    where: {
      en: 'On the outer side of the knee, in the soft dip just above the bony bump of the thigh bone.',
      zh: '膝外側，大腿骨外側骨突上方的軟凹中。',
    },
    place: { en: 'Outer knee, above the bony bump', zh: '膝外側，股骨外側骨突上方' },
    for: { en: 'Swollen, painful knees; tight backs of the knees.', zh: '膝蓋腫痛，膕窩筋緊。' },
    press: {
      en: 'Gentle fingertip pressure, knee softly bent, about a minute.',
      zh: '膝微屈，指腹輕按約一分鐘。',
    },
    caution: {
      en: 'Not on a hot, freshly swollen or newly injured knee.',
      zh: '膝蓋發熱、新腫或剛受傷時不按。',
    },
    quote: {
      han: '陽關，在陽陵泉上三寸，犢鼻外陷者中',
      en: 'Yangguan lies three cun above Yanglingquan, in the hollow outside Dubi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB34',
    gloss: 'Spring at the Yang Mound',
    where: {
      en: 'Below the outer knee, in the hollow just in front of and below the round knob of the fibula.',
      zh: '膝下外側，腓骨小頭前下方的凹陷中。',
    },
    place: { en: 'Below and before the fibula’s knob', zh: '膝下外側，腓骨小頭前下方' },
    for: {
      en: 'A bitter taste in the mouth; pain under the ribs; leg cramps.',
      zh: '口苦，脅肋痛，腿抽筋。',
    },
    press: {
      en: 'Steady fingertip pressure, about a minute each leg.',
      zh: '指腹穩穩按壓，每條腿約一分鐘。',
    },
    quote: {
      han: '陽陵泉二穴，土也，在膝下一寸外廉陷中',
      en: 'Yanglingquan, one on each side, is the earth point; it lies one cun below the knee, in the hollow on the outer side.',
      source: tongren5,
    },
  },
  {
    code: 'GB35',
    gloss: 'Yang Crossing',
    where: {
      en: 'Seven thumb-widths above the outer anklebone, on the back edge of the fibula.',
      zh: '外踝尖上七拇指寬，腓骨後緣。',
    },
    place: { en: 'Mid-shin, back edge of the fibula', zh: '外踝上七拇指寬，腓骨後緣' },
    for: { en: 'Weak legs; knee pain; tight chest and ribs.', zh: '下肢無力，膝痛，胸脅脹痛。' },
    press: {
      en: 'Steady fingertip pressure, about a minute each leg.',
      zh: '指腹穩穩按壓，每條腿約一分鐘。',
    },
    quote: {
      han: '在足外踝上七寸，斜屬三陽分肉之間',
      en: 'Seven cun above the outer anklebone, slanting into the parting of the flesh of the three yang channels.',
      source: tongren5,
    },
  },
  {
    code: 'GB36',
    gloss: 'Outer Hill',
    where: {
      en: 'Seven thumb-widths above the outer anklebone, on the front edge of the fibula.',
      zh: '外踝尖上七拇指寬，腓骨前緣。',
    },
    place: { en: 'Mid-shin, front edge of the fibula', zh: '外踝上七拇指寬，腓骨前緣' },
    for: {
      en: 'Numb, weak legs; a stiff neck; tight chest and ribs.',
      zh: '下肢麻木無力，頸項僵痛，胸脅脹痛。',
    },
    press: {
      en: 'Steady fingertip pressure, about a minute each leg.',
      zh: '指腹穩穩按壓，每條腿約一分鐘。',
    },
    quote: { han: '在足外踝上七寸', en: 'Seven cun above the outer anklebone.', source: tongren5 },
  },
  {
    code: 'GB37',
    gloss: 'Bright Light',
    where: {
      en: 'Five thumb-widths above the outer anklebone, on the front edge of the fibula.',
      zh: '外踝尖上五拇指寬，腓骨前緣。',
    },
    place: { en: 'Five thumb-widths above the outer ankle', zh: '外踝上五拇指寬，腓骨前緣' },
    for: { en: 'Sore eyes; poor sight at night; tender breasts.', zh: '眼睛痛，夜盲，乳房脹痛。' },
    press: {
      en: 'Steady fingertip pressure, about a minute each leg.',
      zh: '指腹穩穩按壓，每條腿約一分鐘。',
    },
    quote: {
      han: '光明，足少陽絡，在足外踝上五寸',
      en: 'Guangming, the connecting point of the foot Shaoyang, lies five cun above the outer anklebone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB38',
    gloss: 'Yang Assist',
    where: {
      en: 'Four thumb-widths above the outer anklebone, just in front of the front edge of the fibula.',
      zh: '外踝尖上四拇指寬，腓骨前緣稍前方。',
    },
    place: { en: 'Four thumb-widths above the outer ankle', zh: '外踝上四拇指寬，腓骨前方' },
    for: {
      en: 'One-sided headache; pain at the outer eye corner; chest and rib pain.',
      zh: '偏頭痛，外眼角痛，胸脅痛。',
    },
    press: {
      en: 'Steady fingertip pressure, about a minute each leg.',
      zh: '指腹穩穩按壓，每條腿約一分鐘。',
    },
    quote: {
      han: '陽輔者，火也。在足外踝上四寸',
      en: 'Yangfu is the fire point; it lies four cun above the outer anklebone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB39',
    gloss: 'Suspended Bell',
    where: {
      en: 'Four finger-widths above the outer anklebone, on the front edge of the fibula.',
      zh: '外踝尖上四橫指，腓骨前緣。',
    },
    place: { en: 'Four finger-widths above the outer ankle', zh: '外踝上四橫指，腓骨前緣' },
    for: {
      en: 'A stiff, sore neck; pain under the ribs; headache.',
      zh: '頸項僵痛，脅肋痛，頭痛。',
    },
    press: {
      en: 'Light fingertip pressure beside the bone, about a minute each leg.',
      zh: '指腹在骨緣旁輕按，每條腿約一分鐘。',
    },
    quote: {
      han: '懸鐘，在足外踝上三寸動者脈中',
      en: 'Xuanzhong lies three cun above the outer anklebone, where a pulse beats.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB40',
    gloss: 'Mound and Open Ground',
    where: {
      en: 'In the dip in front of and below the outer anklebone, on the outer side of the toe tendon.',
      zh: '外踝前下方的凹陷中，伸趾肌腱的外側。',
    },
    place: { en: 'In front of and below the outer ankle', zh: '外踝前下方凹陷中' },
    for: { en: 'Swollen, sore outer ankle; tight chest and ribs.', zh: '外踝腫痛，胸脅脹痛。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each foot.',
      zh: '指腹輕按，每腳約一分鐘。',
    },
    caution: { en: 'Not on a fresh sprain or a swollen ankle.', zh: '剛扭傷或腳踝腫脹時不按。' },
    quote: {
      han: '丘墟，在足外廉踝下如前陷者中，去臨泣一寸',
      en: 'Qiuxu lies in the hollow below and a little in front of the outer anklebone, one cun from Linqi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB41',
    gloss: 'Foot Overlooking Tears',
    where: {
      en: 'On top of the foot, in the hollow behind the knuckle of the fourth toe, just outside the little-toe tendon.',
      zh: '足背，第四趾根關節後方的凹陷中，小趾肌腱外側。',
    },
    place: { en: 'Top of foot, by the little-toe tendon', zh: '足背，小趾肌腱外側凹陷' },
    for: {
      en: 'One-sided headache; tender breasts; a sore foot.',
      zh: '偏頭痛，乳房脹痛，足背腫痛。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each foot.',
      zh: '指腹輕按，每腳約一分鐘。',
    },
    caution: {
      en: 'In pregnancy, or with diabetes or numb feet, ask a practitioner first.',
      zh: '孕期、糖尿病或足部麻木者，請先徵詢醫師意見。',
    },
    quote: {
      han: '臨泣者，木也。在足小指次指本節後間陷者中，去俠溪一寸五分',
      en: 'Linqi is the wood point; it lies in the hollow behind the base joint of the fourth toe, one and a half cun from Xiaxi.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB42',
    gloss: 'Earth Five Meeting',
    where: {
      en: 'On top of the foot, behind the knuckle of the fourth toe, in the valley between the fourth and fifth toe bones.',
      zh: '足背，第四趾根關節後方，第四、五蹠骨之間的溝中。',
    },
    place: { en: 'Between the fourth and fifth toe bones', zh: '足背，第四、五蹠骨之間' },
    for: { en: 'Headache; ringing ears; a swollen, sore foot.', zh: '頭痛，耳鳴，足背腫痛。' },
    press: {
      en: 'Light fingertip pressure, not deep between the bones, about a minute.',
      zh: '指腹輕按，勿深壓骨縫，約一分鐘。',
    },
    caution: {
      en: 'With numb feet or poor circulation, ask a clinician first.',
      zh: '足部麻木或血液循環不佳者，請先徵詢醫師意見。',
    },
    quote: {
      han: '地五會，在足小指次指本節後間陷者中',
      en: 'Diwuhui lies in the hollow behind the base joint of the fourth toe.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB43',
    gloss: 'Clasped Stream',
    where: {
      en: 'On top of the foot, between the fourth and fifth toes, just behind the edge of the web.',
      zh: '足背，第四、五趾之間，趾蹼邊緣稍後方。',
    },
    place: { en: 'Behind the web of the 4th and 5th toes', zh: '第四、五趾間，趾蹼後方' },
    for: { en: 'Headache; ringing ears; dizziness.', zh: '頭痛，耳鳴，頭暈。' },
    press: {
      en: 'Gentle fingertip pressure, about a minute each foot.',
      zh: '指腹輕按，每腳約一分鐘。',
    },
    quote: {
      han: '俠溪者，水也。在足小指次指二歧骨間，本節前陷者中',
      en: 'Xiaxi is the water point; it lies between the forked bones of the fourth and little toes, in the hollow in front of the base joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'GB44',
    gloss: 'Foot Yin Aperture',
    where: {
      en: 'On the fourth toe, at the outer corner of the toenail, just beside the nail.',
      zh: '第四趾外側，趾甲角旁。',
    },
    place: { en: 'Outer corner of the fourth toenail', zh: '第四趾外側趾甲角旁' },
    for: {
      en: 'Headache; poor sleep with heavy dreaming; sore throat.',
      zh: '頭痛，失眠多夢，咽喉痛。',
    },
    press: {
      en: 'Light fingertip pressure beside the nail, about a minute each foot.',
      zh: '指腹在趾甲旁輕按，每腳約一分鐘。',
    },
    caution: {
      en: 'In pregnancy, or with diabetes or numb feet, ask a practitioner first.',
      zh: '孕期、糖尿病或足部麻木者，請先徵詢醫師意見。',
    },
    quote: {
      han: '竅陰者，金也。在足小指次指之端，去爪甲角如韭葉',
      en: 'Qiaoyin is the metal point; it lies at the tip of the fourth toe, a leek leaf’s width from the corner of the nail.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
