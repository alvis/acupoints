/**
 * Builds the points index (目錄) from the registry: every leaf once, the
 * fourteen volumes, the carved plates, the condition pages and the A to Z
 * columns, then hands them to the client island with the page's JSON-LD.
 */

import { conditions as allConditions } from '@/content/conditions';
import { getOverlay } from '@/content/illustrations';
import { meridianBySlug } from '@/content/meridians';
import { points } from '@/content/points';
import { regionBySlug } from '@/content/regions';
import { fill, normaliseSearch } from '@/features/points/format';
import { pointsText } from '@/features/points/labels';
import { hanNumber, VOLUMES, volumeLeaves } from '@/features/points/volumes';
import { EDITORIAL_ID } from '@/utilities/editorial';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { toSimplified } from '@/utilities/i18n/t2s';
import { localeToHtmlLang, localizedRoutes, SITE } from '@/utilities/routes';

import { PointsIndexContainerView } from './PointsIndexContainerView';

import type { FC } from 'react';
import type { Thing } from 'schema-dts';

import type { BaseTemplate } from '@/content/illustrations';
import type { Locale } from '@/utilities/routes';

import type { IndexGroup, IndexLeaf, IndexVolume, RegionLabel } from './indexTypes';
import type { PointsIndexContainerModel } from './pointsIndexContainerModel';
import type { FigureRegion } from './RegionFigure';

/** Props for {@link PointsIndexContainer}. */
export type PointsIndexContainerProps = {
  locale: Locale;
};

/** Plates in reading order, head to foot. */
export const PLATE_ORDER: readonly BaseTemplate[] = [
  'head',
  'ear',
  'torso-supine',
  'torso-prone',
  'arm',
  'hand',
  'leg',
  'foot',
];

/** Han labels the carved figure prints for each region (board chrome). */
export const FIGURE_HAN: Readonly<Record<FigureRegion, string>> = {
  head: '頭面',
  neck: '頸',
  shoulder: '肩',
  chest: '胸',
  back: '背',
  arm: '上肢',
  hand: '手',
  leg: '下肢',
  foot: '足',
};

/**
 * Server container for `/points/`.
 * @param props page language for the index entries and links
 * @returns the index heading, browsing island, and structured data
 */
export const PointsIndexContainer: FC<PointsIndexContainerProps> = (props) => (
  <PointsIndexContainerView {...usePointsIndexContainerModel(props)} />
);

/**
 * assemble localized index entries and browsing groups
 * @param props page language for the index entries and links
 * @param props.locale language used for links and copy
 * @returns the localized leaves, browsing groups, region labels, and structured data
 */
export const usePointsIndexContainerModel = ({
  locale,
}: PointsIndexContainerProps): PointsIndexContainerModel => {
  const r = localizedRoutes(locale);
  const text = pointsText(locale);
  const t = text.index;
  const en = locale === 'en';
  const hanLang = en ? 'zh-Hant' : localeToHtmlLang(locale);

  const leaves: Record<string, IndexLeaf> = {};
  for (const p of points) {
    leaves[p.code] = {
      code: p.code,
      name: p.name,
      pinyin: p.pinyin,
      han: hanFor(p.hanzi, locale),
      href: r.point(p.code),
      search: normaliseSearch(
        `${p.code} ${p.name} ${p.pinyin} ${p.hanzi} ${toSimplified(p.hanzi)}`,
      ),
    };
  }

  const volumes: IndexVolume[] = VOLUMES.map((v) => ({
    slug: v.slug,
    number: fill(text.leaf.volumeHan, { n: hanNumber(v.order) }),
    han: hanFor(v.han, locale),
    name: en ? v.organ : hanFor(meridianBySlug(v.slug)?.hanzi ?? v.glyph, locale),
    channel: en ? v.channel : '',
    href: r.meridian(v.slug),
    codes: volumeLeaves(v.slug).map((p) => p.code),
  }));
  const total = volumes.reduce((sum, v) => sum + v.codes.length, 0);

  const plates: IndexGroup[] = PLATE_ORDER.map((template) => ({
    key: template,
    han: hanFor(text.templates[template].han, locale),
    label: capitalise(text.templates[template].label),
    codes: points.filter((p) => getOverlay(p.code).baseTemplate === template).map((p) => p.code),
  })).filter((g) => g.codes.length > 0);

  const conditions: IndexGroup[] = allConditions
    .map((c) => {
      const named = new Set([
        ...(c.pickerPoints ?? []),
        ...points.filter((p) => p.about.includes(`condition:${c.slug}`)).map((p) => p.code),
      ]);

      return {
        key: c.slug,
        han: '',
        label: c.name,
        href: r.condition(c.slug),
        codes: [...named].filter((code) => code in leaves),
      };
    })
    .filter((g) => g.codes.length > 0);

  const byLetter = new Map<string, string[]>();
  for (const p of [...points].sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    const letter = p.name.charAt(0).toUpperCase();
    byLetter.set(letter, [...(byLetter.get(letter) ?? []), p.code]);
  }
  const az: IndexGroup[] = [...byLetter].map(([letter, codes]) => ({
    key: letter,
    han: '',
    label: letter,
    codes,
  }));

  const region = (slug: FigureRegion): RegionLabel => {
    const han = hanFor(FIGURE_HAN[slug], locale);

    return { han, label: en ? (regionBySlug(slug)?.name ?? han) : han, href: r.region(slug) };
  };
  const regions: Record<FigureRegion, RegionLabel> = {
    head: region('head'),
    neck: region('neck'),
    shoulder: region('shoulder'),
    chest: region('chest'),
    back: region('back'),
    arm: region('arm'),
    hand: region('hand'),
    leg: region('leg'),
    foot: region('foot'),
  };

  const graph: Thing[] = [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}${r.points}#page`,
      'url': `${SITE.url}${r.points}`,
      'name': 'All acupoints',
      'reviewedBy': { '@id': EDITORIAL_ID },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE.url}${r.points}#list`,
      'itemListElement': points.map((p, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': `${p.code} ${p.name}`,
        'url': `${SITE.url}${r.point(p.code)}`,
      })),
    },
  ];

  return { az, conditions, hanLang, leaves, plates, regions, en, t, total, volumes, locale, graph };
};

/**
 * capitalize the initial character of a label.
 * @param value label whose initial character is uppercased
 * @returns the label with its initial character uppercased
 */
export function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
