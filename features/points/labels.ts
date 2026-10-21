/**
 * Page chrome for the points index, the leaf and My seals, per locale.
 * Interface strings only — point facts and prose come from the content
 * registries. Simplified Chinese derives from the traditional strings so the
 * two Chinese locales cannot drift apart. Server-side: client islands get
 * the strings they need as props.
 */

import { toSimplified } from '@/utilities/i18n/t2s';

import type { BaseTemplate } from '@/content/illustrations';
import type { Locale } from '@/utilities/routes';

/** A Han word with its reading in the page language. */
export interface HanLabel {
  han: string;
  label: string;
}

/** Strings for the points index (目錄). */
export interface IndexText {
  kicker: string;
  title: string;
  intro: string;
  rss: string;
  searchLabel: string;
  searchPlaceholder: string;
  tabsLabel: string;
  tabs: { volume: HanLabel; region: HanLabel; condition: HanLabel; az: HanLabel };
  volumesHeading: string;
  /** `{n}` sealed of `{total}`. */
  sealedCount: string;
  /** `{n}` leaves. */
  leavesCount: string;
  openVolume: string;
  /** `{n}` leaves to show. */
  showLeaves: string;
  hideLeaves: string;
  regionAside: HanLabel;
  turnOver: string;
  turnBack: string;
  figureFront: string;
  figureBack: string;
  regionsHeading: string;
  conditionsHeading: string;
  conditionOpen: string;
  azHeading: string;
  /** Han heading beside the A to Z section (索引). */
  azHan: string;
  /** `{n}` of `{total}` match. */
  matches: string;
  /** `{q}` = query. */
  noMatch: string;
  sealed: string;
}

/** Strings for the leaf's own seal button. */
export interface SealButtonText {
  /** Text inside the dashed square before sealing. */
  cta: string;
  prompt: string;
  done: string;
  sealLabel: string;
  unsealLabel: string;
}

/** Strings for a point leaf. */
export interface LeafText {
  breadcrumb: string;
  index: HanLabel;
  /** `{n}` = leaf number, Han. */
  leafHan: string;
  /** `{n}` = volume number, Han. */
  volumeHan: string;
  /** `{n}` = leaf count, Han. */
  ofLeavesHan: string;
  /** `{n}`, `{total}`, `{channel}`. */
  leafOf: string;
  /** `{n}`, `{total}`. */
  ordinal: string;
  extra: HanLabel;
  direction: { group: string; cap: string; vertical: HanLabel; across: HanLabel };
  lines: { where: string; for: string; press: string; caution: string };
  notes: {
    where: [string, string];
    for: [string, string];
    press: [string, string];
    caution: [string, string];
  };
  /** Accessible name of the red notes printed above the block. */
  margin: string;
  /** The phone leaf's compact header: its name, and `{volume}` for the back link. */
  mobileBar: { label: string; back: string };
  panel: string;
  continueReading: string;
  /** Label of the boxed summary under the commentary. */
  summary: HanLabel;
  seal: SealButtonText;
  /** `{code}`, `{name}`. */
  plateLabel: string;
  /** Caption of the enlarged back-of-hand inset. */
  inset: HanLabel;
  /** `{name}`. */
  insetLabel: string;
  prevLeaf: string;
  nextLeaf: string;
  neighbors: HanLabel;
  related: HanLabel;
  conditions: HanLabel;
  contents: string;
  turn: string;
  /** `{n}`, `{total}`, `{s}`. */
  dots: string;
  sealed: string;
  howToFind: string;
  faq: string;
  sources: HanLabel;
  lastReviewed: string;
  colophon: {
    han: string;
    title: string;
    body: string;
    jsonLd: string;
    llms: string;
    /** `{path}` of one leaf's JSON copy. */
    json: string;
  };
  /** 按 · Press with me: the breathing pacer under the block. */
  pacer: PacerText;
  /** 四關 · The Four Gates, printed on LI4 and LV3. */
  fourGates: FourGatesText;
  facts: { code: string; channel: string; className: string };
  cautionsTitle: string;
  pregnancyTitle: string;
  /** `{name}`. */
  pregnancyBody: string;
  infoTitle: string;
  infoBody: string;
  datasetEnglish: string;
}

