import type { Locale } from '@/utilities/routes';

/**
 * UI chrome strings, keyed by locale and exhaustively typed — adding a
 * locale to `LOCALES` without authoring its dictionary is a compile error.
 * Only interface chrome lives here; page prose stays in the content
 * registries (editorial arms carry their own language).
 */
export type Dict = {
  /** Site-header navigation labels, keyed by route key. */
  nav: {
    points: string;
    meridians: string;
    conditions: string;
    basics: string;
    faq: string;
    about: string;
  };
  search: { openLabel: string };
  /** Woodblock masthead, menu and scroll-end footer chrome. */
  chrome: Chrome;
  /** FAQ block heading inside editorial prose. */
  faqHeading: string;
  /** Editorial-view safety callouts that are boilerplate rather than prose. */
  disclaimers: {
    cautionsTitle: string;
    selfCareTitle: string;
    /** Universal self-care-limits sentence appended after the arm's authored limits. */
    selfCareNotice: string;
  };
};

/** Masthead, language menu and footer strings for the Woodblock chrome. */
export interface Chrome {
  /** Wordmark beside the seal. */
  brand: string;
  homeLabel: string;
  /** Main sections: label shown, with the Han word set before it in English. */
  sections: {
    points: string;
    channels: string;
    regions: string;
    conditions: string;
    learn: string;
  };
  mainNav: string;
  /** Accessible name of the breadcrumb trail. */
  breadcrumb: string;
  searchShortcut: string;
  seals: string;
  /** Seal toggle on a leaf: before and after stamping (`{name}` = point name). */
  stampLeaf: string;
  sealedLeaf: string;
  /** Accessible label for the seals count, `{n}` sealed of `{total}`. */
  sealsCount: string;
  language: string;
  languageMenuTitle: string;
  languageKeepsPlace: string;
  menuOpen: string;
  menuClose: string;
  /** The folded phone menu: a note under each section, search, My seals and the small print. */
  menu: {
    notes: Record<'points' | 'channels' | 'regions' | 'conditions' | 'learn', string>;
    search: string;
    /** "{n} of 361 leaves" — `{n}` is filled live. */
    sealsLine: string;
    /** Appended to the seals line while a streak runs: `{n}` = days. */
    sealsStreak: string;
    links: { about: string; faq: string; disclaimer: string; privacy: string; changelog: string };
  };
  skipToContent: string;
  footer: {
    endOfBook: string;
    volumes: string;
    read: string;
    about: string;
    colophon: string;
    colophonText: string;
    notAdvice: string;
    rights: string;
    backToTop: string;
    links: {
      index: string;
      channels: string;
      conditions: string;
      seals: string;
      search: string;
      howToRead: string;
      sources: string;
      faq: string;
      glossary: string;
      journal: string;
      changelog: string;
      disclaimer: string;
      privacy: string;
      affiliate: string;
    };
    stamps: {
      languages: string;
      read: string;
      checked: string;
      printed: string;
    };
    /** Decorative Han of the scroll end, in the locale's script. */
    han: {
      scrollEnd: string;
      language: string;
      read: string;
      about: string;
      colophon: string;
    };
    /** The four seals: their two lines of Han and an accessible reading. */
    seals: Record<'languages' | 'read' | 'checked' | 'printed', FooterSeal>;
  };
}

/** A footer seal: two lines of Han and the label a screen reader announces. */
export interface FooterSeal {
  top: string;
  bottom: string;
  label: string;
}

/** Native names for the switcher; intrinsic to each language, not per-locale. */
export const LOCALE_NAMES: Record<Locale, { short: string; long: string }> = {
  'en': { short: 'EN', long: 'English' },
  'zh-hant': { short: '繁', long: '繁體中文' },
  'zh-cn': { short: '简', long: '简体中文' },
};

