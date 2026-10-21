/**
 * Interface copy for the channel (經絡) pages in the three reading
 * languages, following the Woodblock boards' chrome. Traditional Chinese is
 * authored; the zh-cn tree derives its simplified text at render time.
 */

import { translator } from './translator';

import type { Locale } from '@/utilities/routes';

import type { Translate } from './translator';

/** Keys of the channel page copy. */
export type ChannelCopyKey = keyof typeof EN;

const EN = {
  home: 'Home',
  channels: 'Channels',
  // index
  indexCap: 'The whole chart',
  indexTitle: 'The fourteen channels',
  indexLead:
    'Twelve paired channels and two midline vessels carry the {total} classical points. Pick a volume to see its line cut in red on the figure, where it starts and where it ends.',
  sealedOf: 'You have sealed {n} of {total}',
  volumes: 'Volumes',
  volumesValue: '14, one per channel',
  regular: 'Regular',
  regularValue: '12, in six pairs',
  vessels: 'Vessels',
  vesselsValue: 'Governing, Conception',
  leaves: 'Leaves',
  leavesValue: '{n} points',
  chartLabel: 'Chart of the channels',
  front: 'front',
  back: 'back',
  figFront: 'Front of the carved figure.',
  figBack: 'Back of the carved figure.',
  figThin: 'Every channel cut so far is drawn in thin ink.',
  figPicked: '{name} is drawn in red.',
  figOther: '{name} is on the {side} figure.',
  figNone: '{name} is not cut on the figure yet.',
  legendChannel: 'a channel',
  legendPicked: 'the one you picked',
  legendFirst: 'first point',
  legendLast: 'last point',
  approx: 'Lines are drawn approximately.',
  noCourse: 'This channel’s line is not cut on the figure yet.',
  showAll: 'Show every channel in thin ink',
  volumeOf: '{vol} · Volume {n} of 14',
  pointsLabel: 'Points',
  pointsDrawn: '{n}, drawn on the {side}',
  sideFront: 'front figure',
  sideBack: 'back figure',
  sideBoth: 'front and back figures',
  starts: 'Starts',
  ends: 'Ends',
  readVolume: 'Read the volume',
  readVolumeLabel: 'Read {vol}, {name}',
  sealedFrac: '{n} of {total} sealed',
  rowsLabel: 'The fourteen volumes. Pick one to show its line on the figure',
  rowLabel: '{vol}, {name}, {count} points, {n} sealed',
  pairTitle: 'How the channels pair',
  pairPicked: 'The one you picked is ringed in red.',
  note1Title: 'Twelve make six pairs',
  note1Body:
    'Each yin channel, which runs on the inner side of a limb, has a yang partner on the outer side. Tradition calls them interior and exterior.',
  note2Title: 'Partners meet at the tips',
  note2Body:
    'Hand partners hand over at the fingers, foot partners at the toes. Lung passes to Large Intestine at the index finger.',
  note3Title: 'Two vessels stand alone',
  note3Body:
    'The Governing vessel climbs the back, the Conception vessel the front. Neither has a partner; they close the circuit.',
  hand: 'Hand',
  foot: 'Foot',
  fingertips: 'Fingertips',
  toes: 'Toes',
  pairDegrees: '{yin} and {yang}',
  governingBack: 'Governing, back',
  conceptionFront: 'Conception, front',
  pairDiagram:
    'Pairing diagram. On the hand: Lung with Large Intestine, Heart with Small Intestine, Pericardium with San Jiao. On the foot: Spleen with Stomach, Kidney with Bladder, Liver with Gallbladder. Each yin channel, drawn dark, is joined to its yang partner. The Governing and Conception vessels run the back and front midlines on their own.',
  // chapter
  volumeCap: '{vol} · Volume {word} of fourteen',
  titleLead: '{sub},',
  titleTail: 'the {organ} channel',
  pairedWith: 'Paired with',
  pairedValue: '{name}, volume {word}',
  phase: 'Phase',
  clock: 'Organ clock',
  clockValue: '{hours}, by tradition',
  runs: 'Runs',
  runsValue: '{from} → {to}',
  chapterLead: 'The {name} carries {n} points, from {start} ({startCode}) to {end} ({endCode}).',
  chapterChart: 'Plates of the {name}',
  platesLabel: 'Plates this channel crosses',
  plateAria:
    '{plate} plate. {code} {name} is marked in red; the other points of this chapter on the plate are small rings, filled when sealed.',
  listLabel: 'The {n} leaves of this chapter',
  openLeaf: 'Open leaf',
  sealed: 'sealed',
  notSealed: 'not yet sealed',
  legendSealed: 'sealed',
  legendNot: 'not yet',
  stripContents: '目次',
  courseFigure: 'Carved figure with the line of the {name}',
  plateFront: 'Front figure',
  plateBack: 'Back figure',
  figureAria:
    '{plate}, with the line of this channel cut in red. {code} {name} is marked in red; its other points on this figure are small rings, filled when sealed.',
  routeTitle: 'The route, {from} to {to}',
  routeTitleOne: 'The route',
  routeLabel: 'Every point of the {name}, by part of the body, in channel order',
  dotSealed: '{code} {name}, sealed',
  dotNot: '{code} {name}, not yet sealed',
  otherVolumes: 'Other volumes',
} as const;

