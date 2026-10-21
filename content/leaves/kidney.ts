import type { LeafCardInput } from './schema';

/** Leaf cards for the KI points, in channel order. */
export const kidneyLeaves: readonly LeafCardInput[] = [
  {
    code: 'KI1',
    gloss: 'Gushing Spring',
    where: {
      en: 'On the sole, in the dip that forms when the toes curl, about a third of the way from the toe base to the heel.',
      zh: '足底，腳趾蜷曲時出現的凹陷，約在趾根至腳跟連線的前三分之一處。',
    },
    place: { en: 'Sole, in the dip as the toes curl', zh: '足底，蜷趾時的凹陷' },
    for: { en: 'Headache; dizziness; hot soles.', zh: '頭痛，頭暈，足心發熱。' },
    press: {
      en: 'Gentle thumb pressure, about a minute, then the other foot.',
      zh: '以拇指指腹輕柔按壓約一分鐘，再換另一隻腳。',
    },
    caution: {
      en: 'With diabetes, numb feet or pregnancy, ask a practitioner first.',
      zh: '糖尿病、足部麻木或懷孕者，請先諮詢醫師。',
    },
    quote: {
      han: '涌泉者，水也。一名地沖，在足心陷者中，屈足卷指宛宛中',
      en: 'Yongquan is water, also called Dichong. It lies in the hollow at the centre of the sole, in the dip that forms when the foot bends and the toes curl.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI2',
    gloss: 'Blazing Valley',
    where: {
      en: 'On the inner edge of the foot, below the bony knob in front of the ankle, where the top skin meets the sole.',
      zh: '足內側緣，內踝前下方骨性隆起的下方，腳背與腳底膚色交界處。',
    },
    place: { en: 'Inner foot edge, below the bony knob', zh: '足內緣，骨性隆起下方' },
    for: {
      en: 'Sore throat; irregular periods; sore, swollen feet.',
      zh: '咽喉腫痛，月經不調，足部腫痛。',
    },
    press: {
      en: 'Gentle finger pressure, about a minute, then the other foot.',
      zh: '以指腹輕柔按壓約一分鐘，再換另一隻腳。',
    },
    quote: {
      han: '然谷者，火也。一名龍淵，在足內踝前起大骨下陷者中',
      en: 'Rangu is fire, also called Longyuan. It lies in the hollow below the large bone that rises in front of the inner ankle.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI3',
    gloss: 'Great Stream',
    where: {
      en: 'In the hollow between the inner ankle bone and the Achilles tendon.',
      zh: '內踝尖與跟腱之間的凹陷處。',
    },
    place: { en: 'Between inner ankle and Achilles tendon', zh: '內踝尖與跟腱之間' },
    for: { en: 'Ringing ears; low-back ache; poor sleep.', zh: '耳鳴，腰痛，失眠。' },
    press: {
      en: 'Gentle finger pressure in the hollow, about a minute each side.',
      zh: '以指腹在凹陷處輕柔按壓，每側約一分鐘。',
    },
    quote: {
      han: '太溪者，土也。在足內踝後跟骨上動脈陷者中',
      en: 'Taixi is earth. It lies behind the inner ankle, above the heel bone, in the hollow where a pulse beats.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI4',
    gloss: 'Great Bell',
    where: {
      en: 'Behind and below the inner ankle bone, in the dip just in front of where the Achilles tendon meets the heel.',
      zh: '內踝後下方，跟腱附著於腳跟處前方的凹陷。',
    },
    place: { en: 'Behind and below the inner ankle', zh: '內踝後下方，跟腱前' },
    for: { en: 'Heel pain; a stiff, aching back; constipation.', zh: '足跟痛，腰脊強痛，便秘。' },
    press: {
      en: 'Gentle finger pressure, not against the tendon, about a minute each side.',
      zh: '以指腹輕按，勿頂向跟腱，每側約一分鐘。',
    },
    quote: {
      han: '大鍾二穴，在足跟後衝中，走太陽，足少陰絡',
      en: 'Dazhong, one on each side, lies in the hollow behind the heel; it is the connecting point of the foot shaoyin and runs to the taiyang.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'KI5',
    gloss: 'Water Spring',
    where: {
      en: 'One thumb-width straight below the hollow behind the inner ankle, on the inner side of the heel bone.',
      zh: '內踝後凹陷直下一拇指寬，跟骨內側。',
    },
    place: { en: 'Inner heel, below the ankle hollow', zh: '跟骨內側，內踝後凹陷下' },
    for: {
      en: 'Painful or irregular periods; difficult urination.',
      zh: '痛經，月經不調，小便不利。',
    },
    press: {
      en: 'Gentle finger pressure, about a minute, then the other foot.',
      zh: '以指腹輕柔按壓約一分鐘，再換另一隻腳。',
    },
    quote: {
      han: '水泉二穴，少陰郄，去太谿下一寸',
      en: 'Shuiquan, one on each side, is the cleft point of the shaoyin and lies one cun below Taixi.',
      source: { han: '《銅人腧穴針灸圖經·卷五》', en: 'Tongren Shuxue Zhenjiu Tujing, book 5' },
    },
  },
  {
    code: 'KI6',
    gloss: 'Shining Sea',
    where: {
      en: 'In the hollow straight below the tip of the inner ankle bone.',
      zh: '內踝尖正下方的凹陷處。',
    },
    place: { en: 'Below the tip of the inner ankle', zh: '內踝尖正下方' },
    for: { en: 'Poor sleep; a dry, sore throat; painful periods.', zh: '失眠，咽乾咽痛，痛經。' },
    press: {
      en: 'Gentle finger pressure, about a minute each side.',
      zh: '以指腹輕柔按壓，每側約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '照海，陰蹺脈所生，在足內踝下一寸',
      en: 'Zhaohai, where the yin qiao vessel arises, lies one cun below the inner ankle.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI7',
    gloss: 'Returning Flow',
    where: {
      en: 'Three finger-widths above the hollow behind the inner ankle, just in front of the Achilles tendon.',
      zh: '內踝後凹陷上三橫指，跟腱前緣。',
    },
    place: { en: 'Above the ankle, in front of the tendon', zh: '內踝後上三橫指，跟腱前' },
    for: { en: 'Night sweats; swelling; bloating.', zh: '盜汗，水腫，腹脹。' },
    press: {
      en: 'Light fingertip pressure in front of the tendon, about a minute each leg.',
      zh: '在跟腱前方以指尖輕按，每條腿約一分鐘。',
    },
    quote: {
      han: '複溜者，金也。一名伏白，一名昌陽，在足內踝上二寸陷者中',
      en: 'Fuliu is metal, also called Fubai and Changyang. It lies in the hollow two cun above the inner ankle.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI8',
    gloss: 'Crossing and Trust',
    where: {
      en: 'Three finger-widths above the inner ankle, just behind the inner edge of the shin bone.',
      zh: '內踝上三橫指，脛骨內側緣後方。',
    },
    place: { en: 'Above the ankle, behind the shin bone', zh: '內踝上，脛骨內緣後方' },
    for: {
      en: 'Painful periods; belly ache; inner-knee pain.',
      zh: '痛經，腹痛，膝內側疼痛。',
    },
    press: {
      en: 'Lighter than most: fingertip touch, about a minute each leg.',
      zh: '比其他穴位更輕，以指尖輕觸，每條腿約一分鐘。',
    },
    caution: {
      en: 'In pregnancy or with circulation problems, ask a practitioner first.',
      zh: '孕期或有循環問題者，請先諮詢醫師。',
    },
    quote: {
      han: '交信，在足內踝上二寸，少陰前，太陰後，筋骨間',
      en: 'Jiaoxin lies two cun above the inner ankle, in front of the shaoyin and behind the taiyin, between sinew and bone.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI9',
    gloss: 'Building Firm, Welcoming a Guest',
    where: {
      en: 'On the inner calf, about seven finger-widths above the hollow behind the ankle, where the calf muscle tapers.',
      zh: '小腿內側，內踝後凹陷上約七橫指，小腿肚下緣漸收處。',
    },
    place: { en: 'Inner calf, where the calf tapers', zh: '小腿內側，小腿肚下緣' },
    for: { en: 'Inner calf pain; vomiting.', zh: '小腿內側疼痛，嘔吐。' },
    press: {
      en: 'Light fingertip pressure, about a minute each leg.',
      zh: '以指尖輕按，每條腿約一分鐘。',
    },
    quote: {
      han: '築賓二穴，在內踝上腨分中',
      en: 'Zhubin, one on each side, lies above the inner ankle, where the calf muscle parts.',
      source: { han: '《銅人腧穴針灸圖經·卷下》', en: 'Tongren Shuxue Zhenjiu Tujing, lower book' },
    },
  },
  {
    code: 'KI10',
    gloss: 'Yin Valley',
    where: {
      en: 'With the knee bent, at the inner end of the crease behind the knee, between two tendons.',
      zh: '屈膝，膝後橫紋內側端，兩條肌腱之間。',
    },
    place: { en: 'Inner knee crease, between two tendons', zh: '膕橫紋內側端，兩筋之間' },
    for: {
      en: 'Inner knee and thigh pain; difficult urination.',
      zh: '膝股內側疼痛，小便不利。',
    },
    press: {
      en: 'Gentle finger pressure, no digging, about a minute each knee.',
      zh: '以指腹輕按，勿深掘，每側膝約一分鐘。',
    },
    quote: {
      han: '陰谷者，水也。在膝下內輔骨後，大筋之下，小筋之上，按之應手，屈膝得之',
      en: 'Yingu is water. It lies below the knee, behind the inner bone, below the large sinew and above the small one; it answers the pressing hand and is found with the knee bent.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI11',
    gloss: 'Horizontal Bone',
    where: {
      en: 'Just above the top edge of the pubic bone, half a thumb-width out from the midline.',
      zh: '恥骨上緣之上，前正中線旁開半拇指寬。',
    },
    place: { en: 'Above the pubic bone, near the midline', zh: '恥骨上緣，正中線旁' },
    for: { en: 'Lower belly ache; difficult urination.', zh: '小腹脹痛，小便不利。' },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: {
      han: '橫骨，一名下極，在大赫下一寸',
      en: 'Henggu, also called Xiaji, lies one cun below Dahe.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI12',
    gloss: 'Great Prominence',
    where: {
      en: 'One thumb-width above the top of the pubic bone, half a thumb-width out from the midline.',
      zh: '恥骨上緣上一拇指寬，前正中線旁開半拇指寬。',
    },
    place: { en: 'Thumb above pubic bone, near midline', zh: '恥骨上一拇指寬，正中線旁' },
    for: {
      en: 'Irregular or painful periods; vaginal discharge.',
      zh: '月經不調，痛經，帶下。',
    },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '大赫，一名陰維，一名陰關，在氣穴下一寸',
      en: 'Dahe, also called Yinwei and Yinguan, lies one cun below Qixue.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI13',
    gloss: 'A Cave for Qi',
    where: {
      en: 'Four finger-widths below the navel, half a thumb-width out from the midline.',
      zh: '肚臍下四橫指，前正中線旁開半拇指寬。',
    },
    place: { en: 'Four fingers below navel, near midline', zh: '臍下四橫指，正中線旁' },
    for: {
      en: 'Irregular periods; difficult urination; diarrhea.',
      zh: '月經不調，小便不利，腹瀉。',
    },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: {
      han: '氣穴，一名胞門，一名子戶，在四滿下一寸',
      en: 'Qixue, also called Baomen and Zihu, lies one cun below Siman.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI14',
    gloss: 'Four Fullness',
    where: {
      en: 'Three finger-widths below the navel, half a thumb-width out from the midline.',
      zh: '肚臍下三橫指，前正中線旁開半拇指寬。',
    },
    place: { en: 'Three fingers below navel, near midline', zh: '臍下三橫指，正中線旁' },
    for: {
      en: 'Belly ache; constipation; irregular periods.',
      zh: '腹痛，便秘，月經不調。',
    },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: {
      han: '四滿，一名髓府，在中注下一寸',
      en: 'Siman, also called Suifu, lies one cun below Zhongzhu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI15',
    gloss: 'Central Infusion',
    where: {
      en: 'One thumb-width below the navel, half a thumb-width out from the midline.',
      zh: '肚臍下一拇指寬，前正中線旁開半拇指寬。',
    },
    place: { en: 'Thumb-width below navel, near midline', zh: '臍下一拇指寬，正中線旁' },
    for: {
      en: 'Belly ache; constipation or diarrhea; irregular periods.',
      zh: '腹痛，便秘或腹瀉，月經不調。',
    },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '中注，在肓俞下一寸',
      en: 'Zhongzhu lies one cun below Huangshu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI16',
    gloss: 'A Ferry from the Deep Interior',
    where: {
      en: 'Level with the navel, half a thumb-width to either side of it.',
      zh: '與肚臍同高，肚臍旁開半拇指寬。',
    },
    place: { en: 'Just beside the navel', zh: '肚臍旁開半拇指寬' },
    for: { en: 'Belly ache; diarrhea; constipation.', zh: '腹痛，腹瀉，便秘。' },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '肓俞，在商曲下一寸，直臍傍五分',
      en: 'Huangshu lies one cun below Shangqu, five fen out beside the navel.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI17',
    gloss: 'The Bent Note of Shang',
    where: {
      en: 'Three finger-widths above the navel, half a thumb-width out from the midline.',
      zh: '肚臍上三橫指，前正中線旁開半拇指寬。',
    },
    place: { en: 'Three fingers above navel, near midline', zh: '臍上三橫指，正中線旁' },
    for: {
      en: 'Belching; bloating; fullness under the ribs.',
      zh: '噯氣，腹脹，胸脅脹滿。',
    },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '商曲，在石關下一寸',
      en: 'Shangqu lies one cun below Shiguan.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI18',
    gloss: 'Stone Pass',
    where: {
      en: 'Four finger-widths above the navel, half a thumb-width out from the midline.',
      zh: '肚臍上四橫指，前正中線旁開半拇指寬。',
    },
    place: { en: 'Four fingers above navel, near midline', zh: '臍上四橫指，正中線旁' },
    for: { en: 'Vomiting; belly ache; constipation.', zh: '嘔吐，腹痛，便秘。' },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '石關，在陰都下一寸',
      en: 'Shiguan lies one cun below Yindu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI19',
    gloss: 'Yin Metropolis',
    where: {
      en: 'Midway between the navel and the base of the breastbone, half a thumb-width out from the midline.',
      zh: '肚臍與胸骨下端連線的中點，前正中線旁開半拇指寬。',
    },
    place: { en: 'Mid upper belly, near the midline', zh: '臍與胸骨下端之間，正中線旁' },
    for: {
      en: 'Belly ache; diarrhea or constipation; irregular periods.',
      zh: '腹痛，腹瀉或便秘，月經不調。',
    },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: { en: 'In pregnancy, ask a practitioner first.', zh: '孕期請先諮詢醫師。' },
    quote: {
      han: '陰都，一名食宮，在通谷下一寸',
      en: 'Yindu, also called Shigong, lies one cun below Tonggu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI20',
    gloss: 'A Valley That Passes Through',
    where: {
      en: 'Four finger-widths below the base of the breastbone, half a thumb-width out from the midline.',
      zh: '胸骨下端下四橫指，前正中線旁開半拇指寬。',
    },
    place: { en: 'Below breastbone base, near midline', zh: '胸骨下端下四橫指，正中線旁' },
    for: { en: 'Bloating; belly ache; poor appetite.', zh: '腹脹，腹痛，食慾不振。' },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: {
      en: 'Not during sharp belly pain or vomiting.',
      zh: '急性腹痛或嘔吐時不按。',
    },
    quote: {
      han: '通谷，在幽門下一寸陷者中',
      en: 'Tonggu lies in the hollow one cun below Youmen.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI21',
    gloss: 'Gate of Seclusion',
    where: {
      en: 'Three finger-widths below the base of the breastbone, half a thumb-width out from the midline.',
      zh: '胸骨下端下三橫指，前正中線旁開半拇指寬。',
    },
    place: { en: 'Just below breastbone base, near midline', zh: '胸骨下端下三橫指，正中線旁' },
    for: { en: 'Belly ache; bloating; vomiting.', zh: '腹痛，腹脹，嘔吐。' },
    press: {
      en: 'Lying down, a light fingertip touch, about a minute.',
      zh: '平躺，以指尖輕觸約一分鐘。',
    },
    caution: {
      en: 'Not during fever or vomiting.',
      zh: '發燒或嘔吐時不按。',
    },
    quote: {
      han: '幽門，一名上門，在巨闕兩傍各五分陷者中',
      en: 'Youmen, also called Shangmen, lies in the hollow five fen to either side of Juque.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI22',
    gloss: 'Stepping Corridor',
    where: {
      en: 'In the rib space one below the nipple line, halfway between the breastbone and the nipple.',
      zh: '乳頭所在肋間的下一個肋間，胸骨正中與乳頭連線的中點。',
    },
    place: { en: 'Rib space below the nipple line', zh: '乳頭下一肋間，胸骨與乳頭之間' },
    for: { en: 'Cough; wheezing; chest pain.', zh: '咳嗽，氣喘，胸痛。' },
    press: {
      en: 'A light fingertip touch on the surface, about a minute each side.',
      zh: '以指尖輕觸皮膚表面，每側約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press in between the ribs.',
      zh: '只可輕觸，切勿往肋間深按。',
    },
    quote: {
      han: '步廊，在神封下一寸六分陷者中',
      en: 'Bulang lies in the hollow one cun six fen below Shenfeng.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI23',
    gloss: 'Spirit’s Seal',
    where: {
      en: 'In the rib space level with the nipple, halfway between the breastbone and the nipple.',
      zh: '與乳頭同高的肋間，胸骨正中與乳頭連線的中點。',
    },
    place: { en: 'Rib space level with the nipple', zh: '乳頭同高肋間，胸骨與乳頭之間' },
    for: {
      en: 'Cough; fullness of the chest; poor appetite.',
      zh: '咳嗽，胸脅脹滿，食慾不振。',
    },
    press: {
      en: 'A light fingertip touch on the surface, about a minute each side.',
      zh: '以指尖輕觸皮膚表面，每側約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press in between the ribs.',
      zh: '只可輕觸，切勿往肋間深按。',
    },
    quote: {
      han: '神封，在靈墟下一寸六分陷者中',
      en: 'Shenfeng lies in the hollow one cun six fen below Lingxu.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI24',
    gloss: 'Spirit Mound',
    where: {
      en: 'In the third rib space below the collarbone, halfway between the breastbone and the nipple line.',
      zh: '鎖骨下第三個肋間，胸骨正中與乳頭連線的中點。',
    },
    place: { en: 'Third rib space below the collarbone', zh: '鎖骨下第三肋間' },
    for: {
      en: 'Cough with much phlegm; aching chest and ribs.',
      zh: '咳嗽痰多，胸脅脹痛。',
    },
    press: {
      en: 'A light fingertip touch, briefer than elsewhere, about a minute each side.',
      zh: '以指尖輕觸，比他處更輕更短，每側約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press in between the ribs.',
      zh: '只可輕觸，切勿往肋間深按。',
    },
    quote: {
      han: '靈墟，在神藏下一寸六分陷者中',
      en: 'Lingxu lies in the hollow one cun six fen below Shencang.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
  {
    code: 'KI25',
    gloss: 'Spirit Storehouse',
    where: {
      en: 'In the second rib space below the collarbone, halfway between the breastbone and the nipple line.',
      zh: '鎖骨下第二個肋間，胸骨正中與乳頭連線的中點。',
    },
    place: { en: 'Second rib space below the collarbone', zh: '鎖骨下第二肋間' },
    for: { en: 'Cough; fullness of the chest; poor appetite.', zh: '咳嗽，胸悶，食慾不振。' },
    press: {
      en: 'A light fingertip touch on the surface, about a minute each side.',
      zh: '以指尖輕觸皮膚表面，每側約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press in between the ribs.',
      zh: '只可輕觸，切勿往肋間深按。',
    },
    quote: {
      han: '神藏二穴，在或中下一寸六分陷中，仰而取之',
      en: 'Shencang, one on each side, lies in the hollow one cun six fen below Yuzhong; find it lying face up.',
      source: { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' },
    },
  },
  {
    code: 'KI26',
    gloss: 'Refined Abundance at the Centre',
    where: {
      en: 'In the first rib space below the collarbone, halfway between the breastbone and the nipple line.',
      zh: '鎖骨下第一個肋間，胸骨正中與乳頭連線的中點。',
    },
    place: { en: 'First rib space below the collarbone', zh: '鎖骨下第一肋間' },
    for: { en: 'Cough; fullness of the chest; sore throat.', zh: '咳嗽，胸脅脹滿，咽喉痛。' },
    press: {
      en: 'A light fingertip touch on the surface, about a minute each side.',
      zh: '以指尖輕觸皮膚表面，每側約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press in between the ribs.',
      zh: '只可輕觸，切勿往肋間深按。',
    },
    quote: {
      han: '或中二穴，在腧府下一寸六分陷中，仰而取之',
      en: 'Yuzhong, one on each side, lies in the hollow one cun six fen below Shufu; find it lying face up.',
      source: {
        han: '《銅人腧穴針灸圖經·卷中》',
        en: 'Tongren Shuxue Zhenjiu Tujing, middle book',
      },
    },
  },
  {
    code: 'KI27',
    gloss: 'Shu Mansion',
    where: {
      en: 'Just under the collarbone, halfway between the breastbone and the nipple line.',
      zh: '鎖骨下緣，胸骨正中與乳頭連線的中點。',
    },
    place: { en: 'Just under the collarbone', zh: '鎖骨下緣，胸骨旁' },
    for: { en: 'Cough; chest pain; poor appetite.', zh: '咳嗽，胸痛，食慾不振。' },
    press: {
      en: 'A light fingertip touch on the surface, about a minute each side.',
      zh: '以指尖輕觸皮膚表面，每側約一分鐘。',
    },
    caution: {
      en: 'Light touch only; never press in under the collarbone.',
      zh: '只可輕觸，切勿往鎖骨下方深按。',
    },
    quote: {
      han: '輸府，在巨骨下，去璇璣傍各二寸陷者中',
      en: 'Shufu lies below the great bone, the collarbone, in the hollow two cun to either side of Xuanji.',
      source: { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' },
    },
  },
];
