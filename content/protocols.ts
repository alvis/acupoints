import { z } from 'zod';

import { findBannedMatches } from './editorial/policy';

/**
 * The step-by-step routines (方箋), one per condition. Each routine presses
 * its condition's own set of points in the order the condition page derives;
 * this module adds only what that set cannot say by itself: how long the
 * routine takes, how hard its points are to find, where to sit, how often,
 * the per-point pressing line and the signs that mean see a doctor first.
 *
 * Every line restates the condition's authored prose
 * (content/pages/conditions/<slug>.{en,zh-hant}.md, chiefly its routine and
 * red-flag sections) in English and Traditional Chinese; Simplified is
 * derived at render time. Lines are screened through the editorial policy at
 * module load, so a banned phrasing fails the build instead of shipping.
 */

/**
 * Screens one authored line through the editorial policy.
 * @param max the maximum permitted line length in characters.
 * @returns the bounded string schema that rejects banned editorial language.
 */
const line = (max: number): z.ZodString =>
  z
    .string()
    .min(2)
    .max(max)
    .refine((value) => findBannedMatches(value).length === 0, {
      message: 'Line uses language the editorial policy bans.',
    });

/**
 * One line in both authored scripts; `zh` is Traditional Chinese.
 * @param max the maximum permitted line length in characters.
 * @returns the English and traditional Chinese line schemas.
 */
const bilingual = (max: number): z.ZodObject<{ en: z.ZodString; zh: z.ZodString }> =>
  z.object({ en: line(max), zh: line(max) });

/** A two-line margin note in both authored scripts. */
const marginNote = z.object({
  en: z.tuple([line(28), line(28)]),
  zh: z.tuple([line(14), line(14)]),
});

/** How one point of a routine is pressed. */
const stepSchema = z.object({
  /** Where it sits, for points no leaf card describes (the extra points). */
  where: bilingual(160).optional(),
  /** Pressure, hand and hold, from the routine section of the prose. */
  how: bilingual(160),
  /** A short margin note beside the point, when the prose gives one. */
  note: marginNote.optional(),
});

const routineSchema = z.object({
  /** The condition this routine belongs to. */
  slug: z.string().min(2),
  /** About how many minutes the whole routine takes. */
  minutes: z.number().int().min(1).max(30),
  /** How hard the points are to find: 1 easy, 2 fair, 3 takes care. */
  finding: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  /** The card line on the conditions index. */
  line: bilingual(140),
  /** What the routine is for, on its prescription slip. */
  purpose: bilingual(120),
  /** The order of the set, said in a sentence above the carved block. */
  order: bilingual(160),
  /** Where to sit or lie. */
  posture: bilingual(48),
  /** How often. */
  often: bilingual(48),
  /** The two-line note on the index card and the slip. */
  caution: marginNote,
  /** The signs that mean see a doctor before pressing anything. */
  help: z.array(bilingual(110)).min(3).max(6),
  /**
   * Set when the routine belongs to labor itself: its points are the ones
   * otherwise left out in pregnancy, so the usual "leave out in pregnancy"
   * flags give way to the routine's own caution (term labor, with the
   * midwife's agreement).
   */
  pregnancy: z.literal('labor-only').optional(),
  /** Per-point pressing lines, keyed by point code. */
  steps: z.record(z.string().regex(/^(?:[A-Z]{2}\d{1,2}|EX-[A-Z]{1,2}\d{1,2})$/u), stepSchema),
});

/** One authored line; `zh` is Traditional Chinese. */
export type RoutineLine = z.infer<ReturnType<typeof bilingual>>;
/** One two-line margin note. */
export type RoutineNote = z.infer<typeof marginNote>;
/** How one point of a routine is pressed. */
export type RoutineStep = z.infer<typeof stepSchema>;
/** One condition's routine. */
export type Routine = z.infer<typeof routineSchema>;

