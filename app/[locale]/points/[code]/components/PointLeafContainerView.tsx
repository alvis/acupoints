import { JsonLd } from '@/components/primitives/JsonLd';
import { fill } from '@/features/points/format';
import { sealGlyphs } from '@/features/points/volumes';
import { hanFor } from '@/utilities/i18n/contentLabels';

import { BreathPacer } from './BreathPacer';
import { LeafCards } from './LeafCards';
import { LeafColophon } from './LeafColophon';
import { LeafMobileBar } from './LeafMobileBar';
import { LeafReferenceNotes } from './LeafReferenceNotes';
import { LeafSpread } from './LeafSpread';
import { LeafTurn } from './LeafTurn';
import { LeafTurnBar } from './LeafTurnBar';
import { breathsFor, pacerText } from './PointLeafContainer';

import type { ReactNode } from 'react';

import type { usePointLeafContainerModel } from './PointLeafContainer';

/** state and localized content for the PointLeafContainer layout */
export type PointLeafContainerViewModel = Awaited<ReturnType<typeof usePointLeafContainerModel>>;

/**
 * render complete leaf composition with navigation, colophon, and structured data
 * @param props complete point leaf content
 * @param props.model loaded point content, safety notes, related cards, and page schema
 * @returns the complete leaf composition with navigation, colophon, and structured data
 */
export const PointLeafContainerView = ({
  model,
}: Readonly<{ model: PointLeafContainerViewModel }>): ReactNode => {
  const {
    position,
    r,
    t,
    volumeName,
    hanLang,
    mobilePlace,
    dict,
    aboveBlock,
    lines,
    locale,
    identity,
    quote,
    summary,
    text,
    datasetLang,
    leafCard,
    point,
  } = model;

  return (
    <>
      <LeafMobileBar
        backHref={position ? r.meridian(position.volume.slug) : r.points}
        backLabel={fill(t.mobileBar.back, { volume: volumeName })}
        hanLang={hanLang}
        label={t.mobileBar.label}
        place={mobilePlace}
        searchHref={r.search}
        searchLabel={dict.search.openLabel}
      />
      <div data-pagefind-body>
        <LeafSpread
          aboveBlock={aboveBlock}
          lines={lines}
          locale={locale}
          point={identity}
          position={position}
          quote={quote}
          summary={quote ? undefined : summary}
          text={text}
        />
        {datasetLang && !leafCard ? (
          <p
            className="
              mx-auto mt-3 max-w-[1440px] px-4 text-[0.8125rem] text-ink-micro
              sm:px-8
              lg:px-20
            ">
            {t.datasetEnglish}
          </p>
        ) : null}
      </div>

      <LeafCards
        conditions={model.conditions}
        conditionsLabel={t.conditions}
        current={model.current}
        fourGates={model.fourGates}
        hanLang={hanLang}
        neighborsLabel={t.neighbors}
        next={model.next}
        pairs={model.pairs}
        pairsLabel={t.related}
        press={
          // A do-not-press line still prints, but the leaf offers no press-along.
          leafCard?.timing.pressable ? (
            <BreathPacer
              breaths={breathsFor(leafCard)}
              hanLang={hanLang}
              showHan={locale === 'en'}
              text={pacerText(t, leafCard)}
            />
          ) : undefined
        }
        prev={model.prev}
        sealedLabel={t.sealed}
        showHan={locale === 'en'}
      />

      <LeafReferenceNotes model={model} />
      <LeafColophon
        hanLang={hanLang}
        jsonPaths={model.jsonPaths}
        record={model.record}
        text={t.colophon}
      />

      {position ? (
        <LeafTurn
          codes={position.codes}
          current={point.code}
          dotsTemplate={t.dots}
          hanLang={hanLang}
          label={t.turn}
          next={model.next}
          place={model.place}
          prev={model.prev}
        />
      ) : null}

      <LeafTurnBar
        code={point.code}
        glyphs={sealGlyphs(hanFor(point.hanzi, locale))}
        hanLang={hanLang}
        label={t.turn}
        next={model.next}
        prev={model.prev}
        seal={t.seal}
      />

      <div className="h-[72px]" />

      <JsonLd entities={model.graph} />
    </>
  );
};
