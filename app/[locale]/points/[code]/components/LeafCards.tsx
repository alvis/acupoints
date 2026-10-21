/**
 * The cards under the carved block: press-with-me, the points this leaf
 * pairs with (the Four Gates on LI4 and LV3), the neighbouring leaves of its
 * volume, and the condition pages that name it.
 */

import Link from 'next/link';

import { SealedSquare } from '@/features/points/components/SealedSquare';
import { cn } from '@/utilities/cn';

import type { FC, PropsWithChildren, ReactNode } from 'react';

import type { FourGatesText, HanLabel } from '@/features/points/labels';

/** A point shown on a card: its Han name, reading and link. */
export interface CardPoint {
  code: string;
  name: string;
  han: string;
  href: string;
  /** Where it is in a few words, printed under the name on a neighbouring leaf. */
  place?: string;
}

/** A condition page link. */
export interface CardCondition {
  slug: string;
  name: string;
  href: string;
}

/** One of the Four Gates: a point and the limbs it is pressed on. */
export interface GatePoint {
  point: CardPoint;
  /** "both hands" / "both feet". */
  limbs: string;
}

/** The Four Gates pairing (四關) printed in place of the plain pairs card. */
export interface FourGates {
  text: FourGatesText;
  gates: readonly [GatePoint, GatePoint];
  /** The leaf's other recorded pairings, kept as links under the blurb. */
  also: readonly CardPoint[];
}

/** Props for {@link LeafCards}. */
export type LeafCardsProps = {
  /** BCP-47 tag for Han text. */
  hanLang: string;
  /** Show the Han word before each English cap label (EN pages). */
  showHan: boolean;
  sealedLabel: string;
  current: CardPoint;
  pairs: readonly CardPoint[];
  pairsLabel: HanLabel;
  conditions: readonly CardCondition[];
  conditionsLabel: HanLabel;
  prev?: CardPoint;
  next?: CardPoint;
  neighborsLabel: HanLabel;
  /** The press-with-me card, first in the row. */
  press?: ReactNode;
  /** The Four Gates, replacing the plain pairs card. */
  fourGates?: FourGates;
};

const COLUMNS = [
  '',
  'md:grid-cols-2',
  'md:grid-cols-2',
  'md:grid-cols-2 lg:grid-cols-3',
  'md:grid-cols-2 lg:grid-cols-3',
] as const;

/**
 * Under-the-block cards; a card is left out when the registry has nothing for it.
 * @param props neighbor, pairing, and condition cards with their headings
 * @param props.hanLang language tag for Han text
 * @param props.showHan whether Han labels accompany English copy
 * @param props.sealedLabel accessible label for a sealed point
 * @param props.current link card for the displayed point
 * @param props.pairs related point cards
 * @param props.pairsLabel Han and translated heading for the related point cards
 * @param props.conditions condition pages associated with the current point
 * @param props.conditionsLabel Han and translated heading for the condition cards
 * @param props.prev previous point in the channel
 * @param props.next next point in the channel
 * @param props.neighborsLabel Han and translated heading for the adjacent channel leaves
 * @param props.press press-along pacer rendered below the point cards
 * @param props.fourGates the hand and foot pairing with its localized labels
 * @returns the neighboring, related, condition, and Four Gates cards with the press-along slot
 */