const ROUTINES: ReadonlyArray<z.input<typeof routineSchema>> = [
  {
    slug: 'tension-headache',
    minutes: 6,
    finding: 2,
    line: {
      en: 'A dull, band-like tightness across the forehead, the temples or the base of the skull.',
      zh: '鈍鈍的緊壓感，像一條束帶橫過額頭、太陽穴，或沉在後腦勺。',
    },
    purpose: {
      en: 'Near and far: start at the hand, then the neck, the temple and the crown.',
      zh: '由遠而近：從手開始，再到頸後、太陽穴與頭頂。',
    },
    order: {
      en: 'Begin away from the head: the hand, then the neck, the temples, and a soft pause at the crown.',
      zh: '先從離頭遠的地方開始：手，然後頸後、太陽穴，最後在頭頂溫柔地停一會兒。',
    },
    posture: { en: 'Seated, supported', zh: '坐得安穩，有所依靠' },
    often: { en: 'Once or twice a day', zh: '一天一到兩次' },
    caution: { en: ['skip Hegu', 'in pregnancy'], zh: ['孕期', '略過合谷'] },
    help: [
      {
        en: 'it is sudden, severe and unlike any headache before',
        zh: '突發劇烈，與以往截然不同',
      },
      { en: 'it comes with fever and a stiff neck', zh: '伴隨發熱與頸項強直' },
      { en: 'it follows a blow to the head', zh: '頭部受到撞擊之後出現' },
      {
        en: 'you have new weakness, numbness, confusion or trouble seeing',
        zh: '新出現無力、麻木、意識混亂或視物異常',
      },
      { en: 'it is a new headache during pregnancy', zh: '孕期的初發頭痛' },
    ],
    steps: {
      'LI4': {
        how: {
          en: 'Thumb or finger pad, only as firm as feels pleasant; hold half a minute to a minute, then release gradually.',
          zh: '拇指或手指的指腹，力度以舒適為限；保持半分鐘到一分鐘，再緩緩鬆開。',
        },
      },
      'GB20': {
        how: {
          en: 'Thumbs into the hollows, steady and inward-upward, never digging.',
          zh: '拇指陷入凹窩，穩定地向內向上托，不往深處摳。',
        },
        note: { en: ['always short', 'of sharpness'], zh: ['始終不到', '發銳的程度'] },
      },
      'EX-HN5': {
        where: {
          en: 'In the soft hollow of the temple, a finger-width behind the midpoint between the outer end of the eyebrow and the outer corner of the eye.',
          zh: '在顳側柔軟的凹陷裡，約在眉梢與外眼角之間中點向後一指寬。',
        },
        how: {
          en: 'The lightest circles, or simply a resting fingertip; feather-light this near the eyes.',
          zh: '最輕的畫圈，或只是靜置的指腹；眼睛附近輕如羽翼。',
        },
        note: { en: ['an extra point,', 'on no channel'], zh: ['經外奇穴，', '在正經之外'] },
      },
      'GV20': {
        how: {
          en: 'A soft pause to finish, if it appeals.',
          zh: '願意的話，最後在頭頂溫柔地停一會兒。',
        },
        note: { en: ['on the du vessel,', 'on the midline'], zh: ['督脈，', '在正中線上'] },
      },
    },
  },
  {
    slug: 'anxiety',
    minutes: 5,
    finding: 2,
    line: {
      en: 'When the mind will not settle. Two wrist points, paired with slow breathing.',
      zh: '心緒難安的時候。手腕上的兩個穴位，配合緩緩的呼吸。',
    },
    purpose: {
      en: 'Settle the spirit: the wrist crease, then three fingers up the forearm.',
      zh: '安定心神：先在腕橫紋上，再往前臂上量三橫指。',
    },
    order: {
      en: 'The wrist crease first, then three finger-widths up the forearm; let each breath out run a little longer than the breath in.',
      zh: '先在腕橫紋上，再沿前臂上移三橫指；讓每次呼氣比吸氣略長一點。',
    },
    posture: { en: 'Seated, hands in lap', zh: '坐著，手擱在腿上' },
    often: { en: 'Morning and evening', zh: '早、晚各一輪' },
    caution: { en: ['ask first if', 'on medication'], zh: ['長期服藥', '請先諮詢'] },
    help: [
      {
        en: 'anxious feelings visit most days for several weeks',
        zh: '焦慮的情緒大多數日子都在，持續數週',
      },
      {
        en: 'panic surges suddenly, with a hammering heart or gasping breath',
        zh: '恐慌驟然襲來，心跳如擂鼓、喘不上氣',
      },
      { en: 'you lean on alcohol to get through evenings', zh: '要靠酒精才能熬過夜晚' },
      { en: 'you have any thought of harming yourself', zh: '出現傷害自己的念頭' },
    ],
    steps: {
      HT7: {
        how: {
          en: 'A fingertip in the hollow beside the cord, only as heavy as feels pleasant; four or five slow breaths, then release gradually.',
          zh: '指腹落進筋腱旁的凹窩，力度以舒適為限；停留四五次緩慢呼吸，再緩緩鬆開。',
        },
        note: { en: ['level with', 'the wrist crease'], zh: ['與腕橫紋', '齊平'] },
      },
      PC6: {
        how: {
          en: 'Thumb or fingertip pad between the two sinews, to comfortable depth; four or five slow breaths, then swap wrists.',
          zh: '拇指或指腹落在兩筋之間，只按到舒適為止；停留四五次緩慢呼吸，再換手腕。',
        },
        note: { en: ['three fingers up', 'from the crease'], zh: ['離腕橫紋', '約三橫指'] },
      },
    },
  },
  {
    slug: 'insomnia',
    minutes: 5,
    finding: 2,
    line: {
      en: 'An evening routine: the wrist, then the sole of the foot, two quiet rounds before bed.',
      zh: '睡前的一套：先手腕，再足底，上床前兩個安靜的來回。',
    },
    purpose: {
      en: 'Quiet the wrist, ground the sole, and put the day down.',
      zh: '在腕上安神，在足底沉降，把一天鄭重放下。',
    },
    order: {
      en: 'Dim the lights first. The wrist, then the sole of the foot: two quiet rounds in all.',
      zh: '先調暗燈光。先手腕，再足底：總共兩個安靜的來回。',
    },
    posture: { en: 'On the edge of the bed', zh: '坐在床沿' },
    often: { en: 'At bedtime', zh: '睡前' },
    caution: { en: ['lights low,', 'screens away'], zh: ['燈光調暗，', '手機放遠'] },
    help: [
      {
        en: 'poor sleep comes most nights for several weeks',
        zh: '多數夜晚睡不好，持續數週',
      },
      {
        en: 'daytime fog or low mood begins to affect work, relationships or driving',
        zh: '白天昏沉或情緒低落，開始影響工作、關係或駕駛',
      },
      { en: 'loud snoring comes with pauses in breathing', zh: '鼾聲很大並伴有呼吸暫停' },
      { en: 'new medication coincides with changed sleep', zh: '新換藥物之後睡眠明顯改變' },
    ],
    steps: {
      HT7: {
        how: {
          en: 'Thumb pad in the soft hollow, pleasant rather than firm; five slow breaths, then release gradually.',
          zh: '拇指腹落進柔軟的凹陷，以舒服為度，不求酸脹；停留五次緩慢呼吸，再緩緩鬆開。',
        },
        note: { en: ['both wrists,', 'then once more'], zh: ['兩腕各一，', '可再走一遍'] },
      },
      KI1: {
        how: {
          en: 'Toes curled slightly; feather-light circles with a thumb pad, or a warm palm over the sole. Five slow breaths a side.',
          zh: '腳趾微微蜷起；拇指腹畫極輕的小圈，或把手掌覆在足心。每側停留五次緩慢呼吸。',
        },
        note: { en: ['ticklish feet:', 'less, not more'], zh: ['怕癢的話，', '力度更輕'] },
      },
    },
  },
  {
    slug: 'travel-nausea',
    minutes: 5,
    finding: 2,
    line: {
      en: 'The queasy turn of a winding road. Neiguan on the inner wrist leads; two leg points join at home.',
      zh: '盤山公路上的那陣反胃。內關在手腕內側領頭；在家時再加兩個腿部穴位。',
    },
    purpose: {
      en: 'Begin before you leave; return to the wrist every few minutes on the road.',
      zh: '出發前就開始；路上每隔幾分鐘回到手腕按一次。',
    },
    order: {
      en: 'Neiguan on the road; Zusanli and Sanyinjiao join only at home, or on a stopover with room to sit.',
      zh: '路上只按內關；足三里與三陰交留到在家，或中途可以坐下休整時。',
    },
    posture: { en: 'Seated, on the move', zh: '坐著，旅途中亦可' },
    often: { en: 'Before and during a journey', zh: '出發前與旅途中' },
    caution: { en: ['skip SP6', 'in pregnancy'], zh: ['孕期', '略過三陰交'] },
    help: [
      {
        en: 'vomiting will not settle, or keeps fluids from staying down',
        zh: '嘔吐不止、連水都留不住',
      },
      {
        en: 'there is blood in the vomit, severe belly pain or a fever',
        zh: '嘔血、劇烈腹痛或伴隨發熱',
      },
      { en: 'it follows a knock to the head', zh: '頭部受到撞擊之後出現嘔吐' },
      { en: 'there is chest pain', zh: '出現胸痛' },
    ],
    steps: {
      PC6: {
        how: {
          en: 'A fingertip between the two tendons, only as firm as feels pleasant; about a minute, then swap wrists.',
          zh: '指腹落在兩條筋腱之間，壓力以舒適為度；停留約一分鐘，再換手腕。',
        },
        note: { en: ['on the road, every', 'few minutes'], zh: ['旅途中', '隔幾分鐘再按'] },
      },
      ST36: {
        how: {
          en: 'Cup the kneecap, fingertips just below it, then one finger-width out from the shin; press into the slight hollow.',
          zh: '手掌罩住膝蓋骨，指尖停在膝下，向外挪一橫指，按向淺淺的凹陷。',
        },
        note: { en: ['at home, or', 'on a stopover'], zh: ['在家，', '或中途休整時'] },
      },
      SP6: {
        how: {
          en: 'Four fingers above the inner anklebone, a thumb just behind the shin bone; arrive gradually, it is often tender.',
          zh: '四指疊在內踝尖上方，拇指落在脛骨後緣；此處常帶酸意，宜緩緩靠近。',
        },
      },
    },
  },
  {
    slug: 'period-pain',
    minutes: 8,
    finding: 2,
    line: {
      en: 'Warmth over the lower belly first, then two points on the inner leg and the top of the foot.',
      zh: '先溫暖小腹，再到小腿內側與足背的兩個穴位。',
    },
    purpose: {
      en: 'A warm palm on the belly, then the inner leg and the foot, each side.',
      zh: '溫暖的掌心先覆小腹，再到小腿內側與足背，左右各一。',
    },
    order: {
      en: 'First a warm palm on the lower belly for a few minutes, then Sanyinjiao on each leg and Taichong on each foot.',
      zh: '先以溫暖的掌心覆在小腹上畫圈幾分鐘，再按兩腿的三陰交與兩腳的太衝。',
    },
    posture: { en: 'A warm room, warm hands', zh: '房間暖和，雙手不涼' },
    often: { en: 'On hard days, once or twice', zh: '不適的日子，一天一到兩次' },
    caution: { en: ['never SP6', 'in pregnancy'], zh: ['孕期', '不用三陰交'] },
    help: [
      { en: 'the pain is suddenly much worse than usual', zh: '疼痛驟然重於往常' },
      {
        en: 'it comes with fever or vomiting, or stays fixed to one side',
        zh: '伴發熱或嘔吐，或頑固地固定在一側',
      },
      {
        en: 'there is significant belly pain at any chance of pregnancy',
        zh: '有任何懷孕可能時出現明顯腹痛',
      },
      {
        en: 'bleeding is unusually heavy or long, or you feel dizzy or faint',
        zh: '出血過多、過久，或頭暈欲厥',
      },
    ],
    steps: {
      SP6: {
        how: {
          en: 'A finger pad, distinct but comfortable, through several slow breaths; half a minute to a minute a leg.',
          zh: '指腹按壓，力道分明而舒適，配合幾次緩慢呼吸；每側約半分鐘到一分鐘。',
        },
      },
      LV3: {
        how: {
          en: 'The same unhurried pressure, on each foot in turn.',
          zh: '同樣從容地按，左右腳各一遍。',
        },
        note: {
          en: ['if cramps sharpen,', 'leave the points'],
          zh: ['絞痛加重，', '腿腳穴位停用'],
        },
      },
    },
  },
  {
    slug: 'back-pain',
    minutes: 10,
    finding: 3,
    line: {
      en: 'A warm, slow routine for the ordinary aching back: the loins, behind the knee, the hip.',
      zh: '給尋常腰背痠痛的一套溫暖慢功：腰際、膝後、臀部。',
    },
    purpose: {
      en: 'Palms on the loins, then two distant relays: behind the knee and deep in the hip.',
      zh: '雙掌先覆腰際，再到兩處遠方的驛站：膝後與臀部深處。',
    },
    order: {
      en: 'Palms on the low back first, then Shenshu, then the two distant relays: behind the knee and deep in the hip.',
      zh: '先以雙掌平覆下背，再按腎俞，然後是兩處遠方的驛站：膝後與臀部深處。',
    },
    posture: { en: 'Chair, standing, then on your side', zh: '坐椅，站立，再側臥' },
    often: { en: 'Once or twice a day', zh: '每日一到兩次' },
    caution: { en: ['not in a flare', 'or after a fall'], zh: ['急性發作或', '跌倒後不做'] },
    help: [
      { en: 'the pain began with a fall, an accident or a blow', zh: '疼痛始於跌倒、事故或撞擊' },
      {
        en: 'numbness, tingling or weakness spreads into a leg or foot',
        zh: '麻木、刺痛或無力向腿部或腳部擴散',
      },
      {
        en: 'bladder or bowel control changes, or the groin goes numb',
        zh: '大小便控制改變，或腹股溝麻木',
      },
      {
        en: 'fever comes with the pain, or it worsens night after night',
        zh: '腰痛伴隨發熱，或逐夜加重',
      },
    ],
    steps: {
      BL23: {
        how: {
          en: 'Small, slow circles with two finger pads; a pleasant dullness or warmth, never sharpness. One to three minutes.',
          zh: '兩指指腹做小而慢的畫圈；求舒適的酸沉或溫熱，絕不是銳痛。一到三分鐘。',
        },
        note: { en: ['navel height,', 'two fingers out'], zh: ['肚臍高度，', '旁開兩指'] },
      },
      BL40: {
        how: {
          en: 'Standing, knees slightly bent: thumbs in the crease, gently and briefly, for a few breaths.',
          zh: '站立微屈膝，拇指鉤進膝後橫紋，輕而短，幾次呼吸即可。',
        },
        note: { en: ['vessels run here:', 'keep it brief'], zh: ['血管途經，', '宜短不宜久'] },
      },
      GB30: {
        how: {
          en: 'On your side, upper knee drawn up: sink the flat of a fist or the heel of the palm in slowly, to a comfortable depth.',
          zh: '側臥屈起上方的膝，以拳面或掌跟緩緩沉入臀部，停在舒適的深度。',
        },
        note: { en: ['a deep point:', 'patience, not force'], zh: ['此穴較深，', '耐心勝過用力'] },
      },
    },
  },
  {
    slug: 'desk-neck-shoulder',
    minutes: 5,
    finding: 2,
    line: {
      en: 'The stiff neck and heavy shoulders of long desk hours. Breaks and set-up first; then the nape, the shoulder and the elbow.',
      zh: '長時間伏案的頸僵肩沉。先休息、調好桌椅；再按頸後、肩頂與手肘。',
    },
    purpose: {
      en: 'A comfort pause inside a movement break: the nape, the top of the shoulder, then the outer elbow.',
      zh: '起身活動時的一個舒緩小歇：頸後、肩頂，再到手肘外側。',
    },
    order: {
      en: 'Stand, roll the shoulders and turn the head first; then sit and press the nape, the top of each shoulder and the outer end of each elbow crease.',
      zh: '先站起來轉轉肩、慢慢轉頭；再坐下，依次按頸後、兩邊肩頂與兩側手肘橫紋外端。',
    },
    posture: { en: 'Seated, feet flat, forearms resting', zh: '坐著，雙腳踏地，前臂擱好' },
    often: { en: 'In a desk break, once or twice a day', zh: '工作小休時，一天一到兩次' },
    caution: { en: ['skip Jianjing', 'in pregnancy'], zh: ['孕期', '略過肩井'] },
    help: [
      {
        en: 'numbness, tingling or weakness spreads into an arm or hand',
        zh: '麻木、刺痛或無力向手臂或手部蔓延',
      },
      {
        en: 'your hands turn clumsy or your walking becomes unsteady',
        zh: '雙手變得笨拙，或走路不穩',
      },
      { en: 'bladder or bowel control changes', zh: '大小便控制出現變化' },
      {
        en: 'fever or unexplained weight loss comes with the pain, or it never lets up at night',
        zh: '伴隨發熱或不明原因的體重下降，或夜間疼痛持續不止',
      },
      {
        en: 'the pain followed a fall, an accident or a blow',
        zh: '跌倒、意外或撞擊之後出現的頸痛',
      },
      { en: 'you have dizziness or blackouts', zh: '出現頭暈或昏厥' },
    ],
    steps: {
      GB20: {
        how: {
          en: 'Thumbs into the hollows under the skull, steady and inward-upward, never digging; half a minute to a minute.',
          zh: '拇指陷入後腦下的凹窩，穩定地向內向上托，不往深處摳；半分鐘到一分鐘。',
        },
        note: { en: ['dizzy while pressing:', 'stop at once'], zh: ['按時頭暈，', '立即停止'] },
      },
      GB21: {
        how: {
          en: 'Opposite hand over the shoulder, middle finger on the crest of the muscle halfway to the shoulder tip; gentle, half a minute a side.',
          zh: '對側手搭上肩膀，中指落在頸根與肩端之間的肌肉隆起上；輕柔地按，每邊約半分鐘。',
        },
        note: { en: ['never in', 'pregnancy'], zh: ['孕期', '不按此穴'] },
      },
      LI11: {
        how: {
          en: 'Elbow bent to a right angle; thumb pad just beyond the outer end of the crease, comfortable pressure for half a minute to a minute.',
          zh: '手肘屈成直角，拇指指腹落在橫紋外端稍外處，力度舒適，按半分鐘到一分鐘。',
        },
        note: { en: ['sore elbow:', 'leave it out'], zh: ['手肘本身痛，', '略過此穴'] },
      },
    },
  },
  {
    slug: 'nausea-after-treatment',
    minutes: 6,
    finding: 2,
    line: {
      en: 'Queasy after an operation or around chemotherapy. Neiguan on the inner wrist leads, beside your anti-sickness medicine.',
      zh: '手術後或化療期間的反胃。手腕內側的內關領頭，配合止吐藥一起用。',
    },
    purpose: {
      en: 'An add-on to prescribed medicine: the wrist first, then the hand, then below the knee.',
      zh: '作為處方藥物的輔助：先手腕，再手背，最後膝下。',
    },
    order: {
      en: 'Neiguan on both wrists, then Hegu on both hands unless pregnant, then Zusanli below each knee when the legs are free.',
      zh: '先按兩腕內關，未懷孕再按兩手合谷，雙腿方便時最後按膝下足三里。',
    },
    posture: { en: 'Propped up in bed, or seated', zh: '床上墊高背部，或坐著' },
    often: { en: 'Two or three short rounds a day', zh: '一天兩三輪，每輪幾分鐘' },
    caution: {
      en: ['skip Hegu in pregnancy', 'never instead of medicine'],
      zh: ['孕期略過合谷', '配合止吐藥，不取代'],
    },
    help: [
      {
        en: 'you vomit blood, or material that looks like coffee grounds',
        zh: '嘔血，或吐出像咖啡渣的東西',
      },
      {
        en: 'you cannot keep fluids down, or show signs of dehydration',
        zh: '喝水也留不住，或出現脫水跡象',
      },
      {
        en: 'after surgery the belly is very painful or swollen, with no wind or stool passed',
        zh: '術後腹部劇痛或脹硬，一直沒有排氣排便',
      },
      {
        en: 'you have a fever, which during chemotherapy needs a call to the team at once',
        zh: '發燒，化療期間應立即致電醫療團隊',
      },
      {
        en: 'chemotherapy sickness is not controlled by the prescribed medicine: contact the oncology team',
        zh: '按處方用藥後化療噁心仍控制不住，請聯絡腫瘤科團隊',
      },
    ],
    steps: {
      PC6: {
        how: {
          en: 'A thumb or fingertip in the groove between the two tendons, three fingers above the crease; steady and comfortable, about a minute, then swap wrists.',
          zh: '拇指或指腹落在兩筋之間、腕橫紋上三橫指處；穩而舒適，約一分鐘，再換手腕。',
        },
        note: { en: ['drip in one arm?', 'use the other'], zh: ['一側在輸液，', '改用另一側'] },
      },
      LI4: {
        how: {
          en: 'Squeeze the mound between thumb and index finger with the other hand, gently, never pinching; half a minute to a minute each hand.',
          zh: '用另一隻手輕輕夾住拇指與食指間隆起的肌肉，不要用力掐；每手半分鐘到一分鐘。',
        },
        note: { en: ['never during', 'pregnancy'], zh: ['孕期', '完全不按'] },
      },
      ST36: {
        how: {
          en: 'Four finger-widths below the outer knee hollow, one finger out from the shin; a thumb in the slight dip, about a minute, then release slowly.',
          zh: '膝外側凹陷下四橫指、脛骨外一橫指；拇指落在淺凹，約一分鐘，再緩緩鬆開。',
        },
        note: { en: ['skip a leg with a', 'wound or clot'], zh: ['有傷口或血栓', '的腿略過'] },
      },
    },
  },
  {
    slug: 'bloating',
    minutes: 10,
    finding: 2,
    line: {
      en: 'That tight, full, gassy belly after meals. Clockwise palm circles, three belly points, then the leg and the wrist.',
      zh: '飯後肚子發緊、飽滯、脹氣。先以掌心順時針摩腹，再按腹部三穴，最後是小腿與手腕。',
    },
    purpose: {
      en: 'Settle the middle: circle the belly clockwise, press three belly points, then the knee and the wrist.',
      zh: '安頓中焦：先順時針摩腹，再按腹部三穴，最後到膝下與手腕。',
    },
    order: {
      en: 'Clockwise palm circles round the navel first, then Zhongwan, Tianshu and Qihai on the belly; sit up for Zusanli below each knee and Neiguan on each wrist.',
      zh: '先以掌心繞肚臍順時針打圈，再按腹部的中脘、天樞、氣海；然後坐起來，按兩膝下的足三里與兩腕的內關。',
    },
    posture: { en: 'On your back, knees bent, then seated', zh: '仰臥屈膝，再坐起' },
    often: { en: 'Once or twice a day, between meals', zh: '兩餐之間，一天一到兩次' },
    caution: {
      en: ['pregnant: skip CV6,', 'no deep belly pressure'],
      zh: ['孕期略過氣海，', '腹部不可深壓'],
    },
    help: [
      {
        en: 'you are a woman of 50 or over and bloating persists or keeps coming back: ask about ovarian checks',
        zh: '五十歲或以上的女性，腹脹持續或反覆出現：請問醫生卵巢檢查',
      },
      {
        en: 'there is weight loss, blood in the stool or black stool, or anaemia',
        zh: '體重下降、便中帶血或黑便，或有貧血',
      },
      { en: 'swallowing is hard, or vomiting keeps coming back', zh: '吞嚥困難，或嘔吐持續不止' },
      { en: 'the symptoms are new and began after about 55', zh: '約五十五歲以後新出現的症狀' },
      {
        en: 'there is severe pain, or a swollen belly passing no wind or stool, especially after surgery',
        zh: '劇烈腹痛，或肚子脹大卻不排氣、不排便，手術後尤要留意',
      },
    ],
    steps: {
      CV12: {
        how: {
          en: 'Flat fingers halfway between navel and breastbone; sink in slowly on each breath out, light to moderate, for about a minute.',
          zh: '手指平放在肚臍與胸骨下端之間的中點；每次呼氣時慢慢沉下，輕到中等力度，約一分鐘。',
        },
        note: { en: ['halfway up,', 'navel to breastbone'], zh: ['肚臍與胸骨', '下端的中點'] },
      },
      ST25: {
        how: {
          en: 'Three finger-widths either side of the navel; two or three fingers each side, small slow circles, gentle, for about a minute.',
          zh: '肚臍左右旁開三橫指；每邊兩三根手指，畫小而慢的圈，輕柔，約一分鐘。',
        },
      },
      CV6: {
        how: {
          en: 'Two finger-widths below the navel; a warm palm or soft fingertips held still, light and steady, for about a minute.',
          zh: '肚臍下兩橫指；以溫暖的掌心或柔軟的指腹靜置，輕而穩，約一分鐘。',
        },
        note: { en: ['leave it out', 'in pregnancy'], zh: ['孕期', '略過此穴'] },
      },
      ST36: {
        how: {
          en: 'Four finger-widths below the kneecap, one finger-width out from the shin; thumb pad, firm but comfortable, about a minute a leg.',
          zh: '膝蓋骨下四橫指，脛骨前緣向外一橫指；拇指指腹，力度分明而舒適，每側約一分鐘。',
        },
      },
      PC6: {
        how: {
          en: 'Three finger-widths above the wrist crease, between the two tendons; thumb pad to comfortable depth, about a minute, then swap wrists.',
          zh: '腕橫紋上三橫指，兩條筋腱之間；拇指指腹按到舒適的深度，約一分鐘，再換手腕。',
        },
      },
    },
  },
  {
    slug: 'constipation',
    minutes: 10,
    finding: 2,
    line: {
      en: 'Hard, slow or infrequent stools. Clockwise belly massage first, then points beside the navel, on the forearm and on the shin.',
      zh: '大便乾硬、次數少、排出費力。先順時針按摩腹部，再按肚臍旁、前臂與小腿的穴位。',
    },
    purpose: {
      en: 'Habits first; then warm the belly clockwise and relay down through the forearm and the shin.',
      zh: '習慣先行；再順時針溫暖腹部，經前臂與小腿一路接力。',
    },
    order: {
      en: 'Clockwise belly massage first, then Tianshu beside the navel; sit up for Zhigou on the forearm, then Zusanli and Shangjuxu on the shin.',
      zh: '先順時針按摩腹部，再按肚臍旁的天樞；然後坐起，按前臂的支溝，最後是小腿的足三里與上巨虛。',
    },
    posture: { en: 'Lying, knees bent; then seated', zh: '仰臥屈膝，再坐起' },
    often: { en: 'Once or twice a day, not after meals', zh: '一天一到兩次，避開飽餐後' },
    caution: { en: ['in pregnancy, no', 'deep belly pressure'], zh: ['孕期', '不深壓腹部'] },
    help: [
      { en: 'there is blood in or on the stool, or the stool is black', zh: '糞便帶血，或呈黑色' },
      {
        en: 'you are losing weight without trying, or have signs of anaemia',
        zh: '體重莫名下降，或有貧血跡象',
      },
      {
        en: 'bowel habit has changed and stayed changed, especially over about 50 or with bowel cancer in the family',
        zh: '排便習慣持續改變，尤其年過五十或有大腸癌家族史',
      },
      {
        en: 'there is severe belly pain, a swollen belly or vomiting, and no wind passes',
        zh: '劇烈腹痛、腹脹隆起或嘔吐，且無法排氣',
      },
      { en: 'constipation alternates with diarrhoea', zh: '便秘與腹瀉交替出現' },
      { en: 'it began after starting a new medicine', zh: '開始服用新藥後才出現' },
    ],
    steps: {
      ST25: {
        how: {
          en: 'After the belly massage, two or three finger pads on both sides at once; press in on the out-breath, small circles, about a minute.',
          zh: '腹部按摩之後，兩三指指腹同時落在兩側；呼氣時按到舒適的深度，畫小圈，約一分鐘。',
        },
        note: { en: ['three fingers out', 'from the navel'], zh: ['肚臍旁開', '三橫指'] },
      },
      TH6: {
        how: {
          en: 'Thumb of the other hand in the groove between the forearm bones, four fingers above the wrist crease; firm but comfortable, a minute a side.',
          zh: '另一手拇指落在前臂兩骨之間的凹槽，腕橫紋上四橫指；力道分明而舒適，每側約一分鐘。',
        },
        note: { en: ['back of the forearm,', 'between the bones'], zh: ['前臂背面，', '兩骨之間'] },
      },
      ST36: {
        how: {
          en: 'Four fingers below the hollow at the outer knee, a finger out from the shin edge; thumb pressure, about a minute each leg.',
          zh: '膝下外側凹陷往下四橫指、脛骨前緣外一橫指；拇指按壓，每側約一分鐘。',
        },
      },
      ST37: {
        how: {
          en: 'Slide four more finger-widths down the same line and press the same way, about a minute each leg.',
          zh: '沿同一直線再往下四橫指，以同樣的方式按壓，每側約一分鐘。',
        },
        note: { en: ['four fingers', 'below Zusanli'], zh: ['足三里下', '四橫指'] },
      },
    },
  },
  {
    slug: 'knee-arthritis',
    minutes: 10,
    finding: 2,
    line: {
      en: 'A stiff, aching knee that grinds on the stairs and swells after a long day on your feet.',
      zh: '膝蓋僵硬痠痛，上落樓梯沙沙作響，站了一整天就有點腫。',
    },
    purpose: {
      en: 'Six points ringing the knee, pressed top to bottom beside daily exercise, never instead of it.',
      zh: '環繞膝蓋的六個穴位，由上而下按壓，配合每天運動，而不是取代運動。',
    },
    order: {
      en: 'Warm the thigh and kneecap first, then press above the knee, the outer knee eye, both sides below the knee and the shin.',
      zh: '先暖一暖大腿和髕骨，再按膝上兩穴、外膝眼、膝下內外兩側，最後是小腿前面。',
    },
    posture: { en: 'Seated, knee bent, feet flat', zh: '坐著屈膝，雙腳平放' },
    often: { en: 'Once or twice a day', zh: '每天一到兩次' },
    caution: { en: ['not on a hot,', 'swollen knee'], zh: ['膝蓋紅腫發熱', '時不要按'] },
    help: [
      {
        en: 'the knee is hot, red and swollen, especially with fever',
        zh: '膝蓋又紅又熱又腫，尤其伴有發燒',
      },
      { en: 'the knee locks, catches or gives way', zh: '膝蓋會卡住、鎖死或突然發軟' },
      {
        en: 'you cannot bear weight after a fall, twist or blow',
        zh: '跌倒、扭傷或撞擊後無法承重',
      },
      { en: 'the calf is swollen, tender or painful', zh: '小腿腫脹、壓痛或疼痛' },
      {
        en: 'the pain is rapidly worsening or the knee is changing shape',
        zh: '疼痛急速加重，或膝蓋外形在改變',
      },
    ],
    steps: {
      SP10: {
        how: {
          en: 'Heel of the hand or flat of the thumb, firm but comfortable, about a minute; three finger-widths above the inner top corner of the kneecap.',
          zh: '用掌根或拇指指腹平按，穩而舒適，約一分鐘；在髕骨內上角往上三橫指。',
        },
      },
      ST34: {
        how: {
          en: 'Heel of the hand or flat of the thumb, about a minute; three finger-widths above the outer top corner of the kneecap.',
          zh: '用掌根或拇指指腹平按，約一分鐘；在髕骨外上角往上三橫指。',
        },
      },
      ST35: {
        how: {
          en: 'One fingertip with small, light kneading circles, about a minute, in the hollow beside the tendon below the kneecap.',
          zh: '一指指尖輕揉小圈，約一分鐘，在髕骨下方韌帶外側的凹陷。',
        },
        note: { en: ['light: it sits', 'close to the joint'], zh: ['貼近關節，', '輕按即可'] },
      },
      SP9: {
        how: {
          en: 'Thumb pressure, press and release, about a minute; slide up the inner shin edge until it stops below the knee.',
          zh: '拇指一按一放，約一分鐘；沿脛骨內側緣往上推，推到膝下被擋住處。',
        },
      },
      GB34: {
        how: {
          en: 'Thumb pressure, about a minute, in the hollow just in front of and below the small bony knob on the outer leg.',
          zh: '拇指按壓約一分鐘，在小腿外側小骨突前下方的凹陷。',
        },
      },
      ST36: {
        how: {
          en: 'Thumb pressure, about a minute; four finger-widths below the outer knee eye, one finger-width outside the shin crest.',
          zh: '拇指按壓約一分鐘；外膝眼往下四橫指，脛骨前緣外開一橫指。',
        },
        note: { en: ['then stand up', 'and walk a little'], zh: ['按完站起來，', '走動一下'] },
      },
    },
  },
  {
    slug: 'after-stroke-limbs',
    minutes: 10,
    finding: 2,
    line: {
      en: 'For the weak side after a stroke: a carer’s light touch down the arm and the leg, alongside rehabilitation.',
      zh: '中風後無力的一側：照顧者由手臂到腿輕輕按壓，配合復康進行。',
    },
    purpose: {
      en: 'Down the outer arm, then the outer leg: light, brief holds on the weak side, never on tight muscle.',
      zh: '沿手臂外側而下，再到腿外側：在無力一側輕而短地按，不碰繃緊的肌肉。',
    },
    order: {
      en: 'Shoulder top, elbow, forearm and hand; then below the knee, behind the knee and above the ankle, all on the weak side.',
      zh: '肩頂、肘部、前臂、手背；再到膝下外側、膝後與腳踝上方，全在無力的一側。',
    },
    posture: { en: 'Seated with support, or lying on the back', zh: '坐穩有承托，或平躺' },
    often: { en: 'Once a day is plenty', zh: '一天一次已足夠' },
    caution: {
      en: ['never on tight muscle', 'or a swollen limb'],
      zh: ['痙攣肌肉不按', '腫脹肢體不碰'],
    },
    help: [
      {
        en: 'new weakness, a drooping face or trouble speaking: call emergency services now',
        zh: '新的無力、臉部下垂或說話困難：立即致電緊急服務',
      },
      {
        en: 'an arm or leg is newly swollen, warm, red or painful: same-day medical review',
        zh: '手臂或腿新近腫脹、發熱、發紅或疼痛：當天就醫評估',
      },
      {
        en: 'breathlessness or chest pain comes on: call emergency services',
        zh: '出現氣促或胸痛：致電緊急服務',
      },
      {
        en: 'a hard lump or a spreading bruise appears, especially on blood thinners',
        zh: '出現硬塊或瘀青擴散，服抗凝血藥者尤要留意',
      },
      {
        en: 'the shoulder becomes newly painful, or spasticity suddenly worsens',
        zh: '肩膀新出現疼痛，或痙攣突然加重',
      },
    ],
    steps: {
      GB21: {
        how: {
          en: 'Flat palm or finger pads on the ridge of muscle atop the shoulder, light only; half a minute, then release gradually.',
          zh: '掌心或指腹平放在肩頂的肌肉上，只用輕力；約半分鐘，再緩緩鬆開。',
        },
        note: {
          en: ['skip in pregnancy,', 'or a painful shoulder'],
          zh: ['孕期不按，', '肩痛時不碰'],
        },
      },
      LI11: {
        how: {
          en: 'Elbow resting bent; a thumb pad at the outer end of the crease, light enough that the skin just pales; half a minute.',
          zh: '手肘屈曲擱好；拇指腹落在肘橫紋外側盡頭，輕到皮膚略略發白；約半分鐘。',
        },
      },
      TH5: {
        how: {
          en: 'A thumb pad in the groove between the forearm bones, three fingers above the back wrist crease; light, half a minute.',
          zh: '拇指腹落在兩根前臂骨之間的凹溝，腕背橫紋上三橫指；輕按約半分鐘。',
        },
        note: {
          en: ['three fingers above', 'the back wrist crease'],
          zh: ['腕背橫紋上', '約三橫指'],
        },
      },
      LI4: {
        how: {
          en: 'A thumb pad in the web beside the index-finger bone, light; half a minute. Skip it if the thumb is pulled into the palm.',
          zh: '拇指腹落在虎口、食指掌骨旁，輕按約半分鐘；拇指緊扣掌心時略過。',
        },
        note: {
          en: ['skip in pregnancy;', 'never prise the thumb'],
          zh: ['孕期不按，', '勿硬掰拇指'],
        },
      },
      GB34: {
        how: {
          en: 'Find the round head of the outer leg bone below the knee; a thumb pad in the hollow in front of and below it, light.',
          zh: '在膝下外側摸到小腿細骨的圓頭，拇指腹落在它前下方的凹陷，輕按。',
        },
      },
      BL40: {
        how: {
          en: 'Mid-crease behind the knee, between the two tendons: a fingertip, lightly and briefly, for a few breaths.',
          zh: '膝後橫紋中點、兩筋之間：指腹輕而短地按，幾次呼吸即可。',
        },
        note: { en: ['vessels run here:', 'light and brief'], zh: ['血管途經，', '宜輕宜短'] },
      },
      GB39: {
        how: {
          en: 'Four fingers above the outer anklebone, just in front of the bone; a thumb pad, light, half a minute.',
          zh: '外踝尖上四橫指，貼骨的前緣；拇指腹輕按約半分鐘。',
        },
        note: { en: ['four fingers above', 'the outer anklebone'], zh: ['外踝尖上', '約四橫指'] },
      },
    },
  },
  {
    slug: 'fatigue',
    minutes: 8,
    finding: 2,
    line: {
      en: 'Low, heavy, running-on-empty days. Two leg points, a warm palm on the lower belly, and the hand to finish.',
      zh: '低沉乏力、像電池見底的日子。先按腿上兩穴，再以暖掌覆小腹，最後以手部收結。',
    },
    purpose: {
      en: 'Boost qi the traditional way: the shin and inner leg, the sea of qi below the navel, then the hand.',
      zh: '按傳統思路益氣：先小腿與內踝上方，再到臍下的氣海一帶，最後是手。',
    },
    order: {
      en: 'Zusanli on each leg, then Sanyinjiao; a warm palm circling below the navel at Qihai, then lower at Guanyuan; Hegu on each hand to finish.',
      zh: '先按兩腿的足三里，再按三陰交；以暖掌在臍下氣海畫圈，再往下移到關元；最後按兩手的合谷。',
    },
    posture: { en: 'Upright in a supported chair', zh: '坐在有靠背的椅子上' },
    often: { en: 'Once a day, morning or early afternoon', zh: '每日一次，早上或午後' },
    caution: { en: ['in pregnancy, press', 'only Zusanli'], zh: ['孕期', '只按足三里'] },
    help: [
      {
        en: 'tiredness lasts more than a few weeks with no clear cause',
        zh: '沒有明確原因的疲倦持續超過幾個星期',
      },
      {
        en: 'it comes with weight loss, fever or night sweats',
        zh: '伴隨體重下降、發燒或夜間盜汗',
      },
      {
        en: 'there is breathlessness, chest pain, unusual bleeding, or a pale face and gums',
        zh: '氣喘、胸痛、不尋常出血，或面色與牙肉蒼白',
      },
      { en: 'loud snoring comes with pauses in breathing', zh: '鼾聲很大並伴有呼吸暫停' },
      {
        en: 'mood is low, or you have any thought of harming yourself',
        zh: '情緒低落，或出現任何傷害自己的念頭',
      },
      {
        en: 'you are in cancer treatment: tell your oncology team first',
        zh: '正接受癌症治療：請先告訴腫瘤科團隊',
      },
    ],
    steps: {
      ST36: {
        how: {
          en: 'Thumb pad on the point, firm enough for a dull, spreading ache but never sharp; about a minute on each leg, breathing slowly.',
          zh: '拇指腹落在穴上，力度以鈍鈍擴散的痠脹為度，絕不到銳痛；每條腿約一分鐘，呼吸放慢。',
        },
        note: { en: ['four fingers below', 'the knee, outer side'], zh: ['膝下外側', '量四橫指'] },
      },
      SP6: {
        how: {
          en: 'Four fingers above the inner anklebone, just behind the shin bone; lighter pressure, easing in, half a minute to a minute a side.',
          zh: '內踝尖上四橫指、緊貼脛骨後緣；力度放輕，緩緩靠近，每側半分鐘到一分鐘。',
        },
        note: { en: ['often tender;', 'skip in pregnancy'], zh: ['常帶痠意，', '孕期略過'] },
      },
      CV6: {
        how: {
          en: 'Two finger-widths below the navel: a warm palm resting flat, slow small circles for about a minute; no fingertip digging.',
          zh: '臍下兩橫指：溫暖的掌心平覆其上，慢慢畫小圈約一分鐘；不用指尖往下摳。',
        },
        note: { en: ['palm only;', 'skip in pregnancy'], zh: ['只用掌心，', '孕期略過'] },
      },
      CV4: {
        how: {
          en: 'Slide the palm down to four finger-widths below the navel; the same slow circles for another minute.',
          zh: '把手掌往下移到臍下四橫指處，同樣慢慢畫圈，再一分鐘。',
        },
        note: { en: ['empty the bladder;', 'skip in pregnancy'], zh: ['先排空小便，', '孕期略過'] },
      },
      LI4: {
        how: {
          en: 'Thumb on the crest of the mound between thumb and index finger, pressing towards the index bone; half a minute on each hand.',
          zh: '拇指落在虎口隆起的丘頂，朝食指掌骨方向按壓；每隻手半分鐘。',
        },
        note: { en: ['skip', 'in pregnancy'], zh: ['孕期', '略過合谷'] },
      },
    },
  },
  {
    slug: 'labour-pain',
    pregnancy: 'labor-only',
    minutes: 10,
    finding: 2,
    line: {
      en: 'For labour at full term only: two classic points on the inner leg and the hand, pressed by a birth partner through contractions.',
      zh: '只用於足月臨產：小腿內側與手上兩個傳統穴位，由陪產者隨宮縮按壓。',
    },
    purpose: {
      en: 'Company through each contraction: the inner leg, then the hand, once labour is under way.',
      zh: '陪著度過每一陣宮縮：先小腿內側，再到手上；產程開始後才用。',
    },
    order: {
      en: 'Sanyinjiao on the inner leg first, then Hegu on the hand: press as each contraction builds, release as it fades, rest in between.',
      zh: '先按小腿內側的三陰交，再按手上的合谷：宮縮湧起時按下，退去時鬆開，兩陣之間休息。',
    },
    posture: { en: 'Whatever position labour finds', zh: '產婦覺得舒服的任何姿勢' },
    often: { en: 'Through contractions, with rests', zh: '隨宮縮按壓，間歇休息' },
    caution: { en: ['only in labour,', 'with your midwife'], zh: ['臨產方可，', '先問助產士'] },
    help: [
      {
        en: 'there is any bleeding, or the waters are green or brown',
        zh: '任何出血，或羊水呈綠色或褐色',
      },
      { en: 'the baby is moving less than usual', zh: '胎動比平時少' },
      { en: 'you have a fever or feel hot and shivery', zh: '發燒，或忽冷忽熱、發抖' },
      {
        en: 'severe pain stays constant and does not ease between contractions',
        zh: '劇痛持續，兩陣宮縮之間也不緩解',
      },
      {
        en: 'a headache comes with blurred vision or flashing lights',
        zh: '頭痛伴視力模糊或眼前閃光',
      },
      { en: 'anything worries you: call the maternity unit now', zh: '任何擔心：立刻聯絡產房' },
    ],
    steps: {
      SP6: {
        how: {
          en: 'Four fingers above the inner anklebone, behind the shin bone: a thumb pad, firm but never sharp, held through each contraction, eased off in between.',
          zh: '內踝尖上四橫指、脛骨後緣：拇指指腹按住，力度實在但不尖銳，整陣宮縮穩穩按著，間歇時放鬆。',
        },
        note: {
          en: ['term labour only,', 'never to start it'],
          zh: ['足月臨產才用，', '不可用來催生'],
        },
      },
      LI4: {
        how: {
          en: 'Thumb pad on the mound between thumb and index finger, beside the bone; press as a contraction rises, release as it ebbs. Either hand.',
          zh: '拇指指腹落在虎口隆起處、靠近掌骨；宮縮湧起時按下，退去時鬆開。左右手皆可。',
        },
        note: { en: ['37 weeks or later,', 'team agreed'], zh: ['滿三十七週，', '醫護同意後'] },
      },
    },
  },
];

