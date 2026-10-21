'use client';

import { useContext } from 'react';

import { cn } from '@/utilities/cn';

import { HanDirectionContext } from './HanDirectionScope';

import type { FC } from 'react';

import type { HanLabel } from '@/features/points/labels';

/** Props for `HanDirectionToggle`. */
export type HanDirectionToggleProps = {
  /** Accessible name of the button group. */
  group: string;
  /** Visible caps label before the buttons. */
  cap: string;
  vertical: HanLabel;
  across: HanLabel;
};

/**
 * The 直排 / 橫排 switch; must sit inside a `HanDirectionScope`.
 * @param props caption and labels for the writing-direction controls
 * @param props.group accessible name of the writing-direction button group
 * @param props.cap caption introducing the writing-direction controls
 * @param props.vertical Han and translated labels for vertical writing
 * @param props.across Han and translated labels for horizontal writing
 * @returns the vertical and across writing-direction buttons
 */
export const HanDirectionToggle: FC<HanDirectionToggleProps> = ({
  group,
  cap,
  vertical,
  across,
}) => {
  const state = useContext(HanDirectionContext);

  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" className="cap">
        {cap}
      </span>
      <fieldset className="m-0 flex min-w-0 border-0 p-0 shadow-rest">
        <legend className="sr-only">{group}</legend>
        <DirectionButton
          on={!state.across}
          text={vertical}
          onPress={() => state.setAcross(false)}
        />
        <DirectionButton on={state.across} text={across} onPress={() => state.setAcross(true)} />
      </fieldset>
    </div>
  );
};

export type DirectionButtonProps = { on: boolean; text: HanLabel; onPress: () => void };

const DirectionButton: FC<DirectionButtonProps> = ({ on, text, onPress }) => (
  <button
    aria-pressed={on}
    className={cn(
      'cursor-pointer border-0 px-3.5 py-2 text-[0.95rem]',
      on ? 'bg-ink text-paper' : 'bg-transparent text-ink',
    )}
    type="button"
    onClick={onPress}>
    <span className="tc">{text.han}</span>
    {text.label ? ` ${text.label}` : null}
  </button>
);