/** Strings for the breathing pacer (按 · Press with me). */
export interface PacerText {
  cap: HanLabel;
  /** `{n}` = count word for the breaths. */
  title: string;
  /** `{duration}`. */
  body: string;
  /** Count words 1–12, in order. */
  counts: readonly string[];
  minute: string;
  /** `{n}`. */
  minutes: string;
  /** `{n}`. */
  seconds: string;
  start: string;
  stop: string;
  again: string;
  breatheOut: string;
  breatheIn: string;
  done: string;
  /** Unit under the count in the ring. */
  unit: string;
  /** `{done}`, `{n}`. */
  progress: string;
}

/** Strings for the Four Gates pairing (四關). */
export interface FourGatesText {
  cap: HanLabel;
  title: HanLabel;
  body: string;
  hands: string;
  feet: string;
  /** `{han}` = the partner's Han name; the margin note above the block. */
  margin: string;
  /** Lead-in for the leaf's other recorded pairings. */
  also: string;
}

/** Strings for My seals (印譜). */
export interface SealsText {
  kicker: string;
  title: string;
  intro: string;
  statLeaves: string;
  statVolumes: string;
  bookLabel: string;
  /** `{volume}`, `{s}`, `{n}`. */
  rowLabel: string;
  volumeComplete: string;
  latest: string;
  /** `{volume}`, `{s}`, `{left}`. */
  latestText: string;
  /** `{volume}`. */
  latestDone: string;
  /** `{name}`. */
  next: string;
  emptyTitle: string;
  emptyBody: string;
  emptyLink: string;
  volumeSeals: HanLabel;
  volumeSealsBody: string;
  /** `{volume}`. */
  earned: string;
  /** `{volume}`. */
  notEarned: string;
  privacy: string;
  clear: string;
  /** `{n}`. */
  confirm: string;
  confirmYes: string;
  confirmNo: string;
  cleared: string;
  metaTitle: string;
  metaDescription: string;
}

/** All points-area strings for one locale. */
export interface PointsText {
  index: IndexText;
  leaf: LeafText;
  seals: SealsText;
  /** The carved plate each point is cut on (shared coordinate table). */
  templates: Record<BaseTemplate, HanLabel>;
}

