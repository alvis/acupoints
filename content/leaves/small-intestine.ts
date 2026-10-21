import type { LeafCardInput } from './schema';

/** Leaf cards for the SI points, in channel order. */
export const smallIntestineLeaves: readonly LeafCardInput[] = [
  {
    code: 'SI1',
    gloss: 'Lesser Marsh',
    where: {
      en: 'On the little finger, beside the corner of the nail on the outer side, away from the ring finger.',
      zh: '小指外側（遠離無名指一側），指甲角旁。',
    },
    place: {
      en: 'Beside the little fingernail',
      zh: '小指甲外側角旁',
    },
    for: { en: 'Low milk supply, headache, sore throat.', zh: '乳汁不足，頭痛，咽喉腫痛。' },
    press: {
      en: 'Steady, gentle fingertip-pad pressure, one minute each hand.',
      zh: '以指腹輕而穩地按，每手一分鐘。',
    },
    caution: {
      en: 'Skip over hangnails or broken skin by the nail.',
      zh: '指甲旁有倒刺或破皮時不按。',
    },
    quote: {
      han: '少澤者，金也。一名小吉，在手小指之端，去爪甲下一分陷者中',
      en: 'Shaoze, the metal point, also called Xiaoji, lies at the tip of the little finger, one fen below the nail, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI2',
    gloss: 'Front Valley',
    where: {
      en: 'With a loose fist, on the outer edge of the hand, in the dip just in front of the little finger’s base knuckle.',
      zh: '輕握拳，手掌外側緣，小指根部關節前的凹陷。',
    },
    place: {
      en: 'In front of the little-finger knuckle',
      zh: '小指根關節前凹陷',
    },
    for: { en: 'Headache, ringing ears, sore throat.', zh: '頭痛，耳鳴，咽喉腫痛。' },
    press: {
      en: 'Thumb pad, slow circles, one minute each hand.',
      zh: '拇指腹慢慢打圈，每手一分鐘。',
    },
    quote: {
      han: '前谷者，水也。在手小指外側，本節前陷者中',
      en: 'Qiangu, the water point, lies on the outer side of the little finger, in the hollow in front of the base joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI3',
    gloss: 'Behind the Stream',
    where: {
      en: 'With a loose fist, on the outer edge of the hand, at the end of the palm crease just behind the little finger’s knuckle.',
      zh: '輕握拳，手掌外側緣，小指根部關節後方的掌紋盡頭。',
    },
    place: {
      en: 'Behind the little-finger knuckle',
      zh: '小指根關節後掌紋端',
    },
    for: { en: 'Stiff, aching neck and head; low back pain.', zh: '頭頸強痛，腰背痛。' },
    press: {
      en: 'Thumb pad, slow circles, one minute each hand.',
      zh: '拇指腹慢慢打圈，每手一分鐘。',
    },
    quote: {
      han: '後溪者，木也。在手小指外側，本節後陷者中',
      en: 'Houxi, the wood point, lies on the outer side of the little finger, in the hollow behind the base joint.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI4',
    gloss: 'Wrist Bone',
    where: {
      en: 'On the outer edge of the hand, in the dip between the end of the little-finger hand bone and the wrist bones.',
      zh: '手掌外側緣，小指掌骨底與腕骨之間的凹陷。',
    },
    place: {
      en: 'Hand edge, just before the wrist',
      zh: '手外側緣，腕前凹陷',
    },
    for: { en: 'Wrist pain, cramping fingers, a stiff neck.', zh: '腕痛，手指拘攣，頸項強痛。' },
    press: {
      en: 'Hold between thumb and index pads, slow circles, one minute each hand.',
      zh: '拇指與食指指腹夾住，慢慢打圈，每手一分鐘。',
    },
    quote: {
      han: '腕骨，在手外側腕前，起骨下陷者中',
      en: 'Wangu lies on the outer side of the hand in front of the wrist, in the hollow below the raised bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI5',
    gloss: 'Yang Valley',
    where: {
      en: 'On the outer wrist, little-finger side, in the dip between the knob of the forearm bone and the wrist bone.',
      zh: '手腕外側小指側，前臂骨突與腕骨之間的凹陷。',
    },
    place: {
      en: 'In the outer wrist hollow',
      zh: '腕外側小指側凹陷',
    },
    for: {
      en: 'Outer wrist and arm pain, ringing ears, toothache.',
      zh: '腕臂外側痛，耳鳴，牙痛。',
    },
    press: {
      en: 'Two finger pads, slow circles, one minute each wrist.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '陽谷者，火也。在手外側腕中，兌骨下陷者中',
      en: 'Yanggu, the fire point, lies in the outer wrist, in the hollow below the pointed bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI6',
    gloss: 'Nourishing the Aged',
    where: {
      en: 'Turn the palm toward your chest: in the gap that opens beside the bony knob on the back of the wrist, little-finger side.',
      zh: '掌心轉向胸口，手腕背面小指側骨突旁張開的縫隙中。',
    },
    place: {
      en: 'Beside the knob of the outer wrist',
      zh: '腕背小指側骨突旁',
    },
    for: {
      en: 'Blurred vision, aching shoulder and arm, low back pain.',
      zh: '視物模糊，肩臂痠痛，腰痛。',
    },
    press: {
      en: 'One finger pad, slow circles, one minute each wrist.',
      zh: '一指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '養老，手太陽，在手踝骨上一空，腕後一寸陷者中',
      en: 'Yanglao, on the hand Taiyang, lies in an opening above the wrist bone, in the hollow one cun behind the wrist.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI7',
    gloss: 'Branch to the Main Line',
    where: {
      en: 'On the little-finger edge of the forearm, a little below the midpoint between wrist and elbow.',
      zh: '前臂小指側邊緣，腕與肘連線中點稍下方。',
    },
    place: {
      en: 'Mid-forearm, little-finger edge',
      zh: '前臂小指側中段',
    },
    for: { en: 'Headache, stiff neck, aching elbow and arm.', zh: '頭痛，頸項強，肘臂痠痛。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each arm.',
      zh: '兩指指腹慢慢打圈，每臂一分鐘。',
    },
    quote: {
      han: '支正二穴，在腕後五寸，別走少陰',
      en: 'Zhizheng lies five cun behind the wrist, where a branch leaves for the Shaoyin.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'SI8',
    gloss: 'Small Sea',
    where: {
      en: 'Elbow slightly bent: in the groove between the point of the elbow and the bony knob on its inner side.',
      zh: '微屈肘，肘尖與肘內側骨突之間的凹溝。',
    },
    place: {
      en: 'In the funny-bone groove of the elbow',
      zh: '肘尖與肘內骨突之間',
    },
    for: { en: 'Elbow and arm pain, numbness down the arm.', zh: '肘臂疼痛，手臂麻木。' },
    press: {
      en: 'Light finger pad, one minute each arm; ease off if it tingles toward the little finger.',
      zh: '指腹輕按，每臂一分鐘；麻感竄向小指即放輕。',
    },
    caution: {
      en: 'The funny-bone nerve lies in this groove: gentle pressure only, never hard.',
      zh: '此溝內是尺神經（麻筋），只宜輕按，切勿用力。',
    },
    quote: {
      han: '小海者，土也。在肘內大骨外，去肘端五分陷者中，屈肘乃得之',
      en: 'Xiaohai, the earth point, lies outside the large bone of the inner elbow, half a cun from the elbow tip, in the hollow; bend the elbow to find it.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI9',
    gloss: 'Shoulder’s Steadfastness',
    where: {
      en: 'With the arm at your side, a thumb-width above the end of the armpit crease at the back.',
      zh: '手臂自然下垂，腋後紋頭上一拇指寬。',
    },
    place: {
      en: 'Above the back armpit crease',
      zh: '腋後紋頭上一拇指',
    },
    for: { en: 'Shoulder and arm pain, ringing ears.', zh: '肩臂疼痛，耳鳴。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each side.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '肩貞，在肩曲胛下，兩骨解間',
      en: 'Jianzhen lies below the curve of the shoulder blade, in the gap where two bones part.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI10',
    gloss: 'Upper Arm’s Transport',
    where: {
      en: 'Straight up from the end of the back armpit crease, in the dip under the ridge of the shoulder blade.',
      zh: '腋後紋頭直上，肩胛骨棘下緣的凹陷。',
    },
    place: {
      en: 'Above the back armpit, under the ridge',
      zh: '腋後紋直上，肩胛棘下',
    },
    for: { en: 'Shoulder and arm pain, trouble lifting the arm.', zh: '肩臂痛，抬臂困難。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each side.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '臑腧二穴，在肩髎後大骨下，胛上廉陷中',
      en: 'Naoshu lies behind Jianliao, below the large bone, in the hollow at the upper edge of the shoulder blade.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'SI11',
    gloss: 'Celestial Ancestor',
    where: {
      en: 'In the middle of the shoulder blade, in the hollow below its ridge.',
      zh: '肩胛骨正中，骨棘下方的凹陷。',
    },
    place: {
      en: 'Centre of the shoulder blade',
      zh: '肩胛骨正中凹陷',
    },
    for: { en: 'Shoulder-blade ache, upper-back pain.', zh: '肩胛痛，肩背痛。' },
    press: {
      en: 'Two finger pads or a thumb, slow circles, one minute each side.',
      zh: '兩指指腹或拇指慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '天宗，在秉風後大骨下陷者中',
      en: 'Tianzong lies behind Bingfeng, in the hollow below the large bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI12',
    gloss: 'Grasping the Wind',
    where: {
      en: 'Above the ridge of the shoulder blade, straight above Tianzong (SI11), where a dip shows as the arm lifts.',
      zh: '肩胛骨棘上方，天宗直上，舉臂時出現凹陷。',
    },
    place: {
      en: 'Above the shoulder-blade ridge',
      zh: '肩胛棘上，天宗直上',
    },
    for: {
      en: 'Shoulder-blade pain, a numb aching arm, trouble raising it.',
      zh: '肩胛痛，上肢痠麻，舉臂困難。',
    },
    press: {
      en: 'Two finger pads, slow circles, one minute each side.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '秉風二穴，在肩上小髃後，舉臂有空',
      en: 'Bingfeng lies on top of the shoulder behind the small shoulder bone; lift the arm and a hollow opens.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'SI13',
    gloss: 'Curved Wall',
    where: {
      en: 'At the inner end of the hollow above the shoulder-blade ridge, toward the spine.',
      zh: '肩胛骨棘上方凹窩的內側端，靠近脊柱。',
    },
    place: {
      en: 'Above the ridge, toward the spine',
      zh: '肩胛棘上窩內側端',
    },
    for: { en: 'Aching shoulder blade and upper back.', zh: '肩胛及上背痠痛。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each side.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    quote: {
      han: '曲垣，在肩中央曲甲陷者中',
      en: 'Quyuan lies in the middle of the shoulder, in the hollow of the curved blade.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI14',
    gloss: 'Outer Shu of the Shoulder',
    where: {
      en: 'On the upper back, four finger-widths out from the spine, just below the level of the big bump at the base of the neck.',
      zh: '上背部，頸根大骨突稍下方的水平，脊柱旁開四橫指。',
    },
    place: {
      en: 'Upper back, four fingers from the spine',
      zh: '上背，脊旁四橫指',
    },
    for: { en: 'Shoulder and back pain, a stiff neck.', zh: '肩背痛，頸項強。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each side.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '肩外俞，在肩胛上廉，去脊三寸陷者中',
      en: 'Jianwaishu lies at the upper edge of the shoulder blade, three cun from the spine, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI15',
    gloss: 'Central Shoulder Transport',
    where: {
      en: 'Level with the big bump at the base of the neck, three finger-widths out to either side.',
      zh: '與頸根大骨突同高，旁開三橫指。',
    },
    place: {
      en: 'Base of the neck, three fingers out',
      zh: '頸根大骨突旁三橫指',
    },
    for: { en: 'Shoulder and back pain, cough.', zh: '肩背痛，咳嗽。' },
    press: {
      en: 'Two finger pads, slow circles, one minute each side.',
      zh: '兩指指腹慢慢打圈，每側一分鐘。',
    },
    caution: {
      en: 'The lungs lie beneath: gentle pressure only, never hard or sharp.',
      zh: '下方是肺，只宜輕按，切勿用力。',
    },
    quote: {
      han: '肩中俞，在肩胛內廉，去脊二寸陷者中',
      en: 'Jianzhongshu lies at the inner edge of the shoulder blade, two cun from the spine, in the hollow.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI16',
    gloss: 'Heaven’s Window',
    where: {
      en: 'On the side of the neck, level with the Adam’s apple, just behind the back edge of the long neck muscle.',
      zh: '頸側，與喉結同高，頸部斜行大肌的後緣。',
    },
    place: {
      en: 'Side of the neck, by the Adam’s apple',
      zh: '頸側，與喉結同高',
    },
    for: { en: 'Ringing ears, sore throat, a stiff neck.', zh: '耳鳴，咽喉腫痛，頸項強痛。' },
    press: {
      en: 'Light touch on the muscle, one side at a time, about a minute.',
      zh: '輕觸肌肉，一次一側，約一分鐘。',
    },
    caution: {
      en: 'The carotid artery lies near: if you feel a beat, move off it.',
      zh: '附近有頸動脈，摸到脈動即移開。',
    },
    quote: {
      han: '天窗，一名窗籠，在曲頰下，扶突後，動脈應手陷者中',
      en: 'Tianchuang, also called Chuanglong, lies below the curve of the jaw, behind Futu, in the hollow where a pulse meets the hand.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI17',
    gloss: 'Heavenly Countenance',
    where: {
      en: 'Just behind the angle of the jaw, in the dip in front of the long neck muscle.',
      zh: '下頜角後方，頸部斜行大肌前緣的凹陷。',
    },
    place: {
      en: 'Behind the angle of the jaw',
      zh: '下頜角後方',
    },
    for: { en: 'Ringing ears, a sore swollen throat.', zh: '耳鳴，咽喉腫痛。' },
    press: {
      en: 'Light touch, one side at a time, about a minute.',
      zh: '輕觸，一次一側，約一分鐘。',
    },
    caution: {
      en: 'Large neck vessels lie close: if you feel a beat, move off it.',
      zh: '附近有頸部大血管，摸到脈動即移開。',
    },
    quote: {
      han: '天容，在耳曲頰後',
      en: 'Tianrong lies behind the curve of the jaw below the ear.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'SI18',
    gloss: 'Cheekbone Hollow',
    where: {
      en: 'Straight below the outer corner of the eye, in the dip under the cheekbone.',
      zh: '外眼角直下，顴骨下緣的凹陷。',
    },
    place: {
      en: 'Under the cheekbone, below the eye',
      zh: '外眼角直下，顴骨下緣',
    },
    for: { en: 'Facial pain, toothache, twitching eyelids.', zh: '面痛，牙痛，眼皮跳動。' },
    press: {
      en: 'Gentle finger pad, small circles, one minute each side.',
      zh: '指腹輕柔打小圈，每側一分鐘。',
    },
    quote: {
      han: '顴髎二穴，在面頄骨下廉，兌骨端陷中',
      en: 'Quanliao lies at the lower edge of the cheekbone, in the hollow at the end of the pointed bone.',
      source: { han: '《銅人腧穴針灸圖經·卷三》', en: 'Tongren Shuxue Zhenjiu Tujing, book 3' },
    },
  },
  {
    code: 'SI19',
    gloss: 'Listening Palace',
    where: {
      en: 'In front of the small flap of the ear, in the dip that opens when you open your mouth.',
      zh: '耳屏前方，張口時出現的凹陷。',
    },
    place: {
      en: 'In front of the ear flap',
      zh: '耳屏前方凹陷',
    },
    for: { en: 'Ringing ears, dull hearing, toothache.', zh: '耳鳴，聽力減退，牙痛。' },
    press: {
      en: 'Mouth open, gentle finger pads, one minute each side.',
      zh: '張口，指腹輕按，每側一分鐘。',
    },
    caution: {
      en: 'Not while an ear is draining or painful.',
      zh: '耳朵流膿或疼痛時不按。',
    },
    quote: {
      han: '聽宮，在耳中，珠子大，明如赤小豆',
      en: 'Tinggong lies at the ear, by a bead-sized spot as bright as a small red bean.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
