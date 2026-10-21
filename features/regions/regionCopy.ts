/**
 * Interface copy for the region (部位) pages in the three reading
 * languages, following the Woodblock board's chrome. Traditional Chinese is
 * authored; the zh-cn tree reads it converted to simplified.
 */

import { toSimplified } from '@/utilities/i18n/t2s';

import type { Locale } from '@/utilities/routes';

/** Keys of the region page copy. */
export type RegionCopyKey = keyof typeof EN;

/** Resolves one copy key for the page's locale, filling `{name}` slots. */
export type RegionTranslate = (
  key: RegionCopyKey,
  vars?: Readonly<Record<string, string | number>>,
) => string;

const EN = {
  home: 'Home',
  regions: 'Regions',
  indexCap: 'Ten regions of the body',
  indexTitle: 'Find by body part',
  indexLead:
    'Start from where it aches, not from a channel name. Pick a part of the figure to see the points filed there, the channels that pass through, and the complaints tradition brought to it.',
  beforeTitle: 'Before you press',
  before1: 'Use fingertips and light, comfortable pressure.',
  before2: 'Keep off broken, inflamed or numb skin.',
  beforePregnant: 'If you are pregnant, skip {points}.',
  before4: 'Pain that is new, severe or lasting belongs with a licensed practitioner.',
  listTitle: 'All ten regions',
  listNote: 'Same choice as the figure, one tab stop each.',
  listLabel: 'Regions',
  countOne: '1 point',
  countMany: '{n} points',
  countNone: 'via channels',
  figureLabel: 'Figure and the region you picked',
  frontFigure: 'Front of the carved figure, marked into regions you can pick.',
  backFigure: 'Back of the carved figure, with the back as a region you can pick.',
  front: 'front',
  back: 'back',
  legendZone: 'a region to pick',
  legendPicked: 'the one you picked',
  legendPoints: 'its points',
  zoneLabel: '{name}, {count}',
  regionOf: 'Region {n} of 10',
  keyPoints: 'Key points here',
  leaf: 'leaf',
  pointLabel: '{name}, {code}: open the leaf',
  empty:
    'No single point is filed under the {name} yet. Its points belong to the channels that pass through it; follow them below.',
  channelsTitle: 'Channels through here',
  conditionsTitle: 'Related conditions',
  alsoBrought: 'Also brought here:',
  pregnancySkip: 'Skip {points} if you are pregnant.',
  openRegion: 'Open the {name} page',
  stepsTitle: 'Three steps from ache to point',
  step1Title: 'Pick the part',
  step1Body: 'Tap the place that bothers you on the figure, or choose it from the list above.',
  step2Title: 'Open a leaf',
  step2Body:
    'Each point has its own leaf with plain steps to find it and what tradition used it for.',
  step3Title: 'Press lightly',
  step3Body:
    'Comfortable pressure for a few unhurried minutes. Sharp, electric or spreading pain means stop.',
  detailLead: 'The {name} holds {n} of the points filed on this site: {list}.',
  chartLabel: 'Points of the {name}',
  platesLabel: 'Plates of this region',
  listPoints: 'The {n} points filed here',
  openLeaf: 'Open leaf',
  sealed: 'sealed',
  notSealed: 'not yet sealed',
  legendSealed: 'sealed',
  legendNot: 'not yet',
  plateAria:
    '{plate} plate. {code} {name} is marked in red; the other points filed here are small rings, filled when sealed.',
  plateFront: 'Front figure',
  plateBack: 'Back figure',
  otherRegions: 'Other regions',
} as const;

const ZH: Record<RegionCopyKey, string> = {
  home: '首頁',
  regions: '部位',
  indexCap: '人身十部',
  indexTitle: '依部位找穴',
  indexLead:
    '從哪裏不適開始，而不是從經絡名稱開始。在人形上選一個部位，看看收錄在那裏的穴位、經過的經絡，以及傳統上帶到那裏的不適。',
  beforeTitle: '按壓之前',
  before1: '用指腹，力度輕柔舒適。',
  before2: '避開破損、發炎或麻木的皮膚。',
  beforePregnant: '孕期請避開{points}。',
  before4: '新出現、劇烈或持續的疼痛，請交給持證的醫師。',
  listTitle: '十個部位',
  listNote: '與人形上的選擇相同，每個部位一個定位點。',
  listLabel: '部位',
  countOne: '1 穴',
  countMany: '{n} 穴',
  countNone: '見經絡',
  figureLabel: '人形與所選部位',
  frontFigure: '刻本人形正面，分成可選的部位。',
  backFigure: '刻本人形背面，背部為可選的部位。',
  front: '正面',
  back: '背面',
  legendZone: '可選的部位',
  legendPicked: '所選部位',
  legendPoints: '所含穴位',
  zoneLabel: '{name}，{count}',
  regionOf: '第 {n} 部，共十部',
  keyPoints: '要穴',
  leaf: '此葉',
  pointLabel: '{name}，{code}：翻開這一葉',
  empty: '{name}目前沒有單獨收錄的穴位；這裏的穴位屬於經過此處的經絡，請循下方的經絡查看。',
  channelsTitle: '經過此處的經絡',
  conditionsTitle: '相關病症',
  alsoBrought: '傳統上也為此而來：',
  pregnancySkip: '孕期請避開{points}。',
  openRegion: '打開{name}頁',
  stepsTitle: '由不適到穴位，三步',
  step1Title: '選部位',
  step1Body: '在人形上點選不適的地方，或從上方的清單中選擇。',
  step2Title: '翻開一葉',
  step2Body: '每個穴位都有自己的一葉，寫明取穴的步驟與傳統上的用途。',
  step3Title: '輕輕按壓',
  step3Body: '以舒適的力度，從容按壓幾分鐘。出現尖銳、麻電或擴散的疼痛，就停下。',
  detailLead: '{name}收錄本站 {n} 個穴位：{list}。',
  chartLabel: '{name}的穴位',
  platesLabel: '本部位的圖版',
  listPoints: '此處收錄的 {n} 個穴位',
  openLeaf: '翻開這一葉',
  sealed: '已蓋印',
  notSealed: '未蓋印',
  legendSealed: '已蓋印',
  legendNot: '未蓋印',
  plateAria: '{plate}圖版。{code} {name}以朱點標出；此處收錄的其他穴位為小圈，已蓋印者填滿。',
  plateFront: '正面人形',
  plateBack: '背面人形',
  otherRegions: '其他部位',
};

/**
 * Copy resolver for the region pages in `locale`.
 * @param locale page language and writing system
 * @returns a localized region placeholder resolver
 */
export function regionCopy(locale: Locale): RegionTranslate {
  return (key, vars) => {
    const raw = locale === 'en' ? EN[key] : ZH[key];
    const text = locale === 'zh-cn' ? toSimplified(raw) : raw;
    if (!vars) {
      return text;
    }

    return text.replace(/\{(\w+)\}/gu, (whole, name: string) =>
      name in vars ? String(vars[name]) : whole,
    );
  };
}
