/**
 * Traditional-to-simplified derivation powering the /zh-cn tree. Authored
 * zh-hant strings are the single source; simplified text is derived at
 * render/build time and never written back as .zh-cn.md.
 *
 * Conversion is one pass over traditional source only; the Taiwan forms the
 * prose uses (臟 裡 衝 鬆) land on their mainland forms (脏 里 冲 松).
 *
 * The tw→cn preset already lands the Taiwan textbook point names on their
 * PRC standard nomenclature (懸鍾→悬钟, 大鍾→大钟); t2s.test.ts pins those
 * two mappings so a dictionary upgrade cannot silently drift to 悬锺/大锺.
 * One residue is cleaned after the pass: the preset keeps 於 before 單 (its
 * phrase table holds the name 於單), and mainland text writes 于 there.
 *
 * The opencc-js/t2cn subpath ships only the traditional→simplified
 * dictionaries (106 KB) rather than the 1.1 MB full bundle.
 */
import { Converter } from 'opencc-js/t2cn';

import type { EditorialArm } from '@/content/editorial/schema';
import type { Locale } from '@/utilities/routes';

// Both consumers always convert, so the trie is built eagerly and once.
const convert = Converter({ from: 'tw', to: 'cn' });

/**
 * Converts one traditional-Chinese string to simplified.
 * @param text the authored traditional Chinese text.
 * @returns the simplified Chinese string with the mainland form of 於.
 */
export function toSimplified(text: string): string {
  return convert(text).replaceAll('於', '于');
}

/**
 * Renders one authored traditional-Chinese string for a target locale: zh-cn
 * gets the derived simplified form, every other locale passes the traditional
 * source through unchanged. Shared by the discovery artifacts (RSS, llms.txt)
 * so their prose-arm policy cannot drift apart.
 * @param text the authored traditional Chinese text.
 * @param locale language used for text and routes.
 * @returns the authored text converted for zh-cn or otherwise unchanged.
 */
export function armText(text: string, locale: Locale): string {
  return locale === 'zh-cn' ? toSimplified(text) : text;
}

/**
 * Derives the simplified arm from the shared traditional arm. Section ids
 * are latin anchors and pass through verbatim so zh-hant and zh-cn pages
 * keep identical heading targets.
 * @param arm the authored prose arm to inspect.
 * @returns the simplified prose arm with section anchors preserved.
 */
export function toSimplifiedArm(arm: EditorialArm): EditorialArm {
  return {
    summary: toSimplified(arm.summary),
    sections: arm.sections.map((section) => ({
      id: section.id,
      heading: toSimplified(section.heading),
      paragraphs: section.paragraphs.map(toSimplified),
    })),
    faqs: arm.faqs.map((faq) => ({ q: toSimplified(faq.q), a: toSimplified(faq.a) })),
    selfCareLimits: toSimplified(arm.selfCareLimits),
  };
}
