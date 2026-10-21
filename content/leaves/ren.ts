import type { LeafCardInput } from './schema';

/** Book 3 of the Zhenjiu Jiayi Jing, the source of the quoted CV location lines but one. */
const jiayi = { han: '《針灸甲乙經·卷三》', en: 'Zhenjiu Jiayi Jing, book 3' };

/** Book 4 of the Tongren Shuxue Zhenjiu Tujing (Yuan five-book reprint), quoted for CV8. */
const tongren4 = { han: '《銅人腧穴針灸圖經·卷四》', en: 'Tongren Shuxue Zhenjiu Tujing, book 4' };

/** Leaf cards for the CV points, in channel order. */
export const renLeaves: readonly LeafCardInput[] = [
  {
    code: 'CV1',
    gloss: 'Meeting of Yin',
    where: {
      en: 'On the perineum, midway between the anus and the genitals.',
      zh: '會陰部，肛門與外生殖器之間的中點。',
    },
    place: { en: 'Between the anus and the genitals', zh: '會陰部，前後陰之間' },
    for: {
      en: 'Difficult urination, haemorrhoids, genital itching.',
      zh: '小便不利，痔瘡，陰部搔癢。',
    },
    press: {
      en: 'Not for self-pressing: it is an intimate area. Leave it to a trained practitioner.',
      zh: '不宜自行按壓：此處為私密部位，宜交由受過訓練的醫者處理。',
    },
    caution: { en: 'Intimate area; do not press it yourself.', zh: '私密部位，請勿自行按壓。' },
    quote: {
      han: '在大便前、小便後，兩陰之間',
      en: 'In front of the back passage and behind the front one: between the two yin.',
      source: jiayi,
    },
  },
  {
    code: 'CV2',
    gloss: 'Curved Bone',
    where: {
      en: 'On the midline of the lower belly, on the upper edge of the pubic bone.',
      zh: '下腹正中線，恥骨聯合上緣中點。',
    },
    place: { en: 'On the top edge of the pubic bone', zh: '恥骨聯合上緣中點' },
    for: {
      en: 'Difficult urination, period pain, irregular periods.',
      zh: '小便不利，經痛，月經不調。',
    },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: {
      han: '曲骨，在橫骨上、中極下一寸，毛際陷者中，動脈應手',
      en: 'Qugu lies above the pubic bone, one cun below Zhongji, in the hollow at the hairline, where a pulse beats under the hand.',
      source: jiayi,
    },
  },
  {
    code: 'CV3',
    gloss: 'Central Pole',
    where: {
      en: 'On the midline of the lower belly, one thumb-width above the pubic bone.',
      zh: '下腹正中線，恥骨上緣往上一拇指寬。',
    },
    place: { en: 'A thumb-width above the pubic bone', zh: '恥骨上緣上一拇指寬' },
    for: {
      en: 'Period pain, irregular periods, bladder discomfort.',
      zh: '經痛，月經不調，小便不適。',
    },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: { han: '在臍下四寸', en: 'Four cun below the navel.', source: jiayi },
  },
  {
    code: 'CV4',
    gloss: 'Gate of the Origin',
    where: {
      en: 'On the midline of the lower belly, four finger-widths below the navel.',
      zh: '下腹正中線，肚臍下四橫指。',
    },
    place: { en: 'Four finger-widths below the navel', zh: '肚臍下四橫指' },
    for: {
      en: 'Period pain, frequent urination, tiredness with a feeling of cold.',
      zh: '經痛，小便頻數，疲倦怕冷。',
    },
    press: {
      en: 'Gentle with the palm or fingertips, about a minute.',
      zh: '以掌心或指腹輕按，約一分鐘。',
    },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: { han: '在臍下三寸', en: 'Three cun below the navel.', source: jiayi },
  },
  {
    code: 'CV5',
    gloss: 'Stone Gate',
    where: {
      en: 'On the midline of the lower belly, two thumb-widths below the navel.',
      zh: '下腹正中線，肚臍下兩拇指寬。',
    },
    place: { en: 'Two thumb-widths below the navel', zh: '肚臍下兩拇指寬' },
    for: { en: 'Belly pain, loose stools, difficult urination.', zh: '腹痛，腹瀉，小便不利。' },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: { han: '在臍下二寸', en: 'Two cun below the navel.', source: jiayi },
  },
  {
    code: 'CV6',
    gloss: 'Sea of Qi',
    where: {
      en: 'On the midline of the lower belly, two finger-widths below the navel.',
      zh: '下腹正中線，肚臍下兩橫指。',
    },
    place: { en: 'Two finger-widths below the navel', zh: '肚臍下兩橫指' },
    for: {
      en: 'Belly pain, constipation or loose stools, low energy.',
      zh: '腹痛，便秘或腹瀉，氣虛乏力。',
    },
    press: {
      en: 'Gentle with the palm or fingertips, about a minute.',
      zh: '以掌心或指腹輕按，約一分鐘。',
    },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: { han: '在臍下一寸五分', en: 'One and a half cun below the navel.', source: jiayi },
  },
  {
    code: 'CV7',
    gloss: 'Yin Intersection',
    where: {
      en: 'On the midline of the lower belly, one thumb-width below the navel.',
      zh: '下腹正中線，肚臍下一拇指寬。',
    },
    place: { en: 'One thumb-width below the navel', zh: '肚臍下一拇指寬' },
    for: { en: 'Belly pain, loose stools, irregular periods.', zh: '腹痛，腹瀉，月經不調。' },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    caution: { en: 'Not in pregnancy.', zh: '孕期不按。' },
    quote: { han: '在臍下一寸', en: 'One cun below the navel.', source: jiayi },
  },
  {
    code: 'CV8',
    gloss: 'Spirit Gate Tower',
    where: { en: 'In the centre of the navel.', zh: '肚臍正中。' },
    place: { en: 'The centre of the navel', zh: '肚臍正中' },
    for: { en: 'Belly pain, loose stools.', zh: '腹痛，腹瀉。' },
    press: {
      en: 'Do not press into the navel; rest a warm palm over it instead.',
      zh: '不要按入肚臍；可改以溫暖的掌心覆蓋其上。',
    },
    caution: {
      en: 'Never press into the navel: the skin is thin and the bowel lies just beneath.',
      zh: '切勿按入肚臍：此處皮膚薄，腸道緊貼其下。',
    },
    quote: {
      han: '神闕一穴，一名氣合，當臍中是也',
      en: 'Shenque, a single point also called Qihe, lies right in the centre of the navel.',
      source: tongren4,
    },
  },
  {
    code: 'CV9',
    gloss: 'Water Divide',
    where: {
      en: 'On the midline of the belly, one thumb-width above the navel.',
      zh: '腹部正中線，肚臍上一拇指寬。',
    },
    place: { en: 'One thumb-width above the navel', zh: '肚臍上一拇指寬' },
    for: { en: 'Belly pain, loose stools, puffy swelling.', zh: '腹痛，腹瀉，水腫。' },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    quote: {
      han: '水分，在下脘下一寸，臍上一寸',
      en: 'Shuifen lies one cun below Xiawan, one cun above the navel.',
      source: jiayi,
    },
  },
  {
    code: 'CV10',
    gloss: 'Lower Stomach Cavity',
    where: {
      en: 'On the midline of the belly, two thumb-widths above the navel.',
      zh: '腹部正中線，肚臍上兩拇指寬。',
    },
    place: { en: 'Two thumb-widths above the navel', zh: '肚臍上兩拇指寬' },
    for: { en: 'Bloating, indigestion, hiccups.', zh: '腹脹，消化不良，打嗝。' },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    quote: { han: '下脘，在建裏下一寸', en: 'Xiawan lies one cun below Jianli.', source: jiayi },
  },
  {
    code: 'CV11',
    gloss: 'Building the Interior',
    where: {
      en: 'On the midline of the belly, four finger-widths above the navel.',
      zh: '腹部正中線，肚臍上四橫指。',
    },
    place: { en: 'Four finger-widths above the navel', zh: '肚臍上四橫指' },
    for: { en: 'Stomach ache, bloating, poor appetite.', zh: '胃痛，腹脹，食慾不振。' },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    quote: { han: '建裏，在中脘下一寸', en: 'Jianli lies one cun below Zhongwan.', source: jiayi },
  },
  {
    code: 'CV12',
    gloss: 'Middle Stomach Cavity',
    where: {
      en: 'On the midline of the upper belly, halfway between the navel and the lower tip of the breastbone.',
      zh: '上腹正中線，肚臍與胸骨下端連線的中點。',
    },
    place: { en: 'Midway from navel to breastbone tip', zh: '肚臍與胸骨下端之中點' },
    for: { en: 'Stomach ache, bloating, acid reflux.', zh: '胃痛，腹脹，吞酸。' },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    quote: {
      han: '在上脘下一寸，居心蔽骨與臍之中',
      en: 'One cun below Shangwan, midway between the bone that shields the heart and the navel.',
      source: jiayi,
    },
  },
  {
    code: 'CV13',
    gloss: 'Upper Stomach Cavity',
    where: {
      en: 'On the midline of the upper belly, one thumb-width above Zhongwan, the point halfway from navel to breastbone.',
      zh: '上腹正中線，中脘（肚臍與胸骨下端之中點）往上一拇指寬。',
    },
    place: { en: 'A thumb-width above Zhongwan', zh: '中脘上一拇指寬' },
    for: {
      en: 'Stomach ache, retching and vomiting, poor appetite.',
      zh: '胃痛，乾嘔嘔吐，食慾不振。',
    },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    quote: {
      han: '上脘，在巨闕下一寸五分，去蔽骨三寸',
      en: 'Shangwan lies one and a half cun below Juque, three cun from the shielding bone.',
      source: jiayi,
    },
  },
  {
    code: 'CV14',
    gloss: 'Great Gateway',
    where: {
      en: 'On the midline of the upper belly, two thumb-widths below the lower tip of the breastbone.',
      zh: '上腹正中線，胸骨下端往下兩拇指寬。',
    },
    place: { en: 'Two thumb-widths below the breastbone', zh: '胸骨下端下兩拇指寬' },
    for: { en: 'Palpitations, bloating, vomiting.', zh: '心悸，腹脹，嘔吐。' },
    press: { en: 'Gentle with the fingertips, about a minute.', zh: '以指腹輕按，約一分鐘。' },
    quote: { han: '在鳩尾下一寸', en: 'One cun below Jiuwei.', source: jiayi },
  },
  {
    code: 'CV15',
    gloss: "Dove's Tail",
    where: {
      en: 'On the midline, one thumb-width below the small tab at the lower tip of the breastbone.',
      zh: '上腹正中線，胸骨下端劍突往下一拇指寬。',
    },
    place: { en: 'A thumb-width below the breastbone tip', zh: '劍突下一拇指寬' },
    for: { en: 'Chest tightness, palpitations, hiccups.', zh: '胸悶，心悸，打嗝。' },
    press: { en: 'Gentle, about a minute.', zh: '輕按，約一分鐘。' },
    quote: {
      han: '在臆前，蔽骨下五分',
      en: 'Before the chest, half a cun below the shielding bone.',
      source: jiayi,
    },
  },
  {
    code: 'CV16',
    gloss: 'Central Courtyard',
    where: {
      en: 'On the midline at the lower end of the breastbone, where the ribs meet, level with the fifth rib space.',
      zh: '胸骨正中線下端，左右肋骨相會處，平第五肋間。',
    },
    place: { en: 'Lower end of the breastbone', zh: '胸骨下端，平第五肋間' },
    for: {
      en: 'Fullness of the chest and ribs, trouble swallowing, vomiting.',
      zh: '胸脅脹滿，吞嚥不順，嘔吐。',
    },
    press: { en: 'Gentle, on the breastbone, about a minute.', zh: '在胸骨上輕按，約一分鐘。' },
    quote: {
      han: '中庭，在膻中下一寸六分陷者中',
      en: 'Zhongting lies one and six-tenths cun below Danzhong, in the hollow.',
      source: jiayi,
    },
  },
  {
    code: 'CV17',
    gloss: 'Chest Centre',
    where: {
      en: 'On the breastbone, level with the fourth rib space; in men, midway between the nipples.',
      zh: '胸骨正中線，平第四肋間；男性約在兩乳頭連線中點。',
    },
    place: { en: 'Breastbone, at the fourth rib space', zh: '胸骨正中，平第四肋間' },
    for: { en: 'Chest tightness, palpitations, cough.', zh: '胸悶，心悸，咳嗽。' },
    press: { en: 'Gentle, on the breastbone, about a minute.', zh: '在胸骨上輕按，約一分鐘。' },
    quote: {
      han: '在玉堂下一寸六分陷者中',
      en: 'One and six-tenths cun below Yutang, in the hollow.',
      source: jiayi,
    },
  },
  {
    code: 'CV18',
    gloss: 'Jade Hall',
    where: {
      en: 'On the breastbone, level with the third rib space.',
      zh: '胸骨正中線，平第三肋間。',
    },
    place: { en: 'Breastbone, at the third rib space', zh: '胸骨正中，平第三肋間' },
    for: { en: 'Chest tightness, cough, sore throat.', zh: '胸悶，咳嗽，咽喉痛。' },
    press: { en: 'Gentle, on the breastbone, about a minute.', zh: '在胸骨上輕按，約一分鐘。' },
    quote: {
      han: '在紫宮下一寸六分陷者中',
      en: 'One and six-tenths cun below Zigong, in the hollow.',
      source: jiayi,
    },
  },
  {
    code: 'CV19',
    gloss: 'Purple Palace',
    where: {
      en: 'On the breastbone, level with the second rib space.',
      zh: '胸骨正中線，平第二肋間。',
    },
    place: { en: 'Breastbone, at the second rib space', zh: '胸骨正中，平第二肋間' },
    for: { en: 'Chest tightness, cough, shortness of breath.', zh: '胸悶，咳嗽，呼吸短促。' },
    press: { en: 'Gentle, on the breastbone, about a minute.', zh: '在胸骨上輕按，約一分鐘。' },
    quote: {
      han: '紫宮，在華蓋下一寸六分陷者中',
      en: 'Zigong lies one and six-tenths cun below Huagai, in the hollow.',
      source: jiayi,
    },
  },
  {
    code: 'CV20',
    gloss: 'Splendid Canopy',
    where: {
      en: 'High on the breastbone, level with the first rib space.',
      zh: '胸骨正中線上部，平第一肋間。',
    },
    place: { en: 'Breastbone, at the first rib space', zh: '胸骨正中，平第一肋間' },
    for: { en: 'Cough, wheezing, chest and rib pain.', zh: '咳嗽，氣喘，胸脅疼痛。' },
    press: { en: 'Gentle, on the breastbone, about a minute.', zh: '在胸骨上輕按，約一分鐘。' },
    quote: {
      han: '華蓋，在璇璣下一寸陷者中',
      en: 'Huagai lies one cun below Xuanji, in the hollow.',
      source: jiayi,
    },
  },
  {
    code: 'CV21',
    gloss: 'Jade Pivot',
    where: {
      en: 'On the breastbone, one thumb-width below the notch at its top.',
      zh: '胸骨正中線，胸骨上窩往下一拇指寬。',
    },
    place: { en: 'Just below the notch atop the breastbone', zh: '胸骨上窩下一拇指寬' },
    for: { en: 'Cough, sore throat, a full chest.', zh: '咳嗽，咽喉腫痛，胸部脹滿。' },
    press: { en: 'Gentle, on the breastbone, about a minute.', zh: '在胸骨上輕按，約一分鐘。' },
    quote: {
      han: '璇璣，在天突下一寸中央陷者中',
      en: 'Xuanji lies one cun below Tiantu, in the central hollow.',
      source: jiayi,
    },
  },
  {
    code: 'CV22',
    gloss: "Heaven's Chimney",
    where: {
      en: 'At the base of the throat, in the soft notch at the top of the breastbone.',
      zh: '頸前正中，胸骨上窩中央的凹陷。',
    },
    place: { en: 'In the notch at the base of the throat', zh: '胸骨上窩中央凹陷' },
    for: {
      en: 'Cough, a lump-in-the-throat feeling, a hoarse voice.',
      zh: '咳嗽，喉中異物感，聲音沙啞。',
    },
    press: {
      en: 'Light touch only, pressing down toward the breastbone, about a minute.',
      zh: '只可輕觸，朝胸骨方向往下按，約一分鐘。',
    },
    caution: {
      en: 'Never press hard or back into the throat: the windpipe lies just beneath.',
      zh: '切勿用力或向後壓迫咽喉：氣管就在其下。',
    },
    quote: {
      han: '在頸結喉下二寸',
      en: 'On the neck, two cun below the Adam’s apple.',
      source: jiayi,
    },
  },
  {
    code: 'CV23',
    gloss: 'Edge Spring',
    where: {
      en: 'On the front of the neck, just under the chin: the dip above the Adam’s apple, on the top edge of the hyoid bone.',
      zh: '頸前正中，下巴下方，喉結上方的舌骨上緣凹陷處。',
    },
    place: { en: 'Under the chin, above the Adam’s apple', zh: '下巴下，喉結上方' },
    for: {
      en: 'Mouth and tongue sores, drooling, trouble swallowing.',
      zh: '口舌生瘡，流口水，吞嚥困難。',
    },
    press: {
      en: 'Light touch, pressing up toward the chin, about a minute.',
      zh: '輕觸，朝下巴方向往上按，約一分鐘。',
    },
    caution: { en: 'Never press hard on the throat.', zh: '切勿用力按壓咽喉。' },
    quote: {
      han: '在頷下，結喉上，舌本下',
      en: 'Below the jaw, above the Adam’s apple, beneath the root of the tongue.',
      source: jiayi,
    },
  },
  {
    code: 'CV24',
    gloss: 'Receiving the Fluids',
    where: {
      en: 'On the chin, in the hollow at the centre of the crease below the lower lip.',
      zh: '下巴正中，下唇下方頦唇溝的中央凹陷。',
    },
    place: { en: 'Centre of the crease below the lower lip', zh: '頦唇溝正中凹陷' },
    for: { en: 'Swollen gums, drooling, mouth sores.', zh: '牙齦腫痛，流口水，口瘡。' },
    press: { en: 'Gentle with a fingertip, about a minute.', zh: '以指尖輕按，約一分鐘。' },
    quote: { han: '在頤前唇之下', en: 'On the front of the chin, below the lip.', source: jiayi },
  },
];
