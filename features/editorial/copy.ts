/**
 * Interface copy for the editorial trust pages (FAQ, About, policies,
 * printing record). English strings follow the approved Woodblock boards;
 * each is authored once more in Traditional Chinese, and the zh-cn tree
 * derives its Simplified text from that source, the same single-source
 * policy the editorial arms follow. Server-only: the derivation pulls in the
 * OpenCC dictionaries, so client islands receive resolved strings as props.
 */

import { armText } from '@/utilities/i18n/t2s';

import type { Locale } from '@/utilities/routes';

/** One interface string in its two authored forms. */
export interface Bilingual {
  en: string;
  /** Traditional Chinese; zh-cn derives Simplified from it. */
  zh: string;
}

/** Resolves a bilingual string for one locale. */
export type Translate = (text: Bilingual) => string;

/** Resolves one decorative Han label (seal, cartouche, caps glyph) for one locale. */
export type HanText = (text: string) => string;

/** Shared crumbs and notes. */
export const COMMON_COPY = {
  home: { en: 'Home', zh: '首頁' },
  breadcrumb: { en: 'Breadcrumb', zh: '導覽路徑' },
} satisfies Record<string, Bilingual>;

/** FAQ page copy (board WbFaq). */
export const FAQ_COPY = {
  crumb: { en: 'Questions', zh: '問答' },
  cap: { en: 'Questions and answers', zh: '常見問題' },
  title: { en: 'Questions and answers', zh: '問答' },
  lead: {
    en: 'Short, honest answers to the questions readers ask most often. Acupoints is a reference, not a clinic: these answers sit alongside medical care, never in place of it.',
    zh: '讀者最常問的問題，簡短而誠實的回答。Acupoints 是參考資料，不是診所：這些回答與醫療照護並行，絕不取而代之。',
  },
  railCap: { en: '類 · Groups', zh: '類 · 問題分類' },
  railNote: {
    en: 'One answer opens at a time. Press a question again to fold it away.',
    zh: '一次展開一則回答；再按一次問題即可收起。',
  },
  groupAll: { en: 'All', zh: '全部' },
  groupWords: { en: 'Words', zh: '詞義' },
  groupPressing: { en: 'Pressing', zh: '按壓' },
  groupSafety: { en: 'Safety', zh: '安全' },
  listTitle: { en: 'All {n} questions', zh: '全部{n}問' },
  groupTitleWords: { en: 'The words', zh: '詞義' },
  groupTitlePressing: { en: 'Finding and pressing', zh: '找穴與按壓' },
  groupTitleSafety: { en: 'Safety and limits', zh: '安全與界限' },
  count: { en: '{n} questions', zh: '共{n}問' },
  countOne: { en: 'one question', zh: '共一問' },
  unsureCap: { en: 'Still unsure?', zh: '仍有疑問？' },
  unsureTitle: { en: 'Ask a licensed practitioner', zh: '請教持證醫師' },
  unsureBody: {
    en: 'These answers are short on purpose. A symptom that persists, worsens or worries you belongs with your doctor, or a licensed acupuncturist working alongside them.',
    zh: '這些回答刻意簡短。持續、加重或令你擔心的症狀，請交給你的醫生，或與醫生協同的持證針灸師。',
  },
  emergencyLead: { en: 'Call emergency services', zh: '請立即撥打急救電話' },
  emergencyRest: {
    en: ' for chest pain, trouble breathing, sudden weakness or confusion.',
    zh: '：胸痛、呼吸困難、突然無力或意識混亂時。',
  },
  moreCap: { en: 'Not answered here?', zh: '這裡沒有答案？' },
  moreBody: {
    en: 'Send the question to the editors. Good questions become new entries.',
    zh: '把問題寄給編輯。好的問題會成為新的條目。',
  },
  aboutLink: { en: 'About this book', zh: '關於本書' },
  glossaryLink: { en: 'Glossary', zh: '詞彙' },
} satisfies Record<string, Bilingual>;

