import type { LeafCardInput } from './schema';

/** Leaf cards for the LI points, in channel order. */
export const largeIntestineLeaves: readonly LeafCardInput[] = [
  {
    code: 'LI1',
    gloss: 'Shang Note, Yang Side',
    where: {
      en: 'On the index finger, just off the corner of the nail on the thumb side.',
      zh: '食指指甲角旁，靠拇指一側。',
    },
    place: { en: 'By the index nail, thumb side', zh: '食指甲角旁，靠拇指側' },
    for: { en: 'Toothache, sore throat, fever.', zh: '牙痛，喉嚨痛，發燒。' },
    press: {
      en: 'Press with a fingernail edge, on and off, for about a minute.',
      zh: '用另一手指甲邊緣一按一放，約一分鐘。',
    },
    quote: {
      han: '商陽者，金也。一名絕陽，在手大指次指內側，去爪甲角如韭葉',
      en: "Shangyang is the metal point, also called Jueyang. It lies on the inner side of the index finger, a leek leaf's width from the nail corner.",
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI2',
    gloss: 'Second Space',
    where: {
      en: 'Make a loose fist: on the thumb side of the index finger, just in front of the big knuckle, where palm skin meets back skin.',
      zh: '輕握拳，食指靠拇指一側，掌指關節前方，掌面與手背皮膚交界處。',
    },
    place: { en: 'In front of the index knuckle', zh: '食指掌指關節前' },
    for: { en: 'Toothache, nosebleed, sore eyes.', zh: '牙痛，流鼻血，眼睛不適。' },
    press: {
      en: 'Fingertip pressure into the hollow, about a minute each hand.',
      zh: '用指尖按入凹陷約一分鐘，兩手各一次。',
    },
    quote: {
      han: '二間者，水也。一名間谷，在手大指次指本節前內側陷者中',
      en: 'Erjian is the water point, also called Jiangu. It lies on the inner side of the index finger, in the hollow in front of its base joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI3',
    gloss: 'Third Space',
    where: {
      en: 'Make a loose fist: on the thumb side of the index finger, in the hollow just behind the big knuckle.',
      zh: '輕握拳，食指靠拇指一側，掌指關節後方的凹陷中。',
    },
    place: { en: 'Behind the index knuckle', zh: '食指掌指關節後' },
    for: { en: 'Toothache, sore throat, puffy, aching fingers.', zh: '牙痛，喉嚨痛，手指腫痛。' },
    press: {
      en: 'Fingertip pressure toward the bone, about a minute each hand.',
      zh: '朝骨的方向用指尖按約一分鐘，兩手各一次。',
    },
    quote: {
      han: '三間者，木也。一名少谷，在手大指次指本節後內側陷者中',
      en: 'Sanjian is the wood point, also called Shaogu. It lies on the inner side of the index finger, in the hollow behind its base joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI4',
    gloss: 'Joining Valley',
    where: {
      en: 'On the back of the hand, on the mound between thumb and index finger when the thumb presses in.',
      zh: '手背，拇指與食指之間，兩指併攏時隆起的肌肉高處。',
    },
    place: { en: 'On the mound between thumb and index', zh: '拇指食指間隆起處' },
    for: { en: 'Headache; pain of the face and teeth.', zh: '頭痛，面痛，牙痛。' },
    press: {
      en: 'Toward the index-finger bone, one minute, then the other hand.',
      zh: '朝食指骨方向按一分鐘，再換另一手。',
    },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: {
      han: '合谷，在大指岐骨之間',
      en: 'Hegu lies between the forked bones of the thumb and index finger.',
      source: { han: '《靈樞·本輸》', en: 'Lingshu, chapter 2' },
    },
  },
  {
    code: 'LI5',
    gloss: 'Yang Ravine',
    where: {
      en: 'Lift the thumb: on the thumb side of the back of the wrist, in the hollow between the two tendons.',
      zh: '翹起拇指，手腕背面靠拇指一側，兩條肌腱之間的凹陷。',
    },
    place: { en: 'In the wrist hollow, thumb side', zh: '腕背拇指側兩筋間凹陷' },
    for: { en: 'Wrist pain, headache, toothache.', zh: '手腕痛，頭痛，牙痛。' },
    press: {
      en: 'Fingertip pressure into the hollow, about a minute each wrist.',
      zh: '用指尖按入凹陷約一分鐘，兩腕各一次。',
    },
    quote: {
      han: '陽溪者，火也。一名中魁，在腕中上側兩傍間陷者',
      en: 'Yangxi is the fire point, also called Zhongkui. It lies at the wrist, in the hollow between the two sides of its upper edge.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI6',
    gloss: 'Slanting Passage',
    where: {
      en: 'On the back of the forearm, thumb side, four finger-widths above the wrist hollow of LI5.',
      zh: '前臂背面靠拇指一側，陽溪穴上四橫指處。',
    },
    place: { en: 'Back of the forearm, above the wrist', zh: '前臂背面，陽溪上四橫指' },
    for: { en: 'Ringing ears, nosebleed, an aching arm.', zh: '耳鳴，流鼻血，手臂痠痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
    quote: {
      han: '偏歷，手陽明絡，在腕後三寸',
      en: 'Pianli, the connecting point of the hand yangming, lies three cun behind the wrist.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI7',
    gloss: 'Warm Flow',
    where: {
      en: 'On the back of the forearm, thumb side, one thumb-width toward the wrist from the midpoint of wrist and elbow.',
      zh: '前臂背面靠拇指一側，腕與肘連線中點往手腕方向一拇指寬。',
    },
    place: { en: 'Back of the forearm, near halfway', zh: '前臂背面，近腕肘中點' },
    for: { en: 'A rumbling, aching belly, headache, sore throat.', zh: '腹痛腸鳴，頭痛，喉嚨痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
    quote: {
      han: '在腕後少士五寸，大士六寸',
      en: 'It lies five cun behind the wrist in a small person, six cun in a large one.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI8',
    gloss: 'Lower Edge',
    where: {
      en: 'On the back of the forearm, thumb side, a third of the way from the outer end of the elbow crease to the wrist.',
      zh: '前臂背面靠拇指一側，從肘橫紋外端到手腕的三分之一處。',
    },
    place: { en: 'Forearm, a third down from the elbow', zh: '前臂背面，肘下三分之一處' },
    for: { en: 'An aching elbow and arm, headache, a bloated belly.', zh: '肘臂痛，頭痛，腹脹。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
    quote: {
      han: '下廉，在輔骨下，去上廉一寸',
      en: 'Xialian lies below the supporting bone, one cun from Shanglian.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI9',
    gloss: 'Upper Edge',
    where: {
      en: 'On the back of the forearm, thumb side, four finger-widths below the outer end of the elbow crease.',
      zh: '前臂背面靠拇指一側，肘橫紋外端下四橫指處。',
    },
    place: { en: 'Four fingers below the elbow crease', zh: '肘橫紋外端下四橫指' },
    for: { en: 'An aching elbow and arm, numb hands, headache.', zh: '肘臂痛，手臂麻木，頭痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
    quote: {
      han: '上廉二穴，在三里下一寸',
      en: 'Shanglian, on both arms, lies one cun below Sanli.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'LI10',
    gloss: 'Arm Three Miles',
    where: {
      en: 'On the back of the forearm, thumb side, three finger-widths below the outer end of the elbow crease.',
      zh: '前臂背面靠拇指一側，肘橫紋外端下三橫指處。',
    },
    place: { en: 'Three fingers below the elbow crease', zh: '肘橫紋外端下三橫指' },
    for: { en: 'A tired, weak arm, belly ache, toothache.', zh: '手臂無力，腹痛，牙痛。' },
    press: {
      en: 'Firm thumb pressure into the muscle, about a minute each arm.',
      zh: '拇指稍用力按入肌肉，每臂約一分鐘。',
    },
    quote: {
      han: '三里二穴，在曲池下二寸，按之肉起，兌肉之端',
      en: 'Sanli, on both arms, lies two cun below Quchi, where the flesh rises when pressed, at the tip of the pointed muscle.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'LI11',
    gloss: 'Bent Pool',
    where: {
      en: 'Bend the elbow: halfway between the outer end of the crease and the bony knob on the outside of the elbow.',
      zh: '屈肘，肘橫紋外端與肘外側骨突連線的中點。',
    },
    place: { en: 'Outer elbow, past the end of the crease', zh: '屈肘，肘橫紋外端與骨突間' },
    for: { en: 'An aching arm, fever, itchy skin.', zh: '手臂痠痛，發燒，皮膚癢。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
    quote: {
      han: '曲池者，土也。在肘外輔骨肘骨之中',
      en: 'Quchi is the earth point. It lies on the outside of the elbow, between the supporting bone and the elbow bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI12',
    gloss: 'Elbow Hollow',
    where: {
      en: 'Bend the elbow: one thumb-width above LI11, on the outer edge of the upper-arm bone.',
      zh: '屈肘，曲池穴上一拇指寬，上臂骨外緣。',
    },
    place: { en: 'Just above the outer elbow', zh: '曲池上一拇指，上臂骨緣' },
    for: { en: 'Aching, numbness or cramp in the elbow and arm.', zh: '肘臂痠痛、麻木、抽筋。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
    quote: {
      han: '在肘大骨外廉陷者中',
      en: 'It lies in the hollow on the outer edge of the big bone at the elbow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI13',
    gloss: 'Arm Five Miles',
    where: {
      en: 'On the outer upper arm, four finger-widths above LI11, on the line up to the shoulder.',
      zh: '上臂外側，曲池穴上四橫指，朝肩部的連線上。',
    },
    place: { en: 'Outer upper arm, above the elbow', zh: '上臂外側，曲池上四橫指' },
    for: { en: 'A cramping, aching elbow and arm.', zh: '肘臂痙攣疼痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
  },
  {
    code: 'LI14',
    gloss: "Arm's Muscle",
    where: {
      en: 'On the outer upper arm, in the dip where the shoulder muscle ends; let the arm hang to feel it.',
      zh: '上臂外側，三角肌下端的凹陷處，手臂自然下垂時容易摸到。',
    },
    place: { en: 'Where the shoulder muscle ends', zh: '上臂外側，三角肌下端' },
    for: { en: 'Shoulder and arm ache, a stiff neck, headache.', zh: '肩臂痛，頸項僵硬，頭痛。' },
    press: {
      en: 'Firm thumb pressure, about a minute each arm.',
      zh: '拇指稍用力按，每臂約一分鐘。',
    },
    quote: {
      han: '在肘上七寸',
      en: 'It lies seven cun above the elbow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI15',
    gloss: 'Shoulder Corner',
    where: {
      en: 'Raise the arm out to the side: in the front hollow that opens below the bony tip of the shoulder.',
      zh: '手臂向側平舉時，肩峰前下方出現的凹陷處。',
    },
    place: { en: 'Front hollow below the shoulder tip', zh: '肩峰前下方凹陷' },
    for: { en: 'Shoulder pain, a stiff arm that is hard to lift.', zh: '肩痛，手臂僵硬難舉。' },
    press: {
      en: 'Firm pressure into the hollow, about a minute each shoulder.',
      zh: '稍用力按入凹陷，每側約一分鐘。',
    },
    quote: {
      han: '在肩端兩骨間',
      en: 'It lies between the two bones at the end of the shoulder.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI16',
    gloss: 'Great Bone',
    where: {
      en: 'On top of the shoulder, in the hollow where the collarbone meets the ridge of the shoulder blade.',
      zh: '肩上，鎖骨外端與肩胛岡之間的凹陷。',
    },
    place: { en: 'Where collarbone meets shoulder blade', zh: '鎖骨外端與肩胛岡間凹陷' },
    for: { en: 'Shoulder pain, an arm that will not lift.', zh: '肩痛，手臂抬不起來。' },
    press: {
      en: 'Moderate fingertip pressure into the hollow, about a minute each side.',
      zh: '以指尖適度按入凹陷，每側約一分鐘。',
    },
    quote: {
      han: '巨骨，在肩端上行兩叉骨間陷者中',
      en: 'Jugu lies on top of the end of the shoulder, in the hollow between the two forked bones.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI17',
    gloss: "Heaven's Cauldron",
    where: {
      en: "On the side of the neck, at the back edge of the long neck muscle, halfway between Adam's-apple level and the collarbone.",
      zh: '頸側，胸鎖乳突肌後緣，喉結高度與鎖骨之間的中點。',
    },
    place: { en: 'Side of the neck, above the collarbone', zh: '頸側，胸鎖乳突肌後緣' },
    for: { en: 'A hoarse voice, sore throat.', zh: '聲音沙啞，喉嚨痛。' },
    press: {
      en: 'Light touch, one side at a time, about a minute.',
      zh: '輕觸，一次只按一側，約一分鐘。',
    },
    caution: {
      en: 'Never press on a pulse, or on both sides of the neck together.',
      zh: '不可按在脈搏上，也不可兩側同時按。',
    },
    quote: {
      han: '天鼎，在缺盆上，直扶突，氣舍後一寸五分',
      en: 'Tianding lies above Quepen, in line with Futu, one and a half cun behind Qishe.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI18',
    gloss: 'Supporting the Prominence',
    where: {
      en: "On the side of the neck, level with the Adam's apple, in the groove between the front and back edges of the long neck muscle.",
      zh: '頸側，與喉結同高，胸鎖乳突肌前後緣之間的淺溝中。',
    },
    place: { en: "Side of neck, level with Adam's apple", zh: '頸側，與喉結同高' },
    for: { en: 'Sore throat, sudden hoarseness, cough.', zh: '喉嚨痛，突然失聲，咳嗽。' },
    press: {
      en: 'Light touch only, one side at a time, about a minute.',
      zh: '只宜輕觸，一次一側，約一分鐘。',
    },
    caution: {
      en: 'The carotid pulse is close: if you feel it, move off. Never both sides.',
      zh: '頸動脈就在附近，摸到脈搏就移開；不可兩側同按。',
    },
    quote: {
      han: '扶突，在人迎後一寸五分',
      en: 'Futu lies one and a half cun behind Renying.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI19',
    gloss: 'Grain Hollow by the Mouth',
    where: {
      en: 'On the upper lip, straight below the outer edge of the nostril, level with the groove under the nose.',
      zh: '上唇，鼻孔外緣正下方，與人中同高。',
    },
    place: { en: 'Upper lip, below the nostril edge', zh: '上唇，鼻孔外緣正下方' },
    for: { en: 'A blocked or runny nose, nosebleed.', zh: '鼻塞，流鼻水，流鼻血。' },
    press: { en: 'Light fingertip touch, about a minute.', zh: '以指尖輕按約一分鐘。' },
    quote: {
      han: '在直鼻孔下俠水溝傍五分',
      en: 'It lies straight below the nostril, five fen beside the groove under the nose.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'LI20',
    gloss: 'Welcome Fragrance',
    where: {
      en: 'Beside the nose, in the smile line, level with the middle of the outer edge of the nostril.',
      zh: '鼻翼外緣中點旁，鼻唇溝中。',
    },
    place: { en: 'Beside the nostril, in the smile line', zh: '鼻翼旁，鼻唇溝中' },
    for: { en: 'A blocked nose, loss of smell, a runny nose.', zh: '鼻塞，嗅覺不靈，流鼻水。' },
    press: {
      en: 'Light fingertip pressure, both sides together, about a minute.',
      zh: '以指尖輕按，兩側同時，約一分鐘。',
    },
    quote: {
      han: '迎香二穴，在禾髎上一寸，鼻孔傍五分，手足陽明之會。治鼻有瘜肉，不聞香臭',
      en: 'Yingxiang, on both sides, lies one cun above Heliao and five fen beside the nostril, where the hand and foot yangming meet. It treats polyps in the nose and a lost sense of smell.',
      source: { han: '《銅人腧穴針灸圖經·卷三》', en: 'Tongren Shuxue Zhenjiu Tujing, book 3' },
    },
  },
];