const enChrome: Chrome = {
  brand: 'Acupoints',
  homeLabel: 'Acupoints, home',
  sections: {
    points: 'Points',
    channels: 'Channels',
    regions: 'Regions',
    conditions: 'Conditions',
    learn: 'Learn',
  },
  mainNav: 'Main',
  breadcrumb: 'Breadcrumb',
  searchShortcut: 'Search, shortcut Command K',
  seals: 'My seals',
  stampLeaf: 'Stamp this leaf',
  sealedLeaf: 'Sealed · {name}',
  sealsCount: 'My seals, {n} of {total}',
  language: 'Language',
  languageMenuTitle: 'Read this site in',
  languageKeepsPlace: 'You stay on the same leaf. Your seals carry over.',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  menu: {
    notes: {
      points: '361 leaves',
      channels: '14 volumes',
      regions: 'Find by body part',
      conditions: 'Sets of points',
      learn: 'Basics, journal, glossary',
    },
    search: 'Search 361 points',
    sealsLine: '{n} of 361 leaves',
    sealsStreak: ' · {n}-day streak',
    links: {
      about: 'About',
      faq: 'Questions',
      disclaimer: 'Policy',
      privacy: 'Privacy',
      changelog: 'Printing record',
    },
  },
  skipToContent: 'Skip to main content',
  footer: {
    endOfBook: 'End of the book',
    volumes: '361 leaves in 14 volumes',
    read: 'Read',
    about: 'About',
    colophon: 'Colophon',
    colophonText:
      'Cut for the web in 2026. Figures after the meridian charts of 《針灸大成》, 1601.',
    notAdvice: 'Educational reading. Not a diagnosis, and not a substitute for care.',
    rights: 'Educational reading, not medical advice.',
    backToTop: 'Back to top',
    links: {
      index: 'Index of 361 leaves',
      channels: 'The fourteen channels',
      conditions: 'Conditions',
      seals: 'My seals',
      search: 'Search',
      howToRead: 'How to read a leaf',
      sources: 'Sources and editions',
      faq: 'Questions and answers',
      glossary: 'Glossary',
      journal: 'Journal',
      changelog: 'Printing record',
      disclaimer: 'Medical disclaimer',
      privacy: 'Privacy',
      affiliate: 'Affiliate disclosure',
    },
    stamps: {
      languages: 'One text in English, 繁體 and 简体',
      read: '{n} of 361 leaves sealed so far',
      checked: 'Every leaf checked against its sources',
      printed: 'Printed in the year 丙午, 2026',
    },
    han: { scrollEnd: '經穴圖卷終', language: '語言', read: '目錄', about: '說明', colophon: '跋' },
    seals: {
      languages: { top: '三', bottom: '語', label: 'Seal reading 三語, three languages' },
      read: { top: '讀', bottom: '葉', label: 'Seal reading 讀葉, leaves read' },
      checked: { top: '考', bottom: '訂', label: 'Seal reading 考訂, checked' },
      printed: {
        top: '丙午',
        bottom: '年刊',
        label: 'Seal reading 丙午年刊, printed in the year bingwu',
      },
    },
  },
};

const zhHantChrome: Chrome = {
  brand: '經穴圖',
  homeLabel: '經穴圖首頁',
  sections: {
    points: '穴位',
    channels: '經絡',
    regions: '部位',
    conditions: '症候',
    learn: '學習',
  },
  mainNav: '主選單',
  breadcrumb: '導覽路徑',
  searchShortcut: '搜尋，快捷鍵 Command K',
  seals: '我的印譜',
  stampLeaf: '蓋印此葉',
  sealedLeaf: '已蓋印 · {name}',
  sealsCount: '我的印譜，三百六十一之 {n}',
  language: '語言',
  languageMenuTitle: '選擇語言',
  languageKeepsPlace: '仍在同一葉，印章不變。',
  menuOpen: '開啟選單',
  menuClose: '關閉選單',
  menu: {
    notes: {
      points: '三百六十一葉',
      channels: '十四卷',
      regions: '依部位查找',
      conditions: '成組的穴位',
      learn: '基礎・札記・詞彙',
    },
    search: '搜尋三百六十一穴',
    sealsLine: '三百六十一葉中已印 {n} 葉',
    sealsStreak: '・連讀 {n} 日',
    links: {
      about: '說明',
      faq: '問答',
      disclaimer: '免責聲明',
      privacy: '私隱',
      changelog: '刊記',
    },
  },
  skipToContent: '跳至主要內容',
  footer: {
    endOfBook: '卷終',
    volumes: '十四卷，三百六十一葉',
    read: '閱讀',
    about: '說明',
    colophon: '跋',
    colophonText: '二〇二六年為網頁刻成。圖依《針灸大成》（1601）經絡圖。',
    notAdvice: '僅供教育閱讀，並非診斷，亦不能取代醫療照護。',
    rights: '僅供教育閱讀，並非醫療建議。',
    backToTop: '回到頁首',
    links: {
      index: '三百六十一葉目錄',
      channels: '十四經',
      conditions: '症候',
      seals: '我的印譜',
      search: '搜尋',
      howToRead: '如何閱讀一葉',
      sources: '來源與版本',
      faq: '問答',
      glossary: '詞彙',
      journal: '札記',
      changelog: '刊記',
      disclaimer: '醫療免責聲明',
      privacy: '私隱',
      affiliate: '聯盟揭露',
    },
    stamps: {
      languages: '一文三語：English、繁體、简体',
      read: '已蓋 {n} 葉，共三百六十一葉',
      checked: '每葉皆經核對來源',
      printed: '丙午年刊，二〇二六',
    },
    han: { scrollEnd: '經穴圖卷終', language: '語言', read: '目錄', about: '說明', colophon: '跋' },
    seals: {
      languages: { top: '三', bottom: '語', label: '印文：三語' },
      read: { top: '讀', bottom: '葉', label: '印文：讀葉' },
      checked: { top: '考', bottom: '訂', label: '印文：考訂' },
      printed: { top: '丙午', bottom: '年刊', label: '印文：丙午年刊' },
    },
  },
};

