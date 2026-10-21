/**
 * Interface copy for the conditions, guided-practice and protocols pages in
 * the Woodblock Chart. Only chrome and microcopy live here — every medical
 * fact on these pages comes from the content registries. Traditional Chinese
 * is authored once; simplified is derived from it, as the prose arms are.
 */

import { toSimplified } from '@/utilities/i18n/t2s';

import type { EvidenceSource } from '@/content/evidence';
import type { Condition } from '@/content/schemas';
import type { Locale } from '@/utilities/routes';

/** Body-area shelf a condition sits on in the index. */
export type ConditionGroupKey = 'head' | 'mind' | 'belly' | 'limbs' | 'back' | 'care';

/** One shelf of the conditions index. */
export interface ConditionGroup {
  key: ConditionGroupKey;
  /** Han word set before the heading. */
  han: string;
  /** Condition slugs on the shelf, in reading order. */
  slugs: readonly string[];
}

/** Han labels for one condition, in the page locale's script. */
export interface HanLabel {
  /** Han name of the condition. */
  han: string;
  /** Short vertical cartouche title (頭痛方 …). */
  slip: string;
  /** Two-character glyph set before the name on chips and rows (頭痛 …). */
  glyph: string;
}

/** Localized labels for one condition. */
export interface ConditionLabel extends HanLabel {
  /** Display name for the page locale. */
  name: string;
}

/** Copy for the three-step explainer on the index. */
export interface StepCopy {
  han: string;
  title: string;
  text: string;
}

/** Breadcrumb and shared labels. */
export interface SharedCopy {
  home: string;
  conditions: string;
  routines: string;
  breadcrumb: string;
  pointsCount: string;
  /** Card footer: `{n}` points and about `{min}` minutes. */
  setMinutes: string;
  readSet: string;
  pressAlong: string;
  leaf: string;
  /** Two-line pregnancy margin note. */
  pregnancyNote: [string, string];
  groups: Record<ConditionGroupKey, string>;
  setCount: string;
  setsCount: string;
  /** Two-line card note; `{list}` is the points left out in pregnancy. */
  cardCaution: [string, string];
  /** Safety cards shared by the practice and protocols pages. */
  safety: SafetyCopy;
}

/** Headings and generic text of the safety cards. */
export interface SafetyCopy {
  title: string;
  stopTitle: string;
  stopText: string;
  pregnancyTitle: string;
  pregnancyText: string;
  pregnancyNone: string;
  urgentLink: string;
}

/** Copy for the conditions index. */
export interface IndexCopy {
  kicker: string;
  title: [string, string];
  intro: string;
  sets: string;
  points: string;
  /** `{min}` to `{max}` minutes a routine. */
  minutes: string;
  allRoutines: string;
  helpTitle: string;
  helpIntro: string;
  helpFoot: string;
  helpFootRed: string;
  shelfLabel: string;
  show: string;
  all: string;
  countAll: string;
  countSome: string;
  howTitle: string;
  pressSet: string;
  steps: [StepCopy, StepCopy, StepCopy];
  footnote: string;
}

/** Copy for the cited evidence box on a condition page. */
export interface EvidenceBoxCopy {
  title: string;
  /** Heading over the Chinese-medicine authorities. */
  chineseTitle: string;
  /** Heading over the clinical research. */
  researchTitle: string;
  kinds: Record<EvidenceSource['kind'], string>;
  /** Label before the points a source names, with its colon. */
  pointsLabel: string;
  /** Link text that opens a source. */
  open: string;
}

/** Copy for one condition page. */
export interface ConditionPageCopy {
  kicker: string;
  helpTitle: string;
  helpMore: string;
  orderNote: string;
  pointsBothSides: string;
  /** Accessible plate label: `{name}` and `{code}`. */
  plateLabel: string;
  stopLine: string;
  whyTitle: string;
  evidenceTitle: string;
  relatedTitle: string;
  readTitle: string;
  sourcesTitle: string;
  lastReviewed: string;
  /** Vertical label of the fish-tail strip. */
  strip: string;
  /** Margin-note label of a routine step's how line. */
  how: string;
  /** The cited evidence box. */
  sourceBox: EvidenceBoxCopy;
}