const EN: PointsText = {
  index: {
    kicker: 'Index',
    title: '361 leaves in fourteen volumes',
    intro: 'Find a point by its volume, by where it is on the body, or by name.',
    rss: 'New guides also arrive by RSS.',
    searchLabel: 'Find a leaf on this page',
    searchPlaceholder: 'Name, code or 漢字',
    tabsLabel: 'Ways to browse',
    tabs: {
      volume: { han: '卷', label: 'By volume' },
      region: { han: '部', label: 'By region' },
      condition: { han: '症', label: 'By condition' },
      az: { han: '音', label: 'A to Z' },
    },
    volumesHeading: 'Volumes, in the traditional order',
    sealedCount: '{n} of {total} sealed',
    leavesCount: '{n} leaves',
    openVolume: 'Open the volume',
    showLeaves: 'Show the {n} leaves',
    hideLeaves: 'Hide the leaves',
    regionAside: { han: '按部', label: 'By region' },
    turnOver: 'Turn over',
    turnBack: 'Turn back',
    figureFront: 'Front of the carved figure; each label opens a body region',
    figureBack: 'Back of the carved figure; each label opens a body region',
    regionsHeading: 'Leaves by the plate they are cut on',
    conditionsHeading: 'Leaves named on the condition pages',
    conditionOpen: 'Read the condition',
    azHeading: 'A to Z by pinyin',
    azHan: '索引',
    matches: '{n} of {total} leaves match',
    noMatch: 'No leaf matches “{q}”. Try a code such as LI4, a pinyin name, or the Han characters.',
    sealed: 'sealed',
  },
  leaf: {
    breadcrumb: 'Breadcrumb',
    index: { han: '目錄', label: 'Index' },
    leafHan: '第{n}葉',
    volumeHan: '卷{n}',
    ofLeavesHan: '凡{n}葉',
    leafOf: 'Leaf {n} of {total} · {channel}',
    ordinal: '{n} of {total}',
    extra: { han: '奇穴', label: 'Extra point' },
    direction: {
      group: 'Chinese text direction',
      cap: 'Chinese',
      vertical: { han: '直排', label: 'vertical' },
      across: { han: '橫排', label: 'across' },
    },
    lines: { where: 'Where', for: 'For', press: 'Press', caution: 'Caution' },
    notes: {
      where: ['finding it', 'by touch'],
      for: ['the tradition', 'explained'],
      press: ['how to', 'press'],
      caution: ['the reason', 'behind it'],
    },
    margin: 'Notes on this leaf',
    mobileBar: { label: 'Leaf', back: 'Back to {volume}' },
    panel: 'Commentary',
    continueReading: 'Read the whole section',
    summary: { han: '提要', label: 'In short' },
    seal: {
      cta: 'seal it',
      prompt: 'Done? Seal the leaf',
      done: 'Sealed',
      sealLabel: 'Seal this leaf as read',
      unsealLabel: 'Leaf sealed. Press to remove the seal.',
    },
    plateLabel: '{code} {name} marked in cinnabar on the carved figure, with its channel',
    inset: { han: '手背', label: 'back of the hand, enlarged' },
    insetLabel: 'Enlarged back of the hand with {name} marked in cinnabar',
    prevLeaf: 'Previous leaf',
    nextLeaf: 'Next leaf',
    neighbors: { han: '鄰', label: 'Neighbouring leaves' },
    related: { han: '配', label: 'Pairs with' },
    conditions: { han: '症', label: 'Often paired with' },
    contents: 'On this leaf',
    turn: 'Turn the leaf',
    dots: 'Leaf {n} of {total}; {s} sealed in this volume',
    sealed: 'sealed',
    howToFind: 'How to find it in {n} steps',
    faq: 'Frequently asked',
    sources: { han: '據', label: 'Sources' },
    lastReviewed: 'Last reviewed',
    colophon: {
      han: '牌記',
      title: 'This leaf, for machines',
      body: 'Old books ended with a colophon saying who printed them. Every leaf here carries the same facts as structured data for agents and search, with no layout in the way.',
      jsonLd: 'JSON-LD in the page: MedicalWebPage, MedicalEntity and FAQPage',
      llms: '/llms.txt — the index of every leaf',
      json: 'GET {path}',
    },
    pacer: {
      cap: { han: '按', label: 'Press with me' },
      title: '{n} slow breaths',
      body: 'About {duration}. Press as you breathe out, ease as you breathe in.',
      counts: [
        'One',
        'Two',
        'Three',
        'Four',
        'Five',
        'Six',
        'Seven',
        'Eight',
        'Nine',
        'Ten',
        'Eleven',
        'Twelve',
      ],
      minute: 'a minute',
      minutes: '{n} minutes',
      seconds: '{n} seconds',
      start: 'Start',
      stop: 'Stop',
      again: 'Again',
      breatheOut: 'Breathe out and press',
      breatheIn: 'Breathe in and ease',
      done: 'Done. Rest the hand.',
      unit: 'breaths',
      progress: '{done} of {n} breaths',
    },
    fourGates: {
      cap: { han: '配', label: 'Pairs with' },
      title: { han: '四關', label: 'The Four Gates' },
      body: 'Four points pressed together: a classic pairing for tension and stress.',
      hands: 'both hands',
      feet: 'both feet',
      margin: 'Pairs with {han} for the “Four Gates”.',
      also: 'Also paired with',
    },
    facts: { code: 'Code', channel: 'Channel', className: 'Class' },
    cautionsTitle: 'Cautions from the classical sources',
    pregnancyTitle: 'Avoid during pregnancy',
    pregnancyBody:
      '{name} is traditionally contraindicated in pregnancy. If you are pregnant, please choose a different point, or pause self-acupressure and consult a licensed practitioner.',
    infoTitle: 'How we use this point',
    infoBody:
      'Self-acupressure is not a substitute for medical care. Stop if a sensation becomes sharp, and seek professional help for persistent symptoms.',
    datasetEnglish: '',
  },
  seals: {
    kicker: 'My seals',
    title: 'Your seal book',
    intro: 'One square for every leaf. Read a leaf, stamp it, and the book fills up.',
    statLeaves: 'Leaves',
    statVolumes: 'Volumes',
    bookLabel: 'The seal book, by volume',
    rowLabel: '{volume}: {s} of {n} leaves sealed',
    volumeComplete: 'volume complete',
    latest: 'Latest seal',
    latestText: 'Leaf {s} sealed in {volume}. {left} to go for the volume seal.',
    latestDone: 'Every leaf in {volume} is sealed.',
    next: 'Next: {name} →',
    emptyTitle: 'No seals yet',
    emptyBody:
      'Open any leaf and press “Stamp this leaf” once you have read it. The square for that leaf turns red here.',
    emptyLink: 'Open the index',
    volumeSeals: { han: '卷印', label: 'Volume seals' },
    volumeSealsBody: 'Finish every leaf in a volume to earn its seal.',
    earned: '{volume} volume seal, earned',
    notEarned: '{volume} volume seal, not yet earned',
    privacy:
      'Your seals live only in this browser. They are never sent anywhere, and they carry over between languages.',
    clear: 'Clear all seals',
    confirm: 'Lift all {n} seals from this browser? This cannot be undone.',
    confirmYes: 'Yes, clear them',
    confirmNo: 'Keep them',
    cleared: 'All seals cleared.',
    metaTitle: 'My seals',
    metaDescription: 'Your own record of the leaves you have read, kept only in this browser.',
  },
  templates: {
    'hand': { han: '手', label: 'hand' },
    'foot': { han: '足', label: 'foot' },
    'head': { han: '頭面', label: 'head and face' },
    'ear': { han: '耳', label: 'ear' },
    'torso-supine': { han: '胸腹', label: 'chest and belly' },
    'torso-prone': { han: '背', label: 'back' },
    'arm': { han: '臂', label: 'arm' },
    'leg': { han: '腿', label: 'leg' },
  },
};

