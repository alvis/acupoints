import type { FC } from 'react';

import type { LeafText } from '@/features/points/labels';

/** Props for {@link LeafColophon}. */
export type LeafColophonProps = {
  text: LeafText['colophon'];
  /** BCP-47 tag for Han text. */
  hanLang: string;
  /** Pretty-printed record of the leaf's identity fields. */
  record: string;
  /** The leaf's JSON copies, one per language, the page's own first. */
  jsonPaths: readonly string[];
};

/**
 * 牌記, the printer's colophon: the leaf's identity fields as a clean record
 * for agents and search, beside a note on where the structured data lives.
 * @param props source record, JSON paths, and colophon labels
 * @param props.text localized interface copy
 * @param props.hanLang language tag for Han text
 * @param props.record indented JSON source record printed in the colophon
 * @param props.jsonPaths paths to the leaf JSON copies in each locale
 * @returns the expandable source record with links to localized JSON copies
 */
export const LeafColophon: FC<LeafColophonProps> = ({ text, hanLang, record, jsonPaths }) => (
  <section
    aria-labelledby="leaf-colophon"
    className="
      mx-auto mt-14 max-w-[1440px] px-4
      sm:px-8
      lg:mt-14 lg:px-20
    ">
    <div
      className="
        grid gap-6 p-5
        shadow-[inset_0_0_0_1.5px_var(--color-ink),inset_0_0_0_6px_var(--color-paper),inset_0_0_0_7.5px_var(--color-ink)]
        sm:p-7
        lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-10
      ">
      <div className="flex flex-col gap-3 p-1.5">
        <h2
          className="
            m-0 flex flex-wrap items-baseline gap-3 text-[1.625rem] font-medium
          "
          id="leaf-colophon">
          <span className="tc text-[1.875rem] font-black" lang={hanLang}>
            {text.han}
          </span>
          {text.title}
        </h2>
        <p className="m-0 text-body/normal text-ink-soft">{text.body}</p>
        <ul
          className="
            pm m-0 flex list-none flex-col gap-1.5 p-0 text-[0.8125rem]
          ">
          {jsonPaths.map((path) => (
            <li className="break-all" key={path}>
              <a className="wb-link" href={path} type="application/json">
                {text.json.replace('{path}', path)}
              </a>
            </li>
          ))}
          <li>
            <a className="wb-link" href="/llms.txt">
              {text.llms}
            </a>
          </li>
          <li>{text.jsonLd}</li>
        </ul>
      </div>
      <pre
        className="
          pm m-0 overflow-x-auto bg-ink p-5 text-[0.8125rem] leading-[1.6]
          wrap-break-word whitespace-pre-wrap text-paper
          sm:px-[22px]
        ">
        {record}
      </pre>
    </div>
  </section>
);