/** Copy for the guided practice page and its timer. */
export interface PracticeCopy {
  crumb: string;
  kicker: string;
  title: string;
  intro: string;
  listJoin: string;
  about: string;
  stepsTitle: string;
  beforeTitle: string;
  beforeText: string;
  stepLabel: string;
  where: string;
  how: string;
  howText: string;
  side: string;
  left: string;
  right: string;
  sideNoteLr: string;
  sideNoteBoth: string;
  sideNoteMid: string;
  sideEach: string;
  sideBoth: string;
  sideMid: string;
  figLeft: string;
  figRight: string;
  figBoth: string;
  figMid: string;
  plate: string;
  start: string;
  pause: string;
  resume: string;
  again: string;
  reset: string;
  toggleAria: string;
  ready: string;
  pressing: string;
  paused: string;
  pressed: string;
  ringLabel: string;
  tickNote: string;
  hurt: string;
  hurtMessage: string;
  seconds: string;
  secondsUnit: string;
  previous: string;
  previousNamed: string;
  next: string;
  lastStep: string;
  progressLabel: string;
  progress: string;
  allDone: string;
  doneTitle: string;
  doneText: string;
  stampLabel: string;
  goAgain: string;
  backTo: string;
  statusDone: string;
  statusNow: string;
  statusLeftDone: string;
  statusRightDone: string;
  stepRow: string;
  announceStep: string;
  announcePress: string;
  pregnancyStep: string;
  leafLink: string;
  navLabel: string;
  practiceLabel: string;
  stepMid: string;
  urgentTitle: string;
  /** Urgent card text; `{list}` is the routine's first red flags. */
  urgentIf: string;
  urgentJoin: string;
  urgentLast: string;
}

/** Copy for the routines index. */
export interface ProtocolsCopy {
  kicker: string;
  title: [string, string];
  intro: string;
  factSets: string;
  factSetsValue: string;
  factPoints: string;
  factPointsValue: string;
  factTime: string;
  factTimeValue: string;
  crumb: string;
  factHand: string;
  factHandValue: string;
  legendTitle: string;
  legendSet: string;
  legendPoints: string;
  legendTime: string;
  legendFinding: string;
  listTitle: string;
  pressAlong: string;
  sequence: string;
  sequenceJoin: string;
  slipNumber: string;
  timeLabel: string;
  timeValue: string;
  findingLabel: string;
  /** Finding labels, from easy (1) to takes care (3). */
  finding: readonly [string, string, string];
  /** Accessible label of the finding dots; `{n}` of 3, `{label}`. */
  findingAria: string;
  whereLabel: string;
  oftenLabel: string;
  footnote: string;
  readConditions: string;
  beforeTitle: string;
  /** Joins the points left out in pregnancy across all routines. */
  pregnancyJoin: string;
  urgentTitle: string;
  urgentText: string;
  urgentLink: string;
}

/** Decorative Han (cartouches, seals, section glyphs) in the page locale's script. */
export interface HanMarks {
  /** Prescription-slip cartouche (方箋). */
  slip: string;
  /** Seal on each prescription slip (方 · 箋). */
  slipSeal: readonly [string, string];
  /** Glyph of the "why these" box (注). */
  why: string;
  /** Glyph of the evidence box (證). */
  evidence: string;
  /** Glyph of the related-links box (類). */
  related: string;
  /** Glyph of the full-prose heading (讀). */
  read: string;
  /** Glyph of the FAQ heading (問). */
  faq: string;
  /** Glyph of the sources heading (據). */
  sources: string;
  /** Vertical title of the practice strip (經穴圖 · 按). */
  practiceStrip: string;
  /** Plate tag after a point's hanzi, `{name}圖`. */
  figure: string;
  /** Seal stamped when a practice is finished (方 · 畢). */
  doneSeal: readonly [string, string];
  /** Row glyphs of a prescription slip: time, finding, where, how often. */
  slipRows: { time: string; finding: string; where: string; often: string };
}

/** Everything the conditions area needs for one locale. */
export interface ConditionsCopy {
  shared: SharedCopy;
  index: IndexCopy;
  condition: ConditionPageCopy;
  practice: PracticeCopy;
  protocols: ProtocolsCopy;
  marks: HanMarks;
  /** Han labels per condition slug. */
  labels: Record<string, HanLabel>;
}