export const LeafCards: FC<LeafCardsProps> = ({
  hanLang,
  showHan,
  sealedLabel,
  current,
  pairs,
  pairsLabel,
  conditions,
  conditionsLabel,
  prev,
  next,
  neighborsLabel,
  press,
  fourGates,
}) => {
  const hasNeighbors = Boolean(prev ?? next);
  const hasPairs = pairs.length > 0 || fourGates !== undefined;
  const count = [press !== undefined, hasPairs, conditions.length > 0, hasNeighbors].filter(
    Boolean,
  ).length;
  if (count === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        `
          mx-auto mt-14 grid max-w-[1440px] gap-7 px-4
          sm:px-8
          lg:mt-[72px] lg:px-20
        `,
        COLUMNS[count],
      )}>
      {press}

      {fourGates ? (
        <Card hanLang={hanLang} id="leaf-pairs" label={fourGates.text.cap} showHan={showHan}>
          <FourGatesBody gates={fourGates} hanLang={hanLang} showHan={showHan} />
        </Card>
      ) : pairs.length > 0 ? (
        <Card hanLang={hanLang} id="leaf-pairs" label={pairsLabel} showHan={showHan}>
          <div className="flex flex-wrap items-center gap-2.5">
            <PairBox hanLang={hanLang} point={current} />
            {pairs.map((pair) => (
              <span className="flex flex-1 basis-44 items-center gap-2.5" key={pair.code}>
                <span
                  aria-hidden="true"
                  className="
                    h-0 min-w-4 flex-1 border-t-2 border-dotted
                    border-(--color-cinnabar)
                  "
                />
                <span aria-hidden="true" className="red text-xl">
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="
                    h-0 min-w-4 flex-1 border-t-2 border-dotted
                    border-(--color-cinnabar)
                  "
                />
                <PairBox link hanLang={hanLang} point={pair} />
              </span>
            ))}
          </div>
        </Card>
      ) : null}

      {hasNeighbors ? (
        <Card hanLang={hanLang} id="leaf-neighbors" label={neighborsLabel} showHan={showHan}>
          <div className="grid grid-cols-2 gap-3">
            {prev ? (
              <NeighborCard arrow="prev" hanLang={hanLang} point={prev} sealedLabel={sealedLabel} />
            ) : (
              <span />
            )}
            {next ? (
              <NeighborCard arrow="next" hanLang={hanLang} point={next} sealedLabel={sealedLabel} />
            ) : null}
          </div>
        </Card>
      ) : null}

      {conditions.length > 0 ? (
        <Card hanLang={hanLang} id="leaf-conditions" label={conditionsLabel} showHan={showHan}>
          <ul className="m-0 flex list-none flex-col p-0">
            {conditions.map((c) => (
              <li
                className="
                  border-b border-ink/25 py-1.5
                  last:border-b-0
                "
                key={c.slug}>
                <Link className="wb-link flex items-baseline text-lg" href={c.href}>
                  <span>{c.name}</span>
                  <span aria-hidden="true" className="lead" />
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
};

export type CardProps = PropsWithChildren<{
  id: string;
  label: HanLabel;
  showHan: boolean;
  hanLang: string;
}>;

const Card: FC<CardProps> = ({ id, label, showHan, hanLang, children }) => (
  <section
    aria-labelledby={id}
    className="
      r1 flex flex-col gap-3 px-5 py-6
      sm:px-[26px]
    ">
    <h2 className="cap m-0" id={id}>
      {showHan ? (
        <>
          <span className="tc" lang={hanLang}>
            {label.han}
          </span>
          {' · '}
        </>
      ) : null}
      {label.label}
    </h2>
    {children}
  </section>
);

export type PairBoxProps = { point: CardPoint; hanLang: string; link?: boolean };

const PAIR_BOX = 'r1 flex flex-none flex-col px-3 py-2';

const PairBox: FC<PairBoxProps> = ({ point, hanLang, link = false }) => {
  const body = (
    <>
      <span className="tc text-xl font-bold" lang={hanLang}>
        {point.han}
      </span>
      <span className="pm text-[0.6875rem]">
        {point.code} · {point.name}
      </span>
    </>
  );

  return link ? (
    <Link className={cn(PAIR_BOX, 'wb-link')} href={point.href}>
      {body}
    </Link>
  ) : (
    <span className={PAIR_BOX}>{body}</span>
  );
};

export type NeighborCardProps = {
  point: CardPoint;
  arrow: 'prev' | 'next';
  hanLang: string;
  sealedLabel: string;
};

const NeighborCard: FC<NeighborCardProps> = ({ point, arrow, hanLang, sealedLabel }) => (
  <Link
    className="
      relative flex min-w-0 flex-col gap-1 p-3
      shadow-[inset_0_0_0_1px_var(--color-ink),inset_0_0_0_4px_var(--color-paper),inset_0_0_0_5px_var(--color-ink)]
    "
    href={point.href}>
    <span className="pm text-[0.6875rem]">
      {arrow === 'prev' ? `← ${point.code}` : `${point.code} →`}
    </span>
    <span className="tc text-2xl font-bold" lang={hanLang}>
      {point.han}
    </span>
    <span className="text-[0.95rem]">{point.name}</span>
    {point.place ? <span className="text-[0.8125rem] text-ink-soft">{point.place}</span> : null}
    <SealedSquare className="absolute top-2.5 right-2.5" code={point.code} label={sealedLabel} />
  </Link>
);

export type FourGatesBodyProps = { gates: FourGates; hanLang: string; showHan: boolean };

const FourGatesBody: FC<FourGatesBodyProps> = ({ gates, hanLang, showHan }) => {
  const [first, second] = gates.gates;
  const { text } = gates;

  return (
    <>
      <p className="m-0 text-[1.375rem] leading-tight font-medium">
        <span className="tc font-black" lang={hanLang}>
          {text.title.han}
        </span>
        {showHan ? ` ${text.title.label}` : null}
      </p>
      <div className="flex items-center gap-2">
        <GateBox gate={first} hanLang={hanLang} />
        <span
          aria-hidden="true"
          className="
            h-0 min-w-2 flex-1 border-t-2 border-dotted
            border-(--color-cinnabar)
          "
        />
        <span aria-hidden="true" className="red text-xl">
          +
        </span>
        <span
          aria-hidden="true"
          className="
            h-0 min-w-2 flex-1 border-t-2 border-dotted
            border-(--color-cinnabar)
          "
        />
        <GateBox gate={second} hanLang={hanLang} />
      </div>
      <p className="m-0 text-base leading-[1.45] text-ink-soft">{text.body}</p>
      {gates.also.length > 0 ? (
        <p
          className="
            m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.95rem]
          ">
          <span className="text-ink-soft">{text.also}</span>
          {gates.also.map((p) => (
            <Link className="wb-link" href={p.href} key={p.code}>
              <span className="tc font-bold" lang={hanLang}>
                {p.han}
              </span>{' '}
              <span className="pm text-[0.75rem]">{p.code}</span>
            </Link>
          ))}
        </p>
      ) : null}
    </>
  );
};

export type GateBoxProps = { gate: GatePoint; hanLang: string };

const GateBox: FC<GateBoxProps> = ({ gate, hanLang }) => (
  <Link className="r1 wb-link flex min-w-0 flex-col px-3 py-2" href={gate.point.href}>
    <span className="tc text-xl font-bold" lang={hanLang}>
      {gate.point.han}
    </span>
    <span className="pm text-[0.6875rem]">
      {gate.point.code} · {gate.limbs}
    </span>
  </Link>
);