const routines: readonly Routine[] = ROUTINES.map((input) => routineSchema.parse(input));

/**
 * Signs gathered from the conditions' red-flag sections that mean leave
 * the points for later and see a doctor promptly, for the index's
 * "when to get help now" box.
 */
export const urgentSigns: readonly RoutineLine[] = z.array(bilingual(110)).parse([
  {
    en: 'a sudden, severe headache unlike any before, or one after a blow to the head',
    zh: '突發劇烈、與以往截然不同的頭痛，或頭部受撞擊後的頭痛',
  },
  {
    en: 'fever with a stiff neck, or new weakness, numbness, confusion or trouble seeing',
    zh: '發熱伴頸項強直，或新出現的無力、麻木、意識混亂、視物異常',
  },
  {
    en: 'chest pain, vomit with blood in it, or vomiting that keeps fluids from staying down',
    zh: '胸痛、嘔血，或嘔吐到連水都留不住',
  },
  { en: 'severe belly pain when you could be pregnant', zh: '有懷孕可能時的明顯腹痛' },
  {
    en: 'a face that droops, an arm that weakens or speech that slurs, all of a sudden',
    zh: '突然口角歪斜、手臂無力或言語含糊',
  },
  {
    en: 'new swelling, warmth or redness in one arm or leg, or sudden breathlessness',
    zh: '單側手臂或腿新出現腫脹、發熱或發紅，或突然氣促',
  },
  {
    en: 'loss of bladder or bowel control, or numbness around the groin',
    zh: '大小便失控，或腹股溝周圍麻木',
  },
  { en: 'any thought of harming yourself', zh: '任何傷害自己的念頭' },
]);

/**
 * The routine for a condition, when one is written.
 * @param slug route identifier.
 * @returns the authored routine for that condition, or undefined.
 */
export function routineBySlug(slug: string): Routine | undefined {
  return routines.find((routine) => routine.slug === slug);
}
