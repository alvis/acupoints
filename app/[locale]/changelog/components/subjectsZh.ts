/**
 * Traditional Chinese renderings of changelog subjects, keyed by the commit
 * subject exactly as git records it (after `type(scope): `). The ledger shows
 * a rendering on Chinese pages when one exists and otherwise prints the
 * English subject marked `lang="en"`, so a new commit never shows a blank row.
 * zh-cn derives its Simplified text from these strings.
 */
export const SUBJECT_ZH: Readonly<Record<string, string>> = {
  'render Chinese prose and headings in the self-hosted Han face':
    '以本站自行託管的漢字字型排印中文行文與標題',
  'index the policy and FAQ pages': '把規約與問答頁收入搜尋索引',
  'drop the mainland face from the Traditional font stack': '從繁體字型序列中移除大陸字型',
  'resolve index summaries through the shared arm helper': '索引摘要改由共用的語言版本工具解析',
  'serve Traditional glyph forms on Traditional pages': '繁體頁面改用繁體字形',
  "describe every llms.txt entry in the index's own language":
    'llms.txt 的每個條目改以該索引本身的語言描述',
  'build the Pagefind index so search has something to query':
    '建立 Pagefind 索引，讓搜尋有內容可查',
  'let a page carry its own social card image': '容許每一頁帶有自己的社交分享圖',
  "scope search results to the reader's locale": '搜尋結果只列出讀者所用語言的頁面',
  'single prose-arm policy and per-locale llms.txt indexes':
    '單一行文版本的政策，並為每種語言建立 llms.txt 索引',
  'hreflang trio with x-default, sitemap alternates, per-locale inLanguage':
    '三語 hreflang 連同 x-default、網站地圖的語言替代連結，以及按語言標註的 inLanguage',
  'per-locale RSS feeds with legacy root kept serving English':
    '每種語言各有 RSS 訂閱源，舊有的根路徑繼續提供英文',
  'bare-domain locale gate, zh alias stub, legacy 308 redirects':
    '根網域的語言入口、zh 別名頁，以及舊網址的 308 轉址',
  'dictionaries, locale-aware dates, language switcher, single-arm editorial view':
    '介面詞典、按語言格式化的日期、語言切換器，以及只顯示單一語言的編輯內文',
  'apply owner-approved GB39 hanzi override 懸鐘→懸鍾':
    '採用經負責人核准的 GB39 漢字改定：懸鐘→懸鍾',
  'move page trees under [locale] and thread locale through consumers':
    '把頁面樹移到 [locale] 之下，並把語言設定傳到每個使用處',
  'add additive locale layer over the route skeleton': '在路由骨架之上加設一層語言路徑',
  'render prose from markdown registry': '改從 Markdown 登錄表排印行文',
  'pin KI4 hanzi to Taiwan textbook form 大鍾': 'KI4 的漢字定為台灣課本字形「大鍾」',
  'add ephemeral prose parity audit (stage 1)': '加入臨時的雙語行文對等審核（第一階段）',
  'add server-only markdown prose loader and async registry':
    '加入只在伺服器端執行的 Markdown 行文載入器與非同步登錄表',
  'extract prose registries to markdown triplets (stage 1 emit)':
    '把行文登錄表抽出為 Markdown 三件組（第一階段輸出）',
  'author and register statics + journal wave P3-C (7 statics · 9 posts)':
    '撰寫並登錄靜態頁與札記第 P3-C 批（靜態頁 7 篇 · 札記 9 篇）',
  'author and register 6 condition + 10 region hubs (wave P3-B)':
    '撰寫並登錄 6 個症候與 10 個部位的總頁（第 P3-B 批）',
  'author and register all 14 meridian hubs (pilot lung + wave P3-A)':
    '撰寫並登錄全部 14 條經絡的總頁（肺經試行 + 第 P3-A 批）',
  'author and register Taiyang (EX-HN5) — spine-only extra point':
    '撰寫並登錄太陽（EX-HN5）——只含骨幹內容的經外奇穴',
  'author and register liver channel — all 14 point modules': '撰寫並登錄肝經——全部 14 個穴位模組',
  'author and register small intestine channel — all 19 point modules':
    '撰寫並登錄小腸經——全部 19 個穴位模組',
  'author and register heart channel — all 9 point modules': '撰寫並登錄心經——全部 9 個穴位模組',
  'author and register gallbladder channel — all 44 point modules':
    '撰寫並登錄膽經——全部 44 個穴位模組',
  'author and register triple-burner channel — all 23 point modules':
    '撰寫並登錄三焦經——全部 23 個穴位模組',
  'author and register pericardium channel — all 9 point modules':
    '撰寫並登錄心包經——全部 9 個穴位模組',
  'author and register kidney channel — all 27 point modules': '撰寫並登錄腎經——全部 27 個穴位模組',
  'author and register bladder run 2 (BL35–BL67); UK-spelling harmonisation':
    '撰寫並登錄膀胱經第二批（BL35–BL67）；統一英式拼寫',
  'author and register bladder-channel run 1 (BL1–BL34)': '撰寫並登錄膀胱經第一批（BL1–BL34）',
  'author and register ren-channel modules (CV1–CV24)': '撰寫並登錄任脈模組（CV1–CV24）',
  'du channel — all 28 point modules registered': '督脈——全部 28 個穴位模組已登錄',
  'spleen channel — all 21 point modules registered': '脾經——全部 21 個穴位模組已登錄',
  'stomach channel — all 45 point modules registered': '胃經——全部 45 個穴位模組已登錄',
  'large intestine channel — all 20 point modules registered': '大腸經——全部 20 個穴位模組已登錄',
};
