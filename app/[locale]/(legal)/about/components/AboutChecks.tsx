import { NumberDisc } from '@/components/primitives/NumberDisc';
import { Seal } from '@/components/primitives/Seal';
import { HanLead } from '@/features/editorial/components/HanLead';
import { cn } from '@/utilities/cn';

import type { FC } from 'react';

/** One step of "how we check a leaf". */
export type CheckStep = {
  /** Single Han character for the step (對, 審, 署). */
  han: string;
  title: string;
  body: string;
};

/** Props for {@link AboutChecks}. */
export type AboutChecksProps = {
  cap: string;
  title: string;
  note: string;
  /** Accessible name of the 考訂 seal. */
  sealLabel: string;
  /** The 考訂 seal characters, in the page's script; they also lead the caps line. */
  seal: readonly [string, string];
  steps: readonly CheckStep[];
  zh: boolean;
};

/**
 * 考訂: the seal, then three numbered checks every leaf passes.
 * @param props check headings, explanatory note, seal characters, and review steps
 * @param props.cap mono caps line following the Han heading
 * @param props.title heading of this about-page panel
 * @param props.note explanation of the leaf-checking process
 * @param props.sealLabel accessible name of the editorial-check seal
 * @param props.seal upper and lower seal characters in the edition’s script
 * @param props.steps numbered editorial workflow steps
 * @param props.zh whether to use Chinese typography
 */
export const AboutChecks: FC<AboutChecksProps> = ({
  cap,
  title,
  note,
  sealLabel,
  seal,
  steps,
  zh,
}) => (
  <section
    aria-labelledby="about-check"
    className="
      mt-[72px] grid items-stretch gap-8
      lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-0
    ">
    <div
      className="
        flex items-start gap-5
        lg:pr-7
      ">
      <Seal bottom={seal[1]} className="shrink-0" label={sealLabel} size={96} top={seal[0]} />
      <div className="flex flex-col gap-2">
        <span className="cap">
          <HanLead han={seal.join('')} zh={zh}>
            {cap}
          </HanLead>
        </span>
        <h2
          className={cn(
            'm-0 text-[1.88rem] leading-[1.1] font-medium',
            zh &&
              `tc`,
          )}
          id="about-check">
          {title}
        </h2>
        <span className={cn('text-[0.94rem] leading-[1.45] text-ink-soft', zh && `
          tc
        `)}>
          {note}
        </span>
      </div>
    </div>
    <ol
      className="
        m-0 grid list-none gap-8 p-0
        md:grid-cols-3 md:gap-0
      ">
      {steps.map((step, index) => (
        <li
          className="
            flex flex-col gap-3 border-l border-rule px-5
            md:px-7
          "
          key={step.han}>
          <div className="flex items-center gap-3.5">
            <NumberDisc n={index + 1} size={44} />
            <span aria-hidden="true" className="tc text-[1.88rem] font-black">
              {step.han}
            </span>
          </div>
          <h3 className={cn('m-0 text-[1.5rem] font-semibold', zh && 'tc')}>{step.title}</h3>
          <p className={cn('m-0 text-[1.06rem] leading-[1.55]', zh && 'tc')}>{step.body}</p>
        </li>
      ))}
    </ol>
  </section>
);
