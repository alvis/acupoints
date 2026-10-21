/**
 * Serializable shapes the points index hands from its server container to
 * the client island. Groups refer to leaves by code so each leaf ships once.
 */

/** One leaf as listed in the index. */
export interface IndexLeaf {
  code: string;
  name: string;
  /** Pinyin with tone marks, as recorded. */
  pinyin: string;
  /** Han name in the page's script. */
  han: string;
  href: string;
  /** Lowercase haystack: code, name, toneless pinyin and both Han forms. */
  search: string;
}

/** One channel volume row. */
export interface IndexVolume {
  slug: string;
  /** ordinal printed as a Han volume label. */
  number: string;
  /** Full channel name in Han (手太陰肺經). */
  han: string;
  /** Organ or vessel ("Lung"), in the page language. */
  name: string;
  /** Limb-and-channel name ("Hand Taiyin"); empty on Chinese pages. */
  channel: string;
  href: string;
  codes: readonly string[];
}

/** A titled group of leaves (a carved plate, a condition, a letter). */
export interface IndexGroup {
  key: string;
  /** Han heading; empty when the group has none. */
  han: string;
  label: string;
  /** Page the group heading links to, when it has one. */
  href?: string;
  codes: readonly string[];
}

/** One labelled region on the carved figure. */
export interface RegionLabel {
  han: string;
  label: string;
  href: string;
}