const ZH: Record<ChannelCopyKey, string> = {
  home: '首頁',
  channels: '經絡',
  indexCap: '經絡總圖',
  indexTitle: '十四經',
  indexLead:
    '十二條成對的經脈與兩條行於正中的奇經，承載 {total} 個經典穴位。選一卷，看它的經線以朱線刻在圖上，起於何處、止於何處。',
  sealedOf: '你已蓋印 {n} / {total}',
  volumes: '卷數',
  volumesValue: '十四卷，每經一卷',
  regular: '正經',
  regularValue: '十二經，六對',
  vessels: '奇經',
  vesselsValue: '督脈、任脈',
  leaves: '葉數',
  leavesValue: '{n} 穴',
  chartLabel: '經絡圖',
  front: '正面',
  back: '背面',
  figFront: '刻本人形正面。',
  figBack: '刻本人形背面。',
  figThin: '已刻出的經線以細墨畫出。',
  figPicked: '{name}以朱線畫出。',
  figOther: '{name}刻在{side}。',
  figNone: '{name}的循行尚未刻於圖上。',
  legendChannel: '經線',
  legendPicked: '所選經脈',
  legendFirst: '起穴',
  legendLast: '止穴',
  approx: '線條僅為示意。',
  noCourse: '此經的循行尚未刻於圖上。',
  showAll: '以細墨顯示所有經線',
  volumeOf: '{vol} · 共十四卷',
  pointsLabel: '穴數',
  pointsDrawn: '{n} 穴，刻於{side}',
  sideFront: '正面人形',
  sideBack: '背面人形',
  sideBoth: '正背兩面人形',
  starts: '起',
  ends: '止',
  readVolume: '讀此卷',
  readVolumeLabel: '讀{vol}：{name}',
  sealedFrac: '已蓋印 {n} / {total}',
  rowsLabel: '十四卷；選一卷，在圖上顯示它的經線',
  rowLabel: '{vol}，{name}，{count} 穴，已蓋印 {n}',
  pairTitle: '表裏相配',
  pairPicked: '所選經脈以朱框圈出。',
  note1Title: '十二經，六對',
  note1Body: '行於肢體內側的陰經，各有一條行於外側的陽經相配；傳統稱之為表裏。',
  note2Title: '表裏相交於指端',
  note2Body: '手經在手指交接，足經在足趾交接；肺經在食指交予大腸經。',
  note3Title: '二脈獨行',
  note3Body: '督脈循背而上，任脈循腹而上；兩者都沒有相配的經，卻把整個循環接合起來。',
  hand: '手',
  foot: '足',
  fingertips: '指端',
  toes: '趾端',
  pairDegrees: '{yin} · {yang}',
  governingBack: '督脈，行於背',
  conceptionFront: '任脈，行於腹',
  pairDiagram:
    '表裏相配圖。手：肺配大腸、心配小腸、心包配三焦。足：脾配胃、腎配膀胱、肝配膽。陰經以深色畫出，與相配的陽經相連。督脈與任脈各自沿背部與腹部正中而行。',
  volumeCap: '{vol} · 共十四卷',
  titleLead: '{sub}',
  titleTail: '{organ}',
  pairedWith: '表裏',
  pairedValue: '{name}，{vol}',
  phase: '五行',
  clock: '時辰',
  clockValue: '{watch}時 {hours}，依傳統說法',
  runs: '起止',
  runsValue: '{from} → {to}',
  chapterLead: '{name}共 {n} 穴，起於{start}（{startCode}），止於{end}（{endCode}）。',
  chapterChart: '{name}圖版',
  platesLabel: '本經經過的圖版',
  plateAria: '{plate}圖版。{code} {name}以朱點標出；本卷在此圖版上的其他穴位為小圈，已蓋印者填滿。',
  listLabel: '本卷 {n} 葉',
  openLeaf: '翻開這一葉',
  sealed: '已蓋印',
  notSealed: '未蓋印',
  legendSealed: '已蓋印',
  legendNot: '未蓋印',
  stripContents: '目次',
  courseFigure: '刻本人形，標出{name}的循行',
  plateFront: '正面人形',
  plateBack: '背面人形',
  figureAria:
    '{plate}，本經循行以朱線刻出。{code} {name}以朱點標出；本卷在此面的其他穴位為小圈，已蓋印者填滿。',
  routeTitle: '由{from}至{to}',
  routeTitleOne: '循行',
  routeLabel: '{name}的全部穴位，依身體部位分組，按經序排列',
  dotSealed: '{code} {name}，已蓋印',
  dotNot: '{code} {name}，未蓋印',
  otherVolumes: '他卷',
};

/** English number words for "Volume two of fourteen". */
const NUMBER_WORDS = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
] as const;

/**
 * Copy resolver for the channel pages in `locale`.
 * @param locale the page language and Han script
 * @returns a localized placeholder resolver
 */
export function channelCopy(locale: Locale): Translate<ChannelCopyKey> {
  return translator(EN, ZH, locale);
}

/**
 * "two" for volume 2; Arabic past fourteen.
 * @param n count to express
 * @returns the English count or its numeric spelling
 */
export function numberWord(n: number): string {
  return NUMBER_WORDS[n - 1] ?? String(n);
}
