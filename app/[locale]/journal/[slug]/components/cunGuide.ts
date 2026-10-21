import { armText } from '@/utilities/i18n/t2s';

import { EN, ZH } from './cunGuideCopy';
/**
 * Figure and side-column text for the "Measuring with your own hands" guide,
 * as the Journal board sets it: the hand-measure switcher, the finger and
 * bone tables, the worked Zusanli example and the Neiguan try-it. Every line
 * restates content/pages/journal/measuring-with-cun (its sections and FAQs);
 * zh-hant is taken from the zh-hant arm and zh-cn is converted at render.
 */

import type { Locale } from '@/utilities/routes';

/** The three finger measures the switcher shows. */
export type CunMeasureKey = 'm1' | 'm15' | 'm3';

/** One switcher option and the caption it shows. */
export type CunMeasureOption = {
  key: CunMeasureKey;
  /** finger span expressed in Han characters. */
  han: string;
  unit: string;
  sub: string;
  title: string;
  how: string;
  use: string;
  /** Accessible description of the hand while this measure is shown. */
  label: string;
};

/** One row of a span-to-cun table. */
export type CunRow = {
  span: string;
  cun: string;
};

/** A span-to-cun table with its caption. */
export type CunTable = {
  caption: string;
  spanHeader: string;
  cunHeader: string;
  rows: readonly CunRow[];
};

/** Side-column content beside a part, by the part's section id. */
export type CunSide =
  | { kind: 'glossary'; han: string; text: string }
  | { kind: 'term'; han: string; text: string }
  | { kind: 'table'; table: CunTable }
  | { kind: 'note'; text: string; note?: [string, string] };

/** One step of the worked example: the instruction and its Han tag. */
export type CunStep = {
  text: string;
  han: string;
};

/** The guide's figures and side columns in one locale. */
export type CunGuide = {
  /** 同身寸, under the title. */
  heroHan: string;
  /** Pull quote from the guide's own opening. */
  quote: string;
  /** Vertical tag on the hand figure, 同身寸圖. */
  figureTag: string;
  options: readonly CunMeasureOption[];
  sides: Readonly<Record<string, CunSide>>;
  example: {
    cap: string;
    han: string;
    title: string;
    lede: string;
    steps: readonly CunStep[];
    minutes: string;
    legLabel: string;
    legCaption: string;
  };
  tryIt: {
    han: string;
    title: string;
    steps: readonly string[];
    note: string;
  };
};

/**
 * The guide's figure and side text for a locale, in its script.
 * @param locale active language
 * @returns the measurement guide figures and side text in the requested script
 */
export function cunGuide(locale: Locale): CunGuide {
  if (locale === 'en') {
    return EN;
  }
  if (locale === 'zh-hant') {
    return ZH;
  }

  return convert(ZH, locale);
}

/**
 * convert the measurement guide strings to the requested script
 * @param guide localized measurement instructions
 * @param locale active language
 * @returns the measurement guide with its strings converted to the locale script
 */
function convert(guide: CunGuide, locale: Locale): CunGuide {
  const t = (text: string): string => armText(text, locale);
  const table = (source: CunTable): CunTable => ({
    caption: t(source.caption),
    spanHeader: t(source.spanHeader),
    cunHeader: t(source.cunHeader),
    rows: source.rows.map((row) => ({ span: t(row.span), cun: row.cun })),
  });
  const side = (source: CunSide): CunSide => {
    if (source.kind === 'table') {
      return { kind: 'table', table: table(source.table) };
    }
    if (source.kind === 'note') {
      return {
        kind: 'note',
        text: t(source.text),
        note: source.note ? [t(source.note[0]), t(source.note[1])] : undefined,
      };
    }

    return { kind: source.kind, han: t(source.han), text: t(source.text) };
  };

  return {
    heroHan: t(guide.heroHan),
    quote: t(guide.quote),
    figureTag: t(guide.figureTag),
    options: guide.options.map((o) => ({
      ...o,
      han: t(o.han),
      unit: t(o.unit),
      sub: t(o.sub),
      title: t(o.title),
      how: t(o.how),
      use: t(o.use),
      label: t(o.label),
    })),
    sides: Object.fromEntries(Object.entries(guide.sides).map(([id, s]) => [id, side(s)])),
    example: {
      ...guide.example,
      cap: t(guide.example.cap),
      han: t(guide.example.han),
      title: t(guide.example.title),
      lede: t(guide.example.lede),
      steps: guide.example.steps.map((s) => ({ text: t(s.text), han: t(s.han) })),
      minutes: t(guide.example.minutes),
      legLabel: t(guide.example.legLabel),
      legCaption: t(guide.example.legCaption),
    },
    tryIt: {
      han: t(guide.tryIt.han),
      title: t(guide.tryIt.title),
      steps: guide.tryIt.steps.map(t),
      note: t(guide.tryIt.note),
    },
  };
}
