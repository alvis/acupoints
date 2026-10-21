import { conditionsCopy } from '@/features/conditions/copy';
import { pregnancyPoints } from '@/features/conditions/data';
import { fill } from '@/features/conditions/format';
import { hanNumeral } from '@/utilities/hanNumeral';
import { localizedRoutes } from '@/utilities/routes';

import type { Crumb } from '@/features/conditions/components/Crumbs';
import type { ConditionsCopy, ProtocolsCopy } from '@/features/conditions/copy';
import type { ConditionSet, RoutinePoint } from '@/features/conditions/data';
import type { Locale } from '@/utilities/routes';

import type { RoutineSlipProps } from './RoutineSlip';

/** a localized label and value in the routines index */
export interface Fact {
  label: string;
  value: string;
}

/** routine facts, slips, navigation, and safety advice for the index */
export interface ProtocolsIndexModel {
  facts: Fact[];
  legend: Fact[];
  slips: RoutineSlipProps[];
  crumbs: Crumb[];
  copy: ConditionsCopy;
  text: ProtocolsCopy;
  pregnancyText: string;
  r: ReturnType<typeof localizedRoutes>;
}

/**
 * derives the routines index presentation from localized condition sets
 * @param locale page language and writing system
 * @param sets condition sets with at least one point
 * @returns routine facts, slips, navigation, and safety advice
 */
export const protocolsIndexModel = (locale: Locale, sets: ConditionSet[]): ProtocolsIndexModel => {
  const r = localizedRoutes(locale);
  const copy = conditionsCopy(locale);
  const text = copy.protocols;
  const zh = locale !== 'en';
  const minutes = sets.flatMap((set) => (set.routine ? [set.routine.minutes] : []));
  const marks = copy.marks.slipRows;
  const codes = new Set(sets.flatMap((set) => set.points.map((point) => point.code)));
  const pointName = (point: RoutinePoint): string =>
    zh ? `${point.hanzi}（${point.code}）` : `${point.name} (${point.code})`;
  const avoid = [
    ...new Map(
      sets.flatMap((set) => pregnancyPoints(set.points)).map((point) => [point.code, point]),
    ).values(),
  ];

  const crumbs: Crumb[] = [
    { href: r.conditions, label: copy.shared.conditions, han: zh ? undefined : '症候' },
    { href: r.protocols, label: text.crumb, han: zh ? undefined : '方' },
  ];
  const facts: Fact[] = [
    { label: text.factSets, value: fill(text.factSetsValue, { n: sets.length }) },
    { label: text.factPoints, value: fill(text.factPointsValue, { n: codes.size }) },
    ...(minutes.length > 0
      ? [
          {
            label: text.factTime,
            value: fill(text.factTimeValue, {
              min: Math.min(...minutes),
              max: Math.max(...minutes),
            }),
          },
        ]
      : []),
    { label: text.factHand, value: text.factHandValue },
  ];
  const legend: Fact[] = [
    { label: copy.marks.slipSeal[0], value: text.legendSet },
    { label: '穴', value: text.legendPoints },
    { label: marks.time, value: text.legendTime },
    { label: marks.finding, value: text.legendFinding },
  ];

  const slips = sets.flatMap((set, i) => routineSlipModel(set, i, locale));
  const pregnancyText =
    avoid.length > 0
      ? fill(copy.shared.safety.pregnancyText, {
          list: avoid.map(pointName).join(text.pregnancyJoin),
        })
      : copy.shared.safety.pregnancyNone;

  return { facts, legend, slips, crumbs, copy, text, pregnancyText, r };
};

/**
 * describes one authored routine as a prescription slip
 * @param set condition and its ordered routine points
 * @param i zero-based position among available sets
 * @param locale page language and writing system
 * @returns a prescription slip, or no slip when the routine is absent
 */
const routineSlipModel = (set: ConditionSet, i: number, locale: Locale): RoutineSlipProps[] => {
  const copy = conditionsCopy(locale);
  const text = copy.protocols;
  const marks = copy.marks.slipRows;
  const zh = locale !== 'en';
  const r = localizedRoutes(locale);
  const pointName = (point: RoutinePoint): string =>
    zh ? `${point.hanzi}（${point.code}）` : `${point.name} (${point.code})`;
  const routine = set.routine;
  if (!routine) {
    return [];
  }
  const findingValue = text.finding[routine.finding - 1] ?? '';

  return [
    {
      id: `slip-${set.condition.slug}`,
      number: zh
        ? `方${hanNumeral(i + 1)}`
        : `方${hanNumeral(i + 1)} · ${fill(text.slipNumber, { n: i + 1 })}`,
      numeral: hanNumeral(i + 1),
      title: set.label.name,
      slip: set.label.slip,
      han: set.label.han,
      summary: routine.purpose,
      points: set.points.map((point) => ({
        code: point.code,
        hanzi: point.hanzi,
        label: zh ? undefined : point.pinyinName,
      })),
      sequenceLabel: fill(text.sequence, {
        list: set.points.map(pointName).join(text.sequenceJoin),
      }),
      time: {
        han: marks.time,
        label: text.timeLabel,
        value: fill(text.timeValue, { min: routine.minutes, n: set.points.length }),
      },
      finding: {
        han: marks.finding,
        label: text.findingLabel,
        value: findingValue,
        level: routine.finding,
        aria: fill(text.findingAria, { n: routine.finding, label: findingValue }),
      },
      where: { han: marks.where, label: text.whereLabel, value: routine.posture },
      often: { han: marks.often, label: text.oftenLabel, value: routine.often },
      caution: routine.caution,
      practiceHref: r.practice(set.condition.slug),
      pressAlong: text.pressAlong,
      seal: copy.marks.slipSeal,
    },
  ];
};
