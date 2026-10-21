/**
 * Han names for the catalogue's point roles (yuan-source, back-shu of the
 * lung …), so Chinese leaves print 原穴 or 肺之背俞穴 rather than the English
 * slug. Traditional source; zh-cn reads it through `hanFor`.
 */

import { hanFor } from '@/utilities/i18n/contentLabels';

import type { Locale } from '@/utilities/routes';

/** Roles that stand alone. */
const ROLES: Readonly<Record<string, string>> = {
  'jing-well': '井穴',
  'ying-spring': '滎穴',
  'shu-stream': '輸穴',
  'jing-river': '經穴',
  'he-sea': '合穴',
  'yuan-source': '原穴',
  'luo-connecting': '絡穴',
  'xi-cleft': '郄穴',
  'front-mu': '募穴',
  'back-shu': '背俞穴',
  'lower-he-sea': '下合穴',
  'eight-influential point': '八會穴',
  'eight-confluent point': '八脈交會穴',
  'crossing-point': '交會穴',
  'crossing': '交會穴',
  'confluent': '交會穴',
  'meeting': '會穴',
  'command-point': '總穴',
  'extra-point': '經外奇穴',
};

/** The organs and vessels a role can be "of". */
const OWNERS: Readonly<Record<string, string>> = {
  'lung': '肺',
  'large intestine': '大腸',
  'stomach': '胃',
  'spleen': '脾',
  'heart': '心',
  'small intestine': '小腸',
  'bladder': '膀胱',
  'kidney': '腎',
  'pericardium': '心包',
  'san jiao': '三焦',
  'gallbladder': '膽',
  'liver': '肝',
  'chong vessel': '衝脈',
  'dai vessel': '帶脈',
  'du vessel': '督脈',
  'ren vessel': '任脈',
  'yang qiao vessel': '陽蹻脈',
  'yang wei vessel': '陽維脈',
  'yin qiao vessel': '陰蹻脈',
  'yin wei vessel': '陰維脈',
};

/** The eight gathering points, named for what gathers there. */
const INFLUENTIAL: Readonly<Record<string, string>> = {
  'blood': '血會',
  'marrow': '髓會',
  'qi': '氣會',
  'sinew': '筋會',
  'the vessel': '脈會',
  'the zang organs': '臟會',
  'the fu organs': '腑會',
};

/**
 * Han name of a catalogue role in the locale's script; undefined when unmapped.
 * @param category catalog role name
 * @param locale page language and writing system
 * @returns the localized role name, when mapped
 */
export function categoryHan(category: string, locale: Locale): string | undefined {
  const han = traditional(category.trim().toLowerCase());

  return han ? hanFor(han, locale) : undefined;
}

/**
 * Traditional Han for a lower-cased role, composing "X of the Y" roles.
 * @param category catalog role name
 * @returns the traditional role name, when mapped
 */
function traditional(category: string): string | undefined {
  if (ROLES[category]) {
    return ROLES[category];
  }
  if (category === 'great luo of the spleen') {
    return '脾之大絡';
  }
  const opens = /^eight-confluent point \(opens the (.+)\)$/u.exec(category);
  if (opens) {
    return OWNERS[opens[1]] ? `八脈交會穴（通${OWNERS[opens[1]]}）` : undefined;
  }
  const gathers = /^eight-influential point of (.+)$/u.exec(category);
  if (gathers) {
    return INFLUENTIAL[gathers[1]];
  }
  const owned = /^(.+?) of the (.+)$/u.exec(category);
  if (!owned) {
    return undefined;
  }
  const role = ROLES[owned[1]];
  const owner = OWNERS[owned[2]];

  return role && owner ? `${owner}之${role}` : undefined;
}