const TEXT: Record<Locale, PointsText> = {
  'en': EN,
  'zh-hant': zhText((text) => text),
  'zh-cn': zhText(toSimplified),
};

/**
 * Points-area strings for a locale.
 * @param locale page language and writing system
 * @returns localized point-area strings
 */
export function pointsText(locale: Locale): PointsText {
  return TEXT[locale];
}

/**
 * Chinese strings, authored once in traditional characters; `t` is identity
 * for zh-hant and the simplified converter for zh-cn.
 * @param t Han script converter
 * @returns converted Chinese point-area strings
 */
function zhText(t: (text: string) => string): PointsText {
  return {
    index: chineseIndexCopy(t),
    leaf: chineseLeafCopy(t),
    seals: chineseSealsCopy(t),
    templates: chineseTemplatesCopy(t),
  };
}

/**
 * converts the index interface strings
 * @param t Han script converter
 * @returns localized index fields
 */
function chineseIndexCopy(t: (text: string) => string): PointsText['index'] {
  return {
    kicker: t('目錄'),
    title: t('十四卷，三百六十一葉'),
    intro: t('依卷、依身體部位或依穴名查找穴位。'),
    rss: t('新的穴位導讀也可透過 RSS 訂閱。'),
    searchLabel: t('在本頁查找穴位'),
    searchPlaceholder: t('穴名、代碼或拼音'),
    tabsLabel: t('瀏覽方式'),
    tabs: {
      volume: { han: t('卷'), label: t('依卷') },
      region: { han: t('部'), label: t('依部位') },
      condition: { han: t('症'), label: t('依症候') },
      az: { han: t('音'), label: t('依拼音') },
    },
    volumesHeading: t('依傳統次序排列的十四卷'),
    sealedCount: t('已蓋印 {n} / {total}'),
    leavesCount: t('{n} 葉'),
    openVolume: t('翻開本卷'),
    showLeaves: t('展開 {n} 葉'),
    hideLeaves: t('收起'),
    regionAside: { han: t('按部'), label: t('依部位') },
    turnOver: t('轉身'),
    turnBack: t('轉回正面'),
    figureFront: t('刻版人形正面；每個標籤都通往一個身體部位'),
    figureBack: t('刻版人形背面；每個標籤都通往一個身體部位'),
    regionsHeading: t('依圖版部位分類'),
    conditionsHeading: t('症候頁中提及的穴位'),
    conditionOpen: t('閱讀症候頁'),
    azHeading: t('依拼音排序'),
    azHan: t('索引'),
    matches: t('{total} 葉中有 {n} 葉相符'),
    noMatch: t('沒有與「{q}」相符的穴位。可試代碼（如 LI4）、拼音或漢字。'),
    sealed: t('已蓋印'),
  };
}