/** Index shelves by body area; slugs not listed fall onto no shelf. */
export const CONDITION_GROUPS: readonly ConditionGroup[] = [
  { key: 'head', han: '頭頸', slugs: ['tension-headache', 'desk-neck-shoulder'] },
  { key: 'mind', han: '心神', slugs: ['anxiety', 'insomnia'] },
  {
    key: 'belly',
    han: '腹',
    slugs: ['travel-nausea', 'nausea-after-treatment', 'bloating', 'constipation', 'period-pain'],
  },
  { key: 'limbs', han: '四肢', slugs: ['knee-arthritis', 'after-stroke-limbs'] },
  { key: 'back', han: '腰背', slugs: ['back-pain'] },
  { key: 'care', han: '調養', slugs: ['fatigue', 'labour-pain'] },
];

/** Han names and cartouche titles, keyed by slug (traditional source). */
const HAN_LABELS: Record<string, HanLabel> = {
  'tension-headache': { han: '緊張性頭痛', slip: '頭痛方', glyph: '頭痛' },
  'anxiety': { han: '心緒不安', slip: '安神方', glyph: '焦慮' },
  'insomnia': { han: '失眠', slip: '睡前方', glyph: '失眠' },
  'travel-nausea': { han: '旅途噁心', slip: '行旅方', glyph: '噁心' },
  'period-pain': { han: '經痛', slip: '經痛方', glyph: '經痛' },
  'back-pain': { han: '腰背痛', slip: '腰背方', glyph: '背痛' },
  'desk-neck-shoulder': { han: '伏案頸肩痛', slip: '頸肩方', glyph: '頸肩' },
  'nausea-after-treatment': { han: '術後及化療噁心', slip: '止嘔方', glyph: '止嘔' },
  'bloating': { han: '腹脹', slip: '腹脹方', glyph: '腹脹' },
  'constipation': { han: '便秘', slip: '通便方', glyph: '便秘' },
  'knee-arthritis': { han: '膝關節痛', slip: '膝痹方', glyph: '膝痹' },
  'after-stroke-limbs': { han: '中風後', slip: '通絡方', glyph: '中風' },
  'fatigue': { han: '疲倦乏力', slip: '益氣方', glyph: '疲倦' },
  'labour-pain': { han: '分娩痛', slip: '臨產方', glyph: '分娩' },
};