/** About page copy (board WbAbout); condensations of the authored about module. */
export const ABOUT_COPY = {
  crumb: { en: 'About', zh: '說明' },
  cap: { en: 'About this book', zh: '關於本書' },
  title: { en: 'A calm reference for a loud category.', zh: '喧囂品類裡的一處安靜參考。' },
  lead: {
    en: 'Acupoints is a free reference for the 361 WHO-standardized acupoints, written for curious readers and checked against its sources. It is educational reading, not a clinic.',
    zh: 'Acupoints 是一部免費的參考書，收錄世界衛生組織標準化的 361 個穴位，為好奇的讀者而寫，並對照來源核對。它是教育讀物，不是診所。',
  },
  glanceTitle: { en: 'At a glance', zh: '本書一覽' },
  glanceLeaves: { en: 'Leaves', zh: '葉數' },
  glanceLeavesValue: { en: '361 points', zh: '361 穴' },
  glanceChannels: { en: 'Channels', zh: '經絡' },
  glanceChannelsValue: { en: '14, plus extras', zh: '十四經，另有經外奇穴' },
  glanceLanguages: { en: 'Languages', zh: '語言' },
  glancePrice: { en: 'Price', zh: '費用' },
  glancePriceValue: { en: 'Free, no account', zh: '免費，無需賬號' },
  glanceRule: {
    en: 'If the prose and the record ever disagree, the record wins.',
    zh: '萬一行文與記錄有出入，以記錄為準。',
  },
  whatTitle: { en: 'What this is', zh: '本書是甚麼' },
  whatCap: { en: 'What it is', zh: '本書' },
  whatHead: { en: 'One quiet home per point', zh: '每穴一處安靜的家' },
  whatBody: {
    en: 'Each of the 361 points has a stable leaf: its code, Chinese name, pinyin, channel and location, the same in every language, and prose that admits uncertainty instead of performing confidence.',
    zh: '361 個穴位各有一葉固定的頁面：代碼、中文名、拼音、經絡與位置，三種語言一致；行文承認不確定，而不故作自信。',
  },
  whoCap: { en: 'Who it is for', zh: '讀者' },
  whoHead: { en: 'Curious readers', zh: '好奇的讀者' },
  whoBody: {
    en: 'The friend who asks which point someone meant. Search results split into clinic pages written to sell and wellness posts written to excite; this is the measured, sourced page in between.',
    zh: '問「到底是哪個穴位」的那位朋友。搜尋結果不是為推銷而寫的診所頁面，就是為煽動而寫的養生貼文；這裡是兩者之間那一頁有分寸、有出處的參考。',
  },
  howCap: { en: 'How a leaf is made', zh: '一葉如何刻成' },
  howHead: { en: 'Three layers, in order', zh: '三層，依次而成' },
  how1Title: { en: 'The record', zh: '記錄' },
  how1Body: {
    en: 'Code, names, channel, location and cautions, from an openly licensed dataset.',
    zh: '代碼、名稱、經絡、位置與注意事項，取自一份開放授權的數據集。',
  },
  how2Title: { en: 'The prose', zh: '行文' },
  how2Body: {
    en: 'Context, history and how people explore the point at home. It never overrides the record.',
    zh: '背景、歷史，以及人們在家如何體會這個穴位；行文從不推翻記錄。',
  },
  how3Title: { en: 'The foot', zh: '頁腳' },
  how3Body: {
    en: 'Sources, the safety note, and the date the leaf was last reviewed.',
    zh: '來源、安全提示，以及該葉最後審閱的日期。',
  },
  sourcesCap: { en: 'Where the map comes from', zh: '圖從何來' },
  sourcesTitle: { en: 'Sources and editions', zh: '來源與版本' },
  sourcesNote: {
    en: 'The four classics on the left are the lineage behind the map. Leaves quote the Jiayi Jing, the Lingshu (part of the Inner Classic) and the Bronze Man classic word for word, each line checked against a printed edition; for facts they cite only the sources marked',
    zh: '左邊四部古典是這張穴圖背後的源流。各葉逐字引用《甲乙經》、《靈樞》（《內經》的一部分）與《銅人圖經》，每句都對照刻本核過；事實則只引用標有',
  },
  sourcesNoteEnd: { en: '.', zh: '的來源。' },
  timelineLabel: { en: 'Timeline, oldest to newest', zh: '時間軸，由舊到新' },
  cited: { en: 'cited', zh: '所據' },
  gapLabel: { en: 'Four centuries pass', zh: '相隔四百年' },
  gapYears: { en: '406 years', zh: '四百零六年' },
  today: { en: 'Today', zh: '今' },
  neijingBy: { en: 'Huangdi Neijing', zh: '託名黃帝' },
  neijingDate: { en: 'c. 1st century BCE', zh: '約公元前一世紀' },
  neijingNote: {
    en: 'The Inner Classic. The channel theory the whole map is drawn on.',
    zh: '即《內經》。整張穴圖所依的經絡學說，出於此書。',
  },
  jiayiBy: { en: 'Zhenjiu Jiayi Jing', zh: '晉 · 皇甫謐' },
  jiayiDate: { en: '3rd century CE', zh: '公元三世紀' },
  jiayiNote: {
    en: "Huangfu Mi's ordered classic, the first book given wholly to acupuncture points.",
    zh: '皇甫謐編次的經典，是第一部專論針灸穴位的書。',
  },
  tongrenBy: { en: 'Tongren Shuxue Zhenjiu Tujing', zh: '宋 · 王惟一' },
  tongrenNote: {
    en: "Wang Weiyi's illustrated canon, a Song court standard taught on bronze figures.",
    zh: '王惟一所撰的圖經，北宋官定的標準，並以銅人教授。',
  },
  dachengBy: { en: 'Zhenjiu Dacheng', zh: '明 · 楊繼洲' },
  dachengNote: {
    en: "Yang Jizhou's Ming compendium. The figures on this site follow its charts.",
    zh: '明代楊繼洲所輯。本站插圖依其經絡圖刻成。',
  },
  deadmanNote: {
    en: 'Classical framing and point classes for the twenty legacy records.',
    zh: '二十份舊有編輯記錄的古典框架與穴位類別。',
  },
  whoNote: {
    en: 'Names, codes and the 361 standard locations every leaf follows.',
    zh: '每一葉依循的名稱、代碼與 361 個標準位置。',
  },
  datasetsNote: {
    en: "The open dataset behind each point's identity, category and recorded cautions.",
    zh: '每個穴位身份、類別與所錄注意事項背後的開放數據集。',
  },
  checkCap: { en: 'Checked and collated', zh: '核對與校勘' },
  checkSeal: { en: 'Seal: 考訂, checked and collated', zh: '印：考訂' },
  checkTitle: { en: 'How we check a leaf', zh: '一葉如何核對' },
  checkNote: {
    en: 'Three steps, every leaf, every language.',
    zh: '三個步驟，每一葉，每一種語言。',
  },
  check1Title: { en: 'Match the record', zh: '對照記錄' },
  check1Body: {
    en: 'Code, names, channel, location and cautions come from the registry and follow the WHO standard. Records are never edited by hand, so a correction is made once and reaches every page.',
    zh: '代碼、名稱、經絡、位置與注意事項取自註冊表，依循世界衛生組織標準。記錄從不手工改動，修正只做一次，便同步到每一頁。',
  },
  check2Title: { en: 'Screen the words', zh: '審查用語' },
  check2Body: {
    en: 'Every prose module passes the published policy before it builds: no needle instructions, no doses, no promises of a cure, no percentages. A page that fails does not ship.',
    zh: '每個行文模組在建站前都須通過公開的內容政策：不寫下針指示、不寫劑量、不許諾治癒、不列百分比。不合格的頁面不會發佈。',
  },
  check3Title: { en: 'Sign and date', zh: '署名記日' },
  check3Body: {
    en: 'Each leaf lists its sources, carries its cautions where they cannot be missed, and records the policy it was written under and the day it was last reviewed.',
    zh: '每一葉列出來源，把注意事項放在不會錯過的位置，並記下撰寫時依循的政策與最後審閱的日期。',
  },
  langsCap: { en: 'Three languages', zh: '三種語言' },
  langsTitle: { en: 'One leaf, three ways to read it', zh: '一葉三讀' },
  langsNote: {
    en: 'Each language is written on its own and carries the same facts. Switching language keeps you on the same leaf, and your seals carry over.',
    zh: '每種語言各自成文，承載相同的事實。切換語言時仍停在同一葉，已蓋的印也會一併保留。',
  },
  current: { en: 'You are reading this one', zh: '目前所讀' },
  langEnNote: {
    en: 'British spelling. Chinese terms are defined the first time they appear, then the page carries on in English.',
    zh: '英式拼寫。中文術語在首次出現時加以解釋，其後全頁以英文行文。',
  },
  langHantNote: {
    en: 'Traditional glyph forms throughout, with characters pinned to the Taiwan textbook form, such as {glyph} for KI4.',
    zh: '全用繁體字形，並依台灣課本字形定字，例如 KI4 作「{glyph}」。',
  },
  langHansNote: {
    en: 'Simplified forms, with the same sections, the same cautions and the same questions as the other two.',
    zh: '簡化字形，與另外兩種語言有相同的章節、相同的注意事項與相同的問答。',
  },
  contactCap: { en: 'Corrections', zh: '勘誤' },
  contactTitle: {
    en: 'Found a mistake? Tell the people who cut the leaf.',
    zh: '發現錯誤？告訴刻這一葉的人。',
  },
  contactBody: {
    en: 'Corrections, source suggestions and plain questions all go to one inbox, read by the people who write the pages. Pointed criticism improves the next printing faster than praise. A small editorial team makes the site; bylines will appear as contributors join.',
    zh: '勘誤、來源建議與一般提問都寄到同一個信箱，由撰寫頁面的人親自閱讀。尖銳的批評比讚美更快改進下一次刊印。本站由一支小型編輯團隊製作；隨著成員加入，會陸續補上署名。',
  },
  changedLink: { en: 'See what changed', zh: '看看改了甚麼' },
  shelfCap: { en: 'Also on this shelf', zh: '同架' },
  shelfFaq: { en: 'Questions and answers', zh: '問答' },
  shelfPolicies: { en: 'Privacy, disclaimer, policy', zh: '私隱、免責與凡例' },
  privacyQuestions: { en: 'Privacy questions', zh: '私隱查詢' },
  notAdviceLead: { en: 'Not medical advice.', zh: '並非醫療建議。' },
  notAdviceBody: {
    en: ' Anything that persists, worsens or worries you belongs with a licensed practitioner.',
    zh: '持續、加重或令你擔心的症狀，請交給持證的醫師。',
  },
  fullCap: { en: 'The full account', zh: '完整說明' },
  fullTitle: { en: 'About the book, in full', zh: '本書說明全文' },
} satisfies Record<string, Bilingual>;

