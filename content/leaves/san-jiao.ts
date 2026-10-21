import type { LeafCardInput } from './schema';

/** Leaf cards for the TH points, in channel order. */
export const sanJiaoLeaves: readonly LeafCardInput[] = [
  {
    code: 'TH1',
    gloss: 'Surging Pass',
    where: {
      en: 'On the ring finger, beside the outer corner of the nail on the little-finger side.',
      zh: '無名指末節，靠小指一側的指甲角旁。',
    },
    place: { en: 'Ring finger, outer corner of the nail', zh: '無名指甲角，小指側' },
    for: { en: 'Headache; sore throat; red eyes.', zh: '頭痛，咽喉痛，目赤。' },
    press: {
      en: 'A light fingertip touch beside the nail, about a minute each hand.',
      zh: '以指腹輕觸甲角旁，每手約一分鐘。',
    },
    quote: {
      han: '關沖者，金也。在手小指次指之端，去爪甲角如韭葉',
      en: 'Guanchong is metal. It lies at the tip of the finger next to the little finger, a leek leaf’s width from the corner of the nail.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH2',
    gloss: 'Fluid Gate',
    where: {
      en: 'On the back of the hand, at the edge of the web between the ring and little fingers.',
      zh: '手背，無名指與小指之間的指蹼邊緣。',
    },
    place: { en: 'Web between ring and little fingers', zh: '無名指與小指間指蹼' },
    for: { en: 'Headache; ringing ears; sore throat.', zh: '頭痛，耳鳴，咽喉痛。' },
    press: {
      en: 'Gentle finger pressure, about a minute each hand.',
      zh: '以指腹輕柔按壓，每手約一分鐘。',
    },
    quote: {
      han: '腋門者，水也。在小指次指間陷者中',
      en: 'Yemen is water. It lies in the hollow between the little finger and the next.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH3',
    gloss: 'Central Islet',
    where: {
      en: 'On the back of the hand, in the hollow between the ring and little finger bones, just behind the knuckles.',
      zh: '手背，無名指與小指掌骨之間，指根關節後方的凹陷。',
    },
    place: { en: 'Back of hand, behind the ring knuckle', zh: '手背，無名指根關節後' },
    for: {
      en: 'Ringing ears; headache; aching shoulder and arm.',
      zh: '耳鳴，頭痛，肩臂痠痛。',
    },
    press: {
      en: 'Gentle finger pressure, about a minute each hand.',
      zh: '以指腹輕柔按壓，每手約一分鐘。',
    },
    quote: {
      han: '中渚者，木也。在手小指次指本節後陷者中',
      en: 'Zhongzhu is wood. It lies in the hollow behind the base knuckle of the finger next to the little finger.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH4',
    gloss: 'Yang Pool',
    where: {
      en: 'On the back wrist crease, in the dip on the little-finger side of the finger tendons.',
      zh: '腕背橫紋上，手指伸肌腱靠小指一側的凹陷。',
    },
    place: { en: 'Back wrist crease, little-finger side', zh: '腕背橫紋，小指側凹陷' },
    for: {
      en: 'Wrist pain; aching shoulder and arm; ringing ears.',
      zh: '手腕痛，肩臂痛，耳鳴。',
    },
    press: {
      en: 'Light fingertip pressure, not into the joint, about a minute each wrist.',
      zh: '以指尖輕按，勿壓向關節，每側手腕約一分鐘。',
    },
    quote: {
      han: '陽池，一名別陽，在手表上腕上陷者中',
      en: 'Yangchi, also called Bieyang, lies in the hollow on the back of the hand, at the top of the wrist.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH5',
    gloss: 'Outer Pass',
    where: {
      en: 'Three finger-widths above the back wrist crease, between the two forearm bones.',
      zh: '腕背橫紋上三橫指，前臂兩骨之間。',
    },
    place: { en: 'Three fingers above the back wrist', zh: '腕背橫紋上三橫指' },
    for: { en: 'Headache; ringing ears; aching arm.', zh: '頭痛，耳鳴，上肢痠痛。' },
    press: {
      en: 'Light fingertip pressure, about a minute each arm.',
      zh: '以指尖輕按，每側約一分鐘。',
    },
    quote: {
      han: '外關，手少陽絡，在腕後二寸陷者中',
      en: 'Waiguan, the connecting point of the hand shaoyang, lies in the hollow two cun behind the wrist.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH6',
    gloss: 'Branch Ditch',
    where: {
      en: 'Four finger-widths above the back wrist crease, between the two forearm bones.',
      zh: '腕背橫紋上四橫指，前臂兩骨之間。',
    },
    place: { en: 'Four fingers above the back wrist', zh: '腕背橫紋上四橫指' },
    for: {
      en: 'Constipation; pain at the side of the ribs; aching shoulder and arm.',
      zh: '便秘，脅肋痛，肩臂痛。',
    },
    press: {
      en: 'Light fingertip pressure, about a minute each arm.',
      zh: '以指尖輕按，每側約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '支溝者，火也。在腕後三寸，兩骨之間陷者中',
      en: 'Zhigou is fire. It lies three cun behind the wrist, in the hollow between the two bones.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH7',
    gloss: 'Gathering of the Lineage',
    where: {
      en: 'Four finger-widths above the back wrist crease, one finger-width toward the little finger, at the edge of the bone.',
      zh: '腕背橫紋上四橫指，再往小指側一橫指，緊貼尺骨邊緣。',
    },
    place: { en: 'Back forearm, at the edge of the ulna', zh: '腕背上四橫指，尺骨緣' },
    for: { en: 'Ringing ears; hearing loss; aching arm.', zh: '耳鳴，耳聾，上肢疼痛。' },
    press: {
      en: 'Light fingertip pressure, about a minute each arm.',
      zh: '以指尖輕按，每側約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '會宗二穴，在腕後三寸空中一寸',
      en: 'Huizong, one on each arm, lies three cun behind the wrist, in the hollow one cun across.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'TH8',
    gloss: 'Three Yang Connection',
    where: {
      en: 'About five finger-widths above the back wrist crease, between the two forearm bones.',
      zh: '腕背橫紋上約五橫指，前臂兩骨之間。',
    },
    place: { en: 'Five fingers above the back wrist', zh: '腕背橫紋上約五橫指' },
    for: { en: 'Toothache; aching arm; a common cold.', zh: '牙痛，上肢痠痛，感冒。' },
    press: {
      en: 'A light touch on the skin, not into the groove, about a minute each arm.',
      zh: '輕觸皮膚，勿壓入骨縫，每側約一分鐘。',
    },
    caution: {
      en: 'On blood-thinning medicine, ask a clinician first.',
      zh: '服用抗凝血藥者，請先諮詢醫師。',
    },
    quote: {
      han: '三陽絡，在臂上大交脈，支溝上一寸',
      en: 'Sanyangluo lies on the forearm at the great crossing vessel, one cun above Zhigou.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH9',
    gloss: 'Four Rivers',
    where: {
      en: 'On the back of the forearm, about seven finger-widths below the elbow tip, between the two bones.',
      zh: '前臂背側，肘尖下約七橫指，兩骨之間。',
    },
    place: { en: 'Back forearm, below the elbow tip', zh: '前臂背側，肘尖下七橫指' },
    for: {
      en: 'Toothache; one-sided headache; aching, numb arm.',
      zh: '牙痛，偏頭痛，手臂痠麻。',
    },
    press: {
      en: 'Gentle fingertip pressure, about a minute each arm.',
      zh: '以指尖輕柔按壓，每側約一分鐘。',
    },
    quote: {
      han: '四瀆，在肘前五寸外廉陷者中',
      en: 'Sidu lies in the hollow on the outer edge, five cun in front of the elbow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH10',
    gloss: 'Heavenly Well',
    where: {
      en: 'With the elbow bent, in the hollow one thumb-width above the tip of the elbow.',
      zh: '屈肘，肘尖上一拇指寬的凹陷處。',
    },
    place: { en: 'Hollow just above the elbow tip', zh: '肘尖上凹陷' },
    for: {
      en: 'One-sided headache; a weak, aching arm.',
      zh: '偏頭痛，手臂無力痠痛。',
    },
    press: {
      en: 'Light fingertip pressure, not into the joint, about a minute each arm.',
      zh: '以指尖輕按，勿壓向關節，每側約一分鐘。',
    },
    quote: {
      han: '天井者，土也。在肘外大骨之後一寸，兩筋間陷者中，屈肘得之',
      en: 'Tianjing is earth. It lies one cun behind the large bone outside the elbow, in the hollow between two sinews, found with the elbow bent.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH11',
    gloss: 'Clear Cold Deep Pool',
    where: {
      en: 'With the elbow bent, three finger-widths above the tip of the elbow.',
      zh: '屈肘，肘尖上三橫指。',
    },
    place: { en: 'Three fingers above the elbow tip', zh: '肘尖上三橫指' },
    for: { en: 'Aching arm; headache; stiff neck.', zh: '手臂痠痛，頭痛，頸項強痛。' },
    press: {
      en: 'Gentle finger pressure, about a minute each arm.',
      zh: '以指腹輕柔按壓，每側約一分鐘。',
    },
    quote: {
      han: '清冷淵二穴，在肘上二寸，伸肘舉臂取之',
      en: 'Qinglengyuan, one on each arm, lies two cun above the elbow; straighten the elbow and raise the arm to find it.',
      source: { han: '《銅人腧穴針灸圖經·卷下》', en: 'Tongren Shuxue Zhenjiu Tujing, lower book' },
    },
  },
  {
    code: 'TH12',
    gloss: 'Dissolving Waters',
    where: {
      en: 'On the back of the upper arm, midway between the elbow tip and the lower edge of the shoulder muscle.',
      zh: '上臂後側，肘尖與三角肌下緣之間的中點。',
    },
    place: { en: 'Back of the upper arm, midway', zh: '上臂後側中段' },
    for: {
      en: 'Aching shoulder and arm; toothache; stiff neck.',
      zh: '肩臂痠痛，牙痛，頸項強。',
    },
    press: {
      en: 'Gentle finger pressure, no heat, about a minute each arm.',
      zh: '以指腹輕柔按壓，不用熱敷，每側約一分鐘。',
    },
    quote: {
      han: '消濼二穴，在肩下臂外，腋斜肘分下行',
      en: 'Xiaoluo, one on each arm, lies on the outer arm below the shoulder, on the slant that runs down from the armpit to the elbow.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'TH13',
    gloss: 'A Meeting on the Upper Arm',
    where: {
      en: 'On the back of the upper arm, at the lower back edge of the shoulder muscle.',
      zh: '上臂後側，三角肌後下緣。',
    },
    place: { en: 'Back arm, below the shoulder muscle', zh: '上臂後側，三角肌後下緣' },
    for: {
      en: 'Pain of the upper arm and shoulder blade.',
      zh: '上臂及肩胛疼痛。',
    },
    press: {
      en: 'Gentle finger pressure, about a minute each arm.',
      zh: '以指腹輕柔按壓，每側約一分鐘。',
    },
  },
  {
    code: 'TH14',
    gloss: 'Shoulder Hollow',
    where: {
      en: 'Lift the arm out to the side: the hollow that appears behind and below the tip of the shoulder.',
      zh: '手臂向外側抬起時，肩峰後下方出現的凹陷。',
    },
    place: { en: 'Behind and below the shoulder tip', zh: '肩峰後下方凹陷' },
    for: {
      en: 'A heavy shoulder that will not lift; arm pain.',
      zh: '肩重不能舉，手臂疼痛。',
    },
    press: {
      en: 'Gentle finger pressure, about a minute each shoulder.',
      zh: '以指腹輕柔按壓，每側肩約一分鐘。',
    },
    quote: {
      han: '肩髎二穴，在肩端臑上陷中，舉臂取之',
      en: 'Jianliao, one on each side, lies at the end of the shoulder, in the hollow above the upper arm; raise the arm to find it.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'TH15',
    gloss: 'A Heavenly Hollow',
    where: {
      en: 'On the upper back, at the top inner corner of the shoulder blade.',
      zh: '上背部，肩胛骨內上角處。',
    },
    place: { en: 'Top inner corner of the shoulder blade', zh: '肩胛骨內上角' },
    for: {
      en: 'Aching shoulder and arm; stiff neck.',
      zh: '肩臂痠痛，頸項強痛。',
    },
    press: {
      en: 'Gentle fingertip pressure on the surface, no elbows or knuckles, about a minute.',
      zh: '以指尖輕按表面，勿用手肘或指節，約一分鐘。',
    },
  },
  {
    code: 'TH16',
    gloss: 'Heavenly Window',
    where: {
      en: 'On the side of the neck, behind and below the bone behind the ear, level with the jaw angle, at the back of the long neck muscle.',
      zh: '頸側，耳後乳突後下方，與下頜角同高，胸鎖乳突肌後緣。',
    },
    place: { en: 'Side of the neck, level with jaw angle', zh: '頸側，與下頜角同高' },
    for: {
      en: 'Stiff neck; blocked nose; sore throat.',
      zh: '頸項強痛，鼻塞，咽喉痛。',
    },
    press: {
      en: 'Feather-light fingertip touch, one side at a time, about a minute.',
      zh: '以指尖極輕觸碰，一次只按一側，約一分鐘。',
    },
    caution: {
      en: 'Never press on a pulse or both sides at once; in pregnancy, ask first.',
      zh: '切勿按在脈動上或兩側同按；孕期請先諮詢。',
    },
    quote: {
      han: '天牖，在頸筋間，缺盆上，天容後，天柱前，完骨後，髮際上',
      en: 'Tianyou lies between the sinews of the neck, above the hollow over the collarbone, behind Tianrong, in front of Tianzhu, behind Wangu, above the hairline.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH17',
    gloss: 'The Wind Screen',
    where: {
      en: 'Behind the earlobe, in the hollow between the bone behind the ear and the jaw angle; clearer with the mouth open.',
      zh: '耳垂後方，乳突與下頜角之間的凹陷，張口時更明顯。',
    },
    place: { en: 'Behind the earlobe', zh: '耳垂後凹陷' },
    for: { en: 'Ringing ears; toothache; a swollen cheek.', zh: '耳鳴，牙痛，頰腫。' },
    press: {
      en: 'Feather-light fingertip touch, no nails, about a minute each side.',
      zh: '以指尖極輕觸碰，勿用指甲，每側約一分鐘。',
    },
    quote: {
      han: '翳風，在耳後陷者中，按之引耳中',
      en: 'Yifeng lies in the hollow behind the ear; pressing it draws a feeling into the ear.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH18',
    gloss: 'The Vessel of Spasms',
    where: {
      en: 'Behind the ear, on the bone, a third of the way up the ear’s back curve from the hollow behind the earlobe.',
      zh: '耳後乳突上，沿耳廓後緣從耳垂後凹陷往上約三分之一處。',
    },
    place: { en: 'Behind the ear, lower third', zh: '耳後，耳廓後緣下三分之一' },
    for: { en: 'Headache; ringing ears.', zh: '頭痛，耳鳴。' },
    press: {
      en: 'A light fingertip touch, about a minute each side.',
      zh: '以指尖輕觸，每側約一分鐘。',
    },
    quote: {
      han: '瘈脈二穴，一名資脈，在耳本後雞足青絡脈',
      en: 'Chimai, one on each side, also called Zimai, lies behind the root of the ear, on the blue vein that branches like a chicken’s foot.',
      source: { han: '《銅人腧穴針灸圖經·卷三》', en: 'Tongren Shuxue Zhenjiu Tujing, book 3' },
    },
  },
  {
    code: 'TH19',
    gloss: 'Skull Rest',
    where: {
      en: 'Behind the ear, two thirds of the way up the ear’s back curve from the hollow behind the earlobe.',
      zh: '耳後，沿耳廓後緣從耳垂後凹陷往上約三分之二處。',
    },
    place: { en: 'Behind the ear, upper third', zh: '耳後，耳廓後緣上三分之一' },
    for: { en: 'Headache; ringing ears.', zh: '頭痛，耳鳴。' },
    press: {
      en: 'Feather-light fingertip touch, about a minute each side.',
      zh: '以指尖極輕觸碰，每側約一分鐘。',
    },
    caution: { en: 'Not on a child’s head.', zh: '不可在孩童頭部按壓。' },
    quote: {
      han: '顱息，在耳後間青絡脈',
      en: 'Luxi lies behind the ear, among the bluish vessels.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH20',
    gloss: 'Horn and Grandson',
    where: {
      en: 'Fold the ear forward: the point is just above its tip, inside the hairline.',
      zh: '將耳廓向前摺，耳尖正上方的髮際內。',
    },
    place: { en: 'Just above the tip of the ear', zh: '耳尖正上方髮際內' },
    for: { en: 'Toothache; stiff neck; a swollen cheek.', zh: '牙痛，頸項強，頰腫。' },
    press: {
      en: 'A light fingertip touch through parted hair, about a minute each side.',
      zh: '撥開頭髮，以指尖輕觸，每側約一分鐘。',
    },
    quote: {
      han: '角孫，在耳廓中間，開口有孔',
      en: 'Jiaosun lies at the middle of the ear’s rim, where an opening forms when the mouth opens.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH21',
    gloss: 'Ear Gate',
    where: {
      en: 'In front of the ear, at the notch above the small flap, in the dip that opens when the mouth opens.',
      zh: '耳前，耳屏上方切跡前，張口時出現的凹陷。',
    },
    place: { en: 'In front of the ear, above the flap', zh: '耳前，耳屏上切跡前' },
    for: { en: 'Ear pain; ringing ears; toothache.', zh: '耳痛，耳鳴，牙痛。' },
    press: {
      en: 'Feather-light fingertip touch, about a minute each side.',
      zh: '以指尖極輕觸碰，每側約一分鐘。',
    },
    caution: {
      en: 'Never into the ear canal; not with ear discharge or infection.',
      zh: '切勿伸入耳道；耳朵流膿或感染時不按。',
    },
    quote: {
      han: '耳門，在耳前起肉當耳缺者',
      en: 'Ermen lies in front of the ear, on the raised flesh at the notch of the ear.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'TH22',
    gloss: 'Ear Harmony Crevice',
    where: {
      en: 'In front of the top of the ear, at the back edge of the temple hairline, just behind the pulse you feel there.',
      zh: '耳根上部前方，鬢髮後緣，可觸及的脈動稍後方。',
    },
    place: { en: 'Temple hairline, in front of the ear', zh: '耳前鬢髮後緣' },
    for: { en: 'Headache; ringing ears; a swollen cheek.', zh: '頭痛，耳鳴，頰腫。' },
    press: {
      en: 'A light fingertip touch, about a minute each side.',
      zh: '以指尖輕觸，每側約一分鐘。',
    },
    caution: {
      en: 'Never press firmly on the pulse at the temple.',
      zh: '切勿用力按壓鬢角的脈動處。',
    },
    quote: {
      han: '和髎二穴，在耳前兌髮下橫動脈，手少陽脈氣所發',
      en: 'Heliao, one on each side, lies in front of the ear below the sideburn, at the pulse that runs across there; the hand shaoyang’s qi emerges here.',
      source: {
        han: '《銅人腧穴針灸圖經·卷中》',
        en: 'Tongren Shuxue Zhenjiu Tujing, middle book',
      },
    },
  },
  {
    code: 'TH23',
    gloss: 'Silken Bamboo Hollow',
    where: {
      en: 'In the small hollow at the outer end of the eyebrow.',
      zh: '眉梢外端的小凹陷處。',
    },
    place: { en: 'Outer end of the eyebrow', zh: '眉梢凹陷' },
    for: {
      en: 'Headache; red, sore eyes; twitching eyelids.',
      zh: '頭痛，目赤腫痛，眼瞼跳動。',
    },
    press: {
      en: 'Feather-light fingertip touch, about a minute each side.',
      zh: '以指尖極輕觸碰，每側約一分鐘。',
    },
    caution: { en: 'Stay off the eyeball and eyelids.', zh: '避開眼球與眼瞼。' },
    quote: {
      han: '絲竹空二穴，一名目髎，在眉後陷中，足少陽脈氣所發',
      en: 'Sizhukong, one on each side, also called Muliao, lies in the hollow behind the eyebrow; the foot shaoyang’s qi emerges here.',
      source: { han: '《銅人腧穴針灸圖經·卷三》', en: 'Tongren Shuxue Zhenjiu Tujing, book 3' },
    },
  },
];