const EN: ConditionsCopy = {
  shared: {
    home: 'Home',
    conditions: 'Conditions',
    routines: 'Routines',
    breadcrumb: 'Breadcrumb',
    pointsCount: '{n} points',
    setMinutes: '{n} points · about {min} min',
    readSet: 'Read the set →',
    pressAlong: 'Press along with me →',
    leaf: 'leaf →',
    pregnancyNote: ['leave out', 'in pregnancy'],
    groups: {
      head: 'Head and neck',
      mind: 'Mind and sleep',
      belly: 'Belly',
      limbs: 'Arms and legs',
      back: 'Back',
      care: 'Recovery and care',
    },
    setCount: '{n} set',
    setsCount: '{n} sets',
    cardCaution: ['skip {list}', 'in pregnancy'],
    safety: {
      title: 'Safety',
      stopTitle: 'Stop if it hurts',
      stopText:
        'A dull, heavy ache is right. Sharp, electric or spreading pain means stop at once. Leave broken, inflamed or numb skin alone.',
      pregnancyTitle: 'If you are pregnant',
      pregnancyText:
        'Leave out {list} entirely, and talk with a qualified practitioner before starting any self-pressure routine.',
      pregnancyNone:
        'Talk with a qualified practitioner before starting any self-pressure routine.',
      urgentLink: 'Get help now →',
    },
  },
  index: {
    kicker: 'By everyday concern',
    title: ['Everyday complaints,', 'and the points for them'],
    intro:
      '{n} common complaints. Each has a short set of points that tradition reached for, written out as a gentle routine you can press yourself. Background for calm self-care, not a diagnosis.',
    sets: '{n} sets',
    points: '{n} points',
    minutes: '{min} to {max} minutes each',
    allRoutines: 'All routines →',
    helpTitle: 'When to get help now',
    helpIntro: 'Leave the points for later and see a doctor promptly if you have',
    helpFoot: 'Call your local emergency number, or see a doctor today.',
    helpFootRed: 'Urgency is information; let a professional read it.',
    shelfLabel: 'Conditions by kind',
    show: 'Show',
    all: 'All',
    countAll: 'All {n} conditions',
    countSome: 'Showing {n} of {total} conditions',
    howTitle: 'How a set works',
    pressSet: 'Press a set with me · {min} min',
    steps: [
      {
        han: '尋',
        title: 'Find',
        text: 'Each point sits by a landmark: a bone, a crease, a hollow. Find it by feel, not by force. A dull, heavy ache tells you that you are there.',
      },
      {
        han: '按',
        title: 'Press',
        text: 'Thumb or fingertip pad, only as firm as feels pleasant. Hold for five slow breaths, about a minute, then let go slowly.',
      },
      {
        han: '息',
        title: 'Pause',
        text: 'Move to the next point in order. Once or twice a day is plenty. Sharp, electric or spreading pain means stop.',
      },
    ],
    footnote:
      'Fingers and palms only, never needles. Skip broken or irritated skin. Pregnant, unwell or on regular medication? Ask a qualified practitioner first.',
  },
  condition: {
    kicker: 'A set of points',
    helpTitle: 'Get medical help now if',
    helpMore: 'Read the full note ↓',
    orderNote: 'Pressed in this order, from the first point to the last.',
    pointsBothSides: '{n} points',
    plateLabel: '{name} ({code}) marked on the plate',
    stopLine: 'Stop at once on sharp, electric or spreading pain. Skip broken or numb skin.',
    whyTitle: 'Why these',
    evidenceTitle: 'What the evidence says',
    relatedTitle: 'Related',
    readTitle: 'The page in full',
    sourcesTitle: 'Sources',
    lastReviewed: 'Last reviewed',
    strip: '經穴圖 · 症',
    how: 'How',
    sourceBox: {
      title: 'Where this comes from',
      chineseTitle: 'Chinese medicine basis',
      researchTitle: 'Clinical research',
      kinds: {
        'guideline': 'Guideline',
        'consensus': 'Expert consensus',
        'nursing-protocol': 'Nursing protocol',
        'textbook': 'Textbook',
        'cochrane': 'Cochrane review',
        'systematic-review': 'Systematic review',
        'rct': 'Randomised trial',
      },
      pointsLabel: 'Points named:',
      open: 'Open source',
    },
  },
  practice: {
    crumb: 'Press along',
    kicker: 'Routine {i} of {total} · about {min} min',
    title: '{name}, a point at a time',
    intro:
      '{n} points in order: {list}. First sit somewhere supported, drop the shoulders, unclench the jaw and take a few slow breaths.',
    listJoin: ', ',
    about: 'About {name} →',
    stepsTitle: '{n} steps',
    beforeTitle: 'Before you start',
    beforeText:
      'Warm hands help. Press only as firmly as feels pleasant, and let go slowly. Once or twice a day is plenty.',
    stepLabel: 'Step {i} of {n}',
    where: 'Where',
    how: 'How',
    howText: 'Only as firm as feels pleasant. Breathe out as you press, ease as you breathe in.',
    side: 'Side',
    left: 'Left',
    right: 'Right',
    sideNoteLr: 'One side at a time; the other hand presses.',
    sideNoteBoth: 'Both sides at once on this step.',
    sideNoteMid: 'One point, on the midline.',
    sideEach: 'each side',
    sideBoth: 'both sides',
    sideMid: 'midline',
    figLeft: 'left side',
    figRight: 'right side',
    figBoth: 'both sides',
    figMid: 'one point, on the midline',
    plate: '{name} ({code}) marked on the plate',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    again: 'Press again',
    reset: 'Reset',
    toggleAria: '{action}: press timer for {name}',
    ready: 'ready',
    pressing: 'pressing',
    paused: 'paused',
    pressed: 'pressed',
    ringLabel: 'Press timer: {marks} of 12 marks, {left} left',
    tickNote: 'Twelve marks, one press. Breathe out as you press, ease as you breathe in.',
    hurt: 'Stop if it hurts',
    hurtMessage:
      'Stopped. Let go slowly and rest the spot. Skip this point today; carry on with the next one, or end here. Sharp, electric or spreading pain is the cue to stop.',
    seconds: 'Seconds a press',
    secondsUnit: '{n} s',
    previous: '← Previous',
    previousNamed: '← {name}',
    next: 'Next: {name} →',
    lastStep: 'Last step',
    progressLabel: 'Routine progress',
    progress: '{done} of {n} done · about {min} min left',
    allDone: 'All points done',
    doneTitle: 'All {n} points pressed',
    doneText:
      'Sit for a moment before you get up. If you feel worse rather than easier, let it be for today.',
    stampLabel: 'Seal: routine complete',
    goAgain: 'Go again',
    backTo: 'Back to {name}',
    statusDone: 'done',
    statusNow: 'now',
    statusLeftDone: 'left done',
    statusRightDone: 'right done',
    stepRow: 'Step {i}, {name} {code}',
    announceStep: 'Step {i} of {n}: {name}, {code}',
    announcePress: 'Press complete.',
    pregnancyStep: 'Traditionally avoided in pregnancy: leave {name} out if you are pregnant.',
    leafLink: 'How to find {name} →',
    navLabel: 'Steps',
    practiceLabel: 'Guided practice',
    stepMid: 'Step {i} of {n} · {s} seconds a press',
    urgentTitle: 'This is not the moment',
    urgentIf: 'Leave the points for now if {list}.',
    urgentJoin: '; ',
    urgentLast: '; or ',
  },
  protocols: {
    kicker: 'Routines',
    title: ['Routines, written', 'out like old slips'],
    intro:
      'Each routine is set down the way a prescription slip once was: what it is for, the points in order, how long it takes and how hard the points are to find. Pick one and press along, a step at a time.',
    factSets: 'Routines',
    factSetsValue: '{n}, one per condition',
    factPoints: 'Points used',
    factPointsValue: '{n} in all',
    factTime: 'Time',
    factTimeValue: 'about {min} to {max} minutes',
    crumb: 'Routines',
    factHand: 'By hand',
    factHandValue: 'Fingers and palms only, never needles',
    legendTitle: 'How to read a slip',
    legendSet: 'The slip and its number',
    legendPoints: 'Points, pressed left to right',
    legendTime: 'Minutes for the whole routine',
    legendFinding: 'How hard the points are to find',
    listTitle: 'The routines',
    pressAlong: 'Press along →',
    sequence: 'Points in order: {list}',
    sequenceJoin: ', then ',
    slipNumber: 'Routine {n}',
    timeLabel: 'Time',
    timeValue: 'about {min} min, {n} points',
    findingLabel: 'Finding',
    finding: ['Easy to find', 'Fair', 'Takes care'],
    findingAria: '{n} of 3: {label}',
    whereLabel: 'Where',
    oftenLabel: 'How often',
    footnote:
      'Each slip is written from its condition page, where the points, the order and the stop rules are explained in full.',
    readConditions: 'Read the conditions →',
    beforeTitle: 'Before any routine',
    pregnancyJoin: ' and ',
    urgentTitle: 'Some signs cannot wait',
    urgentText:
      'A sudden, severe headache, chest pain, new weakness or numbness: see a doctor first.',
    urgentLink: 'When to get help now →',
  },
  marks: hanMarks((text) => text),
  labels: HAN_LABELS,
};

