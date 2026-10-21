/** Localized home-page chrome; `{n}`-style tokens are filled by the template formatter. */
export interface HomeText {
  marginNote: string;
  /** Accessible name of the phone tab bar. */
  tabsLabel: string;
  /** Tab words under their Han (EN pages show both). */
  tabToday: string;
  tabIndex: string;
  tabSeals: string;
  tabSearch: string;
  /** `{n}` = the leaf's place in the book. */
  leafOf: string;
  heroCap: string;
  heroTitle: string;
  heroLede: string;
  readToday: string;
  openIndex: string;
  /** `{n}` = sealed count. */
  sealedOf: string;
  seeSeals: string;
  todayCap: string;
  /** `{meridian}`, `{n}` / `{nth}` (place on the channel), `{count}`. */
  channelLine: string;
  /** Channel line when the code carries no number. */
  channelOnly: string;
  rowWhere: string;
  rowBrief: string;
  rowPress: string;
  rowCaution: string;
  /** Label and line printed when a carded point carries no caution. */
  rowSafe: string;
  safeText: string;
  pregnancyCaution: string;
  readLeaf: string;
  /** Short call to read on the phone card. */
  readShort: string;
  /** `{n}` = sealed count, phone layout. */
  sealedShort: string;
  /** `{name}`, `{code}`. */
  plateLabel: string;
  shelfTitle: string;
  shelfAside: string;
  /** Phone heading for the shelf, after the Han word. */
  shelfShort: string;
  /** `{i}`, `{name}`, `{s}`, `{n}`. */
  spineLabel: string;
  /** `{name}`. */
  spineComplete: string;
  waysTitle: string;
  regionCap: string;
  regionTitle: string;
  allRegions: string;
  conditionCap: string;
  conditionTitle: string;
  /** `{n}` = condition count. */
  allConditions: string;
  /** `{n}` = points tied to a condition; singular, then plural. */
  conditionPoint: string;
  conditionPoints: string;
  /** Phone heading for the condition chips. */
  feeling: string;
  dayCap: string;
  dayLede: string;
  /** `{term}`. */
  termsLabel: string;
  termNow: string;
  termLeaf: string;
  /** Reading-streak heading with no streak yet. */
  streakNone: string;
  /** Heading for a one-day streak. */
  streakOne: string;
  /** `{n}` = streak length, spelled at the start of the line. */
  streakMany: string;
  streakLede: string;
  /** `{count}` days shown, `{read}` of them sealed, `{n}` = streak. */
  streakLabel: string;
  legendTitle: string;
  legendMainCap: string;
  legendMainDemo: string;
  legendMainText: string;
  legendRedCap: string;
  legendRedBefore: string;
  legendRedA: string;
  legendRedB: string;
  legendRedAfter: string;
  legendRedText: string;
  legendMarginCap: string;
  legendMarginDemo: string;
  legendMarginText: string;
  legendFishCap: string;
  legendFishText: string;
  legendSealCap: string;
  legendSealLabel: string;
  legendSealText: string;
}

/** Han labels set beside English headings; English pages read the traditional forms. */
export interface HomeHan {
  bookTitle: string;
  bookSub: string;
  stripHead: string;
  stripToday: string;
  stripLeaf: string;
  shelf: string;
  /** Phone shelf heading (書架). */
  shelfShort: string;
  /** Prefix before a volume numeral (卷一). */
  volume: string;
  /** Stamp on a fully sealed volume. */
  completeTop: string;
  completeBottom: string;
  byRegion: string;
  byCondition: string;
  byDay: string;
  /** Stamp on a day of the reading calendar (讀). */
  dayStamp: string;
  legend: string;
  fishDemo: string;
  /** Suffix turning an organ name into its channel (胃 → 胃經). */
  channelSuffix: string;
  /** Suffix on a plate caption (胃經圖). */
  plateSuffix: string;
  /** Han words on the phone tab bar. */
  tabToday: string;
  tabIndex: string;
  tabSeals: string;
  tabSearch: string;
}
