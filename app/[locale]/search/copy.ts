import type { Bilingual } from '@/features/editorial/copy';

/** Copy for the /search page that hosts the ⌘K search window (board WbSearch). */
export const SEARCH_COPY = {
  metaTitle: { en: 'Search', zh: '檢索' },
  metaDescription: {
    en: 'Search the 361 leaves by code, name, body part or feeling: points, conditions and channels first, then matches in the text.',
    zh: '以代碼、名稱、身體部位或感覺檢索三百六十一葉：先列穴位、症候與經絡，再列內文中的相符之處。',
  },
  crumb: { en: 'Search', zh: '檢索' },
  cap: { en: 'Find a leaf', zh: '尋葉' },
  title: { en: 'Search the book', zh: '檢索全書' },
  lead: {
    en: 'Type a code such as LI4, a name, a body part such as wrist, or a feeling such as nausea. Points, conditions and channels come first; matches in the text follow.',
    zh: '輸入代碼（例如 LI4）、名稱、身體部位（例如手腕）或感覺（例如噁心）。先列穴位、症候與經絡，內文中的相符之處隨後列出。',
  },
  open: { en: 'Open search', zh: '打開檢索' },
  shortcut: {
    en: 'The same window opens from every page with ⌘K, Ctrl K or the Search button in the header.',
    zh: '在任何一頁按 ⌘K、Ctrl K，或點頁首的「搜尋」按鈕，都會打開同一個檢索視窗。',
  },
} satisfies Record<string, Bilingual>;