const COPY: Record<Locale, ConditionsCopy> = {
  'en': EN,
  'zh-hant': chineseCopy((text) => text),
  'zh-cn': chineseCopy(toSimplified),
};

/**
 * Copy for the conditions area in one locale.
 * @param locale page language and writing system
 * @returns localized conditions-area strings
 */
export function conditionsCopy(locale: Locale): ConditionsCopy {
  return COPY[locale];
}

/**
 * Labels for a condition. English reads the registry name; Chinese locales
 * read the Han name. Unknown slugs fall back to the registry name so a new
 * condition renders before its Han labels are written.
 * @param locale page language and writing system
 * @param condition registry condition to describe
 * @returns the display name and decorative Han marks
 */
export function conditionLabel(locale: Locale, condition: Condition): ConditionLabel {
  const labels: Partial<ConditionsCopy['labels']> = COPY[locale].labels;
  const han = labels[condition.slug];
  if (!han) {
    return { name: condition.name, han: '症', slip: '方', glyph: '症' };
  }

  return { name: locale === 'en' ? condition.name : han.han, ...han };
}

/**
 * A condition's chip glyph in the locale's script, when its labels are written.
 * @param slug registry key to look up
 * @param locale page language and writing system
 * @returns the chip character, when authored
 */
export function conditionGlyphFor(slug: string, locale: Locale): string | undefined {
  const labels: Partial<ConditionsCopy['labels']> = COPY[locale].labels;

  return labels[slug]?.glyph;
}

/**
 * Chinese copy, authored in traditional characters and passed through `z`.
 * @param z Han script converter
 * @returns the converted Chinese interface strings
 */
function chineseCopy(z: (text: string) => string): ConditionsCopy {
  return {
    shared: chineseSharedCopy(z),
    index: chineseIndexCopy(z),
    condition: chineseConditionCopy(z),
    practice: chinesePracticeCopy(z),
    protocols: chineseProtocolsCopy(z),
    marks: hanMarks(z),
    labels: Object.fromEntries(
      Object.entries(HAN_LABELS).map(([slug, label]) => [
        slug,
        { han: z(label.han), slip: z(label.slip), glyph: z(label.glyph) },
      ]),
    ),
  };
}

