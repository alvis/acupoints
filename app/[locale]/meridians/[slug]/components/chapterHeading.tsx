import Link from 'next/link';

import { numberWord } from '@/features/channels/channelCopy';
import { channelBySlug, PHASES, pointHanzi, watchHours } from '@/features/channels/channelData';
import { hanFor } from '@/utilities/i18n/contentLabels';
import { localizedRoutes } from '@/utilities/routes';

import type { ReactNode } from 'react';

import type { ProseRegistry } from '@/content/pages';
import type { ChannelCopyKey } from '@/features/channels/channelCopy';
import type { Channel } from '@/features/channels/channelData';
import type { Fact } from '@/features/channels/components/FactList';
import type { Translate } from '@/features/channels/translator';
import type { Locale } from '@/utilities/routes';

/** the channel and localized labels used to assemble chapter facts */
interface ChapterFactsOptions {
  channel: Channel;
  locale: Locale;
  prose: ProseRegistry;
  t: Translate<ChannelCopyKey>;
}

/**
 * formats a channel heading in the page language
 * @param channel the channel with its classical names and ordered points
 * @param locale the page language and Han script
 * @param t the localized channel-copy resolver
 * @returns the Han title or English heading with its line break
 */
export function chapterTitle(
  channel: Channel,
  locale: Locale,
  t: Translate<ChannelCopyKey>,
): ReactNode {
  if (locale !== 'en') {
    return hanFor(channel.fullZh, locale);
  }
  if (channel.naming.kind !== 'paired') {
    return channel.meridian.name;
  }

  return (
    <>
      {t('titleLead', { sub: channel.subEn })}
      <br />
      {t('titleTail', { organ: channel.meridian.name })}
    </>
  );
}

/**
 * builds the ruled facts beside a channel chapter
 * @param props the channel facts and localization dependencies
 * @param props.channel the channel with its classical names and ordered points
 * @param props.locale the page language and Han script
 * @param props.prose the loaded editorial registry for point names and locations
 * @param props.t the localized channel-copy resolver
 * @returns the leaf count, partner, phase, watch, and endpoint facts
 */
export function chapterFacts({ channel, locale, prose, t }: ChapterFactsOptions): Fact[] {
  const english = locale === 'en';
  const r = localizedRoutes(locale);
  const first = channel.points.at(0);
  const last = channel.points.at(-1);
  const facts: Fact[] = [
    { term: t('leaves'), value: t('leavesValue', { n: channel.points.length }) },
  ];
  const { naming } = channel;
  const partner = naming.kind === 'paired' ? channelBySlug(naming.partner) : undefined;
  if (naming.kind === 'paired' && partner) {
    facts.push({
      term: t('pairedWith'),
      zh: english ? partner.fullZh : undefined,
      value: (
        <Link className="wb-link text-ink" href={r.meridian(partner.meridian.slug)}>
          {t('pairedValue', {
            name: english ? partner.meridian.name : hanFor(partner.fullZh, locale),
            word: numberWord(partner.volume),
            vol: hanFor(partner.volumeZh, locale),
          })}
        </Link>
      ),
    });
    const phase = PHASES[channel.meridian.element];
    facts.push({
      term: t('phase'),
      zh: english ? phase.zh : undefined,
      value: english ? phase.en : hanFor(phase.zh, locale),
    });
    const { watch, watchStart } = naming;
    const hours = watchHours(watchStart);
    facts.push({
      term: t('clock'),
      zh: english ? watch : undefined,
      value: t('clockValue', { watch: hanFor(watch, locale), hours }),
    });
  }
  if (first && last) {
    const label = (code: string, han: string, name: string): string =>
      english ? `${code} ${name}` : `${hanFor(han, locale)}（${code}）`;
    facts.push({
      term: t('runs'),
      value: t('runsValue', {
        from: label(first.code, pointHanzi(first, locale, prose), first.name),
        to: label(last.code, pointHanzi(last, locale, prose), last.name),
      }),
    });
  }

  return facts;
}