/**
 * converts the leaf seal interface strings
 * @param t Han script converter
 * @returns localized leaf seal fields
 */
function chineseLeafSealCopy(t: (text: string) => string): PointsText['leaf']['seal'] {
  return {
    cta: t('蓋印'),
    prompt: t('讀完了？蓋上印'),
    done: t('已蓋印'),
    sealLabel: t('蓋印，標記本葉已讀'),
    unsealLabel: t('本葉已蓋印，按此移除印記'),
  };
}

/**
 * converts the leaf colophon interface strings
 * @param t Han script converter
 * @returns localized leaf colophon fields
 */
function chineseLeafColophonCopy(t: (text: string) => string): PointsText['leaf']['colophon'] {
  return {
    han: t('牌記'),
    title: t('本葉的機讀資料'),
    body: t(
      '古書卷末有牌記，記明刻印者。本站每一葉都附有同一內容的結構化資料，方便搜尋引擎與智能代理讀取。',
    ),
    jsonLd: t('頁內 JSON-LD：MedicalWebPage、MedicalEntity 與 FAQPage'),
    llms: t('/llms.txt — 全部穴位的索引'),
    json: 'GET {path}',
  };
}

/**
 * converts the leaf pacer interface strings
 * @param t Han script converter
 * @returns localized leaf pacer fields
 */
function chineseLeafPacerCopy(t: (text: string) => string): PointsText['leaf']['pacer'] {
  return {
    cap: { han: t('按'), label: t('隨我按') },
    title: t('{n}次慢呼吸'),
    body: t('約{duration}。呼氣時按下，吸氣時放鬆。'),
    counts: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    minute: t('一分鐘'),
    minutes: t('{n}分鐘'),
    seconds: t('{n}秒'),
    start: t('開始'),
    stop: t('停止'),
    again: t('再來一次'),
    breatheOut: t('呼氣，按下'),
    breatheIn: t('吸氣，放鬆'),
    done: t('完成，讓手休息一下。'),
    unit: t('次呼吸'),
    progress: t('{n}次呼吸中已完成{done}次'),
  };
}

/**
 * converts the leaf fourGates interface strings
 * @param t Han script converter
 * @returns localized leaf fourGates fields
 */
function chineseLeafFourGatesCopy(t: (text: string) => string): PointsText['leaf']['fourGates'] {
  return {
    cap: { han: t('配'), label: t('相配') },
    title: { han: t('四關'), label: t('四關') },
    body: t('雙手合谷、雙足太衝，四穴同按，是舒緩緊繃與壓力的經典配伍。'),
    hands: t('雙手'),
    feet: t('雙足'),
    margin: t('與{han}相配，合稱「四關」。'),
    also: t('亦常相配'),
  };
}

/**
 * converts the leaf interface strings
 * @param t Han script converter
 * @returns localized leaf fields
 */