/**
 * Decorative Han, authored once in traditional characters and passed through `z`.
 * @param z Han script converter
 * @returns converted decorative inscriptions
 */
function hanMarks(z: (text: string) => string): HanMarks {
  return {
    slip: z('方箋'),
    slipSeal: [z('方'), z('箋')],
    why: z('注'),
    evidence: z('證'),
    related: z('類'),
    read: z('讀'),
    faq: z('問'),
    sources: z('據'),
    practiceStrip: z('經穴圖 · 按'),
    figure: z('{name}圖'),
    doneSeal: [z('方'), z('畢')],
    slipRows: { time: z('時'), finding: z('難'), where: z('處'), often: z('次') },
  };
}

/**
 * converts the shared safety interface strings
 * @param z Han script converter
 * @returns localized shared safety fields
 */
function chineseSharedSafetyCopy(z: (text: string) => string): ConditionsCopy['shared']['safety'] {
  return {
    title: z('安全'),
    stopTitle: z('痛就停'),
    stopText: z(
      '鈍而沉的痠感是對的。尖銳、觸電般或擴散的痛感，立即停止。破損、發炎或麻木的皮膚不要按。',
    ),
    pregnancyTitle: z('若正在懷孕'),
    pregnancyText: z('完全略過{list}，並在開始任何自我按壓之前，先與合資格的執業者商量。'),
    pregnancyNone: z('開始任何自我按壓之前，先與合資格的執業者商量。'),
    urgentLink: z('立即求醫 →'),
  };
}

/**
 * converts the shared interface strings
 * @param z Han script converter
 * @returns localized shared fields
 */
function chineseSharedCopy(z: (text: string) => string): ConditionsCopy['shared'] {
  return {
    home: z('首頁'),
    conditions: z('症候'),
    routines: z('方箋'),
    breadcrumb: z('導覽路徑'),
    pointsCount: z('{n}穴'),
    setMinutes: z('{n}穴 · 約{min}分鐘'),
    readSet: z('細看這一組 →'),
    pressAlong: z('跟著我按 →'),
    leaf: z('穴頁 →'),
    pregnancyNote: [z('孕期'), z('略過')],
    groups: {
      head: z('頭頸'),
      mind: z('心神與睡眠'),
      belly: z('腹'),
      limbs: z('四肢'),
      back: z('腰背'),
      care: z('調養'),
    },
    setCount: z('{n}組'),
    setsCount: z('{n}組'),
    cardCaution: [z('孕期'), z('略過{list}')],
    safety: chineseSharedSafetyCopy(z),
  };
}

/**
 * converts the index interface strings
 * @param z Han script converter
 * @returns localized index fields
 */
function chineseIndexCopy(z: (text: string) => string): ConditionsCopy['index'] {
  return {
    kicker: z('依日常不適'),
    title: [z('日常的不適，'), z('與相應的穴位')],
    intro: z(
      '{n}種常見的不適，各有一小組傳統慣用的穴位，寫成可以自己按壓的溫和手法。這是平靜自我照護的背景知識，不是診斷。',
    ),
    sets: z('{n}組'),
    points: z('{n}穴'),
    minutes: z('每組{min}至{max}分鐘'),
    allRoutines: z('全部方箋 →'),
    helpTitle: z('何時應立即求醫'),
    helpIntro: z('出現以下情況，穴位先放一放，盡快就醫：'),
    helpFoot: z('請撥打當地的緊急電話，或在當天就醫。'),
    helpFootRed: z('急迫本身就是訊息，交給專業人員判讀。'),
    shelfLabel: z('依類別分列的症候'),
    show: z('顯示'),
    all: z('全部'),
    countAll: z('全部{n}個症候'),
    countSome: z('顯示{total}個中的{n}個'),
    howTitle: z('一組穴位怎麼按'),
    pressSet: z('跟我按一組 · {min}分鐘'),
    steps: [
      {
        han: z('尋'),
        title: z('尋穴'),
        text: z(
          '每個穴位都靠著一處標誌：骨頭、橫紋或凹陷。憑手感去找，不要用力硬找。按到鈍而沉的痠感，就是找對了。',
        ),
      },
      {
        han: z('按'),
        title: z('按壓'),
        text: z('用拇指或指腹，力度以舒服為限。停留五次緩慢的呼吸，約一分鐘，再慢慢放開。'),
      },
      {
        han: z('息'),
        title: z('停歇'),
        text: z('依次序移到下一穴。一天一兩次就足夠。一旦出現尖銳、觸電般或擴散的痛感，就停下來。'),
      },
    ],
    footnote: z(
      '只用手指與手掌，絕不用針。破損或發炎的皮膚不要按。懷孕、身體不適或長期服藥者，請先諮詢合資格的執業者。',
    ),
  };
}

