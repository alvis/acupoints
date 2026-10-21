import type { Locale } from '@/utilities/routes';

/** Props for the page renderer. */
export type AboutContainerProps = { locale: Locale };

/** Each edition's tile glyph and its name in its own language. */
export const EDITION_FACE: Record<Locale, { glyph: string; name: string }> = {
  'en': { glyph: 'EN', name: 'English' },
  'zh-hant': { glyph: '繁', name: '繁體中文' },
  'zh-cn': { glyph: '简', name: '简体中文' },
};

/** The KI4 glyph the Traditional note cites; kept unconverted on zh-cn. */
export const TAIWAN_KI4 = '大鍾';