/** Policy pages copy (board WbLegal). */
export const POLICY_COPY = {
  crumb: { en: 'Policies', zh: '規約' },
  cap: { en: 'The small print, made short', zh: '簡明條文' },
  title: { en: 'Policies', zh: '規約' },
  intro: {
    en: 'Four short documents: how we treat your data, what this site is not, how we handle money, and the rules every leaf is written under. Each opens with the plain-English version.',
    zh: '四份簡短文件：我們如何對待你的資料、本站不是甚麼、我們如何處理金錢，以及每一葉撰寫時依循的規則。每份都先給出白話要旨。',
  },
  tabs: { en: 'Policies', zh: '規約' },
  editorialTab: { en: 'Editorial policy', zh: '編輯凡例' },
  version: { en: 'Version {v}', zh: '版本 {v}' },
  inShort: { en: 'In short:', zh: '要旨：' },
  docAside: { en: 'About this document', zh: '關於本文件' },
  lastUpdated: { en: 'Last updated', zh: '最後更新' },
  clauses: {
    en: '{n} clauses. When a document changes, the date moves and the change is entered in the printing record.',
    zh: '共{n}條。文件一有更動，日期隨之更新，並記入刊記。',
  },
  recordLink: { en: 'Printing record', zh: '刊記' },
  emergencyTitle: { en: 'In an emergency', zh: '緊急情況' },
  emergencyBody: {
    en: 'Call your local emergency number. Do not wait on a web page.',
    zh: '請撥打當地急救電話，不要等待網頁。',
  },
  questions: { en: 'Questions', zh: '查詢' },
} satisfies Record<string, Bilingual>;

