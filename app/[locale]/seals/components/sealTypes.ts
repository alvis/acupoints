/** A volume of the seal book, as the client island needs it. */
export interface SealVolume {
  slug: string;
  /** printed volume ordinal, such as 卷一. */
  number: string;
  /** Full channel name in Han. */
  han: string;
  /** Name used in accessible readings ("Hand Taiyin" or the Han name). */
  name: string;
  /** Character pressed into the volume seal. */
  glyph: string;
  href: string;
  codes: readonly string[];
}

/** A leaf the seal book can name. */
export interface SealLeaf {
  code: string;
  name: string;
  han: string;
  glyphs: readonly [string, string];
  href: string;
  /** Slug of the volume the leaf belongs to. */
  volume: string;
}
