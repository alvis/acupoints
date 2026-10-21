import type { PagefindResult } from '@/utilities/pagefind';
import type { Locale } from '@/utilities/routes';

export type HitKind = 'point' | 'condition' | 'channel' | 'text';

export type Hit = {
  id: string;
  kind: HitKind;
  /** Han name, cut large beside the English (absent for conditions and full-text hits). */
  zh?: string;
  title: string;
  code?: string;
  hint: string;
  href: string;
  /** Pagefind excerpt markup (contains <mark>), already wrapped for React. */
  excerpt?: NonNullable<React.DOMAttributes<HTMLElement>['dangerouslySetInnerHTML']>;
};

export type IndexEntry = Hit & { keys: string };

export type PagefindState = { query: string; hits: PagefindResult[] };

export const NO_PAGEFIND: PagefindState = { query: '', hits: [] };

export type Copy = {
  dialog: string;
  inputLabel: string;
  placeholder: string;
  close: string;
  entries: (n: number) => string;
  matches: (n: number, q: string) => string;
  groups: Record<HitKind, string>;
  legend: Record<Exclude<HitKind, 'text'>, string>;
  pointCount: (n: number) => string;
  empty: string;
  move: string;
  openLeaf: string;
  closeHint: string;
  /** Lead-in to the index file agents can fetch. */
  agents: string;
};

export const COPY: Record<Locale, Copy> = {
  'en': {
    dialog: 'Search the book',
    inputLabel: 'Search by name, code, body part or Han characters',
    placeholder: 'Name, code, body part or 漢字',
    close: 'Close search',
    entries: (n) => `${n} entries`,
    matches: (n, q) => `${n} ${n === 1 ? 'match' : 'matches'} for “${q}”`,
    groups: { point: 'Points', condition: 'Conditions', channel: 'Channels', text: 'Full text' },
    legend: { point: 'point', condition: 'condition', channel: 'channel' },
    pointCount: (n) => `${n} points`,
    empty: 'No leaf by that name. Try a body part, such as wrist, or a feeling, such as nausea.',
    move: '↑ ↓ move',
    openLeaf: '↵ open leaf',
    closeHint: 'esc close',
    agents: 'Agents:',
  },
  'zh-hant': {
    dialog: '搜尋全書',
    inputLabel: '以名稱、編號、部位或漢字搜尋',
    placeholder: '名稱、編號、部位或漢字',
    close: '關閉搜尋',
    entries: (n) => `共 ${n} 條`,
    matches: (n, q) => `「${q}」共 ${n} 項結果`,
    groups: { point: '穴位', condition: '症候', channel: '經絡', text: '全文' },
    legend: { point: '穴位', condition: '症候', channel: '經絡' },
    pointCount: (n) => `${n} 穴`,
    empty: '找不到相關條目。試試部位，例如「手腕」，或感受，例如「噁心」。',
    move: '↑ ↓ 移動',
    openLeaf: '↵ 開啟',
    closeHint: 'esc 關閉',
    agents: '代理：',
  },
  'zh-cn': {
    dialog: '搜索全书',
    inputLabel: '按名称、编号、部位或汉字搜索',
    placeholder: '名称、编号、部位或汉字',
    close: '关闭搜索',
    entries: (n) => `共 ${n} 条`,
    matches: (n, q) => `“${q}”共 ${n} 项结果`,
    groups: { point: '穴位', condition: '症候', channel: '经络', text: '全文' },
    legend: { point: '穴位', condition: '症候', channel: '经络' },
    pointCount: (n) => `${n} 穴`,
    empty: '找不到相关条目。试试部位，例如“手腕”，或感受，例如“恶心”。',
    move: '↑ ↓ 移动',
    openLeaf: '↵ 打开',
    closeHint: 'esc 关闭',
    agents: '代理：',
  },
};

/** Han type marks, matching the board legend; traditional on every locale like the 漢字 names. */
export const KIND_HAN: Record<HitKind, string> = {
  point: '穴',
  condition: '症',
  channel: '經',
  text: '文',
};

export const KIND_ORDER: readonly HitKind[] = ['point', 'condition', 'channel', 'text'];
export const LEGEND_KINDS = ['point', 'condition', 'channel'] as const;

/** Per-type caps: idle suggestions, then hits once a query is typed. */
export const IDLE_LIMIT: Record<Exclude<HitKind, 'text'>, number> = {
  point: 6,
  condition: 3,
  channel: 3,
};
export const QUERY_LIMIT: Record<Exclude<HitKind, 'text'>, number> = {
  point: 8,
  condition: 4,
  channel: 4,
};
