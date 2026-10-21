/**
 * Copy for the status pages (the 404 leaf and the error page). These render
 * in client islands that pick the locale from the URL, so all three locales
 * are authored here directly instead of deriving Simplified through OpenCC,
 * which is server-only.
 */

import type { Locale } from '@/utilities/routes';

/** Strings for the missing-leaf (404) page. */
export type NotFoundCopy = {
  breadcrumb: string;
  home: string;
  crumb: string;
  title: string;
  body: string;
  figure: string;
  search: string;
  backHome: string;
  allLeaves: string;
  suggestCap: string;
  suggestTitle: string;
  openLeaf: string;
  /** Two-line margin note for a point to avoid in pregnancy. */
  pregnancy: [string, string];
};

/** Strings for the error page. */
export type ErrorCopy = {
  title: string;
  body: string;
  retry: string;
  backHome: string;
};

/** Accessible description of the torn-leaf figure. */
const FIGURE_EN =
  'A woodblock leaf torn down its fish-tail centre strip. The left half, with its columns of characters and a red seal, remains. The right half is gone, shown only as a dashed outline marked 闕, missing, with one small scrap lying in its place.';

/** The 404 page in each locale (board Wb404). */
export const NOT_FOUND_COPY: Record<Locale, NotFoundCopy> = {
  'en': {
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    crumb: 'Not found',
    title: 'This leaf is missing',
    body: 'It has not been cut yet, or it has moved to another page.',
    figure: FIGURE_EN,
    search: 'Search by name, code, body part or 漢字',
    backHome: 'Back to the first page',
    allLeaves: 'All 361 leaves',
    suggestCap: 'Read these instead',
    suggestTitle: 'Three of the most-read leaves',
    openLeaf: 'Open the leaf',
    pregnancy: ['Not', 'in pregnancy'],
  },
  'zh-hant': {
    breadcrumb: '導覽路徑',
    home: '首頁',
    crumb: '此葉闕',
    title: '這一葉缺了',
    body: '它尚未刻成，或已移到別的頁面。',
    figure:
      '一葉木刻書頁沿魚尾版心撕開。左半連同一行行字跡與一枚朱印仍在；右半已失，只剩虛線輪廓，標著「闕」字，原處落著一小片殘頁。',
    search: '按名稱、代碼、部位或漢字搜尋',
    backHome: '回到首頁',
    allLeaves: '全部 361 葉',
    suggestCap: '改讀這幾葉',
    suggestTitle: '最常讀的三葉',
    openLeaf: '翻開這一葉',
    pregnancy: ['孕期', '勿按'],
  },
  'zh-cn': {
    breadcrumb: '导览路径',
    home: '首页',
    crumb: '此叶阙',
    title: '这一叶缺了',
    body: '它尚未刻成，或已移到别的页面。',
    figure:
      '一叶木刻书页沿鱼尾版心撕开。左半连同一行行字迹与一枚朱印仍在；右半已失，只剩虚线轮廓，标着“阙”字，原处落着一小片残页。',
    search: '按名称、代码、部位或汉字搜索',
    backHome: '回到首页',
    allLeaves: '全部 361 叶',
    suggestCap: '改读这几叶',
    suggestTitle: '最常读的三叶',
    openLeaf: '翻开这一叶',
    pregnancy: ['孕期', '勿按'],
  },
};

/** The error page in each locale. */
export const ERROR_COPY: Record<Locale, ErrorCopy> = {
  'en': {
    title: 'Something’s off on our end.',
    body: 'Refresh, or try again in a moment. If this keeps happening, email us at',
    retry: 'Try again',
    backHome: 'Back to home',
  },
  'zh-hant': {
    title: '我們這邊出了點問題。',
    body: '請重新整理，或稍後再試。如果問題持續，請來信',
    retry: '再試一次',
    backHome: '回到首頁',
  },
  'zh-cn': {
    title: '我们这边出了点问题。',
    body: '请刷新，或稍后再试。如果问题持续，请来信',
    retry: '再试一次',
    backHome: '回到首页',
  },
};