function chineseLeafCopy(t: (text: string) => string): PointsText['leaf'] {
  return {
    breadcrumb: t('導覽路徑'),
    index: { han: t('目錄'), label: t('目錄') },
    leafHan: t('第{n}葉'),
    volumeHan: t('卷{n}'),
    ofLeavesHan: t('凡{n}葉'),
    leafOf: t('{channel} · 第 {n} 葉，共 {total} 葉'),
    ordinal: t('第 {n} 穴，共 {total} 穴'),
    extra: { han: t('奇穴'), label: t('經外奇穴') },
    direction: {
      group: t('中文排版方向'),
      cap: t('中文'),
      vertical: { han: t('直排'), label: t('') },
      across: { han: t('橫排'), label: t('') },
    },
    lines: { where: t('位置'), for: t('主治'), press: t('按法'), caution: t('注意') },
    notes: {
      where: [t('以手'), t('尋穴')],
      for: [t('古用'), t('何解')],
      press: [t('按壓'), t('要領')],
      caution: [t('為何'), t('要避')],
    },
    margin: t('本葉眉批'),
    mobileBar: { label: t('本葉'), back: t('返回{volume}') },
    panel: t('注'),
    continueReading: t('閱讀全文'),
    summary: { han: t('提要'), label: t('提要') },
    seal: chineseLeafSealCopy(t),
    plateLabel: t('刻像連同所屬經脈，以朱色標示 {code} {name}'),
    inset: { han: t('手背'), label: t('手背放大') },
    insetLabel: t('手背放大圖，以朱色標示{name}'),
    prevLeaf: t('上一葉'),
    nextLeaf: t('下一葉'),
    neighbors: { han: t('鄰'), label: t('相鄰穴位') },
    related: { han: t('配'), label: t('相配穴位') },
    conditions: { han: t('症'), label: t('常配症候') },
    contents: t('本葉目次'),
    turn: t('翻頁'),
    dots: t('本卷 {total} 葉中的第 {n} 葉；已蓋印 {s} 葉'),
    sealed: t('已蓋印'),
    howToFind: t('{n} 步找到它'),
    faq: t('常見問題'),
    sources: { han: t('據'), label: t('參考來源') },
    lastReviewed: t('最後審閱'),
    colophon: chineseLeafColophonCopy(t),
    pacer: chineseLeafPacerCopy(t),
    fourGates: chineseLeafFourGatesCopy(t),
    facts: { code: t('代碼'), channel: t('經脈'), className: t('類別') },
    cautionsTitle: t('古典文獻的注意事項'),
    pregnancyTitle: t('孕期避免'),
    pregnancyBody: t(
      '{name} 傳統上孕期禁用。如正懷孕，請改用其他穴位，或暫停自我按壓並諮詢持證醫師。',
    ),
    infoTitle: t('本站如何使用此穴'),
    infoBody: t('自我按壓不能取代醫療。若感覺變得尖銳請停止；症狀持續時請尋求專業協助。'),
    datasetEnglish: t('位置與主治依據授權數據集的英文記錄。'),
  };
}

/**
 * converts the seals interface strings
 * @param t Han script converter
 * @returns localized seals fields
 */
function chineseSealsCopy(t: (text: string) => string): PointsText['seals'] {
  return {
    kicker: t('印譜'),
    title: t('你的印譜'),
    intro: t('每一葉一個方格。讀完一葉，蓋上印，印譜就會漸漸填滿。'),
    statLeaves: t('已蓋印'),
    statVolumes: t('完成卷數'),
    bookLabel: t('印譜，依卷排列'),
    rowLabel: t('{volume}：{n} 葉中已蓋印 {s} 葉'),
    volumeComplete: t('本卷已完成'),
    latest: t('最近蓋印'),
    latestText: t('{volume}已蓋印 {s} 葉，再 {left} 葉即得卷印。'),
    latestDone: t('{volume}每一葉都已蓋印。'),
    next: t('下一葉：{name} →'),
    emptyTitle: t('尚未蓋印'),
    emptyBody: t('翻開任何一葉，讀完後按「蓋印」。該葉的方格就會在這裡變紅。'),
    emptyLink: t('打開目錄'),
    volumeSeals: { han: t('卷印'), label: t('卷印') },
    volumeSealsBody: t('讀完一卷的每一葉，即得該卷之印。'),
    earned: t('{volume}卷印，已取得'),
    notEarned: t('{volume}卷印，尚未取得'),
    privacy: t('印譜只存於此瀏覽器，不會傳送到任何地方，切換語言時也會保留。'),
    clear: t('清除全部印記'),
    confirm: t('要從此瀏覽器移除全部 {n} 枚印記嗎？此操作無法復原。'),
    confirmYes: t('確定清除'),
    confirmNo: t('保留'),
    cleared: t('已清除全部印記。'),
    metaTitle: t('我的印譜'),
    metaDescription: t('你讀過的穴位記錄，只保存在此瀏覽器。'),
  };
}

/**
 * converts the templates interface strings
 * @param t Han script converter
 * @returns localized templates fields
 */
function chineseTemplatesCopy(t: (text: string) => string): PointsText['templates'] {
  return {
    'hand': { han: t('手'), label: t('手') },
    'foot': { han: t('足'), label: t('足') },
    'head': { han: t('頭面'), label: t('頭面') },
    'ear': { han: t('耳'), label: t('耳') },
    'torso-supine': { han: t('胸腹'), label: t('胸腹') },
    'torso-prone': { han: t('背'), label: t('背') },
    'arm': { han: t('臂'), label: t('臂') },
    'leg': { han: t('腿'), label: t('腿') },
  };
}
