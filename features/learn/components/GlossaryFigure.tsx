import { CunShortcuts } from './CunShortcuts';

import type { FC } from 'react';

import type { GlossaryFigureData } from '../glossaryLeaf';

/** Props for {@link GlossaryFigure}. */
export type GlossaryFigureProps = {
  data: GlossaryFigureData;
};

/**
 * Side figure for a glossary entry, as the Glossary board sets it: the
 * finger-width shortcuts for cun, the welcome-versus-stop panel for de qi,
 * and the twelve source points for yuan-source.
 * @param props side illustration for the glossary term
 * @param props.data prepared figure content
 * @returns the side illustration for the glossary term
 */
export const GlossaryFigure: FC<GlossaryFigureProps> = ({ data }) => {
  if (data.slug === 'cun') {
    return (
      <figure className="m-0 flex flex-col gap-2.5">
        <CunShortcuts className="h-auto w-full max-w-[340px]" labels={data.labels} />
        <figcaption className="text-[0.95rem] leading-[1.45] text-ink-soft">
          {data.caption}
        </figcaption>
      </figure>
    );
  }
  if (data.slug === 'de-qi') {
    const { panel } = data;

    return (
      <div className="r1 grid grid-cols-2">
        <div
          className="
            flex flex-col gap-1.5 border-r-[1.5px] border-ink px-4 py-3.5
          ">
          <span aria-hidden="true" className="tc text-xl font-black">
            得
          </span>
          <span className="text-[1.05rem] font-semibold">{panel.welcomeTitle}</span>
          <ul className="m-0 list-none p-0 text-base leading-[1.6]">
            {panel.welcome.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1.5 bg-paper-raised px-4 py-3.5">
          <span aria-hidden="true" className="tc red text-xl font-black">
            止
          </span>
          <span className="text-[1.05rem] font-semibold">{panel.stopTitle}</span>
          <ul className="m-0 list-none p-0 text-base leading-[1.6]">
            {panel.stop.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="r1 flex flex-col gap-2.5 px-5 py-[18px]">
      <span
        aria-hidden="true"
        className="tc text-[2.75rem] leading-none font-black">
        {data.zh}
      </span>
      <p className="m-0 text-[1.05rem] leading-normal">{data.text}</p>
    </div>
  );
};