/** Printing-record (changelog) copy (board WbChangelog). */
export const CHANGELOG_COPY = {
  cap: { en: 'Printing record', zh: '刊印記錄' },
  title: { en: 'What changed, and when.', zh: '改了甚麼，何時改的。' },
  lead: {
    en: 'Notable changes to the site, newest first: new leaves, corrections, and the work behind them, entered straight from the project history each time the site is printed.',
    zh: '本站的重要更新，由新到舊：新刻的葉、修正，以及背後的工作，每次刊印時直接取自專案歷史。',
  },
  legendTitle: { en: 'How to read a mark', zh: '如何讀一則刊記' },
  legendEdition: {
    en: 'Edition number, counted from the oldest mark',
    zh: '版次，由最早一則起算',
  },
  feat: { en: 'newly cut: something added', zh: '新增內容' },
  fix: { en: 'corrected: something fixed', zh: '修正錯誤' },
  perf: { en: 'cut faster: speed work', zh: '提升速度' },
  a11y: { en: 'easier to read: access work', zh: '無障礙改進' },
  featWord: { en: 'New', zh: '新刻' },
  fixWord: { en: 'Correction', zh: '補正' },
  perfWord: { en: 'Faster', zh: '速刻' },
  a11yWord: { en: 'Access', zh: '便讀' },
  byArea: { en: 'By area', zh: '按部分' },
  marks: { en: '{n} marks, one printing', zh: '{n} 則，一次刊印' },
  ledgerLabel: { en: 'Edition marks, newest first', zh: '刊記，由新到舊' },
  colEdition: { en: 'Edition', zh: '版次' },
  colDate: { en: 'Date', zh: '日期' },
  colArea: { en: 'Area', zh: '部' },
  colChange: { en: 'What changed', zh: '所改' },
  breaking: { en: 'Breaking change', zh: '不相容變更' },
  footnote: {
    en: 'Drawn from the last thirty entries in the project history when the site is built. Housekeeping such as tests and tooling is left out, so only additions, corrections, speed and access work appear. Spot an error in a leaf?',
    zh: '建站時取自專案歷史最近三十則記錄。測試、工具等內務不列入，只呈現新增、修正、速度與無障礙方面的工作。發現某葉有誤？',
  },
  empty: { en: 'No changelog entries are available right now.', zh: '目前沒有可顯示的刊記。' },
} satisfies Record<string, Bilingual>;

/**
 * Returns the resolver for one locale: English reads `en`, zh-hant the
 * authored Traditional string, zh-cn its derived Simplified form.
 * @param locale page language and writing system
 * @returns a resolver for bilingual text in the page language.
 */
export function translator(locale: Locale): Translate {
  return (text) => (locale === 'en' ? text.en : armText(text.zh, locale));
}

/**
 * Returns the resolver for decorative Han authored in Traditional script:
 * English and zh-hant pages keep the source, zh-cn reads its Simplified form.
 * @param locale page language and writing system
 * @returns a resolver for decorative Han in the page's script.
 */
export function hanText(locale: Locale): HanText {
  return (text) => armText(text, locale);
}

/**
 * Fills `{n}`-style placeholders in an already-resolved string.
 * @param template text containing replacement slots
 * @param values values for named slots
 * @returns the template with known slots replaced
 */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/gu, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export { englishCount } from './countWords';
