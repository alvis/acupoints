/**
 * /meridians: the whole chart (經絡總圖). Loads the channel registry and the
 * editorial prose, and composes the opening spread, the fourteen-channel
 * chart and the pairing diagram.
 */

import { loadProseRegistry } from '@/content/pages';
import { channelCopy } from '@/features/channels/channelCopy';
import { channelName, channels } from '@/features/channels/channelData';
import { channelRoute } from '@/features/channels/channelRoutes';
import { hanFor, hanLang } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import {
  courseOf,
  figureSides,
  pairColumn,
  pairRow,
  panelEnd,
  vesselMarks,
} from './channelPairing';
import { ChannelPanel } from './ChannelPanel';
import { MeridiansOverview } from './MeridiansOverview';

import type { FC } from 'react';

import type { Locale } from '@/utilities/routes';

import type { ChartChannel } from './ChannelChart';
import type { PairingGridProps } from './PairingGrid';

/** Props for {@link MeridiansContainer}. */
export type MeridiansContainerProps = {
  locale: Locale;
};

const HAND_YIN = ['lung', 'heart', 'pericardium'] as const;
const FOOT_YIN = ['spleen', 'kidney', 'liver'] as const;

/**
 * The channels index; see the module note.
 * @param props the locale for the channel overview
 * @param props.locale the page language and Han script
 * @returns the fourteen-channel overview and pairing diagram
 */
export const MeridiansContainer: FC<MeridiansContainerProps> = async ({ locale }) => {
  const prose = await loadProseRegistry();
  const t = channelCopy(locale);
  const r = localizedRoutes(locale);
  const english = locale === 'en';
  const lang = hanLang(locale);
  const han = (text: string): string => hanFor(text, locale);

  const chartChannels: ChartChannel[] = channels.map((c) => ({
    slug: c.meridian.slug,
    vol: han(c.volumeZh),
    zh: han(c.fullZh),
    en: english ? c.labelEn : undefined,
    name: channelName(c, locale),
    codes: c.points.map((p) => p.code),
    ...courseOf(c),
  }));

  const panels = channels.map((c) => {
    const first = c.points.at(0);
    const last = c.points.at(-1);
    const sides = figureSides(c);
    const count = c.points.length;
    const route = channelRoute(c.meridian.slug, locale) ?? c.meridian.canonicalOneLiner;
    const start = first ? panelEnd(first, locale, prose) : undefined;
    const end = last ? panelEnd(last, locale, prose) : undefined;

    return (
      <ChannelPanel
        cap={t('volumeOf', { vol: han(c.volumeZh), n: c.volume })}
        codes={c.points.map((p) => p.code)}
        en={english ? c.labelEn : undefined}
        end={end}
        endsLabel={t('ends')}
        hanLang={lang}
        href={r.meridian(c.meridian.slug)}
        key={c.meridian.slug}
        pointsLabel={t('pointsLabel')}
        pointsValue={
          sides
            ? t('pointsDrawn', { n: count, side: t(sides) })
            : english
              ? String(count)
              : t('leavesValue', { n: count })
        }
        readLabel={t('readVolumeLabel', { vol: han(c.volumeZh), name: channelName(c, locale) })}
        readText={t('readVolume')}
        route={route}
        sealLabel={t('sealedFrac', { total: count })}
        start={start}
        startsLabel={t('starts')}
        zh={han(c.fullZh)}
      />
    );
  });

  const notes = [
    { title: t('note1Title'), body: t('note1Body') },
    { title: t('note2Title'), body: t('note2Body') },
    { title: t('note3Title'), body: t('note3Body') },
  ];
  const grid: PairingGridProps = {
    columns: HAND_YIN.map((slug) => pairColumn(slug, locale, t)),
    rows: [
      pairRow({ zh: '手', label: t('hand'), meet: t('fingertips'), yinSlugs: HAND_YIN, locale }),
      pairRow({ zh: '足', label: t('foot'), meet: t('toes'), yinSlugs: FOOT_YIN, locale }),
    ],
    vessels: vesselMarks(locale, t),
    description: t('pairDiagram'),
    pickedWord: t('legendPicked'),
    hanLang: lang,
  };

  return (
    <MeridiansOverview
      chartChannels={chartChannels}
      grid={grid}
      locale={locale}
      notes={notes}
      panels={panels}
    />
  );
};