/**
 * converts the condition interface strings
 * @param z Han script converter
 * @returns localized condition fields
 */
function chineseConditionCopy(z: (text: string) => string): ConditionsCopy['condition'] {
  return {
    kicker: z('一組穴位'),
    helpTitle: z('出現以下情況，請立即求醫'),
    helpMore: z('閱讀完整說明 ↓'),
    orderNote: z('依此次序，由第一穴按至最後一穴。'),
    pointsBothSides: z('{n}穴'),
    plateLabel: z('圖中標出{name}（{code}）'),
    stopLine: z('一旦出現尖銳、觸電般或擴散的痛感，立即停止。破損或麻木的皮膚不要按。'),
    whyTitle: z('為何取這幾穴'),
    evidenceTitle: z('證據怎麼說'),
    relatedTitle: z('相關'),
    readTitle: z('全文'),
    sourcesTitle: z('資料來源'),
    lastReviewed: z('最後審閱'),
    strip: z('經穴圖 · 症'),
    how: z('手法'),
    sourceBox: {
      title: z('依據何在'),
      chineseTitle: z('中醫依據'),
      researchTitle: z('臨床研究'),
      kinds: {
        'guideline': z('指南'),
        'consensus': z('專家共識'),
        'nursing-protocol': z('護理方案'),
        'textbook': z('教材'),
        'cochrane': z('Cochrane 系統綜述'),
        'systematic-review': z('系統綜述'),
        'rct': z('隨機對照試驗'),
      },
      pointsLabel: z('所列穴位：'),
      open: z('開啟原文'),
    },
  };
}

/**
 * converts the practice interface strings
 * @param z Han script converter
 * @returns localized practice fields
 */
function chinesePracticeCopy(z: (text: string) => string): ConditionsCopy['practice'] {
  return {
    crumb: z('跟著按'),
    kicker: z('第{i}方，共{total}方 · 約{min}分鐘'),
    title: z('{name}，一穴一穴地按'),
    intro: z('依次序按{n}穴：{list}。先找個有依靠的位置坐好，放鬆肩膀與下顎，慢慢呼吸幾次。'),
    listJoin: z('、'),
    about: z('關於{name} →'),
    stepsTitle: z('{n}步'),
    beforeTitle: z('開始之前'),
    beforeText: z('手暖一些會更好。力度以舒服為限，放開時要慢。一天一兩次就足夠。'),
    stepLabel: z('第{i}步，共{n}步'),
    where: z('位置'),
    how: z('手法'),
    howText: z('力度以舒服為限。按下時呼氣，放鬆時吸氣。'),
    side: z('左右'),
    left: z('左'),
    right: z('右'),
    sideNoteLr: z('一次按一側，用另一隻手按。'),
    sideNoteBoth: z('這一步兩側同時按。'),
    sideNoteMid: z('只有一穴，在正中線上。'),
    sideEach: z('左右各一'),
    sideBoth: z('兩側同時'),
    sideMid: z('正中'),
    figLeft: z('左側'),
    figRight: z('右側'),
    figBoth: z('兩側'),
    figMid: z('正中一穴'),
    plate: z('圖中標出{name}（{code}）'),
    ...chinesePracticeTimerCopy(z),
    previous: z('← 上一步'),
    previousNamed: z('← {name}'),
    next: z('下一步：{name} →'),
    lastStep: z('最後一步'),
    progressLabel: z('練習進度'),
    progress: z('已完成{done}/{n} · 約剩{min}分鐘'),
    allDone: z('全部穴位已完成'),
    doneTitle: z('{n}穴都按完了'),
    doneText: z('起身前先靜坐片刻。若感覺不舒服反而加重，今天就到此為止。'),
    stampLabel: z('印：方畢'),
    goAgain: z('再按一輪'),
    backTo: z('回到{name}'),
    statusDone: z('完成'),
    statusNow: z('當前'),
    statusLeftDone: z('左側完成'),
    statusRightDone: z('右側完成'),
    stepRow: z('第{i}步，{name} {code}'),
    announceStep: z('第{i}步，共{n}步：{name}，{code}'),
    announcePress: z('這一按完成。'),
    pregnancyStep: z('傳統上孕期避用：懷孕時請略過{name}。'),
    leafLink: z('如何找到{name} →'),
    navLabel: z('步驟'),
    practiceLabel: z('引導練習'),
    stepMid: z('第{i}步，共{n}步 · 每按{s}秒'),
    urgentTitle: z('現在不是按的時候'),
    urgentIf: z('若{list}，穴位先放一放。'),
    urgentJoin: z('；'),
    urgentLast: z('；或'),
  };
}