const zhCnChrome: Chrome = {
  brand: '经穴图',
  homeLabel: '经穴图首页',
  sections: {
    points: '穴位',
    channels: '经络',
    regions: '部位',
    conditions: '症候',
    learn: '学习',
  },
  mainNav: '主菜单',
  breadcrumb: '导览路径',
  searchShortcut: '搜索，快捷键 Command K',
  seals: '我的印谱',
  stampLeaf: '盖印此页',
  sealedLeaf: '已盖印 · {name}',
  sealsCount: '我的印谱，三百六十一之 {n}',
  language: '语言',
  languageMenuTitle: '选择语言',
  languageKeepsPlace: '仍在同一页，印章不变。',
  menuOpen: '打开菜单',
  menuClose: '关闭菜单',
  menu: {
    notes: {
      points: '三百六十一页',
      channels: '十四卷',
      regions: '按部位查找',
      conditions: '成组的穴位',
      learn: '基础・札记・词汇',
    },
    search: '搜索三百六十一穴',
    sealsLine: '三百六十一页中已印 {n} 页',
    sealsStreak: '・连读 {n} 日',
    links: {
      about: '说明',
      faq: '问答',
      disclaimer: '免责声明',
      privacy: '隐私',
      changelog: '刊记',
    },
  },
  skipToContent: '跳至主要内容',
  footer: {
    endOfBook: '卷终',
    volumes: '十四卷，三百六十一页',
    read: '阅读',
    about: '说明',
    colophon: '跋',
    colophonText: '二〇二六年为网页刻成。图依《针灸大成》（1601）经络图。',
    notAdvice: '仅供教育阅读，并非诊断，也不能取代医疗照护。',
    rights: '仅供教育阅读，并非医疗建议。',
    backToTop: '回到页首',
    links: {
      index: '三百六十一页目录',
      channels: '十四经',
      conditions: '症候',
      seals: '我的印谱',
      search: '搜索',
      howToRead: '如何阅读一页',
      sources: '来源与版本',
      faq: '问答',
      glossary: '词汇',
      journal: '札记',
      changelog: '刊记',
      disclaimer: '医疗免责声明',
      privacy: '隐私',
      affiliate: '联盟披露',
    },
    stamps: {
      languages: '一文三语：English、繁體、简体',
      read: '已盖 {n} 页，共三百六十一页',
      checked: '每页皆经核对来源',
      printed: '丙午年刊，二〇二六',
    },
    han: { scrollEnd: '经穴图卷终', language: '语言', read: '目录', about: '说明', colophon: '跋' },
    seals: {
      languages: { top: '三', bottom: '语', label: '印文：三语' },
      read: { top: '读', bottom: '叶', label: '印文：读叶' },
      checked: { top: '考', bottom: '订', label: '印文：考订' },
      printed: { top: '丙午', bottom: '年刊', label: '印文：丙午年刊' },
    },
  },
};

const en: Dict = {
  nav: {
    points: 'Points',
    meridians: 'Meridians',
    conditions: 'Conditions',
    basics: 'Basics',
    faq: 'FAQ',
    about: 'About',
  },
  search: { openLabel: 'Search' },
  chrome: enChrome,
  faqHeading: 'Frequently asked',
  disclaimers: {
    cautionsTitle: 'Cautions from the classical sources',
    selfCareTitle: 'Self-care limits',
    selfCareNotice:
      'Self-acupressure is educational self-care, not medical care. Stop if a sensation becomes sharp, and seek professional help for persistent symptoms.',
  },
};

const zhHant: Dict = {
  nav: {
    points: '穴位',
    meridians: '經絡',
    conditions: '症狀',
    basics: '基礎',
    faq: '常見問題',
    about: '關於',
  },
  search: { openLabel: '搜尋' },
  chrome: zhHantChrome,
  faqHeading: '常見問題',
  disclaimers: {
    cautionsTitle: '古典文獻的注意事項',
    selfCareTitle: '自我護理的界限',
    selfCareNotice:
      '自我按壓是教育性的自我護理，並非醫療行為。若按壓部位出現尖銳或強烈的感覺，請立即停止；如症狀持續，請尋求執業醫師的專業幫助。',
  },
};

const zhCn: Dict = {
  nav: {
    points: '穴位',
    meridians: '经络',
    conditions: '症状',
    basics: '基础',
    faq: '常见问题',
    about: '关于',
  },
  search: { openLabel: '搜索' },
  chrome: zhCnChrome,
  faqHeading: '常见问题',
  disclaimers: {
    cautionsTitle: '古典文献的注意事项',
    selfCareTitle: '自我护理的界限',
    selfCareNotice:
      '自我按压是教育性的自我护理，并非医疗行为。若按压部位出现尖锐或强烈的感觉，请立即停止；如症状持续，请寻求执业医师的专业帮助。',
  },
};

export const dictionaries: Record<Locale, Dict> = {
  en,
  'zh-hant': zhHant,
  'zh-cn': zhCn,
};

/**
 * select interface text for the requested locale.
 * @param locale language used for text and routes.
 * @returns the interface dictionary for the selected locale.
 */
export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