/**
 * converts the protocols interface strings
 * @param z Han script converter
 * @returns localized protocols fields
 */
function chineseProtocolsCopy(z: (text: string) => string): ConditionsCopy['protocols'] {
  return {
    kicker: z('方箋'),
    title: [z('方箋，'), z('照舊時的紙條寫下')],
    intro: z(
      '每一套都照舊時藥方紙條的樣子寫下：為何而設、依序按哪幾穴、需時多久、穴位好不好找。挑一套，跟著一步一步按。',
    ),
    factSets: z('方箋'),
    factSetsValue: z('{n}套，每個症候一套'),
    factPoints: z('所用穴位'),
    factPointsValue: z('共{n}穴'),
    factTime: z('需時'),
    factTimeValue: z('約{min}至{max}分鐘'),
    crumb: z('方箋'),
    factHand: z('手法'),
    factHandValue: z('只用手指與手掌，絕不用針'),
    legendTitle: z('怎樣讀一張紙條'),
    legendSet: z('紙條及其編號'),
    legendPoints: z('穴位，由左至右依次按'),
    legendTime: z('整套所需分鐘'),
    legendFinding: z('穴位好不好找'),
    listTitle: z('方箋一覽'),
    pressAlong: z('跟著按 →'),
    sequence: z('穴位次序：{list}'),
    sequenceJoin: z('，然後'),
    slipNumber: z('第{n}方'),
    timeLabel: z('需時'),
    timeValue: z('約{min}分鐘，{n}穴'),
    findingLabel: z('尋穴'),
    finding: [z('容易找到'), z('尚可'), z('需要細心')],
    findingAria: z('三級中的第{n}級：{label}'),
    whereLabel: z('姿勢'),
    oftenLabel: z('次數'),
    footnote: z('每一張紙條都取自它的症候頁，那裡完整說明了穴位、次序與停止的規則。'),
    readConditions: z('閱讀症候 →'),
    beforeTitle: z('按壓之前'),
    pregnancyJoin: z('與'),
    urgentTitle: z('有些徵兆不能等'),
    urgentText: z('突發劇烈的頭痛、胸痛、新出現的無力或麻木：先去看醫生。'),
    urgentLink: z('何時應立即求醫 →'),
  };
}

/**
 * converts the press timer controls and feedback
 * @param z Han script converter
 * @returns localized timer controls and status
 */
function chinesePracticeTimerCopy(
  z: (text: string) => string,
): Pick<
  PracticeCopy,
  | 'start'
  | 'pause'
  | 'resume'
  | 'again'
  | 'reset'
  | 'toggleAria'
  | 'ready'
  | 'pressing'
  | 'paused'
  | 'pressed'
  | 'ringLabel'
  | 'tickNote'
  | 'hurt'
  | 'hurtMessage'
  | 'seconds'
  | 'secondsUnit'
> {
  return {
    start: z('開始'),
    pause: z('暫停'),
    resume: z('繼續'),
    again: z('再按一次'),
    reset: z('重來'),
    toggleAria: z('{action}：{name}的按壓計時'),
    ready: z('準備'),
    pressing: z('按壓中'),
    paused: z('已暫停'),
    pressed: z('已按完'),
    ringLabel: z('按壓計時：十二刻中的第{marks}刻，剩餘{left}'),
    tickNote: z('十二刻為一按。按下時呼氣，放鬆時吸氣。'),
    hurt: z('痛就停'),
    hurtMessage: z(
      '已停止。慢慢放開，讓這處休息。今天略過這一穴；可以接著按下一穴，也可以就此結束。尖銳、觸電般或擴散的痛感，就是停下的訊號。',
    ),
    seconds: z('每按秒數'),
    secondsUnit: z('{n}秒'),
  };
}
